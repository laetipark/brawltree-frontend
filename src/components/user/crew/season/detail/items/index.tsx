import React from 'react';
import { useTranslation } from 'react-i18next';

import config from '~/config/config';

import styles from './index.module.scss';

export const UserSeasonDetailItems = ({ record, type }) => {
  const { t } = useTranslation();
  const drwCount = (matchCount: number, vicCount: number, defCount: number) => {
    return matchCount - (vicCount + defCount);
  };
  const vicRate = (vicCount: number, defCount: number) => {
    return Math.round((vicCount / (vicCount + defCount)) * 100) || 0;
  };

  return (
    <div className={styles.seasonDetailItemWrapper}>
      <img
        className={styles.modeImage}
        src={`${config.assets}/modes/icon/${record.mode}.webp`}
        alt={'게임모드'}
      />
      <div>
        <div style={{ fontFamily: '"Main Bold", serif' }}
             className={styles.seasonStatsSummary}>
          <div>
            <span>
              {record.matchCount}
            </span>
            <span>
              {t('battle.result.game')}
            </span>
          </div>
          <div style={{ color: '#5AA469' }}>
            <span>
              {record.victoriesCount}
            </span>
            <span>
              {t('battle.result.w')}
            </span>
          </div>
          <div style={{ color: '#556FB5' }}>
            <span>
              {drwCount(
                record.matchCount,
                record.victoriesCount,
                record.defeatsCount,
              )}
            </span>
            <span>
              {t('battle.result.d')}
            </span>
          </div>
          <div style={{ color: '#D35D6E', fontWeight: 600 }}>
            <span>
              {record.defeatsCount}
            </span>
            <span>
              {t('battle.result.l')}
            </span>
          </div>
        </div>
        <div className={styles.seasonStatsSummary}>
          <img
            className={styles.rankImage}
            src={`${config.assets}/rank/${
              type === 'trophy'
                ? `trophy_league/grade/${record.matchGrade}`
                : `power_league/${Math.floor(
                  (record.matchGrade - 1) / 3,
                )}`
            }.webp`}
            alt={'rank'}
          />
          <span>Win</span>
          <span style={{ fontWeight: 600 }}>
                          {vicRate(
                            record.victoriesCount,
                            record.defeatsCount,
                          )}%
                        </span>
        </div>
      </div>
    </div>
  );
};