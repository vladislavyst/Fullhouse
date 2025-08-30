import { MapPin, Phone, Mail, Clock, Facebook, Instagram, MessageCircle } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const services = [
    'Строительство домов',
    'Жилые комплексы',
    'Коммерческие здания',
    'Реконструкция',
    'Проектирование',
    'Консалтинг'
  ];

  const company = [
    'О компании',
    'Наша команда',
    'Лицензии',
    'Сертификаты',
    'Вакансии',
    'Новости'
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
            {/* Company Info */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                  <span className="text-accent-foreground font-bold text-lg">F</span>
                </div>
                <span className="text-2xl font-bold">Fullhouse</span>
              </div>
              <p className="text-primary-foreground/80 leading-relaxed">
                Ведущая строительная компания Новороссийска. Более 12 лет создаем качественную недвижимость 
                для жизни и бизнеса.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center hover:bg-accent transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center hover:bg-accent transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center hover:bg-accent transition-colors">
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Услуги</h3>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index}>
                    <a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors text-sm">
                      {service}
                    </a>
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
                    <a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors text-sm">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Контакты</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-primary-foreground/80">
                    353900, Краснодарский край,<br />
                    г. Новороссийск,<br />
                    ул. Хворостьянского, 4
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-accent flex-shrink-0" />
                  <a href="tel:+78617123456" className="text-sm text-primary-foreground/80 hover:text-accent transition-colors">
                    +7 (8617) 123-456
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-accent flex-shrink-0" />
                  <a href="mailto:info@fullhouse-nvr.ru" className="text-sm text-primary-foreground/80 hover:text-accent transition-colors">
                    info@fullhouse-nvr.ru
                  </a>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-primary-foreground/80">
                    Пн-Пт: 9:00 - 18:00<br />
                    Сб: 10:00 - 16:00<br />
                    Вс: выходной
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-primary-foreground/20 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="text-sm text-primary-foreground/60">
              © {currentYear} ООО "Fullhouse". Все права защищены.
            </div>
            <div className="flex flex-wrap items-center space-x-6 text-sm text-primary-foreground/60">
              <a href="#" className="hover:text-accent transition-colors">
                Политика конфиденциальности
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                Пользовательское соглашение
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                Карта сайта
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;