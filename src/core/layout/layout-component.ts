import { Component, DestroyRef, HostListener, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';

import { SeoService } from '../seo/seo.service';
import { CallbackModalComponent } from '../../shared/components/callback-modal/callback-modal.component';
import { CallbackModalService } from '../../shared/components/callback-modal/callback-modal.service';
import { VislaToastComponent } from '../../shared/components/toast/visla-toast.component';

import {
  FOOTER_COMPANY_TEXT,
  FOOTER_DISCLAIMER,
  FOOTER_TG_HREF,
  FOOTER_WA_PHONE,
  LAYOUT_NAV_LINKS,
} from './constants/layout.const';

@Component({
  selector: 'visla-layout-component',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    CallbackModalComponent,
    VislaToastComponent,
  ],
  templateUrl: './layout-component.html',
  styleUrl: './layout-component.scss',
})
export class LayoutComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);
  private readonly seo = inject(SeoService);
  private readonly callbackModal = inject(CallbackModalService);

  readonly menuOpen = signal(false);

  readonly navLinks = LAYOUT_NAV_LINKS;
  readonly footerNavLinks = LAYOUT_NAV_LINKS;
  readonly footerDisclaimer = FOOTER_DISCLAIMER;
  readonly footerCompanyText = FOOTER_COMPANY_TEXT;

  readonly phoneDisplay = '+7 (3532) 40-92-46';
  readonly phoneHref = 'tel:+73532409246';
  readonly waHref = `https://wa.me/${FOOTER_WA_PHONE}`;
  readonly tgHref = FOOTER_TG_HREF;
  readonly callbackModalUi = this.callbackModal;

  constructor() {
    const wideMq = matchMedia('(min-width: 1440px)');
    const onWideChange = () => {
      if (wideMq.matches) {
        this.closeMenu();
      }
    };
    wideMq.addEventListener('change', onWideChange);
    this.destroyRef.onDestroy(() => wideMq.removeEventListener('change', onWideChange));
  }

  ngOnInit(): void {
    this.seo.applyForCurrentRoute();
    this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        this.closeMenu();
        this.seo.applyForCurrentRoute();
      });
  }

  toggleMenu(): void {
    this.menuOpen.update((v) => !v);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  openCallbackModal(): void {
    this.callbackModal.open();
  }

  onCallbackToastClosed(): void {
    this.callbackModal.hideSuccessToast();
  }

  @HostListener('document:keydown.escape')
  onDocumentEscape(): void {
    if (this.menuOpen()) {
      this.closeMenu();
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.menuOpen()) {
      return;
    }
    const el = event.target;
    if (!(el instanceof Element)) {
      return;
    }
    if (el.closest('.mobile-nav') || el.closest('.header__menu-toggle')) {
      return;
    }
    this.closeMenu();
  }
}
