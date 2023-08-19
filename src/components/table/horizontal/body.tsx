import React from "react";

import styles from "./body.module.scss";

const TableBody = ({bodyRowContents, bodyRowImages}) => {

    return (
        <div className={styles.bodyWrapper}>
            {
                bodyRowContents.map((col: string, index: number) =>
                    <div key={index}>
                        <div>
                            {bodyRowImages[index][0] !== null ? (
                                <img src={bodyRowImages[index][0]}
                                     alt={"col_0"}/>
                            ) : null}
                            {col[0]}
                        </div>
                        <div>
                            {bodyRowImages[index][1] !== null ? (
                                <img src={bodyRowImages[index][1]}
                                     alt={"col_1"}/>
                            ) : null}
                            {col[1]}
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default TableBody;