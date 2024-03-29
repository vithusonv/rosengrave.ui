import { NgModule } from "@angular/core";

import {
  HashLocationStrategy,
  LocationStrategy,
  PathLocationStrategy,
} from "@angular/common";
import { BrowserModule, Title } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ReactiveFormsModule } from "@angular/forms";

import { NgScrollbarModule } from "ngx-scrollbar";

// Import routing module
import { AppRoutingModule } from "./app-routing.module";

// Import app component
import { AppComponent } from "./app.component";

// Import containers
import {
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent,
} from "./containers";

import { HomeModule } from "./views/home/home.module";
import { ProductsModule } from "./views/products/products.module";
import { ProductDetailsModule } from "./views/product-details/product-details.module";
import { CartModule } from "./components/cart/cart.module";
import { CustomizeItemModule } from "./components/customize-item/customize-item.module";
import { FontSelectorModule } from "./components/font-selector/font-selector.module";
import { CheckoutModule } from "./views/checkout/checkout.module";

import {
  AccordionModule,
  AvatarModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  CarouselModule,
  CollapseModule,
  DropdownModule,
  FooterModule,
  FormModule,
  GridModule,
  HeaderModule,
  ListGroupModule,
  ModalModule,
  NavModule,
  NavbarModule,
  ProgressModule,
  SharedModule,
  SidebarModule,
  TabsModule,
  UtilitiesModule,
} from "@coreui/angular";

import { IconModule, IconSetService } from "@coreui/icons-angular";

const APP_CONTAINERS = [
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent,
];

@NgModule({
  declarations: [AppComponent, ...APP_CONTAINERS],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AvatarModule,
    BreadcrumbModule,
    FooterModule,
    DropdownModule,
    GridModule,
    HeaderModule,
    SidebarModule,
    IconModule,
    NavModule,
    ButtonModule,
    FormModule,
    NavbarModule,
    UtilitiesModule,
    ButtonGroupModule,
    ReactiveFormsModule,
    SidebarModule,
    SharedModule,
    TabsModule,
    ListGroupModule,
    ProgressModule,
    BadgeModule,
    ListGroupModule,
    CardModule,
    NgScrollbarModule,
    CollapseModule,
    CarouselModule,
    HomeModule,
    ProductsModule,
    ProductDetailsModule,
    ModalModule,
    CartModule,
    CustomizeItemModule,
    CheckoutModule,
    AccordionModule,
    FontSelectorModule,
    // NgxStripeModule.forRoot(
    //   "pk_live_51OB6RJDweK0b9wbo0sN422p3AVZ00jonAw7WEMZxygTjKFGKp2ZyInGjajP3A3nBsu57rX9tDHDQjOFqPDhmpWhe005RScnf3Q"
    // ),
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    IconSetService,
    Title,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
