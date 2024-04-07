import axios from 'axios';
import React, { useEffect, useState } from 'react';

import MemberSummary from '~/components/blossom/main/members/members';
import BrawlerSummary from '~/components/blossom/main/brawlers/brawlers';
import BattleSummary from '~/components/blossom/main/battles/battles';
import SeasonSummary from '~/components/blossom/main/season/season';
import { EventsSummary } from '~/components/main/events';
import { Spinner } from '~/components/spinner/spinner';

import { EventService } from '~/services/event.service';

import config from '~/config/config';
import styles from './main.module.scss';

export const BlossomMain = () => {
  const [members, setMembers] = useState({
    memberCount: 0,
    currentTotalTrophies: 0,
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
    });
  }, []);

  useEffect(() => {
    EventService.getTLCurrentEvents()
      .then((data) => setEvents(data));
  }, []);

  return (
    members.memberCount > 0 ? (
      <div className={styles.app}>
        <MemberSummary members={members} />
        <div className={styles.summaryWrapper}>
          <BattleSummary battles={battles} />
          <SeasonSummary season={season} />
        </div>
        <EventsSummary events={events} />
        <BrawlerSummary brawlersTL={brawlersTL} brawlersPL={brawlersPL} />
      </div>
    ) : <Spinner />
  );
};