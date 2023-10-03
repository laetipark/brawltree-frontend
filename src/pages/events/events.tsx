import React from 'react';

import EventMenu from '~/components/events/events_menu';

import styles from './events.module.scss';

const Events = () => {
  return (
    <div className={styles.app}>
      <EventMenu />
    </div>
  );
};
export default Events;
