# Custom Form Builder POC

A professional-grade visual form builder with drag-and-drop interface for creating SurveyJS-compatible forms.

## Features

- 🎯 **Drag-and-Drop Interface**: Intuitive field palette with drag-drop to canvas
- 🎨 **Visual Form Designer**: WYSIWYG editor for form building
- 🔧 **Property Editor**: Edit field properties (title, placeholder, choices, validation)
- 📋 **Multi-Language Support**: Build forms in English and Vietnamese
- 📄 **Multi-Page Forms**: Create forms with multiple pages/sections
- 📊 **JSON Export**: Real-time JSON preview and download
- 📥 **Import/Load**: Load sample forms or import existing JSON
- 🔄 **Undo/Reset**: Reset forms and start fresh
- ✨ **Live Preview**: See changes in real-time
- 📱 **Responsive Design**: Works on different screen sizes

## Tech Stack

- **React 18+**: Frontend framework
- **Vite**: Build tool and dev server
- **React DnD**: Drag-and-drop functionality
- **Zustand**: State management
- **UUID**: Unique ID generation
- **CSS Modules**: Scoped component styling

## Project Structure

```
custom-form-builder-poc/
├── src/
│   ├── components/
│   │   ├── FormBuilder/
│   │   │   ├── FormBuilder.jsx
│   │   │   └── FormBuilder.module.css
│   │   ├── FormCanvas/
│   │   │   ├── FormCanvas.jsx
│   │   │   ├── CanvasField.jsx
│   │   │   └── FormCanvas.module.css
│   │   ├── FieldPalette/
│   │   │   ├── FieldPalette.jsx
│   │   │   └── FieldPalette.module.css
│   │   ├── PropertyEditor/
│   │   │   ├── PropertyEditor.jsx
│   │   │   └── PropertyEditor.module.css
│   │   └── JSONPreview/
│   │       ├── JSONPreview.jsx
│   │       └── JSONPreview.module.css
│   ├── store/
│   │   └── formStore.js          # Zustand state management
│   ├── utils/
│   │   └── fieldTypes.js         # Field type definitions
│   ├── App.jsx
│   ├── main.jsx
│   ├── App.css
│   └── index.css
├── public/
│   └── sample-forms/
│       ├── customer-questionnaire.json
│       └── kyc-form.json
├── package.json
└── vite.config.js
```

## Installation

### Prerequisites

- Node.js (v18+)
- npm (v9+)

### Setup

```bash
# Install dependencies
npm install
```

## Running the Application

```bash
# Start development server
npm run dev

# Navigate to http://localhost:5173
```

## Usage Guide

### 1. **Main Interface**
   - **Left Panel**: Field Palette with 7 field types
   - **Center**: Form Canvas (drag fields here)
   - **Right Panel**: Property Editor (customize selected field)
   - **Bottom** (Toggle): JSON Preview panel

### 2. **Creating a Form**
   1. Drag fields from the left palette onto the canvas
   2. Click fields to select them and edit properties
   3. Drag to reorder fields
   4. Use up/down arrows to move fields
   5. Delete button (✕) to remove fields

### 3. **Field Types**
   - 📝 **Text Input**: Single-line text field
   - 📄 **Text Area**: Multi-line text field
   - ⬇️ **Dropdown**: Select from list
   - ⭕ **Radio Buttons**: Single selection
   - ☑️ **Checkbox**: Boolean checkbox
   - 📅 **Date Picker**: Date selection
   - 🔢 **Number Input**: Numeric field

### 4. **Property Editing**
   - **Title**: Field label in English and Vietnamese
   - **Placeholder**: Hint text (if applicable)
   - **Required**: Mark field as required
   - **Options**: Add/edit/delete choices (for dropdowns, radios, etc.)
   - **Rows**: Adjust text area height

### 5. **Page Management**
   - Add multiple pages with "Add Page" button
   - Click page tabs to switch between pages
   - Edit page titles inline
   - Delete pages (minimum 1 page required)

### 6. **Form Management**
   - **Show JSON**: Toggle JSON preview panel
   - **Load Sample 1/2**: Load example forms
   - **Import JSON**: Paste JSON to load a form
   - **Reset Form**: Clear and start fresh

### 7. **Export/Share**
   - **Copy**: Copy generated JSON to clipboard
   - **Download**: Download form as JSON file
   - Use exported JSON in Angular or React POCs

## Store Architecture (Zustand)

The form state is managed by `useFormStore`:

```javascript
// Get current form
const form = useFormStore(state => state.form);

// Add a field
useFormStore.getState().addField(field);

// Update field properties
useFormStore.getState().updateField(fieldId, updates);

// Delete a field
useFormStore.getState().deleteField(fieldId);

// Manage pages
useFormStore.getState().addPage();
useFormStore.getState().setSelectedPageIndex(index);
```

## Field Types Configuration

Field types are defined in `src/utils/fieldTypes.js`:

```javascript
export const FIELD_TYPES = {
  TEXT: 'text',
  TEXTAREA: 'comment',
  DROPDOWN: 'dropdown',
  RADIO: 'radiogroup',
  CHECKBOX: 'checkbox',
  DATE: 'date',
  NUMBER: 'number'
};

export const FIELD_TEMPLATES = {
  // Template for each field type with default properties
};
```

## Drag-and-Drop System

Uses react-dnd with HTML5 backend:

1. **FieldPalette** exports draggable field types
2. **FormCanvas** accepts drops and adds fields
3. **CanvasField** shows field preview with action buttons

## JSON Schema Output

Generated JSON is fully compatible with SurveyJS:

```json
{
  "title": {
    "default": "My Form",
    "vi": "Biểu mẫu của tôi"
  },
  "pages": [
    {
      "name": "page1",
      "title": { "default": "Page 1", "vi": "Trang 1" },
      "elements": [
        {
          "type": "text",
          "name": "firstName",
          "title": { "default": "First Name", "vi": "Tên" },
          "isRequired": false,
          "placeholder": { "default": "Enter first name", "vi": "Nhập tên" }
        }
      ]
    }
  ]
}
```

## Keyboard Shortcuts

- Click field → Edit properties on right panel
- Up/Down arrows → Move fields up/down
- Delete button → Remove field

## Sample Forms

Two sample forms are included:

1. **customer-questionnaire.json**: Multi-page form with personal info
2. **kyc-form.json**: Complex KYC form with conditional fields

Load them using "Load Sample 1/2" buttons in the toolbar.

## Cross-Compatibility

Generated forms work seamlessly with:
- **Angular POC**: `surveyjs-angular-poc`
- **React POC**: `surveyjs-react-poc`

Export JSON and paste it into either application to render the form.

## Tips & Best Practices

1. **Multi-Language**: Always provide both English and Vietnamese translations
2. **Required Fields**: Mark important fields as required
3. **Validation**: Use field types that match your data requirements
4. **Options**: For dropdowns/radios, keep labels short and clear
5. **Export Early**: Frequently export JSON to avoid data loss
6. **Test**: Load exported forms in the Angular/React POCs

## Troubleshooting

**Fields not dragging**: Ensure you're clicking on the field correctly
**Properties not updating**: Click the field in the canvas to select it
**JSON not showing**: Toggle with "Show JSON" button
**Samples not loading**: Check `public/sample-forms/` directory exists

## Building for Production

```bash
npm run build
```

Output in `dist/` directory.

## Dependencies

```json
{
  "react": "^18.x",
  "react-dnd": "^16.x",
  "react-dnd-html5-backend": "^16.x",
  "zustand": "^4.x",
  "uuid": "^9.x"
}
```

## Architecture Notes

- **Component-Based**: Modular React components with CSS Modules
- **State Management**: Centralized form state with Zustand
- **Drag-Drop**: React DnD for smooth drag-and-drop UX
- **Real-Time Updates**: Instant JSON preview of changes
- **Scoped Styles**: CSS Modules prevent style conflicts

## Future Enhancements

- [ ] Field validation rules editor
- [ ] Conditional logic (show/hide based on answers)
- [ ] Custom CSS styling per field
- [ ] Form preview before export
- [ ] Undo/Redo functionality
- [ ] Form templates library
- [ ] Keyboard shortcuts help
- [ ] Dark mode support
- [ ] Field templates/presets
- [ ] Bulk operations

## License

Proof-of-concept implementation for demonstration purposes.

## Related Projects

- [Angular POC](../surveyjs-angular-poc) - Form renderer for Angular
- [React POC](../surveyjs-react-poc) - Form renderer for React
- [SurveyJS Documentation](https://surveyjs.io/)

---

**Note**: This is a POC implementation. For production use, consider:
- Backend persistence for forms
- User authentication and authorization
- Form versioning and history
- Advanced validation rules
- Field-level permissions
- Audit logging

