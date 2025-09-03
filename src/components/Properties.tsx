import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, Square, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const Properties = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ 
    threshold: 0.1, 
    delay: 200,
    animation: 'fade-in'
  });
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
  
  const projects = [
    {
      id: 1,
      title: 'Nova',
      category: 'private',
      image: '/Nova/39.jpg',
      location: 'г. Новороссийск',
      completion: '2024',
      area: '159 м²',
      status: 'Завершен'
    },
    {
      id: 2,
      title: 'Ореховая Роща',
      category: 'private',
      image: '/Ореховая Роща/Orekhovaya_Roshcha_8_Vid_1.jpg',
      location: 'п. Южная Озереевка',
      completion: '2024',
      area: '112 м²',
      status: 'Завершен'
    },
    {
      id: 3,
      title: 'Рига',
      category: 'private',
      image: '/Рига/Stroitelstvo_doma_KP_Anosino_park_2_foto_29.jpg',
      location: 'г. Краснодар',
      completion: '2024',
      area: '167 м²',
      status: 'Завершен'
    },
    {
      id: 4,
      title: 'Гринвуд',
      category: 'private',
      image: '/Гринвуд/Stroitelstvo_doma_Stupino_KP_Grinvud_foto_18.jpg',
      location: 'ст. Раевская',
      completion: '2024',
      area: '137 м²',
      status: 'Завершен'
    },
    {
      id: 5,
      title: 'Никола',
      category: 'private',
      image: '/Никола/21.jpg',
      location: 'г. Новороссийск',
      completion: '2024',
      area: '154 м²',
      status: 'Завершен'
    },
    {
      id: 6,
      title: 'Клубный',
      category: 'private',
      image: '/Клубный/IMG_0913.jpg',
      location: 'п. Южная Озереевка',
      completion: '2024',
      area: '160 м²',
      status: 'Завершен'
    },
    {
      id: 7,
      title: 'Знаменский',
      category: 'private',
      image: '/Знаменский/22.jpeg',
      location: 'ст. Раевская',
      completion: '2024',
      area: '154 м²',
      status: 'Завершен'
    },
    {
      id: 8,
      title: 'Кроп',
      category: 'private',
      image: '/Кроп/18.jpeg',
      location: 'г. Краснодар',
      completion: '2024',
      area: '260 м²',
      status: 'Завершен'
    },
    {
      id: 9,
      title: 'Янтарный',
      category: 'private',
      image: '/Янтарный/20220615_122614.jpg',
      location: 'г. Новороссийск',
      completion: '2024',
      area: '176 м²',
      status: 'Завершен'
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

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      // Desktop: show 3 items, so max index is projects.length - 3
      // Mobile: show 1 item, so max index is projects.length - 1
      const maxIndex = isDesktop ? Math.max(0, projects.length - 3) : Math.max(0, projects.length - 1);
      return prevIndex >= maxIndex ? 0 : prevIndex + 1;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      const maxIndex = isDesktop ? Math.max(0, projects.length - 3) : Math.max(0, projects.length - 1);
      return prevIndex <= 0 ? maxIndex : prevIndex - 1;
    });
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
            строительной компании Фулл-Хаус. Каждый проект уникален и создан с любовью.
          </p>
        </div>

        {/* Projects Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-4 z-10 hidden lg:block">
            <Button
              onClick={prevSlide}
              variant="ghost"
              size="icon"
              className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 rounded-full w-12 h-12"
            >
              <ChevronLeft className="w-6 h-6 text-slate-600" />
            </Button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 -right-4 z-10 hidden lg:block">
            <Button
              onClick={nextSlide}
              variant="ghost"
              size="icon"
              className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 rounded-full w-12 h-12"
            >
              <ChevronRight className="w-6 h-6 text-slate-600" />
            </Button>
          </div>

          {/* Carousel Container */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (isDesktop ? 33.333333 : 100)}%)`
              }}
            >
              {projects.map((project) => (
                <div key={project.id} className="w-full lg:w-1/3 flex-shrink-0 px-3">
                  <Card 
                    className="group hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-xl h-full"
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
                          className="bg-white text-slate-600 hover:bg-gray-100 w-10 h-10 p-0 shadow-md"
                          onClick={() => handleFavorite(project.id)}
                        >
                          ♥
                        </Button>
                      </div>
                      <div className="absolute bottom-4 left-4">
                        <div className="text-slate-800 font-bold text-xl bg-white px-3 py-1 rounded shadow-md">
                          {project.area}
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                        {project.title}
                      </h3>
                      
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center space-x-2 text-slate-600">
                          <MapPin className="w-4 h-4" />
                          <span className="font-medium">{project.location}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-slate-600">
                          <Calendar className="w-4 h-4" />
                          <span className="font-medium">{project.completion}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-slate-600">
                          <Square className="w-4 h-4" />
                          <span className="font-medium">{project.area}</span>
                        </div>
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
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Navigation Dots */}
          <div className="flex justify-center mt-6 space-x-2 lg:hidden">
            {Array.from({ length: projects.length }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-blue-600' : 'bg-slate-300'
                }`}
              />
            ))}
          </div>

          {/* Desktop Navigation Dots */}
          <div className="hidden lg:flex justify-center mt-6 space-x-2">
            {Array.from({ length: Math.max(1, projects.length - 2) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-blue-600' : 'bg-slate-300'
                }`}
              />
            ))}
          </div>
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