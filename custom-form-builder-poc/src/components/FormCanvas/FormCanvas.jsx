import React from 'react';
import { useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';
import { FIELD_TEMPLATES } from '../../utils/fieldTypes';
import { useFormStore } from '../../store/formStore';
import CanvasField from './CanvasField';
import styles from './FormCanvas.module.css';

export const FormCanvas = () => {
  const form = useFormStore(state => state.form);
  const selectedPageIndex = useFormStore(state => state.selectedPageIndex);
  const selectedFieldId = useFormStore(state => state.selectedFieldId);
  const addField = useFormStore(state => state.addField);
  const setSelectedFieldId = useFormStore(state => state.setSelectedFieldId);

  const currentPage = form.pages[selectedPageIndex];

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'field',
    drop: (item) => {
      const fieldType = item.fieldType;
      const template = FIELD_TEMPLATES[fieldType];
      const newField = {
        ...template,
        id: uuidv4(),
        name: `${fieldType}_${uuidv4().slice(0, 8)}`
      };
      addField(newField);
    },
    collect: monitor => ({
      isOver: monitor.isOver()
    })
  }));

  return (
    <div
      ref={drop}
      className={`${styles.container} ${isOver ? styles.over : ''}`}
    >
      <div className={styles.header}>
        <h2 className={styles.title}>Form Canvas</h2>
        <p className={styles.pageInfo}>
          Page {selectedPageIndex + 1}: {currentPage.title.default}
        </p>
      </div>

      <div className={styles.canvas}>
        {currentPage.elements.length === 0 ? (
          <div className={styles.emptyState}>
            <span className={styles.emptyIcon}>📋</span>
            <p>Drag fields here to build your form</p>
          </div>
        ) : (
          <div className={styles.fieldsList}>
            {currentPage.elements.map((field, index) => (
              <CanvasField
                key={field.id}
                field={field}
                index={index}
                isSelected={field.id === selectedFieldId}
                onSelect={() => setSelectedFieldId(field.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FormCanvas;
