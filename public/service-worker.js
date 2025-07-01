const CACHE_NAME = "pwa-facturacion-cache-v1";

const archivosParaCachear = [
    './',
    './index.html',
    './manifest.json',
    './js/data.js',
    './js/main.js',
    './js/actions/cliente.js',
    './js/actions/factura.js',
    './js/actions/facturasGuardadas.js',
    './js/actions/producto.js',
    './js/components/clienteList.js',
    './js/components/facturaResumen.js',
    './js/components/productoList.js',
    './js/helpers/facturasGuardadas.js',
    './js/helpers/limpiarCampos.js',
    './js/helpers/selects.js'
];

self.addEventListener('install',(event)=>{
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then((cache)=>{
            return cache.addAll(archivosParaCachear);
        })
    );
});

self.addEventListener('fetch',(event)=>{
    event.respondWith(
        caches.match(event.request)
        .then((respuestaCache)=>{
            if (respuestaCache) {
                return respuestaCache;
            }
            return fetch(event.request);
        })
    );
});