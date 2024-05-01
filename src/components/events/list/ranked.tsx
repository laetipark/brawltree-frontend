import React, { useEffect, useState } from 'react';
import { EventService } from '~/services/event.service';
import { EventItems } from '~/components/maps/item';
import { Spinner } from '~/components/spinner/spinner';

export const RankedEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    EventService.getPLEvents().then((data) => setEvents(data));
  }, []);
  return (
    (events?.length || 0 > 0) ? (
      <EventItems events={events} type={'ranked'} />
    ) : <Spinner />
  );
};
