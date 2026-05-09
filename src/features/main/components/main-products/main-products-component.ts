import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MAIN_PRODUCTS_SLIDES, MAIN_PRODUCTS_SWIPER_BREAKPOINTS } from './constants/main-products.const';
import { SwiperHost } from './models/main-products.models';

@Component({
  selector: 'visla-main-products',
  imports: [RouterLink],
  templateUrl: './main-products-component.html',
  styleUrl: './main-products-component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MainProductsComponent {
  readonly slides = MAIN_PRODUCTS_SLIDES;
  readonly swiperBreakpoints = MAIN_PRODUCTS_SWIPER_BREAKPOINTS;

  private readonly swiperContainer = viewChild<ElementRef<SwiperHost>>('swiperEl');

  prev(): void {
    this.swiperContainer()?.nativeElement.swiper?.slidePrev();
  }

  next(): void {
    this.swiperContainer()?.nativeElement.swiper?.slideNext();
  }
}
