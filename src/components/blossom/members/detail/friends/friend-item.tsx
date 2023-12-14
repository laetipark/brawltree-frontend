import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import config from '~/config/config';

import styles from './friend-item.module.scss';

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
              key={`${match.userID}_${match.friendID}_${match.mode}_${match.matchType}_${match.matchGrade}`}
            >
              <div>
                {match.matchType === 0 ? (
                  <img
                    className={styles.image}
                    src={`${config.assets}/modes/icon/trophyLeague.webp`}
                    alt={'게임방식'}
                  />
                ) : match.matchType === 2 ? (
                  <img
                    className={styles.image}
                    src={`${config.assets}/modes/icon/powerLeagueSolo.webp`}
                    alt={'게임방식'}
                  />
                ) : match.matchType === 3 ? (
                  <img
                    className={styles.image}
                    src={`${config.assets}/modes/icon/powerLeagueTeam.webp`}
                    alt={'게임방식'}
                  />
                ) : match.matchType === '4' ? (
                  <img
                    className={styles.image}
                    src={`${config.assets}/modes/icon/challenge.webp`}
                    alt={'게임방식'}
                  />
                ) : match.matchType === '5' ? (
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
                <span style={{ fontWeight: 600 }}>{match.matchCount}</span>
                <span>회</span>
                <span>(</span>
                <span style={{ color: '#5AA469', fontWeight: 600 }}>
                  {match.victoryCount}
                </span>
                <span>/</span>
                <span style={{ color: '#556FB5', fontWeight: 600 }}>
                  {drwCount(
                    match.matchCount,
                    match.victoryCount,
                    match.defeatCount,
                  )}
                </span>
                <span>/</span>
                <span style={{ color: '#D35D6E', fontWeight: 600 }}>
                  {match.defeatCount}
                </span>
                <span>)</span>
              </div>
              <div>
                {match.matchType === 0 ? (
                  <img
                    className={styles.image}
                    src={`${config.assets}/rank/trophy_league/${match.matchGrade}.webp`}
                    alt={'트로피 리그 랭크'}
                  />
                ) : [2, 3].includes(match.matchType) ? (
                  <img
                    className={styles.image}
                    src={`${config.assets}/rank/power_league/${Math.floor(
                      (match.matchGrade - 1) / 3,
                    )}.webp`}
                    alt={'파워 리그 랭크'}
                  />
                ) : match.matchType === 6 ? (
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
                  {match.victoryCount > 0
                    ? Math.round(
                        (match.victoryCount /
                          (parseInt(match.victoryCount) +
                            parseInt(match.defeatCount))) *
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
      key={`${friend.userID}_${friend.friendID}`}
      to={`/blossom/members/${friend.friendID.replace('#', '')}`}
      className={styles.friendWrapper}
    >
      <div
        className={styles.friendSummary}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <h4>
          {friend.friendName}({Math.round(friend.friendPoints * 100) / 100.0}점)
        </h4>
        <div>
          <span>매치</span>
          <span style={{ fontWeight: 600 }}>{friend.matchCount}</span>
          <span>회</span>
          <span>/</span>
          <span>승률</span>
          <span style={{ fontWeight: 600 }}>
            {friend.victoryCount > 0
              ? Math.round(
                  (friend.victoryCount /
                    (parseInt(friend.victoryCount) +
                      parseInt(friend.defeatCount))) *
                    100,
                )
              : 0}
          </span>
          <span>%</span>
        </div>
        <div>
          <span style={{ color: '#5AA469' }}>승</span>
          <span style={{ color: '#5AA469', fontWeight: 600 }}>
            {friend.victoryCount}
          </span>
          <span style={{ color: '#5AA469' }}>회</span>
          <span style={{ color: '#556FB5' }}>무</span>
          <span style={{ color: '#556FB5', fontWeight: 600 }}>
            {drwCount(
              friend.matchCount,
              friend.victoryCount,
              friend.defeatCount,
            )}
          </span>
          <span style={{ color: '#556FB5' }}>회</span>
          <span style={{ color: '#D35D6E' }}>패</span>
          <span style={{ color: '#D35D6E', fontWeight: 600 }}>
            {friend.defeatCount}
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
        {getFriendInfo(friend.matchList)}
      </div>
    </Link>
  );
};

export default UserFriendItem;
