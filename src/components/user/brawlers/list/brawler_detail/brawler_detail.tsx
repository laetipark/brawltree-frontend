import ItemTooltip from "~/components/items/item_info/item_info";

import config from "~/config/config";

import styles from "./brawler_detail.module.scss";

const BrawlerDetail = ({
                           BRAWLER_ID, BRAWLER_NM,
                           MATCH_PCK_R_PL, MATCH_PCK_R_TL, MATCH_VIC_R_PL, MATCH_VIC_R_TL,
                           TROPHY_RNK, userBrawlerItems
                       }) => {

    const brawlerGadgets = userBrawlerItems?.filter(({
                                                         BRAWLER_ID: item, ITEM_K
                                                     }) => item === BRAWLER_ID && ITEM_K === "gadget");
    const brawlerStarPowers = userBrawlerItems?.filter(({
                                                            BRAWLER_ID: item, ITEM_K
                                                        }) => item === BRAWLER_ID && ITEM_K === "starPower");
    const brawlerGears = userBrawlerItems?.filter(({
                                                       BRAWLER_ID: item, ITEM_K
                                                   }) => item === BRAWLER_ID && ITEM_K === "gear");

    return (
        <div className={styles.brawlerDetailInfo}>
            <div>
                <img src={`${config.assets}/brawlers/profiles/${BRAWLER_ID}.webp`}
                     alt={"브롤러"}/>
                <div>
                    <img className={styles.brawlerModeImage}
                         src={`${config.assets}/modes/icon/trophyLeague.webp`}
                         alt={"브롤러"}/>
                    <span>Pick</span>
                    <span>{MATCH_PCK_R_TL}%</span>
                </div>
                <div>
                    <img className={styles.brawlerModeImage}
                         src={`${config.assets}/modes/icon/trophyLeague.webp`}
                         alt={"브롤러"}/>
                    <span>Win</span>
                    <span>{MATCH_VIC_R_TL}%</span>
                </div>
                <div>
                    <img className={styles.brawlerModeImage}
                         src={`${config.assets}/modes/icon/powerLeague.webp`}
                         alt={"브롤러"}/>
                    <span>Pick</span>
                    <span>{MATCH_PCK_R_PL}%</span>
                </div>
                <div>
                    <img className={styles.brawlerModeImage}
                         src={`${config.assets}/modes/icon/powerLeague.webp`}
                         alt={"브롤러"}/>
                    <span>Win</span>
                    <span>{MATCH_VIC_R_PL}%</span>
                </div>
            </div>
            <div>
                <div>
                    <img className={styles.brawlerRankImage}
                         src={`${config.assets}/rank/trophy_league/${TROPHY_RNK}.webp`}
                         alt={"브롤러"}/>
                    <span className={styles.brawlerName}>{BRAWLER_NM}</span>
                </div>
                {
                    brawlerGadgets && <div>
                        {
                            brawlerGadgets?.map(({ITEM_ID, ITEM_NM}) => (
                                    <ItemTooltip key={ITEM_ID}
                                                 ITEM_ID={ITEM_ID}
                                                 ITEM_NM={ITEM_NM}
                                                 ITEM_K={"gadget"}/>
                                )
                            )
                        }
                    </div>
                }
                {
                    brawlerStarPowers && <div>
                        {
                            brawlerStarPowers?.map(({ITEM_ID, ITEM_NM}) => (
                                    <ItemTooltip key={ITEM_ID}
                                                 ITEM_ID={ITEM_ID}
                                                 ITEM_NM={ITEM_NM}
                                                 ITEM_K={"starPower"}/>
                                )
                            )
                        }
                    </div>
                }
                {
                    brawlerGears && <div>
                        {
                            brawlerGears?.map(({ITEM_ID, ITEM_NM}) => (
                                    <ItemTooltip key={ITEM_ID}
                                                 ITEM_ID={ITEM_ID}
                                                 ITEM_NM={ITEM_NM}
                                                 ITEM_K={"gear"}/>
                                )
                            )
                        }
                    </div>
                }
            </div>
        </div>
    );
};

export default BrawlerDetail;