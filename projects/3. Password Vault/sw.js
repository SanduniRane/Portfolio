const CACHE = "vault-neon-v1";
const assets = [
  "/", "/welcome.html", "/vault.html", "/add_entry.html", "/style.css", "/vault-core.js", "/manifest.json"
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(assets)));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(self.clients.claim());
});
self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
