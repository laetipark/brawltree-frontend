import React, { useState, useEffect } from 'react';

import EventItem from './event_item/event_item';
import EventService from '~/services/event_service';

import styles from './menu_items.module.scss';

const TLCurrentEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    EventService.getTLCurrentEvents().then((data) => setEvents(data));
  }, []);

  return (
    (events?.length || 0 > 0) && (
      <div className={styles.eventsWrapper}>
        {events.map((event) => {
          return <EventItem key={event.mapID} event={event} type={'end'} />;
        })}
      </div>
    )
  );
};

export default TLCurrentEvents;
