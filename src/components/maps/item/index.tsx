import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { EventItem } from '~/components/maps/item/content';

import { RotationType } from '~/common/type/maps.type';

import { CdnContext } from '~/context/cdn.context';

import styles from './index.module.scss';

export const EventItems = ({ events, type }) => {
  const locales = useContext(CdnContext);

  return (
    <div className={styles.eventsSummaryWrapper}>
      <Link
        to={`/events/${['ranked', 'curr', 'next'].includes(type) ? type : 'curr'}`}
      >
        <span>
          {type === 'ranked'
            ? locales.map['event'].ranked
            : type === 'curr'
              ? locales.map['event'].current
              : type === 'next'
                ? locales.map['event'].tomorrow
                : locales.battle['mode'][`${type}`]}
        </span>
      </Link>
      <div className={styles.eventItem}>
        {(events.length || 0) > 0 &&
          events.map((event: RotationType) => {
            return <EventItem key={event.mapID} event={event} type={type} />;
          })}
      </div>
    </div>
  );
};
