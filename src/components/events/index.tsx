import React, { useEffect, useState } from 'react';

import { TrophyCurrentEvents } from '~/components/events/list/trophy-curr';
import { TrophyTomorrowEvents } from '~/components/events/list/trophy-next';
import { RankedEvents } from '~/components/events/list/ranked';

import styles from './index.module.scss';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export const EventMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { mode } = useParams();
  const { t } = useTranslation();

  const [menu, setMenu] = useState('');

  useEffect(() => {
    setMenu(mode);
  }, [mode]);

  return (
    <div className={styles.menuWrapper}>
      <div className={styles.menuList}>
        <ul>
          <li>
            <input
              className={styles.typeButton}
              type={'radio'}
              id={'curr'}
              name={'event'}
              checked={menu === 'curr'}
              onChange={(e) => {
                const { target } = e;
                setMenu(target.id);
                const baseURL = location.pathname.split('/');
                navigate(!/\/blossom.*/g.test(location.pathname) ?
                  `../${baseURL[1]}/${target.id}` : `../${baseURL[1]}/${baseURL[2]}/${target.id}`);
              }}
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
              name={'event'}
              checked={menu === 'next'}
              onChange={(e) => {
                const { target } = e;
                setMenu(target.id);
                const baseURL = location.pathname.split('/');
                navigate(!/\/blossom.*/g.test(location.pathname) ?
                  `../${baseURL[1]}/${target.id}` : `../${baseURL[1]}/${baseURL[2]}/${target.id}`);
              }}
            />
            <label htmlFor={'next'}>
              <div>{t('map.event.tomorrow')}</div>
            </label>
          </li>
          <li>
            <input
              className={styles.typeButton}
              type={'radio'}
              id={'ranked'}
              name={'event'}
              checked={menu === 'ranked'}
              onChange={(e) => {
                const { target } = e;
                setMenu(target.id);
                const baseURL = location.pathname.split('/');
                navigate(!/\/blossom.*/g.test(location.pathname) ?
                  `../${baseURL[1]}/${target.id}` : `../${baseURL[1]}/${baseURL[2]}/${target.id}`);
              }}
            />
            <label htmlFor={'ranked'}>
              <div>{t('map.event.ranked')}</div>
            </label>
          </li>
        </ul>
      </div>
      {menu === 'curr' ? (
        <TrophyCurrentEvents />
      ) : menu === 'next' ? (
        <TrophyTomorrowEvents />
      ) : menu === 'ranked' ? (
        <RankedEvents />
      ) : <div></div>}
    </div>
  );
};