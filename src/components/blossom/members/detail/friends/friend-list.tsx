import React, { useContext } from 'react';

import UserFriendItem from './friend-item';

import UserContext from '~/context/user-context';

import styles from './friend-list.module.scss';

export const UserFriendList = () => {
  const context = useContext(UserContext);
  const { friends } = context;

  return (
    <div className={styles.friendsWrapper}>
      <h2>
        <span>친밀도</span>
        <span>
          (
          {friends.length !== 0
            ? Math.round(
            friends.reduce((sum, value) => {
              return sum + (value.friendPoints || 0);
            }, 0) * 100,
          ) / 100
            : 0}
          점)
        </span>
      </h2>
      <div>
        {friends?.map((friend) => {
          return <UserFriendItem key={friend.friendID} friend={friend} />;
        })}
      </div>
    </div>
  );
};
