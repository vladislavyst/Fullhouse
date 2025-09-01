const CACHE_NAME = 'fullhouse-v1.0.0';
const STATIC_CACHE = 'fullhouse-static-v1';
const DYNAMIC_CACHE = 'fullhouse-dynamic-v1';

// Файлы для предварительного кэширования
const STATIC_FILES = [
  '/',
  '/index.html',
  '/manifest.json',
  '/offline.html',
  '/LOGO fullhouse.png',
  '/LOGO fullhouse.png'
];

// Файлы для кэширования при загрузке
const RUNTIME_FILES = [
  '/projects.json',
  '/Forest Residence.jpeg',
  '/Lucky House.jpeg',
  '/Паркфилд.jpeg',
  '/LOGO fullhouse.png'
];

// Установка Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Кэширование статических файлов');
        return cache.addAll(STATIC_FILES);
      })
      .then(() => {
        console.log('Service Worker установлен');
        return self.skipWaiting();
      })
  );
});

// Активация Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            console.log('Удаление старого кэша:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('Service Worker активирован');
      return self.clients.claim();
    })
  );
});

// Перехват сетевых запросов
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Стратегия кэширования для разных типов запросов
  if (request.method === 'GET') {
    // API запросы - Network First с fallback на кэш
    if (url.pathname.includes('/api/') || url.pathname.includes('/projects.json')) {
      event.respondWith(
        fetch(request)
          .then((response) => {
            // Кэшируем успешные ответы
            if (response.status === 200) {
              const responseClone = response.clone();
              caches.open(DYNAMIC_CACHE).then((cache) => {
                cache.put(request, responseClone);
              });
            }
            return response;
          })
          .catch(() => {
            // Fallback на кэш при ошибке сети
            return caches.match(request);
          })
      );
    }
    // Статические ресурсы - Cache First с fallback на сеть
    else if (request.destination === 'image' || 
             request.destination === 'style' || 
             request.destination === 'script') {
      event.respondWith(
        caches.match(request)
          .then((response) => {
            if (response) {
              return response;
            }
            return fetch(request).then((response) => {
              // Кэшируем новые ресурсы
              if (response.status === 200) {
                const responseClone = response.clone();
                caches.open(DYNAMIC_CACHE).then((cache) => {
                  cache.put(request, responseClone);
                });
              }
              return response;
            });
          })
      );
    }
    // HTML страницы - Network First с fallback на кэш
    else if (request.destination === 'document') {
      event.respondWith(
        fetch(request)
          .then((response) => {
            // Кэшируем HTML страницы
            if (response.status === 200) {
              const responseClone = response.clone();
              caches.open(DYNAMIC_CACHE).then((cache) => {
                cache.put(request, responseClone);
              });
            }
            return response;
          })
          .catch(() => {
            // Fallback на кэш или offline страницу
            return caches.match(request)
              .then((response) => {
                if (response) {
                  return response;
                }
                return caches.match('/offline.html');
              });
          })
      );
    }
  }
});

// Обработка push уведомлений
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'Новое уведомление от Fullhouse',
    icon: '/LOGO fullhouse.png',
    badge: '/LOGO fullhouse.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Открыть',
        icon: '/LOGO fullhouse.png'
      },
      {
        action: 'close',
        title: 'Закрыть',
        icon: '/LOGO fullhouse.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Fullhouse', options)
  );
});

// Обработка кликов по уведомлениям
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Фоновая синхронизация
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Здесь можно добавить логику фоновой синхронизации
      console.log('Фоновая синхронизация')
    );
  }
});

// Обработка сообщений от основного потока
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
