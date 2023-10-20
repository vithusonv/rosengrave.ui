import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { BadgeModule, ButtonModule, CardModule, GridModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';



@NgModule({
  declarations: [ProductsComponent],
  imports: [
    CommonModule,
    CardModule,
    IconModule,
    GridModule,
    ButtonModule,
    BadgeModule
  ],
  exports: [ProductsComponent]
})
export class ProductsModule { }
