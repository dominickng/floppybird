var CACHE_NAME = 'flappypwa-v4';
var urlsToCache = [
  '/floppybird/index.html',
  '/floppybird/css/main.css',
  '/floppybird/css/reset.css',
  '/floppybird/js/jquery.transit.min.js',
  '/floppybird/js/buzz.min.js',
  '/floppybird/js/main.js',
  '/floppybird/js/jquery.min.js',
  '/floppybird/assets/font_small_3.png',
  '/floppybird/assets/font_small_6.png',
  '/floppybird/assets/font_small_5.png',
  '/floppybird/assets/font_small_7.png',
  '/floppybird/assets/font_small_2.png',
  '/floppybird/assets/font_small_0.png',
  '/floppybird/assets/font_small_9.png',
  '/floppybird/assets/font_small_1.png',
  '/floppybird/assets/font_small_4.png',
  '/floppybird/assets/font_big_0.png',
  '/floppybird/assets/font_big_3.png',
  '/floppybird/assets/font_big_8.png',
  '/floppybird/assets/font_big_9.png',
  '/floppybird/assets/font_big_2.png',
  '/floppybird/assets/font_big_5.png',
  '/floppybird/assets/font_big_6.png',
  '/floppybird/assets/font_big_1.png',
  '/floppybird/assets/font_big_7.png',
  '/floppybird/assets/font_big_4.png',
  '/floppybird/assets/pipe.png',
  '/floppybird/assets/land.png',
  '/floppybird/assets/bird.png',
  '/floppybird/assets/medal_gold.png',
  '/floppybird/assets/medal_platinum.png',
  '/floppybird/assets/medal_silver.png',
  '/floppybird/assets/medal_bronze.png',
  '/floppybird/assets/pipe-up.png',
  '/floppybird/assets/pipe-down.png',
  '/floppybird/assets/replay.png',
  '/floppybird/assets/splash.png',
  '/floppybird/assets/scoreboard.png',
  '/floppybird/assets/sky.png',
  '/floppybird/assets/thumb.png',
  '/floppybird/assets/sounds/sfx_wing.ogg',
  '/floppybird/assets/sounds/sfx_point.ogg',
  '/floppybird/assets/sounds/sfx_swooshing.ogg',
  '/floppybird/assets/sounds/sfx_hit.ogg',
  '/floppybird/assets/sounds/sfx_die.ogg',
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // IMPORTANT: Clone the request. A request is a stream and
        // can only be consumed once. Since we are consuming this
        // once by cache and once by the browser for fetch, we need
        // to clone the response.
        var fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          function(response) {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
});
