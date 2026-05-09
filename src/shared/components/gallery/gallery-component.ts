import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  DestroyRef,
  ElementRef,
  HostListener,
  Injector,
  OnInit,
  afterNextRender,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { CallbackModalService } from '../callback-modal/callback-modal.service';
import {
  WORK_GALLERY_BY_PATH,
  type IGalleryPhoto,
  type WorkGalleryPath,
} from './constants/gallery.const';

type SwiperHost = HTMLElement & {
  swiper?: { slidePrev: () => void; slideNext: () => void; slideTo: (i: number, speed?: number) => void };
};

@Component({
  selector: 'visla-gallery',
  imports: [RouterLink],
  templateUrl: './gallery-component.html',
  styleUrl: './gallery-component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GalleryComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  private readonly injector = inject(Injector);
  private readonly callbackModal = inject(CallbackModalService);

  private readonly lightboxSwiper = viewChild<ElementRef<SwiperHost>>('lightboxSwiperEl');

  protected productSlug = '';
  protected pageTitle = '';
  protected photos: readonly IGalleryPhoto[] = [];

  protected readonly lightboxOpen = signal(false);
  protected readonly lightboxIndex = signal(0);

  constructor() {
    this.destroyRef.onDestroy(() => {
      document.body.style.overflow = '';
    });
  }

  protected onOpenCallbackModal(): void {
    this.callbackModal.open();
  }

  ngOnInit(): void {
    const path = this.route.snapshot.paramMap.get('galleryPath') as WorkGalleryPath;
    const def = WORK_GALLERY_BY_PATH[path];
    const parentSlug = this.route.parent?.snapshot.paramMap.get('slug') ?? '';
    this.productSlug = parentSlug || def.productSlug;
    this.pageTitle = def.heading;
    this.photos = def.photos;
  }

  protected openLightbox(index: number): void {
    this.lightboxIndex.set(index);
    this.lightboxOpen.set(true);
    document.body.style.overflow = 'hidden';
    afterNextRender(
      () => {
        this.syncLightboxSwiperToIndex(index);
      },
      { injector: this.injector },
    );
  }

  /** `initial-slide` у web-компонента ненадёжен при первом рендере — выставляем слайд явно. */
  private syncLightboxSwiperToIndex(index: number, attempt = 0): void {
    if (!this.lightboxOpen()) {
      return;
    }
    const sw = this.lightboxSwiper()?.nativeElement?.swiper;
    if (sw?.slideTo) {
      sw.slideTo(index, 0);
      return;
    }
    if (attempt < 48) {
      requestAnimationFrame(() => this.syncLightboxSwiperToIndex(index, attempt + 1));
    }
  }

  protected closeLightbox(): void {
    this.lightboxOpen.set(false);
    document.body.style.overflow = '';
  }

  protected lightboxPrev(): void {
    this.lightboxSwiper()?.nativeElement.swiper?.slidePrev();
  }

  protected lightboxNext(): void {
    this.lightboxSwiper()?.nativeElement.swiper?.slideNext();
  }

  @HostListener('document:keydown', ['$event'])
  protected onDocumentKeydown(event: KeyboardEvent): void {
    if (!this.lightboxOpen()) {
      return;
    }
    if (event.key === 'Escape') {
      event.preventDefault();
      this.closeLightbox();
      return;
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.lightboxPrev();
      return;
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.lightboxNext();
    }
  }
}
