import { Button } from '@/components/ui/button';
import { ArrowRight, Award, Users, Clock, Shield, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const ConstructionSquare = () => {
  const features = [
    {
      icon: Award,
      title: 'Премиальное качество',
      description: 'Используем только проверенные материалы'
    },
    {
      icon: Users,
      title: 'Десятки довольных семей',
      description: 'Уже живут в своих построенных домах'
    },
    {
      icon: Clock,
      title: 'Соблюдение сроков',
      description: 'Прозрачность процесса и четкие временные рамки'
    },
    {
      icon: Shield,
      title: 'Гарантия качества',
      description: 'Полная ответственность за результат'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-amber-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-green-500 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Square Content */}
        <div className="max-w-6xl mx-auto">
          {/* Top Section - Company Info */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Left Column - Company Badge and Title */}
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 rounded-full px-6 py-3 text-sm font-medium border border-blue-200">
                <Building2 className="w-5 h-5 text-blue-600" />
                <span className="text-blue-800">Строительная компания №1 в Новороссийске</span>
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Строим дома{' '}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  вашей мечты
                </span>{' '}
                под ключ
              </h2>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Полный цикл строительства от проекта до сдачи ключей. 
                Уже на протяжении 3 лет строим дома в Новороссийске.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
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

            {/* Right Column - Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
                <div className="text-3xl font-bold text-blue-600 mb-2">3</div>
                <div className="text-gray-600 text-sm">года опыта</div>
              </div>
              <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
                <div className="text-3xl font-bold text-blue-600 mb-2">3</div>
                <div className="text-gray-600 text-sm">года гарантии</div>
              </div>
            </div>
          </div>

          {/* Bottom Section - Features Grid 2x2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group p-8 bg-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105"
              >
                <div className="flex items-start space-x-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg flex-shrink-0">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConstructionSquare;
