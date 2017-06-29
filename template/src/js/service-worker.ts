declare const version: string;

interface ExtendableEvent extends Event {
  waitUntil(fn: Promise<any>): void;
}

interface FetchEvent extends Event {
  request: Request;
  respondWith(response: Promise<Response>|Response): Promise<Response>;
}

const activate = async function(): Promise<Array<boolean> | void>{
  const keys: Array<string> = await caches.keys();
  const toDelete: Array<string> = keys.filter((k: string) => k !== version);

  if(!toDelete.length)
    return Promise.resolve();

  // Delete all previous caches
  return await Promise.all(toDelete.map((k: string) => caches.delete(k)));
};

const fetchWithCache = async function(request: Request): Promise<Response>{
  if(!request.url.includes("{{domain}}")) // Don't try to cache external resources
    return fetch(request);

  // Search in the cache
  const cache: Cache = await caches.open(version);
  let cachedResponse: Response = await cache.match(request);

  if(cachedResponse)
    return cachedResponse;

  // Not found, make a real call
  const fetchRequest: Request = request.clone(); // Clone is needed in order to consume stream from both browser and cache
  const response: Response = await fetch(fetchRequest);
  cachedResponse = response.clone(); // Clone is needed in order to consume stream from both browser and cache

  // Request failed
  if(!response.ok)
    throw new Error(`Request failed with error ${response.status}`);

  // Save in the cache and then return to the client
  await cache.put(request, response);

  return cachedResponse;
};

self.addEventListener("activate", (event: ExtendableEvent) => {
  event.waitUntil(activate());
});

self.addEventListener("fetch", (event: FetchEvent) => {
  event.respondWith(fetchWithCache(event.request)); // tslint:disable-line no-floating-promises
});
