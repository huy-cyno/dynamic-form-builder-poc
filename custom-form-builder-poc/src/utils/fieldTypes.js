// Field types and their templates
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
  [FIELD_TYPES.TEXT]: {
    type: 'text',
    name: 'textField',
    title: { default: 'Text Field', vi: 'Trường văn bản' },
    placeholder: { default: 'Enter text', vi: 'Nhập văn bản' },
    isRequired: false
  },
  [FIELD_TYPES.TEXTAREA]: {
    type: 'comment',
    name: 'textareaField',
    title: { default: 'Text Area', vi: 'Vùng văn bản' },
    placeholder: { default: 'Enter text', vi: 'Nhập văn bản' },
    rows: 4,
    isRequired: false
  },
  [FIELD_TYPES.DROPDOWN]: {
    type: 'dropdown',
    name: 'dropdownField',
    title: { default: 'Dropdown', vi: 'Danh sách thả xuống' },
    choices: [
      { value: 'option1', text: { default: 'Option 1', vi: 'Tùy chọn 1' } },
      { value: 'option2', text: { default: 'Option 2', vi: 'Tùy chọn 2' } }
    ],
    isRequired: false
  },
  [FIELD_TYPES.RADIO]: {
    type: 'radiogroup',
    name: 'radioField',
    title: { default: 'Radio Buttons', vi: 'Nút radio' },
    choices: [
      { value: 'option1', text: { default: 'Option 1', vi: 'Tùy chọn 1' } },
      { value: 'option2', text: { default: 'Option 2', vi: 'Tùy chọn 2' } }
    ],
    isRequired: false
  },
  [FIELD_TYPES.CHECKBOX]: {
    type: 'checkbox',
    name: 'checkboxField',
    title: { default: 'Checkbox', vi: 'Hộp kiểm' },
    isRequired: false
  },
  [FIELD_TYPES.DATE]: {
    type: 'date',
    name: 'dateField',
    title: { default: 'Date', vi: 'Ngày' },
    isRequired: false
  },
  [FIELD_TYPES.NUMBER]: {
    type: 'number',
    name: 'numberField',
    title: { default: 'Number', vi: 'Số' },
    placeholder: { default: 'Enter number', vi: 'Nhập số' },
    isRequired: false
  }
};

export const getFieldTypeLabel = (type) => {
  const labels = {
    [FIELD_TYPES.TEXT]: 'Text Input',
    [FIELD_TYPES.TEXTAREA]: 'Text Area',
    [FIELD_TYPES.DROPDOWN]: 'Dropdown',
    [FIELD_TYPES.RADIO]: 'Radio Buttons',
    [FIELD_TYPES.CHECKBOX]: 'Checkbox',
    [FIELD_TYPES.DATE]: 'Date Picker',
    [FIELD_TYPES.NUMBER]: 'Number Input'
  };
  return labels[type] || type;
};

export const getFieldTypeIcon = (type) => {
  const icons = {
    [FIELD_TYPES.TEXT]: '📝',
    [FIELD_TYPES.TEXTAREA]: '📄',
    [FIELD_TYPES.DROPDOWN]: '⬇️',
    [FIELD_TYPES.RADIO]: '⭕',
    [FIELD_TYPES.CHECKBOX]: '☑️',
    [FIELD_TYPES.DATE]: '📅',
    [FIELD_TYPES.NUMBER]: '🔢'
  };
  return icons[type] || '🔹';
};
