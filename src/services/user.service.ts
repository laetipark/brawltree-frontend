import axios from 'axios';
import config from '~/common/config/config';

export class UserService {
  static getUser = ({ id }) =>
    axios
      .get(`${config.url}/brawlian/${id}`)
      .then((result) => result.data)
      .catch((error) => console.error(error));

  static getUserProfile = ({ id }) =>
    axios
      .get(`${config.url}/brawlian/${id}/profile`)
      .then((result) => result.data);

  static getUserBrawlers = ({ id }) =>
    axios
      .get(`${config.url}/brawlian/${id}/brawlers`, {})
      .then((result) => result.data);

  static getUserBattleStats = ({ id, type, mode }) =>
    axios
      .get(`${config.url}/brawlian/${id}/battles/stats`, {
        params: {
          type: type,
          mode: mode
        }
      })
      .then((result) => result.data);

  static getUserBattleLogs = ({ id, type, mode, battleStack }) =>
    axios
      .get(`${config.url}/brawlian/${id}/battles/logs`, {
        params: {
          type: type,
          mode: mode,
          stack: battleStack
        }
      })
      .then((result) => result.data);

  static getCrewMemberDetail = ({ id }) =>
    axios
      .get(`${config.url}/crew/members/${id}`)
      .then(async (result) => result.data);

  static getCrewMembers = () =>
    axios.get(`${config.url}/crew/members`).then(async (result) => result.data);
}
