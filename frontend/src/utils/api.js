import axios from 'axios';

// Support Vite and CRA style env vars, fallback to local backend
const defaultBase = process.env.VITE_API_URL || process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const API = axios.create({
  baseURL: defaultBase,
});

// Add token to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;