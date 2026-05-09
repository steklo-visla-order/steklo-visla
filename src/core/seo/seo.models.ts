export interface SeoRouteData {
  title: string;
  description: string;
  keywords?: string;
  /**
   * Путь канонического URL без origin (например `/privacy-policy`), если он должен отличаться от
   * текущего адреса — например для дубликата страницы (`/agreement` → одна политика).
   */
  canonicalPath?: string;
}
