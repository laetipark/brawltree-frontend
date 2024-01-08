import React from 'react';

import styles from './stats-summary.module.scss';
import config from '~/config/config';
import { useTranslation } from 'react-i18next';

const BrawlerStatsSummary = ({ brawler, brawlerStats }) => {
  const { t } = useTranslation();
  const filterBrawler = brawlerStats
    .filter(({ brawlerID }) => brawlerID === brawler.id)
    .slice(0, 10);

  return (
    <div className={styles.statsSummaryWrapper}>
      {filterBrawler.map(({ mapID, mapName, mode, pickRate, victoryRate }) => {
        return (
          <a
            key={mapID}
            className={styles.statsSummaryMapButton}
            href={`../maps/${mapID}`}
          >
            <img src={`${config.assets}/modes/icon/${mode}.webp`} alt={mode} />
            <span style={{ fontWeight: 600 }}>
              {t(`map.map.${mapID}`) || mapName}
            </span>
            <div>
              <span>Pick</span>
              <span style={{ fontWeight: 600 }}>{pickRate}</span>
              <span>%</span>
            </div>
            <div>
              <span>Win</span>
              <span style={{ fontWeight: 600 }}>{victoryRate}</span>
              <span>%</span>
            </div>
          </a>
        );
      })}
    </div>
  );
};

export default BrawlerStatsSummary;
