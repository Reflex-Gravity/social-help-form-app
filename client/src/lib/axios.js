import axios from 'axios';
import { logEvent, LogLevel } from '../services/logger.service';

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

// Retry configuration
let retryCount = 0;

// Request queue for rate limiting
const requestQueue = new Map();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 50;

// Rate limiter
const checkRateLimit = () => {
  const now = Date.now();
  const recentRequests = Array.from(requestQueue.values()).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW,
  );

  if (recentRequests.length >= MAX_REQUESTS_PER_WINDOW) {
    throw new Error('Client rate limit exceeded. Please slow down.');
  }

  requestQueue.set(now, now);

  // Cleanup old entries
  for (const [key, timestamp] of requestQueue.entries()) {
    if (now - timestamp > RATE_LIMIT_WINDOW) {
      requestQueue.delete(key);
    }
  }
};

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Check rate limit
    try {
      checkRateLimit();
    } catch (error) {
      return Promise.reject(error);
    }

    // Validate URL
    if (!config.url) {
      return Promise.reject(new Error('Request URL is required'));
    }

    // Check network connectivity
    if (!navigator.onLine) {
      return Promise.reject(new Error('No internet connection'));
    }

    // Attach auth token
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add request timestamp for monitoring
    config.metadata = { startTime: Date.now() };

    // Validate and sanitize request data
    if (config.data) {
      try {
        // Ensure data is serializable
        JSON.stringify(config.data);

        // Size limit check (5MB)
        const dataSize = new Blob([JSON.stringify(config.data)]).size;
        if (dataSize > 5 * 1024 * 1024) {
          return Promise.reject(new Error('Request payload too large'));
        }
      } catch (error) {
        return Promise.reject(new Error('Invalid request data format'));
      }
    }

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
      console.warn(`Slow request detected: ${response.config.url} (${duration}ms)`);
    }

    // Validate response structure
    if (!response.data) {
      throw new Error('Empty response from server');
    }

    // Reset retry count on success
    retryCount = 0;

    return response;
  },
  async (error) => {
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
      window.dispatchEvent(new Event('unauthorized'));
      return Promise.reject(new Error('Session expired. Please login again.'));
    }

    // Handle 403 - Forbidden
    if (status === 403) {
      return Promise.reject(new Error('Access denied'));
    }

    // Handle 404 - Not Found
    if (status === 404) {
      return Promise.reject(new Error('Resource not found'));
    }

    // Handle 429 - Rate Limit with exponential backoff
    if (status === 429) {
      if (retryCount < MAX_RETRIES) {
        const retryAfter = error.response.headers['retry-after'];
        const delay = retryAfter ? parseInt(retryAfter) * 1000 : Math.pow(2, retryCount) * 1000;

        retryCount++;
        originalRequest._retry = true;

        await new Promise((resolve) => setTimeout(resolve, delay));
        return axiosInstance(originalRequest);
      }
      return Promise.reject(new Error('Too many requests. Please try again later.'));
    }

    // Handle 500+ server errors with retry
    if (status >= 500 && retryCount < MAX_RETRIES) {
      retryCount++;
      originalRequest._retry = true;

      const delay = Math.pow(2, retryCount) * 1000;
      await new Promise((resolve) => setTimeout(resolve, delay));
      return axiosInstance(originalRequest);
    }

    // Handle validation errors (400)
    if (status === 400) {
      const message = error.response.data?.error || 'Invalid request data';
      return Promise.reject(new Error(message));
    }

    return Promise.reject(error);
  },
);

// Wrapper function with validation
export const fetchController = async (url, config) => {
  // Validate config
  if (!url) {
    throw new Error('Invalid request configuration');
  }

  let options = {
    method: options?.method || 'POST',
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
