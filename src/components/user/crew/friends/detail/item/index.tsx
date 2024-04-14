import React from 'react';
import { useTranslation } from 'react-i18next';

import { UserFriendsType } from '~/common/type/users.type';
import config from '~/config/config';

import styles from './index.module.scss';

export const UserFriendDetailItem = ({ matchList, hover }) => {
  const { t } = useTranslation();
  const drwCount = (matchCount: number, vicCount: number, defCount: number) => {
    return matchCount - (vicCount + defCount);
  };

  return (
    <div className={styles.friendDetailItemWrapper}
         style={{ display: hover ? 'flex' : 'none' }}>
      {matchList?.map((match: UserFriendsType) => {
        return (
          <div key={`${match.friendID}_${match.mode}_${match.matchType}_${match.matchGrade}`}>
            <div>
              {match.matchType === 0 ? (
                <img
                  className={styles.iconImage}
                  src={`${config.assets}/modes/icon/trophy.webp`}
                  alt={'게임방식'}
                />
              ) : match.matchType === 2 ? (
                <img
                  className={styles.iconImage}
                  src={`${config.assets}/modes/icon/ranked.webp`}
                  alt={'게임방식'}
                />
              ) : match.matchType === 3 ? (
                <img
                  className={styles.iconImage}
                  src={`${config.assets}/modes/icon/powerLeagueTeam.webp`}
                  alt={'게임방식'}
                />
              ) : match.matchType === 4 ? (
                <img
                  className={styles.iconImage}
                  src={`${config.assets}/modes/icon/challenge.webp`}
                  alt={'게임방식'}
                />
              ) : (
                <img
                  className={styles.iconImage}
                  src={`${config.assets}/modes/icon/challenge.webp`}
                  alt={'게임방식'}
                />
              )}
              <span>|</span>
              <img
                className={styles.iconImage}
                src={`${config.assets}/modes/icon/${match.mode}.webp`}
                alt={'챌린지'}
              />
              <span>|</span>
              {match.matchType === 0 ? (
                <img
                  className={styles.iconImage}
                  src={`${config.assets}/rank/trophy_league/grade/${match.matchGrade}.webp`}
                  alt={'트로피'}
                />
              ) : [2, 3].includes(match.matchType) ? (
                <img
                  className={styles.iconImage}
                  src={`${config.assets}/rank/power_league/${Math.floor(
                    (match.matchGrade - 1) / 3,
                  )}.webp`}
                  alt={'경쟁전'}
                />
              ) : (
                <img
                  className={styles.iconImage}
                  src={`${config.assets}/modes/icon/challenge.webp`}
                  alt={'챌린지'}
                />
              )}
            </div>
            <div>
              <span>
                {match.matchCount}
              </span>
              <span>
                {t('battle.result.game')}
              </span>
            </div>
            <div style={{ color: '#5AA469' }}>
              <span>
                {match.victoriesCount}
              </span>
              <span>
                {t('battle.result.w')}
              </span>
            </div>
            <div style={{ color: '#556FB5' }}>
              <span>
                {drwCount(
                  match.matchCount,
                  match.victoriesCount,
                  match.defeatsCount,
                )}
              </span>
              <span>
                {t('battle.result.d')}
              </span>
            </div>
            <div style={{ color: '#D35D6E' }}>
              <span>
                {match.defeatsCount}
              </span>
              <span>
                {t('battle.result.l')}
              </span>
            </div>
            <div>
              (<span>
                  {
                    match.victoriesCount > 0
                      ? Math.round(
                        (match.victoriesCount / (match.victoriesCount + match.defeatsCount)) *
                        100)
                      : 0
                  }%)
                </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};