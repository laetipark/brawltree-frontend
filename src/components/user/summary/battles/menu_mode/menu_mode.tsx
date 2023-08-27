import React, {useRef} from "react";
import useWindowClick from "~/hooks/use_window_click";

import styles from "./menu_mode.module.scss";

const TypeMode = ({mode, setMatchMode, type, rotationTL, rotationPL}) => {
    const modeKR = {
        all: "ALL",
        gemGrab: "Gem Grab", brawlBall: "Brawl Ball",
        bounty: "Bounty", heist: "Heist",
        hotZone: "Hot Zone", knockout: "Knockout",
        soloShowdown: "Solo Showdown", duoShowdown: "Duo Showdown",
        volleyBrawl: "Volley Brawl", duels: "Duels",
        wipeout: "Wipeout", takedown: "Takedown"
    };

    const dropDownRef = useRef();
    const [checked, setChecked] = useWindowClick(dropDownRef, false);

    return (
        <div className={styles.typeMenuWrapper}
             ref={dropDownRef}>
            <button className={styles.typeMenuButton}
                    onClick={() => {
                        setChecked(!checked)
                    }}>
                <img src={`/images/modes/icon/${mode}.webp`}
                     alt={mode}
                />
                <div>{modeKR[mode]}</div>
            </button>
            <div className={styles.typeMenuList}
                 style={{display: checked ? "flex" : "none"}}>
                {
                    type === 0 || type === 7 ? (
                        rotationTL.map((modeName: string) => (
                            <React.Fragment key={`${modeName}`}>
                                <input className={styles.typeButton}
                                       type={"radio"}
                                       id={modeName}
                                       name={modeName}
                                       value={modeName}
                                       checked={modeName === mode}
                                       onChange={(e) => {
                                           setMatchMode(e);
                                           setChecked(!checked);
                                       }}/>
                                <label htmlFor={modeName}>
                                    <img src={`/images/modes/icon/${modeName}.webp`}
                                         alt={modeName}
                                    />
                                    <div>{modeKR[modeName]}</div>
                                </label>
                            </React.Fragment>
                        ))) : rotationPL.map((modeName: string) => (
                        <React.Fragment key={`${modeName}`}>
                            <input className={styles.typeButton}
                                   type={"radio"}
                                   id={modeName}
                                   name={modeName}
                                   value={modeName}
                                   checked={modeName === mode}
                                   onChange={(e) => {
                                       setMatchMode(e);
                                       setChecked(!checked);
                                   }}/>
                            <label htmlFor={modeName}>
                                <img src={`/images/modes/icon/${modeName}.webp`}
                                     alt={modeName}
                                />
                                <div>{modeKR[modeName]}</div>
                            </label>
                        </React.Fragment>
                    ))
                }
            </div>
        </div>
    );
};

export default TypeMode;