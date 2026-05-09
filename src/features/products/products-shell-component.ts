import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'visla-products-shell',
  imports: [RouterOutlet],
  template: '<router-outlet />',
  styles: [':host { display: block; width: 100%; min-width: 0; }'],
})
export class ProductsShellComponent {}
