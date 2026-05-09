import { IProjectsSlide } from '../models/projects.model';

/**
 * Как у main-products: 1 слайд до 768px, 3 от 768px.
 */
export const PROJECTS_SWIPER_BREAKPOINTS: Record<
  string,
  { slidesPerView: number; spaceBetween: number }
> = {
  '0': { slidesPerView: 1, spaceBetween: 16 },
  '768': { slidesPerView: 3, spaceBetween: 16 },
};

export const PROJECTS_SLIDES: readonly IProjectsSlide[] = [
  {
    image: '/projects-image/1.png',
    alt: 'Душевая система',
    title: 'Душевая система',
    subtitle: 'распашная',
    category: 'Подробнее',
    accent: 'light',
    glass: '8мм, прозрачное, закаленное, полированное + матовое',
    fittings:
      'Цвет черный, матовая нержавеющая сталь, Профиль алюминий, Магнитное примыкание дверей',
  },
  {
    image: '/projects-image/2.png',
    alt: 'Офисная перегородка',
    title: 'Офисная перегородка',
    subtitle: 'система Лофт премиум',
    category: 'Подробнее',
    accent: 'dark',
    glass: '6мм, прозрачное, закаленное, полированное',
    fittings: 'Цвет черный, итальянская, Дверь с доводчиком, Без порога',
  },
  {
    image: '/projects-image/3.png',
    alt: 'Межкомнатная перегородка',
    title: 'Межкомнатная перегородка',
    subtitle: 'система Лофт премиум',
    category: 'Подробнее',
    accent: 'light',
    glass: '6мм, тонированное, закаленное, полированное',
    fittings: 'Цвет черный, итальянская, Система телескопико, без доводчика, Без порога',
  },
  {
    image: '/projects-image/4.png',
    alt: 'Стеклянные козырьки',
    title: 'Стеклянные козырьки',
    subtitle: 'На вантах',
    category: 'Подробнее',
    accent: 'dark',
    glass: '10+10мм, закаленное, прозрачное, полированное',
    fittings: 'нержавеющая сталь',
    size: 'Общая ширина двух козырьков: 6000мм, вылет 1700мм',
  },
  {
    image: '/projects-image/5.png',
    alt: 'Душевая система',
    title: 'Душевая система',
    subtitle: 'угловая, распашная',
    category: 'Подробнее',
    accent: 'light',
    glass: '8 мм, прозрачное, закаленное, полированное',
    fittings: 'Цвет бронзовый, премиум фурнитура, Ручка скоба, Магнитное примыкание дверей',
  },
  {
    image: '/projects-image/6.png',
    alt: 'Душевая система',
    title: 'Душевая система',
    subtitle: 'угловая раздвижная',
    category: 'Подробнее',
    accent: 'dark',
    glass: '8мм, прозрачное, закаленное, полированное',
    fittings:
      'черная из нержавеющей стали, По стенам коннектора + уплотнитель, Магнитное примыкание дверей',
  },
  {
    image: '/projects-image/7.png',
    alt: 'Душевая система',
    title: 'Душевая система',
    subtitle: 'угловая распашная',
    category: 'Подробнее',
    accent: 'light',
    glass: '8мм, тонированное, закаленное, полированное',
    fittings: 'Цвет черный, матовый, нержавеющая сталь, Ручка скоба, Магнитное примыкание дверей ',
  },
  {
    image: '/projects-image/8.png',
    alt: 'Душевая система',
    title: 'Душевая система',
    subtitle: 'распашная',
    category: 'Подробнее',
    accent: 'dark',
    glass: '8мм, прозрачное, закаленное, полированное',
    fittings:
      'Цвет черный, Возможность сделать открывание в обе стороны, Магнитное примыкание дверей ',
  },
];
