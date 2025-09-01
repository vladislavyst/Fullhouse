import Header from '../components/Header';
import Footer from '../components/Footer';
import { useSEO, seoConfigs } from '@/hooks/useSEO';
import Breadcrumbs from '@/components/Breadcrumbs';
import SemanticAnalyzer from '@/components/SemanticAnalyzer';

const Services = () => {
  // Применяем SEO-оптимизацию для страницы услуг
  useSEO(seoConfigs.services);

  // Custom SVG infographic icons
  const InfographicIcon = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <svg className={`w-16 h-16 ${className}`} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {children}
    </svg>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Хлебные крошки для SEO */}
      <Breadcrumbs 
        items={[
          { label: 'Услуги', path: '/services', current: true }
        ]} 
      />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-subtle">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-primary mb-6">
              Строительные услуги
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Полный спектр строительных услуг от проектирования до отделки под ключ. 
              Профессиональный подход и гарантия качества на все работы.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Service 1 */}
              <div className="text-center p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <InfographicIcon className="text-primary">
                    <rect x="8" y="8" width="48" height="48" rx="4" fill="currentColor" opacity="0.2"/>
                    <rect x="16" y="16" width="32" height="32" rx="2" fill="currentColor"/>
                    <rect x="20" y="20" width="24" height="4" fill="white"/>
                    <rect x="20" y="28" width="16" height="4" fill="white"/>
                    <rect x="20" y="36" width="20" height="4" fill="white"/>
                  </InfographicIcon>
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4">Проектирование</h3>
                <p className="text-muted-foreground mb-6">
                  Создание индивидуальных проектов домов с учетом ваших пожеланий, 
                  участка и бюджета. Архитектурные решения любой сложности.
                </p>
                <ul className="text-left text-sm text-muted-foreground space-y-2 mb-6">
                  <li>• Архитектурное проектирование</li>
                  <li>• Конструктивные решения</li>
                  <li>• Инженерные системы</li>
                  <li>• Дизайн интерьера</li>
                </ul>
                <button className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors">
                  Заказать проект
                </button>
              </div>

              {/* Service 2 */}
              <div className="text-center p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <InfographicIcon className="text-accent">
                    <rect x="8" y="8" width="48" height="48" rx="4" fill="currentColor" opacity="0.2"/>
                    <path d="M16 16 L48 16 L48 48 L16 48 Z" fill="currentColor"/>
                    <path d="M20 20 L44 20 L44 44 L20 44 Z" fill="white"/>
                    <rect x="24" y="24" width="16" height="4" fill="currentColor"/>
                    <rect x="24" y="32" width="12" height="4" fill="currentColor"/>
                    <rect x="24" y="40" width="14" height="4" fill="currentColor"/>
                  </InfographicIcon>
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4">Строительство под ключ</h3>
                <p className="text-muted-foreground mb-6">
                  Полный цикл строительства от фундамента до отделки. 
                  Используем качественные материалы и современные технологии.
                </p>
                <ul className="text-left text-sm text-muted-foreground space-y-2 mb-6">
                  <li>• Нулевой цикл</li>
                  <li>• Возведение стен</li>
                  <li>• Кровельные работы</li>
                  <li>• Отделка под ключ</li>
                </ul>
                <button className="bg-accent text-white px-6 py-3 rounded-lg hover:bg-accent/90 transition-colors">
                  Рассчитать стоимость
                </button>
              </div>

              {/* Service 3 */}
              <div className="text-center p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <InfographicIcon className="text-green-600">
                    <rect x="8" y="8" width="48" height="48" rx="4" fill="currentColor" opacity="0.2"/>
                    <circle cx="32" cy="32" r="16" fill="currentColor"/>
                    <path d="M28 32 L30 34 L36 28" stroke="white" strokeWidth="3" fill="none"/>
                  </InfographicIcon>
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4">Отделочные работы</h3>
                <p className="text-muted-foreground mb-6">
                  Профессиональная отделка помещений любой сложности. 
                  От косметического ремонта до премиум отделки.
                </p>
                <ul className="text-left text-sm text-muted-foreground space-y-2 mb-6">
                  <li>• Штукатурные работы</li>
                  <li>• Поклейка обоев</li>
                  <li>• Укладка полов</li>
                  <li>• Покраска потолков</li>
                </ul>
                <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
                  Получить консультацию
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Services */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary mb-4">
                Дополнительные услуги
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Комплексные решения для вашего комфорта и безопасности
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <InfographicIcon className="text-blue-600">
                    <rect x="16" y="16" width="32" height="32" rx="4" fill="currentColor"/>
                    <circle cx="32" cy="32" r="8" fill="white"/>
                  </InfographicIcon>
                    </div>
                <h3 className="font-semibold text-primary mb-2">Инженерные системы</h3>
                <p className="text-sm text-muted-foreground">
                  Электрика, водоснабжение, отопление, вентиляция
                </p>
                  </div>
                  
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <InfographicIcon className="text-purple-600">
                    <path d="M16 16 L48 16 L48 48 L16 48 Z" fill="currentColor"/>
                    <circle cx="32" cy="32" r="12" fill="white"/>
                    <path d="M26 32 L30 36 L38 28" stroke="currentColor" strokeWidth="2" fill="none"/>
                  </InfographicIcon>
                </div>
                <h3 className="font-semibold text-primary mb-2">Умный дом</h3>
                <p className="text-sm text-muted-foreground">
                  Автоматизация и системы безопасности
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <InfographicIcon className="text-orange-600">
                    <path d="M16 16 L48 16 L48 48 L16 48 Z" fill="currentColor"/>
                    <path d="M20 20 L44 20 L44 44 L20 44 Z" fill="white"/>
                    <rect x="24" y="24" width="16" height="16" fill="currentColor"/>
                  </InfographicIcon>
                      </div>
                <h3 className="font-semibold text-primary mb-2">Ландшафтный дизайн</h3>
                <p className="text-sm text-muted-foreground">
                  Благоустройство территории и озеленение
                </p>
                  </div>

              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <InfographicIcon className="text-red-600">
                    <rect x="16" y="16" width="32" height="32" rx="4" fill="currentColor"/>
                    <path d="M24 24 L40 24 L40 40 L24 40 Z" fill="white"/>
                    <circle cx="32" cy="32" r="4" fill="currentColor"/>
                  </InfographicIcon>
                </div>
                <h3 className="font-semibold text-primary mb-2">Гарантийное обслуживание</h3>
                <p className="text-sm text-muted-foreground">
                  Поддержка и ремонт после сдачи объекта
                </p>
                          </div>
                      </div>
                    </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary mb-4">
                Часто задаваемые вопросы
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Ответы на самые популярные вопросы о наших услугах
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold text-primary mb-3">
                    Сколько времени занимает строительство дома?
                  </h3>
                  <p className="text-muted-foreground">
                    Время строительства зависит от сложности проекта и площади. 
                    Обычно дом 150-200 м² строится за 6-8 месяцев под ключ.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold text-primary mb-3">
                    Какие гарантии вы предоставляете?
                      </h3>
                  <p className="text-muted-foreground">
                    Мы предоставляем гарантию 5 лет на все виды работ и 10 лет 
                    на несущие конструкции. Все гарантии прописаны в договоре.
                  </p>
                            </div>
                
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold text-primary mb-3">
                    Можно ли изменить проект в процессе строительства?
                  </h3>
                  <p className="text-muted-foreground">
                    Да, можно вносить изменения на этапе проектирования. 
                    После начала строительства изменения возможны, но могут повлиять на сроки и стоимость.
                  </p>
                            </div>
                          </div>
              
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold text-primary mb-3">
                    Какие материалы вы используете?
                  </h3>
                  <p className="text-muted-foreground">
                    Мы используем только качественные материалы от проверенных производителей. 
                    Все материалы сертифицированы и соответствуют стандартам.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold text-primary mb-3">
                    Есть ли у вас рассрочка?
                  </h3>
                  <p className="text-muted-foreground">
                    Да, мы предлагаем гибкие условия оплаты и рассрочку. 
                    Возможна оплата по этапам строительства.
                  </p>
                      </div>
                
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold text-primary mb-3">
                    Как происходит контроль качества?
                  </h3>
                  <p className="text-muted-foreground">
                    Каждый этап строительства контролируется нашими специалистами. 
                    Вы можете присутствовать на любом этапе и задавать вопросы.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Семантический анализатор для SEO */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary mb-4">
                Анализ семантики и ключевых слов
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Инструмент для анализа ключевых слов, LSI-слов и семантических фраз 
                для улучшения SEO вашего сайта
              </p>
            </div>
            
            <SemanticAnalyzer />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Готовы начать строительство?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Свяжитесь с нами для бесплатной консультации и расчета стоимости
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-accent text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-accent/90 transition-colors">
                Получить консультацию
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-primary transition-colors">
                Рассчитать стоимость
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;