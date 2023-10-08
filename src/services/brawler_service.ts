import config from '~/config/config';
import axios from 'axios';

export default class BrawlerService {
  static getBrawlers = () => {
    return axios
      .all([
        axios.get(`${config.url}/brawler/`),
        axios.get(`${config.url}/brawler/stats`),
      ])
      .then(
        axios.spread((brawlers, stats) => {
          return {
            brawlers: brawlers.data,
            stats: stats.data,
          };
        }),
      );
  };

  static getBlossomMember = ({brawlerID}) => {
    return axios
      .get(`${config.url}/blossom/brawlers`, {
        params: {
          brawler: brawlerID
        }
      })
      .then((result) => result.data);
  };
}
