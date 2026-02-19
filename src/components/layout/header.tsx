import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

import { CdnContext } from '~/context/cdn.context';

import styles from '~/assets/styles/components/layout/header.module.scss';

export const Header = () => {
  const locales = useContext(CdnContext);
  const headerLocale = locales.application?.header || {};
  const toggleVisible = useMediaQuery({ maxWidth: 768 });
  const [isToggled, setIsToggled] = useState(false);

  // 768px 이하에서는 메뉴를 토글로 보여주기
  const menuList = (
    <ul
      className={styles.headerMenuContent}
      style={
        toggleVisible
          ? isToggled
            ? {
                visibility: 'visible',
                minHeight: 240,
                paddingBottom: 8
              }
            : {
                visibility: 'hidden',
                minHeight: 0
              }
          : {}
      }
    >
      <li>
        <Link to={'/'} onClick={() => setIsToggled(false)}>
          <div>{headerLocale.main || 'Main'}</div>
        </Link>
      </li>
      <li>
        <Link to={'/brawler/shelly'} onClick={() => setIsToggled(false)}>
          <div>{headerLocale.brawler || 'Brawler'}</div>
        </Link>
      </li>
      <li>
        <Link to={'/events/curr'} onClick={() => setIsToggled(false)}>
          <div>{headerLocale.events || 'Events'}</div>
        </Link>
      </li>
      <li>
        <Link to={'/maps'} onClick={() => setIsToggled(false)}>
          <div>{headerLocale.maps || 'Maps'}</div>
        </Link>
      </li>
      <li>
        <Link to={'/crew'} onClick={() => setIsToggled(false)}>
          <div>{headerLocale.crew || 'Crew'}</div>
        </Link>
      </li>
      <li>
        <Link to={'/news'} onClick={() => setIsToggled(false)}>
          <div>{headerLocale.news || 'News'}</div>
        </Link>
      </li>
    </ul>
  );

  return (
    <React.Fragment>
      <header className={styles.headerMenuContainer}>
        <a href={'/'}>
          <img className={styles.menuLogo} src={`/images/logo/brawltree/logo192.png`} alt={'Logo'} />
          <div>Brawl Tree</div>
        </a>
        {toggleVisible ? (
          <div
            className={styles.menuToggle}
            onClick={() => {
              setIsToggled(!isToggled);
            }}
          >
            <FontAwesomeIcon icon={!isToggled ? faBars : faTimes} fontSize={24} />
          </div>
        ) : (
          menuList
        )}
      </header>
      {toggleVisible && menuList}
    </React.Fragment>
  );
};
