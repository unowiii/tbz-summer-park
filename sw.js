const CACHE = "summer-park-v50";
const ASSETS = [
  "./index.html",
  "./guide.html",
  "./img/zone_stage.png",
  "./img/zone_bench.png",
  "./img/zone_food.png",
  "./img/zone_night.png",
  "./img/zone_back.png",
  "./img/zone_lot.png",
  "./img/zone_game.png",
  "./img/zone_carousel.png",
  "./img/zone_fountain.png",
  "./img/zone_ticket.png",
  "./img/zone_photo.png",
  "./img/zone_1.png",
  "./img/zone_2.png",
  "./img/zone_3.png",
  "./img/zone_q.png",
  "./img/zone_hyunjae.png",
  "./img/zone_younghoon.png",
  "./img/zone_juyeon.png",
  "./img/zone_sunwoo.png",
  "./img/zone_new.png",
  "./img/zone_kevin.png",
  "./img/zone_eric.png",
  "./img/zone_jacob.png",
  "./img/zone_sangyeon.png",
  "./img/pic_adf06b7bd7.jpg",
  "./img/pic_084490ef93.jpg",
  "./img/pic_866131d372.jpg",
  "./img/pic_6bf5cb0ce1.jpg",
  "./img/pic_d0539f3acd.jpg",
  "./img/pic_d001f7d655.jpg",
  "./img/pic_f01d26485a.jpg",
  "./img/pic_9e6e525eca.jpg",
  "./img/pic_b2d43bdaf6.jpg",
  "./img/pic_e84e65d65d.jpg",
  "./img/pic_cc51c61901.jpg",
  "./img/pic_40d15dda1f.jpg",
  "./img/pic_46bd8146ce.jpg",
  "./img/pic_20e27eea21.jpg",
  "./img/pic_ffd63abf2f.jpg",
  "./img/pic_f38ab1e8e7.jpg",
  "./img/pic_1e8ee1741f.jpg",
  "./img/pic_0d133acf8b.jpg",
  "./img/pic_3f097ac451.jpg",
  "./img/pic_1a3706bea0.jpg",
  "./img/pic_60ad184f79.jpg",
  "./img/pic_80c2557d5e.jpg",
  "./img/pic_21d1080019.jpg",
  "./img/pic_5c4e10ea77.jpg",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png",
  "./icons/icon-180.png"
];

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (c) {
      return c.addAll(ASSETS);
    }).then(function () {
      return self.skipWaiting();
    })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) {
        return caches.delete(k);
      }));
    }).then(function () {
      return self.clients.claim();
    })
  );
});

self.addEventListener("fetch", function (e) {
  const req = e.request;
  if (req.method !== "GET") return;
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req).then(function (r) {
        const copy = r.clone();
        caches.open(CACHE).then(function (c) { c.put("./index.html", copy); });
        return r;
      }).catch(function () {
        return caches.match("./index.html");
      })
    );
    return;
  }
  e.respondWith(
    caches.match(req).then(function (hit) {
      if (hit) return hit;
      return fetch(req).then(function (r) {
        const copy = r.clone();
        caches.open(CACHE).then(function (c) { c.put(req, copy); });
        return r;
      });
    })
  );
});
