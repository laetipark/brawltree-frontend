import React, { useContext } from 'react';

import { UserFriendDetail } from './detail';

import { UserContext } from '~/context/user.context';

import styles from './index.module.scss';

export const UserFriendList = () => {
  const context = useContext(UserContext);
  const { friends } = context;

  return (
    <div className={styles.friendsWrapper}>
      <h2>
        <span>친밀도</span>
      </h2>
      <div>
        {friends?.map((friend) => {
          return <UserFriendDetail key={friend.friendID} friend={friend} />;
        })}
      </div>
    </div>
  );
};
