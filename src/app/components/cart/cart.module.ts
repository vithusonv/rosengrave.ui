import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { ButtonModule, CardModule, DropdownModule, FormModule, GridModule, OffcanvasModule } from '@coreui/angular';

@NgModule({
  declarations: [CartComponent],
  imports: [
    CommonModule,
    OffcanvasModule,
    ButtonModule,
    GridModule,
    CardModule,
    DropdownModule,
    FormModule
  ],
  exports: [CartComponent],
})
export class CartModule { }
