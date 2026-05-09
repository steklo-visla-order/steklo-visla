import { FOOTER_COMPANY_TEXT } from '../layout/constants/layout.const';

import type { SeoRouteData } from './seo.models';

/**
 * Публичный URL сайта: каноникал, Open Graph, JSON-LD.
 * Должен совпадать с доменом в `public/robots.txt` и `public/sitemap.xml`.
 */
export const SITE_ORIGIN = 'https://steklo-visla.ru';

export const SEO_DEFAULT_KEYWORDS =
  'стеклянные перегородки, офисные перегородки, производство перегородок, монтаж стекла, зонирование помещений, Visla';

export const SEO_HOME: SeoRouteData = {
  title: 'Visla — производство и монтаж стеклянных перегородок',
  description: `${FOOTER_COMPANY_TEXT} Проектирование, замер, доставка и установка. Более 1500 проектов.`,
  keywords: SEO_DEFAULT_KEYWORDS,
};

export const SEO_PRODUCTS: SeoRouteData = {
  title: 'Продукция — Visla',
  description:
    'Каталог и виды стеклянных перегородок Visla: офисные и интерьерные решения, зонирование пространства.',
  keywords: 'продукция, стеклянные перегородки, каталог Visla',
};

export const SEO_PROJECTS: SeoRouteData = {
  title: 'Проекты — Visla',
  description:
    'Реализованные проекты по стеклянным перегородкам: офисы, квартиры и коммерческие объекты.',
  keywords: 'проекты, портфолио, стеклянные перегородки примеры',
};

export const SEO_CONTACTS: SeoRouteData = {
  title: 'Контакты — Visla',
  description:
    'Контакты Visla: телефон, мессенджеры. Свяжитесь с нами для консультации и выезда замерщика.',
  keywords: 'контакты Visla, телефон, заказать перегородки',
};

export const SEO_PARTNERSHIP: SeoRouteData = {
  title: 'Сотрудничество — Visla',
  description: 'Условия сотрудничества с Visla: поставки, подряд, партнёрские программы.',
  keywords: 'сотрудничество, партнёры, дилерам',
};

export const SEO_PRIVACY_POLICY: SeoRouteData = {
  title: 'Политика конфиденциальности — Visla',
  description:
    'Политика ООО «ВИСЛА» в отношении обработки персональных данных: цели, условия, cookie, права субъектов данных.',
  keywords:
    'политика конфиденциальности, персональные данные, 152-ФЗ, обработка данных, cookie, Visla',
};

/** Тот же текст, что и политика; канонический URL — `/privacy-policy`. */
export const SEO_AGREEMENT_CANONICAL: SeoRouteData = {
  ...SEO_PRIVACY_POLICY,
  canonicalPath: '/privacy-policy',
};
