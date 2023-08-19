import React, {useState} from "react";
import {Link} from "react-router-dom";
import {useMediaQuery} from 'react-responsive';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faTimes} from "@fortawesome/free-solid-svg-icons";

import styles from "./header.module.scss";

const Header = () => {
    const [isToggled, setIsToggled] = useState(false);

    return (
        <React.Fragment>
            <div className={styles.titleWrapper}>
                <Link to="/"
                      onClick={() => setIsToggled(false)}>
                    <img src={require(`../../images/logo/logo_horizontal.png`)}
                         alt={"Blossom Logo"}/>
                </Link>
            </div>
            <div className={styles.menuWrapper}>
                <div>
                    <img className={styles.menuLogo}
                         src={require(`../../images/logo/logo192.png`)}
                         alt={"Blossom Logo"}/>
                    <div className={styles.menuToggle}
                         onClick={() => {
                             setIsToggled(!isToggled);
                         }}>
                        <FontAwesomeIcon icon={!isToggled ? faBars : faTimes}/>
                    </div>
                    <ul className={styles.menuList}
                        style={useMediaQuery({maxWidth: 768}) ? {display: `${isToggled ? "flex" : "none"}`} : {}}>
                        <li>
                            <Link to="/"
                                  onClick={() => setIsToggled(false)}>메인</Link>
                        </li>
                        <li>
                            <Link to="/brawler"
                                  onClick={() => setIsToggled(false)}>브롤러</Link>
                        </li>
                        <li>
                            <Link to="/rotation"
                                  onClick={() => setIsToggled(false)}>로테이션</Link>
                        </li>
                        <li>
                            <Link to="/battle"
                                  onClick={() => setIsToggled(false)}>게임 맵</Link>
                        </li>
                        <li>
                            <Link to="/season"
                                  onClick={() => setIsToggled(false)}>통계</Link>
                        </li>
                        <li>
                            <Link to="/season"
                                  onClick={() => setIsToggled(false)}>랭킹</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </React.Fragment>
    )
};

export default Header;