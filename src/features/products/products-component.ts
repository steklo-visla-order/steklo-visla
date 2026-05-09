import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MAIN_PRODUCTS_SLIDES } from '../main/components/main-products/constants/main-products.const';

@Component({
  selector: 'visla-products',
  imports: [RouterLink],
  templateUrl: './products-component.html',
  styleUrl: './products-component.scss',
})
export class ProductsComponent {
  protected readonly slides = MAIN_PRODUCTS_SLIDES;
}
