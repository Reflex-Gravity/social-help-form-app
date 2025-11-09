import axios from 'axios';
import { logEvent, LogLevel } from '../services/logger.service';
import RateLimiter from '../services/rateLimitter.service';

// Environment validation
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';
const REQUEST_TIMEOUT = 30000;
const MAX_RETRIES = 2;

// Axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: REQUEST_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});
const rateLimiter = new RateLimiter();

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Validate URL
    if (!config.url) {
      return Promise.reject(new Error('Request URL is required'));
    }

    // Check network connectivity
    if (!navigator.onLine) {
      return Promise.reject(new Error('No internet connection'));
    }

    // Check rate limit
    try {
      rateLimiter.checkRateLimit(config.url);
    } catch (error) {
      return Promise.reject(error);
    }

    // PS: Attach auth token
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add request timestamp for monitoring
    config.metadata = { startTime: Date.now() };

    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  },
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Calculate request duration
    const duration = Date.now() - response.config.metadata?.startTime;

    // Log slow requests (> 5 seconds)
    if (duration > 5000) {
      logEvent(LogLevel.analytics, `Slow request detected: ${response.config.url} (${duration}ms)`);
    }

    // Validate response structure
    if (!response.data) {
      throw new Error('Empty response from server');
    }

    return response;
  },
  (error) => {
    const originalRequest = error.config;

    // Prevent retry loops
    if (!originalRequest || originalRequest._retry) {
      return Promise.reject(error);
    }

    // Handle network errors
    if (!error.response) {
      if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
        console.error('Request timeout:', originalRequest.url);
        return Promise.reject(new Error('Request timeout. Please try again.'));
      }

      if (error.message === 'Network Error') {
        console.error('Network error:', originalRequest.url);
        return Promise.reject(new Error('Network error. Check your connection.'));
      }

      return Promise.reject(new Error('Unable to reach server'));
    }

    const status = error.response.status;

    // Handle 401 - Unauthorized
    if (status === 401) {
      localStorage.removeItem('token');
      return Promise.reject(new Error('Session expired. Please login again.'));
    }

    // Handle 429 - Rate Limit with exponential backoff
    if (status === 429) {
      return Promise.reject(new Error('Too many requests. Please try again later.'));
    }

    // Handle 500+ server errors with retry
    if (status >= 500) {
      return Promise.reject(new Error('Server is not responding. Please try again later.'));
    }

    // Handle validation errors (400)
    if (status === 400) {
      const message = error.response.data?.error || 'Invalid request data';
      return Promise.reject(new Error(message));
    }

    return Promise.reject(error);
  },
);

// fetchController
/**
 *
 * @param {string} url
 * @param {import('axios').AxiosRequestConfig} config
 * @returns
 */
export const fetchController = async (url, config) => {
  // Validate config
  if (!url) {
    throw new Error('Invalid request configuration');
  }

  let options = {
    method: config?.method || 'POST',
    url,
    ...(config ?? {}),
  };

  try {
    const response = await axiosInstance(options);
    return response.data;
  } catch (error) {
    // Log error for monitoring
    logEvent(LogLevel.error, 'API Request Failed:', {
      url: config.url,
      method: config.method,
      error: error.message,
      timestamp: new Date().toISOString(),
    });

    throw error;
  }
};
