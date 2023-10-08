import React, { useState } from 'react';

import TLCurrentEvents from './menu_items/menu_tl_current';
import TomorrowEvents from './menu_items/menu_tl_tomorrow';
import PowerLeagueEvents from './menu_items/menu_pl';

import styles from './index.module.scss';

const EventMenu = () => {
  const [menu, setMenu] = useState('curr');

  const handleRadioButton = ({ target }) => {
    setMenu(target.name);
  };

  return (
    <div className={styles.menuWrapper}>
      <div className={styles.menuList}>
        <ul>
          <li>
            <input
              className={styles.typeButton}
              type={'radio'}
              id={'curr'}
              name={'curr'}
              checked={menu === 'curr'}
              onChange={handleRadioButton}
            />
            <label htmlFor={'curr'}>
              <div>Current</div>
            </label>
          </li>
          <li>
            <input
              className={styles.typeButton}
              type={'radio'}
              id={'next'}
              name={'next'}
              checked={menu === 'next'}
              onChange={handleRadioButton}
            />
            <label htmlFor={'next'}>
              <div>Tomorrow</div>
            </label>
          </li>
          <li>
            <input
              className={styles.typeButton}
              type={'radio'}
              id={'pl'}
              name={'pl'}
              checked={menu === 'pl'}
              onChange={handleRadioButton}
            />
            <label htmlFor={'pl'}>
              <div>Power League</div>
            </label>
          </li>
        </ul>
      </div>
      {menu === 'curr' ? (
        <TLCurrentEvents />
      ) : menu === 'next' ? (
        <TomorrowEvents />
      ) : (
        <PowerLeagueEvents />
      )}
    </div>
  );
};

export default EventMenu;