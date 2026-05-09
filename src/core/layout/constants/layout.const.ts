import { LayoutNavLink } from '../models/layout.models';

export const LAYOUT_NAV_LINKS: readonly LayoutNavLink[] = [
  { path: '/', label: 'Главная', linkExact: true },
  { path: '/products', label: 'Продукция' },
  { path: '/projects', label: 'Проекты' },
  { path: '/contacts', label: 'Контакты' },
  { path: '/partnership', label: 'Сотрудничество' },
];

export const FOOTER_DISCLAIMER =
  'Сайт не является публичной офертой. Вся информация, размещённая на Сайте, носит исключительно информационный характер и не является исчерпывающей. Все условия приобретения продукции, цены, специальные предложения указаны в информационных целях.';
export const FOOTER_COMPANY_TEXT =
  'Производитель современных стеклянных перегородок для офисов и квартир. Решаем задачи по зонированию пространства.';

export const FOOTER_WA_PHONE = '73532409246';
export const FOOTER_TG_HREF = 'https://t.me/';
