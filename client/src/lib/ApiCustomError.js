// Custom Error class for handling api errors
export default class ApiCustomError extends Error {
  constructor(message, options, ...params) {
    super(...params);

    // Maintains proper stack trace for where our error was thrown (non-standard)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiCustomError);
    }

    this.name = 'ApiCustomError';
    this.message = message;
    this.errorCode = options?.errorCode;
    delete options.errorCode;
    this.options = options;
  }
}
