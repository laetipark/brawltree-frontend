import axios from 'axios';
import config from '~/config/config';
import { SearchItemType } from '~/common/type/main.type';

export class MainService {
  static getUsersByNickname = (keyword: string) =>
    axios
      .get(`${config.url}/brawlian/keyword`, {
        params: {
          keyword: keyword,
        },
      })
      .then((result) => result.data);

  static getUsersByUserIDs = async (searchHistory: SearchItemType[]) => {
    const userIDs = searchHistory.map((item: SearchItemType) => item.userID);

    const result = await axios
      .get(`${config.url}/brawlian/ids`, {
        params: {
          userIDs: userIDs,
        },
      });
    return result.data.sort((a: SearchItemType, b: SearchItemType) => {
      return userIDs.indexOf(a.userID) - userIDs.indexOf(b.userID);
    });
  };
}
