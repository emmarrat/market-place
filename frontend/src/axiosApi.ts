import axios from 'axios';
import { apiURL } from './constants';

const axiosApi = axios.create({
  baseURL: apiURL
});

export default axiosApi;