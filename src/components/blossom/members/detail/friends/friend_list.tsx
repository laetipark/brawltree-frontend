import React, { useContext } from 'react';

import UserFriendItem from './friend_item';

import UserContext from '~/context/user_context';

import styles from './friend_list.module.scss';

const UserFriendList = () => {
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

export default UserFriendList;
