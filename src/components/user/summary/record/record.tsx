import React, { useContext } from 'react';

import TableHorizontal from '~/components/table/horizontal/table';

import UserContext from '~/context/user_context';

import config from '~/config/config';

import styles from './record.module.scss';

const roman = ['I', 'II', 'III'];

const UserRecord = () => {
  const context = useContext(UserContext);
  const { profile } = context;

  return (
    <div className={styles.recordWrapper}>
      <TableHorizontal
        headRow={'현재 기록'}
        bodyRowContents={[
          ['현재 트로피', `${profile.currentTrophies}개`],
          [
            '트로피 변화량',
            `${
              profile.trophyChange > 0
                ? `+${profile.trophyChange}`
                : profile.trophyChange
            }개`,
          ],
          ['솔로 리그 현재 랭크', roman[profile.currentSoloPL % 3]],
          ['팀 리그 현재 랭크', roman[profile.currentTeamPL % 3]],
          [
            '소속 클럽',
            profile?.clubName?.replace(/(<+)([/c]+|c[1-9])(>)/g, '') ||
              'No Club',
          ],
        ]}
        bodyRowImages={[
          [null, null],
          [null, null],
          [
            null,
            `${config.assets}/rank/power_league/${Math.floor(
              profile.currentSoloPL / 3,
            )}.webp`,
          ],
          [
            null,
            `${config.assets}/rank/power_league/${Math.floor(
              profile.currentTeamPL / 3,
            )}.webp`,
          ],
          [null, null],
        ]}
      />
      <TableHorizontal
        headRow={'누적 기록'}
        bodyRowContents={[
          ['최고 트로피', `${profile.highestTrophies}개`],
          ['3vs3 승리', `${profile.tripleVictories}회`],
          ['듀오 승리', `${profile.duoVictories}회`],
          ['25랭크 개수', `${profile.rank25Brawlers}개`],
          ['30랭크 개수', `${profile.rank30Brawlers}개`],
          ['35랭크 개수', `${profile.rank35Brawlers}개`],
          ['솔로 리그 최고 랭크', roman[profile.highestSoloPL % 3]],
          ['팀 리그 최고 랭크', roman[profile.highestTeamPL % 3]],
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
              profile.highestSoloPL / 3,
            )}.webp`,
          ],
          [
            null,
            `${config.assets}/rank/power_league/${Math.floor(
              profile.highestTeamPL / 3,
            )}.webp`,
          ],
        ]}
      />
    </div>
  );
};

export default UserRecord;
