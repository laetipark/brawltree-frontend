import React, { useContext } from 'react';

import { CdnContext } from '~/context/cdn.context';

import config from '~/common/config/config';

import styles from './index.module.scss';

const MapStats = ({ brawlers }) => {
  const locales = useContext(CdnContext);

  return (
    <div className={styles.brawlerStatsWrapper}>
      {brawlers?.map(({ brawlerID, brawlerName, pickRate, victoryRate }) => {
        return (
          <a key={`${brawlerID}`} className={styles.brawlerStatsItem} href={`../brawler/${brawlerName.toLowerCase().replaceAll(' ', '')}`}>
            <div className={styles.brawlerTitle}>
              <img src={`${config.assets}/brawlers/pins/${brawlerID}.webp`} alt={'브롤러'} />
              <div>{locales.brawler['brawler'][`${brawlerName}`]}</div>
            </div>
            <div className={styles.brawlerContent}>
              <div>
                <span>Pick</span>
                <span className={styles.textRate}>{pickRate}%</span>
              </div>
              <div>
                <span>Win</span>
                <span className={styles.textRate}>{victoryRate}%</span>
              </div>
            </div>
          </a>
        );
      })}
    </div>
  );
};

export default MapStats;
