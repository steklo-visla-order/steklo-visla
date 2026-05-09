import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, viewChild } from '@angular/core';

import { PROJECTS_SLIDES, PROJECTS_SWIPER_BREAKPOINTS } from './constants/projects.const';
import { SwiperHost } from './models/projects.model';

@Component({
  selector: 'visla-main-projects',
  imports: [],
  templateUrl: './main-projects-component.html',
  styleUrl: './main-projects-component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MainProjectsComponent {
  readonly slides = PROJECTS_SLIDES;
  readonly swiperBreakpointsAttr = JSON.stringify(PROJECTS_SWIPER_BREAKPOINTS);

  private readonly swiperContainer = viewChild<ElementRef<SwiperHost>>('swiperEl');

  prev(): void {
    this.swiperContainer()?.nativeElement.swiper?.slidePrev();
  }

  next(): void {
    this.swiperContainer()?.nativeElement.swiper?.slideNext();
  }
}
