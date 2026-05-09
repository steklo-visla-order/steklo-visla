import { AbstractControl, ValidationErrors, Validators } from '@angular/forms';

/** Имя/фамилия: кириллица/латиница, пробел, дефис, апостроф; минимум 2 символа; есть хотя бы одна буква (без \\p{L} — дешевле на каждом вводе) */
const NAME_PATTERN = /^(?=.*[A-Za-zА-Яа-яЁё])[A-Za-zА-Яа-яЁё\s'-]{2,}$/;

/** Модель телефона: ровно 11 цифр, начинается с 7 (как после vislaPhoneRu). */
const PHONE_PATTERN = /^7\d{10}$/;

export function phoneCompleteValidator(control: AbstractControl): ValidationErrors | null {
  const v = control.value;
  if (v === null || v === undefined || v === '') {
    return null;
  }
  if (typeof v !== 'string') {
    return { pattern: true };
  }
  if (PHONE_PATTERN.test(v)) {
    return null;
  }
  if (v.length < 11) {
    return { mask: true };
  }
  return { pattern: true };
}

export const nameFieldValidators = [
  Validators.required,
  Validators.minLength(2),
  Validators.pattern(NAME_PATTERN),
];

export const phoneFieldValidators = [Validators.required, phoneCompleteValidator];
