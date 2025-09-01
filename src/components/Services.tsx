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
      title: 'Покупка недвижимости',
      description: 'Сопровождение сделки от подбора до ключей',
      features: [
        'Подбор по критериям',
        'Просмотры и проверка документов',
        'Переговоры и сопровождение сделки'
      ],
      process: [
        'Консультация',
        'Подбор вариантов',
        'Просмотры',
        'Проверка',
        'Сделка'
      ]
    },
    {
      icon: SellingIcon,
      title: 'Продажа недвижимости',
      description: 'Быстрая продажа по лучшей цене',
      features: [
        'Оценка и подготовка',
        'Реклама и показы',
        'Переговоры и сделка'
      ],
      process: [
        'Оценка',
        'Подготовка',
        'Продвижение',
        'Показы',
        'Сделка'
      ]
    },
    {
      icon: MortgageIcon,
      title: 'Ипотечное кредитование',
      description: 'Подбор ипотеки на выгодных условиях',
      features: [
        '25+ банков-партнёров',
        'Ставки от 12%',
        'Заявка во все банки'
      ],
      process: [
        'Консультация',
        'Выбор банка',
        'Документы',
        'Подача',
        'Одобрение'
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
      title: 'Консультации',
      description: 'Экспертные ответы по любым вопросам недвижимости',
      features: [
        'Оценка стоимости',
        'Юридические вопросы',
        'Налоги и инвестиции'
      ],
      process: [
        'Анализ',
        'Стратегия',
        'Рекомендации',
        'Сопровождение',
        'Контроль'
      ]
    }
  ];

  return (
    <section ref={sectionRef} id="services" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-800 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
            Наши услуги
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Полный спектр услуг в сфере недвижимости. От покупки и продажи 
            до ипотечного кредитования и консультаций.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
              <CardContent className="p-8 flex flex-col h-full">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="bg-blue-100 p-3 rounded-lg w-16 h-16 flex items-center justify-center">
                    <service.icon />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-slate-600">
                      {service.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-6 flex-1">
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-3">Что входит в услугу:</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-slate-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-slate-800 mb-3">Как проходит работа:</h4>
                    <div className="grid grid-cols-5 gap-2">
                      {service.process.map((step, idx) => (
                        <div key={idx} className="text-center">
                          <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-2">
                            {idx + 1}
                          </div>
                          <p className="text-xs text-slate-600">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {service.banks && (
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-3">Банки-партнеры:</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {service.banks.map((bank, idx) => (
                          <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span className="font-medium">{bank.name}</span>
                            <span className="text-blue-600 font-semibold">{bank.rate}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-6">
                    <Link to="/contact">
                      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                        Получить консультацию
                      </button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-slate-800 mb-6">
            Нужна помощь с недвижимостью?
          </h3>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Оставьте заявку и мы свяжемся с вами в течение 15 минут
          </p>
          <Link to="/contact">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors">
              Оставить заявку
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;