import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import TableHorizontal from '~/components/table/horizontal';

import { UserContext } from '~/context/user.context';
import config from '~/config/config';

import styles from './index.module.scss';

const roman = ['I', 'II', 'III'];

export const UserRecord = () => {
  const { t } = useTranslation();

  const context = useContext(UserContext);
  const { profile } = context;

  return (
    <div className={styles.recordWrapper}>
      <TableHorizontal
        headRow={t('user.record.currentRecord')}
        bodyRowContents={[
          [t('user.record.trophies'), `${profile.currentTrophies}개`],
          [
            t('user.record.trophyChange'),
            `${
              profile.trophyChange > 0
                ? `+${profile.trophyChange}`
                : profile.trophyChange || 0
            }개`,
          ],
          [t('user.record.soloLeagueRank'), profile.currentSoloPL / 3 < 6 ? roman[profile.currentSoloPL % 3] : ''],
          [
            t('user.record.club'),
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
              profile.currentSoloPL / 3,
            )}.webp`,
          ],
          [null, null],
        ]}
      />
      <TableHorizontal
        headRow={t('user.record.personalRecord')}
        bodyRowContents={[
          [t('user.record.highestTrophies'), `${profile.highestTrophies}개`],
          [t('user.record.trioVictories'), `${profile.trioMatchVictories}회`],
          [t('user.record.duoVictories'), `${profile.duoMatchVictories}회`],
          [t('user.record.soloVictories'), `${profile.soloMatchVictories}회`],
          [t('user.record.rank25Brawlers'), `${profile.brawlerRank25}개`],
          [t('user.record.rank30Brawlers'), `${profile.brawlerRank30}개`],
          [t('user.record.rank35Brawlers'), `${profile.brawlerRank35}개`],
          [t('user.record.highestSoloPL'), profile.highestSoloPL / 3 < 6 ? roman[profile.highestSoloPL % 3] : ''],
        ]}
        bodyRowImages={[
          [null, null],
          [null, null],
          [null, null],
          [null, null],
          [null, null],
          [null, null],
          [null, null],
          [
            null,
            `${config.assets}/rank/ranked/${Math.floor(
              profile.highestSoloPL / 3,
            )}.webp`,
          ],
        ]}
      />
    </div>
  );
};
