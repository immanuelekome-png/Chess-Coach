const BUILD='3.0.0-rc.15';const CACHE='chess-coach-v300-rc15';const ASSETS=['./','./index.html','./manifest.webmanifest','./icon.svg','./engine/stockfish.js','./engine/stockfish.wasm','./pieces/classic-wK.png','./pieces/classic-wQ.png','./pieces/classic-wR.png','./pieces/classic-wB.png','./pieces/classic-wN.png','./pieces/classic-wP.png','./pieces/classic-bK.png','./pieces/classic-bQ.png','./pieces/classic-bR.png','./pieces/classic-bB.png','./pieces/classic-bN.png','./pieces/classic-bP.png','./pieces/alpha-wK.png','./pieces/alpha-wQ.png','./pieces/alpha-wR.png','./pieces/alpha-wB.png','./pieces/alpha-wN.png','./pieces/alpha-wP.png','./pieces/alpha-bK.png','./pieces/alpha-bQ.png','./pieces/alpha-bR.png','./pieces/alpha-bB.png','./pieces/alpha-bN.png','./pieces/alpha-bP.png','./pieces/heritage-wK.png','./pieces/heritage-wQ.png','./pieces/heritage-wR.png','./pieces/heritage-wB.png','./pieces/heritage-wN.png','./pieces/heritage-wP.png','./pieces/heritage-bK.png','./pieces/heritage-bQ.png','./pieces/heritage-bR.png','./pieces/heritage-bB.png','./pieces/heritage-bN.png','./pieces/heritage-bP.png','./apple-touch-icon.png','./icons/icon-192.png','./icons/icon-512.png'];
const absolute=path=>new URL(path,self.location.href).href;
const assetPaths=new Set(ASSETS.map(path=>new URL(absolute(path)).pathname));
const rootPath=new URL(absolute('./')).pathname;
let cacheDownload=null;
function cacheAppFiles(){if(!cacheDownload)cacheDownload=prepareAppFiles().finally(()=>{cacheDownload=null;});return cacheDownload;}
async function prepareAppFiles(){
 const stageName=CACHE+'-staging';await caches.delete(stageName);const stage=await caches.open(stageName);
 try{await stage.addAll(ASSETS.map(path=>new Request(absolute(path),{cache:'reload'})));
  for(const path of ['./','./index.html']){const response=await stage.match(absolute(path));if(!response||!await matchingBuild(response))throw Error('App files are still updating. Retry shortly.');}
  const cache=await caches.open(CACHE);for(const path of ASSETS){const key=absolute(path);await cache.put(key,await stage.match(key));}
 }finally{await caches.delete(stageName);}
}
async function matchingBuild(response){if(!response?.ok)return false;return (await response.clone().text()).match(/const APP_VERSION="([^"]+)"/)?.[1]===BUILD;}
async function cacheStatus(){const cache=await caches.open(CACHE);const present=await Promise.all(ASSETS.map(async path=>!!(await cache.match(absolute(path)))?.ok));return {version:BUILD,total:ASSETS.length,cached:present.filter(Boolean).length,ready:present.every(Boolean)};}
async function freshPage(request){const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),6000);try{return await fetch(new Request(request,{cache:'no-cache',signal:controller.signal}));}finally{clearTimeout(timer);}}
async function servePage(request){
 const cache=await caches.open(CACHE),cached=await cache.match(absolute('./index.html'))||await cache.match(absolute('./'));
 try{const response=await freshPage(request);if(await matchingBuild(response)){try{await cache.put(absolute('./index.html'),response.clone());await cache.put(absolute('./'),response.clone());}catch{}return response;}if(cached?.ok)return cached;if(response.ok)return response;throw Error('Page unavailable');}
 catch{if(cached?.ok)return cached;return new Response('<!doctype html><meta name="viewport" content="width=device-width"><title>Chess Coach</title><h1>Chess Coach is not ready offline yet</h1><p>Connect to the internet, reopen the app and finish downloading offline files in Settings.</p>',{status:503,headers:{'Content-Type':'text/html; charset=utf-8'}});}
}
async function serveAsset(request){
 const url=new URL(request.url);url.search='';const cache=await caches.open(CACHE),cached=await cache.match(url.href);if(cached?.ok)return cached;
 const response=await fetch(new Request(request,{cache:'no-cache'}));if(response.ok){try{await cache.put(url.href,response.clone());}catch{}}return response;
}
self.addEventListener('install',event=>event.waitUntil(cacheAppFiles()));
self.addEventListener('activate',event=>event.waitUntil(Promise.all([self.clients.claim(),caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('chess-coach-')&&k!==CACHE).map(k=>caches.delete(k))))])));
self.addEventListener('fetch',event=>{if(event.request.method!=='GET')return;const url=new URL(event.request.url);if(url.origin!==self.location.origin)return;if(url.pathname===rootPath||url.pathname===rootPath+'index.html')event.respondWith(servePage(event.request));else if(assetPaths.has(url.pathname))event.respondWith(serveAsset(event.request));});
self.addEventListener('message',event=>{const type=event.data?.type,port=event.ports?.[0];if(type==='SKIP_WAITING'){event.waitUntil(self.skipWaiting());return;}if(!['CACHE_STATUS','REPAIR_OFFLINE'].includes(type)||!port)return;event.waitUntil((async()=>{try{if(type==='REPAIR_OFFLINE')await cacheAppFiles();port.postMessage({ok:true,...await cacheStatus()});}catch{port.postMessage({ok:false,error:'Offline download did not finish. Check your connection and retry.'});}})());});
