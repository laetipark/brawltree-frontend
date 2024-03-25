import axios from 'axios';
import config from '~/config/config';

export class UserService {
  static getUsersByNickname = (keyword: string) =>
    axios
      .get(`${config.url}/brawlian/nickname`, {
        params: {
          keyword: keyword,
        },
      })
      .then((result) => result.data);

  static getUsersByUserIDs = (userIDs: string) =>
    axios
      .get(`${config.url}/brawlian/ids`, {
        params: {
          userIDs: userIDs,
        },
      })
      .then((result) => result.data);

  static getUser = ({ id }) =>
    axios.get(`${config.url}/brawlian/${id}`).then((result) => result.data);

  static getUserBrawlers = ({ id }) => {
    return axios
      .get(`${config.url}/brawlian/${id}/brawlers`, {})
      .then((result) => result.data);
  };

  static getUserByTypeNMode = ({ id, type, mode, stack }) =>
    axios
      .get(`${config.url}/brawlian/${id}/battles`, {
        params: {
          type: type,
          mode: mode,
          stack: stack,
        },
      })
      .then((result) => result.data);

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
}
