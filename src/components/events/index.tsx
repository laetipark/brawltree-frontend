import React, { useEffect, useState } from 'react';

import { TLCurrentEvents } from '~/components/events/list/menu-tl-current';
import { TLTomorrowEvents } from '~/components/events/list/menu-tl-tomorrow';
import { PLEvents } from '~/components/events/list/menu-pl';

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
              id={'pl'}
              name={'event'}
              checked={menu === 'pl'}
              onChange={(e) => {
                const { target } = e;
                setMenu(target.id);
                const baseURL = location.pathname.split('/');
                navigate(!/\/blossom.*/g.test(location.pathname) ?
                  `../${baseURL[1]}/${target.id}` : `../${baseURL[1]}/${baseURL[2]}/${target.id}`);
              }}
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
      ) : menu === 'pl' ? (
        <PLEvents />
      ) : <div></div>}
    </div>
  );
};