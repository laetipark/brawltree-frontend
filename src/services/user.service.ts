import axios from 'axios';
import config from '~/config/config';

export class UserService {
  static getUser = ({ id }) =>
    axios.get(`${config.url}/brawlian/${id}`)
      .then((result) => result.data);

  static getUserBrawlers = ({ id }) => axios
    .get(`${config.url}/brawlian/${id}/brawlers`, {})
    .then((result) => result.data);

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

  static getCrewMemberDetail = ({ id }) => axios
    .get(`${config.url}/crew/members/${id}`)
    .then(async (result) => result.data);

  static getCrewMembers = () =>
    axios
      .get(`${config.url}/crew/members`)
      .then(async (result) => result.data);
}
