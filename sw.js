/* keeps a copy of the trip page so it opens without internet; tries the newest version first, but uses the saved copy if the network takes over 3 seconds */
const C="iceland-2027-v158";
const CORE=["./","./index.html","./style.css","./trip.js","./data.js","./landing.js","./app.js","./html-to-image.js"];
const IMGS=["hero","pre","h0","hike","dettifoss","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","d10","d11","d12"].map(n=>"./img/"+n+".jpg").concat(["./img/icon-180.png","./img/icon-192.png","./img/icon-64.png"]);
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(CORE).then(()=>Promise.all(IMGS.map(u=>c.add(u).catch(()=>{}))))).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
  const r=e.request;if(r.method!=="GET")return;const u=new URL(r.url);
  if(u.origin===location.origin){
    const key=r.mode==="navigate"?"./index.html":r;
    const net=fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(C).then(c=>c.put(key,cp))}return res});
    const saved=()=>caches.match(r,{ignoreSearch:true}).then(m=>m||(r.mode==="navigate"?caches.match("./index.html"):null));
    const slow=new Promise(ok=>setTimeout(ok,3000)).then(saved).then(m=>m||net);
    e.respondWith(Promise.race([net.catch(()=>saved().then(m=>m||Promise.reject())),slow]));
    e.waitUntil(net.catch(()=>{}));return}
  if(/fonts\.(googleapis|gstatic)\.com$/.test(u.hostname)){
    e.respondWith(caches.match(r).then(m=>m||fetch(r).then(res=>{const cp=res.clone();caches.open(C).then(c=>c.put(r,cp));return res})))}
});
