import { useState, useEffect } from 'react';
import { formService } from '../services/formService';

/**
 * Custom hook to load form schema by ID
 * @param {string} formId - The ID of the form to load
 * @returns {Object} { form, isLoading, error }
 */
export const useFormLoader = (formId) => {
  const [form, setForm] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!formId) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    formService
      .getFormById(formId)
      .then(form => {
        setForm(form);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Error loading form:', err);
        setError(err.message || 'Failed to load form');
        setIsLoading(false);
      });
  }, [formId]);

  return { form, isLoading, error };
};

export default useFormLoader;
