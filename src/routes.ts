import { Routes } from '@angular/router';

import {
  SEO_AGREEMENT_CANONICAL,
  SEO_CONTACTS,
  SEO_HOME,
  SEO_PARTNERSHIP,
  SEO_PRIVACY_POLICY,
  SEO_PRODUCTS,
  SEO_PROJECTS,
} from './core/seo/seo.const';
import { productsDetailSeoResolver } from './core/guards/products-detail-seo.resolver';
import { productsDetailSlugGuard } from './core/guards/products-detail-slug.guard';
import { workGalleryRouteCanMatch } from './core/guards/work-gallery-route.can-match';
import { galleryParentSlugGuard } from './core/guards/gallery-parent-slug.guard';
import { gallerySeoResolver } from './core/guards/gallery-seo.resolver';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./core/layout/layout-component').then((m) => m.LayoutComponent),
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('./features/main/main-component').then((m) => m.MainComponent),
        data: { seo: SEO_HOME },
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./features/products/products-shell-component').then(
            (m) => m.ProductsShellComponent,
          ),
        children: [
          {
            path: '',
            pathMatch: 'full',
            loadComponent: () =>
              import('./features/products/products-component').then((m) => m.ProductsComponent),
            data: { seo: SEO_PRODUCTS },
          },
          {
            path: ':slug',
            canActivate: [productsDetailSlugGuard],
            loadComponent: () =>
              import('./features/products/components/products-detail/products-detail-shell-component').then(
                (m) => m.ProductsDetailShellComponent,
              ),
            children: [
              {
                path: '',
                pathMatch: 'full',
                resolve: { seo: productsDetailSeoResolver },
                loadComponent: () =>
                  import('./features/products/components/products-detail/products-detail-component').then(
                    (m) => m.ProductsDetailComponent,
                  ),
              },
              {
                path: ':galleryPath',
                canMatch: [workGalleryRouteCanMatch],
                canActivate: [galleryParentSlugGuard],
                resolve: { seo: gallerySeoResolver },
                loadComponent: () =>
                  import('./shared/components/gallery/gallery-component').then((m) => m.GalleryComponent),
              },
            ],
          },
        ],
      },
      {
        path: 'projects',
        loadComponent: () =>
          import('./features/projects/projects-component').then((m) => m.ProjectsComponent),
        data: { seo: SEO_PROJECTS },
      },
      {
        path: 'contacts',
        loadComponent: () =>
          import('./features/contacts/contacts-component').then((m) => m.ContactsComponent),
        data: { seo: SEO_CONTACTS },
      },
      {
        path: 'partnership',
        loadComponent: () =>
          import('./features/partnership/partnership-component').then(
            (m) => m.PartnershipComponent,
          ),
        data: { seo: SEO_PARTNERSHIP },
      },
      {
        path: 'privacy-policy',
        loadComponent: () =>
          import('./features/privacy-policy/privacy-policy-component').then(
            (m) => m.PrivacyPolicyComponent,
          ),
        data: { seo: SEO_PRIVACY_POLICY },
      },
      {
        path: 'agreement',
        loadComponent: () =>
          import('./features/privacy-policy/privacy-policy-component').then(
            (m) => m.PrivacyPolicyComponent,
          ),
        data: { seo: SEO_AGREEMENT_CANONICAL },
      },
    ],
  },
];
