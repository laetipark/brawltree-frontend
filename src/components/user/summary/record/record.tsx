import {useEffect, useState} from "react";
import axios from "axios";

import TableHorizontal from "~/components/table/horizontal/table";

import config from "~/config/config";
import styled from "./record.module.scss";

const roman = ["I", "II", "III"];

const UserRecord = ({id}) => {
    const [userProfile, setUserProfile] = useState({
        TROPHY_CUR: 0, TROPHY_CHG: 0, TROPHY_HGH: 0,
        VICTORY_TRP: 0, VICTORY_DUO: 0,
        BRAWLER_RNK_25: 0, BRAWLER_RNK_30: 0, BRAWLER_RNK_35: 0,
        PL_SL_CUR: 0, PL_SL_HGH: 0, PL_TM_CUR: 0, PL_TM_HGH: 0
    });

    useEffect(() => {
        axios.get(`${config.url}/brawlian/${id}/profile`, {})
            .then(async (result) => {
                setUserProfile(result.data.userProfile);
            });
    }, [id]);

    return (
        <div className={styled.recordWrapper}>
            <TableHorizontal
                headRow={"현재 기록"}
                bodyRowContents={[
                    ["현재 트로피", `${userProfile.TROPHY_CUR}개`],
                    ["트로피 변화량", userProfile.TROPHY_CHG > 0 ? `+${userProfile.TROPHY_CHG}` : userProfile.TROPHY_CHG],
                    ["솔로 리그 현재 랭크", roman[(userProfile.PL_SL_CUR % 3)]],
                    ["팀 리그 현재 랭크", roman[(userProfile.PL_TM_CUR % 3)]],
                    ["소속 클럽", "BLOSSOM"]
                ]}
                bodyRowImages={[
                    [null, null],
                    [null, null],
                    [null, `/images/rank/power_league/${Math.floor(userProfile.PL_SL_CUR / 3)}.webp`],
                    [null, `/images/rank/power_league/${Math.floor(userProfile.PL_TM_CUR / 3)}.webp`],
                    [null, null]
                ]}
            />
            <TableHorizontal
                headRow={"누적 기록"}
                bodyRowContents={[
                    ["최고 트로피", `${userProfile.TROPHY_HGH}개`],
                    ["3vs3 승리", `${userProfile.VICTORY_TRP}회`],
                    ["듀오 승리", `${userProfile.VICTORY_DUO}회`],
                    ["25랭크 개수", `${userProfile.BRAWLER_RNK_25}개`],
                    ["30랭크 개수", `${userProfile.BRAWLER_RNK_30}개`],
                    ["35랭크 개수", `${userProfile.BRAWLER_RNK_35}개`],
                    ["솔로 리그 최고 랭크", roman[(userProfile.PL_SL_HGH % 3)]],
                    ["팀 리그 최고 랭크", roman[(userProfile.PL_TM_HGH % 3)]]
                ]}
                bodyRowImages={[
                    [null, null],
                    [null, null],
                    [null, null],
                    [null, null],
                    [null, null],
                    [null, null],
                    [null, `/images/rank/power_league/${Math.floor(userProfile.PL_SL_HGH / 3)}.webp`],
                    [null, `/images/rank/power_league/${Math.floor(userProfile.PL_TM_HGH / 3)}.webp`]
                ]}
            />
        </div>
    );
};

export default UserRecord;