import React, { useContext, useEffect, useRef, useState } from 'react';

import UserRecord from '~/components/user/summary/record/record';
import { UserBattles } from '~/components/user/summary/battles/battles';

import styles from './index.module.scss';
import UserContext from '~/context/user-context';
import { UserFriendList } from '~/components/blossom/members/detail/friends/friend-list';
import { UserSeasonRecords } from '~/components/blossom/members/detail/season/season';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

const UserSummary = () => {
  const context = useContext(UserContext);
  const { recentBattles, friends, setStack } = context;

  const [load, setLoad] = useState(true);
  const target = useRef(null);

  useEffect(() => {
    const options = {
      threshold: 1.0,
    };

    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        if (entry.isIntersecting) {
          setStack((prevStack: number) => {
            if (recentBattles.length % 30 === 0) {
              return prevStack + 1;
            } else {
              setLoad(false);
              observer.unobserve(target.current);
            }

            return prevStack;
          });
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);

    if (target.current) {
      observer.observe(target.current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [recentBattles]);

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
      {
        load &&
        <div ref={target} className={styles.breakLine}>
          <FontAwesomeIcon icon={faEllipsis}
                           fontSize={28} />
        </div>
      }
    </div>
  );
};

export default UserSummary;
