import React, { useContext, useRef } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComputer, faGamepad, faTasks } from '@fortawesome/free-solid-svg-icons';
import { useWindowClick } from '~/hooks/use-window-click.hook';
import { CdnContext } from '~/context/cdn.context';
import { SupportedLanguage } from '~/common/i18n/language';
import { useCdnTranslation } from '~/common/i18n/use-cdn-translation';

import styles from '~/assets/styles/components/layout/footer.module.scss';

export const Footer = () => {
  const locales = useContext(CdnContext);
  const { t } = useCdnTranslation('application');

  const dropDownRef = useRef();
  const [isLanguageMenuOpen, setLanguageMenuOpen] = useWindowClick(dropDownRef, false);
  const footerLocale = locales.application?.footer || {};

  const changeLanguage = (lang: SupportedLanguage) => {
    locales.setLanguage(lang);
    setLanguageMenuOpen(false);
  };

  return (
    <footer className={styles.footerWrapper}>
      <div className={styles.footerLinks}>
        <a href={'https://github.com/laetipark/brawltree-frontend'} target={'_blank'} rel="noreferrer">
          <FontAwesomeIcon icon={faGamepad} />
          <div>{t('footer.openSource', { defaultValue: footerLocale.openSource || 'Open Source' })}</div>
        </a>
        <a href={'https://laetipark.notion.site/BrawlTree-To-Do-List-1754a9b02f298057bf11dc05cb4db234?pvs=4'} target={'_blank'} rel="noreferrer">
          <FontAwesomeIcon icon={faTasks} />
          <div>{t('footer.devNote', { defaultValue: footerLocale.devNote || 'Dev Note' })}</div>
        </a>
        <a href={'https://open.kakao.com/me/laeti'} target={'_blank'} rel="noreferrer">
          <FontAwesomeIcon icon={faComputer} />
          <div>{t('footer.contact', { defaultValue: footerLocale.contact || 'Contact' })}</div>
        </a>
      </div>
      <div ref={dropDownRef} className={styles.languageMenu} onClick={() => setLanguageMenuOpen((prev: boolean) => !prev)}>
        <div>{t('footer.language', { defaultValue: footerLocale.language || 'Language' })}</div>
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
