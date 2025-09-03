import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Header from '../components/Header';
import Footer from '../components/Footer';
import YandexMap from '../components/YandexMap';

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-subtle">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-primary mb-6">
              Контакты строительной компании Fullhouse
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Свяжитесь с нами любым удобным способом. Мы работаем 7 дней в неделю 
              и готовы ответить на все ваши вопросы.
            </p>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Cards */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-primary mb-8">
                    Наши контакты
                  </h2>
                  
                  <div className="space-y-6">
                    <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="bg-accent/10 p-3 rounded-lg">
                            <MapPin className="w-6 h-6 text-accent" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-primary mb-2">Наш офис</h3>
                            <p className="text-muted-foreground mb-2">
                              353900, г. Новороссийск<br />
                              ул. Хворостьянского, 4 (бывшая ул. Молодежная, 4)
                            </p>
                            <p className="text-sm text-muted-foreground">
                              2 этаж, офис 205
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="bg-accent/10 p-3 rounded-lg">
                            <Phone className="w-6 h-6 text-accent" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-primary mb-2">Телефоны</h3>
                            <p className="text-muted-foreground mb-1">
                              <a href="tel:+79180400402" className="hover:text-accent transition-colors">
                                +7 (918)-040-04-02
                              </a>
                            </p>
                            <p className="text-muted-foreground mb-1">
                              <a href="tel:+79628523330" className="hover:text-accent transition-colors">
                                +7 962 852-33-30
                              </a>
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Звонки принимаем с 9:00 до 20:00
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="bg-accent/10 p-3 rounded-lg">
                            <Mail className="w-6 h-6 text-accent" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-primary mb-2">Email</h3>
                            <p className="text-muted-foreground mb-1">
                              <a href="mailto:info@fullhouse-novorossiysk.ru" className="hover:text-accent transition-colors">
                                info@fullhouse-novorossiysk.ru
                              </a>
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Ответим в течение 2 часов
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="bg-accent/10 p-3 rounded-lg">
                            <Clock className="w-6 h-6 text-accent" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-primary mb-2">Режим работы</h3>
                            <p className="text-muted-foreground mb-1">
                              Понедельник - Пятница: 9:00 - 18:00
                            </p>
                            <p className="text-muted-foreground mb-1">
                              Суббота: 10:00 - 16:00
                            </p>
                            <p className="text-muted-foreground">
                              Воскресенье: 10:00 - 14:00
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <h2 className="text-3xl font-bold text-primary mb-8">
                  Напишите нам
                </h2>
                
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <form className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-primary mb-2">
                            Имя *
                          </label>
                          <Input 
                            type="text" 
                            placeholder="Ваше имя"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-primary mb-2">
                            Телефон *
                          </label>
                          <Input 
                            type="tel" 
                            placeholder="+7 (___) ___-__-__"
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-primary mb-2">
                          Email
                        </label>
                        <Input 
                          type="email" 
                          placeholder="your@email.com"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-primary mb-2">
                          Сообщение *
                        </label>
                        <Textarea 
                          placeholder="Опишите ваш вопрос или задачу..."
                          rows={4}
                          required
                        />
                      </div>
                      
                      <Button type="submit" className="w-full bg-accent hover:bg-accent-dark">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Отправить сообщение
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-20 bg-gradient-subtle">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary mb-4">
                Наше расположение
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Офис находится в центре Новороссийска, рядом с остановкой общественного транспорта. 
                Удобная парковка для автомобилей.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <YandexMap 
                center={[44.68098, 37.79033]} 
                zoom={16}
                height="400px"
              />
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary mb-4">
                Часто задаваемые вопросы
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Ответы на самые популярные вопросы наших клиентов
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto space-y-6">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-primary mb-3">
                    Как долго строится дом под ключ?
                  </h3>
                  <p className="text-muted-foreground">
                    Время строительства зависит от площади и сложности проекта. 
                    В среднем дом 150-200 м² строится за 6-8 месяцев.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-primary mb-3">
                    Какие гарантии вы предоставляете?
                  </h3>
                  <p className="text-muted-foreground">
                    Мы предоставляем гарантию 3 года на все виды работ. 
                    Все гарантии прописаны в договоре.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-primary mb-3">
                    Можно ли посмотреть готовые проекты?
                  </h3>
                  <p className="text-muted-foreground">
                    Конечно! У нас есть готовые объекты для просмотра. 
                    Запишитесь на экскурсию по телефону или через форму выше.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
