# SurveyJS Form Builder POC - Angular Implementation

A proof-of-concept application demonstrating dynamic form rendering using SurveyJS with Angular 17+.

## Features

- 📋 **Dynamic Form Rendering**: Load and render forms from JSON schemas
- 🌍 **Multi-Language Support**: Forms support English and Vietnamese
- 🎯 **Form List Management**: Browse and select available forms
- 📊 **Form Submission**: Capture and display form submission data
- 🎨 **Modern UI**: Clean, responsive interface with gradient design
- ⚡ **Standalone Components**: Uses Angular's latest standalone component architecture

## Tech Stack

- **Angular 17+**: Latest Angular framework
- **SurveyJS**: Dynamic form rendering library
- **TypeScript**: Type-safe code
- **SCSS**: Styling with preprocessing
- **RxJS**: Reactive programming

## Project Structure

```
surveyjs-angular-poc/
├── src/
│   ├── app/
│   │   ├── services/
│   │   │   └── form.service.ts              # Form management service
│   │   ├── components/
│   │   │   ├── form-renderer/
│   │   │   │   ├── form-renderer.component.ts
│   │   │   │   ├── form-renderer.component.html
│   │   │   │   └── form-renderer.component.scss
│   │   │   └── form-list/
│   │   │       ├── form-list.component.ts
│   │   │       ├── form-list.component.html
│   │   │       └── form-list.component.scss
│   │   ├── app.ts                           # Root component
│   │   ├── app.routes.ts                    # Route definitions
│   │   └── app.config.ts                    # Application config
│   ├── assets/
│   │   └── sample-forms/
│   │       ├── customer-questionnaire.json
│   │       └── kyc-form.json
│   └── main.ts
├── angular.json
├── package.json
└── tsconfig.json
```

## Installation

### Prerequisites

- Node.js (v18+)
- npm (v9+)

### Setup

```bash
# Install dependencies
npm install

# Optionally install peer dependencies
npm install --legacy-peer-deps
```

## Running the Application

```bash
# Start the development server
npm start

# Navigate to
http://localhost:4200
```

## Usage

### 1. **Form List Page**
   - View all available forms
   - Switch between English and Vietnamese
   - Click on a form card to open it

### 2. **Form Renderer Page**
   - Fill out the form with required information
   - Form validation happens automatically
   - Submit the form to see results
   - Review submitted data in JSON format

### 3. **Multi-Language Support**
   - Click language switcher buttons in header
   - All form titles, descriptions, and field labels update dynamically
   - Language preference persists during session

## Sample Forms

### 1. Customer Questionnaire
A multi-page form collecting:
- Personal information (name, email, phone)
- Location details (country, city, zip code)
- Communication preferences and newsletter opt-in

### 2. KYC Verification Form
A detailed identity verification form with:
- Basic information (full name, date of birth, citizenship)
- Address information (street, city, state, postal code)
- Financial information (income range, source of funds)

## Form JSON Schema Structure

Forms are defined in JSON with the following structure:

```json
{
  "title": {
    "default": "Form Title in English",
    "vi": "Tiêu đề biểu mẫu trong tiếng Việt"
  },
  "pages": [
    {
      "name": "pageName",
      "title": { "default": "Page Title", "vi": "Tiêu đề trang" },
      "elements": [
        {
          "type": "text",
          "name": "fieldName",
          "title": { "default": "Field Label", "vi": "Nhãn trường" },
          "isRequired": true,
          "placeholder": { "default": "...", "vi": "..." }
        }
      ]
    }
  ]
}
```

### Supported Field Types

- **text**: Single-line text input
- **comment**: Multi-line text area
- **dropdown**: Select from list
- **radiogroup**: Single selection radio buttons
- **checkbox**: Boolean checkbox
- **date**: Date picker

## API Service

The `FormService` provides:

```typescript
// Get list of available forms
getFormsList(): Observable<FormListItem[]>

// Load a specific form by ID
getFormById(id: string): Observable<FormSchema>

// Submit form data
submitForm(formId: string, data: any): Observable<any>

// Set active language locale
setLocale(locale: string): void

// Get current language locale
getCurrentLocale(): string

// Get translated text
getTranslation(obj: { [key: string]: string }, locale?: string): string
```

## Adding New Forms

1. **Create JSON Schema**: Create a new JSON file in `src/assets/sample-forms/`

2. **Add to Forms List**: Update the `formsList` in `form.service.ts`:

```typescript
private formsList: FormListItem[] = [
  {
    id: 'my-new-form',
    name: 'my-new-form',
    title: {
      default: 'My New Form',
      vi: 'Biểu mẫu mới của tôi'
    }
  }
  // ... other forms
];
```

3. **Access**: The form will be available at `http://localhost:4200/form?id=my-new-form`

## Styling

The application uses:
- **Global Styles**: `src/styles.scss`
- **Component Styles**: SCSS modules in each component directory
- **Color Scheme**: Purple gradient (#667eea to #764ba2)

### Customization

Update color variables in component SCSS files:

```scss
// Primary color
--primary-color: #667eea;

// Change gradient in .form-renderer-container or .form-list-container
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

## Form Submission

When a form is completed:
1. Data is captured from SurveyJS
2. Submitted data is displayed on success page
3. JSON representation of answers shown
4. User can fill another form or return to list

Submission data structure:
```typescript
{
  success: true,
  formId: string,
  timestamp: string,
  data: { [fieldName]: value }
}
```

## Building for Production

```bash
npm run build
```

Output will be in `dist/` directory.

## Architecture Notes

- **Standalone Components**: All components are standalone (no NgModules)
- **Lazy Loading**: Routes can be lazy-loaded for better performance
- **Reactive**: Uses RxJS Observables for async operations
- **Type-Safe**: Full TypeScript typing throughout
- **Service Pattern**: Form logic centralized in FormService

## Future Enhancements

- [ ] Backend API integration for form CRUD
- [ ] Form validation rules engine
- [ ] Custom styling/theming system
- [ ] Export to PDF functionality
- [ ] Form versioning and history
- [ ] Role-based form access
- [ ] Analytics and submission tracking

## Troubleshooting

### Forms not loading
- Check `src/assets/sample-forms/` directory exists
- Verify JSON file format is valid
- Check browser console for errors

### Language switcher not working
- Verify locale codes match in JSON and service
- Check that FormService is injected properly

### Survey not rendering
- Ensure SurveyJS is installed: `npm install survey-core`
- Check that `#surveyContainer` ref exists in template
- Verify schema is valid JSON

## Dependencies

```json
{
  "survey-core": "^1.9.x",
  "@angular/common": "^17.0.0",
  "@angular/core": "^17.0.0",
  "@angular/router": "^17.0.0",
  "typescript": "~5.2.2",
  "rxjs": "^7.8.0"
}
```

## License

This is a proof-of-concept implementation for demonstration purposes.

## Support

For issues or questions about SurveyJS, visit: https://surveyjs.io/

---

**Note**: This is a POC implementation. For production use, consider:
- Backend form persistence
- User authentication
- Data encryption
- Comprehensive error handling
- Logging and monitoring
