import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { StripeService } from "../../services/stripe/stripe.service";
import { Appearance, Stripe } from "@stripe/stripe-js";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-payment",
  templateUrl: "./payment.component.html",
  styleUrls: ["./payment.component.scss"],
})
export class PaymentComponent implements OnInit {
  stripe: Stripe | null = null;
  private clientSecret: string | undefined;

  @ViewChild("cardElement") cardElement: ElementRef | undefined;

  constructor(private stripeService: StripeService, private http: HttpClient) {}

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
        theme: "night",
      };
      const elements = this.stripe.elements({
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

      const addressElement = elements.create("address", {
        mode: "shipping",
      });
      addressElement.mount(this.cardElement.nativeElement);

      const card = elements.create("payment");
      card.mount(this.cardElement.nativeElement);
    }
  }

  handlePayment() {
    console.log("handle");
  }

  // Additional component logic...
}
