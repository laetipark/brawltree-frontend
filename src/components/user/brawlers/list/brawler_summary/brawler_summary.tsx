import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDown, faArrowUp} from "@fortawesome/free-solid-svg-icons";

import styles from "./brawler_summary.module.scss";

const BrawlerSummary = ({
                            BRAWLER_ID, BRAWLER_NM,
                            TROPHY_BGN, TROPHY_CUR, TROPHY_HGH,
                            checkedList, checkHandler
                        }) => {
    const trophyChange = TROPHY_CUR - TROPHY_BGN > 0 ? `+${TROPHY_CUR - TROPHY_BGN}` : TROPHY_CUR - TROPHY_BGN;

    return (
        <div key={BRAWLER_ID}>
            <input className={styles.brawlerSummaryButton}
                   type={"checkbox"}
                   id={`brawler_${BRAWLER_ID}`}
                   name={`brawler_${BRAWLER_ID}`}
                   checked={checkedList.includes(BRAWLER_ID)}
                   onChange={(e) => checkHandler(e, BRAWLER_ID)}/>
            <label htmlFor={`brawler_${BRAWLER_ID}`}
                   className={styles.brawlerSummary}>
                <img src={`/images/brawlers/profile/${BRAWLER_ID}.webp`}
                     alt={BRAWLER_ID}/>
                <h4>{BRAWLER_NM}</h4>
                <div>
                    <img src={`/images/modes/icon/trophyLeague.webp`}
                         alt={"브롤러"}/>
                    <div className={styles.brawlerTrophy}>
                        <div>현재</div>
                        <div>{TROPHY_CUR}개</div>
                    </div>
                    <div className={styles.brawlerTrophy}>
                        <div>최고</div>
                        <div>{TROPHY_HGH}개</div>
                    </div>
                    <div className={styles.brawlerTrophy}>
                        <div>변화량</div>
                        <div>{trophyChange}개</div>
                    </div>
                </div>
                {
                    checkedList.includes(BRAWLER_ID) ? (
                        <FontAwesomeIcon fontSize={10}
                                         icon={faArrowDown}/>) : (
                        <FontAwesomeIcon fontSize={10}
                                         icon={faArrowUp}/>)
                }
            </label>
            <div className={styles.brawlerDetail}
                 style={{display: checkedList.includes(BRAWLER_ID) ? "flex" : "none"}}>

            </div>
        </div>
    );
};

export default BrawlerSummary;