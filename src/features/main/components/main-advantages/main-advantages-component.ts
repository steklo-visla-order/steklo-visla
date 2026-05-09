import { Component } from '@angular/core';

import { ADVANTAGE_CARDS } from './constants/advantages.const';

@Component({
  selector: 'visla-main-advantages',
  imports: [],
  templateUrl: './main-advantages-component.html',
  styleUrl: './main-advantages-component.scss',
})
export class MainAdvantagesComponent {
  readonly cards = ADVANTAGE_CARDS;

  cardNumber(index: number): string {
    return String(index + 1).padStart(2, '0');
  }
}
