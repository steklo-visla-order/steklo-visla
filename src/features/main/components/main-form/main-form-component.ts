import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { EmailJsLeadService } from '../../../../core/services/emailjs-lead.service';
import { VislaToastComponent } from '../../../../shared/components/toast/visla-toast.component';
import { nameFieldValidators, phoneFieldValidators } from './constants/form.const';
import { PhoneRuMaskDirective } from '../../../../shared/phone-ru-mask.directive';

@Component({
  selector: 'visla-main-form',
  imports: [ReactiveFormsModule, PhoneRuMaskDirective, RouterLink, VislaToastComponent],
  templateUrl: './main-form-component.html',
  styleUrl: './main-form-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly emailJsLead = inject(EmailJsLeadService);

  readonly form = this.fb.nonNullable.group({
    firstName: ['', nameFieldValidators],
    lastName: ['', nameFieldValidators],
    phone: ['', phoneFieldValidators],
    comment: [''],
  });

  readonly submitted = signal(false);
  readonly submitting = signal(false);
  readonly successToastVisible = signal(false);
  readonly errorToastVisible = signal(false);

  readonly successToastText = 'Заявка отправлена. Мы свяжемся с вами в ближайшее время.';

  readonly errorToastText = 'Ошибка отправки данных на сервер';

  async onSubmit(): Promise<void> {
    this.submitted.set(true);
    this.successToastVisible.set(false);
    this.errorToastVisible.set(false);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting.set(true);
    const v = this.form.getRawValue();

    try {
      await this.emailJsLead.sendLeadForm({
        firstName: v.firstName,
        lastName: v.lastName,
        phone: v.phone,
        comment: v.comment,
      });

      this.form.reset();
      this.submitted.set(false);
      this.successToastVisible.set(true);
    } catch {
      this.errorToastVisible.set(true);
    } finally {
      this.submitting.set(false);
    }
  }

  onSuccessToastClosed(): void {
    this.successToastVisible.set(false);
  }

  onErrorToastClosed(): void {
    this.errorToastVisible.set(false);
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
}
