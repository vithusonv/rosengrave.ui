import { IconModule } from "@coreui/icons-angular";
import {
  GridModule,
  CardModule,
  ButtonModule,
  FormModule,
} from "@coreui/angular";
import { ProductDetailsComponent } from "./product-details.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [ProductDetailsComponent],
  imports: [
    CommonModule,
    GridModule,
    CardModule,
    IconModule,
    ButtonModule,
    FormModule,
  ],
  exports: [ProductDetailsComponent],
})
export class ProductDetailsModule {}
