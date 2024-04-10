import React from 'react';

import styles from './index.module.scss';

export const TableHead = ({ headRowContent }) => {
  return (
    <div className={styles.headWrapper}>
      <div>{headRowContent}</div>
    </div>
  );
};