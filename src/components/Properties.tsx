<<<<<<< HEAD
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
=======
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, Square, Eye } from 'lucide-react';
import projectResidential from '@/assets/project-residential.jpg';
import projectCommercial from '@/assets/project-commercial.jpg';
import projectVilla from '@/assets/project-villa.jpg';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'Все проекты' },
    { id: 'residential', label: 'Жилые' },
    { id: 'commercial', label: 'Коммерческие' },
    { id: 'private', label: 'Частные дома' }
  ];

  const projects = [
    {
      id: 1,
      title: 'ЖК "Морской бриз"',
      category: 'residential',
      image: projectResidential,
      location: 'Новороссийск, ул. Набережная',
      completion: '2024',
      area: '45,000 м²',
      status: 'Завершен',
      description: 'Премиальный жилой комплекс с видом на море. 12 этажей, 240 квартир, подземная парковка.',
      features: ['Панорамные окна', 'Море в 50 м', 'Детский сад', 'Фитнес-центр']
    },
    {
      id: 2,
      title: 'Бизнес-центр "Адмирал"',
      category: 'commercial',
      image: projectCommercial,
      location: 'Новороссийск, пр. Ленина',
      completion: '2023',
      area: '25,000 м²',
      status: 'Завершен',
      description: 'Современный бизнес-центр класса А в центре города. 15 этажей офисных помещений.',
      features: ['Класс А', 'Центр города', 'Паркинг 200 мест', 'Конференц-залы']
    },
    {
      id: 3,
      title: 'Коттеджный поселок "Южная долина"',
      category: 'private',
      image: projectVilla,
      location: 'Новороссийск, пос. Южная Озереевка',
      completion: '2024',
      area: '15,000 м²',
      status: 'В процессе',
      description: 'Элитный коттеджный поселок из 24 домов с индивидуальным дизайном и благоустройством.',
      features: ['24 дома', 'Индивидуальный дизайн', 'Закрытая территория', 'Озеленение']
    }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <section id="projects" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-4 py-2 text-sm font-medium text-primary mb-4">
            <Eye className="w-4 h-4" />
            <span>Наши проекты</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-6">
            Реализованные проекты
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
>>>>>>> 39d3f718b0d8f7b0390d11e523d856b03bc5bd8d
            Более 500 успешно завершенных проектов различного масштаба и сложности. 
            Каждый проект — это воплощение качества и профессионализма.
          </p>
        </div>

<<<<<<< HEAD
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
=======
        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant={activeFilter === filter.id ? "default" : "outline"}
              onClick={() => setActiveFilter(filter.id)}
              className="min-w-[120px]"
            >
              {filter.label}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-0 bg-white">
              {/* Project Image */}
              <div className="relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <Badge 
                    variant={project.status === 'Завершен' ? 'default' : 'secondary'}
                    className={project.status === 'Завершен' ? 'bg-success text-success-foreground' : 'bg-warning text-warning-foreground'}
                  >
                    {project.status}
                  </Badge>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <Button variant="secondary" size="sm" className="w-full">
                      Подробнее
                    </Button>
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Project Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    <span>{project.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    <span>Завершение: {project.completion}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <Square className="w-3 h-3" />
                    <span>Площадь: {project.area}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-1">
                  {project.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2 text-xs">
                      <div className="w-1 h-1 bg-accent rounded-full"></div>
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-muted-foreground mb-6">
            Хотите увидеть больше наших работ или обсудить свой проект?
          </p>
          <Button variant="accent" size="lg">
            Посмотреть все проекты
          </Button>
>>>>>>> 39d3f718b0d8f7b0390d11e523d856b03bc5bd8d
        </div>
      </div>
    </section>
  );
};

export default Projects;