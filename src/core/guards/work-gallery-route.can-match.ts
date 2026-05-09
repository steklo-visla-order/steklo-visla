import { CanMatchFn } from '@angular/router';

import { WORK_GALLERY_BY_PATH } from '../../shared/components/gallery/constants/gallery.const';

/** Вложенный сегмент `/products/:slug/:galleryPath` — второй сегмент должен быть ключом галереи. */
export const workGalleryRouteCanMatch: CanMatchFn = (_route, segments) => {
  const seg = segments[0]?.path ?? '';
  return seg in WORK_GALLERY_BY_PATH;
};
