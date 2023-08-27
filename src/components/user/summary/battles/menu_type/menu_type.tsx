import {useRef} from "react";
import useWindowClick from "~/hooks/use_window_click";

import styles from "./menu_type.module.scss";

const image = {
    7: "all",
    0: "trophyLeague",
    2: "powerLeagueSolo",
    3: "powerLeagueTeam"
};
const content = {
    7: "ALL",
    0: "Trophy League",
    2: "Power League(Solo)",
    3: "Power League(Team)"
};

const MenuType = ({type, setMatchType}) => {
    const dropDownRef = useRef();
    const [checked, setChecked] = useWindowClick(dropDownRef, false);

    return (
        <div className={styles.typeMenuWrapper}
             ref={dropDownRef}>
            <button className={styles.typeMenuButton}
                    onClick={() => {
                        setChecked(!checked)
                    }}>
                <img src={`/images/modes/icon/${image[type]}.webp`}
                     alt={"type_7"}
                />
                <div>{content[type]}</div>
            </button>
            <div className={styles.typeMenuList}
                 style={{display: checked ? "flex" : "none"}}>
                <input className={styles.typeButton}
                       type={"radio"}
                       id={"type_7"}
                       name={"type_7"}
                       value={7}
                       checked={type === "7"}
                       onChange={(e) => {
                           setMatchType(e);
                           setChecked(!checked);
                       }}/>
                <label htmlFor={"type_7"}>
                    <img src={`/images/modes/icon/all.webp`}
                         alt={"type_7"}
                    />
                    <div>ALL</div>
                </label>
                <input className={styles.typeButton}
                       type={"radio"}
                       id={"type_0"}
                       name={"type_0"}
                       value={0}
                       checked={type === "0"}
                       onChange={(e) => {
                           setMatchType(e);
                           setChecked(!checked);
                       }}/>
                <label htmlFor={"type_0"}>
                    <img src={`/images/modes/icon/trophyLeague.webp`}
                         alt={"type_0"}
                    />
                    <div>트로피 리그</div>
                </label>
                <input className={styles.typeButton}
                       type={"radio"}
                       id={"type_2"}
                       name={"type_2"}
                       value={2}
                       checked={type === "2"}
                       onChange={(e) => {
                           setMatchType(e);
                           setChecked(!checked);
                       }}/>
                <label htmlFor={"type_2"}>
                    <img src={`/images/modes/icon/powerLeagueSolo.webp`}
                         alt={"type_2"}
                    />
                    <div>파워 리그(솔로)</div>
                </label>
                <input className={styles.typeButton}
                       type={"radio"}
                       id={"type_3"}
                       name={"type_3"}
                       value={3}
                       checked={type === "3"}
                       onChange={(e) => {
                           setMatchType(e);
                           setChecked(!checked);
                       }}/>
                <label htmlFor={"type_3"}>
                    <img src={`/images/modes/icon/powerLeagueTeam.webp`}
                         alt={"type_3"}
                    />
                    <div>파워 리그(팀)</div>
                </label>
            </div>
        </div>
    );
};

export default MenuType;