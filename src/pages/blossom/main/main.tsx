import React, { useEffect, useState } from 'react';

import MemberSummary from '~/components/blossom/main/members/members';
import BrawlerSummary from '~/components/blossom/main/brawlers/brawlers';
import BattleSummary from '~/components/blossom/main/battles/battles';
import EventsSummary from '~/components/blossom/main/events/events';
import SeasonSummary from '~/components/blossom/main/season/season';

import styles from './main.module.scss';
import axios from 'axios';
import config from '~/config/config';

const Main = () => {
  const [members, setMembers] = useState({
    MEMBER_CNT: '0',
    currentTrophies_TOT: '0',
  });
  const [battles, setBattles] = useState({ matchCount: '0' });
  const [season, setSeason] = useState({ matchCount: '0' });
  const [events, setEvents] = useState([]);
  const [brawlersTL, setBrawlersTL] = useState([]);
  const [brawlersPL, setBrawlersPL] = useState([]);

  useEffect(() => {
    axios.get(`${config.url}/blossom/main`).then(async (result) => {
      setMembers(result.data.members);
      setBattles(result.data.battles);
      setSeason(result.data.season);
      setBrawlersTL(result.data.brawlersTL);
      setBrawlersPL(result.data.brawlersPL);
      setEvents(result.data.events);
    });
  }, []);

  return (
    members.MEMBER_CNT && (
      <div className={styles.app}>
        <MemberSummary members={members} />
        <div className={styles.summaryWrapper}>
          <BattleSummary battles={battles} />
          <SeasonSummary season={season} />
        </div>
        <EventsSummary events={events} />
        <BrawlerSummary brawlersTL={brawlersTL} brawlersPL={brawlersPL} />
      </div>
    )
  );
};

export default Main;
