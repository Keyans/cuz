// 定义缓存名称和版本
const CACHE_NAME = 'cuzcuz-cache-v1';

// 需要缓存的资源
const urlsToCache = [
  '/',
  '/index.html',
  '/assets/logo.svg',
  '/assets/logo-white.svg',
  '/assets/products/tshirt.png',
  '/assets/products/hoodie.png',
  '/assets/products/mug.png',
  '/assets/products/bags.png',
  '/assets/products/tshirt-2.png',
  '/assets/products/hoodie-2.png',
  '/favicon.png',
  '/assets/fonts/Ambit-Regular.woff2',
  '/assets/fonts/Ambit-Bold.woff2',
  '/assets/fonts/Roboto-Regular.woff2',
  '/assets/fonts/Roboto-Bold.woff2'
];

// 安装Service Worker
self.addEventListener('install', (event) => {
  // 等待直到Promise完成
  event.waitUntil(
    // 打开缓存
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache opened');
        // 添加资源到缓存
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.error('Pre-caching failed:', error);
      })
  );
});

// 激活Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    // 获取所有缓存的key
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // 删除旧版本的缓存
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );

  // 立即控制所有页面
  self.clients.claim();
});

// 拦截网络请求
self.addEventListener('fetch', (event) => {
  // 不缓存API请求
  if (event.request.url.includes('/api/')) {
    return;
  }

  // 不缓存POST请求
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    // 网络优先策略
    fetch(event.request)
      .then((response) => {
        // 检查请求是否成功
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // 克隆响应
        const responseToCache = response.clone();

        // 打开缓存并存储响应
        caches.open(CACHE_NAME)
          .then((cache) => {
            cache.put(event.request, responseToCache);
          });

        return response;
      })
      .catch(() => {
        // 如果网络请求失败，从缓存中尝试获取资源
        return caches.match(event.request)
          .then((cachedResponse) => {
            // 如果缓存中有资源，则返回
            if (cachedResponse) {
              return cachedResponse;
            }

            // 否则，可能需要返回默认的离线页面
            if (event.request.mode === 'navigate') {
              return caches.match('/offline.html');
            }

            // 对于图像等资源，可以返回默认的占位符
            const url = event.request.url;
            if (url.includes('/assets/') && url.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
              return caches.match('/assets/placeholder-image.png');
            }

            // 对于其他资源，返回空响应
            return new Response(null, { status: 404, statusText: 'Not found' });
          });
      })
  );
});

// 监听推送消息
self.addEventListener('push', (event) => {
  if (!event.data) return;

  // 解析推送消息数据
  const data = event.data.json();

  // 发送通知
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: data.icon || '/assets/logo.svg',
    badge: data.badge || '/favicon.png',
    data: data.data || {}
  });
});

// 处理通知点击
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  // 处理相关操作，如打开特定页面
  if (event.notification.data && event.notification.data.url) {
    clients.openWindow(event.notification.data.url);
  } else {
    clients.openWindow('/');
  }
});

// 后台同步
self.addEventListener('sync', (event) => {
  if (event.tag === 'order-sync') {
    event.waitUntil(syncOrders());
  } else if (event.tag === 'design-sync') {
    event.waitUntil(syncDesigns());
  }
});

// 同步订单数据
async function syncOrders() {
  try {
    // 从IndexedDB中获取待同步的订单
    const ordersToSync = await getPendingOrders();

    if (ordersToSync.length === 0) return;

    // 发送到服务器
    for (const order of ordersToSync) {
      await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
      });

      // 更新本地数据库，标记为已同步
      await markOrderSynced(order.id);
    }
  } catch (error) {
    console.error('Order sync failed:', error);
    // 重新注册后台同步
    self.registration.sync.register('order-sync');
  }
}

// 同步设计数据
async function syncDesigns() {
  // 实现类似syncOrders的逻辑
  console.log('Syncing designs...');
}

// 模拟从IndexedDB获取待同步订单的函数
async function getPendingOrders() {
  // 实际应用中，这应该从IndexedDB中获取数据
  return [];
}

// 模拟将订单标记为已同步的函数
async function markOrderSynced(orderId) {
  // 实际应用中，这应该更新IndexedDB中的数据
  console.log('Order synced:', orderId);
}
