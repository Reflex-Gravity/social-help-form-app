// API Wise Rate limit
const RATE_LIMIT_CONFIG = {
  '/chat': { window: 60000, maxRequests: 20 }, // 20 requests per minute
  default: { window: 60000, maxRequests: 100 }, // Default: 100 per minute
};

// Rate limiter per endpoint
class RateLimiter {
  constructor() {
    this.requestQueues = new Map();
  }

  checkRateLimit(url) {
    if (!url) {
      throw new Error('Request is not valid');
    }
    // Get endpoint path
    const endpoint = url.split('?')[0];

    // Get rate limit config for this endpoint
    const config = RATE_LIMIT_CONFIG[endpoint] || RATE_LIMIT_CONFIG.default;

    // Initialize queue for this endpoint if doesn't exist
    if (!this.requestQueues.has(endpoint)) {
      this.requestQueues.set(endpoint, []);
    }

    const queue = this.requestQueues.get(endpoint);

    // Check if limit exceeded
    if (queue.length >= config.maxRequests) {
      throw new Error(`Rate limit exceeded for ${endpoint}. Please try again later.`);
    }

    this.scheduleClear(endpoint, config);
  }

  scheduleClear(endpoint, config) {
    const queue = this.requestQueues.get(endpoint);

    const requestId = Date.now() + Math.random();
    // Add current request to queue
    queue.push(requestId);

    // Schedule automatic cleanup after the rate limit window
    setTimeout(() => {
      const index = queue.indexOf(requestId);
      if (index > -1) {
        queue.splice(index, 1);
      }

      // Clean up empty queues
      if (queue.length === 0) {
        this.requestQueues.delete(endpoint);
      }
    }, config.window);
  }
}

export default RateLimiter;
