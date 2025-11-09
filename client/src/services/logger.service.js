/**
 * Logger Service
 *
 * We can integrate sentry, postHog or any service to catch and track our error or analytics logs
 */

export const LogLevel = {
  error: 'error',
  analytics: 'analytics',
  info: 'info',
};

export function logEvent(level, ...args) {
  // .. call log service
  console.error(level, ...args);
}
