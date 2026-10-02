const CACHE_NAME = 'clima-murcia-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './Logo%20Senderismo%20con%20humor.jpg'
];

// Instalar y guardar recursos en caché
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Interceptar peticiones para que funcione correctamente la PWA
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Devuelve la versión en caché si existe, si no, hace la petición a la red
        return response || fetch(event.request);
      })
  );
});