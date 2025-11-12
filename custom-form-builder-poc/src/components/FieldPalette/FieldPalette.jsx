import React from 'react';
import { useDrag } from 'react-dnd';
import { FIELD_TYPES, FIELD_TEMPLATES, getFieldTypeLabel, getFieldTypeIcon } from '../../utils/fieldTypes';
import { useFormStore } from '../../store/formStore';
import styles from './FieldPalette.module.css';

const DraggableFieldType = ({ type }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'field',
    item: { fieldType: type },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  }));

  return (
    <div
      ref={drag}
      className={`${styles.fieldType} ${isDragging ? styles.dragging : ''}`}
      title={`Drag to add ${getFieldTypeLabel(type)}`}
    >
      <span className={styles.icon}>{getFieldTypeIcon(type)}</span>
      <span className={styles.label}>{getFieldTypeLabel(type)}</span>
    </div>
  );
};

export const FieldPalette = () => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Field Types</h3>
      <p className={styles.subtitle}>Drag fields to canvas</p>

      <div className={styles.fieldList}>
        {Object.values(FIELD_TYPES).map(fieldType => (
          <DraggableFieldType key={fieldType} type={fieldType} />
        ))}
      </div>

      <div className={styles.info}>
        <h4>Quick Help</h4>
        <ul>
          <li>Drag field types to the canvas</li>
          <li>Click fields to edit properties</li>
          <li>Use the right panel to customize</li>
          <li>Export JSON when ready</li>
        </ul>
      </div>
    </div>
  );
};

export default FieldPalette;
