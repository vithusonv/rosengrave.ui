import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProductsComponent } from "./products.component";
import {
  BadgeModule,
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
  HeaderModule,
  NavModule,
  TabsModule,
} from "@coreui/angular";
import { IconModule } from "@coreui/icons-angular";

@NgModule({
  declarations: [ProductsComponent],
  imports: [
    CommonModule,
    CardModule,
    IconModule,
    GridModule,
    ButtonModule,
    BadgeModule,
    NavModule,
    TabsModule,
    HeaderModule,
    FormModule,
    RouterModule,
  ],
  exports: [ProductsComponent],
})
export class ProductsModule {}
