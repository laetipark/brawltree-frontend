import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { BrawlerSummaryItem } from '~/components/main/brawlers/content';

import styles from './index.module.scss';

export const BrawlerSummary = ({ brawlersTrophy, brawlersRanked }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.brawlersSummaryWrapper}>
      <Link to={'./brawler/shelly'}>
        <span>{t('main.brawlers')}</span>
      </Link>
      <div className={styles.brawlerSummaryTypeList}>
        <div>
          <span className={styles.brawlerSummaryTypeTitle}>{t('battle.type.trophy')}</span>
          <div className={styles.brawlerSummaryItems}>
            {brawlersTrophy &&
              brawlersTrophy?.map(
                ({
                   brawlerID,
                   brawlerName,
                   trophyPickRate,
                   trophyVictoryRate,
                 }, index) => {
                  return (
                    <BrawlerSummaryItem key={`trophy_${brawlerID}`}
                                        brawlerID={brawlerID}
                                        brawlerName={brawlerName}
                                        pickRate={trophyPickRate}
                                        victoryRate={trophyVictoryRate}
                                        index={index + 1} />
                  );
                },
              )}
          </div>
        </div>
        <div>
          <span className={styles.brawlerSummaryTypeTitle}>{t('battle.type.ranked')}</span>
          <div className={styles.brawlerSummaryItems}>
            {brawlersRanked &&
              brawlersRanked?.map(
                ({
                   brawlerID,
                   brawlerName,
                   rankedPickRate,
                   rankedVictoryRate,
                 }, index) => {
                  return (
                    <BrawlerSummaryItem key={`ranked_${brawlerID}`}
                                        brawlerID={brawlerID}
                                        brawlerName={brawlerName}
                                        pickRate={rankedPickRate}
                                        victoryRate={rankedVictoryRate}
                                        index={index + 1} />
                  );
                },
              )}
          </div>
        </div>
      </div>
    </div>
  );
};
