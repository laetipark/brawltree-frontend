import React, {useContext, useState} from "react";
import {Link} from "react-router-dom";
import moment from "moment/moment";

import UserContext from "~/context/user_context";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDown, faArrowUp} from "@fortawesome/free-solid-svg-icons";

import styles from "./battle_log.module.scss";

const matchResults = ["Victory", "Draw", "Defeat"];
const matchResultColors = ["#9ED2BE", "#9EA1D4", "#FD8A8A"];
const typeArray = {
    0: "trophyLeague",
    2: "powerLeagueSolo",
    3: "powerLeagueTeam",
    4: "challenge",
    5: "challenge",
    6: "clubLeague"
};
const roman = ["I", "II", "III"];

const BattleLog = ({BATTLE_INFO, BATTLE_PLAYERS}) => {
    const context = useContext(UserContext);
    const {setUser, setRetryCount} = context

    const [isChecked, setIsChecked] = useState(false);

    const dateDiff = moment.duration(moment().diff(moment(BATTLE_INFO.MATCH_DT))).days();
    const hourDiff = moment.duration(moment().diff(moment(BATTLE_INFO.MATCH_DT))).hours();
    const minuteDiff = moment.duration(moment().diff(moment(BATTLE_INFO.MATCH_DT))).minutes();
    const matchTeams = BATTLE_PLAYERS.reduce(
        (result: any[], current: {
            PLAYER_TM_NO: number;
        }) => {
            result[current.PLAYER_TM_NO] = result[current.PLAYER_TM_NO] || [];
            result[current.PLAYER_TM_NO].push(current);
            return result;
        }, []);

    const checkHandler = () => {
        setIsChecked(!isChecked);
    };

    return (
        <div>
            <div>
                <input className={styles.battleSummaryButton}
                       type={"checkbox"}
                       id={BATTLE_INFO.MATCH_DT}
                       name={BATTLE_INFO.MATCH_DT}
                       checked={isChecked}
                       onChange={checkHandler}/>
                <label htmlFor={BATTLE_INFO.MATCH_DT}
                       className={styles.battleSummary}
                       style={{
                           backgroundColor: matchResultColors[BATTLE_INFO.MATCH_RES + 1]
                       }}>
                    <div className={styles.matchInfo}>
                        <img className={styles.brawlerImage}
                             src={`/images/brawlers/profile/${BATTLE_INFO.BRAWLER_ID}.webp`}
                             alt={"브롤러"}/>
                        <div className={styles.gameModeImage}>
                            <img src={`/images/modes/icon/${typeArray[BATTLE_INFO.MATCH_TYP]}.webp`}
                                 alt={"게임모드"}/>
                            <img src={`/images/modes/icon/${BATTLE_INFO.MAP_MD}.webp`}
                                 alt={"게임모드"}/>
                        </div>
                        <div>
                            <div className={styles.battleSummaryTitle}>
                                {BATTLE_INFO.MAP_NM}
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
                            {BATTLE_INFO.MATCH_DUR} seconds
                        </div>
                        <div>
                            <div>
                                {matchResults[BATTLE_INFO.MATCH_RES + 1]}
                            </div>
                            <div>
                                {BATTLE_INFO.MATCH_CHG > 0 ? `+${BATTLE_INFO.MATCH_CHG}` : BATTLE_INFO.MATCH_CHG}
                            </div>
                        </div>
                    </div>
                    <div className={styles.battleArrow}>
                        {
                            isChecked ? (
                                <FontAwesomeIcon fontSize={13}
                                                 icon={faArrowDown}/>) : (
                                <FontAwesomeIcon fontSize={13}
                                                 icon={faArrowUp}/>)
                        }
                    </div>
                </label>
            </div>
            <div className={styles.battleLogsDetail}
                 style={{display: isChecked ? "flex" : "none"}}>
                {
                    matchTeams.map((team: any[], index: number) => {
                        const teamMatchResult = BATTLE_INFO.MAP_MD_CD === 3 ?
                            (team.find(item => item.PLAYER_ID === BATTLE_INFO.USER_ID) !== undefined ?
                                BATTLE_INFO.MATCH_RES + 1 :
                                BATTLE_INFO.MATCH_RES * -1 + 1) :
                            matchTeams[index][0].MATCH_RES + 1;

                        return (
                            <React.Fragment key={`${BATTLE_INFO.MATCH_DT}_${index}`}>
                                <div className={styles.battleLogsDetailTitle}>
                                    {matchResults[teamMatchResult]}({BATTLE_INFO.MAP_MD_CD === 3 ? (index === 0 ? "블루" : "레드") : `${index + 1}등`})
                                </div>
                                <div className={styles.battleLogsDetailContent}
                                     style={{backgroundColor: matchResultColors[teamMatchResult]}}>
                                    {
                                        team.map(({BRAWLER_ID, BRAWLER_PWR, BRAWLER_TRP, PLAYER_ID, PLAYER_NM, PLAYER_SP_BOOL}) => {
                                            return (
                                                <Link key={`${BATTLE_INFO.MATCH_DT}_${index}_${PLAYER_ID}`}
                                                      to={`/brawlian/${PLAYER_ID.replace("#", "")}`}
                                                      onClick={() => {
                                                          setUser({
                                                              USER_ID: "", USER_NM: "", USER_PRFL: "",
                                                              USER_LST_BT: undefined, USER_LST_CK: undefined,
                                                              USER_CR: "", USER_CR_NM: "",
                                                          });
                                                          setRetryCount(0);
                                                      }}>
                                                    <div>
                                                        <img className={styles.matchBrawler}
                                                             src={`/images/brawlers/profile/${BRAWLER_ID}.webp`}
                                                             alt={"브롤러"}/>
                                                    </div>
                                                    <div>
                                                        <div className={styles.matchTitle}>
                                                            {PLAYER_NM}
                                                        </div>
                                                        <div className={styles.matchSubTitle}>
                                                            {PLAYER_SP_BOOL === 1 && (
                                                                <React.Fragment>
                                                                    <img
                                                                        src={`/images/game/icon/logo_star.webp`}
                                                                        alt={"게임모드"}/>
                                                                    <span>Star Player</span>
                                                                </React.Fragment>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className={styles.matchTitle}>
                                                            POWER {BRAWLER_PWR}
                                                        </div>
                                                        <div className={styles.matchSubTitle}>
                                                            {[2, 3].includes(BATTLE_INFO.MATCH_TYP) ?
                                                                (
                                                                    <React.Fragment>
                                                                        <img
                                                                            src={`/images/rank/power_league/${Math.floor(BRAWLER_TRP / 3)}.webp`}
                                                                            alt={BRAWLER_TRP}/>
                                                                        <span>{roman[(BRAWLER_TRP % 3)]}</span>
                                                                    </React.Fragment>
                                                                ) : (
                                                                    <React.Fragment>
                                                                        <img
                                                                            src={`/images/modes/icon/${typeArray[BATTLE_INFO.MATCH_TYP]}.webp`}
                                                                            alt={"게임모드"}/>
                                                                        <span>{BRAWLER_TRP}</span>
                                                                    </React.Fragment>
                                                                )
                                                            }
                                                        </div>
                                                    </div>
                                                </Link>
                                            )
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