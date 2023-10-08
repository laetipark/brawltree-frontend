import axios from 'axios';
import React, { useState, useEffect } from 'react';

import EventItem from './event_item/event_item';

import config from '~/config/config';

import styles from './menu_items.module.scss';
import { Events } from '~/interfaces/type/events';

const TLCurrentEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get(`${config.url}/events/tl/curr`).then(async (result) => {
      setEvents(result.data);
    });
  }, []);

  return (
    (events?.length || 0 > 0) && (
      <div className={styles.eventsWrapper}>
        {events.map((event: Events) => {
          return <EventItem key={event.MAP_ID} event={event} type={'end'} />;
        })}
      </div>
    )
  );
};

export default TLCurrentEvents;
