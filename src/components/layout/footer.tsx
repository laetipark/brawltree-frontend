import React, { useContext, useRef } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComputer, faGamepad, faTasks } from '@fortawesome/free-solid-svg-icons';
import { useWindowClick } from '~/hooks/use-window-click.hook';
import { CdnContext } from '~/context/cdn.context';

import styles from '~/assets/styles/components/layout/footer.module.scss';

export const Footer = () => {
  const locales = useContext(CdnContext);

  const dropDownRef = useRef();
  const [isLanguageMenuOpen, setLanguageMenuOpen] = useWindowClick(dropDownRef, false);

  const changeLanguage = (lang: string) => {
    locales.setLanguage(lang);
    setLanguageMenuOpen(false);
  };

  return (
    <footer className={styles.footerWrapper}>
      <div className={styles.footerLinks}>
        <a href={'https://github.com/laetipark/brawltree-frontend'} target={'_blank'} rel="noreferrer">
          <FontAwesomeIcon icon={faGamepad} />
          <div>{locales.application['footer'].openSource}</div>
        </a>
        <a href={'https://laetipark.notion.site/BrawlTree-To-Do-List-1754a9b02f298057bf11dc05cb4db234?pvs=4'} target={'_blank'} rel="noreferrer">
          <FontAwesomeIcon icon={faTasks} />
          <div>{locales.application['footer'].devNote}</div>
        </a>
        <a href={'https://open.kakao.com/me/laeti'} target={'_blank'} rel="noreferrer">
          <FontAwesomeIcon icon={faComputer} />
          <div>{locales.application['footer'].contact}</div>
        </a>
      </div>
      <div ref={dropDownRef} className={styles.languageMenu} onClick={() => setLanguageMenuOpen((prev: boolean) => !prev)}>
        <div>{locales.application['footer'].language}</div>
        {isLanguageMenuOpen && (
          <ul>
            <li onClick={() => changeLanguage('ko')}>
              <div>한국어</div>
            </li>
            <li onClick={() => changeLanguage('en')}>
              <div>English</div>
            </li>
          </ul>
        )}
      </div>
    </footer>
  );
};
