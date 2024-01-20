import React, { useEffect, useState } from 'react';

import EventItem from '~/components/events/list/item/event';
import EventService from '~/services/event.service';

import styles from './menu-items.module.scss';
import { Spinner } from '~/components/spinner/spinner';

export const TLTomorrowEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    EventService.getTLTomorrowEvents().then((data) => setEvents(data));
  }, []);

  return (
    (events?.length || 0 > 0) ? (
      <div className={styles.eventsWrapper}>
        {events.map((event) => {
          return <EventItem key={event.mapID} event={event} type={'begin'} />;
        })}
      </div>
    ) : <Spinner />
  );
};