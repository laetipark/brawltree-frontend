import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

import styles from './header.module.scss';

const Header = ({ dir }) => {
  const [isToggled, setIsToggled] = useState(false);

  return (
    <header>
      <div className={styles.titleWrapper}>
        <Link to="/" onClick={() => setIsToggled(false)}>
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
            <FontAwesomeIcon icon={!isToggled ? faBars : faTimes} />
          </div>
          <ul
            className={styles.menuList}
            style={
              useMediaQuery({ maxWidth: 768 })
                ? { display: `${isToggled ? 'flex' : 'none'}` }
                : {}
            }
          >
            {dir === 'brawltree' ? (
              <React.Fragment>
                <li>
                  <Link to={'/'} onClick={() => setIsToggled(false)}>
                    메인
                  </Link>
                </li>
                {/*<li>
              <Link to={'/brawler'}
                    onClick={() => setIsToggled(false)}>브롤러</Link>
            </li>*/}
                <li>
                  <Link to={'/events'} onClick={() => setIsToggled(false)}>
                    로테이션
                  </Link>
                </li>
                {/*<li>
              <Link to={'/battle'}
                    onClick={() => setIsToggled(false)}>게임 맵</Link>
            </li>*/}
                {/*<li>
              <Link to={'/seasons'}
                    onClick={() => setIsToggled(false)}>통계</Link>
            </li>
            <li>
              <Link to={'/seasons'}
                    onClick={() => setIsToggled(false)}>랭킹</Link>
            </li>*/}
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
                <li>
                  <Link
                    to={'/blossom/season'}
                    onClick={() => setIsToggled(false)}
                  >
                    시즌
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
