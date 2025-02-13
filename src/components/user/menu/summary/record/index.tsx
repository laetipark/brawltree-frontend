import React, { useContext } from 'react';

import TableHorizontal from '~/components/table/horizontal';

import { UserContext } from '~/context/user.context';
import { CdnContext } from '~/context/cdn.context';

import config from '~/config/config';

import styles from './index.module.scss';

const roman = ['I', 'II', 'III'];

export const UserRecord = () => {
  const locales = useContext(CdnContext);

  const context = useContext(UserContext);
  const { profile } = context;

  return (
    <div className={styles.recordWrapper}>
      <TableHorizontal
        headRow={locales.user['record'].currentRecord}
        bodyRowContents={[
          [locales.user['record'].trophies, `${profile.currentTrophies}개`],
          [
            locales.user['record'].trophyChange,
            `${
              profile.trophyChange > 0
                ? `+${profile.trophyChange}`
                : profile.trophyChange || 0
            }개`,
          ],
          [
            locales.user['record'].currentSoloRanked,
            profile.currentSoloRanked / 3 < 6
              ? roman[profile.currentSoloRanked % 3]
              : '',
          ],
          [
            locales.user['record'].club,
            profile?.clubName?.replace(/(<+)([/c]+|c[1-9])(>)/g, '') ||
              'No Club',
          ],
        ]}
        bodyRowImages={[
          [null, null],
          [null, null],
          [
            null,
            `${config.assets}/rank/ranked/${Math.floor(
              profile.currentSoloRanked / 3,
            )}.webp`,
          ],
          [null, null],
        ]}
      />
      <TableHorizontal
        headRow={locales.user['record'].personalRecord}
        bodyRowContents={[
          [
            locales.user['record'].highestTrophies,
            `${profile.highestTrophies}개`,
          ],
          [
            locales.user['record'].trioVictories,
            `${profile.trioMatchVictories}회`,
          ],
          [
            locales.user['record'].duoVictories,
            `${profile.duoMatchVictories}회`,
          ],
          [
            locales.user['record'].soloVictories,
            `${profile.soloMatchVictories}회`,
          ],
          [locales.user['record'].rank35Brawlers, `${profile.brawlerRank50}개`],
          [
            locales.user['record'].highestSoloRanked,
            profile.highestSoloRanked / 3 < 6
              ? roman[profile.highestSoloRanked % 3]
              : '',
          ],
        ]}
        bodyRowImages={[
          [null, null],
          [null, null],
          [null, null],
          [null, null],
          [null, null],
          [
            null,
            `${config.assets}/rank/ranked/${Math.floor(
              profile.highestSoloRanked / 3,
            )}.webp`,
          ],
        ]}
      />
    </div>
  );
};
