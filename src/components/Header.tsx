import { useState } from 'react';
import { Button } from '@/components/ui/button';
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

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
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
            ))}
          </nav>

          {/* Contact Info & CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-200">
              <MapPin className="w-4 h-4" />
              <span>Новороссийск</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-200">
              <Phone className="w-4 h-4" />
              <span>+7 (8617) 123-456</span>
            </div>
            
            <Button className="bg-amber-500 hover:bg-amber-600 text-white font-medium px-6 py-2 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg">
              Бесплатная консультация
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <MobileNavigation />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;