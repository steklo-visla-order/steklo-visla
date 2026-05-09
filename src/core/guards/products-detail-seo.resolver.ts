import type { ResolveFn } from '@angular/router';

import { SEO_DEFAULT_KEYWORDS } from '../seo/seo.const';
import type { SeoRouteData } from '../seo/seo.models';

import {
  PRODUCTS_DETAIL_PAGES,
  type ProductsDetailSlug,
} from '../../features/products/components/products-detail/constants/products-detail.const';

export const productsDetailSeoResolver: ResolveFn<SeoRouteData> = (route) => {
  const slug = (route.parent?.paramMap.get('slug') ?? route.paramMap.get('slug')) as ProductsDetailSlug;
  const page = PRODUCTS_DETAIL_PAGES[slug];

  return {
    title: page.seoTitle,
    description: page.seoDescription,
    keywords: SEO_DEFAULT_KEYWORDS,
  };
};
