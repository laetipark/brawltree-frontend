import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

import UserSummary from '~/components/user/menu/summary';
import { UserBrawlers } from '~/components/user/menu/brawlers/';

import { UserContext } from '~/context/user.context';

import styles from './index.module.scss';

export const UserMenu = () => {
  const context = useContext(UserContext);
  const { t } = useTranslation();
  const [menu, setMenu] = useState('summary');
  const { setLoad } = context;

  const handleRadioButton = ({ target }) => {
    setMenu(target.name);
    setLoad(target === 'summary');
  };

  return (
    <div className={styles.menuWrapper}>
      <div className={styles.menuList}>
        <ul>
          <li>
            <input
              className={styles.typeButton}
              type={'radio'}
              id={'summary'}
              name={'summary'}
              checked={menu === 'summary'}
              onChange={handleRadioButton}
            />
            <label htmlFor={'summary'}>
              <div>{t(`user.menu.summary`)}</div>
            </label>
          </li>
          <li>
            <input
              className={styles.typeButton}
              type={'radio'}
              id={'brawlers'}
              name={'brawlers'}
              checked={menu === 'brawlers'}
              onChange={handleRadioButton}
            />
            <label htmlFor={'brawlers'}>
              <div>{t(`user.menu.brawlers`)}</div>
            </label>
          </li>
        </ul>
      </div>
      {menu === 'summary' ? <UserSummary /> : <UserBrawlers />}
    </div>
  );
};
