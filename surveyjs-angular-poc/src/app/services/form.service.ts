import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

export interface FormSchema {
  title: { [key: string]: string };
  description?: { [key: string]: string };
  pages: any[];
}

export interface FormListItem {
  id: string;
  name: string;
  title: { [key: string]: string };
  description?: { [key: string]: string };
}

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private currentLocaleSubject = new BehaviorSubject<string>('default');
  currentLocale$ = this.currentLocaleSubject.asObservable();

  private formsCache: Map<string, FormSchema> = new Map();

  // Sample forms list
  private formsList: FormListItem[] = [
    {
      id: 'customer-questionnaire',
      name: 'customer-questionnaire',
      title: {
        default: 'Customer Questionnaire',
        vi: 'Bảng câu hỏi khách hàng'
      },
      description: {
        default: 'Please fill out this questionnaire to help us serve you better',
        vi: 'Vui lòng điền vào bảng câu hỏi này để giúp chúng tôi phục vụ bạn tốt hơn'
      }
    },
    {
      id: 'kyc-form',
      name: 'kyc-form',
      title: {
        default: 'KYC Verification Form',
        vi: 'Mẫu xác minh KYC'
      },
      description: {
        default: 'Know Your Customer (KYC) verification form',
        vi: 'Mẫu xác minh Biết khách hàng của bạn (KYC)'
      }
    }
  ];

  constructor(private http: HttpClient) {}

  setLocale(locale: string): void {
    this.currentLocaleSubject.next(locale);
  }

  getCurrentLocale(): string {
    return this.currentLocaleSubject.value;
  }

  getFormsList(): Observable<FormListItem[]> {
    return new Observable(subscriber => {
      subscriber.next(this.formsList);
      subscriber.complete();
    });
  }

  getFormById(id: string): Observable<FormSchema> {
    return new Observable(subscriber => {
      // Check cache first
      if (this.formsCache.has(id)) {
        subscriber.next(this.formsCache.get(id)!);
        subscriber.complete();
        return;
      }

      // Load from assets
      this.http.get<FormSchema>(`/assets/sample-forms/${id}.json`)
        .subscribe({
          next: (form) => {
            this.formsCache.set(id, form);
            subscriber.next(form);
            subscriber.complete();
          },
          error: (err) => {
            subscriber.error(err);
          }
        });
    });
  }

  submitForm(formId: string, data: any): Observable<any> {
    return new Observable(subscriber => {
      // Simulate form submission
      const result = {
        success: true,
        formId: formId,
        timestamp: new Date().toISOString(),
        data: data
      };

      console.log('Form submitted:', result);
      subscriber.next(result);
      subscriber.complete();
    });
  }

  // Helper method to get translated string
  getTranslation(obj: { [key: string]: string }, locale?: string): string {
    const locale_to_use = locale || this.getCurrentLocale();
    return obj[locale_to_use] || obj['default'] || '';
  }
}
