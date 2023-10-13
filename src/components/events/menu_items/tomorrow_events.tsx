import axios from 'axios';
import React, { useEffect, useState } from 'react';

import EventItem from '~/components/events/menu_items/event_item/event_item';

import config from '~/config/config';

import styles from './menu_items.module.scss';

const PowerLeagueEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get(`${config.url}/events/tl/tomm`).then(async (result) => {
      setEvents(result.data);
    });
  }, []);

  return (
    (events?.length || 0 > 0) && (
      <div className={styles.eventsWrapper}>
        {events.map((event) => {
          return <EventItem key={event.mapID} event={event} type={'begin'} />;
        })}
      </div>
    )
  );
};

export default PowerLeagueEvents;
