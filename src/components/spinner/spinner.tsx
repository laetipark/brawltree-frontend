import styles from './spinner.module.scss';
import React from 'react';

export const Spinner = ({ fill = false }: { fill?: boolean }) => {
  return (
    <div className={`${styles.spinnerWrapper} ${fill ? styles.spinnerWrapperFill : ''}`} role={'status'} aria-live={'polite'} aria-busy={'true'}>
      <div className={styles.spinner}>
        <div className={styles.spinnerRingOuter} />
        <div className={styles.spinnerRingInner} />
      </div>
      <div className={styles.spinnerLabel}>Loading data...</div>
    </div>
  );
};
