import moment from "moment";

import styles from "./daily_battles.module.scss";

const UserDailyBattles = ({userDailyBattles}) => {
    return (
        <div className={styles.dailyBattlesWrapper}>

            <div className={styles.dailyBattlesContent}>
                {
                    userDailyBattles.map(({BRAWLER_ID, MAP_MD, MATCH_DT, MATCH_RES}) => {
                        const dateDiff = moment().startOf("day").diff(moment(MATCH_DT), "days");

                        return (
                            <div className={styles.battleSummaryBox}
                                 key={MATCH_DT}
                                 style={{
                                     backgroundColor: MATCH_RES === -1 ? "#5AA469" :
                                         MATCH_RES === 0 ? "#556FB5" : "#D35D6E"
                                 }}>
                                <img className={styles.gameModeImage}
                                     src={`/images/modes/icon/${MAP_MD}.webp`}
                                     alt={"게임모드"}/>
                                <img className={styles.brawlerImage}
                                     src={`/images/brawlers/pin/${BRAWLER_ID}.webp`}
                                     alt={"브롤러"}/>
                                <div className={styles.dateText}>
                                    {dateDiff > 0 ? `${dateDiff} days ago` : "Today"}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default UserDailyBattles;