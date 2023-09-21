import axios from "axios";
import React, {useState, useEffect} from "react";

import BrawlerSummary from "~/components/user/brawlers/list/brawler_summary/brawler_summary";
import BrawlerDetail from "~/components/user/brawlers/list/brawler_detail/brawler_detail";

import config from "~/config/config";
import styles from "./brawler_list.module.scss";
import {Line} from "@nivo/line";

const UserBrawlerList = ({id}) => {
    const [userBrawlers, setUserBrawlers] = useState([]);
    const [userBrawlerItems, setUserBrawlerItems] = useState([]);
    const [userBrawlerGraphs, setUserBrawlerGraphs] = useState([]);

    const [checkedList, setCheckedList] = useState<string[]>([]);
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        axios.get(`${config.url}/brawlian/${id}/brawlers`, {})
            .then(async (result) => {
                setUserBrawlers(result.data.userBrawlers);
                setUserBrawlerItems(result.data.userBrawlerItems);
                setUserBrawlerGraphs(result.data.userBrawlerGraphs);
            });
    }, [id]);

    const checkedItemHandler = (value: string, isChecked: boolean) => {
        if (isChecked) {
            setCheckedList((prev) => [...prev, value]);
        }

        if (!isChecked && checkedList.includes(value)) {
            setCheckedList(checkedList.filter((item) => item !== value));
        }
    };

    const checkHandler = (e: React.ChangeEvent<HTMLInputElement>, value: string) => {
        setIsChecked(!isChecked);
        checkedItemHandler(value, e.target.checked);
    };

    return (
        <div className={styles.brawlersWrapper}>
            <h1 className={styles.brawlersTitle}>브롤러 정보
                <span>({userBrawlers?.length}종)</span>
            </h1>
            <div className={styles.brawlersContent}>
                {
                    userBrawlers.map(({
                                          BRAWLER_ID,
                                          BRAWLER_NM,
                                          BRAWLER_RRT,
                                          MATCH_PCK_R_PL,
                                          MATCH_PCK_R_TL,
                                          MATCH_VIC_R_PL,
                                          MATCH_VIC_R_TL,
                                          TROPHY_BGN,
                                          TROPHY_CUR,
                                          TROPHY_HGH,
                                          TROPHY_RNK
                                      }) => {
                        const brawlerData = userBrawlerGraphs?.filter(item => item.BRAWLER_ID === BRAWLER_ID);
                        const brawlerGraphData = [{
                            id: BRAWLER_ID,
                            color: "hsl(137, 70%, 50%)",
                            data: brawlerData
                        }];
                        /*
                            background-color: ${props => (BRAWLER_RRT === "기본" ? "#94D7F4" :
                                    BRAWLER_RRT === "희귀" ? "#2EDD1C" :
                                            BRAWLER_RRT === "초희귀" ? "#0087FA" :
                                                    BRAWLER_RRT === "영웅" ? "#B116ED" :
                                                            BRAWLER_RRT === "신화" ? "#D6001A" :
                                                                    BRAWLER_RRT === "전설" ? "#FFF11E" : "")};
                            background-image: linear-gradient(${props => (BRAWLER_RRT === "크로마틱" ? "45deg, purple 40%, red 50%, yellow 60%" : "")});
                            */
                        return (
                            <div key={BRAWLER_ID}>
                                <BrawlerSummary BRAWLER_ID={BRAWLER_ID}
                                                BRAWLER_NM={BRAWLER_NM}
                                                TROPHY_BGN={TROPHY_BGN}
                                                TROPHY_CUR={TROPHY_CUR}
                                                TROPHY_HGH={TROPHY_HGH}
                                                checkedList={checkedList}
                                                checkHandler={checkHandler}
                                />
                                <div className={styles.brawlerDetail}
                                     style={{
                                         display: checkedList.includes(BRAWLER_ID) ? "flex" : "none",
                                         backgroundColor: BRAWLER_RRT === "Trophy Road" ? "#CDFCF6" :
                                             BRAWLER_RRT === "Rare" ? "#C3EDC0" :
                                                 BRAWLER_RRT === "Super Rare" ? "#BCCEF8" :
                                                     BRAWLER_RRT === "Epic" ? "#B2A4FF" :
                                                         BRAWLER_RRT === "Mythic" ? "#FFB4B4" :
                                                             BRAWLER_RRT === "Legendary" ? "#FDF7C3" : "",
                                         backgroundImage: `linear-gradient(${BRAWLER_RRT === "Chromatic" ? "45deg, #B2A4FF 20%, #FFB4B4 50%, #FDF7C3 80%" : ""})`
                                     }}>
                                    <BrawlerDetail BRAWLER_ID={BRAWLER_ID}
                                                   BRAWLER_NM={BRAWLER_NM}
                                                   MATCH_PCK_R_PL={MATCH_PCK_R_PL}
                                                   MATCH_PCK_R_TL={MATCH_PCK_R_TL}
                                                   MATCH_VIC_R_PL={MATCH_VIC_R_PL}
                                                   MATCH_VIC_R_TL={MATCH_VIC_R_TL}
                                                   TROPHY_RNK={TROPHY_RNK}
                                                   userBrawlerItems={userBrawlerItems}/>
                                    {
                                        brawlerGraphData[0].data.length > 1 && <Line
                                            data={brawlerGraphData}
                                            width={360}
                                            height={280}
                                            margin={{top: 20, right: 30, bottom: 48, left: 50}}
                                            yFormat=" >-.0f"
                                            xScale={{type: "point"}}
                                            yScale={{
                                                type: "linear",
                                                min: brawlerData.map(item => item.y).reduce((a, b) => {
                                                    return Math.min(a, b);
                                                }) - 40,
                                                max: brawlerData.map(item => item.y).reduce((a, b) => {
                                                    return Math.max(a, b);
                                                }) + 40,
                                                stacked: true,
                                                reverse: false
                                            }}
                                            axisTop={null}
                                            axisRight={null}
                                            axisBottom={{
                                                tickSize: 5,
                                                tickPadding: 5,
                                                tickRotation: 0,
                                                legend: "Date",
                                                legendOffset: 36,
                                                legendPosition: "middle"
                                            }}
                                            axisLeft={{
                                                tickSize: 5,
                                                tickPadding: 5,
                                                tickRotation: 0,
                                                legendOffset: -44,
                                                legendPosition: "middle"
                                            }}
                                            colors={{scheme: "category10"}}
                                            enableArea={true}
                                            areaBaselineValue={brawlerData.map(item => item.y).reduce((a, b) => {
                                                return Math.min(a, b);
                                            }) - 40}
                                            pointSize={8}
                                            pointColor={{from: "color"}}
                                            pointBorderWidth={2}
                                            pointBorderColor={{from: "serieColor"}}
                                            pointLabelYOffset={-12}
                                            useMesh={true}
                                            animate={false}></Line>
                                    }
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
};

export default UserBrawlerList;