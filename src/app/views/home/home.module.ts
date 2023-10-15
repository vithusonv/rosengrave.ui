import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { AccordionModule, ButtonModule, CardModule, CarouselModule, GridModule, OffcanvasModule, SharedModule } from '@coreui/angular';
import { RouterModule } from '@angular/router';
import { IconModule } from '@coreui/icons-angular';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    CarouselModule,
    RouterModule,
    CardModule,
    GridModule,
    ButtonModule,
    IconModule,
    OffcanvasModule,
    AccordionModule,
    SharedModule,
    HttpClientModule
  ],
  exports: [HomeComponent]
})
export class HomeModule { }
