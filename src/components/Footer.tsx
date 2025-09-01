import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const services = [
    { name: 'Строительство домов', href: '/services' },
    { name: 'Реконструкция', href: '/services' },
    { name: 'Проектирование', href: '/services' }
  ];

  const company = [
    { name: 'О компании', href: '#about' },
    { name: 'Лицензии', href: '/services' },
    { name: 'Сертификаты', href: '/services' }
  ];

  return (
    <>
      {/* Карта сайта для SEO и навигации */}
      
      
      <footer className="bg-gradient-to-br from-slate-800 via-slate-900 to-gray-900 text-white shadow-2xl">
        <div className="container mx-auto px-4">
          {/* Main Footer Content */}
          <div className="py-16">
            <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
              {/* Company Info */}
              <div className="space-y-6">
                <Link to="/" className="flex items-center space-x-2 hover:opacity-90 transition-all duration-300 hover:scale-105">
                  <img 
                    src="/LOGO fullhouse.png" 
                    alt="Fullhouse Logo" 
                    className="h-32 w-auto filter brightness-110 contrast-125 saturate-110 drop-shadow-lg"
                  />
                </Link>
                <p className="text-gray-300 leading-relaxed">
                  Ведущая строительная компания Новороссийска. Более 12 лет создаем качественную недвижимость 
                  для жизни и бизнеса.
                </p>
                <div className="flex space-x-4">
                  {/* Яндекс Дзен */}
                  <a href="#" className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center hover:bg-red-500 transition-colors">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
                      <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z"/>
                      <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                    </svg>
                  </a>
                  
                  {/* Инстаграм */}
                  <a href="#" className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity">
                    <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  
                  {/* ВКонтакте */}
                  <a href="#" className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  
                  {/* YouTube */}
                  <a href="#" className="w-10 h-10 bg-red-600/20 rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Services */}
              <div>
                <h3 className="text-lg font-semibold mb-6">Услуги</h3>
                <ul className="space-y-3">
                  {services.map((service, index) => (
                    <li key={index}>
                      {service.href.startsWith('#') ? (
                        <a href={service.href} className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                          {service.name}
                        </a>
                      ) : (
                        <Link to={service.href} className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                          {service.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company */}
              <div>
                <h3 className="text-lg font-semibold mb-6">Компания</h3>
                <ul className="space-y-3">
                  {company.map((item, index) => (
                    <li key={index}>
                      {item.href.startsWith('#') ? (
                        <a href={item.href} className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                          {item.name}
                        </a>
                      ) : (
                        <Link to={item.href} className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                          {item.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Info */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold mb-6">Контакты</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-blue-400 mt-1" />
                    <div>
                      <p className="text-gray-300 text-sm">
                        г. Новороссийск<br />
                        ул. Хворостьянского, 4<br />
                        (бывшая ул. Молодежная, 4)
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-blue-400" />
                    <a href="tel:+78617123456" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                      +7 (8617) 123-456
                    </a>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-blue-400" />
                    <a href="mailto:info@fullhouse-neo.ru" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                      info@fullhouse-neo.ru
                    </a>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-blue-400" />
                    <p className="text-gray-300 text-sm">
                      Пн-Пт: 9:00-18:00<br />
                      Сб: 10:00-16:00
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-700 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-gray-400 text-sm">
                © {currentYear} Строительная компания Fullhouse. Все права защищены.
              </div>
              <div className="flex space-x-6 text-sm">
                <Link to="/privacy" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Политика конфиденциальности
                </Link>
                <Link to="/terms" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Условия использования
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;