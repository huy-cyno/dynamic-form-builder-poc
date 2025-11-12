# SurveyJS Form Builder POC - React Implementation

A proof-of-concept application demonstrating dynamic form rendering using SurveyJS with React 18+.

## Features

- 📋 **Dynamic Form Rendering**: Load and render forms from JSON schemas
- 🌍 **Multi-Language Support**: Forms support English and Vietnamese
- 🎯 **Form List Management**: Browse and select available forms
- 📊 **Form Submission**: Capture and display form submission data
- 🎨 **Modern UI**: Clean, responsive interface with gradient design
- ⚡ **React Hooks**: Custom hooks for form loading and submission
- 🛣️ **React Router**: Client-side routing for navigation

## Tech Stack

- **React 18+**: Latest React framework
- **Vite**: Fast build tool and dev server
- **SurveyJS**: Dynamic form rendering library
- **React Router**: Client-side routing
- **JavaScript/ES6+**: Modern JavaScript features

## Quick Start

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev

# Navigate to http://localhost:5173
```

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
surveyjs-react-poc/
├── src/
│   ├── components/
│   │   ├── FormRenderer/
│   │   │   ├── FormRenderer.jsx
│   │   │   └── FormRenderer.module.css
│   │   └── FormList/
│   │       ├── FormList.jsx
│   │       └── FormList.module.css
│   ├── hooks/
│   │   ├── useFormLoader.js
│   │   ├── useFormSubmission.js
│   │   └── useLocale.js
│   ├── services/
│   │   └── formService.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
│   └── sample-forms/
├── package.json
└── vite.config.js
```

## Usage

### 1. Form List Page
- View all available forms
- Switch between English and Vietnamese
- Click on a form card to open it

### 2. Form Renderer Page
- Fill out the form with required information
- Form validation happens automatically
- Submit the form to see results
- Review submitted data

### 3. Language Support
- Click language switcher buttons in header
- Forms update dynamically
- Language preference persists during session

## Custom Hooks

### `useFormLoader(formId)`
Loads a form schema by ID.

```javascript
const { form, isLoading, error } = useFormLoader(formId);
```

### `useFormSubmission()`
Handles form submission.

```javascript
const { submitForm, isSubmitting, submittedData, error } = useFormSubmission();
```

### `useLocale()`
Manages application language/locale.

```javascript
const { locale, setLocale, getTranslation } = useLocale();
```

## Sample Forms

### 1. Customer Questionnaire
- Personal information (name, email, phone)
- Location details (country, city, zip code)
- Communication preferences

### 2. KYC Verification Form
- Basic information (full name, DOB, citizenship)
- Address information (street, city, state, postal code)
- Financial information (income range, source of funds)

## Cross-Compatibility

This React POC uses the **same JSON schemas** as the Angular POC, demonstrating:
- Portable form definitions
- Consistent form rendering across frameworks
- Single source of truth for form structures

## Adding New Forms

1. Create a JSON file in `public/sample-forms/`
2. Update the `formsList` in `src/services/formService.js`
3. Access at `http://localhost:5173/form?id=your-form-id`

## Dependencies

- `react`: ^18.x
- `react-router-dom`: ^6.x
- `survey-core`: ^1.9.x
- `survey-react-ui`: ^1.9.x

## Troubleshooting

**Forms not loading**: Check `public/sample-forms/` directory and JSON format

**Language switcher not working**: Verify locale codes match in JSON and service

**SurveyJS not rendering**: Ensure CSS is imported: `import 'survey-core/defaultV2.min.css'`

**Routes not working**: Check React Router configuration in App.jsx

## Build & Deploy

```bash
# Build for production
npm run build

# Output in dist/ directory
```

## License

Proof-of-concept implementation for demonstration purposes.

## Related

- [Angular POC](../surveyjs-angular-poc) - Same forms, different framework
- [Custom Builder POC](../custom-form-builder-poc) - GUI form builder
- [SurveyJS Documentation](https://surveyjs.io/)
