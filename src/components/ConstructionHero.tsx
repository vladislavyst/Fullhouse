import { Button } from '@/components/ui/button';
import { ArrowRight, Award, Users, Clock, Shield, Building2, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const ConstructionHero = () => {
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
    <section className="py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-amber-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-green-400 rounded-full blur-2xl"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Content */}
        <div className="text-center mb-20">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 backdrop-blur-sm rounded-full px-6 py-3 text-sm font-medium mb-8 border border-blue-400/30">
            <Building2 className="w-5 h-5 text-blue-400" />
            <span className="text-blue-200">Строительная компания №1 в Новороссийске</span>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-5xl lg:text-7xl font-bold text-white mb-8 leading-tight">
            Строим дома{' '}
            <span className="bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 bg-clip-text text-transparent">
              вашей мечты
            </span>{' '}
            под ключ
          </h1>
          
          {/* Description */}
          <p className="text-xl lg:text-2xl text-gray-300 mb-12 max-w-5xl mx-auto leading-relaxed">
            Полный цикл строительства от проекта до сдачи ключей. 
            15+ лет опыта, 2500+ реализованных проектов, 98% довольных клиентов.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl mb-4 group-hover:scale-110 transition-transform duration-300 border border-white/20">
                  <span className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                    {stat.number}
                  </span>
                </div>
                <p className="text-gray-300 font-medium text-lg">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
            <Link to="/contact">
              <Button size="lg" className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-10 py-6 rounded-2xl font-semibold shadow-2xl hover:shadow-amber-500/25 transition-all duration-300 hover:scale-105 group text-lg">
                Получить консультацию
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            
            <Link to="/projects">
              <Button variant="outline" size="lg" className="px-10 py-6 rounded-2xl font-semibold border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300 hover:scale-105 text-lg backdrop-blur-sm">
                Смотреть проекты
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-2xl hover:shadow-2xl hover:shadow-white/10 transition-all duration-500 hover:scale-105 hover:bg-white/10"
            >
              <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${feature.color} rounded-3xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <feature.icon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
              <p className="text-gray-300 text-base leading-relaxed mb-6">{feature.description}</p>
              
              {/* Hover effect */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center text-amber-400 text-sm font-medium">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span>Подробнее</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ConstructionHero;
