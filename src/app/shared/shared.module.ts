import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ProductsComponent } from './components/products/products.component';
import { ProductComponent } from './components/product/product.component';
import { VocalToNumberPipe } from './pipes/vocal-to-number.pipe';
import { HighlightDirective } from './directives/highlight.directive';
import { ImgComponent } from '../shared/components/img/img.component';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  declarations: [
    VocalToNumberPipe,
    HighlightDirective,
    ProductsComponent,
    ProductComponent,
    ImgComponent,
  ],
  imports: [
    CommonModule,
    SwiperModule,
    RouterModule,
  ],
  exports: [
    VocalToNumberPipe,
    HighlightDirective,
    ProductsComponent,
    ProductComponent,
    ImgComponent,
  ]
})
export class SharedModule { }
