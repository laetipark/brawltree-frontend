import React from "react";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGamepad, faTasks, faComputer} from '@fortawesome/free-solid-svg-icons';

import styles from "./footer.module.scss";

const Footer = () => {
    return (
        <footer className={styles.totalWrapper}>
            <div>
                <a href={'https://github.com/laeti-park/blossom-stats-frontend'} target={'_blank'} rel="noreferrer">
                    <FontAwesomeIcon icon={faGamepad}/> 오픈소스
                </a>
                <a href={"https://laeti-park.notion.site/Blossom-Stats-To-Do-List-ac506cb69cb048d9b44fe2bb2ad14391"}
                   target={'_blank'} rel="noreferrer">
                    <FontAwesomeIcon icon={faTasks}/> 개발노트
                </a>
            </div>
            <div>
                <a href={'https://open.kakao.com/me/Laeti_Cre'} target={'_blank'} rel="noreferrer">
                    <FontAwesomeIcon icon={faComputer}/> 연락처: @Laeti
                </a>
            </div>
        </footer>
    )
};

export default Footer;