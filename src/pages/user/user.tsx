import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";


import UserTitle from "~/components/user/title/title";
import UserMenu from "~/components/user/menu/menu";

import config from "~/config/config";
import styles from "./user.module.scss";

const User = () => {
    const {id} = useParams();
    const [user, setUser] = useState({});

    useEffect(() => {
        axios.get(`${config.url}/brawlian/${id}`, {})
            .then(async (result) => {
                setUser(result.data.user);
            });
    }, [id]);

    return (
        <div className={styles.app}>
            <UserTitle user={user}/>
            <UserMenu />
        </div>
    );
};

export default User;