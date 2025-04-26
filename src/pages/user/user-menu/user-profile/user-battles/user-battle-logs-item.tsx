import React, { useContext, useState } from 'react';
import moment from 'moment/moment';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

import { UserContext } from '~/context/user.context';
import { UserBattlePlayersType } from '~/common/types/users.type';
import { CdnContext } from '~/context/cdn.context';

import config from '~/common/config/config';

import styles from '~/assets/styles/pages/user/user-menu/user-profile/user-battles/user-battle-logs-item.module.scss';

const gameResultColors = ['#9ED2BE', '#9EA1D4', '#FD8A8A'];
const typeArray = {
  0: 'trophy',
  2: 'ranked',
  3: 'powerLeagueTeam',
  4: 'challenge',
  5: 'challenge',
  6: 'clubLeague'
};
const roman = ['I', 'II', 'III'];

export const UserBattleLogsItemBox = ({ battleInfo, battlePlayers }) => {
  const locales = useContext(CdnContext);

  const context = useContext(UserContext);
  const { setUser, setRetryUserInfoCount } = context;

  const [isChecked, setIsChecked] = useState(false);

  const dateDiff = moment.duration(moment().diff(moment(battleInfo.battleTime))).days();
  const hourDiff = moment.duration(moment().diff(moment(battleInfo.battleTime))).hours();
  const minuteDiff = moment.duration(moment().diff(moment(battleInfo.battleTime))).minutes();
  const matchTeams = battlePlayers.reduce(
    (
      result: Array<UserBattlePlayersType>[],
      current: {
        teamNumber: number;
      }
    ) => {
      result[current.teamNumber] = result[current.teamNumber] || [];
      result[current.teamNumber].push(current as UserBattlePlayersType);
      return result;
    },
    []
  );

  const checkHandler = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div>
      <div>
        <input className={styles.battleSummaryButton} type={'checkbox'} id={battleInfo.battleTime} name={battleInfo.battleTime} checked={isChecked} onChange={checkHandler} />
        <label
          htmlFor={battleInfo.battleTime}
          className={styles.battleSummary}
          style={{
            backgroundColor: gameResultColors[battleInfo.gameResult + 1]
          }}
        >
          <div className={styles.matchInfo}>
            <img className={styles.brawlerImage} src={`${config.assets}/brawlers/profiles/${battleInfo.brawlerID}.webp`} alt={battleInfo.brawlerID} />
            <div className={styles.matchInfoImageBox}>
              <img src={`${config.assets}/modes/icon/${typeArray[battleInfo.matchType]}.webp`} alt={battleInfo.matchType} />
              <img src={`${config.assets}/modes/icon/${battleInfo.mode}.webp`} alt={battleInfo.mode} />
            </div>
            <div>
              <div className={styles.battleSummaryTitle}>{locales.map['map'][`${battleInfo.mapID}`] || battleInfo.mapName}</div>
              <div className={styles.battleSummarySubTitle}>
                {dateDiff > 0
                  ? `${dateDiff} ${locales.user['battle'].daysAgo}`
                  : hourDiff > 0
                    ? `${hourDiff} ${locales.user['battle'].hoursAgo}`
                    : `${minuteDiff} ${locales.user['battle'].minutesAgo}`}
              </div>
            </div>
          </div>
          <div className={styles.matchResultBox}>
            <div>{battleInfo.duration} seconds</div>
            <div>
              <div>{locales.battle['result'][`${battleInfo.gameResult}`]}</div>
              <div>{battleInfo.trophyChange > 0 ? `+${battleInfo.trophyChange}` : battleInfo.trophyChange}</div>
            </div>
          </div>
          <div className={styles.battleArrow}>
            <FontAwesomeIcon
              style={{
                transform: isChecked ? 'rotate(180deg)' : '',
                transition: 'transform 0.3s ease'
              }}
              fontSize={13}
              icon={faArrowUp}
            />
          </div>
        </label>
      </div>
      <div className={styles.battleLogsDetail} style={{ display: isChecked ? 'flex' : 'none' }}>
        {matchTeams?.map((team: UserBattlePlayersType[], index: number) => {
          const teamGameResult =
            battleInfo.modeCode === 3
              ? team.find((item) => item.playerID === battleInfo.userID) !== undefined
                ? battleInfo.gameResult + 1
                : battleInfo.gameResult * -1 + 1
              : matchTeams[index][0].gameResult + 1;

          return (
            <React.Fragment key={`${battleInfo.battleTime}_${index}`}>
              <div className={styles.battleLogsDetailTitle}>
                {locales.battle['result'][`${teamGameResult - 1}`]}({battleInfo.modeCode === 3 ? (index === 0 ? '블루' : '레드') : `${index + 1}등`})
              </div>
              <div className={styles.battleLogsDetailContent} style={{ backgroundColor: gameResultColors[teamGameResult] }}>
                {team?.map(({ brawlerID, brawlerPower, brawlerTrophies, playerID, playerName, isStarPlayer }) => {
                  return (
                    <a
                      key={`${battleInfo.battleTime}_${index}_${playerID}`}
                      href={`./${playerID.replace('#', '')}`}
                      onClick={() => {
                        setUser({
                          userID: '',
                          userName: '',
                          profileIcon: '',
                          lastBattleAt: undefined,
                          updatedAt: undefined,
                          crew: '',
                          crewName: '',
                          isCrew: false
                        });
                        setRetryUserInfoCount(0);
                      }}
                    >
                      <div>
                        <img className={styles.matchBrawler} src={`${config.assets}/brawlers/profiles/${brawlerID}.webp`} alt={'브롤러'} />
                      </div>
                      <div>
                        <div className={styles.matchTitle}>{playerName}</div>
                        <div className={styles.matchSubTitle}>
                          {isStarPlayer === 1 && (
                            <React.Fragment>
                              <img src={`${config.assets}/game/icon/logo_star.webp`} alt={'게임모드'} />
                              <span>{locales.battle['result'].starPlayer}</span>
                            </React.Fragment>
                          )}
                        </div>
                      </div>
                      <div>
                        <div className={styles.matchTitle}>POWER {brawlerPower}</div>
                        <div className={styles.matchSubTitle}>
                          {[2, 3].includes(battleInfo.matchType) ? (
                            <React.Fragment>
                              <img src={`${config.assets}/rank/ranked/${Math.floor((brawlerTrophies - 1) / 3)}.webp`} alt={'ranked_image'} />
                              <span>{roman[(brawlerTrophies - 1) % 3]}</span>
                            </React.Fragment>
                          ) : (
                            <React.Fragment>
                              <img src={`${config.assets}/modes/icon/${typeArray[battleInfo.matchType]}.webp`} alt={'게임모드'} />
                              <span>{brawlerTrophies}</span>
                            </React.Fragment>
                          )}
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
