export type IMainProductsSlideAccent = 'light' | 'dark';

export interface IMainProductsSlide {
  /** Сегмент URL страницы детальной информации: `/products/{slug}` */
  slug: string;
  image: string;
  alt: string;
  title: string;
  category: string;
  accent: IMainProductsSlideAccent;
}

export type SwiperHost = HTMLElement & {
  swiper?: { slidePrev: () => void; slideNext: () => void };
};
