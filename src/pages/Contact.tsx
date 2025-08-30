import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-subtle">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-primary mb-6">
              Контакты
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
                              ул. Хворостьянского, 4
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
                              <a href="tel:+78617123456" className="hover:text-accent transition-colors">
                                +7 (8617) 12-34-56
                              </a>
                            </p>
                            <p className="text-muted-foreground mb-2">
                              <a href="tel:+79001234567" className="hover:text-accent transition-colors">
                                +7 (900) 123-45-67
                              </a>
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Звонки принимаются 24/7
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
                              <a href="mailto:info@fullhouse-nvr.ru" className="hover:text-accent transition-colors">
                                info@fullhouse-nvr.ru
                              </a>
                            </p>
                            <p className="text-muted-foreground mb-2">
                              <a href="mailto:sales@fullhouse-nvr.ru" className="hover:text-accent transition-colors">
                                sales@fullhouse-nvr.ru
                              </a>
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Ответим в течение 1 часа
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
                            <h3 className="font-semibold text-primary mb-2">Часы работы</h3>
                            <div className="space-y-1 text-muted-foreground">
                              <p>Пн-Пт: 9:00 - 19:00</p>
                              <p>Сб: 10:00 - 17:00</p>
                              <p>Вс: 11:00 - 16:00</p>
                            </div>
                            <p className="text-sm text-muted-foreground mt-2">
                              Показы объектов в любое время
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
                <Card className="border-0 shadow-xl">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-primary mb-6">
                      Обратная связь
                    </h3>
                    <p className="text-muted-foreground mb-8">
                      Оставьте ваши контактные данные, и мы свяжемся с вами в течение 15 минут
                    </p>
                    
                    <form className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Ваше имя *</Label>
                          <Input 
                            id="name"
                            placeholder="Введите ваше имя"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Телефон *</Label>
                          <Input 
                            id="phone"
                            type="tel"
                            placeholder="+7 (___) ___-__-__"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">Тема обращения</Label>
                        <Input 
                          id="subject"
                          placeholder="Покупка квартиры в центре города"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Сообщение</Label>
                        <Textarea 
                          id="message"
                          placeholder="Расскажите подробнее о ваших потребностях..."
                          className="h-32"
                        />
                      </div>

                      <div className="flex items-start space-x-2">
                        <input 
                          type="checkbox" 
                          id="agreement"
                          className="mt-1"
                          required
                        />
                        <label htmlFor="agreement" className="text-sm text-muted-foreground">
                          Я согласен с{' '}
                          <a href="#" className="text-accent hover:underline">
                            политикой обработки персональных данных
                          </a>
                        </label>
                      </div>

                      <Button type="submit" size="lg" className="w-full bg-accent hover:bg-accent-dark">
                        <Send className="w-5 h-5 mr-2" />
                        Отправить сообщение
                      </Button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-gray-200">
                      <p className="text-sm text-muted-foreground text-center">
                        Или свяжитесь с нами в мессенджерах:
                      </p>
                      <div className="flex justify-center space-x-4 mt-4">
                        <Button variant="outline" size="sm">
                          WhatsApp
                        </Button>
                        <Button variant="outline" size="sm">
                          Telegram
                        </Button>
                        <Button variant="outline" size="sm">
                          Viber
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary mb-4">
                Как до нас добраться
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Наш офис находится в центре Новороссийска, в 2 минутах пешком от остановки 
                "Площадь Свободы". Есть парковка для клиентов.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
                  <p className="text-muted-foreground">
                    Здесь будет интерактивная карта
                  </p>
                </div>
              </div>
              
              <div className="space-y-6">
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-primary mb-4">Как добраться</h3>
                    <div className="space-y-3 text-sm text-muted-foreground">
                      <div>
                        <strong className="text-primary">На автомобиле:</strong>
                        <p>Паркинг перед зданием, бесплатно для клиентов</p>
                      </div>
                      <div>
                        <strong className="text-primary">Общественным транспортом:</strong>
                        <p>Остановка "Площадь Свободы" - автобусы 2, 5, 10, 15</p>
                      </div>
                      <div>
                        <strong className="text-primary">Ориентиры:</strong>
                        <p>Рядом с ТЦ "Красная площадь", напротив банка ВТБ</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-primary mb-4">Удобно для клиентов</h3>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p>• Бесплатная парковка</p>
                      <p>• Кофе и чай в офисе</p>
                      <p>• Детская зона ожидания</p>
                      <p>• Wi-Fi для гостей</p>
                      <p>• Доступная среда</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;