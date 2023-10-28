import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { OffcanvasModule } from '@coreui/angular';

@NgModule({
  declarations: [CartComponent],
  imports: [
    CommonModule,
    OffcanvasModule
  ],
  exports: [CartComponent],
})
export class CartModule { }
