import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { PRODUCTS_DETAIL_PAGES } from '../../features/products/components/products-detail/constants/products-detail.const';

export const productsDetailSlugGuard: CanActivateFn = (route) => {
  const slug = route.paramMap.get('slug');
  if (slug && slug in PRODUCTS_DETAIL_PAGES) {
    return true;
  }
  return inject(Router).parseUrl('/products');
};
