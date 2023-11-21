import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
  SpinnerModule,
} from "@coreui/angular";
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
    SpinnerModule,
    GridModule,
    CardModule,
  ],
  exports: [PaymentComponent],
})
export class PaymentModule {}
