import { SquareService } from "./../../services/square/square.service";
import { Component, ViewChild } from "@angular/core";
import { StripeService, StripeCardComponent } from "ngx-stripe";
import {
  StripeCardElementOptions,
  StripeElementsOptions,
} from "@stripe/stripe-js";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

declare const SqPaymentForm: any; // Declare SqPaymentForm globally

@Component({
  selector: "app-payment",
  templateUrl: "./payment.component.html",
  styleUrls: ["./payment.component.scss"],
})
export class PaymentComponent {
  @ViewChild(StripeCardComponent) card: StripeCardComponent | any;

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: "#666EE8",
        color: "#31325F",
        fontWeight: "300",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: "18px",
        "::placeholder": {
          color: "#CFD7E0",
        },
      },
    },
  };

  elementsOptions: StripeElementsOptions = {
    locale: "es",
  };

  stripeTest: FormGroup | any;

  constructor(private fb: FormBuilder, private stripeService: StripeService) {}

  ngOnInit(): void {
    this.stripeTest = this.fb.group({
      name: ["", [Validators.required]],
    });
  }

  createToken(): void {
    const name = this.stripeTest.get("name").value;
    this.stripeService
      .createToken(this.card.element, { name })
      .subscribe((result) => {
        if (result.token) {
          // Use the token
          console.log(result.token.id);
        } else if (result.error) {
          // Error creating the token
          console.log(result.error.message);
        }
      });
  }
}
