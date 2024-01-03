import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import applicationEN from './en/application.json';
import brawlerEN from './en/brawler.json';
import mainEN from './en/main.json';
import userEN from './en/user.json';
import battleEN from './en/battle.json';
import mapEN from './en/map.json';

import applicationKO from './ko/application.json';
import brawlerKO from './ko/brawler.json';
import mainKO from './ko/main.json';
import userKO from './ko/user.json';
import battleKO from './ko/battle.json';
import mapKO from './ko/map.json';

const resources = {
  en: {
    translation: {
      application: applicationEN,
      brawler: brawlerEN,
      main: mainEN,
      user: userEN,
      battle: battleEN,
      map: mapEN
    },
  },
  ko: {
    translation: {
      application: applicationKO,
      brawler: brawlerKO,
      main: mainKO,
      user: userKO,
      battle: battleKO,
      map: mapKO
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'ko', // 기본 설정 언어, 'cimode'로 설정할 경우 키 값으로 출력된다.
  fallbackLng: 'en', // 번역 파일에서 찾을 수 없는 경우 기본 언어
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
