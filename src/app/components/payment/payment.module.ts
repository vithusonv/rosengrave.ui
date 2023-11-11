import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxStripeModule } from "ngx-stripe";
import { ButtonModule, FormModule } from "@coreui/angular";
import { PaymentComponent } from "./payment.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [PaymentComponent],
  imports: [
    CommonModule,
    ButtonModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    FormModule,
    NgxStripeModule.forRoot(
      "pk_live_51OB6RJDweK0b9wbo0sN422p3AVZ00jonAw7WEMZxygTjKFGKp2ZyInGjajP3A3nBsu57rX9tDHDQjOFqPDhmpWhe005RScnf3Q"
    ),
  ],
  exports: [PaymentComponent],
})
export class PaymentModule {}
