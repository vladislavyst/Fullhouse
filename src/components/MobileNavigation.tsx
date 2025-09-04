import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { 
  Menu, 
  X, 
  Home, 
  Building2, 
  Calculator, 
  Phone, 
  Info,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface MobileNavigationProps {
  className?: string;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const location = useLocation();
  const { ref } = useScrollAnimation({ animation: 'slide-up' });

  // Минимальное расстояние для свайпа
  const minSwipeDistance = 50;

  const navigationItems = [
    {
      title: 'Главная',
      icon: Home,
      href: '/',
      description: 'О компании и услугах'
    },
    {
      title: 'Проекты',
      icon: Building2,
      href: '/projects',
      description: 'Каталог готовых проектов'
    },
    {
      title: 'Реализованные',
      icon: ExternalLink,
      href: '/realized',
      description: 'Построенные объекты'
    },
    {
      title: 'Контакты',
      icon: Phone,
      href: '/contact',
      description: 'Связаться с нами'
    },
    {
      title: 'О компании',
      icon: Info,
      href: '/#about',
      description: 'Узнать больше о нас'
    }
  ];

  // Обработка свайпов
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && isOpen) {
      // Свайп влево закрывает меню
      setIsOpen(false);
    } else if (isRightSwipe && !isOpen) {
      // Свайп вправо открывает меню
      setIsOpen(true);
    }
  };

  // Закрытие меню при изменении маршрута
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Определение активной секции
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigationClick = (href: string) => {
    if (href.startsWith('/#')) {
      // Плавная прокрутка к секции
      const sectionId = href.substring(2);
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false);
  };

  return (
    <div className={`lg:hidden ${className}`} ref={ref}>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="p-2 text-white hover:text-amber-300 transition-colors"
            aria-label="Открыть меню"
          >
            <Menu className="w-6 h-6" />
          </Button>
        </SheetTrigger>
        
        <SheetContent 
          side="left" 
          className="w-80 p-0 bg-gradient-to-b from-slate-800 to-gray-900 border-r border-amber-500"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Header */}
          <div className="p-6 border-b border-amber-500/30">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Меню</h2>
              <Button
                variant="ghost"
                size="sm"
                className="p-1 text-white hover:text-amber-300 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            <p className="text-sm text-gray-300 mt-2">
              Навигация по сайту
            </p>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {navigationItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href || 
                               (item.href.startsWith('/#') && activeSection === item.href.substring(2));
                
                return (
                  <li key={item.title}>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start p-4 h-auto text-left transition-all duration-300 ${
                        isActive 
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' 
                          : 'text-white hover:bg-white/10 hover:text-amber-300'
                      }`}
                      onClick={() => handleNavigationClick(item.href)}
                      style={{ 
                        animationDelay: `${index * 100}ms`,
                        transform: isOpen ? 'translateX(0)' : 'translateX(-20px)',
                        opacity: isOpen ? 1 : 0,
                        transition: `all 0.3s ease ${index * 100}ms`
                      }}
                    >
                      <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="font-medium">{item.title}</div>
                        <div className="text-xs text-gray-400 mt-1">{item.description}</div>
                      </div>
                      <ChevronRight className="w-4 h-4 ml-2 flex-shrink-0" />
                    </Button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-amber-500/30">
            <div className="text-center">
              <p className="text-sm text-gray-400 mb-3">Свяжитесь с нами</p>
              <div className="flex justify-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-amber-300 border-amber-500/30 hover:bg-amber-500/20"
                  asChild
                >
                  <Link to="/contact">
                    <Phone className="w-4 h-4 mr-2" />
                    Контакты
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavigation;
