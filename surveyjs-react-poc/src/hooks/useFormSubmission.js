import { useState } from 'react';
import { formService } from '../services/formService';

/**
 * Custom hook to handle form submission
 * @returns {Object} { submitForm, isSubmitting, submittedData, error }
 */
export const useFormSubmission = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [error, setError] = useState(null);

  const submitForm = async (formId, data) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const result = await formService.submitForm(formId, data);
      setSubmittedData(result);
      setIsSubmitting(false);
      return result;
    } catch (err) {
      console.error('Error submitting form:', err);
      setError(err.message || 'Failed to submit form');
      setIsSubmitting(false);
      throw err;
    }
  };

  const clearSubmittedData = () => {
    setSubmittedData(null);
    setError(null);
  };

  return {
    submitForm,
    isSubmitting,
    submittedData,
    error,
    clearSubmittedData
  };
};

export default useFormSubmission;
