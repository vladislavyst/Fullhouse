import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppFloat from '../components/WhatsAppFloat';
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
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">Связаться с нами</h2>
              <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Позвоните, напишите в WhatsApp или приезжайте в офис — мы на связи и готовы помочь с вашим проектом.
              </p>
            </div>
            <div className="grid lg:grid-cols-2 gap-12 items-start">
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

              {/* Right column: CTA + quick links */}
              <div className="space-y-8">
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-semibold text-primary mb-4">Как с нами быстро связаться</h3>
                    <div className="space-y-3">
                      <a href="tel:+79180400402" className="block w-full">
                        <Button className="w-full bg-amber-500 hover:bg-amber-600 text-white py-6 text-base">
                          <Phone className="w-5 h-5 mr-2" /> Позвонить: +7 (918)-040-04-02
                        </Button>
                      </a>
                      <a href="https://wa.me/79180400402" target="_blank" rel="noopener noreferrer" className="block w-full">
                        <Button variant="outline" className="w-full py-6 text-base border-green-500 text-green-700 hover:bg-green-50">
                          <MessageCircle className="w-5 h-5 mr-2" /> Написать в WhatsApp
                        </Button>
                      </a>
                      <a href="mailto:info@fullhouse-neo.ru" className="block w-full">
                        <Button variant="outline" className="w-full py-6 text-base">
                          <Mail className="w-5 h-5 mr-2" /> info@fullhouse-neo.ru
                        </Button>
                      </a>
                    </div>
                    <ul className="mt-6 text-sm text-muted-foreground space-y-2 list-disc list-inside">
                      <li>Работаем ежедневно: Пн-Пт 9:00–18:00, Сб 10:00–16:00</li>
                      <li>Ответ на e‑mail — в течение 2 часов</li>
                      <li>Офис: г. Новороссийск, ул. Хворостьянского, 4 (2 этаж, офис 205)</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-semibold text-primary mb-4">Чем мы поможем</h3>
                    <div className="grid sm:grid-cols-2 gap-3 text-sm text-muted-foreground">
                      <div className="p-3 rounded-lg bg-muted/40">Подбор проекта под ваш участок</div>
                      <div className="p-3 rounded-lg bg-muted/40">Предварительный расчет стоимости</div>
                      <div className="p-3 rounded-lg bg-muted/40">Сроки и этапы строительства</div>
                      <div className="p-3 rounded-lg bg-muted/40">Ведомость материалов и комплектовка</div>
                    </div>
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

        {/* Bottom CTA */}
        <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-2xl lg:text-3xl font-bold text-primary mb-4">Готовы обсудить ваш дом?</h3>
              <p className="text-muted-foreground mb-6">Оставьте заявку в WhatsApp или позвоните — ответим на вопросы и подскажем оптимальные решения.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a href="https://wa.me/79180400402" target="_blank" rel="noopener noreferrer">
                  <Button className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2.5">
                    <MessageCircle className="w-4 h-4 mr-2" /> Написать в WhatsApp
                  </Button>
                </a>
                <a href="tel:+79180400402">
                  <Button variant="outline" className="px-6 py-2.5">
                    <Phone className="w-4 h-4 mr-2" /> Позвонить
                  </Button>
                </a>
              </div>
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
      <WhatsAppFloat />
    </div>
  );
};

export default Contact;
