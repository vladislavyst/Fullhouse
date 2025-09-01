import { Button } from '@/components/ui/button';
import { ArrowRight, Award, Users, Clock, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
const heroImage = '/0_3.png';
const heroImageMobile = '/Hero-mobile.jpg';

const Hero = () => {
  const { ref: heroRef, isVisible: isHeroVisible } = useScrollAnimation({ threshold: 0.2, delay: 100 });
  const features = [
    {
      icon: Award,
      title: 'Премиальное качество',
      description: 'Используем только проверенные материалы'
    },
    {
      icon: Users,
      title: '500+ довольных клиентов',
      description: 'Высокие оценки и положительные отзывы'
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
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image - Desktop */}
      <div 
        className="hidden md:block absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-125 sm:scale-110 md:scale-105 lg:scale-110 origin-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      {/* Background Image - Mobile */}
      <div 
        className="md:hidden absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-110 origin-center"
        style={{ backgroundImage: `url(${heroImageMobile})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      {/* Content */}
      <div ref={heroRef} className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Main Content */}
          <div className={`text-white bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-white/20 transition-all duration-1000 ease-out ${
            isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-full px-4 py-2 text-sm font-medium mb-6 backdrop-blur-sm border border-blue-400/30">
              <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></span>
              <span>Строительная компания №1 в Новороссийске</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6 drop-shadow-lg">
              Строим дома 
              <span className="text-amber-400"> вашей мечты</span> 
              {" "}под ключ
            </h1>
            
            <p className="text-xl text-white/95 mb-8 leading-relaxed drop-shadow-md">
              Полный цикл строительства жилой и коммерческой недвижимости в Новороссийске. 
              От проекта до ключей — с гарантией качества и соблюдением сроков.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button size="lg" variant="default" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg" asChild>
                <a href="/#calculator">
                  Рассчитать стоимость
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white bg-white/20 hover:bg-white/30 backdrop-blur-sm" asChild>
                <Link to="/projects">
                  Наши проекты
                </Link>
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-amber-400 mb-1">12+</div>
                <div className="text-sm text-white/80">лет опыта</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-amber-400 mb-1">500+</div>
                <div className="text-sm text-white/80">проектов</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-amber-400 mb-1">100%</div>
                <div className="text-sm text-white/80">гарантия</div>
              </div>
            </div>
          </div>

          {/* Right Column - Features */}
          <div className="space-y-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`bg-gradient-to-r from-blue-600/20 to-indigo-600/20 backdrop-blur-sm rounded-xl p-6 border border-blue-400/30 hover:from-blue-600/30 hover:to-indigo-600/30 transition-all duration-700 ease-out ${
                  isHeroVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                }`}
                style={{ transitionDelay: `${300 + index * 150}ms` }}
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-amber-500/20 rounded-lg p-3">
                    <feature.icon className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-white/80 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-amber-400 animate-bounce">
        <div className="w-6 h-10 border-2 border-amber-400/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-amber-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;