import { ShoppingCart, TrendingUp, Calculator, Users, FileText, Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
      <path d="M15 45 Q15 35 25 35 L35 35 Q45 35 45 45 L45 55 Q45 65 35 65 L25 65 Q15 65 15 55 Z" fill="#FEF3C7" opacity="0.9"/>
      <path d="M55 45 Q55 35 65 35 L75 35 Q85 35 85 45 L85 55 Q85 65 75 65 L65 65 Q55 65 55 55 Z" fill="#D1FAE5" opacity="0.9"/>
      {/* Question marks */}
      <text x="30" y="50" textAnchor="middle" fontSize="8" fill="#D97706" fontWeight="bold">?</text>
      <text x="70" y="50" textAnchor="middle" fontSize="8" fill="#059669" fontWeight="bold">?</text>
    </svg>
  );

  const { ref: sectionRef, isVisible } = useScrollAnimation({ 
    threshold: 0.1, 
    delay: 100,
    animation: 'fade-in'
  });

  const services = [
    {
      icon: BuyingIcon,
      title: 'Подбор земельных участков',
      description: 'Полное сопровождение покупки земли от подбора до получения ключей',
      features: [
        'Подбор участков по вашим критериям',
        'База данных земельных участков Новороссийска',
        'Организация просмотров в удобное время',
        'Проверка юридической чистоты документов',
        'Помощь в торгах и переговорах с продавцом',
        'Сопровождение сделки в МФЦ или у нотариуса',
        'Оценка инвестиционного потенциала участка',
        'Консультации по строительному потенциалу',
        'Помощь с подключением коммуникаций',
        'Оформление разрешений на строительство'
      ],
      process: [
        'Консультация и определение потребностей',
        'Подбор подходящих вариантов',
        'Организация просмотров',
        'Проверка документов',
        'Оформление сделки'
      ]
    },
    {
      icon: MortgageIcon,
      title: 'Ипотечное кредитование',
      description: 'Поможем получить ипотеку на лучших условиях',
      features: [
        'Работа с 25+ банками-партнерами',
        'Ставки от 12% годовых',
        'Первоначальный взнос от 10%',
        'Помощь в сборе документов',
        'Подача заявок во все банки одновременно',
        'Сопровождение до получения средств',
        'Консультации по специальным программам',
        'Оформление страховки недвижимости',
        'Помощь в оценке недвижимости',
        'Проверка кредитной истории'
      ],
      process: [
        'Консультация по программам',
        'Подбор оптимального банка',
        'Подготовка документов',
        'Подача заявки',
        'Получение одобрения'
      ],
      banks: [
        { name: 'Сбербанк', rate: 'от 12%' },
        { name: 'ВТБ', rate: 'от 12.5%' },
        { name: 'Альфа-банк', rate: 'от 13%' },
        { name: 'Газпромбанк', rate: 'от 13.2%' }
      ]
    },
    {
      icon: ConsultationIcon,
      title: 'Консультационные услуги',
      description: 'Экспертные консультации по всем вопросам недвижимости',
      features: [
        'Оценка рыночной стоимости недвижимости',
        'Анализ инвестиционной привлекательности',
        'Юридическое сопровождение сделок',
        'Консультации по налогообложению',
        'Помощь в решении спорных вопросов',
        'Рекомендации по оптимизации инвестиций',
        'Консультации по строительным нормам',
        'Планирование строительных проектов',
        'Сопровождение получения разрешений',
        'Оптимизация проектных решений'
      ],
      process: [
        'Анализ вашей ситуации',
        'Разработка стратегии',
        'Предоставление рекомендаций',
        'Сопровождение реализации',
        'Контроль результата'
      ]
    }
  ];

  return (
    <section ref={sectionRef} id="services" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 dark:from-gray-900 dark:via-slate-900 dark:to-black">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className={`text-center mb-12 sm:mb-14 lg:mb-16 transition-all duration-800 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 dark:text-white mb-4 sm:mb-6 px-4">
            Наши услуги
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
            Полный спектр услуг в сфере недвижимости. От подбора земельных участков 
            до ипотечного кредитования и консультаций.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => {
            // Different background colors for each service icon
            const iconBgClasses = [
              'bg-gradient-to-br from-emerald-500 to-teal-500 dark:from-emerald-400 dark:to-teal-400', // Green for land selection
              'bg-gradient-to-br from-amber-500 to-orange-500 dark:from-amber-400 dark:to-orange-400', // Orange for mortgage
              'bg-gradient-to-br from-purple-500 to-pink-500 dark:from-purple-400 dark:to-pink-400' // Purple for consultation
            ];
            
            return (
              <Card key={index} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm h-full">
                <CardContent className="p-4 sm:p-6 lg:p-8 h-full flex flex-col">
                  <div className="flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-4 mb-4 lg:mb-6">
                    <div className={`${iconBgClasses[index]} p-2 sm:p-3 rounded-lg w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 flex items-center justify-center shadow-lg flex-shrink-0`}>
                      <service.icon />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl sm:text-xl lg:text-2xl font-bold text-slate-800 dark:text-white mb-2 leading-tight">
                        {service.title}
                      </h3>
                      <p className="text-sm sm:text-base text-slate-600 dark:text-gray-300 leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="mb-4 sm:mb-6 flex-grow">
                    <h4 className="text-base sm:text-lg font-semibold text-slate-800 dark:text-white mb-2 sm:mb-3">
                      Наши услуги:
                    </h4>
                    <ul className="space-y-1.5 sm:space-y-2">
                      {service.features.slice(0, 3).map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start space-x-2 text-xs sm:text-sm">
                          <div className="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                          <span className="text-slate-600 dark:text-gray-300 leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto">
                    <a href="tel:+79180400402">
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-sm sm:text-base py-2 sm:py-3" size="lg">
                        Получить консультацию
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12 sm:mt-14 lg:mt-16 px-4">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white mb-4 sm:mb-6">
            Нужна помощь со строительством?
          </h3>
          <p className="text-base sm:text-lg text-slate-600 dark:text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Оставьте заявку и мы свяжемся с вами в течение 15 минут
          </p>
          <a href="tel:+79180400402">
            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base">
              Оставить заявку
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;