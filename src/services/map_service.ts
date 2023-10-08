import axios from 'axios';
import config from '~/config/config';

export default class MapService {
  static getMap = ({ id, type, grade }) =>
    axios
      .all([
        axios.get(`${config.url}/maps/${id}`),
        axios.get(`${config.url}/maps/${id}/stats`, {
          params: {
            type: type,
            grade: grade,
          },
        }),
      ])
      .then(
        axios.spread((map, stats) => {
          return {
            map: map.data,
            stats: stats.data,
          };
        }),
      );
}
