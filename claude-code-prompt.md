# SurveyJS Form Builder POC - Complete Implementation Guide

I need you to create THREE working Proof of Concept (POC) applications for a dynamic form builder system that replaces Survey SDK. These POCs should demonstrate both GUI form building and JSON-based form rendering capabilities.

## Context & Requirements

**Goal**: Build a form management system similar to Sumsub's questionnaire capability where:
- Admins create forms using a visual GUI builder
- Forms are stored as JSON schemas in a backend
- Forms can be rendered in both Angular and React applications
- Multi-language support (English and Vietnamese)
- Forms can be created/imported via API using JSON

## POC #1: SurveyJS with Angular (Ares)

**Project Structure:**
```
surveyjs-angular-poc/
├── src/
│   ├── app/
│   │   ├── services/
│   │   │   └── form.service.ts          # API service for form CRUD
│   │   ├── components/
│   │   │   ├── form-renderer/
│   │   │   │   ├── form-renderer.component.ts
│   │   │   │   ├── form-renderer.component.html
│   │   │   │   └── form-renderer.component.scss
│   │   │   └── form-list/
│   │   │       ├── form-list.component.ts
│   │   │       └── form-list.component.html
│   │   ├── app.component.ts
│   │   ├── app.component.html
│   │   └── app.routes.ts
│   └── assets/
│       └── sample-forms/                 # JSON form schemas
│           ├── customer-questionnaire.json
│           └── kyc-form.json
└── package.json
```

**Requirements:**
1. Install dependencies: `survey-core`, `survey-angular-ui`
2. Create a Form Service that:
   - Loads form JSON schemas from assets or mock API
   - Supports locale switching (en/vi)
   - Handles form submission
3. Build Form Renderer Component that:
   - Takes form ID as input
   - Renders the form dynamically
   - Applies custom theme/branding
   - Handles completion events
4. Create Form List Component showing available forms
5. Include at least 2 sample form JSONs with multi-language support
6. Add language switcher (EN/VI) in the header
7. Style with modern UI (use Angular Material or Tailwind)

**Sample Form JSON Structure:**
```json
{
  "title": {
    "default": "Customer Questionnaire",
    "vi": "Bảng câu hỏi khách hàng"
  },
  "pages": [
    {
      "name": "personalInfo",
      "elements": [
        {
          "type": "text",
          "name": "firstName",
          "title": {
            "default": "First Name",
            "vi": "Tên"
          },
          "isRequired": true
        },
        {
          "type": "text",
          "name": "lastName",
          "title": {
            "default": "Last Name",
            "vi": "Họ"
          },
          "isRequired": true
        },
        {
          "type": "dropdown",
          "name": "country",
          "title": {
            "default": "Country",
            "vi": "Quốc gia"
          },
          "choices": ["USA", "Vietnam", "UK", "Canada"]
        }
      ]
    }
  ]
}
```

---

## POC #2: SurveyJS with React (Artemis)

**Project Structure:**
```
surveyjs-react-poc/
├── src/
│   ├── components/
│   │   ├── FormRenderer/
│   │   │   ├── FormRenderer.tsx
│   │   │   └── FormRenderer.module.css
│   │   ├── FormList/
│   │   │   ├── FormList.tsx
│   │   │   └── FormList.module.css
│   │   └── LanguageSwitcher/
│   │       └── LanguageSwitcher.tsx
│   ├── hooks/
│   │   ├── useFormLoader.ts             # Custom hook for loading forms
│   │   └── useFormSubmission.ts         # Custom hook for submissions
│   ├── services/
│   │   └── formService.ts               # API service
│   ├── data/
│   │   └── sampleForms.ts               # Sample JSON schemas
│   ├── App.tsx
│   └── App.css
└── package.json
```

**Requirements:**
1. Install dependencies: `survey-core`, `survey-react-ui`
2. Create custom hooks:
   - `useFormLoader(formId)` - Loads form schema
   - `useFormSubmission()` - Handles form completion
3. Build FormRenderer component using SurveyJS Survey component
4. Implement language context for EN/VI switching
5. Create FormList component showing available forms
6. Use the SAME JSON schemas from Angular POC to demonstrate portability
7. Style with modern UI (Tailwind CSS recommended)
8. Add React Router for navigation

**Key Implementation Points:**
- Use React hooks (useState, useEffect, useContext)
- Demonstrate that same JSON works in both Angular and React
- Show form completion with console output or modal
- Include loading states and error handling

---

## POC #3: Custom GUI Form Builder + SurveyJS Renderer

**Project Structure:**
```
custom-form-builder-poc/
├── builder-app/                         # React app for building forms
│   ├── src/
│   │   ├── components/
│   │   │   ├── FormBuilder/
│   │   │   │   ├── FormBuilder.tsx      # Main builder component
│   │   │   │   ├── FieldPalette.tsx     # Drag-drop field palette
│   │   │   │   ├── FormCanvas.tsx       # Drop zone for fields
│   │   │   │   ├── PropertyEditor.tsx   # Edit field properties
│   │   │   │   └── JSONPreview.tsx      # Show generated JSON
│   │   │   └── FieldTypes/
│   │   │       ├── TextField.tsx
│   │   │       ├── DropdownField.tsx
│   │   │       └── DateField.tsx
│   │   ├── App.tsx
│   │   └── types.ts                     # TypeScript interfaces
│   └── package.json
│
├── angular-renderer/                     # Use SurveyJS to render
│   └── (similar to POC #1 structure)
│
└── react-renderer/                       # Use SurveyJS to render
    └── (similar to POC #2 structure)
```

**Requirements for Custom Builder:**

1. **Technology Stack:**
   - React 18+ with TypeScript
   - React DnD (react-dnd) for drag-and-drop
   - Zustand or Context API for state management
   - Tailwind CSS for styling

2. **Core Features:**
   - **Field Palette**: Drag-drop interface with field types:
     - Text Input
     - Text Area
     - Dropdown
     - Radio Buttons
     - Checkboxes
     - Date Picker
     - Number Input
   - **Form Canvas**: Drop zone where fields are arranged
   - **Property Editor**: Edit field properties when selected:
     - Label (with multi-language support)
     - Placeholder
     - Required/Optional
     - Validation rules
     - Default value
   - **JSON Export**: Real-time preview of generated JSON
   - **Save/Load**: Export JSON and import existing forms

3. **JSON Output Format:**
   Must generate SurveyJS-compatible JSON schemas so they can be rendered by POC #1 and POC #2

4. **Builder UI Requirements:**
   - Clean, modern interface
   - Left sidebar: Field palette
   - Center: Form canvas (drag-drop area)
   - Right sidebar: Property editor
   - Bottom: JSON preview panel (collapsible)
   - Top: Toolbar with Save, Load, Clear, Preview buttons

5. **Key Functionality:**
   ```typescript
   // Field interface
   interface FormField {
     id: string;
     type: 'text' | 'dropdown' | 'radio' | 'checkbox' | 'date' | 'number';
     name: string;
     title: {
       default: string;
       vi?: string;
     };
     isRequired: boolean;
     placeholder?: string;
     choices?: string[];
     validation?: any;
   }

   // Form schema interface
   interface FormSchema {
     title: {
       default: string;
       vi?: string;
     };
     pages: Array<{
       name: string;
       elements: FormField[];
     }>;
   }
   ```

6. **Export Format:**
   Generated JSON must be compatible with SurveyJS Form Library (same as POC #1 and #2)

---

## Implementation Guidelines

### For All POCs:

1. **Use Modern Tech Stack:**
   - Angular 17+ for POC #1
   - React 18+ for POC #2 and #3
   - TypeScript throughout
   - Vite or Angular CLI for build tools

2. **Code Quality:**
   - Clean, well-commented code
   - Proper TypeScript typing
   - Error handling
   - Loading states
   - Responsive design

3. **Sample Data:**
   Include at least 2 complete form examples:
   - Customer Questionnaire (with personal info fields)
   - KYC Form (with document upload, country selection, etc.)

4. **Multi-Language:**
   All forms should demonstrate English and Vietnamese language support

5. **Documentation:**
   Each POC should include:
   - README.md with setup instructions
   - How to run locally
   - How to add new forms
   - Architecture overview

### Development Order:
1. Start with POC #1 (Angular)
2. Then POC #2 (React) - reuse JSON schemas
3. Finally POC #3 (Custom Builder) - ensure JSON compatibility

### Testing Checklist:
- [ ] Forms render correctly in Angular
- [ ] Same JSON forms render correctly in React
- [ ] Language switching works (EN/VI)
- [ ] Form submission captures data correctly
- [ ] Custom builder generates valid SurveyJS JSON
- [ ] Exported JSON from custom builder works in POC #1 and #2
- [ ] Drag-drop functionality works smoothly
- [ ] Property editor updates fields correctly
- [ ] All field types are supported

---

## Deliverables

Please create three separate directories with complete, runnable applications:

1. `/surveyjs-angular-poc` - Complete Angular application
2. `/surveyjs-react-poc` - Complete React application  
3. `/custom-form-builder-poc` - Custom builder + renderers

Each should have:
- Complete source code
- package.json with all dependencies
- README.md with clear instructions
- Sample form JSONs
- Working demo functionality

**Important**: Make sure the JSON schemas are portable across all three POCs to demonstrate the architecture's flexibility.

---

## Success Criteria

The POCs are successful if:
1. ✅ Forms created in the custom builder can be rendered in both Angular and React apps
2. ✅ Language switching works seamlessly
3. ✅ All field types are supported
4. ✅ Form submission captures all data correctly
5. ✅ The custom builder provides a good user experience (smooth drag-drop, intuitive UI)
6. ✅ Code is clean, well-structured, and documented

Please start with POC #1, then POC #2, then POC #3. Create each as a complete, runnable application that I can test immediately.
