# Claude Code Context - SurveyJS Form Builder POC

**Last Updated:** November 12, 2025
**Status:** All POCs Fully Functional
**Total Implementations:** 3 (Angular, React, Custom Builder)

---

## Quick Start for Next Session

```bash
# Start all three POCs simultaneously
cd surveyjs-angular-poc && npm start &          # http://localhost:4200
cd surveyjs-react-poc && npm run dev &          # http://localhost:5173
cd custom-form-builder-poc && npm run dev &     # http://localhost:5174
```

**Quick Health Check:**
1. Angular: http://localhost:4200 - Should show form list
2. React: http://localhost:5173 - Should show form list
3. Builder: http://localhost:5174 - Should show canvas with palette

---

## Project Overview

### What This Project Does

A **multi-framework proof-of-concept** demonstrating dynamic form rendering using SurveyJS:

1. **Renderers** - Angular & React apps that display forms
2. **Builder** - Drag-drop form builder to create forms
3. **Schemas** - JSON-based form definitions (SurveyJS format)
4. **Multi-language** - English (default) and Vietnamese (vi)

### Directory Structure

```
dynamic-form-builder-poc/
├── surveyjs-angular-poc/              # POC #1 - Angular 17+ app
│   ├── public/assets/sample-forms/    # Form JSON files (CORRECT LOCATION)
│   │   ├── customer-questionnaire.json
│   │   ├── kyc-form.json
│   │   └── new-form.json
│   ├── src/app/
│   │   ├── services/form.service.ts  # Form CRUD, locale, submission
│   │   ├── components/
│   │   │   ├── form-list/            # Lists available forms
│   │   │   └── form-renderer/        # Renders SurveyJS forms
│   │   ├── app.config.ts            # HTTP client provider
│   │   ├── app.routes.ts            # Route definitions
│   │   └── app.ts                   # Standalone root component
│   ├── src/styles.scss              # Global SCSS with SurveyJS import
│   ├── angular.json                 # Angular configuration
│   ├── package.json
│   └── README.md
│
├── surveyjs-react-poc/                # POC #2 - React 18+ app
│   ├── public/sample-forms/           # Form JSON files (CORRECT LOCATION)
│   │   ├── customer-questionnaire.json
│   │   ├── kyc-form.json
│   │   └── new-form.json
│   ├── src/
│   │   ├── services/
│   │   │   └── formService.js        # Singleton form service
│   │   ├── hooks/
│   │   │   ├── useFormLoader.js      # Load form by ID
│   │   │   ├── useFormSubmission.js  # Handle submission
│   │   │   └── useLocale.js          # Language switching
│   │   ├── components/
│   │   │   ├── FormList/             # Lists available forms
│   │   │   └── FormRenderer/         # Renders SurveyJS forms
│   │   ├── App.jsx                  # Root component
│   │   └── main.jsx                 # Entry point
│   ├── vite.config.js
│   ├── package.json
│   └── README.md
│
├── custom-form-builder-poc/           # POC #3 - Form Builder app
│   ├── public/sample-forms/           # Sample forms for import
│   │   ├── customer-questionnaire.json
│   │   └── kyc-form.json
│   ├── src/
│   │   ├── store/
│   │   │   └── formStore.js         # Zustand form state management
│   │   ├── utils/
│   │   │   └── fieldTypes.js        # Field type definitions
│   │   ├── components/
│   │   │   ├── FormBuilder/         # Main wrapper
│   │   │   ├── FieldPalette/        # Draggable fields
│   │   │   ├── FormCanvas/          # Drop zone
│   │   │   ├── CanvasField/         # Individual field UI
│   │   │   ├── PropertyEditor/      # Field properties
│   │   │   └── JSONPreview/         # Real-time JSON
│   │   ├── App.jsx                  # Root component
│   │   └── main.jsx                 # Entry point
│   ├── vite.config.js
│   ├── package.json
│   └── README.md
│
├── MASTER_README.md                   # Project-wide overview
├── IMPLEMENTATION_SUMMARY.md          # Feature checklist
├── DEBUGGING_AND_FIXES.md            # All issues and solutions
├── claude.md                          # THIS FILE
└── claude-code-prompt.md             # Original requirements

```

---

## Architecture Overview

### Core Pattern: Shared JSON Schemas

All three applications use the same **SurveyJS-compatible JSON format**:

```json
{
  "title": {
    "default": "Form Title",
    "vi": "Tiêu đề biểu mẫu"
  },
  "pages": [
    {
      "name": "page1",
      "elements": [
        {
          "type": "text",
          "name": "fieldName",
          "title": { "default": "...", "vi": "..." },
          "isRequired": false
        }
      ]
    }
  ]
}
```

**Supported field types:**
- `text` - Single-line text input
- `comment` - Multi-line textarea
- `dropdown` - Select list
- `radiogroup` - Radio buttons
- `checkbox` - Boolean checkbox
- `date` - Date picker
- `number` - Numeric input

### Multi-Language Pattern

All user-facing strings use nested objects:

```typescript
title: {
  default: "English text",
  vi: "Vietnamese text"
}
```

**Usage in components:**

Angular: `{{ formService.getTranslation(form.title) }}`
React: `formService.getTranslation(form.title)`

### Data Flow

```
User selects form in FormList
         ↓
Calls formService.getFormById(id)
         ↓
Loads JSON from /sample-forms/{id}.json
         ↓
Creates SurveyJS Model from schema
         ↓
Renders form using framework component:
  - React: <Survey model={model} />
  - Angular: <survey [model]="model"></survey>
         ↓
User fills form and submits
         ↓
formService.submitForm() logs result
         ↓
Display success message with submitted data
```

---

## SurveyJS Integration Guide

### Package Organization (CRITICAL)

```
survey-core
  ├─ Exports: Model class (business logic)
  ├─ Exports: styles (survey-core.min.css)
  └─ No rendering - just data/logic

survey-react-ui
  ├─ Exports: Survey component (React wrapper)
  ├─ Depends on: survey-core, React
  └─ Use: <Survey model={new Model(schema)} />

survey-angular-ui
  ├─ Exports: SurveyModule + survey component
  ├─ Depends on: survey-core, Angular, @angular/cdk
  └─ Use: <survey [model]="model"></survey>
```

### Correct Import Pattern

**React:**
```javascript
import { Model } from 'survey-core';        // ✅ Model from core
import { Survey } from 'survey-react-ui';   // ✅ Component from react-ui
import 'survey-core/survey-core.min.css';   // ✅ Styles from core

const survey = new Model(form);              // Create model
return <Survey model={survey} />;            // Render with component
```

**Angular:**
```typescript
import { Model } from 'survey-core';         // ✅ Model from core
import { SurveyModule } from 'survey-angular-ui';  // ✅ Module from angular-ui
// In component imports: [SurveyModule]
// In styles.scss: @import 'survey-core/survey-core.min.css';

this.survey = new Model(form);               // Create model
// Template: <survey [model]="survey"></survey>
```

### Event Handling

Both frameworks use the same Model API:

```javascript
const model = new Model(schema);

// Form completion
model.onComplete.add((result) => {
  console.log(result.data);  // User's responses
  submitForm(formId, result.data);
});

// Page changes, validation, etc.
model.onValueChanged.add((result) => {
  console.log('Field changed:', result.name, result.value);
});
```

---

## Key Implementation Details

### Angular POC (surveyjs-angular-poc/)

**Framework Version:** Angular 17+ (standalone components)

**Key Files:**

1. **form.service.ts** (lines 21-117)
   - `formsList[]` - Hardcoded list of available forms
   - `getFormsList()` - Returns Observable of forms
   - `getFormById(id)` - Fetches JSON, caches result
   - `submitForm(id, data)` - Simulates submission, logs result
   - `setLocale(locale)` - Changes language
   - `getTranslation(obj)` - Gets translated string
   - Uses: RxJS BehaviorSubject, HttpClient

2. **form-renderer.component.ts** (lines 15-103)
   - Loads form from query param: `?id=form-id`
   - Creates SurveyJS Model from schema
   - Sets locale and handles completion
   - **IMPORTANT:** formService must be `public` (line 27)
   - Uses: SurveyModule for rendering

3. **form-list.component.ts**
   - Displays all available forms
   - Navigation to form-renderer
   - Language switching

**Asset Serving:**
- **Correct:** `public/assets/sample-forms/`
- **Accessed as:** `/assets/sample-forms/{id}.json`
- Angular dev server serves `public/` as document root

**Styling:**
- Global SCSS in `src/styles.scss`
- Component SCSS in `form-renderer.component.scss`
- Module style: `import styles from './form-renderer.component.scss'`
- Must import SurveyJS CSS globally: `@import 'survey-core/survey-core.min.css';`

**Build & Run:**
```bash
npm install
npm start              # Dev server on localhost:4200
npm run build          # Production build
```

---

### React POC (surveyjs-react-poc/)

**Framework Version:** React 18+ (functional components)

**Key Files:**

1. **formService.js** (singleton class)
   - `formsList[]` - Hardcoded list of available forms
   - `getFormsList()` - Returns Promise
   - `getFormById(id)` - Fetches JSON via fetch API, caches
   - `submitForm(id, data)` - Simulates submission
   - `setLocale(locale)` / `getCurrentLocale()`
   - `getTranslation(obj)` - Gets translated string
   - `onLocaleChange(listener)` - Observer pattern for locale changes

2. **Custom Hooks:**

   **useFormLoader.js**
   ```javascript
   const { form, isLoading, error } = useFormLoader(formId);
   // Loads form by ID, handles loading/error states
   ```

   **useFormSubmission.js**
   ```javascript
   const { submitForm, submittedData, clearSubmittedData } = useFormSubmission();
   // Manages submission state and result
   ```

   **useLocale.js**
   ```javascript
   const { locale, setLocale, getTranslation } = useLocale();
   // Language switching with context
   ```

3. **FormRenderer.jsx** (key component)
   - **CRITICAL FIX:** Uses `useState` for survey, NOT `useRef`
   - Creates Model from form
   - Stores in state: `const [survey, setSurvey] = useState(null)`
   - Renders: `<Survey model={survey} />`
   - **NEVER use** `survey.render(domElement)` in React
   - Multi-page form support, language switching

4. **FormList.jsx**
   - Lists available forms
   - Navigation to FormRenderer
   - Language toggle

**Asset Serving:**
- **Correct:** `public/sample-forms/`
- **Accessed as:** `/sample-forms/{id}.json`
- Vite dev server serves `public/` as document root

**Styling:**
- CSS Modules: `import styles from './Component.module.css'`
- Global styles in `index.css`
- SurveyJS styles: `import 'survey-core/survey-core.min.css'` in components

**Build & Run:**
```bash
npm install
npm run dev            # Dev server on localhost:5173
npm run build          # Production build
```

---

### Custom Form Builder (custom-form-builder-poc/)

**Purpose:** Drag-and-drop interface to create forms

**Key Files:**

1. **formStore.js** (Zustand store)
   - State: form structure, selected field, etc.
   - Actions: addField, deleteField, editField, addPage, etc.
   - Generates valid SurveyJS JSON in real-time

2. **fieldTypes.js**
   - Field type definitions and templates
   - Maps types to UI representations
   - Default values for new fields

3. **Components:**
   - **FormBuilder** - Main wrapper, layout
   - **FieldPalette** - List of draggable field types
   - **FormCanvas** - Drop zone where fields go
   - **CanvasField** - Individual field on canvas (editable)
   - **PropertyEditor** - Sidebar to edit field properties
   - **JSONPreview** - Shows generated JSON in real-time

**Features:**
- Drag-drop using react-dnd
- Multi-language editing (add translations)
- Export JSON to file
- Import existing forms
- Load sample forms
- Real-time validation

**Build & Run:**
```bash
npm install
npm run dev            # Dev server on localhost:5174
npm run build          # Production build
```

---

## Common Issues & Solutions

### Issue: "Form not rendering (blank page)"

**Check list:**
1. Open browser console - any JavaScript errors?
2. Check Network tab - is the form JSON loading? (200 status?)
3. Are you using vanilla `survey.render()`? (❌ Wrong in React/Angular)
4. Is the asset file in correct location?
   - Angular: `public/assets/sample-forms/`
   - React: `public/sample-forms/`

**Solution:** Use framework component (`<Survey>` in React, `<survey>` in Angular)

---

### Issue: "Form list doesn't show my new form"

**Check list:**
1. Did you add form JSON to correct directory?
2. Did you update the form registry in service?
   - Angular: `form.service.ts` - `formsList` array
   - React: `formService.js` - `formsList` array
3. Did you restart dev server?

**Solution:** Ensure both the JSON file and service registry are updated

---

### Issue: "Language switching doesn't work"

**Check list:**
1. Are form strings in multi-language format?
   ```json
   {
     "default": "English",
     "vi": "Vietnamese"
   }
   ```
2. Is `getTranslation()` being used in template/component?
3. Check browser console for errors

**Solution:** Verify language format and getTranslation usage

---

### Issue: "TypeScript error about private property in template"

**Angular only:**
```typescript
// ❌ Wrong
constructor(private service: Service) {}

// ✅ Correct
constructor(public service: Service) {}
```

**Reason:** Angular templates can only access public properties

---

## Testing Guide

### Test Checklist - Angular POC

- [ ] Start dev server: `npm start`
- [ ] Navigate to http://localhost:4200
- [ ] See form list (3 forms: Customer Questionnaire, KYC Form, New Form)
- [ ] Click a form - it loads and renders
- [ ] All field types display: text, dropdown, radio, checkbox, date
- [ ] Fill form and submit - see success message
- [ ] Switch language to Vietnamese - text changes
- [ ] Two-page form shows pagination
- [ ] "Back to Forms" button works

### Test Checklist - React POC

- [ ] Start dev server: `npm run dev`
- [ ] Navigate to http://localhost:5173
- [ ] See form list (3 forms)
- [ ] Click a form - it loads and renders (NOT blank)
- [ ] All field types work properly
- [ ] Form submission works
- [ ] Language switching works
- [ ] Multi-page navigation works
- [ ] Responsive design on mobile

### Test Checklist - Custom Builder

- [ ] Start dev server: `npm run dev`
- [ ] Navigate to http://localhost:5174
- [ ] See 3-panel layout: palette, canvas, properties
- [ ] Drag field type from palette to canvas
- [ ] Click field to edit properties
- [ ] Edit title, description, add translations
- [ ] Add/remove pages
- [ ] Export form as JSON
- [ ] Load sample form and verify it appears

### Cross-POC Testing

1. Create form in Custom Builder
2. Export JSON
3. Manually copy it to both POCs' form registries
4. Verify form renders identically in Angular and React
5. Test submission in both
6. Test language switching in both

---

## File Modifications Summary (This Session)

### Modified Files:

**surveyjs-react-poc/src/components/FormRenderer/FormRenderer.jsx**
```
Changed: useRef → useState for survey state management
Added: import { Model } from 'survey-core'
Changed: survey.render(ref) → <Survey model={survey} />
Result: Forms now render correctly
```

**surveyjs-angular-poc/src/app/services/form.service.ts**
```
Added: new-form entry to formsList
Result: New form available in list
```

**surveyjs-react-poc/src/services/formService.js**
```
Added: new-form entry to formsList
Result: New form available in list
```

**surveyjs-angular-poc/src/app/components/form-renderer/form-renderer.component.ts**
```
Changed: private formService → public formService
Added: SurveyModule import
Result: Template can access service, proper rendering
```

**surveyjs-angular-poc/src/styles.scss**
```
Added: @import 'survey-core/survey-core.min.css'
Result: SurveyJS styles applied globally
```

### New Files Created:

**surveyjs-angular-poc/public/assets/sample-forms/new-form.json**
- 2 pages, 5 field types, full translations

**surveyjs-react-poc/public/sample-forms/new-form.json**
- Same schema as Angular version

---

## Important Notes for Future Development

### 1. Form Service Architecture

Both POCs use a service pattern:
- Service maintains list of forms
- Service loads forms on demand
- Service caches loaded forms
- Service handles submission

**To add new form:**
1. Create JSON file in correct directory
2. Add entry to `formsList` in service
3. JSON path must match the ID

### 2. State Management

**Angular:** RxJS BehaviorSubject
```typescript
private currentLocaleSubject = new BehaviorSubject<string>('default');
currentLocale$ = this.currentLocaleSubject.asObservable();
```

**React:** Context API (in hooks) or can upgrade to Zustand

### 3. Asset Paths - CRITICAL

**Development:**
- Angular: `/assets/sample-forms/{id}.json`
- React: `/sample-forms/{id}.json`

**Production:**
- Both serve from same root, adjust paths in service accordingly

### 4. SurveyJS Styling

**Always import:** `survey-core/survey-core.min.css`
**Not:** `survey-core/defaultV2.min.css` (doesn't exist)

### 5. React Rendering Pattern

**NEVER do:**
```javascript
const survey = new Model(form);
survey.render(domElement);  // ❌ Won't work
```

**ALWAYS do:**
```javascript
const [survey, setSurvey] = useState(null);
// ... set survey ...
return <Survey model={survey} />;  // ✅ Correct
```

---

## Dependencies

### Angular POC
```
@angular/core, @angular/common, @angular/router
survey-core, survey-angular-ui
@angular/cdk (peer dependency of survey-angular-ui)
```

### React POC
```
react, react-router-dom
survey-core, survey-react-ui
```

### Custom Builder
```
react, react-dnd, react-dnd-html5-backend
zustand
```

---

## Debugging Tips

### 1. Check dev server is running
```bash
curl http://localhost:4200  # Angular
curl http://localhost:5173  # React
curl http://localhost:5174  # Builder
```

### 2. Check JSON files exist and are valid
```bash
# Angular
curl http://localhost:4200/assets/sample-forms/customer-questionnaire.json

# React
curl http://localhost:5173/sample-forms/customer-questionnaire.json
```

### 3. Check browser console
- Open DevTools (F12)
- Check Console tab for errors
- Check Network tab for 404s

### 4. Verify imports
```bash
# Check if survey-core is installed
npm ls survey-core

# Check if CSS can be imported
npm ls survey-core | grep -A2 version
```

### 5. Hard refresh browser
```
Cmd+Shift+R (Mac)
Ctrl+Shift+R (Windows/Linux)
```

---

## Performance Considerations

### Current Implementation:
- Forms cached after first load
- No virtual scrolling (fine for small forms)
- JSON re-render on every state change (acceptable)

### Potential Optimizations:
- Implement React.memo for form fields
- Add useMemo for translated strings
- Lazy load large forms
- Implement form versioning/caching strategy

---

## Security Considerations (For Production)

- ✅ Current: Client-side only, safe for demo
- ⚠️ Add: Backend validation for submissions
- ⚠️ Add: HTTPS/TLS for form data
- ⚠️ Add: CSRF protection tokens
- ⚠️ Add: Rate limiting on submissions
- ⚠️ Add: Authentication/authorization

---

## Next Steps / Future Enhancements

1. **Add form versioning** - Track form changes over time
2. **Add conditional logic** - Show/hide fields based on answers
3. **Add advanced validation** - Custom validators
4. **Add themes** - Dark mode, custom styling
5. **Add persistence** - Save drafts, resume later
6. **Add analytics** - Track form completion rates
7. **Add backend integration** - Real form storage
8. **Add webhooks** - Notify external systems on submission

---

## Files Reference

| File | Purpose | Language | Status |
|------|---------|----------|--------|
| MASTER_README.md | Project overview | Markdown | ✅ Complete |
| IMPLEMENTATION_SUMMARY.md | Feature checklist | Markdown | ✅ Complete |
| DEBUGGING_AND_FIXES.md | Issue tracking & solutions | Markdown | ✅ Complete |
| claude.md | This file - Claude context | Markdown | ✅ Complete |
| surveyjs-angular-poc/README.md | Angular setup guide | Markdown | ✅ Complete |
| surveyjs-react-poc/README.md | React setup guide | Markdown | ✅ Complete |
| custom-form-builder-poc/README.md | Builder setup guide | Markdown | ✅ Complete |

---

## Quick Commands Reference

```bash
# Development servers
cd surveyjs-angular-poc && npm start          # :4200
cd surveyjs-react-poc && npm run dev          # :5173
cd custom-form-builder-poc && npm run dev     # :5174

# Building
cd {poc-directory} && npm run build

# Testing
cd {poc-directory} && npm test

# Installing dependencies
cd {poc-directory} && npm install

# Clearing cache
rm -rf node_modules package-lock.json && npm install
```

---

## Success Criteria - All ✅

- ✅ Three POCs created and fully functional
- ✅ JSON schemas portable across all three
- ✅ Multi-language support (EN/VI) working
- ✅ Form rendering without errors
- ✅ Form submission working
- ✅ Custom builder generates valid JSON
- ✅ All major bugs fixed and documented
- ✅ Comprehensive documentation provided
- ✅ Ready for production deployment (after security hardening)

---

**Last Session Date:** November 12, 2025
**Created By:** Claude Code
**Next Session:** Ready to continue - all context preserved in this file
