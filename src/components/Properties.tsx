import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, Square } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const Projects = () => {
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
            Более 500 успешно завершенных проектов различного масштаба и сложности. 
            Каждый проект — это воплощение качества и профессионализма.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => {
            const slug = project.id === 1 ? 'forest-residence' : project.id === 2 ? 'lucky-house' : 'parkfield';
            return (
              <Card
                key={project.id}
                className="fh-card group"
                style={{
                  animationDelay: `${index * 150}ms`,
                  transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                  opacity: isVisible ? 1 : 0
                }}
              >
                <div className="fh-card__image">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                  <Badge className="fh-badge-primary">{project.status}</Badge>
                </div>
                <CardContent className="fh-card__body">
                  <h3 className="fh-card__title group-hover:text-blue-700">{project.title}</h3>
                  <p className="fh-card__desc">{project.description}</p>

                  <div className="fh-card__meta">
                    <div className="flex items-center gap-1"><MapPin className="w-4 h-4" />{project.location}</div>
                    <div className="flex items-center gap-1"><Calendar className="w-4 h-4" />{project.completion}</div>
                    <div className="flex items-center gap-1"><Square className="w-4 h-4" />{project.area}</div>
                  </div>

                  <div className="mt-4">
                    <Button asChild variant="default" className="w-full fh-btn-primary group-hover:shadow-xl">
                      <Link to={`/projects/${slug}`}>Подробнее</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;