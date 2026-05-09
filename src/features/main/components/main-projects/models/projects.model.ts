export type IProjectsSlideAccent = 'light' | 'dark';

export interface IProjectsSlide {
  image: string;
  alt: string;
  title: string;
  /** Подзаголовок под основным заголовком */
  subtitle: string;
  /** Текст на кнопке внизу (как в variants) */
  category: string;
  accent: IProjectsSlideAccent;
  glass: string;
  fittings: string;
  /** Необязательно */
  size?: string;
}

export type SwiperHost = HTMLElement & {
  swiper?: { slidePrev: () => void; slideNext: () => void };
  breakpoints?: Record<number, { slidesPerView: number; spaceBetween: number }>;
};
