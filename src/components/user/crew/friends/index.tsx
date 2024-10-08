import React, { useContext, useEffect, useState } from 'react';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { UserFriendDetail } from './detail';

import { UserContext } from '~/context/user.context';
import { CdnContext } from '~/context/cdn.context';

import styles from './index.module.scss';

export const UserFriendList = () => {
  const locales = useContext(CdnContext);
  const context = useContext(UserContext);
  const { friends } = context;

  const [filterFriends, setFilterFriends] = useState(friends.slice(0, 6));
  const [isMore, setIsMore] = useState(false);

  useEffect(() => {
    if (isMore) {
      setFilterFriends(friends);
    } else {
      setFilterFriends(friends.slice(0, 6));
    }
  }, [isMore]);

  return (
    <div className={styles.friendsWrapper}>
      <h2>
        <span>{locales.user['crew'].userPlayedWith}</span>
      </h2>
      <div className={styles.friendsList}>
        {filterFriends?.map((friend) => {
          return <UserFriendDetail key={friend.friendID} friend={friend} />;
        })}
      </div>
      {friends.length > 6 && (
        <div className={styles.moreButton} onClick={() => setIsMore(!isMore)}>
          <span>
            {!isMore ? locales.main['showMore'] : locales.main['hideMore']}
          </span>
          <span>
            <FontAwesomeIcon
              style={{
                transform: isMore ? 'rotate(180deg)' : '',
                transition: 'transform 0.3s ease',
              }}
              fontSize={14}
              icon={faAngleDown}
            />
          </span>
        </div>
      )}
    </div>
  );
};
