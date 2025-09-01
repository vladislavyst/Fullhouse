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
      title: 'Forest Residence',
      category: 'private',
      image: '/Forest Residence.jpeg',
      location: 'Адрау-Дюрсо',
      completion: '2024',
      area: '350 м²',
      status: 'Завершен',
      description: 'Премиальная резиденция в лесной зоне. Современная архитектура с панорамными окнами.',
      features: ['Панорамные окна', 'Лесная зона', 'Терраса', 'Премиум отделка']
    },
    {
      id: 2,
      title: 'Lucky House',
      category: 'private',
      image: '/Lucky House.jpeg',
      location: 'г.Сочи',
      completion: '2024',
      area: '280 м²',
      status: 'Завершен',
      description: 'Уютный семейный дом с современным дизайном и функциональной планировкой.',
      features: ['Семейный дом', 'Современный дизайн', 'Гараж', 'Ландшафт']
    },
    {
      id: 3,
      title: 'Паркфилд',
      category: 'private',
      image: '/Паркфилд.jpeg',
      location: 'г. Краснодар',
      completion: '2023',
      area: '420 м²',
      status: 'Завершен',
      description: 'Элитный коттедж с видом на парк. Просторные комнаты и изысканная отделка.',
      features: ['Вид на парк', 'Элитная отделка', 'Большие комнаты', 'Двор']
    }
  ];

  const handleViewProject = (projectId: number) => {
    const slug = projectId === 1 ? 'forest-residence' : projectId === 2 ? 'lucky-house' : 'parkfield';
    window.location.href = `/projects/${slug}`;
  };

  const handleFavorite = (projectId: number) => {
    console.log(`Проект ${projectId} добавлен в избранное`);
  };

  const handleShare = (projectId: number) => {
    console.log(`Поделиться проектом ${projectId}`);
  };

  return (
    <section ref={sectionRef} id="projects" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-800 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
            Реализованные проекты
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Наши лучшие работы, которые демонстрируют качество и профессионализм 
            строительной компании Fullhouse. Каждый проект уникален и создан с любовью.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card 
              key={project.id} 
              className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-0 bg-white"
            >
              {/* Project Image */}
              <div className="relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={`${project.title} - ${project.area}, ${project.location}, ${project.completion}`}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-green-600 text-white">
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
                <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
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

                <p className="text-slate-600 mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Features */}
                <div className="space-y-1 mb-6">
                  {project.features.slice(0, 3).map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2 text-xs">
                      <div className="w-1 h-1 bg-blue-600 rounded-full"></div>
                      <span className="text-slate-600">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button 
                    onClick={() => handleViewProject(project.id)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
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
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-slate-800 mb-6">
            Хотите такой же проект?
          </h3>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Свяжитесь с нами для обсуждения вашего проекта. Мы поможем воплотить 
            ваши мечты в реальность.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3">
                Обсудить проект
              </Button>
            </Link>
            <Link to="/projects">
              <Button variant="outline" className="px-8 py-3">
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