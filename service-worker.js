self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('password-manager-v1').then(cache => {
            return cache.addAll([
                './',
                './index.html',
                './style.css',
                './script.js',
                './icons/icon-32x32.png',
                './icons/icon-64x64.png',
                './icons/icon-128x128.png',
                './icons/icon-512x512.png'
            ]);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});