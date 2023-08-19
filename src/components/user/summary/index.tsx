import {useParams} from "react-router-dom";

import UserRecord from "~/components/user/summary/record/record";
import UserBattles from "~/components/user/summary/battles/battles";

import styles from "./index.module.scss";

const UserSummary = () => {
    const {id} = useParams();

    return (
        <div className={styles.recordsWrapper}>
            <UserRecord id={id}/>
            <UserBattles id={id}/>
        </div>
    );
};

export default UserSummary;