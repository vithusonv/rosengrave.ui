import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontSelectorComponent } from './font-selector.component';
import { FormsModule } from '@angular/forms';
import { FormModule, GridModule, HeaderModule } from '@coreui/angular';


@NgModule({
  declarations: [FontSelectorComponent],
  imports: [
    CommonModule,
    FormsModule,
    FormModule,
    GridModule,
    HeaderModule
  ],
  exports: [FontSelectorComponent]
})
export class FontSelectorModule { }
