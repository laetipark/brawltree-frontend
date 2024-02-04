import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { useTranslation } from 'react-i18next';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

import styles from './header.module.scss';

const Header = ({ dir }) => {
  const { t } = useTranslation();
  const [isToggled, setIsToggled] = useState(false);

  return (
    <header>
      <div className={styles.titleWrapper}>
        <Link to={dir === 'brawltree' ? '' : 'blossom'}
              onClick={() => setIsToggled(false)}>
          <img
            src={`/images/logo/${dir}/logo_horizontal.png`}
            alt={'Logo Horizontal'}
          />
        </Link>
      </div>
      <div className={styles.menuWrapper}>
        <div>
          <img
            className={styles.menuLogo}
            src={`/images/logo/${dir}/logo192.png`}
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
            {dir === 'brawltree' ? (
              <React.Fragment>
                <li>
                  <Link to={'/'} onClick={() => setIsToggled(false)}>
                    <span>{t('application.header.main')}</span>
                  </Link>
                </li>
                <li>
                  <Link to={'/brawler/shelly'} onClick={() => setIsToggled(false)}>
                    <span>{t('application.header.brawler')}</span>
                  </Link>
                </li>
                <li>
                  <Link to={'/events'} onClick={() => setIsToggled(false)}>
                    <span>{t('application.header.events')}</span>
                  </Link>
                </li>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <li>
                  <Link to={'/blossom'} onClick={() => setIsToggled(false)}>
                    메인
                  </Link>
                </li>
                <li>
                  <Link
                    to={'/blossom/members'}
                    onClick={() => setIsToggled(false)}
                  >
                    멤버
                  </Link>
                </li>
                <li>
                  <Link
                    to={'/blossom/brawlers'}
                    onClick={() => setIsToggled(false)}
                  >
                    브롤러
                  </Link>
                </li>
                <li>
                  <Link
                    to={'/blossom/events'}
                    onClick={() => setIsToggled(false)}
                  >
                    로테이션
                  </Link>
                </li>
                <li>
                  <Link
                    to={'/blossom/battles'}
                    onClick={() => setIsToggled(false)}
                  >
                    일일 전투
                  </Link>
                </li>
              </React.Fragment>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
