import React from 'react';
import { TimeRange } from '@nivo/calendar';

import config from '~/config/config';

import styles from './battle_summary.module.scss';

const UserBattleSummary = ({ battlesSummary, brawlersSummary, season }) => {
  const colors = ['#9DC08B', '#609966', '#557153', '#40513B'];

  return (
    <div className={styles.battleSummaryWrapper}>
      <div>
        {battlesSummary && (
          <TimeRange
            data={battlesSummary[0]}
            from={season.SEASON_BGN_DT?.slice(0, 10) || '2023-09-09'}
            to={season.SEASON_END_DT?.slice(0, 10) || '2023-09-09'}
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
            ({
              BRAWLER_ID,
              BRAWLER_NM,
              MATCH_CNT,
              MATCH_PCK_R,
              MATCH_VIC_R,
            }) => {
              return (
                <div key={BRAWLER_ID}>
                  <img
                    src={`${config.assets}/brawlers/pins/${BRAWLER_ID}.webp`}
                    alt={'브롤러 프로필'}
                  />
                  <div className={styles.brawlerPicksContent}>
                    <div>{BRAWLER_NM}</div>
                    <div>{MATCH_CNT} 게임</div>
                  </div>
                  <div className={styles.brawlerPicksContent}>
                    <div>Pick</div>
                    <div>{MATCH_PCK_R}%</div>
                  </div>
                  <div className={styles.brawlerPicksContent}>
                    <div>Win</div>
                    <div>{MATCH_VIC_R}%</div>
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
