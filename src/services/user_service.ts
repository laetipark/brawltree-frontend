import axios from 'axios';
import config from '~/config/config';

export default class UserService {
  static getUser = ({ id, type, mode }) =>
    axios
      .get(`${config.url}/brawlian/${id}`, {
        params: {
          type: type,
          mode: mode,
        },
      })
      .then(async (result) => result.data);

  static getUserBrawlers = ({ id }) => {
    return axios
      .get(`${config.url}/brawlian/${id}/brawlers`, {})
      .then((result) => result.data);
  };

  static getUserByTypeNMode = ({ id, type, mode }) =>
    axios
      .all([
        axios.get(`${config.url}/brawlian/${id}/battles/summary`, {
          params: {
            type: type,
            mode: mode,
          },
        }),
        axios.get(`${config.url}/brawlian/${id}/battles/logs`, {
          params: {
            type: type,
            mode: mode,
          },
        }),
      ])
      .then(
        axios.spread((summary, logs) => {
          return {
            battlesSummary: summary.data,
            battleLogs: logs.data,
          };
        }),
      );

  static getBlossomMemberDetail = ({ id }) =>
    axios
      .get(`${config.url}/blossom/members/${id}`)
      .then(async (result) => result.data);

  static getBlossomMembers = () =>
    axios
      .get(`${config.url}/blossom/members`)
      .then(async (result) => result.data);

  static getBlossomBattles = ({ date, type, mode }) =>
    axios
      .get(`${config.url}/blossom/battles`, {
        params: {
          date: date,
          type: type,
          mode: mode,
        },
      })
      .then(async (result) => result.data);

  static getBlossomSeason = ({ type, mode }) =>
    axios
      .get(`${config.url}/blossom/season`, {
        params: {
          type: type,
          mode: mode,
        },
      })
      .then(async (result) => result.data);
}
