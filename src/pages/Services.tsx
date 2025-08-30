import { Calculator, ShoppingCart, TrendingUp, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Services = () => {
  const services = [
    {
      icon: ShoppingCart,
      title: 'Покупка недвижимости',
      description: 'Полное сопровождение покупки от подбора до получения ключей',
      features: [
        'Подбор объектов по вашим критериям',
        'Организация просмотров в удобное время',
        'Проверка юридической чистоты документов',
        'Помощь в торгах и переговорах с продавцом',
        'Сопровождение сделки в МФЦ или у нотариуса',
        'Помощь в оформлении коммунальных услуг'
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
      icon: TrendingUp,
      title: 'Продажа недвижимости',
      description: 'Продадим вашу недвижимость быстро и по максимальной цене',
      features: [
        'Профессиональная оценка рыночной стоимости',
        'Подготовка документов для продажи',
        'Фотосъемка и создание рекламных материалов',
        'Размещение на всех популярных площадках',
        'Организация показов потенциальным покупателям',
        'Ведение переговоров и заключение сделки'
      ],
      process: [
        'Оценка недвижимости',
        'Подготовка к продаже',
        'Реклама и продвижение',
        'Показы покупателям',
        'Заключение сделки'
      ]
    },
    {
      icon: Calculator,
      title: 'Ипотечное кредитование',
      description: 'Поможем получить ипотеку на лучших условиях',
      features: [
        'Работа с 25+ банками-партнерами',
        'Ставки от 12% годовых',
        'Первоначальный взнос от 10%',
        'Помощь в сборе документов',
        'Подача заявок во все банки одновременно',
        'Сопровождение до получения средств'
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
      icon: Users,
      title: 'Консультационные услуги',
      description: 'Экспертные консультации по всем вопросам недвижимости',
      features: [
        'Оценка рыночной стоимости недвижимости',
        'Анализ инвестиционной привлекательности',
        'Юридическое сопровождение сделок',
        'Консультации по налогообложению',
        'Помощь в решении спорных вопросов',
        'Рекомендации по оптимизации инвестиций'
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
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-subtle">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-primary mb-6">
              Наши услуги
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Полный спектр услуг по недвижимости в Новороссийске. 
              От консультации до заключения сделки — мы с вами на каждом шаге.
            </p>
          </div>
        </section>

        {/* Services Details */}
        <section className="py-20">
          <div className="container mx-auto px-4 space-y-20">
            {services.map((service, index) => (
              <div key={index} className="grid lg:grid-cols-2 gap-12 items-center">
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="bg-gradient-accent rounded-xl p-4">
                      <service.icon className="w-8 h-8 text-accent-foreground" />
                    </div>
                    <h2 className="text-3xl font-bold text-primary">{service.title}</h2>
                  </div>
                  
                  <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-3 mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Banks (for mortgage service) */}
                  {service.banks && (
                    <div className="mb-8">
                      <h4 className="font-semibold text-primary mb-4">Наши банки-партнеры:</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {service.banks.map((bank, bankIndex) => (
                          <div key={bankIndex} className="bg-gray-50 rounded-lg p-3 text-sm">
                            <div className="font-medium">{bank.name}</div>
                            <div className="text-accent font-semibold">{bank.rate}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <Button size="lg" className="bg-accent hover:bg-accent-dark">
                    Получить консультацию
                  </Button>
                </div>

                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <Card className="border-0 shadow-xl bg-white p-8">
                    <CardContent className="p-0">
                      <h3 className="text-xl font-bold text-primary mb-6">
                        Этапы работы
                      </h3>
                      <div className="space-y-4">
                        {service.process.map((step, stepIndex) => (
                          <div key={stepIndex} className="flex items-start space-x-4">
                            <div className="bg-accent text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">
                              {stepIndex + 1}
                            </div>
                            <div className="pt-1">
                              <span className="text-muted-foreground">{step}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Готовы начать работу с недвижимостью?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Получите бесплатную консультацию и узнайте, как мы можем помочь 
              в решении ваших задач по недвижимости
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" className="px-8">
                Бесплатная консультация
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 px-8">
                Рассчитать стоимость услуг
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Services;