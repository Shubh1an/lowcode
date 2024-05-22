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

// apiInstance.interceptors.request.use(
//   function (config) {
//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   },
// );

// apiInstance.interceptors.response.use(
//   function (response) {
//     return response;
//   },
//   function (error) {
//     return Promise.reject(error);
//   },
// );

export default apiInstance;
