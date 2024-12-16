const CACHE_NAME = 'type-tester-v1';
const ASSETS_TO_CACHE = [
    "/",
    "/index.ejs",
    "/pages/navtemplate.ejs",
    "/css/materialize.min.css",
    "/css/index.css",
    "/img/typeIcon.jpg",
    "/js/index.js",
    "/js/materialize.min.js",
    "/js/nav.js",
    "/pages/about.html",
    "/pages/signIn.html",
];

self.addEventListener("install", async (event) => {
    console.log("Installing service workers...");
    event.waitUntil(
        caches.keys().then((cacheNames) => {
          return Promise.all(
            cacheNames.map((cache) => {
              if (cache !== CACHE_NAME) {
                console.log("service Worker: Deleting old Cache");
                return caches.delete(cache);
              }
            })
          );
        })
      );
});


self.addEventListener("activate", async (event) => {
    console.log("Service Worker is Fetching...");
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).catch(() => {
        return caches.match('/index.ejs');
      });
    }).catch((err) => {
        console.error("Failed to fetch", err);
        throw err;
    })
  );
});