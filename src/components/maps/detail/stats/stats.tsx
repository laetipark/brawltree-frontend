import axios from 'axios';
import React, { useState, useEffect } from 'react';

import config from '~/config/config';

import styles from './stats.module.scss';

const MapStats = ({ id, type, grade }) => {
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
