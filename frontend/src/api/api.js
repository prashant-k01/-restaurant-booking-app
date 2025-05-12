
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://192.168.0.195:4000/api',
});

// Add token header interceptor
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = 'Bearer ' + token;
  }
  return config;
});

export default API;
