import {useState} from "react";

import UserSummary from "~/components/user/summary";
import UserBrawlers from "~/components/user/brawlers/";

import styles from "./menu.module.scss";

const UserMenu = () => {
    const [menu, setMenu] = useState("summary");

    const handleRadioButton = (e) => {
        setMenu(e.target.name);
    };

    return (
        <div className={styles.menuWrapper}>
            <div className={styles.menuList}>
                <ul>
                    <li>
                        <input className={styles.typeButton}
                               type={"radio"}
                               id={"summary"}
                               name={"summary"}
                               checked={menu === "summary"}
                               onChange={handleRadioButton}/>
                        <label htmlFor={"summary"}>
                            <div>
                                Summary
                            </div>
                        </label>
                    </li>
                    <li>
                        <input className={styles.typeButton}
                               type={"radio"}
                               id={"brawlers"}
                               name={"brawlers"}
                               checked={menu === "brawlers"}
                               onChange={handleRadioButton}/>
                        <label htmlFor={"brawlers"}>
                            <div>
                                Brawlers
                            </div>
                        </label>
                    </li>
                    <li>
                        <input className={styles.typeButton}
                               type={"radio"}
                               id={"battles"}
                               name={"battles"}
                               checked={menu === "battles"}
                               onChange={handleRadioButton}/>
                        <label htmlFor={"battles"}>
                            <div>
                                Team
                            </div>
                        </label>
                    </li>
                </ul>
            </div>
            {
                menu === "summary" ? (
                    <UserSummary/>
                ) : menu === "brawlers" ? (
                    <UserBrawlers/>
                ) : (
                    <div>
                        hello3
                    </div>
                )
            }
        </div>
    );
};

export default UserMenu;