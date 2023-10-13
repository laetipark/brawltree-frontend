import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment/moment';

import UserContext from '~/context/user_context';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';

import config from '~/config/config';

import styles from './battle_log.module.scss';

const matchResults = ['Victory', 'Draw', 'Defeat'];
const matchResultColors = ['#9ED2BE', '#9EA1D4', '#FD8A8A'];
const typeArray = {
  0: 'trophyLeague',
  2: 'powerLeagueSolo',
  3: 'powerLeagueTeam',
  4: 'challenge',
  5: 'challenge',
  6: 'clubLeague',
};
const roman = ['I', 'II', 'III'];

const BattleLog = ({ BATTLE_INFO, BATTLE_PLAYERS }) => {
  const context = useContext(UserContext);
  const { setUser, setRetryCount } = context;

  const [isChecked, setIsChecked] = useState(false);

  const dateDiff = moment.duration(moment().diff(moment(BATTLE_INFO.matchDate))).days();
  const hourDiff = moment.duration(moment().diff(moment(BATTLE_INFO.matchDate))).hours();
  const minuteDiff = moment.duration(moment().diff(moment(BATTLE_INFO.matchDate))).minutes();
  const matchTeams = BATTLE_PLAYERS.reduce(
    (result: any[], current: {
      teamNumber: number;
    }) => {
      result[current.teamNumber] = result[current.teamNumber] || [];
      result[current.teamNumber].push(current);
      return result;
    }, []);

  const checkHandler = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div>
      <div>
        <input className={styles.battleSummaryButton}
               type={'checkbox'}
               id={BATTLE_INFO.matchDate}
               name={BATTLE_INFO.matchDate}
               checked={isChecked}
               onChange={checkHandler} />
        <label htmlFor={BATTLE_INFO.matchDate}
               className={styles.battleSummary}
               style={{
                 backgroundColor: matchResultColors[BATTLE_INFO.matchResult + 1],
               }}>
          <div className={styles.matchInfo}>
            <img className={styles.brawlerImage}
                 src={`${config.assets}/brawlers/profiles/${BATTLE_INFO.brawlerID}.webp`}
                 alt={BATTLE_INFO.brawlerID} />
            <div className={styles.gameModeImage}>
              <img src={`${config.assets}/modes/icon/${typeArray[BATTLE_INFO.matchType]}.webp`}
                   alt={BATTLE_INFO.matchType} />
              <img src={`${config.assets}/modes/icon/${BATTLE_INFO.mode}.webp`}
                   alt={BATTLE_INFO.mode} />
            </div>
            <div>
              <div className={styles.battleSummaryTitle}>
                {BATTLE_INFO.mapName}
              </div>
              <div className={styles.battleSummarySubTitle}>
                {
                  dateDiff > 0 ? `${dateDiff} days ago` :
                    hourDiff > 0 ? `${hourDiff} hours ago` :
                      `${minuteDiff} minutes ago`
                }
              </div>
            </div>
          </div>
          <div className={styles.matchResult}>
            <div>
              {BATTLE_INFO.duration} seconds
            </div>
            <div>
              <div>
                {matchResults[BATTLE_INFO.matchResult + 1]}
              </div>
              <div>
                {BATTLE_INFO.matchChange > 0 ? `+${BATTLE_INFO.matchChange}` : BATTLE_INFO.matchChange}
              </div>
            </div>
          </div>
          <div className={styles.battleArrow}>
            {
              isChecked ? (
                <FontAwesomeIcon fontSize={13}
                                 icon={faArrowDown} />) : (
                <FontAwesomeIcon fontSize={13}
                                 icon={faArrowUp} />)
            }
          </div>
        </label>
      </div>
      <div className={styles.battleLogsDetail}
           style={{ display: isChecked ? 'flex' : 'none' }}>
        {
          matchTeams?.map((team: any[], index: number) => {
            const teamMatchResult = BATTLE_INFO.modeCode === 3 ?
              (team.find(item => item.playerID === BATTLE_INFO.userID) !== undefined ?
                BATTLE_INFO.matchResult + 1 :
                BATTLE_INFO.matchResult * -1 + 1) :
              matchTeams[index][0].matchResult + 1;

            return (
              <React.Fragment key={`${BATTLE_INFO.matchDate}_${index}`}>
                <div className={styles.battleLogsDetailTitle}>
                  {matchResults[teamMatchResult]}({BATTLE_INFO.modeCode === 3 ? (index === 0 ? '블루' : '레드') : `${index + 1}등`})
                </div>
                <div className={styles.battleLogsDetailContent}
                     style={{ backgroundColor: matchResultColors[teamMatchResult] }}>
                  {
                    team?.map(({ brawlerID, brawlerPower, brawlerTrophies, playerID, playerName, isStarPlayer }) => {
                      return (
                        <Link key={`${BATTLE_INFO.matchDate}_${index}_${playerID}`}
                              to={`/brawlian/${playerID.replace('#', '')}`}
                              onClick={() => {
                                setUser({
                                  userID: '', name: '', profile: '',
                                  lastBattleAt: undefined, updatedAt: undefined,
                                  crew: '', crewName: '',
                                });
                                setRetryCount(0);
                              }}>
                          <div>
                            <img className={styles.matchBrawler}
                                 src={`${config.assets}/brawlers/profiles/${brawlerID}.webp`}
                                 alt={'브롤러'} />
                          </div>
                          <div>
                            <div className={styles.matchTitle}>
                              {playerName}
                            </div>
                            <div className={styles.matchSubTitle}>
                              {isStarPlayer === 1 && (
                                <React.Fragment>
                                  <img
                                    src={`${config.assets}/game/icon/logo_star.webp`}
                                    alt={'게임모드'} />
                                  <span>Star Player</span>
                                </React.Fragment>
                              )}
                            </div>
                          </div>
                          <div>
                            <div className={styles.matchTitle}>
                              POWER {brawlerPower}
                            </div>
                            <div className={styles.matchSubTitle}>
                              {[2, 3].includes(BATTLE_INFO.matchType) ?
                                (
                                  <React.Fragment>
                                    <img
                                      src={`${config.assets}/rank/power_league/${Math.floor(brawlerTrophies / 3)}.webp`}
                                      alt={brawlerTrophies} />
                                    <span>{roman[(brawlerTrophies % 3)]}</span>
                                  </React.Fragment>
                                ) : (
                                  <React.Fragment>
                                    <img
                                      src={`${config.assets}/modes/icon/${typeArray[BATTLE_INFO.matchType]}.webp`}
                                      alt={'게임모드'} />
                                    <span>{brawlerTrophies}</span>
                                  </React.Fragment>
                                )
                              }
                            </div>
                          </div>
                        </Link>
                      );
                    })
                  }
                </div>
              </React.Fragment>
            );
          })
        }
      </div>
    </div>
  );
};

export default BattleLog;