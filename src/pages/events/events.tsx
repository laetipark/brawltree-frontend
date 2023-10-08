import React from 'react';

import EventMenu from '~/components/events';

import styles from './events.module.scss';

const Events = () => {
  return (
    <div className={styles.app}>
      <EventMenu />
    </div>
  );
};
export default Events;
