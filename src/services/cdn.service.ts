import axios from 'axios';

export class CdnService {
  static getApplicationCdn = (language: string) =>
    axios
      .get(`/api/database/locales/${language}/application.json`)
      .then((result) => result.data);

  static getBattleCdn = (language: string) =>
    axios
      .get(`/api/database/locales/${language}/battle.json`)
      .then((result) => result.data);

  static getBrawlerCdn = (language: string) =>
    axios
      .get(`/api/database/locales/${language}/brawler.json`)
      .then((result) => result.data);

  static getMainCdn = (language: string) =>
    axios
      .get(`/api/database/locales/${language}/main.json`)
      .then((result) => result.data);

  static getMapCdn = (language: string) =>
    axios
      .get(`/api/database/locales/${language}/map.json`)
      .then((result) => result.data);

  static getUserCdn = (language: string) =>
    axios
      .get(`/api/database/locales/${language}/user.json`)
      .then((result) => result.data);
}
