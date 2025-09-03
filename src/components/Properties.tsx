import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, Square } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const Properties = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ 
    threshold: 0.1, 
    delay: 200,
    animation: 'fade-in'
  });
  
  const projects = [
    {
      id: 1,
      title: 'Nova',
      category: 'private',
      image: '/Nova/39.jpg',
      location: 'Новороссийск',
      completion: '2024',
      area: '159 м²',
      status: 'Завершен',
      description: 'Современный дом Nova с инновационным дизайном и современными решениями.',
      features: ['Инновационный дизайн', 'Энергоэффективность', 'Премиум отделка']
    },
    {
      id: 2,
      title: 'Ореховая Роща',
      category: 'private',
      image: '/Ореховая Роща/Orekhovaya_Roshcha_8_Vid_1.jpg',
      location: 'Краснодар',
      completion: '2024',
      area: '112 м²',
      status: 'Завершен',
      description: 'Двухэтажный дом с элегантной планировкой и просторными террасами.',
      features: ['Двухэтажная планировка', '4 спальни', 'Просторные террасы']
    },
    {
      id: 3,
      title: 'Рига',
      category: 'private',
      image: '/Рига/Stroitelstvo_doma_KP_Anosino_park_2_foto_29.jpg',
      location: 'Краснодар',
      completion: '2024',
      area: '167 м²',
      status: 'Завершен',
      description: 'Элегантный дом Рига с современной архитектурой и функциональными решениями.',
      features: ['Современная архитектура', 'Функциональная планировка', 'Энергоэффективность']
    },
    {
      id: 4,
      title: 'Гринвуд',
      category: 'private',
      image: '/Гринвуд/Stroitelstvo_doma_Stupino_KP_Grinvud_foto_18.jpg',
      location: 'Ступино',
      completion: '2024',
      area: '137 м²',
      status: 'Завершен',
      description: 'Двухэтажный дом Гринвуд с элегантной архитектурой и продуманной планировкой.',
      features: ['элегантная архитектура', 'Продуманная планировка', 'Оптимальное пространство']
    },
    {
      id: 5,
      title: 'Никола',
      category: 'private',
      image: '/Никола/20.jpg',
      location: 'Краснодар',
      completion: '2024',
      area: '154 м²',
      status: 'Завершен',
      description: 'Двухэтажный дом Никола с современной архитектурой и элегантным дизайном.',
      features: ['Современная архитектура', '3 спальни', 'Элегантный дизайн']
    },
    {
      id: 6,
      title: 'Клубный',
      category: 'private',
      image: '/Клубный/IMG_0913.jpg',
      location: 'Краснодар',
      completion: '2024',
      area: '160 м²',
      status: 'Завершен',
      description: 'Двухэтажный дом Клубный с современной архитектурой и элегантным дизайном.',
      features: ['Современная архитектура', '3 спальни', 'Просторная планировка']
    },
    {
      id: 7,
      title: 'Знаменский',
      category: 'private',
      image: '/Знаменский/22.jpeg',
      location: 'Краснодар',
      completion: '2024',
      area: '154 м²',
      status: 'Завершен',
      description: 'Двухэтажный дом Знаменский с современной архитектурой и увеличенной площадью.',
      features: ['Современная архитектура', '4 спальни', 'Увеличенная площадь']
    },
    {
      id: 8,
      title: 'Кроп',
      category: 'private',
      image: '/Кроп/20.jpeg',
      location: 'Краснодар',
      completion: '2024',
      area: '260 м²',
      status: 'Завершен',
      description: 'Двухэтажный дом Кроп с современной архитектурой и оптимальным размером.',
      features: ['Компактный дизайн', '3 спальни', 'Экономичность']
    },
    {
      id: 9,
      title: 'Янтарный',
      category: 'private',
      image: '/Янтарный/78.jpg',
      location: 'Краснодар',
      completion: '2024',
      area: '176 м²',
      status: 'Завершен',
      description: 'Двухэтажный дом Янтарный с современной архитектурой и гармоничным дизайном.',
      features: ['Современная архитектура', '3 спальни', 'Теплые тона']
    }
  ];

  const handleViewProject = (projectId: number) => {
    const slug = projectId === 1 ? 'nova' : projectId === 2 ? 'orehovaya-roscha' : projectId === 3 ? 'riga' : projectId === 4 ? 'greenwood' : projectId === 5 ? 'nikola' : projectId === 6 ? 'klubny' : projectId === 7 ? 'znamensky' : projectId === 8 ? 'krop' : 'yantarny';
    window.location.href = `/projects/${slug}`;
  };

  const handleFavorite = (projectId: number) => {
    console.log(`Проект ${projectId} добавлен в избранное`);
  };

  const handleShare = (projectId: number) => {
    console.log(`Поделиться проектом ${projectId}`);
  };

  return (
    <section ref={sectionRef} id="projects" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 dark:from-gray-900 dark:via-slate-900 dark:to-black">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className={`text-center mb-12 sm:mb-14 lg:mb-16 transition-all duration-800 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 dark:text-white mb-4 sm:mb-6 px-4">
            Реализованные проекты
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
            Наши лучшие работы, которые демонстрируют качество и профессионализм 
            строительной компании Fullhouse. Каждый проект уникален и создан с любовью.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((project) => (
            <Card 
              key={project.id} 
              className="group hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-xl"
            >
              {/* Project Image */}
              <div className="relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={`${project.title} - ${project.area}, ${project.location}, ${project.completion}`}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <Badge className={project.status === 'Новый проект' ? 'bg-blue-600 text-white' : 'bg-green-600 text-white'}>
                    {project.status}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 w-10 h-10 p-0"
                    onClick={() => handleFavorite(project.id)}
                  >
                    ♥
                  </Button>
                </div>
                <div className="absolute bottom-4 left-4">
                  <div className="text-white font-bold text-xl bg-black/50 backdrop-blur-sm px-3 py-1 rounded">
                    {project.area}
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                  {project.title}
                </h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-slate-600">
                    <MapPin className="w-4 h-4" />
                    <span>{project.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-slate-600">
                    <Calendar className="w-4 h-4" />
                    <span>{project.completion}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-slate-600">
                    <Square className="w-4 h-4" />
                    <span>{project.area}</span>
                  </div>
                </div>

                <p className="text-slate-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Features */}
                <div className="space-y-1 mb-6">
                  {project.features.slice(0, 3).map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2 text-xs">
                      <div className="w-1 h-1 bg-blue-600 rounded-full"></div>
                      <span className="text-slate-600 dark:text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button 
                    onClick={() => handleViewProject(project.id)}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    Подробнее
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleShare(project.id)}
                    className="px-3"
                  >
                    Поделиться
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12 sm:mt-14 lg:mt-16 px-4">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white mb-4 sm:mb-6">
            Хотите такой же проект?
          </h3>
          <p className="text-base sm:text-lg text-slate-600 dark:text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Свяжитесь с нами для обсуждения вашего проекта. Мы поможем воплотить 
            ваши мечты в реальность.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md sm:max-w-none mx-auto">
            <Link to="/contact">
              <Button className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-6 sm:px-8 py-2.5 sm:py-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-sm sm:text-base">
                Обсудить проект
              </Button>
            </Link>
            <Link to="/projects">
              <Button variant="outline" className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 border-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base">
                Все проекты
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Properties;