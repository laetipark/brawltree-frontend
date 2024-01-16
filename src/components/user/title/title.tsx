import React, { useContext, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import useInterval from '~/hooks/use-interval';

import UserContext from '~/context/user-context';

import config from '~/config/config';

import styles from './title.module.scss';

const UserTitle = () => {
  const { t } = useTranslation();

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
      <div className={styles.reloadBox}>
        <button
          className={styles.reloadButton}
          onClick={() => {
            if (lastUpdatedDiff > 2) {
              setRetryCount(0);
            }
          }}
        >
          <span>{t(`user.title.update`)}</span>
          <span>{Math.floor(lastUpdatedDiff)}</span>
          <span>{t(`user.title.updateAgo`)}</span>
        </button>
      </div>
      <div className={styles.copyBox}>
        <CopyToClipboard
          text={user.userID}
          onCopy={() => alert(t(`user.title.copyAlert`))}
        >
          <span className={styles.copyButton}>{t(`user.title.copyTag`)}</span>
        </CopyToClipboard>
        <CopyToClipboard text={user.userID}>
          <a className={styles.copyButton} href={'brawlstars://'}>
            {t(`user.title.copyTagAndRun`)}
          </a>
        </CopyToClipboard>
      </div>
    </div>
  );
};

export default UserTitle;
