import React, { useEffect, useState } from 'react';
import { EventService } from '~/services/event.service';

import { Spinner } from '~/components/spinner/spinner';
import { EventSummaryContainer } from '~/components/maps/event-summary';

export const TrophyCurrentEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    EventService.getTLCurrentEvents().then((data) => setEvents(data));
  }, []);

  return events?.length || 0 > 0 ? <EventSummaryContainer events={events} type={'curr'} /> : <Spinner />;
};
