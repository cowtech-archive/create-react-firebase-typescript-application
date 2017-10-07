// Review this when typings are available
declare const WorkboxSW: any;
declare const importScripts: any;

// Load Workbox
require('../../node_modules/workbox-sw/build/importScripts/workbox-sw.prod.v2.1.0.js');
importScripts('/js/workbox.js');
const workbox: any = new WorkboxSW({clientsClaim: true});

// Cache Google Fonts
workbox.router.registerRoute(
  new RegExp('^(https://fonts.gstatic.com)'),
  workbox.strategies.cacheFirst({cacheName: 'google-fonts', cacheableResponse: {statuses: [0, 200]}, networkTimeoutSeconds: 4})
);

// Application
workbox.precache([]);
workbox.router.registerRoute(/\/images\/(.*\/)?.*\.(png|jpg|jpeg|gif)/, workbox.strategies.cacheFirst());
workbox.router.registerNavigationRoute('/index.html');
