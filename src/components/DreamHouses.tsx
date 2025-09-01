import { Button } from '@/components/ui/button';
import { ArrowRight, Award, Users, Clock, Shield, Home, CheckCircle, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const DreamHouses = () => {
  const { ref: sectionRef, isVisible: isSectionVisible } = useScrollAnimation({ threshold: 0.2, delay: 200 });
  
  const features = [
    {
      icon: Award,
      title: 'Премиальное качество',
      description: 'Используем только проверенные материалы',
      color: 'from-amber-500 to-orange-500'
    },
    {
      icon: Users,
      title: '500+ довольных клиентов',
      description: 'Высокие оценки и положительные отзывы',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Clock,
      title: 'Соблюдение сроков',
      description: 'Прозрачность процесса и четкие временные рамки',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Shield,
      title: 'Гарантия качества',
      description: 'Полная ответственность за результат',
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const stats = [
    { number: '15+', label: 'лет опыта' },
    { number: '2500+', label: 'реализованных проектов' },
    { number: '98%', label: 'довольных клиентов' }
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-amber-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-green-500 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Content */}
        <div className={`text-center mb-16 transition-all duration-1000 ease-out ${
          isSectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 rounded-full px-6 py-3 text-sm font-medium mb-6 border border-blue-200">
            <Home className="w-5 h-5 text-blue-600" />
            <span className="text-blue-800">Строительная компания</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Строим дома{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              вашей мечты
            </span>{' '}
            под ключ
          </h2>
          
          <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            Полный цикл строительства от проекта до сдачи ключей. 
            15+ лет опыта, 2500+ реализованных проектов, 98% довольных клиентов.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    {stat.number}
                  </span>
                </div>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/contact">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                Получить консультацию
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            
            <Link to="/projects">
              <Button variant="outline" size="lg" className="px-8 py-4 rounded-xl font-semibold border-2 border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 hover:scale-105">
                Смотреть проекты
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`group p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 hover:scale-105 ${
                isSectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              
              {/* Hover effect */}
              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center text-blue-600 text-sm font-medium">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span>Подробнее</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-16 transition-all duration-1000 ease-out ${
          isSectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-50 to-orange-50 rounded-full px-6 py-3 border border-amber-200 mb-6">
            <Star className="w-5 h-5 text-amber-600" />
            <span className="text-amber-800 font-medium">Гарантированное качество</span>
          </div>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Доверьте строительство профессионалам с многолетним опытом. 
            Мы создаем не просто дома, а пространства для счастливой жизни.
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-10 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              Начать строительство
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DreamHouses;
