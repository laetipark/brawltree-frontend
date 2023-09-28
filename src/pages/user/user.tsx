import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import UserTitle from '~/components/user/title/title';
import UserMenu from '~/components/user/menu/menu';

import UserContext from '~/context/user_context';

import config from '~/config/config';
import styles from './user.module.scss';

type User = {
  USER_ID: string;
  USER_NM: string;
  USER_PRFL: string;
  USER_LST_BT: Date;
  USER_LST_CK: Date;
  USER_CR: string;
  USER_CR_NM: string;
};

const User = () => {
  const { id } = useParams();
  const [user, setUser] =
    useState<User>({
      USER_ID: '', USER_NM: '', USER_PRFL: '',
      USER_LST_BT: new Date(0), USER_LST_CK: new Date(0),
      USER_CR: '', USER_CR_NM: '',
    });
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    if (retryCount === 0) {
      axios.get(`${config.url}/brawlian/${id}`)
        .then(async (result) => {
          if (result.data !== null) {
            setUser(result.data);
          } else {
            setRetryCount(retryCount + 1);
          }
        });
    } else if (retryCount < 3 && !user.USER_LST_CK) {
      const timer = setTimeout(() => {
        axios.get(`${config.url}/brawlian/${id}`)
          .then(async (result) => {
            if (result.data !== null) {
              setUser(result.data);
            } else {
              setRetryCount(retryCount + 1);
            }
          });
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    } else {

    }
  }, [id, retryCount]);

  return (
    user.USER_LST_CK &&
    <UserContext.Provider value={{ user, setUser, setRetryCount }}>
      <div className={styles.app}>
        <UserTitle />
        <UserMenu />
      </div>
    </UserContext.Provider>
  );
};

export default User;