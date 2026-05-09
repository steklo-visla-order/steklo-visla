import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import type { ActivatedRouteSnapshot } from '@angular/router';
import { Router } from '@angular/router';

import { SEO_DEFAULT_KEYWORDS, SEO_HOME, SITE_ORIGIN } from './seo.const';
import type { SeoRouteData } from './seo.models';

const JSON_LD_SCRIPT_ID = 'visla-schema-org';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);
  private readonly router = inject(Router);

  applyForCurrentRoute(): void {
    const leaf = this.leafSnapshot(this.router.routerState.snapshot.root);
    const seo = (leaf.data?.['seo'] as SeoRouteData | undefined) ?? SEO_HOME;
    const path = this.router.url.split('?')[0] || '/';
    const canonicalPath = seo.canonicalPath ?? (path === '/' ? '' : path);
    const canonical = `${SITE_ORIGIN}${canonicalPath === '/' ? '' : canonicalPath}`;
    const ogImageUrl = `${SITE_ORIGIN}/logo.png`;
    const ogImageAlt = 'Visla — логотип';

    this.title.setTitle(seo.title);
    this.meta.updateTag({ name: 'description', content: seo.description });
    this.meta.updateTag({ name: 'keywords', content: seo.keywords ?? SEO_DEFAULT_KEYWORDS });

    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:locale', content: 'ru_RU' });
    this.meta.updateTag({ property: 'og:url', content: canonical });
    this.meta.updateTag({ property: 'og:title', content: seo.title });
    this.meta.updateTag({ property: 'og:description', content: seo.description });
    this.meta.updateTag({ property: 'og:site_name', content: 'Visla' });
    this.meta.updateTag({ property: 'og:image', content: ogImageUrl });
    this.meta.updateTag({ property: 'og:image:alt', content: ogImageAlt });

    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: seo.title });
    this.meta.updateTag({ name: 'twitter:description', content: seo.description });
    this.meta.updateTag({ name: 'twitter:image', content: ogImageUrl });
    this.meta.updateTag({ name: 'twitter:image:alt', content: ogImageAlt });

    this.setCanonical(canonical);
    this.ensureJsonLdOrganization();
  }

  private leafSnapshot(root: ActivatedRouteSnapshot): ActivatedRouteSnapshot {
    let node: ActivatedRouteSnapshot = root;
    while (node.firstChild) {
      node = node.firstChild;
    }
    return node;
  }

  private setCanonical(href: string): void {
    const head = this.document.head;
    let link = head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      head.appendChild(link);
    }
    link.setAttribute('href', href);
  }

  private ensureJsonLdOrganization(): void {
    if (this.document.getElementById(JSON_LD_SCRIPT_ID)) {
      return;
    }
    const payload = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          name: 'Visla',
          url: SITE_ORIGIN,
          logo: `${SITE_ORIGIN}/logo.png`,
          description:
            'Производитель современных стеклянных перегородок для офисов и квартир. Проектирование, производство и монтаж.',
          telephone: '+7-3532-40-92-46',
        },
        {
          '@type': 'WebSite',
          name: 'Visla',
          url: SITE_ORIGIN,
          inLanguage: 'ru-RU',
          publisher: { '@type': 'Organization', name: 'Visla' },
        },
      ],
    };
    const script = this.document.createElement('script');
    script.id = JSON_LD_SCRIPT_ID;
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(payload);
    this.document.head.appendChild(script);
  }
}
