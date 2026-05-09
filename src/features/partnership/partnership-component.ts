import { Component } from '@angular/core';

import { MainFormComponent } from '../main/components/main-form/main-form-component';
import { PARTNERSHIP_CARDS } from './constants/partnership.const';

@Component({
  selector: 'visla-partnership',
  imports: [MainFormComponent],
  templateUrl: './partnership-component.html',
  styleUrl: './partnership-component.scss',
})
export class PartnershipComponent {
  readonly cards = PARTNERSHIP_CARDS;
}
