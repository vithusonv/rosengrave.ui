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
  private stripe: Stripe | null = null;
  private clientSecret: string | undefined;
  private elements: any;
  private address: any;
  private destroy$ = new Subject<void>();

  public shippingLoader: unknown;
  public shippingCost: any;
  public parcel: any[] = [];
  public quantitySum: number = 0;
  public totalBeforeTax: number | undefined;
  public hstTotal: any;
  public orderTotal: any;

  @ViewChild("cardElement") cardElement: ElementRef | undefined;
  @ViewChild("addressElement") addressElement: ElementRef | undefined;

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
    this.http.get<any>("http://localhost:4000/api/payment").subscribe((key) => {
      this.clientSecret = key.clientSecret;
      this.setupStripeElements();
    });
  }

  private setupStripeElements() {
    if (this.stripe && this.cardElement) {
      const appearance: Appearance = {
        theme: "flat",
        variables: { colorPrimaryText: "#262626" },
      };
      this.elements = this.stripe.elements({
        clientSecret: this.clientSecret,
        appearance: appearance,
      });

      // Customize the appearance of the card element
      const style = {
        theme: "flat",
        base: {
          fontSize: "16px",
          color: "#32325d",
        },
      };

      this.address = this.elements.create("address", {
        mode: "shipping",
        allowedCountries: ["CA", "US"],
      });
      this.address.mount(this.addressElement?.nativeElement);
    }
  }

  async onCalculateShipping(): Promise<any> {
    const address = await this.address.getValue();
    console.log(address);
    this.calculateShippingCost(address);
  }

  calculateShippingCost(address: any): any {
    const destination = {
      city: null,
      country: null,
      line1: null,
      line2: null,
      postalCode: address.value.address.postal_code,
      state: null,
    };

    const body = {
      destination: destination,
      parcel: this.parcel,
      totalItems: this.quantitySum,
    };

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

          const card = this.elements.create("payment");
          card.mount(this.cardElement?.nativeElement);
        },
        error: () => {
          this.shippingLoader = null;
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
