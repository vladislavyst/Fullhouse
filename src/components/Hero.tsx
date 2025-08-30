import { Button } from '@/components/ui/button';
import { ArrowRight, Award, Users, Clock, Shield } from 'lucide-react';
import heroImage from '@/assets/hero-construction.jpg';

const Hero = () => {
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
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-hero opacity-90"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Main Content */}
          <div className="text-white">
            <div className="inline-flex items-center space-x-2 bg-white/10 rounded-full px-4 py-2 text-sm font-medium mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
              <span>Строительная компания №1 в Новороссийске</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
              Строим дома 
              <span className="text-accent"> вашей мечты</span> 
              под ключ
            </h1>
            
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Полный цикл строительства жилой и коммерческой недвижимости в Новороссийске. 
              От проекта до ключей — с гарантией качества и соблюдением сроков.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button size="lg" variant="default" className="bg-accent hover:bg-accent-dark text-accent-foreground">
                Рассчитать стоимость
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                Наши проекты
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-accent mb-1">12+</div>
                <div className="text-sm text-white/80">лет опыта</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent mb-1">500+</div>
                <div className="text-sm text-white/80">проектов</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent mb-1">100%</div>
                <div className="text-sm text-white/80">гарантия</div>
              </div>
            </div>
          </div>

          {/* Right Column - Features */}
          <div className="space-y-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-accent/20 rounded-lg p-3">
                    <feature.icon className="w-6 h-6 text-accent" />
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
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;