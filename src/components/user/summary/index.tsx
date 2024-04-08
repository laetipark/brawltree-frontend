import React, { useContext } from 'react';

import UserRecord from '~/components/user/summary/record/record';
import { UserBattles } from '~/components/user/summary/battles/battles';

import styles from './index.module.scss';
import { UserContext } from '~/context/user.context';
import { UserFriendList } from '~/components/user/crew/friends';
import { UserSeasonRecords } from '~/components/user/crew/season';

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
