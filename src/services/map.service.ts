import axios from 'axios';
import config from '~/common/config/config';

export class MapService {
  static getMaps = () =>
    axios.get(`${config.url}/maps/`).then((result) => result.data);

  static getMap = ({ name, type, grade }) =>
    axios
      .get(`${config.url}/maps/${name}`, {
        params: {
          type: type,
          grade: grade
        }
      })
      .then((result) => result.data);
}
