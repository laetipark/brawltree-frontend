import {TimeRange} from "@nivo/calendar";
import styles from "./battle_stats.module.scss";

const UserBattleStats = ({userBattles, userBrawlers, season}) => {
    const colors = ['#9DC08B', '#609966', '#557153', '#40513B'];

    return (
        <div className={styles.battleStatsWrapper}>
            <div>
                {
                    userBattles[0] &&
                    <TimeRange
                        data={userBattles[0]}
                        from={season.SEASON_BGN_DT?.slice(0, 10) || "1998-02-05"}
                        to={season.SEASON_END_DT?.slice(0, 10) || "1998-02-05"}
                        width={320}
                        height={200}
                        emptyColor={"#DDDDDD"}
                        align={"center"}
                        minValue={1}
                        maxValue={80}
                        colors={colors}
                        margin={{top: 36, bottom: 16, left: 32}}
                        weekdayTicks={[1, 5]}
                        weekdayLegendOffset={44}
                        dayBorderWidth={2}
                        dayBorderColor={"#EEEEEE"}
                        tooltip={n => {
                            const matchChange = userBattles[1].find(battle => battle.day === n.day).value;
                            return (
                                <div className={styles.calendarLegend}>
                                            <span>
                                                {n.value} battles({matchChange > 0 ? `+${matchChange}` : matchChange})
                                            </span>
                                    <span className={styles.battleDate}>
                                                on {n.day}
                                            </span>
                                </div>
                            )
                        }}
                    />
                }
            </div>
            {
                userBrawlers &&
                <div className={styles.brawlerPicksWrapper}>
                    {
                        userBrawlers.map(brawler => {
                            return (
                                <div>
                                    <img src={`/images/brawlers/pin/${brawler.BRAWLER_ID}.webp`}
                                         alt={'브롤러 프로필'}/>
                                    <div className={styles.brawlerPicksContent}>
                                        <div>
                                            {brawler.BRAWLER_NM}
                                        </div>
                                        <div>
                                            {brawler.MATCH_CNT} 게임
                                        </div>
                                    </div>
                                    <div className={styles.brawlerPicksContent}>
                                        <div>
                                            Pick
                                        </div>
                                        <div>
                                            {brawler.MATCH_PCK_R}%
                                        </div>
                                    </div>
                                    <div className={styles.brawlerPicksContent}>
                                        <div>
                                            Win
                                        </div>
                                        <div>
                                            {brawler.MATCH_VIC_R}%
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            }
        </div>
    );
};

export default UserBattleStats;