import {TimeRange} from '@nivo/calendar'
import axios from "axios";

import {useEffect, useState} from "react";
import UserTypeMenu from "~/components/user/summary/battles/type_menu/type_menu";
import UserBattleStats from "~/components/user/summary/battles/battle_stats/battle_stats";
import UserDailyBattles from "~/components/user/summary/battles/daily_battles/daily_battles";

import config from "~/config/config";
import styles from "./battles.module.scss";

const UserBattles = ({id}) => {
    const [type, setType] = useState("all");
    const [userBattles, setUserBattles] = useState([[], []]);
    const [userBrawlers, setUserBrawlers] = useState([]);
    const [userDailyBattles, setUserDailyBattles] = useState([]);
    const [season, setSeason] = useState({});


    const handleRadioButton = (e) => {
        setType(e.target.name);
    };

    useEffect(() => {
        axios.get(`${config.url}/brawlian/${id}/battles/${type}/summary`, {})
            .then(async (result) => {
                setUserBattles(result.data.userBattles);
                setUserBrawlers(result.data.userBrawlers);
                setUserDailyBattles(result.data.userDailyBattles);
                setSeason(result.data.season);
            });
    }, [id, type]);

    const battlesCounts = userBattles[0].map(battle => parseInt(battle.value)).reduce((total: number, value: number) => {
        return total + value
    }, 0);

    return (
        <div className={styles.battlesWrapper}>
            <div className={styles.battleTitle}>
                전투 기록({battlesCounts}경기)
            </div>
            <div className={styles.battleContent}>
                <UserTypeMenu type={type}
                              handleRadioButton={handleRadioButton}/>
                <UserBattleStats userBattles={userBattles}
                                 userBrawlers={userBrawlers}
                                 season={season}/>
                <UserDailyBattles userDailyBattles={userDailyBattles}/>
                <a className={styles.battleButton}>
                    전투 기록 확인
                </a>
            </div>
        </div>
    );
};

export default UserBattles;