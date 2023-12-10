import React, { useEffect, useState } from 'react';

import EventItem from '~/components/events/list/item/event';
import EventService from '~/services/event.service';

import styles from './menu-items.module.scss';

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
