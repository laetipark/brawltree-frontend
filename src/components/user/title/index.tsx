import React, { useContext, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import moment from 'moment';

import { useInterval } from '~/hooks/use-interval.hook';
import { UserContext } from '~/context/user.context';
import { CdnContext } from '~/context/cdn.context';

import config from '~/config/config';

import styles from './index.module.scss';

export const UserTitle = () => {
  const locales = useContext(CdnContext);

  const context = useContext(UserContext);
  const { user, setRetryCount } = context;
  const [lastUpdatedDiff, setLastUpdatedDiff] = useState(
    moment.duration(moment().diff(moment(user.updatedAt))).asMinutes(),
  );

  useInterval(() => {
    setLastUpdatedDiff(
      moment.duration(moment().diff(moment(user.updatedAt))).asMinutes(),
    );
  }, 1000);

  return (
    <div className={styles.titleWrapper}>
      <div className={styles.titleBox}>
        {user.profileIcon !== '' && (
          <img
            className={styles.image}
            src={`${config.assets}/brawlian/profile/${user.profileIcon}.webp`}
            alt={user.profileIcon}
          />
        )}
        <div>
          <div className={styles.realName}>{`${user.userName}`}</div>
          <div className={styles.userTag}>{user.userID}</div>
          <div className={styles.crewName}>
            <span>{`${user.crew || ''}`}</span>
            <span>{user.crewName ? `[${user.crewName}]` : ''}</span>
          </div>
        </div>
      </div>
      <div className={styles.buttonBox}>
        <span
          className={styles.titleButton}
          onClick={() => {
            if (lastUpdatedDiff > 2) {
              setRetryCount(0);
            }
          }}
        >
          <span>{locales.user['title'].update}</span>
          <span>
            <span>{Math.floor(lastUpdatedDiff)}</span>
            <span>{locales.user['title'].updateAgo}</span>
          </span>
        </span>
        <CopyToClipboard
          text={user.userID}
          onCopy={() => alert(locales.user['title'].copyAlert)}
        >
          <span className={styles.titleButton}>
            {locales.user['title'].copyTag}
          </span>
        </CopyToClipboard>
        <CopyToClipboard text={user.userID}>
          <a className={styles.titleButton} href={'brawlstars://'}>
            {locales.user['title'].copyTagAndRun}
          </a>
        </CopyToClipboard>
      </div>
    </div>
  );
};
