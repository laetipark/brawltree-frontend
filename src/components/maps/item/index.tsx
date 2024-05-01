import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { EventItem } from '~/components/maps/item/content';

import { RotationType } from '~/common/type/maps.type';

import styles from './index.module.scss';

export const EventItems = ({ events, type }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.eventsSummaryWrapper}>
      <Link to={`/events/${['ranked', 'curr', 'next'].includes(type) ? type : 'curr'}`}>
        <span>
          {
            type === 'ranked' ? t('map.event.ranked') :
              type === 'curr' ? t('map.event.current') :
                type === 'next' ? t('map.event.tomorrow') :
                  t(`battle.mode.${type}`)
          }
        </span>
      </Link>
      <div className={styles.eventItem}>
        {(events.length || 0) > 0 &&
          events.map((event: RotationType) => {
            return (
              <EventItem key={event.mapID}
                         event={event}
                         type={type} />
            );
          })}
      </div>
    </div>
  );
};
