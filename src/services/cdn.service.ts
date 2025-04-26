import axios from 'axios';

export class CdnService {
  static getApplicationCdn = (language: string, time: number) => axios.get(`/cdn/database/locales/${language}/application.json?time=${time}`).then((result) => result.data);

  static getBattleCdn = (language: string, time: number) => axios.get(`/cdn/database/locales/${language}/battle.json?time=${time}`).then((result) => result.data);

  static getBrawlerCdn = (language: string, time: number) => axios.get(`/cdn/database/locales/${language}/brawler.json?time=${time}`).then((result) => result.data);

  static getMainCdn = (language: string, time: number) => axios.get(`/cdn/database/locales/${language}/main.json?time=${time}`).then((result) => result.data);

  static getMapCdn = (language: string, time: number) => axios.get(`/cdn/database/locales/${language}/map.json?time=${time}`).then((result) => result.data);

  static getNewsCdn = (language: string, time: number) => axios.get(`/cdn/database/locales/${language}/news.json?time=${time}`).then((result) => result.data);

  static getUserCdn = (language: string, time: number) => axios.get(`/cdn/database/locales/${language}/user.json?time=${time}`).then((result) => result.data);
}
