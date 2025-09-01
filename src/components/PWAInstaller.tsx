import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, CheckCircle, X, Smartphone, Zap, Shield } from 'lucide-react';

interface PWAInstallerProps {
  className?: string;
}

const PWAInstaller = ({ className = '' }: PWAInstallerProps) => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  useEffect(() => {
    // Проверяем, установлено ли уже приложение
    const checkIfInstalled = () => {
      if (window.matchMedia('(display-mode: standalone)').matches || 
          (window.navigator as any).standalone === true) {
        setIsInstalled(true);
      }
    };

    // Слушаем событие beforeinstallprompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    };

    // Слушаем событие appinstalled
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowInstallPrompt(false);
      setDeferredPrompt(null);
    };

    checkIfInstalled();
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      console.log('Пользователь принял установку PWA');
    } else {
      console.log('Пользователь отклонил установку PWA');
    }

    setDeferredPrompt(null);
    setShowInstallPrompt(false);
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
  };

  // Если приложение уже установлено, не показываем ничего
  if (isInstalled) {
    return null;
  }

  // Если нет возможности установки, не показываем ничего
  if (!showInstallPrompt) {
    return null;
  }

  return (
    <div className={`fixed bottom-4 left-4 right-4 z-50 ${className}`}>
      <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0 shadow-2xl">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Smartphone className="w-5 h-5" />
            Установить приложение
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-blue-100 text-sm mb-4">
            Добавьте Fullhouse на главный экран для быстрого доступа и работы офлайн
          </p>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-2 text-xs text-blue-200">
              <Zap className="w-4 h-4" />
              <span>Быстрая загрузка</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-blue-200">
              <Shield className="w-4 h-4" />
              <span>Безопасно</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleInstallClick}
              className="flex-1 bg-white text-blue-600 hover:bg-blue-50"
              size="sm"
            >
              <Download className="w-4 h-4 mr-2" />
              Установить
            </Button>
            <Button
              onClick={handleDismiss}
              variant="ghost"
              className="text-blue-200 hover:text-white hover:bg-blue-500/20"
              size="sm"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PWAInstaller;
