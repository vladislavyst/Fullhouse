import { Award, Users, Shield, MapPin } from 'lucide-react';
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
            <h3 className="text-2xl font-bold text-slate-800 mb-6">Наша миссия</h3>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Мы делаем процесс покупки и продажи недвижимости простым, безопасным и выгодным. 
              Каждый клиент получает индивидуальный подход и профессиональное сопровождение 
              на всех этапах сделки.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span className="text-slate-600">Прозрачность всех операций</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span className="text-slate-600">Юридическая чистота сделок</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span className="text-slate-600">Максимальная выгода для клиента</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span className="text-slate-600">Индивидуальный подход к каждому</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-slate-800 mb-6">Почему выбирают нас?</h3>
            <div className="space-y-4">
              <Card className="border border-gray-200 bg-white/90 backdrop-blur hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-2 rounded-lg border border-blue-200">
                      <MapPin className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-1">Знание рынка</h4>
                      <p className="text-sm text-slate-600">
                        Глубокое понимание рынка недвижимости Новороссийска и региона
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border border-gray-200 bg-white/90 backdrop-blur hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-2 rounded-lg border border-blue-200">
                      <Shield className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-1">Безопасность</h4>
                      <p className="text-sm text-slate-600">
                        Полная проверка документов и юридическое сопровождение сделок
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border border-gray-200 bg-white/90 backdrop-blur hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-2 rounded-lg border border-blue-200">
                      <Users className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-1">Команда профессионалов</h4>
                      <p className="text-sm text-slate-600">
                        Опытные риелторы, юристы и эксперты по ипотеке
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>



        {/* Licenses */}
        <div className="mt-20 text-center bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
          <h3 className="text-2xl font-bold text-slate-800 mb-4">Лицензии и сертификаты</h3>
          <p className="text-slate-600 mb-6">
            Все необходимые разрешения для осуществления деятельности на рынке недвижимости
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border border-gray-200 bg-white/90 backdrop-blur p-4 shadow-lg">
              <CardContent className="p-0 text-center">
                <Award className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                <h4 className="font-semibold text-sm text-slate-800">Лицензия риелтора</h4>
                <p className="text-xs text-slate-600 mt-1">№ РН-2024-001</p>
              </CardContent>
            </Card>
            
            <Card className="border border-gray-200 bg-white/90 backdrop-blur p-4 shadow-lg">
              <CardContent className="p-0 text-center">
                <Shield className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                <h4 className="font-semibold text-sm text-slate-800">Страхование ответственности</h4>
                <p className="text-xs text-slate-600 mt-1">до 10 млн ₽</p>
              </CardContent>
            </Card>
            
            <Card className="border border-gray-200 bg-white/90 backdrop-blur p-4 shadow-lg">
              <CardContent className="p-0 text-center">
                <Users className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                <h4 className="font-semibold text-sm text-slate-800">Член РГР</h4>
                <p className="text-xs text-slate-600 mt-1">Российская гильдия риелторов</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-800 mb-4">Наше расположение</h3>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Офис компании Fullhouse находится в центре Новороссийска. 
              Приходите к нам для личной консультации по всем вопросам недвижимости.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
                <h4 className="text-xl font-semibold text-slate-800 mb-4 flex items-center">
                  <MapPin className="w-5 h-5 text-blue-600 mr-2" />
                  Адрес офиса
                </h4>
                <p className="text-slate-600 mb-2">г. Новороссийск, ул. Хворостьянского, 4</p>
                <p className="text-slate-600 mb-4">(бывшая ул. Молодежная, 4)</p>
                <div className="space-y-2 text-sm text-slate-600">
                  <p><strong>Время работы:</strong> Пн-Пт: 9:00-18:00</p>
                  <p><strong>Телефон:</strong> +7 (8617) 123-45-67</p>
                  <p><strong>Email:</strong> info@fullhouse-neo.ru</p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
                <h4 className="text-xl font-semibold text-slate-800 mb-4">Как добраться</h4>
                <div className="space-y-3 text-sm text-slate-600">
                  <p>• <strong>На автомобиле:</strong> Центральная парковка рядом с офисом</p>
                  <p>• <strong>На общественном транспорте:</strong> Остановка "Центр" (автобусы 1, 3, 5)</p>
                  <p>• <strong>Пешком:</strong> 5 минут от центральной площади</p>
                </div>
              </div>
            </div>
            
            <div className="lg:sticky lg:top-8">
              <YandexMap 
                center={[44.68098, 37.79033]}
                zoom={15}
                height="500px"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;