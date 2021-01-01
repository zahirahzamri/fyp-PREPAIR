const staticCacheName = 'site-static-v3';
const dynamicCacheName = 'site-dynamic-v3';
const assets = [
    '/',
    '/public/index.html',
    '/public/js/app.js',
    '/public/js/ui.js',
    '/public/js/materialize.min.js',
    '/public/css/styles.css',
    '/public/css/materialize.min.css',
    '/public/img/logo.png',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://use.fontawesome.com/releases/v5.0.13/css/all.css',
    'https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
    '/public/pages/fallback.html',
    '/public/js/auth.js',
    '/public/js/index.js',
    '/public/js/db.js'
];


//cache size limit function 
const limitCacheSize = (name, size) => {
    caches.open(name).then(cache => {
        cache.keys().then(keys => {
            if(keys.length > size){
                cache.delete(keys[0]).then(limitCacheSize(name, size))
            }
        })
    })
};



// install event
self.addEventListener('install', evt => {
    // console.log('service worker installed');
    evt.waitUntil(
        caches.open(staticCacheName).then((cache) => {
            console.log('caching shell assets');
            cache.addAll(assets);
        })
    );
    
});

// activate event
self.addEventListener('activate', evt => {
    // console.log('service worker activated');

    //deleting old version of cache
    evt.waitUntil(
        caches.keys().then(keys => {
            // console.log(keys);
            return Promise.all(keys
                .filter(key => key !== staticCacheName && key !== dynamicCacheName)
                .map(key => caches.delete(key))
            )
        })
    );

});



// fetch event
self.addEventListener('fetch', evt => {

    // check if request is made by chrome extensions or web page
    // if request is made for web page url must contains http.
    if (!(evt.request.url.indexOf('http') === 0)) return; // skip the request. if request is not made with http protocol

    if(evt.request.url.indexOf('firestore.googleapis.com') === -1){
        evt.respondWith(
            caches.match(evt.request).then(cacheRes => {
              return cacheRes || fetch(evt.request).then(fetchRes => {
                  return caches.open(dynamicCacheName).then(cache => {
                      cache.put(evt.request.url, fetchRes.clone());
                      limitCacheSize(dynamicCacheName, 35);
                      return fetchRes;
                  })
              });
            }).catch(() => {
                if(evt.request.url.indexOf('.html') > -1){
                  return caches.match('/public/pages/fallback.html');
                } 
              })      
          );
    }

});