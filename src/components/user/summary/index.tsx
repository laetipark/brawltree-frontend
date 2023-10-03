import React from 'react';

import UserRecord from '~/components/user/summary/record/record';
import UserBattles from '~/components/user/summary/battles/battles';

import styles from './index.module.scss';

const UserSummary = () => {

  return (
    <div className={styles.recordsWrapper}>
      <UserRecord />
      <UserBattles />
    </div>
  );
};

export default UserSummary;
