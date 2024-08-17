import React, { useContext } from 'react';
import styles from './mode-filter.module.scss';
import { CdnContext } from '~/context/cdn.context';
import config from '~/config/config';

export const ModeFilter = ({ maps }) => {
  return (
    <div className={styles.modeFilterWrapper}>
      {Object.keys(maps).map((mode) => {
        const modeName = mode.split('_')[0];
        const locales = useContext(CdnContext);

        return (
          <a key={modeName} href={`#${modeName}`}>
            <img
              src={`${config.assets}/modes/icon/${modeName}.webp`}
              alt={modeName}
            />
            <div>{locales.battle['mode'][`${modeName}`]}</div>
          </a>
        );
      })}
    </div>
  );
};
