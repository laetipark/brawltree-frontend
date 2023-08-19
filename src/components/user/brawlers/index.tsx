import {useParams} from "react-router-dom";

import UserBrawlerList from "~/components/user/brawlers/list/brawler_list";

import styles from "./index.module.scss";

const UserBrawlers = () => {
    const {id} = useParams();

    return (
        <div className={styles.brawlersWrapper}>
            <UserBrawlerList id={id}/>
        </div>
    );
};

export default UserBrawlers;