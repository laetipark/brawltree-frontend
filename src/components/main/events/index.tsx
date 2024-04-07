import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { EventsSummaryItem } from '~/components/main/events/content';

import { RotationType } from '~/common/type/maps.type';

import styles from './index.module.scss';

export const EventsSummary = ({ events, type }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.eventsSummaryWrapper}>
      <Link to={`/events/${type}`}>
        <span>{type === 'ranked' ? t('map.event.ranked') : t('map.event.current')}</span>
      </Link>
      <div className={styles.eventItem}>
        {(events.length || 0) > 0 &&
          events.map((event: RotationType) => {
            return (
              <EventsSummaryItem key={event.mapID}
                                 event={event}
                                 type={type} />
            );
          })}
      </div>
    </div>
  );
};
