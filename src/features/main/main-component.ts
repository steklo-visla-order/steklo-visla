import { Component } from '@angular/core';

import { MainProductionComponent } from './components/main-production/main-production-component';
import { MainBenefitsComponent } from './components/main-benefits/main-benefits-component';
import { MainProductsComponent } from './components/main-products/main-products-component';
import { MainAdvantagesComponent } from './components/main-advantages/main-advantages-component';
import { MainProjectsComponent } from './components/main-projects/main-projects-component';
import { MainContactsComponent } from './components/main-contacts/main-contacts-component';
import { MainFormComponent } from './components/main-form/main-form-component';

@Component({
  selector: 'visla-main',
  imports: [
    MainProductionComponent,
    MainBenefitsComponent,
    MainProductsComponent,
    MainAdvantagesComponent,
    MainProjectsComponent,
    MainContactsComponent,
    MainFormComponent,
  ],
  templateUrl: './main-component.html',
  styleUrl: './main-component.scss',
})
export class MainComponent {}
