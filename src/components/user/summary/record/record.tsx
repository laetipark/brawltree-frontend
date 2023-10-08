import React, { useContext } from 'react';

import TableHorizontal from '~/components/table/horizontal/table';

import UserContext from '~/context/user_context';

import config from '~/config/config';

import styles from './record.module.scss';

const roman = ['I', 'II', 'III'];

const UserRecord = () => {
  const context = useContext(UserContext);
  const { profile } = context;

  console.log(profile);

  return (
    <div className={styles.recordWrapper}>
      <TableHorizontal
        headRow={'현재 기록'}
        bodyRowContents={[
          ['현재 트로피', `${profile.TROPHY_CUR}개`],
          ['트로피 변화량', 0],
          ['솔로 리그 현재 랭크', roman[profile.PL_SL_CUR % 3]],
          ['팀 리그 현재 랭크', roman[profile.PL_TM_CUR % 3]],
          ['소속 클럽', profile.CLUB_NM.replace(/(<+)([/c]+|c[1-9])(>)/g, '')],
        ]}
        bodyRowImages={[
          [null, null],
          [null, null],
          [
            null,
            `${config.assets}/rank/power_league/${Math.floor(
              profile.PL_SL_CUR / 3,
            )}.webp`,
          ],
          [
            null,
            `${config.assets}/rank/power_league/${Math.floor(
              profile.PL_TM_CUR / 3,
            )}.webp`,
          ],
          [null, null],
        ]}
      />
      <TableHorizontal
        headRow={'누적 기록'}
        bodyRowContents={[
          ['최고 트로피', `${profile.TROPHY_HGH}개`],
          ['3vs3 승리', `${profile.VICTORY_TRP}회`],
          ['듀오 승리', `${profile.VICTORY_DUO}회`],
          ['25랭크 개수', `${profile.BRAWLER_RNK_25}개`],
          ['30랭크 개수', `${profile.BRAWLER_RNK_30}개`],
          ['35랭크 개수', `${profile.BRAWLER_RNK_35}개`],
          ['솔로 리그 최고 랭크', roman[profile.PL_SL_HGH % 3]],
          ['팀 리그 최고 랭크', roman[profile.PL_TM_HGH % 3]],
        ]}
        bodyRowImages={[
          [null, null],
          [null, null],
          [null, null],
          [null, null],
          [null, null],
          [null, null],
          [
            null,
            `${config.assets}/rank/power_league/${Math.floor(
              profile.PL_SL_HGH / 3,
            )}.webp`,
          ],
          [
            null,
            `${config.assets}/rank/power_league/${Math.floor(
              profile.PL_TM_HGH / 3,
            )}.webp`,
          ],
        ]}
      />
    </div>
  );
};

export default UserRecord;
