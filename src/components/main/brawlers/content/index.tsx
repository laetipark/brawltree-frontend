import React, { useContext } from 'react';
import { CdnContext } from '~/context/cdn.context';

import config from '~/config/config';

import styles from './index.module.scss';

export const BrawlerSummaryItem = ({
  brawlerID,
  brawlerName,
  pickRate,
  victoryRate,
}) => {
  const locales = useContext(CdnContext);

  return (
    <a
      className={styles.brawlerSummaryItemWrapper}
      href={`./brawler/${brawlerName.toLowerCase()}`}
    >
      <div className={styles.brawlerSummaryItemName}>
        <img
          src={`${config.assets}/brawlers/pins/${brawlerID}.webp`}
          alt={brawlerID}
        />
        <div>
          <span>{locales.brawler['brawler'][`${brawlerName}`]}</span>
        </div>
      </div>
      <div className={styles.brawlerSummaryItemRate}>
        <div>
          <span>Pick</span>
          <span style={{ fontFamily: '"Main Bold", serif' }}>
            {Math.round(pickRate * 100) / 100}%
          </span>
        </div>
        <div>
          <span>Win</span>
          <span style={{ fontFamily: '"Main Bold", serif' }}>
            {Math.round(victoryRate * 100) / 100}%
          </span>
        </div>
      </div>
    </a>
  );
};
