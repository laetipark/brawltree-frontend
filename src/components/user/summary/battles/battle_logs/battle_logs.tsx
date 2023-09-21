import axios from "axios";

import React, {useEffect, useState} from "react";
import {Pie} from "@nivo/pie";

import BattleLog from "~/components/user/summary/battles/battle_logs/battle_log/battle_log";

import config from "~/config/config";
import styles from "./battle_logs.module.scss";

const UserBattleLogs = ({id, type, mode}) => {
    const [userRecentBattles, setUserRecentBattles] = useState([]);
    const [userRecentBrawlers, setUserRecentBrawlers] = useState([]);
    const [userBattles, setUserBattles] = useState([]);

    const matchCount = userRecentBattles.length;
    const {length: victoryCount} = userRecentBattles.filter(({MATCH_RES}) => MATCH_RES === -1);
    const {length: drawCount} = userRecentBattles.filter(({MATCH_RES}) => MATCH_RES === 0);
    const {length: defeatCount} = userRecentBattles.filter(({MATCH_RES}) => MATCH_RES === 1);

    const {length: artilleryCount} = userRecentBattles.filter(({BRAWLER_CL}) => BRAWLER_CL === "Artillery");
    const {length: assassinCount} = userRecentBattles.filter(({BRAWLER_CL}) => BRAWLER_CL === "Assassin");
    const {length: controllerCount} = userRecentBattles.filter(({BRAWLER_CL}) => BRAWLER_CL === "Controller");
    const {length: damageCount} = userRecentBattles.filter(({BRAWLER_CL}) => BRAWLER_CL === "Damage Dealer");
    const {length: marksmanCount} = userRecentBattles.filter(({BRAWLER_CL}) => BRAWLER_CL === "Marksman");
    const {length: supportCount} = userRecentBattles.filter(({BRAWLER_CL}) => BRAWLER_CL === "Support");
    const {length: tankCount} = userRecentBattles.filter(({BRAWLER_CL}) => BRAWLER_CL === "Tank");

    const battleData = [
        {
            id: "Defeat",
            label: "Defeat",
            value: defeatCount,
            color: "hsl(351,57%,60%)"
        },
        {
            id: "Draw",
            label: "Draw",
            value: drawCount,
            color: "hsl(224,39%,52%)"
        },
        {
            id: "Victory",
            label: "Victory",
            value: victoryCount,
            color: "hsl(132,29%,50%)"
        }
    ];

    const brawlerData = [
        {
            id: "Artillery",
            label: "Artillery",
            value: (artilleryCount / matchCount).toFixed(3),
        },
        {
            id: "Assassin",
            label: "Assassin",
            value: (assassinCount / matchCount).toFixed(3),
        },
        {
            id: "Controller",
            label: "Controller",
            value: (controllerCount / matchCount).toFixed(3),
        },
        {
            id: "Damage Dealer",
            label: "Damage Dealer",
            value: (damageCount / matchCount).toFixed(3),
        },
        {
            id: "Marksman",
            label: "Marksman",
            value: (marksmanCount / matchCount).toFixed(3),
        },
        {
            id: "Support",
            label: "Support",
            value: (supportCount / matchCount).toFixed(3),
        },
        {
            id: "Tank",
            label: "Tank",
            value: (tankCount / matchCount).toFixed(3),
        }
    ];

    useEffect(() => {
        axios.get(`${config.url}/brawlian/${id}/battles/logs`, {
            params: {
                type: type,
                mode: mode
            },
        }).then(async (result) => {
            setUserRecentBattles(result.data.userRecentBattles);
            setUserRecentBrawlers(result.data.userRecentBrawlers);
            setUserBattles(result.data.userBattles);
        });
    }, [id, type, mode]);

    return (
        <div className={styles.battleLogsWrapper}>
            <div className={styles.battleLogsTitle}>
                <div className={styles.battleLogsRecordGraph}>
                    <div>
                        <div className={styles.battleLogsText}>
                            <span>{matchCount}전</span>
                            <span style={{color: "#5AA469"}}>{victoryCount}승</span>
                            <span style={{color: "#556FB5"}}>{drawCount}무</span>
                            <span style={{color: "#D35D6E"}}>{defeatCount}패</span>
                            <span>(최근 30게임)</span>
                        </div>
                        <Pie data={battleData}
                             width={280}
                             height={120}
                             margin={{top: 4, bottom: 4, right: 120}}
                             startAngle={-180}
                             endAngle={180}
                             innerRadius={0.4}
                             colors={{scheme: 'set1'}}
                             enableArcLinkLabels={false}
                             arcLabelsSkipAngle={10}
                             isInteractive={false}
                             animate={false}
                             legends={[
                                 {
                                     anchor: 'right',
                                     direction: 'column',
                                     justify: false,
                                     translateX: 120,
                                     translateY: 0,
                                     itemsSpacing: 10,
                                     itemWidth: 120,
                                     itemHeight: 8,
                                     itemTextColor: '#111',
                                     itemDirection: 'left-to-right',
                                     itemOpacity: 1,
                                     symbolSize: 12,
                                     symbolShape: 'circle',
                                 }
                             ]}
                        />
                    </div>
                    <div>
                        <div className={styles.battleLogsText}>
                            <span>사용한 브롤러 역할군</span>
                        </div>
                        <Pie data={brawlerData}
                             width={280}
                             height={120}
                             margin={{top: 4, bottom: 4, right: 120}}
                             valueFormat=" >-~%"
                             sortByValue={true}
                             innerRadius={0.4}
                             colors={{scheme: 'set3'}}
                             enableArcLinkLabels={false}
                             arcLabelsSkipAngle={10}
                             isInteractive={false}
                             animate={false}
                             legends={[
                                 {
                                     anchor: 'right',
                                     direction: 'column',
                                     justify: false,
                                     translateX: 120,
                                     translateY: 0,
                                     itemsSpacing: 10,
                                     itemWidth: 120,
                                     itemHeight: 8,
                                     itemTextColor: '#111',
                                     itemDirection: 'left-to-right',
                                     itemOpacity: 1,
                                     symbolSize: 12,
                                     symbolShape: 'circle',
                                 }
                             ]}
                        />
                    </div>
                </div>
                <div className={styles.battleLogsBrawlerRecord}>
                    <div className={styles.battleLogsText}>
                        <span>사용한 브롤러 전투 기록</span>
                    </div>
                    {userRecentBrawlers.map(({BRAWLER_ID, BRAWLER_NM, MATCH_CNT_TOT, MATCH_CNT_RES}) => (
                        <div key={BRAWLER_ID}
                             className={styles.battleLogsBrawlers}>
                            <img src={`https://cdn.brawltree.me/brawlers/pins/${BRAWLER_ID}.webp`}
                                 alt={"브롤러"}/>
                            <div>
                                <div className={styles.brawlerName}>
                                    {BRAWLER_NM}
                                </div>
                                <div className={styles.brawlerGame}>
                                    {MATCH_CNT_TOT} 게임
                                </div>
                            </div>
                            <span style={{color: "#5AA469"}}>{MATCH_CNT_RES["-1"]}승</span>
                            <span style={{color: "#556FB5"}}>{MATCH_CNT_RES["0"] || 0}무</span>
                            <span style={{color: "#D35D6E"}}>{MATCH_CNT_RES["1"] || 0}패</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.battleLogsContent}>
                {
                    userBattles.map(({BATTLE_INFO, BATTLE_PLAYERS}) => {
                        return (
                            <BattleLog key={BATTLE_INFO.MATCH_DT}
                                       BATTLE_INFO={BATTLE_INFO}
                                       BATTLE_PLAYERS={BATTLE_PLAYERS}/>
                        );
                    })
                }
            </div>
        </div>
    );
};

export default UserBattleLogs;