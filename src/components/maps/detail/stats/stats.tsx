import React from 'react';

import config from '~/config/config';

import styles from './stats.module.scss';

const MapStats = ({brawlers}) => {

  return (
    <div className={styles.brawlerStatsWrapper}>
      {brawlers?.map((brawler) => {
        return (
          <div
            key={`${brawler.brawlerID}`}
            className={styles.brawlerStatsItem}
          >
            <div className={styles.brawlerTitle}>
              <img
                src={`${config.assets}/brawlers/pins/${brawler.brawlerID}.webp`}
                alt={'브롤러'}
              />
              <div>{brawler.name}</div>
            </div>
            <div className={styles.brawlerContent}>
              <div>
                <span>픽률</span>
                <span className={styles.textRate}>{brawler.pickRate}%</span>
              </div>
              <div>
                <span>승률</span>
                <span className={styles.textRate}>
                  {brawler.victoryRate}%
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
