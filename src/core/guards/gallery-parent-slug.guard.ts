import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import {
  WORK_GALLERY_BY_PATH,
  type WorkGalleryPath,
} from '../../shared/components/gallery/constants/gallery.const';

/** URL вида `/products/{slug}/{galleryPath}`: сегмент slug должен совпадать с `productSlug` галереи. */
export const galleryParentSlugGuard: CanActivateFn = (route) => {
  const parentSlug = route.parent?.paramMap.get('slug') ?? '';
  const galleryPath = route.paramMap.get('galleryPath') as WorkGalleryPath;
  const def = WORK_GALLERY_BY_PATH[galleryPath];
  if (!def) {
    return inject(Router).parseUrl('/products');
  }
  if (parentSlug === def.productSlug) {
    return true;
  }
  return inject(Router).createUrlTree(['/products', def.productSlug, galleryPath]);
};
