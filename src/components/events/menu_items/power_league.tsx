import axios from 'axios';
import React, { useEffect, useState } from 'react';

import config from '~/config/config';

import styles from '~/components/events/menu_items/menu_items.module.scss';
import EventItem from '~/components/events/menu_items/event_item/event_item';

const TomorrowEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get(`${config.url}/events/pl`).then(async (result) => {
      setEvents(result.data);
    });
  }, []);

  return (
    (events?.length || 0 > 0) && (
      <div className={styles.eventsWrapper}>
        {events.map((event) => {
          return <EventItem key={event.MAP_ID} event={event} type={null} />;
        })}
      </div>
    )
  );
};

export default TomorrowEvents;
