import React, { useContext } from 'react';
import { TimeRange } from '@nivo/calendar';

import { CdnContext } from '~/context/cdn.context';

import config from '~/config/config';
import styles from './index.module.scss';

export const UserBattleStats = ({
  battlesSummary,
  brawlersSummary,
  season,
}) => {
  const locales = useContext(CdnContext);
  const colors = ['#9DC08B', '#609966', '#557153', '#40513B'];
  const beginDate = new Date(
    new Date(season?.beginDate).getTime() - 1000 * 60 * 60 * 24,
  );
  const fromDateYear = beginDate.getFullYear();
  const fromDateMonth = ('0' + (beginDate.getMonth() + 1)).slice(-2);
  const fromDateDay = ('0' + beginDate.getDate()).slice(-2);

  const fromDate = `${fromDateYear}-${fromDateMonth}-${fromDateDay}`;

  return (
    <div className={styles.battleSummaryWrapper}>
      <div>
        {battlesSummary && (
          <TimeRange
            data={battlesSummary[0] || [{ day: '2023-09-09', value: 0 }]}
            from={fromDate || '2023-09-09'}
            to={season?.endDate?.slice(0, 10) || '2023-09-10'}
            width={340}
            height={260}
            emptyColor={'#DDDDDD'}
            align={'center'}
            minValue={1}
            maxValue={80}
            colors={colors}
            margin={{ top: 36, bottom: 16, left: 48 }}
            weekdayTicks={[0, 1, 2, 3, 4, 5, 6]}
            weekdayLegendOffset={68}
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
                    <div>{locales.brawler['brawler'][`${name}`]}</div>
                    <div>
                      <span>{matchCount}</span>
                      <span>{locales.application['game']}</span>
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
