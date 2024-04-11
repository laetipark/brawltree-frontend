import React, { useNavigate } from 'react-router-dom';

import styles from './index.module.scss';

export const CrewTableBody = ({ col, colArray, colImage, id }) => {
  const navigate = useNavigate();

  return (
    <div
      className={styles.bodyRow}
      onClick={() => {
        navigate(`../brawlian/${id.replace('#', '')}`);
      }}
    >
      <div>{col}</div>
      {colArray.map((col: string, index: number) => (
        <div key={`${index}`}>
          {colImage[index] !== null ? (
            <img src={colImage[index]} alt={col} />
          ) : null}
          {col}
        </div>
      ))}
    </div>
  );
};
