import React, { useEffect, useState } from 'react';
import { EventService } from '~/services/event.service';

import { Spinner } from '~/components/spinner/spinner';
import { EventItems } from '~/components/maps/item';

export const TrophyTomorrowEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    EventService.getTLTomorrowEvents().then((data) => setEvents(data));
  }, []);

  return (
    (events?.length || 0 > 0) ? (
      <EventItems events={events}
                  type={'next'} />
    ) : <Spinner />
  );
};