import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { formService } from '../../services/formService';
import { useLocale } from '../../hooks/useLocale';
import styles from './FormList.module.css';

export const FormList = () => {
  const navigate = useNavigate();
  const [forms, setForms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { locale, setLocale, getTranslation } = useLocale();

  const availableLocales = [
    { code: 'default', label: 'English' },
    { code: 'vi', label: 'Tiếng Việt' }
  ];

  useEffect(() => {
    loadForms();
  }, []);

  const loadForms = async () => {
    setIsLoading(true);
    try {
      const formsList = await formService.getFormsList();
      setForms(formsList);
    } catch (error) {
      console.error('Error loading forms:', error);
    }
    setIsLoading(false);
  };

  const handleOpenForm = (formId) => {
    navigate(`/form?id=${formId}`);
  };

  const handleSwitchLanguage = (localeCode) => {
    setLocale(localeCode);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logoSection}>
            <h1 className={styles.appTitle}>📋 Form Builder POC</h1>
            <p className={styles.subtitle}>SurveyJS with React</p>
          </div>
          <div className={styles.languageSwitcher}>
            <span className={styles.label}>Language:</span>
            <div className={styles.localeButtons}>
              {availableLocales.map(localeItem => (
                <button
                  key={localeItem.code}
                  className={`${styles.localeBtn} ${locale === localeItem.code ? styles.active : ''}`}
                  onClick={() => handleSwitchLanguage(localeItem.code)}
                >
                  {localeItem.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className={styles.mainContent}>
        <div className={styles.formsContainer}>
          <h2 className={styles.sectionTitle}>
            {locale === 'vi' ? 'Danh sách biểu mẫu' : 'Available Forms'}
          </h2>

          {isLoading && (
            <div className={styles.loadingMessage}>
              <div className={styles.spinner}></div>
              <p>{locale === 'vi' ? 'Đang tải...' : 'Loading...'}</p>
            </div>
          )}

          {!isLoading && forms.length === 0 && (
            <div className={styles.emptyMessage}>
              <p>{locale === 'vi' ? 'Không có biểu mẫu nào' : 'No forms available'}</p>
            </div>
          )}

          {!isLoading && forms.length > 0 && (
            <div className={styles.formsGrid}>
              {forms.map(form => (
                <div
                  key={form.id}
                  className={styles.formCard}
                  onClick={() => handleOpenForm(form.id)}
                >
                  <div className={styles.cardHeader}>
                    <span className={styles.formIcon}>📝</span>
                    <h3 className={styles.formTitle}>{getTranslation(form.title)}</h3>
                  </div>
                  <p className={styles.formDescription}>
                    {form.description ? getTranslation(form.description) : ''}
                  </p>
                  <div className={styles.cardFooter}>
                    <button className={styles.btnOpen}>
                      {locale === 'vi' ? 'Mở biểu mẫu' : 'Open Form'} →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <footer className={styles.footer}>
        <p>
          {locale === 'vi'
            ? 'Hệ thống xây dựng biểu mẫu động với SurveyJS và React'
            : 'Dynamic Form Builder System with SurveyJS and React'}
        </p>
      </footer>
    </div>
  );
};

export default FormList;
