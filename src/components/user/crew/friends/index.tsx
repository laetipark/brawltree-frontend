import React, { useContext } from 'react';

import { UserFriendDetail } from './detail';

import { UserContext } from '~/context/user.context';

import styles from './index.module.scss';
import { useTranslation } from 'react-i18next';

export const UserFriendList = () => {
  const { t } = useTranslation();
  const context = useContext(UserContext);
  const { friends } = context;

  return (
    <div className={styles.friendsWrapper}>
      <h2>
        <span>{t('user.crew.userPlayedWith')}</span>
      </h2>
      <div>
        {friends?.map((friend) => {
          return <UserFriendDetail key={friend.friendID} friend={friend} />;
        })}
      </div>
    </div>
  );
};
