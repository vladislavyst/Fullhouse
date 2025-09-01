import { useState } from 'react';
import { Button } from '@/components/ui/button';
<<<<<<< HEAD
import { Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import MobileNavigation from './MobileNavigation';

const Header = () => {
  const navigation = [
    { name: 'О компании', href: '#about', isAnchor: true },
    { name: 'Услуги', href: '/services', isAnchor: false },
    { name: 'Проекты', href: '/projects', isAnchor: false },
    { name: 'Калькулятор', href: '#calculator', isAnchor: true },
    { name: 'Контакты', href: '/contact', isAnchor: false },
  ];

  return (
    <header className="fixed top-0 w-full bg-gradient-to-r from-slate-700 via-slate-800 to-gray-900 border-b-2 border-amber-500 shadow-xl z-50 backdrop-blur-sm bg-opacity-95">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-90 transition-all duration-300 hover:scale-105">
            <img 
              src="/LOGO fullhouse.png" 
              alt="Fullhouse Logo" 
              className="h-48 w-auto filter brightness-110 contrast-125 saturate-110 drop-shadow-lg"
            />
          </Link>
=======
import { Menu, X, Phone, MapPin } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'О компании', href: '#about' },
    { name: 'Услуги', href: '#services' },
    { name: 'Проекты', href: '#projects' },
    { name: 'Калькулятор', href: '#calculator' },
    { name: 'Контакты', href: '#contacts' },
  ];

  return (
    <header className="fixed top-0 w-full bg-background/95 backdrop-blur-md border-b border-border z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">F</span>
            </div>
            <span className="text-xl font-bold text-primary">Fullhouse</span>
          </div>
>>>>>>> 39d3f718b0d8f7b0390d11e523d856b03bc5bd8d

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
<<<<<<< HEAD
              item.isAnchor ? (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-white hover:text-amber-300 font-medium transition-colors"
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-white hover:text-amber-300 font-medium transition-colors"
                >
                  {item.name}
                </Link>
              )
=======
              <a
                key={item.name}
                href={item.href}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {item.name}
              </a>
>>>>>>> 39d3f718b0d8f7b0390d11e523d856b03bc5bd8d
            ))}
          </nav>

          {/* Contact Info & CTA */}
          <div className="hidden lg:flex items-center space-x-4">
<<<<<<< HEAD
            <div className="flex items-center space-x-2 text-sm text-gray-200">
              <MapPin className="w-4 h-4" />
              <span>Новороссийск</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-200">
              <Phone className="w-4 h-4" />
              <span>+7 (8617) 123-456</span>
            </div>
            
            <Button variant="default" size="sm" asChild>
              <Link to="/contact">
                Консультация
              </Link>
            </Button>
          </div>

          {/* Mobile Navigation */}
          <MobileNavigation />
        </div>
=======
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>Новороссийск</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Phone className="w-4 h-4" />
              <span>+7 (8617) 123-456</span>
            </div>
            <Button variant="default" size="sm">
              Консультация
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-md text-muted-foreground hover:text-primary"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-4 border-t border-border">
                <div className="flex items-center space-x-2 px-3 py-2 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span>+7 (8617) 123-456</span>
                </div>
                <div className="px-3 pt-2">
                  <Button variant="default" size="sm" className="w-full">
                    Консультация
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
>>>>>>> 39d3f718b0d8f7b0390d11e523d856b03bc5bd8d
      </div>
    </header>
  );
};

export default Header;