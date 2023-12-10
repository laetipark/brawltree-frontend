import React, { useEffect, useState } from 'react';

import BrawlerTotalStats from '~/components/brawler/summary/total-stats';
import BrawlerSelection from '~/components/brawler/summary/selection';
import BrawlerService from '~/services/brawler.service';

import styles from './brawlers.module.scss';
import BrawlerStatsSummary from '~/components/brawler/summary/stats-summary';

const Brawlers = () => {
  const [brawlers, setBrawlers] = useState([]);
  const [totalBrawlerStats, setBrawlerTotalStats] = useState([]);
  const [brawler, setBrawler] = useState({
    id: '16000000',
    name: 'SHELLY',
    rarity: 'Trophy Road',
    role: 'Damage Dealer',
    gender: 'Female',
  });
  const [brawlerStats, setBrawlerStats] = useState([]);

  useEffect(() => {
    BrawlerService.getBrawlers().then((data) => {
      setBrawlers(data.brawlers);
      setBrawlerTotalStats(data.totalStats);
      setBrawlerStats(data.stats);
    });
  }, []);

  return (
    brawlers && (
      <div className={styles.app}>
        <BrawlerSelection brawlers={brawlers} setBrawler={setBrawler} />
        <div>
          <BrawlerTotalStats
            brawler={brawler}
            brawlerStats={totalBrawlerStats}
          />
          <BrawlerStatsSummary brawler={brawler} brawlerStats={brawlerStats} />
        </div>
      </div>
    )
  );
};

export default Brawlers;
