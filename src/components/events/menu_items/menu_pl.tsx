import React, { useEffect, useState } from 'react';

import EventItem from './event_item/event_item';
import EventService from '~/services/event_service';

import styles from './menu_items.module.scss';

const PLEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    EventService.getPLEvents().then((data) => setEvents(data));
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

export default PLEvents;
