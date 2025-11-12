import React, { useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Survey } from 'survey-react-ui';
import 'survey-core/defaultV2.min.css';
import { useFormLoader } from '../../hooks/useFormLoader';
import { useFormSubmission } from '../../hooks/useFormSubmission';
import { useLocale } from '../../hooks/useLocale';
import { formService } from '../../services/formService';
import styles from './FormRenderer.module.css';

export const FormRenderer = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const formId = searchParams.get('id');

  const { form, isLoading, error } = useFormLoader(formId);
  const { submitForm, isSubmitting, submittedData, clearSubmittedData } = useFormSubmission();
  const { getTranslation } = useLocale();
  const surveyRef = useRef(null);

  useEffect(() => {
    if (form) {
      // Create survey model
      const survey = new Survey.Model(form);

      // Set current language
      const currentLocale = formService.getCurrentLocale();
      if (currentLocale !== 'default') {
        survey.locale = currentLocale;
      }

      // Handle survey completion
      survey.onComplete.add((result) => {
        handleFormSubmission(result);
      });

      // Render survey
      survey.render(surveyRef.current);
    }
  }, [form]);

  const handleFormSubmission = (result) => {
    if (formId) {
      submitForm(formId, result.data);
    }
  };

  const handleStartOver = () => {
    clearSubmittedData();
    if (formId) {
      // Reload the form
      window.location.reload();
    }
  };

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.btnBack} onClick={handleGoBack}>
          ← Back to Forms
        </button>
        {form && (
          <h1 className={styles.title}>
            {getTranslation(form.title)}
          </h1>
        )}
      </div>

      {isLoading && (
        <div className={styles.loadingSpinner}>
          <div className={styles.spinner}></div>
          <p>Loading form...</p>
        </div>
      )}

      {error && (
        <div className={styles.errorMessage}>
          <span className={styles.errorIcon}>⚠️</span>
          {error}
        </div>
      )}

      {!isLoading && !error && !submittedData && (
        <div className={styles.formWrapper}>
          <div ref={surveyRef} className={styles.surveyContainer}></div>
        </div>
      )}

      {submittedData && (
        <div className={styles.successMessage}>
          <div className={styles.successContent}>
            <span className={styles.successIcon}>✓</span>
            <h2>Form Submitted Successfully!</h2>
            <p>Thank you for completing the form. Your information has been recorded.</p>

            <div className={styles.submittedData}>
              <h3>Submitted Data:</h3>
              <pre>{JSON.stringify(submittedData.data, null, 2)}</pre>
            </div>

            <div className={styles.buttonGroup}>
              <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={handleStartOver}>
                Fill Another Form
              </button>
              <button className={`${styles.btn} ${styles.btnSecondary}`} onClick={handleGoBack}>
                Back to Forms
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormRenderer;
