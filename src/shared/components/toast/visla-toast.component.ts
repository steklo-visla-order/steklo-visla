import { Component, effect, input, output } from '@angular/core';

@Component({
  selector: 'visla-toast',
  standalone: true,
  templateUrl: './visla-toast.component.html',
  styleUrl: './visla-toast.component.scss',
})
export class VislaToastComponent {
  /** Показать тост и запустить автоскрытие через durationMs */
  readonly open = input(false);
  /** Текст уведомления */
  readonly message = input('');
  /** Время до события closed (мс) */
  readonly durationMs = input(4500);

  /** Вызывается после автоскрытия — сбросьте open у родителя */
  readonly closed = output<void>();

  constructor() {
    effect((onCleanup) => {
      if (!this.open()) {
        return;
      }
      const ms = Math.max(0, this.durationMs());
      const id = window.setTimeout(() => this.closed.emit(), ms);
      onCleanup(() => window.clearTimeout(id));
    });
  }
}
