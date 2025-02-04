import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEWS_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': process.env.NEWS_API_KEY,
  },
  withCredentials: true,
});

export default axiosInstance;
