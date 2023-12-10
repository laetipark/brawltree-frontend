import React from 'react-router-dom';

import UserBrawlerList from '~/components/user/brawlers/list/brawler-list';

import styles from './index.module.scss';

const UserBrawlers = () => {
  return (
    <div className={styles.brawlersWrapper}>
      <UserBrawlerList />
    </div>
  );
};

export default UserBrawlers;