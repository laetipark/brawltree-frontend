import React from 'react-router-dom';

import { UserBrawlerList } from '~/components/user/menu/brawlers/list';

import styles from './index.module.scss';

export const UserBrawlers = () => {
  return (
    <div className={styles.brawlersWrapper}>
      <UserBrawlerList />
    </div>
  );
};