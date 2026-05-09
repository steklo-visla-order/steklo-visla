export interface IProductsDetailCard {
  title: string;
  description: string;
  image: string;
  alt: string;
  priceFrom: string;
  /** Сегмент URL галереи: `/products/{slug}/{galleryPath}` */
  galleryPath: string;
}

export interface IProductsDetailGalleryImage {
  src: string;
  alt: string;
}

export type IProductsDetailHeroGallery = readonly [
  IProductsDetailGalleryImage,
  IProductsDetailGalleryImage,
  IProductsDetailGalleryImage,
];

export interface IProductsDetailPage {
  slug: string;
  heroTitle: string;
  lead: string;
  heroGallery: IProductsDetailHeroGallery;
  cardsTitle: string;
  cards: readonly IProductsDetailCard[];
  seoTitle: string;
  seoDescription: string;
}
