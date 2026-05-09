import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  effect,
  inject,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { EmailJsLeadService } from '../../../core/services/emailjs-lead.service';
import { PhoneRuMaskDirective } from '../../phone-ru-mask.directive';
import { VislaToastComponent } from '../toast/visla-toast.component';
import {
  nameFieldValidators,
  phoneFieldValidators,
} from '../../../features/main/components/main-form/constants/form.const';
import { CallbackModalService } from './callback-modal.service';

@Component({
  selector: 'visla-callback-modal',
  imports: [ReactiveFormsModule, PhoneRuMaskDirective, RouterLink, VislaToastComponent],
  templateUrl: './callback-modal.component.html',
  styleUrl: './callback-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CallbackModalComponent {
  private static readonly CLOSE_ANIMATION_MS = 220;
  private readonly fb = inject(FormBuilder);
  private readonly emailJsLead = inject(EmailJsLeadService);
  private readonly document = inject(DOCUMENT);
  private readonly window = this.document.defaultView;
  readonly callbackModal = inject(CallbackModalService);
  readonly isClosing = signal(false);
  private closeTimeoutId: ReturnType<typeof setTimeout> | null = null;
  private lockedScrollY: number | null = null;
  private showSuccessToastAfterClose = false;

  readonly form = this.fb.nonNullable.group({
    name: ['', nameFieldValidators],
    phone: ['', phoneFieldValidators],
    comment: [''],
    consent: [true, Validators.requiredTrue],
  });

  readonly errorToastText = 'Ошибка отправки данных на сервер';

  submitting = false;
  submitted = false;
  errorToastVisible = false;

  constructor() {
    effect(() => {
      const shouldLockScroll = this.callbackModal.isOpen() || this.isClosing();
      if (shouldLockScroll) {
        this.lockPageScroll();
      } else {
        this.unlockPageScroll();
      }
    });

    effect(() => {
      if (!this.callbackModal.isOpen()) {
        return;
      }
      this.cancelCloseTimeout();
      this.isClosing.set(false);
    });
  }

  shouldRender(): boolean {
    return this.callbackModal.isOpen() || this.isClosing();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.callbackModal.isOpen()) {
      this.close();
    }
  }

  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  onBackdropKeydown(event: KeyboardEvent): void {
    const key = event.key;
    if (key !== 'Enter' && key !== ' ') {
      return;
    }
    if (event.target === event.currentTarget) {
      event.preventDefault();
      this.close();
    }
  }

  close(): void {
    if (this.isClosing()) {
      return;
    }
    this.isClosing.set(true);
    this.cancelCloseTimeout();
    this.closeTimeoutId = setTimeout(() => {
      this.callbackModal.close();
      this.isClosing.set(false);
      if (this.showSuccessToastAfterClose) {
        this.callbackModal.showSuccessToast();
        this.showSuccessToastAfterClose = false;
      }
      this.resetModalState();
      this.closeTimeoutId = null;
    }, CallbackModalComponent.CLOSE_ANIMATION_MS);
  }

  /** Переход по ссылке на политику: закрыть модалку сразу (без анимации), до навигации. */
  closeWhenLeavingToPrivacyPolicy(): void {
    this.cancelCloseTimeout();
    this.isClosing.set(false);
    this.showSuccessToastAfterClose = false;
    this.callbackModal.close();
    this.resetModalState();
  }

  async onSubmit(): Promise<void> {
    this.submitted = true;
    this.showSuccessToastAfterClose = false;
    this.errorToastVisible = false;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting = true;
    const v = this.form.getRawValue();
    const normalizedName = v.name.trim();
    const [firstName, ...lastNameParts] = normalizedName.split(/\s+/).filter(Boolean);

    try {
      await this.emailJsLead.sendLeadForm({
        firstName: firstName || normalizedName,
        lastName: lastNameParts.join(' ') || '—',
        phone: v.phone,
        comment: v.comment,
      });

      this.form.reset({ name: '', phone: '', comment: '', consent: true });
      this.submitted = false;
      this.showSuccessToastAfterClose = true;
      this.close();
    } catch {
      this.errorToastVisible = true;
    } finally {
      this.submitting = false;
    }
  }

  onErrorToastClosed(): void {
    this.errorToastVisible = false;
  }

  nameError(errors: ValidationErrors | null): 'required' | 'minlength' | 'pattern' | null {
    if (!errors) {
      return null;
    }
    if (errors['required']) {
      return 'required';
    }
    if (errors['minlength']) {
      return 'minlength';
    }
    if (errors['pattern']) {
      return 'pattern';
    }
    return null;
  }

  phoneError(errors: ValidationErrors | null): 'required' | 'pattern' | 'mask' | null {
    if (!errors) {
      return null;
    }
    if (errors['required']) {
      return 'required';
    }
    if (errors['mask']) {
      return 'mask';
    }
    if (errors['pattern']) {
      return 'pattern';
    }
    return null;
  }

  private cancelCloseTimeout(): void {
    if (this.closeTimeoutId !== null) {
      clearTimeout(this.closeTimeoutId);
      this.closeTimeoutId = null;
    }
  }

  private lockPageScroll(): void {
    if (!this.window || this.lockedScrollY !== null) {
      return;
    }

    const body = this.document.body;
    const scrollY = this.window.scrollY;
    const scrollbarCompensation =
      this.window.innerWidth - this.document.documentElement.clientWidth;
    this.lockedScrollY = scrollY;

    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.width = '100%';
    body.style.overflow = 'hidden';
    if (scrollbarCompensation > 0) {
      body.style.paddingRight = `${scrollbarCompensation}px`;
    }
  }

  private unlockPageScroll(): void {
    if (!this.window || this.lockedScrollY === null) {
      return;
    }

    const body = this.document.body;
    const restoreY = this.lockedScrollY;
    this.lockedScrollY = null;

    body.style.position = '';
    body.style.top = '';
    body.style.left = '';
    body.style.right = '';
    body.style.width = '';
    body.style.overflow = '';
    body.style.paddingRight = '';

    this.window.scrollTo({ top: restoreY, left: 0, behavior: 'auto' });
  }

  private resetModalState(): void {
    this.form.reset({ name: '', phone: '', comment: '', consent: true });
    this.form.markAsPristine();
    this.form.markAsUntouched();
    this.submitted = false;
    this.submitting = false;
    this.errorToastVisible = false;
    this.showSuccessToastAfterClose = false;
  }
}
