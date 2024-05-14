import axios from 'axios';
import config from '../Config/config';

const apiInstance = axios.create({
   baseURL: config.BASE_URL,
   headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'request-timestamp': Date.now(),
   },
});

export default apiInstance;
