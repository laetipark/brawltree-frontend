import React, { useContext } from 'react';
import styles from './index.module.scss';
import { CdnContext } from '~/context/cdn.context';
import config from '~/common/config/config';

export const ModeFilter = ({ maps }) => {
  return (
    <div className={styles.modeFilterWrapper}>
      {Object.keys(maps).map((mode) => {
        const modeName = mode.split('_')[0];
        const locales = useContext(CdnContext);

        return maps[`${mode}`].length ? (
          <a key={modeName} href={`#${modeName}`}>
            <img src={`${config.assets}/modes/icon/${modeName}.webp`} alt={modeName} />
            <div>{locales.battle['mode'][`${modeName}`] || modeName}</div>
          </a>
        ) : null;
      })}
    </div>
  );
};
