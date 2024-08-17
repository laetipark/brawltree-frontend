import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { BrawlerSummaryItem } from '~/components/main/brawlers/content';

import { CdnContext } from '~/context/cdn.context';

import styles from './index.module.scss';

export const BrawlerSummary = ({ brawlersTrophy, brawlersRanked }) => {
  const locales = useContext(CdnContext);

  return (
    <div className={styles.brawlersSummaryWrapper}>
      <Link to={'./brawler/shelly'}>
        <span>{locales.main['brawlers']}</span>
      </Link>
      <div className={styles.brawlerSummaryTypeList}>
        <div>
          <span className={styles.brawlerSummaryTypeTitle}>
            {locales.battle['type'].trophy} TOP 10
          </span>
          <div className={styles.brawlerSummaryItems}>
            {brawlersTrophy &&
              brawlersTrophy?.map(
                ({
                  brawlerID,
                  brawlerName,
                  trophyPickRate,
                  trophyVictoryRate,
                }) => {
                  return (
                    <BrawlerSummaryItem
                      key={`trophy_${brawlerID}`}
                      brawlerID={brawlerID}
                      brawlerName={brawlerName}
                      pickRate={trophyPickRate}
                      victoryRate={trophyVictoryRate}
                    />
                  );
                },
              )}
          </div>
        </div>
        <div>
          <span className={styles.brawlerSummaryTypeTitle}>
            {locales.battle['type'].ranked} TOP 10
          </span>
          <div className={styles.brawlerSummaryItems}>
            {brawlersRanked &&
              brawlersRanked?.map(
                ({
                  brawlerID,
                  brawlerName,
                  rankedPickRate,
                  rankedVictoryRate,
                }) => {
                  return (
                    <BrawlerSummaryItem
                      key={`ranked_${brawlerID}`}
                      brawlerID={brawlerID}
                      brawlerName={brawlerName}
                      pickRate={rankedPickRate}
                      victoryRate={rankedVictoryRate}
                    />
                  );
                },
              )}
          </div>
        </div>
      </div>
    </div>
  );
};
