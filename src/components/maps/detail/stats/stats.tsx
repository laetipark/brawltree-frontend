import React from 'react';

import config from '~/config/config';

import styles from './stats.module.scss';

const MapStats = ({brawlers}) => {

  return (
    <div className={styles.brawlerStatsWrapper}>
      {brawlers?.map((brawler) => {
        return (
          <div
            key={`${brawler.BRAWLER_ID}`}
            className={styles.brawlerStatsItem}
          >
            <div className={styles.brawlerTitle}>
              <img
                src={`${config.assets}/brawlers/pins/${brawler.BRAWLER_ID}.webp`}
                alt={'브롤러'}
              />
              <div>{brawler.BRAWLER_NM}</div>
            </div>
            <div className={styles.brawlerContent}>
              <div>
                <span>픽률</span>
                <span className={styles.textRate}>{brawler.MATCH_P_RATE}%</span>
              </div>
              <div>
                <span>승률</span>
                <span className={styles.textRate}>
                  {brawler.MATCH_VIC_RATE}%
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MapStats;
