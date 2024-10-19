import React from 'react';
import styles from './index.module.scss';

export const MapInput = ({ setMapName }) => {
  return (
    <div className={styles.mapInputWrapper}>
      <input
        type={'text'}
        className={styles.mapInput}
        placeholder={'맵 검색 (별내림, ㅂㄴㄹ)'}
        maxLength={12}
        onChange={(event) => setMapName(event.target.value)}
      />
    </div>
  );
};
