workbox.skipWaiting();
workbox.clientsClaim();

// Cache Google Fonts
workbox.routing.registerRoute(
  new RegExp('^(https://fonts.gstatic.com)'),
  workbox.strategies.cacheFirst({cacheName: 'google-fonts', plugins: [new workbox.cacheableResponse.Plugin({statuses:[0, 200]})]})
);

// Application
workbox.routing.registerRoute(/\/images\/(.*\/)?.*\.(bmp|jpg|jpeg|png|svg|webp)/, workbox.strategies.cacheFirst());
workbox.routing.registerRoute(/\/manifest.json/, workbox.strategies.networkOnly());
workbox.routing.registerNavigationRoute('/index.html');

// Precaching
workbox.precaching.precacheAndRoute(self.__precacheManifest);
