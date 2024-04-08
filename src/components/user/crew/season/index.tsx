import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UserSeasonDetail } from '~/components/user/crew/season/detail';

import { UserContext } from '~/context/user.context';

import styles from './index.module.scss';

export const UserSeasonRecords = () => {
  const { t } = useTranslation();
  const context = useContext(UserContext);
  const { seasonRecords } = context;

  const [trophyToggle, setTrophyToggle] = useState(false);
  const [rankedToggle, setRankedToggle] = useState(false);

  const matchCount =
    seasonRecords.length !== 0
      ? Math.round(
      seasonRecords.reduce((sum, value) => {
        return sum + (value.matchCount || 0);
      }, 0) * 100,
    ) / 100
      : 0;
  const totalMatchVicCount =
    seasonRecords.length !== 0
      ? Math.round(
      seasonRecords.reduce((sum, value) => {
        return sum + (value.victoriesCount || 0);
      }, 0) * 100,
    ) / 100
      : 0;
  const totalMatchDefCount =
    seasonRecords.length !== 0
      ? Math.round(
      seasonRecords.reduce((sum, value) => {
        return sum + (value.defeatsCount || 0);
      }, 0) * 100,
    ) / 100
      : 0;

  const trophyMatches = seasonRecords?.find((item) => {
    return item.matchType === 0;
  });

  const rankedMatches = seasonRecords?.find((item) => {
    return item.matchType === 2;
  });

  const drwCount = (matchCount: number, vicCount: number, defCount: number) => {
    return matchCount - (vicCount + defCount);
  };
  const vicRate = (vicCount: number, defCount: number) => {
    return Math.round((vicCount / (vicCount + defCount)) * 100) || 0;
  };

  return (
    <div className={styles.seasonWrapper}>
      <div>
        <h2>
          시즌 기록<span>({matchCount}회)</span>
        </h2>
        <h4 className={styles.seasonStatsSummary}>
          <div style={{ color: '#5AA469' }}>
            <span>
              {totalMatchVicCount}
            </span>
            <span>
              {t('battle.result.w')}
            </span>
          </div>
          <div style={{ color: '#556FB5' }}>
            <span>
              {drwCount(matchCount, totalMatchVicCount, totalMatchDefCount)}
            </span>
            <span>
              {t('battle.result.d')}
            </span>
          </div>
          <div style={{ color: '#D35D6E' }}>
            <span>
              {totalMatchDefCount}
            </span>
            <span>
              {t('battle.result.l')}
            </span>
          </div>
          <span style={{ fontWeight: 600 }}>
            ({vicRate(totalMatchVicCount, totalMatchDefCount)}%)
          </span>
        </h4>
      </div>
      <UserSeasonDetail matches={trophyMatches}
                        toggle={trophyToggle}
                        setToggle={setTrophyToggle}
                        type={'trophy'} />
      <UserSeasonDetail matches={rankedMatches}
                        toggle={rankedToggle}
                        setToggle={setRankedToggle}
                        type={'ranked'} />
    </div>
  );
};
