import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormService, FormListItem } from '../../services/form.service';

@Component({
  selector: 'app-form-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.scss']
})
export class FormListComponent implements OnInit {
  forms: FormListItem[] = [];
  currentLocale: string = 'default';
  isLoading = false;
  availableLocales = [
    { code: 'default', label: 'English' },
    { code: 'vi', label: 'Tiếng Việt' }
  ];

  constructor(
    private formService: FormService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadForms();
    this.formService.currentLocale$.subscribe(locale => {
      this.currentLocale = locale;
    });
  }

  loadForms(): void {
    this.isLoading = true;
    this.formService.getFormsList().subscribe({
      next: (forms) => {
        this.forms = forms;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading forms:', err);
        this.isLoading = false;
      }
    });
  }

  switchLanguage(locale: string): void {
    this.formService.setLocale(locale);
    this.currentLocale = locale;
  }

  getLocalizedTitle(form: FormListItem): string {
    return this.formService.getTranslation(form.title);
  }

  getLocalizedDescription(form: FormListItem): string {
    if (form.description) {
      return this.formService.getTranslation(form.description);
    }
    return '';
  }

  openForm(formId: string): void {
    this.router.navigate(['/form'], { queryParams: { id: formId } });
  }
}
