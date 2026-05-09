import { Component, inject } from '@angular/core';

import { CallbackModalService } from '../../../../shared/components/callback-modal/callback-modal.service';

@Component({
  selector: 'visla-main-production',
  imports: [],
  templateUrl: './main-production-component.html',
  styleUrl: './main-production-component.scss',
})
export class MainProductionComponent {
  private readonly callbackModal = inject(CallbackModalService);

  onOpenCallbackModal(): void {
    this.callbackModal.open();
  }
}
