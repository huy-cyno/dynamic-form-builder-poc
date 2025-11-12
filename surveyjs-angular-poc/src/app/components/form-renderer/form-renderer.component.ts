import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService, FormSchema } from '../../services/form.service';
import { Model } from 'survey-core';
import { SurveyModule } from 'survey-angular-ui';

@Component({
  selector: 'app-form-renderer',
  standalone: true,
  imports: [CommonModule, SurveyModule],
  templateUrl: './form-renderer.component.html',
  styleUrls: ['./form-renderer.component.scss']
})
export class FormRendererComponent implements OnInit {
  formId: string | null = null;
  formSchema: FormSchema | null = null;
  isLoading = false;
  error: string | null = null;
  isSubmitted = false;
  submittedData: any = null;
  survey: Model | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public formService: FormService
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
        this.createSurvey(schema);
      },
      error: (err) => {
        this.error = `Failed to load form: ${err.message}`;
        this.isLoading = false;
        console.error('Error loading form:', err);
      }
    });
  }

  createSurvey(schema: FormSchema): void {
    const currentLocale = this.formService.getCurrentLocale();

    // Create survey model using SurveyJS
    this.survey = new Model(schema);

    // Set current language
    if (currentLocale !== 'default') {
      this.survey.locale = currentLocale;
    }

    // Handle survey completion
    this.survey.onComplete.add((result: any) => {
      this.handleFormSubmission(result);
    });

    console.log('Survey created successfully');
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
