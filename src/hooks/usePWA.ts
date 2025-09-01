import { useState, useEffect } from 'react';

interface PWAState {
  isInstalled: boolean;
  isOnline: boolean;
  isUpdateAvailable: boolean;
  canInstall: boolean;
  deferredPrompt: any;
}

export const usePWA = () => {
  const [pwaState, setPwaState] = useState<PWAState>({
    isInstalled: false,
    isOnline: navigator.onLine,
    isUpdateAvailable: false,
    canInstall: false,
    deferredPrompt: null,
  });

  useEffect(() => {
    // Проверяем, установлено ли приложение
    const checkInstallation = () => {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
      const isIOSStandalone = (window.navigator as any).standalone === true;
      
      setPwaState(prev => ({
        ...prev,
        isInstalled: isStandalone || isIOSStandalone,
      }));
    };

    // Обработчик события beforeinstallprompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setPwaState(prev => ({
        ...prev,
        canInstall: true,
        deferredPrompt: e,
      }));
    };

    // Обработчик события appinstalled
    const handleAppInstalled = () => {
      setPwaState(prev => ({
        ...prev,
        isInstalled: true,
        canInstall: false,
        deferredPrompt: null,
      }));
    };

    // Обработчик изменения состояния сети
    const handleOnline = () => {
      setPwaState(prev => ({ ...prev, isOnline: true }));
    };

    const handleOffline = () => {
      setPwaState(prev => ({ ...prev, isOnline: false }));
    };

    // Обработчик обновления Service Worker
    const handleUpdateFound = () => {
      setPwaState(prev => ({ ...prev, isUpdateAvailable: true }));
    };

    // Регистрируем Service Worker
    const registerServiceWorker = async () => {
      if ('serviceWorker' in navigator) {
        try {
          const registration = await navigator.serviceWorker.register('/sw.js');
          
          // Слушаем обновления
          registration.addEventListener('updatefound', handleUpdateFound);
          
          // Проверяем обновления
          registration.update();
          
          console.log('Service Worker зарегистрирован:', registration);
        } catch (error) {
          console.error('Ошибка регистрации Service Worker:', error);
        }
      }
    };

    // Инициализация
    checkInstallation();
    registerServiceWorker();

    // Добавляем слушатели событий
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Очистка
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Функция для установки приложения
  const installApp = async () => {
    if (!pwaState.deferredPrompt) {
      console.log('Нет возможности установки');
      return false;
    }

    try {
      pwaState.deferredPrompt.prompt();
      const { outcome } = await pwaState.deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('Пользователь принял установку');
        setPwaState(prev => ({
          ...prev,
          canInstall: false,
          deferredPrompt: null,
        }));
        return true;
      } else {
        console.log('Пользователь отклонил установку');
        return false;
      }
    } catch (error) {
      console.error('Ошибка при установке:', error);
      return false;
    }
  };

  // Функция для обновления приложения
  const updateApp = async () => {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.getRegistration();
        if (registration) {
          await registration.update();
          setPwaState(prev => ({ ...prev, isUpdateAvailable: false }));
          return true;
        }
      } catch (error) {
        console.error('Ошибка при обновлении:', error);
      }
    }
    return false;
  };

  // Функция для отправки push уведомлений
  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
    return false;
  };

  // Функция для отправки тестового уведомления
  const sendTestNotification = () => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Fullhouse', {
        body: 'Добро пожаловать в наше приложение!',
        icon: '/icons/icon-192x192.png',
        badge: '/icons/icon-72x72.png',
      });
    }
  };

  return {
    ...pwaState,
    installApp,
    updateApp,
    requestNotificationPermission,
    sendTestNotification,
  };
};
