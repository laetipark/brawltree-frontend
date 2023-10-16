import React from 'react';
import { TimeRange } from '@nivo/calendar';

import config from '~/config/config';

import styles from './battle_summary.module.scss';
import { useTranslation } from 'react-i18next';

const UserBattleSummary = ({ battlesSummary, brawlersSummary, season }) => {
  const { t } = useTranslation();

  const colors = ['#9DC08B', '#609966', '#557153', '#40513B'];

  return (
    <div className={styles.battleSummaryWrapper}>
      <div>
        {battlesSummary && (
          <TimeRange
            data={battlesSummary[0] || [{ day: '2023-09-09', value: 0 }]}
            from={season?.beginDate?.slice(0, 10) || '2023-09-09'}
            to={season?.endDate?.slice(0, 10) || '2023-09-10'}
            width={320}
            height={200}
            emptyColor={'#DDDDDD'}
            align={'center'}
            minValue={1}
            maxValue={80}
            colors={colors}
            margin={{ top: 36, bottom: 16, left: 32 }}
            weekdayTicks={[1, 5]}
            weekdayLegendOffset={44}
            dayBorderWidth={2}
            dayBorderColor={'#EEEEEE'}
            tooltip={(n) => {
              const matchChange = battlesSummary[1].find(
                ({ day }) => day === n.day,
              ).value;
              return (
                <div className={styles.calendarLegend}>
                  <span>
                    {n.value} battles(
                    {matchChange > 0
                      ? `+${matchChange}`
                      : `${matchChange || 0}`}
                    )
                  </span>
                  <span className={styles.battleDate}>on {n.day}</span>
                </div>
              );
            }}
          />
        )}
      </div>
      {(brawlersSummary?.length || 0) > 0 && (
        <div className={styles.brawlerPicksWrapper}>
          {brawlersSummary?.map(
            ({ brawlerID, name, matchCount, pickRate, victoryRate }) => {
              return (
                <div key={brawlerID}>
                  <img
                    src={`${config.assets}/brawlers/pins/${brawlerID}.webp`}
                    alt={brawlerID}
                  />
                  <div className={styles.brawlerPicksContent}>
                    <div>{t(`brawler.brawler.${name}`)}</div>
                    <div>
                      <span>{matchCount}</span>
                      <span>{t('application.game')}</span>
                    </div>
                  </div>
                  <div className={styles.brawlerPicksContent}>
                    <div>Pick</div>
                    <div>{pickRate}%</div>
                  </div>
                  <div className={styles.brawlerPicksContent}>
                    <div>Win</div>
                    <div>{victoryRate}%</div>
                  </div>
                </div>
              );
            },
          )}
        </div>
      )}
    </div>
  );
};

export default UserBattleSummary;
