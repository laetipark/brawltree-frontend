import React, { useNavigate } from 'react-router-dom';

import styles from './body.module.scss';

const TableBody = ({ col, colArray, colImage, id }) => {
  const navigate = useNavigate();

  return (
    <div
      className={styles.bodyRow}
      onClick={() => {
        navigate(`../blossom/members/${id.replace('#', '')}`);
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

export default TableBody;
