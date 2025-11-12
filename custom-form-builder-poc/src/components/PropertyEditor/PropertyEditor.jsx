import React from 'react';
import { useFormStore } from '../../store/formStore';
import styles from './PropertyEditor.module.css';

export const PropertyEditor = () => {
  const selectedFieldId = useFormStore(state => state.selectedFieldId);
  const form = useFormStore(state => state.form);
  const selectedPageIndex = useFormStore(state => state.selectedPageIndex);
  const updateField = useFormStore(state => state.updateField);

  const currentPage = form.pages[selectedPageIndex];
  const field = currentPage.elements.find(f => f.id === selectedFieldId);

  if (!field) {
    return (
      <div className={styles.container}>
        <div className={styles.empty}>
          <p>Select a field to edit properties</p>
        </div>
      </div>
    );
  }

  const handleTitleChange = (locale, value) => {
    updateField(field.id, {
      title: { ...field.title, [locale]: value }
    });
  };

  const handlePlaceholderChange = (locale, value) => {
    updateField(field.id, {
      placeholder: { ...field.placeholder, [locale]: value }
    });
  };

  const handleRequiredChange = (value) => {
    updateField(field.id, { isRequired: value });
  };

  const handleChoiceAdd = () => {
    if (field.choices) {
      const newChoice = {
        value: `option${field.choices.length + 1}`,
        text: { default: `Option ${field.choices.length + 1}`, vi: `Tùy chọn ${field.choices.length + 1}` }
      };
      updateField(field.id, {
        choices: [...field.choices, newChoice]
      });
    }
  };

  const handleChoiceUpdate = (index, locale, value) => {
    if (field.choices) {
      const newChoices = [...field.choices];
      newChoices[index] = {
        ...newChoices[index],
        text: { ...newChoices[index].text, [locale]: value }
      };
      updateField(field.id, { choices: newChoices });
    }
  };

  const handleChoiceDelete = (index) => {
    if (field.choices) {
      const newChoices = field.choices.filter((_, i) => i !== index);
      updateField(field.id, { choices: newChoices });
    }
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Field Properties</h3>

      <div className={styles.section}>
        <label className={styles.label}>Field Type</label>
        <input
          type="text"
          className={styles.input}
          value={field.type}
          disabled
          readOnly
        />
      </div>

      <div className={styles.section}>
        <label className={styles.label}>Title (English)</label>
        <input
          type="text"
          className={styles.input}
          value={field.title.default}
          onChange={(e) => handleTitleChange('default', e.target.value)}
          placeholder="Field title"
        />
      </div>

      <div className={styles.section}>
        <label className={styles.label}>Title (Vietnamese)</label>
        <input
          type="text"
          className={styles.input}
          value={field.title.vi || ''}
          onChange={(e) => handleTitleChange('vi', e.target.value)}
          placeholder="Tiêu đề trường"
        />
      </div>

      {field.placeholder && (
        <>
          <div className={styles.section}>
            <label className={styles.label}>Placeholder (English)</label>
            <input
              type="text"
              className={styles.input}
              value={field.placeholder.default || ''}
              onChange={(e) => handlePlaceholderChange('default', e.target.value)}
              placeholder="Placeholder text"
            />
          </div>

          <div className={styles.section}>
            <label className={styles.label}>Placeholder (Vietnamese)</label>
            <input
              type="text"
              className={styles.input}
              value={field.placeholder.vi || ''}
              onChange={(e) => handlePlaceholderChange('vi', e.target.value)}
              placeholder="Văn bản gợi ý"
            />
          </div>
        </>
      )}

      <div className={styles.section}>
        <label className={styles.checkbox}>
          <input
            type="checkbox"
            checked={field.isRequired}
            onChange={(e) => handleRequiredChange(e.target.checked)}
          />
          Required Field
        </label>
      </div>

      {field.choices && (
        <div className={styles.section}>
          <label className={styles.label}>Options</label>
          <div className={styles.choicesList}>
            {field.choices.map((choice, index) => (
              <div key={index} className={styles.choiceItem}>
                <input
                  type="text"
                  className={styles.choiceInput}
                  value={choice.text.default}
                  onChange={(e) =>
                    handleChoiceUpdate(index, 'default', e.target.value)
                  }
                  placeholder="Option text"
                />
                <input
                  type="text"
                  className={styles.choiceInput}
                  value={choice.text.vi || ''}
                  onChange={(e) =>
                    handleChoiceUpdate(index, 'vi', e.target.value)
                  }
                  placeholder="Văn bản tùy chọn"
                />
                <button
                  className={styles.btnDelete}
                  onClick={() => handleChoiceDelete(index)}
                  title="Delete option"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <button
            className={styles.btnAddChoice}
            onClick={handleChoiceAdd}
          >
            + Add Option
          </button>
        </div>
      )}

      {field.rows && (
        <div className={styles.section}>
          <label className={styles.label}>Rows</label>
          <input
            type="number"
            className={styles.input}
            value={field.rows}
            onChange={(e) =>
              updateField(field.id, { rows: parseInt(e.target.value) })
            }
            min="1"
            max="20"
          />
        </div>
      )}
    </div>
  );
};

export default PropertyEditor;
