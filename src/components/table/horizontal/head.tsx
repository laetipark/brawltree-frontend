import React from "react";

import styles from "./head.module.scss";

const TableHead = ({headRowContent}) => {
    return (
        <div className={styles.headWrapper}>
            <div>{headRowContent}</div>
        </div>
    );
};

export default TableHead;