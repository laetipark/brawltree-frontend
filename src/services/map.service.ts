import axios from 'axios';
import config from '~/config/config';

export default class MapService {
  static getMap = ({ id, type, grade }) =>
    axios
      .get(`${config.url}/maps/${id}`, {
        params: {
          type: type,
          grade: grade,
        },
      })
      .then((result) => result.data);
}
