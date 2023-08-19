import TableHead from "./head";
import TableBody from "./body";

import styles from "./table.module.scss";

const TableHorizontal = ({headRow, bodyRowContents, bodyRowImages}) => {
    return (
        <div className={styles.tableWrapper}>
            <TableHead headRowContent={headRow}/>
            <TableBody bodyRowContents={bodyRowContents}
                       bodyRowImages={bodyRowImages}/>
        </div>
    );
};

export default TableHorizontal;