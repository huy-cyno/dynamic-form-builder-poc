import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useFormStore } from '../../store/formStore';
import FieldPalette from '../FieldPalette/FieldPalette';
import FormCanvas from '../FormCanvas/FormCanvas';
import PropertyEditor from '../PropertyEditor/PropertyEditor';
import JSONPreview from '../JSONPreview/JSONPreview';
import styles from './FormBuilder.module.css';

export const FormBuilder = () => {
  const form = useFormStore(state => state.form);
  const selectedPageIndex = useFormStore(state => state.selectedPageIndex);
  const setSelectedPageIndex = useFormStore(state => state.setSelectedPageIndex);
  const addPage = useFormStore(state => state.addPage);
  const deletePage = useFormStore(state => state.deletePage);
  const resetForm = useFormStore(state => state.resetForm);
  const setFormTitle = useFormStore(state => state.setFormTitle);
  const updatePageTitle = useFormStore(state => state.updatePageTitle);
  const [showJSON, setShowJSON] = useState(false);

  const handleLoadSample = async (formName) => {
    try {
      const response = await fetch(`/sample-forms/${formName}.json`);
      const formData = await response.json();
      useFormStore.getState().loadForm(formData);
    } catch (error) {
      console.error('Error loading sample form:', error);
      alert('Error loading sample form');
    }
  };

  const handleImportJSON = () => {
    const jsonText = prompt('Paste your form JSON:');
    if (jsonText) {
      try {
        const formData = JSON.parse(jsonText);
        useFormStore.getState().loadForm(formData);
      } catch (error) {
        alert('Invalid JSON format');
      }
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.container}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <h1 className={styles.title}>📝 Form Builder</h1>
            <p className={styles.subtitle}>Drag fields to create forms - SurveyJS compatible</p>
          </div>

          <div className={styles.formTitleSection}>
            <input
              type="text"
              className={styles.formTitleInput}
              value={form.title.default}
              onChange={(e) => setFormTitle('default', e.target.value)}
              placeholder="Form Title (English)"
            />
            <input
              type="text"
              className={styles.formTitleInput}
              value={form.title.vi || ''}
              onChange={(e) => setFormTitle('vi', e.target.value)}
              placeholder="Tiêu đề biểu mẫu (Tiếng Việt)"
            />
          </div>

          <div className={styles.toolbar}>
            <button className={styles.btnToolbar} onClick={() => setShowJSON(!showJSON)}>
              {showJSON ? '🔼 Hide JSON' : '📋 Show JSON'}
            </button>
            <button className={styles.btnToolbar} onClick={() => handleLoadSample('customer-questionnaire')}>
              📥 Load Sample 1
            </button>
            <button className={styles.btnToolbar} onClick={() => handleLoadSample('kyc-form')}>
              📥 Load Sample 2
            </button>
            <button className={styles.btnToolbar} onClick={handleImportJSON}>
              📤 Import JSON
            </button>
            <button className={styles.btnToolbar + ' ' + styles.btnDanger} onClick={resetForm}>
              🔄 Reset Form
            </button>
          </div>
        </header>

        {/* Page Tabs */}
        <div className={styles.pageTabs}>
          {form.pages.map((page, index) => (
            <div key={index} className={styles.pageTabItem}>
              <button
                className={`${styles.pageTab} ${index === selectedPageIndex ? styles.active : ''}`}
                onClick={() => setSelectedPageIndex(index)}
              >
                <input
                  type="text"
                  className={styles.pageTabTitle}
                  value={page.title.default}
                  onChange={(e) => updatePageTitle(index, 'default', e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                />
                <span className={styles.pageNum}>Page {index + 1}</span>
              </button>
              {form.pages.length > 1 && (
                <button
                  className={styles.btnDeletePage}
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePage(index);
                  }}
                  title="Delete page"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button className={styles.btnAddPage} onClick={addPage}>
            + Add Page
          </button>
        </div>

        {/* Main Content */}
        <div className={styles.content}>
          <div className={styles.sidebar}>
            <FieldPalette />
          </div>

          <div className={styles.canvas}>
            <FormCanvas />
          </div>

          <div className={styles.sidebar}>
            <PropertyEditor />
          </div>
        </div>

        {/* JSON Preview */}
        {showJSON && (
          <div className={styles.jsonPreview}>
            <JSONPreview />
          </div>
        )}
      </div>
    </DndProvider>
  );
};

export default FormBuilder;
