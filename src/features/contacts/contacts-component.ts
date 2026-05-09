import { Component } from '@angular/core';

import { MainContactsComponent } from '../main/components/main-contacts/main-contacts-component';

@Component({
  selector: 'visla-contacts',
  imports: [MainContactsComponent],
  templateUrl: './contacts-component.html',
  styleUrl: './contacts-component.scss',
})
export class ContactsComponent {}
