import React, { useContext, useRef } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faComputer,
  faGamepad,
  faTasks,
} from '@fortawesome/free-solid-svg-icons';
import { useWindowClick } from '~/hooks/use-window-click.hook';
import { CdnContext } from '~/context/cdn.context';

import styles from './index.module.scss';

export const Footer = () => {
  const locales = useContext(CdnContext);

  const dropDownRef = useRef();
  const [isLanguageMenuOpen, setLanguageMenuOpen] = useWindowClick(
    dropDownRef,
    false,
  );

  const changeLanguage = (lang: string) => {
    locales.setLanguage(lang);
    setLanguageMenuOpen(false);
  };

  return (
    <footer className={styles.footerWrapper}>
      <div className={styles.footerLinks}>
        <a
          href={'https://github.com/laetipark/brawltree-frontend'}
          target={'_blank'}
          rel="noreferrer"
        >
          <FontAwesomeIcon icon={faGamepad} />
          <span>{locales.application['footer'].openSource}</span>
        </a>
        <a
          href={
            'https://laeti-park.notion.site/Blossom-Stats-To-Do-List-ac506cb69cb048d9b44fe2bb2ad14391'
          }
          target={'_blank'}
          rel="noreferrer"
        >
          <FontAwesomeIcon icon={faTasks} />
          <span>{locales.application['footer'].devNote}</span>
        </a>
        <a
          href={'https://open.kakao.com/me/laeti'}
          target={'_blank'}
          rel="noreferrer"
        >
          <FontAwesomeIcon icon={faComputer} />
          <span>{locales.application['footer'].contact}</span>
        </a>
      </div>
      <div
        ref={dropDownRef}
        className={styles.languageMenu}
        onClick={() => setLanguageMenuOpen((prev: boolean) => !prev)}
      >
        <span>{locales.application['footer'].language}</span>
        {isLanguageMenuOpen && (
          <ul>
            <li onClick={() => changeLanguage('ko')}>
              <span>한국어</span>
            </li>
            <li onClick={() => changeLanguage('en')}>
              <span>English</span>
            </li>
          </ul>
        )}
      </div>
    </footer>
  );
};
