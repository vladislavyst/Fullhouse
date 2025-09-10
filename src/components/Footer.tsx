import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const services = [
    { name: 'Строительство домов', href: '/construction' },
    { name: 'Реконструкция', href: '/reconstruction' },
    { name: 'Проектирование', href: '/design' }
  ];

  const company = [
    { name: 'О компании', href: '/about' },
    { name: 'Лицензии', href: '/licenses' }
  ];

  return (
    <>
      {/* Карта сайта для SEO и навигации */}
      
      
      <footer className="relative overflow-hidden bg-gradient-to-b from-gray-950 via-slate-900 to-gray-900 text-white shadow-2xl border-t border-amber-500/30">
        <div className="pointer-events-none absolute inset-0 bg-gradient-radial-amber-bottom" />
        <div className="container mx-auto px-4">
          {/* Main Footer Content */}
          <div className="py-16">
            <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
              {/* Company Info */}
              <div className="space-y-6">
                <Link to="/" className="flex items-center space-x-2 hover:opacity-90 transition-all duration-300 hover:scale-105">
                  <img 
                    src="/LOGOLOGO.png" 
                    alt="Fullhouse Logo" 
                  />
                </Link>
                <p className="text-gray-300 leading-relaxed">
                  Ведущая строительная компания Новороссийска. Уже 3 года строим качественные дома 
                  для жизни и комфорта.
                </p>
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
                    <a href="tel:+79180400402" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                      +7 (918)-040-04-02
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
                © {currentYear} Строительная компания Фулл-Хаус. Все права защищены.
              </div>
              <div className="flex flex-wrap space-x-6 text-sm justify-center md:justify-end">
                <a href="https://federationigs.ru/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Федерация ИЖС
                </a>
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