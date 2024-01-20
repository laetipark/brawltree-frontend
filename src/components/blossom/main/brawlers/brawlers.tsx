import React from 'react';
import { Link } from 'react-router-dom';

import config from '~/config/config';

import styles from './brawlers.module.scss';

const BrawlerSummary = ({ brawlersTL, brawlersPL }) => {
  return (
    <div className={styles.brawlersSummaryWrapper}>
      <Link to={'./brawlers'}>
        <span>브롤러</span>
      </Link>
      <div className={styles.brawlersTypeMenu}>
        <div>
          <span className={styles.brawlersTypeMenuTitle}>트로피 리그</span>
          <div className={styles.brawlerItem}>
            {brawlersTL &&
              brawlersTL?.map(
                ({
                   brawlerID,
                   trophyLeaguePickRate,
                   trophyLeagueVictoryRate,
                 }) => {
                  return (
                    <div key={brawlerID}>
                      <img
                        src={`${config.assets}/brawlers/pins/${brawlerID}.webp`}
                        alt={brawlerID}
                      />
                      <div>
                        <div>
                          <span>픽률</span>
                          <span style={{ fontFamily: '"Main Bold", serif' }}>
                            {Math.round(trophyLeaguePickRate * 100) / 100}%
                          </span>
                        </div>
                        <div>
                          <span>승률</span>
                          <span style={{ fontFamily: '"Main Bold", serif' }}>
                            {Math.round(trophyLeagueVictoryRate * 100) / 100}%
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                },
              )}
          </div>
        </div>
        <div>
          <span className={styles.brawlersTypeMenuTitle}>파워 리그</span>
          <div className={styles.brawlerItem}>
            {brawlersPL &&
              brawlersPL?.map(
                ({
                   brawlerID,
                   powerLeaguePickRate,
                   powerLeagueVictoryRate,
                 }) => {
                  return (
                    <div key={brawlerID}>
                      <img
                        src={`${config.assets}/brawlers/pins/${brawlerID}.webp`}
                        alt={brawlerID}
                      />
                      <div>
                        <div>
                          <span>픽률</span>
                          <span style={{ fontFamily: '"Main Bold", serif' }}>
                            {Math.round(powerLeaguePickRate * 100) / 100}%
                          </span>
                        </div>
                        <div>
                          <span>승률</span>
                          <span style={{ fontFamily: '"Main Bold", serif' }}>
                            {Math.round(powerLeagueVictoryRate * 100) / 100}%
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                },
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrawlerSummary;
