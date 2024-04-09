import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { UserFriendDetailItem } from '~/components/user/crew/friends/detail/item';

import config from '~/config/config';
import styles from './index.module.scss';

export const UserFriendDetail = ({ friend }) => {
  const { t } = useTranslation();
  const [hover, setHover] = useState(false);
  const drwCount = (matchCount: number, vicCount: number, defCount: number) => {
    return matchCount - (vicCount + defCount);
  };

  return (
    <Link
      key={friend.friendID}
      to={`/brawlian/${friend.friendID.replace('#', '')}`}
      className={styles.friendDetailWrapper}
    >
      <div className={styles.friendSummary}
           onMouseEnter={() => setHover(true)}
           onMouseLeave={() => setHover(false)}>
        <img src={`${config.assets}/brawlian/profile/${friend.profileIcon}.webp`}
             alt={friend.profileIcon} />
        <div>
          <h4>{friend.friendName}</h4>
          <div>
            <div>
                <span style={{ fontWeight: 600 }}>
                  {friend.matchCount}
                </span>
              <span>{t('battle.result.game')}</span>
            </div>
            <div style={{ color: '#5AA469' }}>
                <span>
                  {friend.victoriesCount}
                </span>
              <span>
                  {t('battle.result.w')}
                </span>
            </div>
            <div style={{ color: '#556FB5' }}>
                <span>
                  {drwCount(
                    friend.matchCount,
                    friend.victoriesCount,
                    friend.defeatsCount,
                  )}
                </span>
              <span>{t('battle.result.d')}</span>
            </div>
            <div style={{ color: '#D35D6E' }}>
                <span>
                  {friend.defeatsCount}
                </span>
              <span>
                  {t('battle.result.l')}
                </span>
            </div>
            <div>
              (<span>
                  {
                    friend.victoriesCount > 0
                      ? Math.round(
                        (friend.victoriesCount /
                          (parseInt(friend.victoriesCount) +
                            parseInt(friend.defeatsCount))) *
                        100,
                      ) : 0
                  }%)
                </span>
            </div>
          </div>
        </div>
      </div>
      <UserFriendDetailItem
        matchList={friend.matchList}
        hover={hover} />
    </Link>
  );
};
