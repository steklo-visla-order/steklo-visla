import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CallbackModalService {
  readonly isOpen = signal(false);
  readonly successToastVisible = signal(false);
  readonly successToastText =
    'Заявка отправлена! Менеджер свяжется с вами в ближайшее время в течении рабочего дня.';

  open(): void {
    this.isOpen.set(true);
  }

  close(): void {
    this.isOpen.set(false);
  }

  showSuccessToast(): void {
    this.successToastVisible.set(true);
  }

  hideSuccessToast(): void {
    this.successToastVisible.set(false);
  }
}
