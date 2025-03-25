// 客户端插件，用于注册Service Worker和PWA功能

export default defineNuxtPlugin(() => {
  // 仅在生产环境中注册Service Worker
  if (process.env.NODE_ENV === 'production') {
    onMounted(() => {
      registerServiceWorker();
    });
  }
});

// 注册Service Worker
async function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/js/service-worker.js', {
        scope: '/',
      });

      if (registration.installing) {
        console.log('Service worker installing');
      } else if (registration.waiting) {
        console.log('Service worker installed');
      } else if (registration.active) {
        console.log('Service worker active');
      }

      // 检查更新
      checkForUpdates(registration);

    } catch (error) {
      console.error('Service worker registration failed:', error);
    }
  }
}

// 检查Service Worker更新
function checkForUpdates(registration: ServiceWorkerRegistration) {
  // 定期检查更新
  setInterval(() => {
    registration.update();
  }, 1000 * 60 * 60); // 每小时检查一次

  // 监听控制更改事件
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    window.location.reload();
  });

  // 监听新的Service Worker
  registration.addEventListener('updatefound', () => {
    const newWorker = registration.installing;

    if (!newWorker) return;

    // 监听状态变化
    newWorker.addEventListener('statechange', () => {
      if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
        // 新的Service Worker已安装，但尚未激活
        showUpdateNotification();
      }
    });
  });
}

// 显示更新通知
function showUpdateNotification() {
  // 创建一个简单的更新通知
  const notification = document.createElement('div');
  notification.style.position = 'fixed';
  notification.style.bottom = '20px';
  notification.style.left = '20px';
  notification.style.right = '20px';
  notification.style.backgroundColor = '#afe468';
  notification.style.color = '#303018';
  notification.style.padding = '12px 16px';
  notification.style.borderRadius = '4px';
  notification.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.15)';
  notification.style.zIndex = '9999';
  notification.style.display = 'flex';
  notification.style.justifyContent = 'space-between';
  notification.style.alignItems = 'center';

  // 通知内容
  const message = document.createElement('div');
  message.textContent = '应用程序有新版本可用。';

  // 刷新按钮
  const refreshButton = document.createElement('button');
  refreshButton.textContent = '刷新';
  refreshButton.style.backgroundColor = '#303018';
  refreshButton.style.color = 'white';
  refreshButton.style.border = 'none';
  refreshButton.style.padding = '8px 16px';
  refreshButton.style.borderRadius = '4px';
  refreshButton.style.cursor = 'pointer';

  // 点击刷新按钮
  refreshButton.addEventListener('click', () => {
    window.location.reload();
  });

  // 关闭按钮
  const closeButton = document.createElement('button');
  closeButton.textContent = '稍后';
  closeButton.style.backgroundColor = 'transparent';
  closeButton.style.border = 'none';
  closeButton.style.marginLeft = '10px';
  closeButton.style.cursor = 'pointer';

  // 点击关闭按钮
  closeButton.addEventListener('click', () => {
    document.body.removeChild(notification);
  });

  // 添加按钮到通知
  const buttonContainer = document.createElement('div');
  buttonContainer.appendChild(refreshButton);
  buttonContainer.appendChild(closeButton);

  // 组合通知
  notification.appendChild(message);
  notification.appendChild(buttonContainer);

  // 添加通知到页面
  document.body.appendChild(notification);
}
