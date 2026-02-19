import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { DEFAULT_LANGUAGE } from '~/common/i18n/language';

const fallbackResource = {};

void i18n.use(initReactI18next).init({
  lng: DEFAULT_LANGUAGE,
  fallbackLng: DEFAULT_LANGUAGE,
  supportedLngs: ['ko', 'en'],
  interpolation: {
    escapeValue: false
  },
  resources: {
    ko: {
      common: fallbackResource
    },
    en: {
      common: fallbackResource
    }
  },
  defaultNS: 'common',
  returnNull: false,
  returnEmptyString: false
});

export { i18n };

