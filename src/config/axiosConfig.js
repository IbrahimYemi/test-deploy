// src/axiosConfig.js
import axios from 'axios';
import { backendURIs } from './routes';

const instance = axios.create({
  baseURL: backendURIs.api,
  headers: {
    'Content-Type': 'multipart/form-data',
    Accept: 'application/json',
  },
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
