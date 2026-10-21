const F='https://uqprashdbuvkvplpuvah.supabase.co/functions/v1/recepnova-app';
self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==location.origin)return;
 e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open('rn').then(c=>c.put(e.request,cp));return r;}).catch(()=>caches.match(e.request).then(r=>r||caches.match('/'))));});
self.addEventListener('push',e=>{let d={};try{d=e.data.json();}catch(_){d={title:'Recepnova',body:e.data&&e.data.text()};}
 e.waitUntil(self.registration.showNotification(d.title||'Recepnova',{body:d.body||'Tienes un mensaje nuevo',icon:F+'/icon-192.png',badge:F+'/badge-96.png',tag:d.tag||'rn',renotify:true,data:{url:new URL(d.url||'#/inbox',self.registration.scope).href}}));});
self.addEventListener('notificationclick',e=>{e.notification.close();const url=(e.notification.data&&e.notification.data.url)||self.registration.scope;
 e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(cs=>{for(const c of cs){if('focus' in c){c.navigate(url);return c.focus();}}return self.clients.openWindow(url);}));});
