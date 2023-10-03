import React, { useState } from 'react';

import CurrentEvents from './menu_items/current_events';
import TomorrowEvents from './menu_items/tomorrow_events';
import PowerLeagueEvents from './menu_items/power_league';

import styles from './events_menu.module.scss';

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
        <CurrentEvents />
      ) : menu === 'next' ? (
        <TomorrowEvents />
      ) : (
        <PowerLeagueEvents />
      )}
    </div>
  );
};

export default EventMenu;
