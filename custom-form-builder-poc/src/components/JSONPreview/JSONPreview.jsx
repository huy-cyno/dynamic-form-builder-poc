import React, { useState } from 'react';
import { useFormStore } from '../../store/formStore';
import styles from './JSONPreview.module.css';

export const JSONPreview = () => {
  const form = useFormStore(state => state.form);
  const [copied, setCopied] = useState(false);

  const formJSON = JSON.stringify(form, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(formJSON);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    element.setAttribute(
      'href',
      'data:text/plain;charset=utf-8,' + encodeURIComponent(formJSON)
    );
    element.setAttribute('download', 'form-schema.json');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Form JSON</h3>
        <div className={styles.actions}>
          <button
            className={styles.btnAction}
            onClick={handleCopy}
            title="Copy to clipboard"
          >
            {copied ? '✓ Copied!' : '📋 Copy'}
          </button>
          <button
            className={styles.btnAction}
            onClick={handleDownload}
            title="Download as JSON"
          >
            ⬇️ Download
          </button>
        </div>
      </div>

      <div className={styles.jsonBox}>
        <pre className={styles.json}>{formJSON}</pre>
      </div>

      <div className={styles.info}>
        <p>This JSON is compatible with SurveyJS and can be used in both Angular and React POCs.</p>
      </div>
    </div>
  );
};

export default JSONPreview;
