import React from 'react';
import styles from './index.module.scss';

export const CrewTableHead = ({ col, colArray }) => {
  return (
    <div className={styles.head}>
      <div className={styles.headRow}>
        <div>{col}</div>
        {colArray.map((col, index) => (
          <div
            className={colArray.length === index + 1 ? styles.lastColumn : ''}
            key={index}
          >
            {col}
          </div>
        ))}
      </div>
    </div>
  );
};