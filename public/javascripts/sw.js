let files_to_cache = [
    '/layout.hbs',
    '/index.hbs',
    '/javascripts/script.js',
    '/stylesheets/style.css',
    'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.js',
    // 'https://maps.googleapis.com/maps/api/js?key=AIzaSyByNxjBkNrLKBO8Tea9JtbGy8PaEMrP0Pc&libraries=places',
    //add favicon.ico,
];


self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('v1').then((cache) => {
            return cache.addAll(files_to_cache);
        })
    );
});

self.addEventListener('activate', (event) => {
    console.log('Event activated: ' + event);
});

self.addEventListener('fetch', (event) => {
    event.respondWith(caches.match(event.request).then((response) => {
        if (response !== undefined) {
            return;
        }

        return fetch(event.request).then((response) => {
            let responseClone = response.clone();

            caches.open('v1')
                .then((cache) => {
                    cache.put(event.request, responseClone);
                });
            return response;
        })
            .catch(() => caches.match('/views/layout.hbs'));
    }));
});