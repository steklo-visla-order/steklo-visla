import type { ProductsDetailSlug } from '../../../../features/products/components/products-detail/constants/products-detail.const';

export interface IGalleryPhoto {
  src: string;
  alt: string;
}

export type WorkGalleryPath =
  | 'interior-gallery'
  | 'office-gallery'
  | 'frameless-gallery'
  | 'visors-gallery'
  | 'shower-gallery-1'
  | 'shower-gallery-2'
  | 'shower-gallery-3'
  | 'shower-gallery-4'
  | 'shower-gallery-5'
  | 'shower-gallery-6';

export interface IWorkGalleryDefinition {
  /** Раздел продукции: ссылка «назад» ведёт на `/products/{productSlug}` */
  productSlug: ProductsDetailSlug;
  heading: string;
  seoTitle: string;
  seoDescription: string;
  photos: readonly IGalleryPhoto[];
}

/** URL: `/products/{productSlug}/{path}` — например `/products/interior/interior-gallery`. */
export const WORK_GALLERY_BY_PATH: Record<WorkGalleryPath, IWorkGalleryDefinition> = {
  'interior-gallery': {
    productSlug: 'interior',
    heading: 'интерьерные перегородки',
    seoTitle: 'Фото работ — интерьерные перегородки — Visla',
    seoDescription:
      'Реализованные объекты: интерьерные стеклянные перегородки. Галерея монтажей и интерьеров.',
    photos: [
      {
        src: '/variants-image/variants-detail-image/interior/hero-1.png',
        alt: 'Интерьерная стеклянная перегородка в жилом пространстве',
      },
      {
        src: '/variants-image/variants-detail-image/interior/2.png',
        alt: 'Перегородка из стекла с матовым напылением',
      },
      {
        src: '/variants-image/variants-detail-image/interior/3.png',
        alt: 'Зонирование комнаты стеклянной перегородкой',
      },
    ],
  },
  'office-gallery': {
    productSlug: 'office',
    heading: 'офисные перегородки',
    seoTitle: 'Фото работ — офисные перегородки — Visla',
    seoDescription: 'Реализованные объекты: офисные стеклянные перегородки. Галерея монтажей.',
    photos: [
      {
        src: '/variants-image/variants-detail-image/office/1.png',
        alt: 'Офисные стеклянные перегородки',
      },
      {
        src: '/projects-image/2.png',
        alt: 'Офисная перегородка, система лофт',
      },
      {
        src: '/projects-image/3.png',
        alt: 'Межкомнатная перегородка в офисном стиле',
      },
    ],
  },
  'frameless-gallery': {
    productSlug: 'frameless',
    heading: 'безрамное остекление',
    seoTitle: 'Фото работ — безрамное остекление — Visla',
    seoDescription:
      'Реализованные объекты: безрамное остекление террас и проёмов. Галерея фотографий.',
    photos: [
      {
        src: '/variants-image/variants-detail-image/frameless/1.png',
        alt: 'Безрамное остекление террасы',
      },
      {
        src: '/projects-image/5.png',
        alt: 'Раздвижное остекление проёма',
      },
      {
        src: '/projects-image/6.png',
        alt: 'Стеклянное ограждение без рам',
      },
    ],
  },
  'visors-gallery': {
    productSlug: 'visors',
    heading: 'стеклянные козырьки',
    seoTitle: 'Фото работ — стеклянные козырьки — Visla',
    seoDescription: 'Реализованные объекты: стеклянные козырьки и навесы. Галерея монтажей.',
    photos: [
      {
        src: '/variants-image/variants-detail-image/visors/1.png',
        alt: 'Стеклянный козырёк на точечных креплениях',
      },
      {
        src: '/variants-image/variants-detail-image/visors/2.png',
        alt: 'Козырёк из закалённого стекла',
      },
      {
        src: '/projects-image/4.png',
        alt: 'Стеклянные козырьки на вантах',
      },
    ],
  },
  'shower-gallery-1': {
    productSlug: 'shower',
    heading: 'раздвижная угловая душевая перегородка (вариант 1)',
    seoTitle: 'Фото работ — раздвижная угловая душевая перегородка — Visla',
    seoDescription: 'Реализованные объекты: угловая раздвижная душевая перегородка из стекла.',
    photos: [
      {
        src: '/variants-image/variants-detail-image/shower/hero-1.png',
        alt: 'Душевая перегородка из рифлёного стекла',
      },
      {
        src: '/variants-image/variants-detail-image/shower/1.png',
        alt: 'Стеклянная душевая перегородка',
      },
    ],
  },
  'shower-gallery-2': {
    productSlug: 'shower',
    heading: 'раздвижная угловая душевая перегородка (вариант 2)',
    seoTitle: 'Фото работ — угловая душевая перегородка, вариант 2 — Visla',
    seoDescription: 'Реализованные объекты: душевая перегородка из стекла.',
    photos: [
      {
        src: '/variants-image/variants-detail-image/shower/2.png',
        alt: 'Душевая дверь из стекла',
      },
      {
        src: '/variants-image/variants-detail-image/shower/hero-2.png',
        alt: 'Душевая кабина с тонированным стеклом',
      },
    ],
  },
  'shower-gallery-3': {
    productSlug: 'shower',
    heading: 'раздвижная душевая перегородка в линию',
    seoTitle: 'Фото работ — душевая перегородка в линию — Visla',
    seoDescription: 'Реализованные объекты: душевая перегородка в линию.',
    photos: [
      {
        src: '/variants-image/variants-detail-image/shower/3.png',
        alt: 'Нестандартная душевая перегородка',
      },
      {
        src: '/variants-image/variants-detail-image/shower/hero-3.png',
        alt: 'Стеклянная душевая перегородка в ванной',
      },
    ],
  },
  'shower-gallery-4': {
    productSlug: 'shower',
    heading: 'распашная угловая душевая перегородка',
    seoTitle: 'Фото работ — распашная угловая душевая перегородка — Visla',
    seoDescription: 'Реализованные объекты: распашная душевая перегородка.',
    photos: [
      {
        src: '/variants-image/variants-detail-image/shower/hero-1.png',
        alt: 'Душевая перегородка',
      },
      {
        src: '/variants-image/variants-detail-image/shower/3.png',
        alt: 'Угловая душевая система',
      },
    ],
  },
  'shower-gallery-5': {
    productSlug: 'shower',
    heading: 'раздвижная душевая перегородка с дверью',
    seoTitle: 'Фото работ — душевая перегородка с дверью — Visla',
    seoDescription: 'Реализованные объекты: душевая перегородка со створкой.',
    photos: [
      {
        src: '/projects-image/5.png',
        alt: 'Душевая система, пример объекта',
      },
      {
        src: '/variants-image/variants-detail-image/shower/1.png',
        alt: 'Стеклянная душевая перегородка',
      },
    ],
  },
  'shower-gallery-6': {
    productSlug: 'shower',
    heading: 'раздвижная душевая перегородка — трапеция',
    seoTitle: 'Фото работ — душевая перегородка трапеция — Visla',
    seoDescription: 'Реализованные объекты: душевая перегородка нестандартной формы.',
    photos: [
      {
        src: '/projects-image/7.png',
        alt: 'Душевая система угловая',
      },
      {
        src: '/variants-image/variants-detail-image/shower/2.png',
        alt: 'Душевая перегородка из стекла',
      },
    ],
  },
};
