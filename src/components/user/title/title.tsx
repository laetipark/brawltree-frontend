import React, { useContext } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import UserContext from '~/context/user_context';

import config from '~/config/config';

import styles from './title.module.scss';

const UserTitle = () => {
  const context = useContext(UserContext);
  const { user } = context;

  return (
    <div className={styles.titleWrapper}>
      <div className={styles.titleBox}>
        {user.profile !== '' && (
          <img
            className={styles.image}
            src={`${config.assets}/brawlian/profile/${user.profile}.webp`}
            alt={user.profile}
          />
        )}
        <div>
          <div className={styles.realNameBox}>{`${user.name}`}</div>
          <p className={styles.tagBox}>{user.userID}</p>
        </div>
      </div>
      <div className={styles.reloadBox}>
        <button className={styles.reloadButton}>프로필 갱신</button>
        1분 전
      </div>
      <div className={styles.copyBox}>
        <CopyToClipboard
          text={user.userID}
          onCopy={() => alert('태그를 복사했습니다.')}
        >
          <span className={styles.copyButton}>태그 복사</span>
        </CopyToClipboard>
        <CopyToClipboard text={user.userID}>
          <a className={styles.copyButton} href={'brawlstars://'}>
            태그 복사 + 게임 실행
          </a>
        </CopyToClipboard>
      </div>
    </div>
  );
};

export default UserTitle;