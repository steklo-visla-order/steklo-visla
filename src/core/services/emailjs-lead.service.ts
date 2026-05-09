import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';

import { environment } from '../../environments/environment';
import { formatPhoneDisplay } from './utils/email-lead.utils';
import { LeadFormPayload } from './models/email-lead.model';

@Injectable({
  providedIn: 'root',
})
export class EmailJsLeadService {
  async sendLeadForm(data: LeadFormPayload): Promise<void> {
    const { publicKey, serviceId, templateId } = environment.emailJs;
    if (!publicKey?.trim() || !serviceId?.trim() || !templateId?.trim()) {
      throw new Error(
        'Заполните emailJs.publicKey, serviceId и templateId в src/environments/environment.ts',
      );
    }

    const templateParams = {
      first_name: data.firstName.trim(),
      last_name: data.lastName.trim(),
      phone: formatPhoneDisplay(data.phone.trim()),
      message: data.comment.trim() || '—',
    };

    const res = await emailjs.send(serviceId, templateId, templateParams, {
      publicKey: publicKey.trim(),
    });

    if (res.status !== 200) {
      throw new Error(res.text || 'Ошибка со стороны сервиса');
    }
  }
}
