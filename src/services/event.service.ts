import axios from 'axios';
import config from '~/common/config/config';

export class EventService {
  static getTLCurrentEvents = () => axios.get(`${config.url}/events/tl/curr`).then((result) => result.data);

  static getTLTomorrowEvents = () => axios.get(`${config.url}/events/tl/tomm`).then((result) => result.data);

  static getPLEvents = () => axios.get(`${config.url}/events/pl`).then((result) => result.data);
}
