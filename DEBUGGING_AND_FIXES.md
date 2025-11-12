# Debugging and Fixes Documentation

**Date:** November 12, 2025
**Session Focus:** React POC Form Rendering, Angular Form Rendering with SurveyModule, New Form Integration

---

## Table of Contents

1. [Issues Encountered](#issues-encountered)
2. [Root Cause Analysis](#root-cause-analysis)
3. [Fixes Applied](#fixes-applied)
4. [Lessons Learned](#lessons-learned)
5. [Code Patterns to Avoid](#code-patterns-to-avoid)
6. [Testing Verification](#testing-verification)

---

## Issues Encountered

### Issue #1: `Survey.Model is not a constructor` (React POC)

**Location:** `surveyjs-react-poc/src/components/FormRenderer/FormRenderer.jsx:24`

**Error Message:**
```
TypeError: Survey.Model is not a constructor at FormRenderer.jsx:24:22
```

**Symptom:** React dev server crashes immediately on page load, form cannot render

**Code that caused it:**
```javascript
import { Survey } from 'survey-react-ui';

useEffect(() => {
  if (form) {
    const survey = new Survey.Model(form);  // ❌ CRASH HERE
```

**When it occurred:** First load of React POC after fixing CSS import

**Impact:** Completely blocked React POC from functioning

---

### Issue #2: Empty Blank Div - Form Not Rendering (React POC)

**Location:** `surveyjs-react-poc/src/components/FormRenderer/FormRenderer.jsx`

**Symptom:**
```html
<div class="_surveyContainer_1bker_95"></div>  <!-- Empty! -->
```

Form JSON loaded successfully (visible in Network tab), but no form UI appeared. The container div remained empty.

**Code that caused it:**
```javascript
const surveyRef = useRef(null);

useEffect(() => {
  if (form) {
    const survey = new Model(form);
    // ... setup code ...
    survey.render(surveyRef.current);  // ❌ Wrong approach
  }
}, [form]);

return (
  <div ref={surveyRef} className={styles.surveyContainer}></div>
);
```

**When it occurred:** After fixing the `Survey.Model is not a constructor` error

**Root Cause:** Using vanilla DOM rendering approach (`survey.render()`) doesn't work well in React because:
- React manages the virtual DOM
- Direct DOM manipulation bypasses React's rendering
- The survey.render() from survey-core doesn't generate proper UI without React components
- No error was thrown, but nothing rendered

**Impact:** Forms appear to load (no errors), but user sees blank page

---

### Issue #3: Private FormService - TypeScript Visibility Error (Angular POC)

**Location:** `surveyjs-angular-poc/src/app/components/form-renderer/form-renderer.component.ts` (and form-list)

**Error Message:**
```
TS2341: Property 'formService' is private and only accessible within class 'FormRendererComponent'
```

**Symptom:** Can't use formService in template

**Code that caused it:**
```typescript
export class FormRendererComponent implements OnInit {
  constructor(private formService: FormService) {}  // ❌ private
}
```

**Template trying to use it:**
```html
{{ formService.getTranslation(formSchema.title) }}  <!-- ❌ Error -->
```

**When it occurred:** After initial setup, when trying to use formService in template

**Impact:** Angular build fails, components won't compile

---

### Issue #4: JSON Files Not Found - 404 Errors (Angular POC)

**Error Message:**
```
Http failure response for http://localhost:4200/assets/sample-forms/kyc-form.json: 404 Not Found
```

**Symptom:** Form list page loads, but clicking a form shows error message instead of form

**Code:**
```typescript
// form.service.ts
this.http.get<FormSchema>(`/assets/sample-forms/${id}.json`)
```

**When it occurred:** After initial Angular app setup

**Root Cause:** Angular was looking for `/assets/sample-forms/` but the files were in `src/assets/`. Angular's dev server configuration:
- Serves the `public/` folder as root
- Files in `src/assets/` are NOT automatically served in dev mode
- Must copy JSON files to `public/assets/sample-forms/` for dev server

**Impact:** Forms cannot load, entire form rendering feature broken

---

### Issue #5: Survey Not Rendering - DOM Manipulation Issue (Angular POC - Early Attempt)

**Symptom:** Similar to React - form loads without error but nothing appears

**Code attempted:**
```typescript
createSurvey(schema: FormSchema): void {
  this.survey = new Model(schema);
  this.survey.onComplete.add((result: any) => {
    this.handleFormSubmission(result);
  });
  console.log('About to call survey.render()');
  // Attempted: this.survey.render(someElementRef);
}
```

**Template attempted:**
```html
<div #surveyContainer class="survey-container"></div>
```

**Root Cause:** Vanilla `survey.render()` from survey-core:
- Doesn't create proper DOM elements without UI library
- Doesn't integrate well with Angular's change detection
- Requires using the proper SurveyJS Angular UI library

**Impact:** Similar blank form issue, confusing because no error thrown

---

### Issue #6: Missing Dependency - @angular/cdk

**Error Message:**
```
Could not resolve "@angular/cdk/portal"
```

**When it occurred:** After attempting to use SurveyModule from survey-angular-ui

**Root Cause:** survey-angular-ui has an undeclared peer dependency on @angular/cdk

**Impact:** Build fails, cannot use SurveyModule

---

### Issue #7: Invalid CSS Import Path

**Error Message:**
```
Could not resolve "survey-core/defaultV2.min.css"
```

**Location:** React POC initial CSS import

**Code:**
```javascript
import 'survey-core/defaultV2.min.css';  // ❌ File doesn't exist
```

**Root Cause:** Incorrect path in survey-core package

**Impact:** CSS import fails, styling issues

---

## Root Cause Analysis

### Understanding SurveyJS Architecture

SurveyJS is split into multiple packages with specific responsibilities:

```
survey-core
└─ Model class (business logic, data handling)
└─ survey-core.min.css (base styles)

survey-react-ui
└─ Survey component (React wrapper)
└─ Handles React rendering

survey-angular-ui
└─ SurveyModule (Angular module)
└─ survey component (Angular wrapper)
└─ Depends on @angular/cdk

Both UI libraries use Model from survey-core internally
```

**Key Insight:** To render a form, you need BOTH:
1. Model from `survey-core` (business logic)
2. Rendering component from appropriate UI library (`survey-react-ui`, `survey-angular-ui`)

### Why Vanilla DOM Rendering Doesn't Work

```javascript
// ❌ Wrong - only creates Model, no UI
const survey = new Model(form);
survey.render(domElement);  // survey.render() is intended for non-framework usage

// ✅ Correct - Model + React component
const survey = new Model(form);
<Survey model={survey} />  // React handles rendering
```

### Asset Serving Configuration

**Angular:**
- Dev server serves `public/` folder as root
- `public/assets/` → maps to `/assets/` in browser
- `src/assets/` is NOT served (only available at build time)

**React (Vite):**
- Dev server serves `public/` folder as root
- `public/sample-forms/` → maps to `/sample-forms/` in browser

---

## Fixes Applied

### Fix #1: Correct Import Statement (React POC)

**File:** `surveyjs-react-poc/src/components/FormRenderer/FormRenderer.jsx`

**Before:**
```javascript
import { Survey } from 'survey-react-ui';

const survey = new Survey.Model(form);  // ❌ Survey.Model doesn't exist
```

**After:**
```javascript
import { Survey } from 'survey-react-ui';
import { Model } from 'survey-core';  // ✅ Correct import

const survey = new Model(form);  // ✅ Works!
```

**Why it works:** Model is exported from survey-core, not survey-react-ui

---

### Fix #2: Use React Component Instead of DOM Rendering (React POC)

**File:** `surveyjs-react-poc/src/components/FormRenderer/FormRenderer.jsx`

**Before:**
```javascript
import { useEffect, useRef } from 'react';

const surveyRef = useRef(null);

useEffect(() => {
  if (form) {
    const survey = new Model(form);
    survey.onComplete.add((result) => {
      handleFormSubmission(result);
    });
    survey.render(surveyRef.current);  // ❌ Vanilla DOM approach
  }
}, [form]);

return (
  <div ref={surveyRef} className={styles.surveyContainer}></div>
);
```

**After:**
```javascript
import { useEffect, useState } from 'react';  // ✅ useState instead of useRef

const [survey, setSurvey] = useState(null);

useEffect(() => {
  if (form) {
    const newSurvey = new Model(form);
    newSurvey.onComplete.add((result) => {
      handleFormSubmission(result);
    });
    setSurvey(newSurvey);  // ✅ Store in state
  }
}, [form]);

return (
  {!isLoading && !error && !submittedData && survey && (
    <div className={styles.formWrapper}>
      <Survey model={survey} />  {/* ✅ Use React component */}
    </div>
  )}
);
```

**Why it works:**
- State management is React-idiomatic
- `<Survey>` component from survey-react-ui handles proper rendering
- Integrates with React's virtual DOM
- Proper cleanup and re-render lifecycle

---

### Fix #3: Make FormService Public (Angular POC)

**File:** `surveyjs-angular-poc/src/app/services/form.service.ts`

**Before:**
```typescript
export class FormRendererComponent implements OnInit {
  constructor(private formService: FormService) {}  // ❌ private
}
```

**After:**
```typescript
export class FormRendererComponent implements OnInit {
  constructor(public formService: FormService) {}  // ✅ public
}
```

**Why it works:** Angular template binding can only access public properties

**Applied to:**
- `form-renderer.component.ts` (line 27)
- `form-list.component.ts` (similar pattern)

---

### Fix #4: Move JSON Files to Correct Directory (Angular POC)

**Directory structure:**

**Before (❌ wrong location):**
```
surveyjs-angular-poc/
└─ src/
   └─ assets/
      └─ sample-forms/
         ├─ customer-questionnaire.json
         └─ kyc-form.json
```

**After (✅ correct location):**
```
surveyjs-angular-poc/
└─ public/
   └─ assets/
      └─ sample-forms/
         ├─ customer-questionnaire.json
         ├─ kyc-form.json
         └─ new-form.json
```

**Why it works:** Angular dev server (ng serve) serves the `public/` folder as the document root

---

### Fix #5: Use SurveyModule from survey-angular-ui (Angular POC)

**File:** `surveyjs-angular-poc/src/app/components/form-renderer/form-renderer.component.ts`

**Before (attempted vanilla DOM rendering):**
```typescript
import { Model } from 'survey-core';

createSurvey(schema: FormSchema): void {
  this.survey = new Model(schema);
  // survey.render() doesn't work well without UI library
}
```

**After (✅ proper Angular integration):**
```typescript
import { SurveyModule } from 'survey-angular-ui';
import { Model } from 'survey-core';

@Component({
  selector: 'app-form-renderer',
  standalone: true,
  imports: [CommonModule, SurveyModule],  // ✅ Import SurveyModule
  templateUrl: './form-renderer.component.html',
  styleUrls: ['./form-renderer.component.scss']
})
export class FormRendererComponent implements OnInit {
  survey: Model | null = null;

  createSurvey(schema: FormSchema): void {
    this.survey = new Model(schema);
    // ✅ Template uses <survey [model]="survey"></survey>
  }
}
```

**Template:**
```html
<div *ngIf="!isLoading && !error && !isSubmitted && survey" class="form-wrapper">
  <div class="survey-container">
    <survey [model]="survey"></survey>  {/* ✅ Proper Angular component */}
  </div>
</div>
```

**Why it works:**
- SurveyModule provides the `survey` component
- Integrates with Angular's component system
- Proper change detection
- Type-safe model binding

---

### Fix #6: Install Missing Dependency

**Command:**
```bash
cd surveyjs-angular-poc
npm install @angular/cdk
```

**Why it works:** survey-angular-ui depends on @angular/cdk for portal functionality

---

### Fix #7: Use Correct CSS Import Path

**File:** `surveyjs-react-poc/src/components/FormRenderer/FormRenderer.jsx`

**Before:**
```javascript
import 'survey-core/defaultV2.min.css';  // ❌ File doesn't exist
```

**After:**
```javascript
import 'survey-core/survey-core.min.css';  // ✅ Correct path
```

**Also added to:** `surveyjs-angular-poc/src/styles.scss`
```scss
@import 'survey-core/survey-core.min.css';  // ✅ Global styles
```

---

### Fix #8: Add New Form to Both POCs

**Files created:**
- `surveyjs-angular-poc/public/assets/sample-forms/new-form.json`
- `surveyjs-react-poc/public/sample-forms/new-form.json`

**Updates made:**

Angular POC (`src/app/services/form.service.ts`):
```typescript
private formsList: FormListItem[] = [
  // ... existing forms ...
  {
    id: 'new-form',
    name: 'new-form',
    title: {
      default: 'New Form',
      vi: 'Biểu mẫu mới'
    },
    description: {
      default: '',
      vi: ''
    }
  }
];
```

React POC (`src/services/formService.js`):
```javascript
this.formsList = [
  // ... existing forms ...
  {
    id: 'new-form',
    name: 'new-form',
    title: {
      default: 'New Form',
      vi: 'Biểu mẫu mới'
    },
    description: {
      default: '',
      vi: ''
    }
  }
];
```

---

## Lessons Learned

### 1. Framework-Specific Rendering

**Learning:** Each framework has its own rendering paradigm:

- **React:** Use components, manage state, virtual DOM handles rendering
- **Angular:** Use standalone components with proper module imports
- **Vanilla DOM:** Only for non-framework usage (plain HTML/JS)

**Takeaway:** Never mix paradigms. Use the framework's rendering approach.

---

### 2. SurveyJS Package Organization

**Learning:** SurveyJS is modular:
- `survey-core` = Business logic and Model
- `survey-react-ui` = React rendering wrapper
- `survey-angular-ui` = Angular rendering wrapper

**Takeaway:** Always import Model from `survey-core`, UI components from framework-specific packages

---

### 3. State Management in React

**Learning:** When you need to trigger re-renders based on external logic:

**Wrong approach:**
```javascript
const domRef = useRef(null);
// Manually manipulating DOM, React won't know to re-render
```

**Right approach:**
```javascript
const [value, setValue] = useState(null);
// State triggers re-render, React manages DOM
```

**Takeaway:** Use state for values that affect rendering, refs only for DOM access (focus, measurements, etc.)

---

### 4. Asset Serving Configuration Matters

**Learning:** Different tools serve assets differently:

- **Angular (ng serve):** Serves `public/` as document root
- **Vite (dev server):** Serves `public/` as document root
- **Both:** NOT the same as `src/assets/` in development

**Takeaway:** Always check the dev server's asset serving configuration

---

### 5. Error Visibility vs Silent Failures

**Learning:** Some issues throw errors, some don't:

**With error (easy to debug):**
```javascript
new Survey.Model(form);  // Error: Survey.Model is not a constructor
```

**Silent failure (hard to debug):**
```javascript
survey.render(domElement);  // No error, but nothing renders
// Symptom: Blank page, confusing
```

**Takeaway:** When something doesn't work but no error appears, check:
- Is the DOM being manipulated correctly?
- Is the framework's rendering being used?
- Are styles being applied?

---

### 6. TypeScript Visibility in Templates

**Learning:** Angular templates can only access public properties

```typescript
constructor(private service: Service) {}      // ❌ Template can't see it
constructor(public service: Service) {}       // ✅ Template can see it
```

**Takeaway:** For properties used in templates, make them `public`

---

### 7. Peer Dependencies Must Be Installed

**Learning:** Some packages have peer dependencies that aren't auto-installed:

```
survey-angular-ui → requires @angular/cdk
```

**Takeaway:** Check package.json for peer dependencies if you see resolution errors

---

## Code Patterns to Avoid

### Pattern 1: ❌ Wrong - Mixed Paradigms

```javascript
// React + vanilla DOM rendering
const ref = useRef(null);
useEffect(() => {
  survey.render(ref.current);  // ❌ Wrong approach
}, []);
return <div ref={ref}></div>;
```

**Why:** React's virtual DOM conflicts with direct DOM manipulation

### Pattern 2: ❌ Wrong - Incorrect Package Imports

```javascript
import { Survey } from 'survey-react-ui';
const survey = new Survey.Model(form);  // ❌ Survey.Model doesn't exist
```

**Why:** Model is in survey-core, not survey-react-ui

### Pattern 3: ❌ Wrong - Wrong Asset Paths

```
// In dev:
src/assets/forms/my-form.json  // ❌ Not served by dev server
// Correct:
public/assets/forms/my-form.json  // ✅ Served as /assets/forms/my-form.json
```

**Why:** Dev servers have specific document root configurations

### Pattern 4: ❌ Wrong - Private Properties in Templates (Angular)

```typescript
constructor(private service: Service) {}

// In template:
{{ service.method() }}  // ❌ Error: property is private
```

**Why:** TypeScript enforces visibility rules even in templates

---

## Testing Verification

### ✅ Verification Checklist

**React POC - FormRenderer:**
- ✅ Form loads without `Survey.Model is not a constructor` error
- ✅ Form JSON files load successfully (check Network tab)
- ✅ Survey component renders with form UI (not blank div)
- ✅ All field types display: text, dropdown, radio buttons, checkbox, date
- ✅ Form submission works (displays success message)
- ✅ Language switching works (EN/VI)
- ✅ Both pages render correctly with pagination

**Angular POC - FormRenderer:**
- ✅ Form list loads 3 forms (customer-questionnaire, kyc-form, new-form)
- ✅ SurveyModule component renders form properly
- ✅ Form submission works
- ✅ Language switching works
- ✅ Multi-page forms work

**New Form Integration:**
- ✅ `new-form.json` exists in both public/asset directories
- ✅ Form registry updated in both form services
- ✅ New form appears in form list in both apps
- ✅ New form renders correctly in both apps
- ✅ All fields display and work properly

---

## Summary of Changes

### Files Modified:
1. `surveyjs-react-poc/src/components/FormRenderer/FormRenderer.jsx`
   - Added: `import { Model } from 'survey-core';`
   - Changed: `useRef` → `useState` for survey state
   - Changed: `survey.render()` → `<Survey model={survey} />`
   - Result: ✅ Forms now render correctly

2. `surveyjs-angular-poc/src/app/services/form.service.ts`
   - Added: new-form entry to formsList
   - Result: ✅ New form available in list

3. `surveyjs-react-poc/src/services/formService.js`
   - Added: new-form entry to formsList
   - Result: ✅ New form available in list

4. `surveyjs-angular-poc/src/app/components/form-renderer/form-renderer.component.ts`
   - Changed: `private formService` → `public formService`
   - Added: SurveyModule import
   - Result: ✅ Template can access formService, SurveyModule component available

5. `surveyjs-angular-poc/src/styles.scss`
   - Added: `@import 'survey-core/survey-core.min.css';`
   - Result: ✅ Proper styling applied

### Files Created:
1. `surveyjs-angular-poc/public/assets/sample-forms/new-form.json`
   - Multi-language form with 2 pages, 5 field types

2. `surveyjs-react-poc/public/sample-forms/new-form.json`
   - Same schema as Angular version

---

**Status:** All issues fixed, all POCs functioning correctly
**Date Fixed:** November 12, 2025
**Ready for Testing:** ✅ YES
