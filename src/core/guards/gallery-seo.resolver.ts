import type { ResolveFn } from '@angular/router';

import { SEO_DEFAULT_KEYWORDS } from '../seo/seo.const';
import type { SeoRouteData } from '../seo/seo.models';
import {
  WORK_GALLERY_BY_PATH,
  type WorkGalleryPath,
} from '../../shared/components/gallery/constants/gallery.const';

export const gallerySeoResolver: ResolveFn<SeoRouteData> = (route) => {
  const path = route.paramMap.get('galleryPath') as WorkGalleryPath;
  const def = WORK_GALLERY_BY_PATH[path];

  return {
    title: def.seoTitle,
    description: def.seoDescription,
    keywords: SEO_DEFAULT_KEYWORDS,
  };
};
