import React from 'react';
import { useTranslation } from 'react-i18next';

import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { UserSeasonDetailItems } from './items';

import { UserSeasonType } from '~/common/type/users.type';
import styles from './index.module.scss';

export const UserSeasonDetail = ({ matches, toggle, setToggle, type }) => {
  const { t } = useTranslation();
  const drwCount = (matchCount: number, vicCount: number, defCount: number) => {
    return matchCount - (vicCount + defCount);
  };
  const vicRate = (vicCount: number, defCount: number) => {
    return Math.round((vicCount / (vicCount + defCount)) * 100) || 0;
  };

  return (
    matches !== undefined &&
    matches.matchList.length > 0 && (
      <React.Fragment>
        <h3 className={styles.seasonStatsToggle}
            onClick={() => setToggle(!toggle)}>
          <FontAwesomeIcon
            icon={faAngleRight}
            style={{
              padding: '2px',
              transform: toggle ? 'rotate(90deg)' : '',
              transition: 'transform 0.3s ease',
            }}
          />
          <span>{t(`battle.type.${type}`)}</span>
        </h3>
        {toggle && (
          <div>
            <h4 className={styles.seasonStatsSummary}>
              <div style={{ color: '#5AA469' }}>
                <span>
                  {matches.victoriesCount}
                </span>
                <span>
                  {t('battle.result.w')}
                </span>
              </div>
              <div style={{ color: '#556FB5' }}>
                <span>
                  {drwCount(
                    matches.matchCount,
                    matches.victoriesCount,
                    matches.defeatsCount,
                  )}
                </span>
                <span>
                  {t('battle.result.d')}
                </span>
              </div>
              <div style={{ color: '#D35D6E' }}>
                <span>
                  {matches.defeatsCount}
                </span>
                <span>
                  {t('battle.result.l')}
                </span>
              </div>
              <span>
                ({vicRate(matches.victoriesCount, matches.defeatsCount)}%)
              </span>
            </h4>
            <div className={styles.matchList}>
              {matches?.matchList?.map((record: UserSeasonType) => {
                return (
                  <UserSeasonDetailItems key={`${record.mode}_${record.matchType}_${record.matchGrade}`}
                                         record={record}
                                         type={type} />
                );
              })}
            </div>
          </div>
        )}
      </React.Fragment>
    )
  );
};