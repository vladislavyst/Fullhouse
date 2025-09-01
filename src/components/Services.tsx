<<<<<<< HEAD
import { ShoppingCart, TrendingUp, Calculator, Users, FileText, Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const Services = () => {
  // Custom SVG infographic icons
  const BuyingIcon = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <linearGradient id="buyingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
      </defs>
      {/* House */}
      <path d="M20 70 L50 40 L80 70 L80 85 L20 85 Z" fill="url(#buyingGrad)" opacity="0.9"/>
      <rect x="25" y="65" width="8" height="15" fill="#1D4ED8"/>
      <rect x="67" y="65" width="8" height="15" fill="#1D4ED8"/>
      <path d="M45 40 L55 40 L55 50 L45 50 Z" fill="#FCD34D"/>
      {/* Key */}
      <circle cx="70" cy="25" r="8" fill="#10B981" opacity="0.8"/>
      <rect x="75" y="22" width="12" height="6" rx="2" fill="#10B981" opacity="0.8"/>
      <rect x="85" y="20" width="3" height="2" fill="#10B981" opacity="0.8"/>
      <rect x="85" y="26" width="3" height="2" fill="#10B981" opacity="0.8"/>
      {/* Arrow */}
      <path d="M60 30 L68 25 L60 20" stroke="#10B981" strokeWidth="2" fill="none"/>
    </svg>
  );

  const SellingIcon = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <linearGradient id="sellingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
      </defs>
      {/* House */}
      <path d="M20 70 L50 40 L80 70 L80 85 L20 85 Z" fill="url(#sellingGrad)" opacity="0.9"/>
      <rect x="25" y="65" width="8" height="15" fill="#059669"/>
      <rect x="67" y="65" width="8" height="15" fill="#059669"/>
      <path d="M45 40 L55 40 L55 50 L45 50 Z" fill="#FCD34D"/>
      {/* Money */}
      <circle cx="25" cy="25" r="12" fill="#FCD34D" opacity="0.9"/>
      <text x="25" y="30" textAnchor="middle" fontSize="12" fill="#D97706" fontWeight="bold">₽</text>
      {/* Trending up arrow */}
      <path d="M60 35 L75 20 L75 28 L85 28 L85 20 L75 20" stroke="#10B981" strokeWidth="3" fill="#10B981"/>
      <path d="M40 35 L60 35" stroke="#10B981" strokeWidth="2"/>
    </svg>
  );

  const MortgageIcon = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <linearGradient id="mortgageGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
      </defs>
      {/* Bank building */}
      <rect x="30" y="30" width="40" height="50" fill="url(#mortgageGrad)" opacity="0.9"/>
      <rect x="35" y="35" width="6" height="6" fill="#A855F7"/>
      <rect x="45" y="35" width="6" height="6" fill="#A855F7"/>
      <rect x="55" y="35" width="6" height="6" fill="#A855F7"/>
      <rect x="35" y="45" width="6" height="6" fill="#A855F7"/>
      <rect x="45" y="45" width="6" height="6" fill="#A855F7"/>
      <rect x="55" y="45" width="6" height="6" fill="#A855F7"/>
      <rect x="45" y="65" width="10" height="15" fill="#7C3AED"/>
      {/* Percentage */}
      <circle cx="20" cy="20" r="10" fill="#FCD34D" opacity="0.9"/>
      <text x="20" y="25" textAnchor="middle" fontSize="8" fill="#D97706" fontWeight="bold">%</text>
      {/* Calculator */}
      <rect x="75" y="60" width="20" height="25" rx="2" fill="#6B7280" opacity="0.8"/>
      <rect x="77" y="62" width="16" height="8" fill="#F3F4F6"/>
      <circle cx="80" cy="75" r="1.5" fill="#F3F4F6"/>
      <circle cx="85" cy="75" r="1.5" fill="#F3F4F6"/>
      <circle cx="90" cy="75" r="1.5" fill="#F3F4F6"/>
      <circle cx="80" cy="80" r="1.5" fill="#F3F4F6"/>
      <circle cx="85" cy="80" r="1.5" fill="#F3F4F6"/>
      <circle cx="90" cy="80" r="1.5" fill="#F3F4F6"/>
    </svg>
  );

  const ConsultationIcon = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <linearGradient id="consultGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
      </defs>
      {/* People */}
      <circle cx="35" cy="30" r="12" fill="url(#consultGrad)" opacity="0.9"/>
      <path d="M20 70 Q35 55 50 70 L50 85 L20 85 Z" fill="url(#consultGrad)" opacity="0.7"/>
      <circle cx="65" cy="30" r="12" fill="#10B981" opacity="0.9"/>
      <path d="M50 70 Q65 55 80 70 L80 85 L50 85 Z" fill="#10B981" opacity="0.7"/>
      {/* Speech bubbles */}
      <ellipse cx="25" cy="15" rx="12" ry="8" fill="#F3F4F6" stroke="#D1D5DB" strokeWidth="1"/>
      <path d="M25 23 L20 28 L30 28 Z" fill="#F3F4F6"/>
      <ellipse cx="75" cy="15" rx="12" ry="8" fill="#F3F4F6" stroke="#D1D5DB" strokeWidth="1"/>
      <path d="M75 23 L70 28 L80 28 Z" fill="#F3F4F6"/>
      {/* Question and exclamation */}
      <text x="25" y="18" textAnchor="middle" fontSize="8" fill="#6B7280" fontWeight="bold">?</text>
      <text x="75" y="18" textAnchor="middle" fontSize="8" fill="#6B7280" fontWeight="bold">!</text>
      {/* Handshake */}
      <ellipse cx="50" cy="50" rx="8" ry="4" fill="#FCD34D" opacity="0.8"/>
    </svg>
  );

  const services = [
    {
      icon: BuyingIcon,
=======
import { ShoppingCart, TrendingUp, Calculator, Users, FileText, Headphones } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Services = () => {
  const services = [
    {
      icon: ShoppingCart,
>>>>>>> 39d3f718b0d8f7b0390d11e523d856b03bc5bd8d
      title: 'Покупка недвижимости',
      description: 'Поможем найти идеальную квартиру или дом в соответствии с вашими потребностями и бюджетом',
      features: ['Подбор объектов', 'Проверка документов', 'Торг с продавцом', 'Сопровождение сделки']
    },
    {
<<<<<<< HEAD
      icon: SellingIcon,
=======
      icon: TrendingUp,
>>>>>>> 39d3f718b0d8f7b0390d11e523d856b03bc5bd8d
      title: 'Продажа недвижимости',
      description: 'Продадим вашу недвижимость быстро и по максимальной цене с полным юридическим сопровождением',
      features: ['Оценка стоимости', 'Подготовка документов', 'Реклама и показы', 'Безопасная сделка']
    },
    {
<<<<<<< HEAD
      icon: MortgageIcon,
=======
      icon: Calculator,
>>>>>>> 39d3f718b0d8f7b0390d11e523d856b03bc5bd8d
      title: 'Ипотека',
      description: 'Подберем оптимальную ипотечную программу среди 25+ банков-партнеров с лучшими условиями',
      features: ['Расчет ипотеки', '25+ банков-партнеров', 'Ставка от 12%', 'Быстрое одобрение']
    },
    {
<<<<<<< HEAD
      icon: ConsultationIcon,
=======
      icon: Users,
>>>>>>> 39d3f718b0d8f7b0390d11e523d856b03bc5bd8d
      title: 'Консультации',
      description: 'Профессиональные консультации по всем вопросам недвижимости от опытных экспертов',
      features: ['Бесплатная консультация', 'Оценка недвижимости', 'Юридическая помощь', 'Рыночная аналитика']
    }
  ];

<<<<<<< HEAD
  const headerRef = useRef<HTMLDivElement | null>(null);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visibleCards, setVisibleCards] = useState<boolean[]>(() => services.map(() => false));

  useEffect(() => {
    const headerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsHeaderVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );
    if (headerRef.current) headerObserver.observe(headerRef.current);
    return () => headerObserver.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLDivElement;
          const index = Number(target.dataset.index);
          if (Number.isFinite(index) && entry.isIntersecting) {
            setVisibleCards((prev) => {
              if (prev[index]) return prev;
              const copy = [...prev];
              copy[index] = true;
              return copy;
            });
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
    );

    cardRefs.current.forEach((node) => {
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className="relative py-24 bg-gradient-to-br from-gray-50 to-blue-50 overflow-hidden">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-80 w-[56rem] rounded-full bg-accent/10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <h2
            className={`text-4xl lg:text-5xl font-bold tracking-tight text-slate-800 mb-4 transition-all duration-700 ease-out ${
              isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
            style={{ transitionDelay: '120ms' }}
          >
            Полный спектр услуг по недвижимости
          </h2>
          <p
            className={`text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed transition-all duration-700 ease-out ${
              isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
            style={{ transitionDelay: '240ms' }}
          >
            От поиска до заключения сделки — мы берём на себя все этапы, обеспечивая безопасность,
            прозрачность и выгодные условия на каждом шаге.
          </p>

          {/* Social proof */}
          <div
            className={`mt-8 flex flex-wrap items-center justify-center gap-3 transition-all duration-700 ease-out ${
              isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
            style={{ transitionDelay: '360ms' }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white/60 backdrop-blur px-3 py-1 text-sm text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-green-500"></span>
              100+ успешных сделок
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white/60 backdrop-blur px-3 py-1 text-sm text-muted-foreground">
              ⭐ 4.9/5 рейтинг клиентов
            </span>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const isVisible = visibleCards[index];
            const baseDelay = index * 120; // stagger between cards
            return (
              <div
                key={index}
                ref={(el) => (cardRefs.current[index] = el)}
                data-index={index}
                className={`transition-all duration-700 ease-out will-change-transform ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
                style={{ transitionDelay: `${baseDelay}ms` }}
              >
                <Card
                  className="group relative border border-gray-200 bg-white/90 backdrop-blur hover:border-blue-400 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-2xl"
                >
                  <CardContent className="p-7 lg:p-8 text-center">
                    <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-3 w-20 h-20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg border border-gray-200 mx-auto">
                      <service.icon />
                    </div>

                    <h3
                      className={`text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors transition-opacity duration-700 ${
                        isVisible ? 'opacity-100' : 'opacity-0'
                      }`}
                      style={{ transitionDelay: `${baseDelay + 120}ms` }}
                    >
                      {service.title}
                    </h3>

                    <p
                      className={`text-slate-600 mb-5 leading-relaxed transition-all duration-700 ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
                      }`}
                      style={{ transitionDelay: `${baseDelay + 180}ms` }}
                    >
                      {service.description}
                    </p>

                    <div className="grid grid-cols-1 gap-2">
                      {service.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className={`inline-flex items-center gap-2 text-sm text-muted-foreground transition-all duration-700 ${
                            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
                          }`}
                          style={{ transitionDelay: `${baseDelay + 220 + featureIndex * 70}ms` }}
                        >
                          <Check className="h-4 w-4 text-blue-600" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  {/* Glow ring on hover */}
                  <div className="pointer-events-none absolute inset-0 rounded-2xl ring-0 ring-accent/0 group-hover:ring-4 group-hover:ring-accent/10 transition-[box-shadow,opacity] duration-300"></div>
                </Card>
              </div>
            );
          })}
=======
  return (
    <section id="services" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-accent/10 rounded-full px-4 py-2 text-sm font-medium text-accent mb-4">
            <Headphones className="w-4 h-4" />
            <span>Наши услуги</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-6">
            Полный спектр услуг по недвижимости
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            От поиска до заключения сделки — мы берем на себя все этапы работы с недвижимостью, 
            обеспечивая безопасность и выгодные условия
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-xl transition-all duration-300 border-0 bg-white hover:-translate-y-1"
            >
              <CardContent className="p-8">
                <div className="bg-gradient-accent rounded-xl p-4 w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-8 h-8 text-accent-foreground" />
                </div>
                
                <h3 className="text-xl font-bold text-primary mb-4 group-hover:text-accent transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>

                <div className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
>>>>>>> 39d3f718b0d8f7b0390d11e523d856b03bc5bd8d
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
<<<<<<< HEAD
          <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 lg:p-12 text-white shadow-2xl">
            <div className="pointer-events-none absolute inset-0 opacity-30"
            >
              <div className="absolute -top-32 right-10 h-64 w-64 rounded-full bg-white/20 blur-3xl"></div>
              <div className="absolute -bottom-24 left-10 h-64 w-64 rounded-full bg-accent/40 blur-3xl"></div>
            </div>
            <h3 className="relative text-2xl lg:text-3xl font-bold mb-4">
              Готовы найти недвижимость мечты?
            </h3>
            <p className="relative text-primary-foreground/90 mb-8 text-lg max-w-2xl mx-auto">
              Получите бесплатную консультацию — подберём лучшие варианты под ваш бюджет и пожелания
            </p>
            <div className="relative flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="bg-accent hover:bg-accent-dark px-8 py-3 rounded-lg font-semibold transition-colors text-center">
                Получить консультацию
              </Link>
              <Link to="/catalog" className="border border-white/30 hover:bg-white/10 px-8 py-3 rounded-lg font-semibold transition-colors text-center">
                Посмотреть каталог
              </Link>
=======
          <div className="bg-primary rounded-2xl p-8 lg:p-12 text-white">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              Готовы найти недвижимость мечты?
            </h3>
            <p className="text-primary-foreground/90 mb-8 text-lg max-w-2xl mx-auto">
              Получите бесплатную консультацию и подберем лучшие варианты под ваш бюджет
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-accent hover:bg-accent-dark px-8 py-3 rounded-lg font-semibold transition-colors">
                Получить консультацию
              </button>
              <button className="border border-white/30 hover:bg-white/10 px-8 py-3 rounded-lg font-semibold transition-colors">
                Посмотреть каталог
              </button>
>>>>>>> 39d3f718b0d8f7b0390d11e523d856b03bc5bd8d
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;