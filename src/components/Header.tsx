import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import MobileNavigation from './MobileNavigation';

const Header = () => {
  const navigation = [
    { name: 'О компании', href: '#about', isAnchor: true },
    { name: 'Проекты', href: '/projects', isAnchor: false },
    { name: 'Реализованные', href: '/realized', isAnchor: false },
    { name: 'Контакты', href: '/contact', isAnchor: false },
  ];

  return (
    <header className="fixed top-0 w-full relative overflow-hidden bg-gradient-to-b from-gray-950 via-slate-900 to-gray-900 border-b border-amber-500/30 shadow-xl z-50 backdrop-blur-sm">
      <div className="pointer-events-none absolute inset-0 bg-gradient-radial-amber" />
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-90 transition-all duration-300 hover:scale-105">
            <img 
              src="/LOGOLOGO.png" 
              alt="Fullhouse Logo" 
              style={{ height: '220px', width: 'auto' }}
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
            <div className="flex flex-col space-y-1 text-sm text-gray-200">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <a href="tel:+79180400402" className="hover:text-amber-400 transition-colors">
                  +7 918 040-04-02
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <a href="tel:+79883464087" className="hover:text-amber-400 transition-colors">
                  +7 988 346-40-87
                </a>
              </div>
            </div>
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