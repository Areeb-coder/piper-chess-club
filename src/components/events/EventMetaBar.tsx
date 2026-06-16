import React from 'react';
import styles from './EventMetaBar.module.css';

interface EventMetaBarProps {
  format: string;
  timeControl: string;
  status?: string;
}

export const EventMetaBar = ({ format, timeControl, status }: EventMetaBarProps) => {
  return (
    <div className={`glass-panel ${styles.metaBar}`}>
      <div className={styles.item}>
        <span className={styles.label}>Format</span>
        <span className={styles.value}>{format}</span>
      </div>
      <div className={styles.item}>
        <span className={styles.label}>Time Control</span>
        <span className={styles.value}>{timeControl}</span>
      </div>
      {status && (
        <div className={styles.item}>
          <span className={styles.label}>Status</span>
          <span className={styles.value} style={{textTransform: 'capitalize'}}>{status}</span>
        </div>
      )}
    </div>
  );
};
