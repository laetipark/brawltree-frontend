import axios from 'axios';
import config from '~/config/config';

export class MapService {
  static getMaps = () =>
    axios
      .get(`${config.url}/maps/`)
      .then((result) => result.data);
  
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
