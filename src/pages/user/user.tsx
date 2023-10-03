import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import UserTitle from '~/components/user/title/title';
import UserMenu from '~/components/user/menu/menu';

import { Users } from '~/interfaces/type/users';
import UserContext from '~/context/user_context';

import config from '~/config/config';
import styles from './user.module.scss';

const User = () => {
  const { id } = useParams();
  const [user, setUser] = useState<Users>({
    USER_ID: '',
    USER_NM: '',
    USER_PRFL: '',
    USER_LST_BT: new Date(0),
    USER_LST_CK: new Date(0),
    USER_CR: '',
    USER_CR_NM: '',
  });
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    if (retryCount === 0) {
      axios.get(`${config.url}/brawlian/${id}`).then(async (result) => {
        if (result.data !== null) {
          setUser(result.data);
        } else {
          setRetryCount(retryCount + 1);
        }
      });
    } else if (retryCount < 3 && !(new Date(user.USER_LST_CK).getTime() > 0)) {
      const timer = setTimeout(() => {
        axios.get(`${config.url}/brawlian/${id}`).then(async (result) => {
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
    }
  }, [id, retryCount, user.USER_LST_CK]);

  return (
    new Date(user.USER_LST_CK).getTime() > 0 && (
      <UserContext.Provider value={{ id, user, setUser, setRetryCount }}>
        <div className={styles.app}>
          <UserTitle />
          <UserMenu />
        </div>
      </UserContext.Provider>
    )
  );
};

export default User;
