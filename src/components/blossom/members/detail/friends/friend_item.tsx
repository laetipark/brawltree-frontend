import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import config from '~/config/config';

import styles from './friend_item.module.scss';

const UserFriendItem = ({ friend }) => {
  const [hover, setHover] = useState(false);
  const drwCount = (matchCount, vicCount, defCount) => {
    return matchCount - (parseInt(vicCount) + parseInt(defCount));
  };

  const getFriendInfo = (friendDetail) => {
    return (
      <React.Fragment>
        {friendDetail?.map((match) => {
          return (
            <div
              key={`${match.USER_ID}_${match.FRIEND_ID}_${match.MAP_MD}_${match.MATCH_TYP}_${match.MATCH_GRD}`}
            >
              <div>
                {match.MATCH_TYP === 0 ? (
                  <img
                    className={styles.image}
                    src={`${config.assets}/modes/icon/trophyLeague.webp`}
                    alt={'게임방식'}
                  />
                ) : match.MATCH_TYP === 2 ? (
                  <img
                    className={styles.image}
                    src={`${config.assets}/modes/icon/powerLeagueSolo.webp`}
                    alt={'게임방식'}
                  />
                ) : match.MATCH_TYP === 3 ? (
                  <img
                    className={styles.image}
                    src={`${config.assets}/modes/icon/powerLeagueTeam.webp`}
                    alt={'게임방식'}
                  />
                ) : match.MATCH_TYP === '4' ? (
                  <img
                    className={styles.image}
                    src={`${config.assets}/modes/icon/challenge.webp`}
                    alt={'게임방식'}
                  />
                ) : match.MATCH_TYP === '5' ? (
                  <img
                    className={styles.image}
                    src={`${config.assets}/modes/icon/challenge.webp`}
                    alt={'게임방식'}
                  />
                ) : (
                  <img
                    className={styles.image}
                    src={`${config.assets}/modes/icon/clubLeague.webp`}
                    alt={'게임방식'}
                  />
                )}
                <span style={{ fontWeight: 600 }}>{match.MATCH_CNT}</span>
                <span>회</span>
                <span>(</span>
                <span style={{ color: '#5AA469', fontWeight: 600 }}>
                  {match.MATCH_CNT_VIC}
                </span>
                <span>/</span>
                <span style={{ color: '#556FB5', fontWeight: 600 }}>
                  {drwCount(
                    match.MATCH_CNT,
                    match.MATCH_CNT_VIC,
                    match.MATCH_CNT_DEF,
                  )}
                </span>
                <span>/</span>
                <span style={{ color: '#D35D6E', fontWeight: 600 }}>
                  {match.MATCH_CNT_DEF}
                </span>
                <span>)</span>
              </div>
              <div>
                {match.MATCH_TYP === 0 ? (
                  <img
                    className={styles.image}
                    src={`${config.assets}/rank/trophy_league/${match.MATCH_GRD}.webp`}
                    alt={'트로피 리그 랭크'}
                  />
                ) : [2, 3].includes(match.MATCH_TYP) ? (
                  <img
                    className={styles.image}
                    src={`${config.assets}/rank/power_league/${Math.floor(
                      (match.MATCH_GRD - 1) / 3,
                    )}.webp`}
                    alt={'파워 리그 랭크'}
                  />
                ) : match.MATCH_TYP === 6 ? (
                  <img
                    className={styles.image}
                    src={`${config.assets}/modes/icon/clubLeague.webp`}
                    alt={'클럽 리그'}
                  />
                ) : (
                  <img
                    className={styles.image}
                    src={`${config.assets}/modes/icon/challenge.webp`}
                    alt={'챌린지'}
                  />
                )}
                <span>승률</span>
                <span style={{ fontWeight: 600 }}>
                  {match.MATCH_CNT_VIC > 0
                    ? Math.round(
                        (match.MATCH_CNT_VIC /
                          (parseInt(match.MATCH_CNT_VIC) +
                            parseInt(match.MATCH_CNT_DEF))) *
                          100,
                      )
                    : 0}
                </span>
                <span>%</span>
              </div>
            </div>
          );
        })}
      </React.Fragment>
    );
  };

  return (
    <Link
      key={`${friend.USER_ID}_${friend.FRIEND_ID}`}
      to={`/blossom/members/${friend.FRIEND_ID.replace('#', '')}`}
      className={styles.friendWrapper}
    >
      <div
        className={styles.friendSummary}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <h4>
          {friend.FRIEND_NM}({Math.round(friend.FRIEND_PT * 100) / 100.0}점)
        </h4>
        <div>
          <span>매치</span>
          <span style={{ fontWeight: 600 }}>{friend.MATCH_CNT}</span>
          <span>회</span>
          <span>/</span>
          <span>승률</span>
          <span style={{ fontWeight: 600 }}>
            {friend.MATCH_CNT_VIC > 0
              ? Math.round(
                  (friend.MATCH_CNT_VIC /
                    (parseInt(friend.MATCH_CNT_VIC) +
                      parseInt(friend.MATCH_CNT_DEF))) *
                    100,
                )
              : 0}
          </span>
          <span>%</span>
        </div>
        <div>
          <span style={{ color: '#5AA469' }}>승</span>
          <span style={{ color: '#5AA469', fontWeight: 600 }}>
            {friend.MATCH_CNT_VIC}
          </span>
          <span style={{ color: '#5AA469' }}>회</span>
          <span style={{ color: '#556FB5' }}>무</span>
          <span style={{ color: '#556FB5', fontWeight: 600 }}>
            {drwCount(
              friend.MATCH_CNT,
              friend.MATCH_CNT_VIC,
              friend.MATCH_CNT_DEF,
            )}
          </span>
          <span style={{ color: '#556FB5' }}>회</span>
          <span style={{ color: '#D35D6E' }}>패</span>
          <span style={{ color: '#D35D6E', fontWeight: 600 }}>
            {friend.MATCH_CNT_DEF}
          </span>
          <span style={{ color: '#D35D6E' }}>회</span>
        </div>
      </div>
      <div
        className={styles.friendDetail}
        style={{
          display: hover ? 'flex' : 'none',
          maxHeight: hover ? '' : 0,
          transform: hover ? '1' : '0',
          padding: hover ? '10px' : 0,
        }}
      >
        {getFriendInfo(friend.MATCH_L)}
      </div>
    </Link>
  );
};

export default UserFriendItem;
