import { Award, Users, Shield, MapPin, Phone } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import YandexMap from './YandexMap';

const About = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.1, delay: 100 });
  
  return (
    <section ref={sectionRef} id="about" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-800 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
            Надежный партнер в мире недвижимости
          </h2>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            Fullhouse — ведущее агентство недвижимости в Новороссийске. Мы помогаем людям 
            найти дом мечты и инвесторам — выгодные объекты для вложений.
          </p>
        </div>

        {/* Company Description */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <div>
            <h3 className="text-2xl font-bold text-slate-800 mb-6">
              Почему выбирают нас?
            </h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-slate-800 mb-2">
                    Надежность и опыт
                  </h4>
                  <p className="text-slate-600">
                    Более 15 лет на рынке недвижимости. Мы знаем все особенности 
                    местного рынка и помогаем клиентам принимать правильные решения.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-slate-800 mb-2">
                    Команда профессионалов
                  </h4>
                  <p className="text-slate-600">
                    Наши специалисты имеют профильное образование и регулярно 
                    проходят обучение. Каждый клиент получает персонального менеджера.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-amber-100 p-3 rounded-lg">
                  <Award className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-slate-800 mb-2">
                    Качество услуг
                  </h4>
                  <p className="text-slate-600">
                    Мы гарантируем высокое качество всех услуг. Наша репутация 
                    подтверждена тысячами довольных клиентов и положительными отзывами.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">
              Наши достижения
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <Card className="text-center p-6 bg-white shadow-lg border-0">
                <CardContent className="p-0">
                  <div className="text-3xl font-bold text-blue-600 mb-2">15+</div>
                  <div className="text-slate-600">лет на рынке</div>
                </CardContent>
              </Card>
              
              <Card className="text-center p-6 bg-white shadow-lg border-0">
                <CardContent className="p-0">
                  <div className="text-3xl font-bold text-green-600 mb-2">2500+</div>
                  <div className="text-slate-600">сделок</div>
                </CardContent>
              </Card>
              
              <Card className="text-center p-6 bg-white shadow-lg border-0">
                <CardContent className="p-0">
                  <div className="text-3xl font-bold text-amber-600 mb-2">5000+</div>
                  <div className="text-slate-600">клиентов</div>
                </CardContent>
              </Card>
              
              <Card className="text-center p-6 bg-white shadow-lg border-0">
                <CardContent className="p-0">
                  <div className="text-3xl font-bold text-red-600 mb-2">98%</div>
                  <div className="text-slate-600">довольных</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Location Section */}
        <div className="text-center mb-16">
          <h3 className="text-2xl font-bold text-slate-800 mb-6">
            Где нас найти
          </h3>
          <div className="max-w-4xl mx-auto">
            <YandexMap 
              center={[44.68098, 37.79033]} 
              zoom={15}
              height="400px"
            />
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-slate-800 mb-6">
            Готовы начать работу?
          </h3>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Свяжитесь с нами для бесплатной консультации. Мы поможем найти 
            идеальный вариант недвижимости именно для вас.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+78617123456"
              className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Phone className="w-5 h-5 mr-2" />
              Позвонить
            </a>
            <a 
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
            >
              <MapPin className="w-5 h-5 mr-2" />
              Приехать в офис
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;