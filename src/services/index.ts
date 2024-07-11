
import axios from 'axios';

const baseURL = 'https://turkishmall.com/api/web';
const headers = {
  'Content-Type': 'application/json',
};

const axiosInstance = axios.create({
  baseURL,
  headers,
  timeout: 10000,
});

export default axiosInstance;