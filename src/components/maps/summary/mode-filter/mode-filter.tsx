import React from 'react';
import styles from './mode-filter.module.scss';
import config from '~/config/config';
import { useTranslation } from 'react-i18next';

export const ModeFilter = ({ maps }) => {
  return (
    <div className={styles.modeFilterWrapper}>
      {
        Object.keys(maps).map((mode) => {
          const modeName = mode.split('_')[0];
          const { t } = useTranslation();

          return (
            <a key={modeName} href={`#${modeName}`}>
              <img src={`${config.assets}/modes/icon/${modeName}.webp`} alt={modeName} />
              <div>{t(`battle.mode.${modeName}`)}</div>
            </a>
          );
        })
      }
    </div>
  );
};