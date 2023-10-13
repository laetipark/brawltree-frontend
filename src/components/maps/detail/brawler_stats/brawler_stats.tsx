import axios from 'axios';
import React, { useState, useEffect } from 'react';

import config from '~/config/config';

import styles from './brawler_stats.module.scss';

const MapBrawlerStats = ({ id, type, grade }) => {
  const [brawlers, setBrawlers] = useState([]);

  useEffect(() => {
    axios
      .get(`${config.url}/maps/${id}/stats`, {
        params: {
          type: type,
          grade: grade,
        },
      })
      .then(async (result) => {
        setBrawlers(result.data);
      });
  }, [type, grade, id]);

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
                className={'profile-summary-image'}
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

export default MapBrawlerStats;
