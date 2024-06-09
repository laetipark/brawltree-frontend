import React from 'react';
import styles from './index.module.scss';
import config from '~/config/config';
import { useTranslation } from 'react-i18next';

export const UserSeasonDetailItem = ({ items, hover }) => {
  const { t } = useTranslation();
  const drwCount = (matchCount: number, vicCount: number, defCount: number) => {
    return matchCount - (vicCount + defCount);
  };

  return (
    <div className={styles.seasonDetailItemWrapper}
         style={{ display: hover ? 'flex' : 'none' }}>
      {
        items.map(item => {
          return (
            <div key={`${item.mode}_${item.matchType}_${item.matchGrade}`}>
              <div>
                {item.matchType === 0 ? (
                  <img
                    className={styles.iconImage}
                    src={`${config.assets}/rank/trophy/grade/${item.matchGrade}.webp`}
                    alt={`trophy_${item.matchGrade}`}
                  />
                ) : [2, 3].includes(item.matchType) ? (
                  <img
                    className={styles.iconImage}
                    src={`${config.assets}/rank/ranked/${item.matchGrade}.webp`}
                    alt={`ranked_${item.matchGrade}`}
                  />
                ) : (
                  <img
                    className={styles.iconImage}
                    src={`${config.assets}/modes/icon/challenge.webp`}
                    alt={'챌린지'}
                  />
                )}
              </div>
              <div>
              <span>
                {item.matchCount}
              </span>
                <span>
                {t('battle.result.game')}
              </span>
              </div>
              <div style={{ color: '#5AA469' }}>
              <span>
                {item.victoriesCount}
              </span>
                <span>
                {t('battle.result.w')}
              </span>
              </div>
              <div style={{ color: '#556FB5' }}>
              <span>
                {drwCount(
                  item.matchCount,
                  item.victoriesCount,
                  item.defeatsCount,
                )}
              </span>
                <span>
                {t('battle.result.d')}
              </span>
              </div>
              <div style={{ color: '#D35D6E' }}>
              <span>
                {item.defeatsCount}
              </span>
                <span>
                {t('battle.result.l')}
              </span>
              </div>
              <div>
                (<span>
                  {
                    item.victoriesCount > 0
                      ? Math.round(
                        (item.victoriesCount / (item.victoriesCount + item.defeatsCount)) *
                        100)
                      : 0
                  }%)
                </span>
              </div>
            </div>
          );
        })
      }
    </div>
  );
};