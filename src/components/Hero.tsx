import { Button } from '@/components/ui/button';
import { ArrowRight, Award, Users, Clock, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import SimpleCallButton from './SimpleCallButton';

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
      title: '50+ довольных семей',
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
      description: '3 года гарантии'
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
        <div className="grid lg:grid-cols-1 gap-12 items-center">
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
              Полный цикл строительства от проекта до сдачи ключей. 
              Уже на протяжении 3 лет строим дома в Новороссийске.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <SimpleCallButton 
                size="lg" 
                text="Получить консультацию"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl"
                showIcon={false}
                phone="+79180400402"
              />
              
              <Link to="/projects">
                <Button variant="accent" size="lg" className="px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  Смотреть проекты
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                    <feature.icon className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm">{feature.title}</h3>
                    <p className="text-white/80 text-xs">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column removed per request */}
        </div>
      </div>
    </section>
  );
};

export default Hero;