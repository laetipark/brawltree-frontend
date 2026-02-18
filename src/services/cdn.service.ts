import axios from 'axios';

const getCdnLocale = (language: string, name: string, time: number) => axios.get(`/cdn/database/locales/${language}/${name}.json?time=${time}`).then((result) => result.data);

export class CdnService {
  static getApplicationCdn = (language: string, time: number) => getCdnLocale(language, 'application', time);

  static getBattleCdn = (language: string, time: number) => getCdnLocale(language, 'battle', time);

  static getBrawlerCdn = (language: string, time: number) => getCdnLocale(language, 'brawler', time);

  static getMainCdn = (language: string, time: number) => getCdnLocale(language, 'main', time);

  static getMapCdn = (language: string, time: number) => getCdnLocale(language, 'map', time);

  static getNewsCdn = (language: string, time: number) => getCdnLocale(language, 'news', time);

  static getUserCdn = (language: string, time: number) => getCdnLocale(language, 'user', time);
}
