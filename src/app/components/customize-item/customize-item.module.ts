import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomizeItemComponent } from './customize-item.component';
import { IconModule } from '@coreui/icons-angular';
import { FontSelectorModule } from 'src/app/components/font-selector/font-selector.module';
import { AccordionModule, ButtonModule, CardModule, GridModule, OffcanvasModule, SharedModule } from '@coreui/angular';

@NgModule({
  declarations: [CustomizeItemComponent],
  imports: [
    CommonModule,
    IconModule,
    ButtonModule,
    OffcanvasModule,
    AccordionModule,
    CardModule,
    GridModule,
    SharedModule,
    FontSelectorModule,
  ],
  exports: [CustomizeItemComponent]
})
export class CustomizeItemModule { }
