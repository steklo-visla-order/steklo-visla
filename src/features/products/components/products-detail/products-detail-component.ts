import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { CallbackModalService } from '../../../../shared/components/callback-modal/callback-modal.service';
import { PRODUCTS_DETAIL_PAGES, type ProductsDetailSlug } from './constants/products-detail.const';
import type { IProductsDetailPage } from './models/products-detail.models';

@Component({
  selector: 'visla-products-detail',
  imports: [RouterLink],
  templateUrl: './products-detail-component.html',
  styleUrl: './products-detail-component.scss',
})
export class ProductsDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly callbackModal = inject(CallbackModalService);

  page!: IProductsDetailPage;
  /** Сегмент URL карточки: `/products/{sectionSlug}/…` */
  protected sectionSlug!: ProductsDetailSlug;

  ngOnInit(): void {
    const slug = (this.route.parent?.snapshot.paramMap.get('slug') ??
      this.route.snapshot.paramMap.get('slug')) as ProductsDetailSlug;
    this.sectionSlug = slug;
    this.page = PRODUCTS_DETAIL_PAGES[slug];
  }

  protected onOpenCallbackModal(): void {
    this.callbackModal.open();
  }
}
