import React, { useRef } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComputer, faGamepad, faTasks } from '@fortawesome/free-solid-svg-icons';

import { useTranslation } from 'react-i18next';
import i18n from '~/locales/i18n';

import styles from './footer.module.scss';
import useWindowClick from '~/hooks/use-window-click.hook';

export const Footer = () => {
  const { t } = useTranslation();

  const dropDownRef = useRef();
  const [isLanguageMenuOpen, setLanguageMenuOpen] = useWindowClick(
    dropDownRef,
    false,
  );

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang).then(() => setLanguageMenuOpen(false));
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
          <span>{t('application.footer.openSource')}</span>
        </a>
        <a
          href={
            'https://laeti-park.notion.site/Blossom-Stats-To-Do-List-ac506cb69cb048d9b44fe2bb2ad14391'
          }
          target={'_blank'}
          rel="noreferrer"
        >
          <FontAwesomeIcon icon={faTasks} />
          <span>{t('application.footer.devNote')}</span>
        </a>
        <a
          href={'https://open.kakao.com/me/Laeti_Cre'}
          target={'_blank'}
          rel="noreferrer"
        >
          <FontAwesomeIcon icon={faComputer} />
          <span>{t('application.footer.contact')}</span>
        </a>
      </div>
      <div
        ref={dropDownRef}
        className={styles.languageMenu}
        onClick={() => setLanguageMenuOpen((prev) => !prev)}
      >
        <span>{t('application.footer.language')}</span>
        {isLanguageMenuOpen && (
          <ul>
            <li
              onClick={() => changeLanguage('ko')}
            >
              <span>한국어</span>
            </li>
            <li
              onClick={() => changeLanguage('en')}
            >
              <span>English</span>
            </li>
          </ul>
        )}
      </div>
    </footer>
  );
};
