import React, { useEffect, useState } from 'react';

import BrawlerTotalStats from '~/components/brawler/summary/total-stats';
import { BrawlerSelection } from '~/components/brawler/summary/selection';
import BrawlerService from '~/services/brawler.service';

import styles from './brawlers.module.scss';
import BrawlerStatsSummary from '~/components/brawler/summary/stats-summary';
import { Spinner } from '~/components/spinner/spinner';
import { useParams } from 'react-router-dom';

const Brawlers = () => {
  const { name } = useParams();
  const [brawlers, setBrawlers] = useState([]);
  const [totalBrawlerStats, setBrawlerTotalStats] = useState([]);
  const [brawler, setBrawler] = useState();
  const [brawlerStats, setBrawlerStats] = useState([]);

  useEffect(() => {
    BrawlerService.getBrawlers().then((data) => {
      setBrawlers(data.brawlers);
      setBrawlerTotalStats(data.totalStats);
      setBrawlerStats(data.stats);
    });
  }, []);

  useEffect(() => {
    const brawlerByName = brawlers.find(brawler =>
      brawler.name
        .toLowerCase()
        .replaceAll(' ', '')
      === name);
    setBrawler(brawlerByName || {
      id: '16000000',
      name: 'SHELLY',
      rarity: 'Trophy Road',
      role: 'Damage Dealer',
      gender: 'Female',
    });
  }, [name, brawlers]);

  return (
    brawlers.length > 0 ? (
      <div className={styles.app}>
        <BrawlerSelection brawlers={brawlers}
                          brawler={brawler}
                          setBrawler={setBrawler} />
        <div>
          <BrawlerTotalStats
            brawler={brawler}
            brawlerStats={totalBrawlerStats}
          />
          <BrawlerStatsSummary brawler={brawler} brawlerStats={brawlerStats} />
        </div>
      </div>
    ) : <Spinner />
  );
};

export default Brawlers;
