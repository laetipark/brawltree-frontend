import config from '~/config/config';
import axios from 'axios';

export class BrawlerService {
  static getBrawlers = async () => {
    const result = await axios.get(`${config.url}/brawler`);
    return result.data;
  };

  static getBlossomMember = async ({ brawlerID }) => {
    const result = await axios.get(`${config.url}/blossom/brawlers`, {
      params: {
        brawler: brawlerID,
      },
    });
    return result.data;
  };
}
