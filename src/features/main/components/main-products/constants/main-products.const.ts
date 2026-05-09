import { IMainProductsSlide } from '../models/main-products.models';


export const MAIN_PRODUCTS_SWIPER_BREAKPOINTS: Record<
  number,
  { slidesPerView: number; spaceBetween: number }
> = {
  480: { slidesPerView: 1, spaceBetween: 12 },
  600: { slidesPerView: 2, spaceBetween: 14 },
  768: { slidesPerView: 3, spaceBetween: 16 },
  1024: { slidesPerView: 3, spaceBetween: 18 },
  1280: { slidesPerView: 3, spaceBetween: 20 },
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
