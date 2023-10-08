import React from 'react';
import { Link } from 'react-router-dom';

import config from '~/config/config';

import styles from './brawlers.module.scss';

const BrawlerSummary = ({ brawlersTL, brawlersPL }) => {
  return (
    <div className={styles.brawlersSummaryWrapper}>
      <Link to={'/brawler'}>
        <span>브롤러</span>
      </Link>
      <div className={styles.brawlersTypeMenu}>
        <div>
          <span className={styles.brawlersTypeMenuTitle}>트로피 리그</span>
          <div className={styles.brawlerItem}>
            {brawlersTL &&
              brawlersTL?.map((brawler) => {
                return (
                  <div key={brawler.BRAWLER_ID}>
                    <img
                      src={`${config.assets}/brawlers/pins/${brawler.BRAWLER_ID}.webp`}
                      alt={brawler.BRAWLER_ID}
                    />
                    <div>
                      <div>
                        <span>픽률</span>
                        <span style={{ fontFamily: '"Main Bold", serif' }}>
                          {Math.round(brawler.MATCH_CNT_TL_RATE * 100) / 100}%
                        </span>
                      </div>
                      <div>
                        <span>승률</span>
                        <span style={{ fontFamily: '"Main Bold", serif' }}>
                          {Math.round(brawler.MATCH_CNT_VIC_TL_RATE * 100) /
                            100}
                          %
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <div>
          <span className={styles.brawlersTypeMenuTitle}>파워 리그</span>
          <div className={styles.brawlerItem}>
            {brawlersPL &&
              brawlersPL?.map((brawler) => {
                return (
                  <div key={brawler.BRAWLER_ID}>
                    <img
                      src={`${config.assets}/brawlers/pins/${brawler.BRAWLER_ID}.webp`}
                      alt={brawler.BRAWLER_ID}
                    />
                    <div>
                      <div>
                        <span>픽률</span>
                        <span style={{ fontFamily: '"Main Bold", serif' }}>
                          {Math.round(brawler.MATCH_CNT_PL_RATE * 100) / 100}%
                        </span>
                      </div>
                      <div>
                        <span>승률</span>
                        <span style={{ fontFamily: '"Main Bold", serif' }}>
                          {Math.round(brawler.MATCH_CNT_VIC_PL_RATE * 100) /
                            100}
                          %
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrawlerSummary;
