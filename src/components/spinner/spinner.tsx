import styles from './spinner.module.scss';
import React from 'react';

export const Spinner = () => {
  return (
    <div className={styles.spinnerWrapper}>
      <div className={styles.spinner} />
    </div>
  );
};
