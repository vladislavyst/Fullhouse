import { Award, Users, Shield, MapPin, Phone } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import YandexMap from './YandexMap';

const About = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.1, delay: 100 });
  
  return (
    <section ref={sectionRef} id="about" className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className={`text-center mb-12 sm:mb-14 lg:mb-16 transition-all duration-800 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 dark:text-white mb-4 sm:mb-6 px-4">
            Надежный партнер в строительстве
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed px-4">
            Fullhouse — строительная компания в Новороссийске. Уже на протяжении 3 лет строим дома 
            и помогаем семьям обрести дом мечты.
          </p>
        </div>

        {/* Company Description */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16 lg:mb-20">
          <div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">
              Почему выбирают нас?
            </h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-br from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 p-3 rounded-lg shadow-lg">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">
                    Надежность и опыт
                  </h4>
                  <p className="text-slate-600 dark:text-gray-300">
                    Уже 3 года строим дома в Новороссийске. Мы знаем все особенности 
                    строительства в нашем регионе и помогаем клиентам принимать правильные решения.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-br from-amber-500 to-orange-500 dark:from-amber-400 dark:to-orange-400 p-3 rounded-lg shadow-lg">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">
                    Команда профессионалов
                  </h4>
                  <p className="text-slate-600 dark:text-gray-300">
                    Наши специалисты имеют профильное образование и регулярно 
                    проходят обучение. Каждый клиент получает персонального менеджера.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-br from-emerald-500 to-teal-500 dark:from-emerald-400 dark:to-teal-400 p-3 rounded-lg shadow-lg">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">
                    Качество услуг
                  </h4>
                  <p className="text-slate-600 dark:text-gray-300">
                    Мы гарантируем высокое качество всех услуг. Наша репутация 
                    подтверждена десятками довольных семей и положительными отзывами.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">
              Наши достижения
            </h3>
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              <Card className="text-center p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-xl border-0 hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <CardContent className="p-0">
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">3</div>
                  <div className="text-slate-600 dark:text-gray-300">года на рынке</div>
                </CardContent>
              </Card>
              
              <Card className="text-center p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-xl border-0 hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <CardContent className="p-0">
                  <div className="text-3xl font-bold bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent mb-2">3</div>
                  <div className="text-slate-600 dark:text-gray-300">года гарантии</div>
                </CardContent>
              </Card>
              
              <Card className="text-center p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-xl border-0 hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <CardContent className="p-0">
                  <div className="text-3xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent mb-2">50+</div>
                  <div className="text-slate-600 dark:text-gray-300">довольных семей</div>
                </CardContent>
              </Card>
              
              <Card className="text-center p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-xl border-0 hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <CardContent className="p-0">
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">100%</div>
                  <div className="text-slate-600 dark:text-gray-300">качество</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Location Section */}
        <div className="text-center mb-12 sm:mb-14 lg:mb-16 px-4">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white mb-4 sm:mb-6">
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
        <div className="text-center px-4">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white mb-4 sm:mb-6">
            Готовы начать работу?
          </h3>
          <p className="text-base sm:text-lg text-slate-600 dark:text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Свяжитесь с нами для бесплатной консультации. Мы поможем построить 
            дом вашей мечты именно для вас.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md sm:max-w-none mx-auto">
            <a 
              href="tel:+79180400402"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base"
            >
              <Phone className="w-5 h-5 mr-2" />
              Позвонить
            </a>
            <a 
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-2.5 sm:py-3 border-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 font-semibold rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base"
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