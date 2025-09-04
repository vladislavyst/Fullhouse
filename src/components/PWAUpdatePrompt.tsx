import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

const PWAUpdatePrompt = () => {
  const [updateAvailable, setUpdateAvailable] = useState(false);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration().then((registration) => {
        if (!registration) return;
        registration.addEventListener('updatefound', () => {
          setUpdateAvailable(true);
        });
      });

      navigator.serviceWorker.addEventListener('controllerchange', () => {
        // Новая версия активирована
        setUpdateAvailable(false);
      });
    }
  }, []);

  if (!updateAvailable) return null;

  const refresh = async () => {
    if (navigator.serviceWorker) {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration && registration.waiting) {
        registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      }
    }
    window.location.reload();
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50">
      <div className="mx-auto max-w-md rounded-xl bg-white shadow-2xl ring-1 ring-slate-200 p-4 flex items-center justify-between">
        <div className="text-sm text-slate-700">Доступна новая версия сайта.</div>
        <Button size="sm" onClick={refresh} className="fh-btn-primary">Обновить</Button>
      </div>
    </div>
  );
};

export default PWAUpdatePrompt;


