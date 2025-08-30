import { Building, Home, Wrench, Calculator, FileText, Headphones } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Services = () => {
  const services = [
    {
      icon: Building,
      title: 'Жилые комплексы',
      description: 'Проектирование и строительство современных жилых комплексов с развитой инфраструктурой',
      features: ['Квартиры от 1 до 4 комнат', 'Подземные паркинги', 'Детские площадки', 'Благоустройство территории']
    },
    {
      icon: Home,
      title: 'Частные дома',
      description: 'Строительство коттеджей и частных домов под ключ с индивидуальным дизайном',
      features: ['Индивидуальные проекты', 'Различные материалы', 'Ландшафтный дизайн', 'Инженерные системы']
    },
    {
      icon: Building,
      title: 'Коммерческая недвижимость',
      description: 'Офисные здания, торговые центры и производственные помещения',
      features: ['Офисные комплексы', 'Торговые площади', 'Складские помещения', 'Производственные цеха']
    },
    {
      icon: Wrench,
      title: 'Реконструкция',
      description: 'Модернизация и реконструкция существующих зданий и сооружений',
      features: ['Капитальный ремонт', 'Надстройка этажей', 'Перепланировка', 'Утепление фасадов']
    },
    {
      icon: Calculator,
      title: 'Проектирование',
      description: 'Полный цикл архитектурного и инженерного проектирования',
      features: ['Архитектурные решения', 'Конструктивные проекты', '3D-визуализация', 'Согласование документации']
    },
    {
      icon: FileText,
      title: 'Консалтинг',
      description: 'Консультационные услуги по всем вопросам строительства и недвижимости',
      features: ['Экспертиза проектов', 'Оценка недвижимости', 'Юридическое сопровождение', 'Технический надзор']
    }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-accent/10 rounded-full px-4 py-2 text-sm font-medium text-accent mb-4">
            <Headphones className="w-4 h-4" />
            <span>Наши услуги</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-6">
            Полный спектр строительных услуг
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            От идеи до воплощения — мы берем на себя все этапы строительства, 
            обеспечивая высочайшее качество на каждом из них
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-xl transition-all duration-300 border-0 bg-white hover:-translate-y-1"
            >
              <CardContent className="p-8">
                <div className="bg-gradient-accent rounded-xl p-4 w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-8 h-8 text-accent-foreground" />
                </div>
                
                <h3 className="text-xl font-bold text-primary mb-4 group-hover:text-accent transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>

                <div className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-primary rounded-2xl p-8 lg:p-12 text-white">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              Готовы обсудить ваш проект?
            </h3>
            <p className="text-primary-foreground/90 mb-8 text-lg max-w-2xl mx-auto">
              Получите бесплатную консультацию и предварительную смету для вашего строительного проекта
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-accent hover:bg-accent-dark px-8 py-3 rounded-lg font-semibold transition-colors">
                Получить консультацию
              </button>
              <button className="border border-white/30 hover:bg-white/10 px-8 py-3 rounded-lg font-semibold transition-colors">
                Рассчитать стоимость
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;