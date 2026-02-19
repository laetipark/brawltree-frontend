import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { TrophyCurrentEvents } from '~/components/events/list/trophy-curr';
import { TrophyTomorrowEvents } from '~/components/events/list/trophy-next';
import { RankedEvents } from '~/components/events/list/ranked';

import { CdnContext } from '~/context/cdn.context';

import styles from './index.module.scss';

export const EventMenu = () => {
  const navigate = useNavigate();
  const { mode } = useParams();
  const locales = useContext(CdnContext);

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
                navigate(`../${baseURL[1]}/${target.id}`);
              }}
            />
            <label htmlFor={'curr'}>
              <div>{locales.map['event'].current}</div>
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
                navigate(`../${baseURL[1]}/${target.id}`);
              }}
            />
            <label htmlFor={'next'}>
              <div>{locales.map['event'].tomorrow}</div>
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
                navigate(`../${baseURL[1]}/${target.id}`);
              }}
            />
            <label htmlFor={'ranked'}>
              <div>{locales.map['event'].ranked}</div>
            </label>
          </li>
        </ul>
      </div>
      {menu === 'curr' ? <TrophyCurrentEvents /> : menu === 'next' ? <TrophyTomorrowEvents /> : menu === 'ranked' ? <RankedEvents /> : <div></div>}
    </div>
  );
};
