import { IMainProductsSlide } from '../models/main-products.models';

/** До 768px — один слайд на экран (читаемая карточка на телефонах); от 768px — 3 в ряд. */
export const MAIN_PRODUCTS_SWIPER_BREAKPOINTS: Record<
  string,
  { slidesPerView: number; spaceBetween: number }
> = {
  '0': { slidesPerView: 1, spaceBetween: 16 },
  '768': { slidesPerView: 3, spaceBetween: 16 },
};

export const MAIN_PRODUCTS_SLIDES: readonly IMainProductsSlide[] = [
  {
    slug: 'interior',
    image: '/variants-image/interior.png',
    alt: 'Интерьерные перегородки',
    title: 'Интерьерные перегородки',
    category: 'Подробнее',
    accent: 'light',
  },
  {
    slug: 'office',
    image: '/variants-image/office.png',
    alt: 'Офисные перегородки',
    title: 'Офисные перегородки',
    category: 'Подробнее',
    accent: 'dark',
  },
  {
    slug: 'shower',
    image: '/variants-image/shower.png',
    alt: 'Душевые перегородки',
    title: 'Душевые перегородки',
    category: 'Подробнее',
    accent: 'light',
  },
  {
    slug: 'frameless',
    image: '/variants-image/without-border.png',
    alt: 'Безрамное остекление',
    title: 'Безрамное остекление',
    category: 'Подробнее',
    accent: 'dark',
  },
  {
    slug: 'visors',
    image: '/variants-image/visors.png',
    alt: 'Стеклянные козырьки',
    title: 'Стеклянные козырьки',
    category: 'Подробнее',
    accent: 'light',
  },
];
