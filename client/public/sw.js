// Basic service worker for offline support (no plugin)
const CACHE_NAME = 'ssa-cache-v1';
const APP_SHELL = ['/', '/index.html', '/manifest.webmanifest'];

// Install: pre-cache minimal app shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting()),
  );
});

// Activate: clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.map((key) => {
            if (key !== CACHE_NAME) return caches.delete(key);
            return undefined;
          }),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

// Fetch:
// - SPA navigations => network-first, fallback to cached index.html
// - Same-origin static assets => cache-first with background fill
self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Handle SPA navigations
  if (request.mode === 'navigate') {
    event.respondWith(fetch(request).catch(() => caches.match('/index.html')));
    return;
  }

  // Same-origin static assets: cache-first
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((response) => {
          const respClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, respClone));
          return response;
        });
      }),
    );
  }
});
