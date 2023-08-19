import React from "react";
import {CopyToClipboard} from "react-copy-to-clipboard";

import styles from "./title.module.scss";

const UserTitle = ({user}) => {
    const {USER_ID, USER_NM, USER_PRFL} = user;

    return (
        <div className={styles.titleWrapper}>
            <div className={styles.titleBox}>
                <img className={styles.image}
                     src={`/images/brawlian/profile/${USER_PRFL}.webp`}
                     alt={"프로필"}/>
                <div>
                    <div className={styles.realNameBox}>{`${USER_NM}`}</div>
                    <p className={"tagBox"}>{USER_ID}</p>
                </div>
            </div>
            <div className={styles.reloadBox}>
                <button className={styles.reloadButton}>
                    프로필 갱신
                </button>
                1분 전
            </div>
            <div className={styles.copyBox}>
                <CopyToClipboard text={USER_ID}
                                 onCopy={() => alert("태그를 복사했습니다.")}>
                    <span className={styles.copyButton}>태그 복사</span>
                </CopyToClipboard>
                <CopyToClipboard text={USER_ID}>
                    <a className={styles.copyButton}
                       href={"brawlstars://"}>
                        태그 복사 + 게임 실행
                    </a>
                </CopyToClipboard>
            </div>
        </div>
    );
};

export default UserTitle;