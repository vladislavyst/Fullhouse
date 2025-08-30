import { Award, Users, TrendingUp, Shield, MapPin, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  const stats = [
    {
      icon: Clock,
      number: '15+',
      label: 'лет на рынке',
      description: 'Работаем с 2008 года'
    },
    {
      icon: TrendingUp,
      number: '2500+',
      label: 'объектов продано',
      description: 'Успешных сделок'
    },
    {
      icon: Users,
      number: '5000+',
      label: 'довольных клиентов',
      description: 'Рекомендуют нас друзьям'
    },
    {
      icon: Award,
      number: '98%',
      label: 'положительных отзывов',
      description: 'Высокий рейтинг качества'
    }
  ];

  const team = [
    {
      name: 'Анна Петрова',
      position: 'Директор агентства',
      experience: '15 лет опыта',
      photo: 'https://images.unsplash.com/photo-1494790108755-2616c6106db4?w=400&h=400&fit=crop&crop=face'
    },
    {
      name: 'Михаил Сидоров',
      position: 'Ведущий риелтор',
      experience: '12 лет опыта',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face'
    },
    {
      name: 'Елена Козлова',
      position: 'Специалист по ипотеке',
      experience: '8 лет опыта',
      photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face'
    },
    {
      name: 'Дмитрий Волков',
      position: 'Эксперт по коммерческой недвижимости',
      experience: '10 лет опыта',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face'
    }
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-4 py-2 text-sm font-medium text-primary mb-4">
            <Shield className="w-4 h-4" />
            <span>О компании</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-6">
            Надежный партнер в мире недвижимости
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Fullhouse — ведущее агентство недвижимости в Новороссийске. Мы помогаем людям 
            найти дом мечты и инвесторам — выгодные объекты для вложений.
          </p>
        </div>

        {/* Company Description */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <div>
            <h3 className="text-2xl font-bold text-primary mb-6">Наша миссия</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Мы делаем процесс покупки и продажи недвижимости простым, безопасным и выгодным. 
              Каждый клиент получает индивидуальный подход и профессиональное сопровождение 
              на всех этапах сделки.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span className="text-muted-foreground">Прозрачность всех операций</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span className="text-muted-foreground">Юридическая чистота сделок</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span className="text-muted-foreground">Максимальная выгода для клиента</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span className="text-muted-foreground">Индивидуальный подход к каждому</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-primary mb-6">Почему выбирают нас?</h3>
            <div className="space-y-4">
              <Card className="border border-gray-200 hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-accent/10 p-2 rounded-lg">
                      <MapPin className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary mb-1">Знание рынка</h4>
                      <p className="text-sm text-muted-foreground">
                        Глубокое понимание рынка недвижимости Новороссийска и региона
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border border-gray-200 hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-accent/10 p-2 rounded-lg">
                      <Shield className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary mb-1">Безопасность</h4>
                      <p className="text-sm text-muted-foreground">
                        Полная проверка документов и юридическое сопровождение сделок
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border border-gray-200 hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-accent/10 p-2 rounded-lg">
                      <Users className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary mb-1">Команда профессионалов</h4>
                      <p className="text-sm text-muted-foreground">
                        Опытные риелторы, юристы и эксперты по ипотеке
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center border-0 bg-gradient-subtle p-8 hover:shadow-lg transition-all">
              <CardContent className="p-0">
                <div className="bg-primary rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-lg font-semibold text-gray-900 mb-1">{stat.label}</div>
                <div className="text-sm text-muted-foreground">{stat.description}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Team */}
        <div>
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-primary mb-4">Наша команда</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Профессионалы с многолетним опытом, которые помогут вам на каждом этапе сделки
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                <div className="p-6">
                  <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                    <img 
                      src={member.photo} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="font-bold text-primary text-lg mb-1">{member.name}</h4>
                  <p className="text-muted-foreground text-sm mb-2">{member.position}</p>
                  <div className="inline-block bg-accent/10 text-accent text-xs px-3 py-1 rounded-full">
                    {member.experience}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Licenses */}
        <div className="mt-20 text-center bg-gray-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-primary mb-4">Лицензии и сертификаты</h3>
          <p className="text-muted-foreground mb-6">
            Все необходимые разрешения для осуществления деятельности на рынке недвижимости
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border border-gray-200 p-4">
              <CardContent className="p-0 text-center">
                <Award className="w-12 h-12 text-accent mx-auto mb-3" />
                <h4 className="font-semibold text-sm">Лицензия риелтора</h4>
                <p className="text-xs text-muted-foreground mt-1">№ РН-2024-001</p>
              </CardContent>
            </Card>
            
            <Card className="border border-gray-200 p-4">
              <CardContent className="p-0 text-center">
                <Shield className="w-12 h-12 text-accent mx-auto mb-3" />
                <h4 className="font-semibold text-sm">Страхование ответственности</h4>
                <p className="text-xs text-muted-foreground mt-1">до 10 млн ₽</p>
              </CardContent>
            </Card>
            
            <Card className="border border-gray-200 p-4">
              <CardContent className="p-0 text-center">
                <Users className="w-12 h-12 text-accent mx-auto mb-3" />
                <h4 className="font-semibold text-sm">Член РГР</h4>
                <p className="text-xs text-muted-foreground mt-1">Российская гильдия риелторов</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;