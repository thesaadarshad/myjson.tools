const CACHE_VERSION = '1.0.6';
const CACHE_NAME = `json-playground-v${CACHE_VERSION}`;
const urlsToCache = [
  '/',
  '/index.html',
  `/styles.css?v=${CACHE_VERSION}`,
  `/app.js?v=${CACHE_VERSION}`,
  `/languages.js?v=${CACHE_VERSION}`,
  `/prism.min.js?v=${CACHE_VERSION}`,
  `/prism-json.min.js?v=${CACHE_VERSION}`,
  `/prism-light.min.css?v=${CACHE_VERSION}`,
  `/prism-dark.min.css?v=${CACHE_VERSION}`,
  `/jsonrepair.min.js?v=${CACHE_VERSION}`,
  `/tabular-json.min.js?v=${CACHE_VERSION}`,
  '/manifest.json',
  '/logo.svg',
  '/favicon.svg',
  '/icon-192x192.png',
  '/icon-512x512.png'
];

// Install event - cache all static assets
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Caching app shell');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('[Service Worker] Installed successfully');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[Service Worker] Installation failed:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('[Service Worker] Activated successfully');
      return self.clients.claim();
    })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return cached response
        if (response) {
          console.log('[Service Worker] Serving from cache:', event.request.url);
          return response;
        }

        // Clone the request
        const fetchRequest = event.request.clone();

        // Make network request
        return fetch(fetchRequest).then((response) => {
          // Check if valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          // Cache the fetched response
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });

          return response;
        }).catch((error) => {
          console.error('[Service Worker] Fetch failed:', error);
          // Return offline page if available
          return caches.match('/index.html');
        });
      })
  );
});

// Handle messages from the client
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => caches.delete(cacheName))
        );
      }).then(() => {
        self.clients.matchAll().then((clients) => {
          clients.forEach((client) => {
            client.postMessage({
              type: 'CACHE_CLEARED',
              message: 'Cache has been cleared successfully'
            });
          });
        });
      })
    );
  }
});

// Background sync (if supported)
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-json-data') {
    event.waitUntil(syncData());
  }
});

async function syncData() {
  console.log('[Service Worker] Syncing data...');
  // Add any background sync logic here if needed
}

// Push notifications (if needed in future)
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'New update available!',
    icon: '/icon-192x192.png',
    badge: '/icon-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };

  event.waitUntil(
    self.registration.showNotification('JSON Playground', options)
  );
});

