import { Directive, ElementRef, HostListener, forwardRef, inject } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const MAX_DIGITS = 11;

function digitsFromInput(raw: string): string {
  return raw.replace(/\D/g, '');
}

/** Модель: пусто или строка вида 7 + до 10 цифр (всего не больше 11). */
function normalizePhoneModel(raw: string): string {
  let d = digitsFromInput(raw);
  if (d.length === 0) {
    return '';
  }
  if (d.startsWith('8')) {
    d = '7' + d.slice(1);
  }
  if (!d.startsWith('7')) {
    d = '7' + d;
  }
  return d.slice(0, MAX_DIGITS);
}

function formatRuPhone(model: string): string {
  if (!model) {
    return '';
  }
  const rest = model.slice(1);
  if (rest.length === 0) {
    return '+7 ';
  }
  if (rest.length <= 3) {
    return `+7 (${rest}`;
  }
  if (rest.length <= 6) {
    return `+7 (${rest.slice(0, 3)}) ${rest.slice(3)}`;
  }
  if (rest.length <= 8) {
    return `+7 (${rest.slice(0, 3)}) ${rest.slice(3, 6)}-${rest.slice(6)}`;
  }
  return `+7 (${rest.slice(0, 3)}) ${rest.slice(3, 6)}-${rest.slice(6, 8)}-${rest.slice(8, 10)}`;
}

@Directive({
  selector: 'input[vislaPhoneRu]',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PhoneRuMaskDirective),
      multi: true,
    },
  ],
})
export class PhoneRuMaskDirective implements ControlValueAccessor {
  private readonly el = inject(ElementRef<HTMLInputElement>);
  private onChange: (value: string) => void = () => {
    // empty
  };
  private onTouched: () => void = () => {
    // empty
  };
  private disabled = false;

  writeValue(value: string | null): void {
    const model = value ?? '';
    this.el.nativeElement.value = formatRuPhone(normalizePhoneModel(model));
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.el.nativeElement.disabled = isDisabled;
  }

  @HostListener('input')
  onInput(): void {
    if (this.disabled) {
      return;
    }
    const el = this.el.nativeElement;
    const model = normalizePhoneModel(el.value);
    const display = formatRuPhone(model);
    if (el.value !== display) {
      el.value = display;
    }
    this.onChange(model);
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent): void {
    if (this.disabled) {
      return;
    }
    event.preventDefault();
    const text = event.clipboardData?.getData('text') ?? '';
    const el = this.el.nativeElement;
    const model = normalizePhoneModel(text);
    el.value = formatRuPhone(model);
    this.onChange(model);
  }

  @HostListener('blur')
  onBlur(): void {
    this.onTouched();
  }
}
