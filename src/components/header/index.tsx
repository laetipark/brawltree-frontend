import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

import { CdnContext } from '~/context/cdn.context';

import styles from './index.module.scss';

export const Header = () => {
  const locales = useContext(CdnContext);
  const [isToggled, setIsToggled] = useState(false);

  return (
    <header>
      <div className={styles.titleWrapper}>
        <a href={'../../'} onClick={() => setIsToggled(false)}>
          <img
            src={`/images/logo/brawltree/logo_horizontal.png`}
            alt={'Logo Horizontal'}
          />
        </a>
      </div>
      <div className={styles.menuWrapper}>
        <div>
          <img
            className={styles.menuLogo}
            src={`/images/logo/brawltree/logo192.png`}
            alt={'Logo'}
          />
          <div
            className={styles.menuToggle}
            onClick={() => {
              setIsToggled(!isToggled);
            }}
          >
            <FontAwesomeIcon
              icon={!isToggled ? faBars : faTimes}
              fontSize={24}
            />
          </div>
          <ul
            className={styles.menuList}
            style={
              useMediaQuery({ maxWidth: 576 })
                ? { display: `${isToggled ? 'flex' : 'none'}` }
                : {}
            }
          >
            <React.Fragment>
              <li>
                <Link to={'/'} onClick={() => setIsToggled(false)}>
                  <span>{locales.application['header'].main}</span>
                </Link>
              </li>
              <li>
                <Link
                  to={'/brawler/shelly'}
                  onClick={() => setIsToggled(false)}
                >
                  <span>{locales.application['header'].brawler}</span>
                </Link>
              </li>
              <li>
                <Link to={'/events/curr'} onClick={() => setIsToggled(false)}>
                  <span>{locales.application['header'].events}</span>
                </Link>
              </li>
              <li>
                <Link to={'/maps'} onClick={() => setIsToggled(false)}>
                  <span>{locales.application['header'].maps}</span>
                </Link>
              </li>
              <li>
                <Link to={'/crew'} onClick={() => setIsToggled(false)}>
                  <span>{locales.application['header'].crew}</span>
                </Link>
              </li>
            </React.Fragment>
          </ul>
        </div>
      </div>
    </header>
  );
};
