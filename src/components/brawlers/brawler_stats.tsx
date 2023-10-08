import React from 'react';

import config from '~/config/config';

import styles from './brawler_stats.module.scss';

const BrawlerStats = ({ brawler, brawlerStats }) => {
  const brawlerTL = brawlerStats.find((item) => {
    return (
      item.BRAWLER_ID === brawler.BRAWLER_ID.toString() && item.MATCH_TYP === 0
    );
  });

  const brawlerPLSolo = brawlerStats.find((item) => {
    return (
      item.BRAWLER_ID === brawler.BRAWLER_ID.toString() && item.MATCH_TYP === 2
    );
  });

  const brawlerPLTeam = brawlerStats.find((item) => {
    return (
      item.BRAWLER_ID === brawler.BRAWLER_ID.toString() && item.MATCH_TYP === 3
    );
  });

  return (
    <div className={styles.brawlerStatsWrapper}>
      <div className={styles.brawlerTitle}>
        <img
          src={`${config.assets}/brawlers/profiles/${brawler.BRAWLER_ID}.webp`}
          alt={brawler.BRAWLER_ID}
        />
        <div>
          <h3>{brawler.BRAWLER_NM}</h3>
          <span>
            {brawler.BRAWLER_RRT}-{brawler.BRAWLER_CL}
          </span>
        </div>
      </div>
      <div className={styles.brawlerContent}>
        <div>
          <div>
            <img
              src={`${config.assets}/modes/icon/trophyLeague.webp`}
              alt={'트로피'}
            />
            <div>
              <div className={styles.rateTitle}>트로피 리그 픽률</div>
              <div className={styles.rateContent}>
                <span>
                  {Math.round(brawlerTL?.MATCH_CNT_RATE * 100) / 100.0}
                </span>
                <span>%</span>
              </div>
            </div>
          </div>
          <div>
            <img
              src={`${config.assets}/modes/icon/trophyLeague.webp`}
              alt={'트로피'}
            />
            <div>
              <div className={styles.rateTitle}>트로피 리그 승률</div>
              <div className={styles.rateContent}>
                <span>
                  {Math.round(brawlerTL?.MATCH_CNT_VIC_RATE * 100) / 100.0}
                </span>
                <span>%</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            <img
              src={`${config.assets}/modes/icon/powerLeague.webp`}
              alt={'powerLeague'}
            />
            <div>
              <div className={styles.rateTitle}>파워 리그 픽률</div>
              <div className={styles.rateContent}>
                <span>
                  {Math.round(brawlerPLSolo?.MATCH_CNT_RATE * 100) / 100.0}
                </span>
                <span>%</span>
                <span>/</span>
                <span>
                  {Math.round(brawlerPLTeam?.MATCH_CNT_RATE * 100) / 100.0}
                </span>
                <span>%</span>
              </div>
            </div>
          </div>
          <div>
            <img
              src={`${config.assets}/modes/icon/powerLeague.webp`}
              alt={'powerLeague'}
            />
            <div>
              <div className={styles.rateTitle}>파워 리그 승률</div>
              <div className={styles.rateContent}>
                <span>
                  {Math.round(brawlerPLSolo?.MATCH_CNT_VIC_RATE * 100) / 100.0}
                </span>
                <span>%</span>
                <span>/</span>
                <span>
                  {Math.round(brawlerPLTeam?.MATCH_CNT_VIC_RATE * 100) / 100.0}
                </span>
                <span>%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrawlerStats;
