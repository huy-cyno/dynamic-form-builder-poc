import { useState, useEffect } from 'react';
import { formService } from '../services/formService';

/**
 * Custom hook for managing application locale/language
 * @returns {Object} { locale, setLocale, getTranslation }
 */
export const useLocale = () => {
  const [locale, setLocaleState] = useState(formService.getCurrentLocale());

  useEffect(() => {
    // Subscribe to locale changes
    const unsubscribe = formService.onLocaleChange(newLocale => {
      setLocaleState(newLocale);
    });

    return unsubscribe;
  }, []);

  const setLocale = (newLocale) => {
    formService.setLocale(newLocale);
    setLocaleState(newLocale);
  };

  const getTranslation = (obj) => {
    return formService.getTranslation(obj, locale);
  };

  return { locale, setLocale, getTranslation };
};

export default useLocale;
