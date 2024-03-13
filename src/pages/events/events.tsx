import React from 'react';
import { EventMenu } from '~/components/events';

import styles from './events.module.scss';

export const Events = () => {
  return (
    <div className={styles.app}>
      <EventMenu />
    </div>
  );
};
