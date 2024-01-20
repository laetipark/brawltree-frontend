import React, { useState } from 'react';

import { TLCurrentEvents } from '~/components/events/list/menu-tl-current';
import { TLTomorrowEvents } from '~/components/events/list/menu-tl-tomorrow';
import { PLEvents } from '~/components/events/list/menu-pl';

import styles from './index.module.scss';
import { useTranslation } from 'react-i18next';

const EventMenu = () => {
  const { t } = useTranslation();

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
              <div>{t('map.event.current')}</div>
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
              <div>{t('map.event.tomorrow')}</div>
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
              <div>{t('map.event.powerLeague')}</div>
            </label>
          </li>
        </ul>
      </div>
      {menu === 'curr' ? (
        <TLCurrentEvents />
      ) : menu === 'next' ? (
        <TLTomorrowEvents />
      ) : (
        <PLEvents />
      )}
    </div>
  );
};

export default EventMenu;
