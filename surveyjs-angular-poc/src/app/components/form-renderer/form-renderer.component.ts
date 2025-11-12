import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService, FormSchema } from '../../services/form.service';
import * as Survey from 'survey-core';

@Component({
  selector: 'app-form-renderer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-renderer.component.html',
  styleUrls: ['./form-renderer.component.scss']
})
export class FormRendererComponent implements OnInit {
  @ViewChild('surveyContainer', { static: false }) surveyContainer?: ElementRef;

  formId: string | null = null;
  formSchema: FormSchema | null = null;
  isLoading = false;
  error: string | null = null;
  isSubmitted = false;
  submittedData: any = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formService: FormService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.formId = params['id'] || null;
      if (this.formId) {
        this.loadForm(this.formId);
      }
    });
  }

  loadForm(id: string): void {
    this.isLoading = true;
    this.error = null;

    this.formService.getFormById(id).subscribe({
      next: (schema) => {
        this.formSchema = schema;
        this.isLoading = false;
        this.initializeSurvey(schema);
      },
      error: (err) => {
        this.error = `Failed to load form: ${err.message}`;
        this.isLoading = false;
        console.error('Error loading form:', err);
      }
    });
  }

  initializeSurvey(schema: FormSchema): void {
    if (!this.surveyContainer) {
      return;
    }

    const currentLocale = this.formService.getCurrentLocale();

    // Create survey model
    const survey = new Survey.Model(schema);

    // Set current language
    if (currentLocale !== 'default') {
      survey.locale = currentLocale;
    }

    // Handle survey completion
    survey.onComplete.add((result: any) => {
      this.handleFormSubmission(result);
    });

    // Render survey
    const container = this.surveyContainer.nativeElement;
    container.innerHTML = '';
    survey.render(container);
  }

  handleFormSubmission(result: any): void {
    this.submittedData = result.data;
    this.isSubmitted = true;

    if (this.formId) {
      this.formService.submitForm(this.formId, result.data).subscribe({
        next: (response) => {
          console.log('Form submission successful:', response);
        },
        error: (err) => {
          console.error('Form submission failed:', err);
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  startOver(): void {
    this.isSubmitted = false;
    this.submittedData = null;
    if (this.formId) {
      this.loadForm(this.formId);
    }
  }
}
