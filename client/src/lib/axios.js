import axios from 'axios';

// Centralized Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

// Basic interceptors (extend as needed)
api.interceptors.request.use(
  (config) => {
    // Example: attach auth token if available
    // const token = localStorage.getItem('token');
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Centralized error logging
    // console.error('API Error:', error);
    return Promise.reject(error);
  },
);

export default api;
