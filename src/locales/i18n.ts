import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import axios from 'axios';
import config from '~/config/config';

const resources = async () => {
  const getTranslationFile = async (url: string) => {
    try {
      const response = await axios.get(`${config.assets}/${url}`, {});
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    en: {
      translation: {
        application: await getTranslationFile('locales/en/application.json'),
        brawler: await getTranslationFile('locales/en/brawler.json'),
        main: await getTranslationFile('locales/en/main.json'),
        user: await getTranslationFile('locales/en/user.json'),
        battle: await getTranslationFile('locales/en/battle.json'),
        map: await getTranslationFile('locales/en/map.json'),
      },
    },
    ko: {
      translation: {
        application: await getTranslationFile('locales/ko/application.json'),
        brawler: await getTranslationFile('locales/ko/brawler.json'),
        main: await getTranslationFile('locales/ko/main.json'),
        user: await getTranslationFile('locales/ko/user.json'),
        battle: await getTranslationFile('locales/ko/battle.json'),
        map: await getTranslationFile('locales/ko/map.json'),
      },
    },
  };
};

i18n.use(initReactI18next).init({
  resources: await resources(),
  lng: 'ko', // 기본 설정 언어, 'cimode'로 설정할 경우 키 값으로 출력된다.
  fallbackLng: 'en', // 번역 파일에서 찾을 수 없는 경우 기본 언어
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
