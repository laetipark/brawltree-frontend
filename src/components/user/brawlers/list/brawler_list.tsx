import React, {useEffect, useState} from "react";
import axios from "axios";

import {Line} from "@nivo/line";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowDown, faArrowUp} from '@fortawesome/free-solid-svg-icons';

import config from "~/config/config";
import styles from "./brawler_list.module.scss";

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
        <div className={styles.brawlerWrapper}>
            <h1 className={styles.brawlerTitle}>브롤러 정보
                <span>({userBrawlers?.length}종)</span>
            </h1>
            <div className={styles.brawlerContent}>
                {
                    userBrawlers.map(brawler => {
                        const trophyChange = brawler.TROPHY_CUR - brawler.TROPHY_BGN > 0 ? `+${brawler.TROPHY_CUR - brawler.TROPHY_BGN}` : brawler.TROPHY_CUR - brawler.TROPHY_BGN;
                        const brawlerGadgets = userBrawlerItems?.filter(item => item.BRAWLER_ID === brawler.BRAWLER_ID && item.ITEM_K === "gadget");
                        const brawlerStarPowers = userBrawlerItems?.filter(item => item.BRAWLER_ID === brawler.BRAWLER_ID && item.ITEM_K === "starPower");
                        const brawlerGears = userBrawlerItems?.filter(item => item.BRAWLER_ID === brawler.BRAWLER_ID && item.ITEM_K === "gear");
                        const brawlerGraphData = [{
                            id: brawler.BRAWLER_ID,
                            color: "hsl(137, 70%, 50%)",
                            data: userBrawlerGraphs?.filter(item => item.BRAWLER_ID === brawler.BRAWLER_ID)
                        }];

                        return (
                            <div key={brawler.BRAWLER_ID}>
                                <input className={styles.brawlerItemButton}
                                       type={"checkbox"}
                                       id={`brawler_${brawler.BRAWLER_ID}`}
                                       name={`brawler_${brawler.BRAWLER_ID}`}
                                       checked={checkedList.includes(brawler.BRAWLER_ID)}
                                       onChange={(e) => checkHandler(e, brawler.BRAWLER_ID)}/>
                                <label htmlFor={`brawler_${brawler.BRAWLER_ID}`}
                                       className={styles.brawlerItem}>
                                    <img src={`/images/brawlers/pin/${brawler.BRAWLER_ID}.webp`}
                                         alt={brawler.BRAWLER_ID}/>
                                    <h5>{brawler.BRAWLER_NM}</h5>
                                    <div className={styles.brawlerTrophy}>
                                        <div>현재</div>
                                        <div>{brawler.TROPHY_CUR}개</div>
                                    </div>
                                    <div className={styles.brawlerTrophy}>
                                        <div>최고</div>
                                        <div>{brawler.TROPHY_HGH}개</div>
                                    </div>
                                    <div className={styles.brawlerTrophy}>
                                        <div>변화량</div>
                                        <div>{trophyChange}개</div>
                                    </div>
                                    {
                                        checkedList.includes(brawler.BRAWLER_ID) ? (
                                            <FontAwesomeIcon fontSize={10}
                                                             icon={faArrowDown}/>) : (
                                            <FontAwesomeIcon fontSize={10}
                                                             icon={faArrowUp}/>)
                                    }

                                </label>
                                <div className={styles.brawlerDetail}
                                     style={{display: checkedList.includes(brawler.BRAWLER_ID) ? "flex" : "none"}}>
                                    {
                                        brawlerGadgets && <div>
                                            {
                                                brawlerGadgets?.map(({ITEM_ID, ITEM_NM}) => (
                                                        <div>
                                                            <div>
                                                                <img src={`/images/brawlers/gadgets/${ITEM_ID}.webp`}
                                                                     alt={ITEM_ID}/>
                                                            </div>
                                                        </div>
                                                    )
                                                )
                                            }
                                        </div>
                                    }
                                    {
                                        brawlerStarPowers && <div>
                                            {
                                                brawlerStarPowers?.map(({ITEM_ID, ITEM_NM}) => (
                                                        <div>
                                                            <div>
                                                                <img src={`/images/brawlers/star_powers/${ITEM_ID}.webp`}
                                                                     alt={ITEM_ID}/>
                                                            </div>
                                                        </div>
                                                    )
                                                )
                                            }
                                        </div>
                                    }
                                    {
                                        brawlerGears && <div>
                                            {
                                                brawlerGears?.map(({ITEM_ID, ITEM_NM}) => (
                                                        <div>
                                                            <div>
                                                                <img src={`/images/brawlers/gears/${ITEM_ID}.webp`}
                                                                     alt={ITEM_ID}/>
                                                            </div>
                                                        </div>
                                                    )
                                                )
                                            }
                                        </div>
                                    }
                                    {
                                        brawlerGraphData[0].data.length !== 0 && <Line
                                            data={brawlerGraphData}
                                            width={250}
                                            height={200}
                                            margin={{top: 50, right: 110, bottom: 50, left: 60}}
                                            xScale={{type: 'point'}}
                                            yScale={{
                                                type: 'linear',
                                                min: 0,
                                                max: 100,
                                                stacked: true,
                                                reverse: false
                                            }}
                                            yFormat=" >-.2f"
                                            axisTop={null}
                                            axisRight={null}
                                            axisBottom={{
                                                tickSize: 5,
                                                tickPadding: 5,
                                                tickRotation: 0,
                                                legend: 'transportation',
                                                legendOffset: 36,
                                                legendPosition: 'middle'
                                            }}
                                            axisLeft={{
                                                tickSize: 5,
                                                tickPadding: 5,
                                                tickRotation: 0,
                                                legend: 'count',
                                                legendOffset: -40,
                                                legendPosition: 'middle'
                                            }}
                                            pointSize={10}
                                            pointColor={{theme: 'background'}}
                                            pointBorderWidth={2}
                                            pointBorderColor={{from: 'serieColor'}}
                                            pointLabelYOffset={-12}
                                            useMesh={true}
                                            animate={false}></Line>
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
};

export default UserBrawlerList;