import { PaymentModule } from "./../../components/payment/payment.module";
import { CheckoutComponent } from "./checkout.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [CheckoutComponent],
  imports: [CommonModule, PaymentModule],
  exports: [CheckoutComponent],
})
export class CheckoutModule {}
