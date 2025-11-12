import React from 'react';
import { useFormStore } from '../../store/formStore';
import { getFieldTypeIcon } from '../../utils/fieldTypes';
import styles from './FormCanvas.module.css';

export const CanvasField = ({ field, index, isSelected, onSelect }) => {
  const deleteField = useFormStore(state => state.deleteField);
  const moveFieldUp = useFormStore(state => state.moveFieldUp);
  const moveFieldDown = useFormStore(state => state.moveFieldDown);
  const currentPage = useFormStore(state =>
    state.form.pages[state.selectedPageIndex]
  );

  const isFirst = index === 0;
  const isLast = index === currentPage.elements.length - 1;

  return (
    <div
      className={`${styles.canvasField} ${isSelected ? styles.selected : ''}`}
      onClick={onSelect}
    >
      <div className={styles.fieldHeader}>
        <span className={styles.fieldIcon}>{getFieldTypeIcon(field.type)}</span>
        <span className={styles.fieldTitle}>{field.title.default}</span>
        <span className={styles.fieldType}>({field.type})</span>
      </div>

      <div className={styles.fieldActions}>
        <button
          className={styles.btnSmall}
          onClick={() => moveFieldUp(field.id)}
          disabled={isFirst}
          title="Move up"
        >
          ↑
        </button>
        <button
          className={styles.btnSmall}
          onClick={() => moveFieldDown(field.id)}
          disabled={isLast}
          title="Move down"
        >
          ↓
        </button>
        <button
          className={styles.btnDelete}
          onClick={() => deleteField(field.id)}
          title="Delete field"
        >
          ✕
        </button>
      </div>

      {field.isRequired && (
        <span className={styles.requiredBadge}>Required</span>
      )}
    </div>
  );
};

export default CanvasField;
