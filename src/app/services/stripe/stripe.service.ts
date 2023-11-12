// stripe.service.ts

import { Injectable } from "@angular/core";
import { Stripe, loadStripe } from "@stripe/stripe-js";

@Injectable({
  providedIn: "root",
})
export class StripeService {
  stripePromise = loadStripe(
    "pk_test_51OB6RJDweK0b9wboPnq7kLtPEs1Sd38uCrcrjWZp8FD1gsnxTgcbnMWk6cADploGz2lm30aCpRRE2nvXptG2vSRE00Ulfim5C6"
  );

  async getStripe(): Promise<Stripe | null> {
    return this.stripePromise;
  }
}
