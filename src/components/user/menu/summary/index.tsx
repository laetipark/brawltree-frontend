import React, { useContext } from 'react';

import { UserRecord } from './record';
import { UserBattles } from './battles';

import { UserFriendList } from '~/components/user/crew/friends';
import { UserSeasonRecords } from '~/components/user/crew/season';

import { UserContext } from '~/context/user.context';

import styles from './index.module.scss';

const UserSummary = () => {
  const context = useContext(UserContext);
  const { friends } = context;

  return (
    <div className={styles.recordsWrapper}>
      <UserRecord />
      {friends && (
        <React.Fragment>
          <UserFriendList />
          <UserSeasonRecords />
        </React.Fragment>
      )}
      <UserBattles />
    </div>
  );
};

export default UserSummary;
