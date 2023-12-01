import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { StripeService } from "../../services/stripe/stripe.service";
import { Appearance, Stripe } from "@stripe/stripe-js";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CartService } from "src/app/services/cart/cart.service";
import { Subject, takeUntil } from "rxjs";
import { ONTARIO_HST_RATE } from "./../../common/constants";

@Component({
  selector: "app-payment",
  templateUrl: "./payment.component.html",
  styleUrls: ["./payment.component.scss"],
})
export class PaymentComponent implements OnInit {
  private stripe: Stripe;
  private clientSecret: string;
  private elements: any;
  private address: any;
  private destroy$ = new Subject<void>();

  public shippingLoader: unknown;
  public paymentLoader: unknown;
  public shippingCost: any;
  public parcel: any[] = [];
  public quantitySum: number = 0;
  public totalBeforeTax: number;
  public hstTotal: any;
  public orderTotal: any;
  public card: any;
  public paymentIntentId: string;
  public orderConfirmation: boolean = false;

  @ViewChild("cardElement") cardElement: ElementRef;
  @ViewChild("addressElement") addressElement: ElementRef;

  constructor(
    private stripeService: StripeService,
    private http: HttpClient,
    public cartService: CartService
  ) {
    const cartItems = this.cartService.getCartItems();
    const result = cartItems.reduce((acc, item) => {
      acc.parcel.push(item.product);
      acc.quantitySum += item.quantity;
      return acc;
    }, this);

    this.parcel = result.parcel;
    this.quantitySum = result.quantitySum;
    this.hstTotal =
      (+this.cartService.getTotalPrice() * ONTARIO_HST_RATE) / 100;
  }

  async ngOnInit() {
    this.stripe = await this.stripeService.getStripe();
    this.http
      .post<any>("http://localhost:4000/api/payment", {
        amount: this.cartService.getTotalPrice(),
      })
      .subscribe((intent) => {
        this.clientSecret = intent.clientSecret;
        this.paymentIntentId = intent.paymentIntentId;
        this.setupStripeElements();
      });
  }

  private setupStripeElements() {
    if (this.stripe && this.cardElement) {
      const appearance: Appearance = {
        theme: "flat",
        variables: { colorPrimaryText: "#262626", colorBackground: "#ffffff" },
      };
      this.elements = this.stripe.elements({
        clientSecret: this.clientSecret,
        appearance: appearance,
      });

      this.address = this.elements.create("address", {
        mode: "shipping",
        allowedCountries: ["CA", "US"],
      });
      this.address.mount(this.addressElement?.nativeElement);
    }
  }

  async onCalculateShipping(): Promise<any> {
    const address = await this.address.getValue();

    if (!address.complete) return;
    this.calculateShippingCost(address);
  }

  calculateShippingCost(address: any): any {
    const destination = {
      city: null,
      country: null,
      line1: null,
      line2: null,
      postalCode: address.value.address.postal_code.replace(/\s+/g, ""), // removes spaces
      state: null,
    };

    const body = {
      destination: destination,
      parcel: this.parcel,
      totalItems: this.quantitySum,
    };

    const options = {
      layout: {
        type: "accordion",
        defaultCollapsed: false,
        radios: true,
        spacedAccordionItems: false,
      },
    };

    // hide address element
    this.addressElement.nativeElement.style.display = "none";

    this.shippingLoader = this.http
      .post<any>("http://localhost:4000/api/shipping/rates", body)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (cost) => {
          this.shippingCost = cost.totalShippingCost;
          this.shippingLoader = null;
          this.totalBeforeTax =
            +this.cartService.getTotalPrice() + this.shippingCost;
          this.orderTotal = this.totalBeforeTax + this.hstTotal;

          this.card = this.elements.create("payment", options);
          this.card.mount(this.cardElement?.nativeElement);
        },
        error: () => {
          this.addressElement.nativeElement.style.display = "block";
          this.shippingLoader = null;
        },
      });
  }

  async handlePayment(): Promise<any> {
    // hide payment element
    this.cardElement.nativeElement.style.display = "none";

    this.paymentLoader = this.http
      .put("http://localhost:4000/api/payment", {
        amount: this.orderTotal,
        paymentIntentId: this.paymentIntentId,
      })
      .subscribe({
        next: async () => {
          const result = await this.stripe.confirmPayment({
            elements: this.elements,
            redirect: "if_required",
          });

          if (result.error) {
            // Handle errors here (e.g., display error message to customer)
          } else {
            // Handle successful payment confirmation (e.g., display success message or update UI)
            this.paymentLoader = null;
            this.orderConfirmation = true;
          }
        },
        error: () => {
          this.cardElement.nativeElement.style.display = "block";
          this.paymentLoader = null;
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
