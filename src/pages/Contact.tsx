import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Header from '../components/Header';
import Footer from '../components/Footer';
<<<<<<< HEAD
import { useSEO, seoConfigs } from '@/hooks/useSEO';
import Breadcrumbs from '@/components/Breadcrumbs';
import ContactSchema from '@/components/ContactSchema';
import FAQSection from '@/components/FAQSection';
import ReviewsSection from '@/components/ReviewsSection';
import YandexMap from '@/components/YandexMap';


const Contact = () => {
  // Применяем SEO-оптимизацию для страницы контактов
  useSEO(seoConfigs.contact);
  
  return (
    <div className="min-h-screen bg-background">
      <ContactSchema 
        phone="+7 (8617) 12-34-56"
        email="info@sk-fullhouse.com"
        address={{
          street: "ул. Хворостьянского, 4",
          city: "Новороссийск",
          region: "Краснодарский край",
          postalCode: "353900"
        }}
        workingHours="Пн-Вс: 9:00-18:00"
        companyName="Fullhouse - Строительная компания"
      />
      
      <Header />
      
      {/* Хлебные крошки для SEO */}
      <Breadcrumbs 
        items={[
          { label: 'Контакты', path: '/contact', current: true }
        ]} 
      />
      
=======

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
>>>>>>> 39d3f718b0d8f7b0390d11e523d856b03bc5bd8d
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-subtle">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-primary mb-6">
<<<<<<< HEAD
              Контакты строительной компании Fullhouse
=======
              Контакты
>>>>>>> 39d3f718b0d8f7b0390d11e523d856b03bc5bd8d
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
<<<<<<< HEAD
                          <div 
                            itemScope 
                            itemType="https://schema.org/PostalAddress"
                          >
                            <h3 className="font-semibold text-primary mb-2">Наш офис</h3>
                            <p className="text-muted-foreground mb-2">
                              <span itemProp="postalCode">353900</span>, г. <span itemProp="addressLocality">Новороссийск</span><br />
                              <span itemProp="streetAddress">ул. Хворостьянского, 4</span>
=======
                          <div>
                            <h3 className="font-semibold text-primary mb-2">Наш офис</h3>
                            <p className="text-muted-foreground mb-2">
                              353900, г. Новороссийск<br />
                              ул. Хворостьянского, 4
>>>>>>> 39d3f718b0d8f7b0390d11e523d856b03bc5bd8d
                            </p>
                            <p className="text-sm text-muted-foreground">
                              2 этаж, офис 205
                            </p>
<<<<<<< HEAD
                            <meta itemProp="addressRegion" content="Краснодарский край" />
                            <meta itemProp="addressCountry" content="RU" />
=======
>>>>>>> 39d3f718b0d8f7b0390d11e523d856b03bc5bd8d
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
<<<<<<< HEAD
                          <div 
                            itemScope 
                            itemType="https://schema.org/ContactPoint"
                          >
                            <h3 className="font-semibold text-primary mb-2">Телефоны</h3>
                            <p className="text-muted-foreground mb-1">
                              <a 
                                href="tel:+78617123456" 
                                className="hover:text-accent transition-colors"
                                itemProp="telephone"
                              >
=======
                          <div>
                            <h3 className="font-semibold text-primary mb-2">Телефоны</h3>
                            <p className="text-muted-foreground mb-1">
                              <a href="tel:+78617123456" className="hover:text-accent transition-colors">
>>>>>>> 39d3f718b0d8f7b0390d11e523d856b03bc5bd8d
                                +7 (8617) 12-34-56
                              </a>
                            </p>
                            <p className="text-muted-foreground mb-2">
<<<<<<< HEAD
                              <a 
                                href="tel:+79881234567" 
                                className="hover:text-accent transition-colors"
                                itemProp="telephone"
                              >
                                +7 (988) 123-45-67
                              </a>
                            </p>
                            <meta itemProp="contactType" content="customer service" />
                            <meta itemProp="availableLanguage" content="Russian" />
                            <meta itemProp="areaServed" content="RU" />
=======
                              <a href="tel:+79001234567" className="hover:text-accent transition-colors">
                                +7 (900) 123-45-67
                              </a>
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Звонки принимаются 24/7
                            </p>
>>>>>>> 39d3f718b0d8f7b0390d11e523d856b03bc5bd8d
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
<<<<<<< HEAD
                              <a 
                                href="mailto:info@sk-fullhouse.com" 
                                className="hover:text-accent transition-colors"
                                itemProp="email"
                              >
                                info@sk-fullhouse.com
                              </a>
                            </p>
                            <p className="text-muted-foreground">
                              <a 
                                href="mailto:sales@sk-fullhouse.com" 
                                className="hover:text-accent transition-colors"
                              >
                                sales@sk-fullhouse.com
                              </a>
                            </p>
=======
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
>>>>>>> 39d3f718b0d8f7b0390d11e523d856b03bc5bd8d
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
<<<<<<< HEAD
                          <div 
                            itemScope 
                            itemType="https://schema.org/OpeningHoursSpecification"
                          >
                            <h3 className="font-semibold text-primary mb-2">Режим работы</h3>
                            <p className="text-muted-foreground mb-1">
                              <span itemProp="description">Пн-Вс: 9:00-18:00</span>
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Без перерыва на обед
                            </p>
                            <meta itemProp="dayOfWeek" content="Monday Tuesday Wednesday Thursday Friday Saturday Sunday" />
                            <meta itemProp="opens" content="09:00" />
                            <meta itemProp="closes" content="18:00" />
=======
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
>>>>>>> 39d3f718b0d8f7b0390d11e523d856b03bc5bd8d
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div>
<<<<<<< HEAD
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold text-primary mb-6">
                      Напишите нам
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      Заполните форму, и мы свяжемся с вами в течение 30 минут
=======
                <Card className="border-0 shadow-xl">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-primary mb-6">
                      Обратная связь
                    </h3>
                    <p className="text-muted-foreground mb-8">
                      Оставьте ваши контактные данные, и мы свяжемся с вами в течение 15 минут
>>>>>>> 39d3f718b0d8f7b0390d11e523d856b03bc5bd8d
                    </p>
                    
                    <form className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Ваше имя *</Label>
                          <Input 
                            id="name"
<<<<<<< HEAD
                            placeholder="Иван Иванов"
                            required
                          />
                        </div>
                        
=======
                            placeholder="Введите ваше имя"
                            required
                          />
                        </div>
>>>>>>> 39d3f718b0d8f7b0390d11e523d856b03bc5bd8d
                        <div className="space-y-2">
                          <Label htmlFor="phone">Телефон *</Label>
                          <Input 
                            id="phone"
                            type="tel"
<<<<<<< HEAD
                            placeholder="+7 (999) 123-45-67"
=======
                            placeholder="+7 (___) ___-__-__"
>>>>>>> 39d3f718b0d8f7b0390d11e523d856b03bc5bd8d
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
<<<<<<< HEAD
                <div 
                  className="bg-gray-200 rounded-lg h-96 flex items-center justify-center"
                  itemScope 
                  itemType="https://schema.org/Place"
                >
                  <div className="text-center">
                    <p className="text-muted-foreground mb-4">
                      Здесь будет интерактивная карта
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <span itemProp="name">Офис Fullhouse</span><br />
                      <span itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                        <span itemProp="streetAddress">ул. Хворостьянского, 4</span>, 
                        <span itemProp="addressLocality">Новороссийск</span>
                      </span>
                    </p>
                  </div>
=======
                <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
                  <p className="text-muted-foreground">
                    Здесь будет интерактивная карта
                  </p>
>>>>>>> 39d3f718b0d8f7b0390d11e523d856b03bc5bd8d
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
<<<<<<< HEAD

        {/* Map Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-800 mb-4">Наше расположение</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Офис компании Fullhouse находится в центре Новороссийска. 
                Приходите к нам для личной консультации по всем вопросам строительства.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              <div className="space-y-6">
                <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
                  <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center">
                    <MapPin className="w-5 h-5 text-blue-600 mr-2" />
                    Адрес офиса
                  </h3>
                  <p className="text-slate-600 mb-2">г. Новороссийск, ул. Хворостьянского, 4</p>
                  <p className="text-slate-600 mb-4">(бывшая ул. Молодежная, 4), 2 этаж, офис 205</p>
                  <div className="space-y-2 text-sm text-slate-600">
                    <p><strong>Время работы:</strong> Пн-Вс: 9:00-18:00</p>
                    <p><strong>Телефон:</strong> +7 (8617) 12-34-56</p>
                    <p><strong>Email:</strong> info@sk-fullhouse.com</p>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
                  <h3 className="text-xl font-semibold text-slate-800 mb-4">Как добраться</h3>
                  <div className="space-y-3 text-sm text-slate-600">
                    <p>• <strong>На автомобиле:</strong> Бесплатная парковка перед офисом</p>
                    <p>• <strong>На общественном транспорте:</strong> Остановка "Площадь Свободы" (автобусы 2, 5, 10, 15)</p>
                    <p>• <strong>Пешком:</strong> 2 минуты от остановки</p>
                    <p>• <strong>Ориентиры:</strong> Рядом с ТЦ "Красная площадь", напротив банка ВТБ</p>
                  </div>
                </div>
              </div>
              
              <div className="lg:sticky lg:top-8">
                <YandexMap 
                  center={[44.68098, 37.79033]}
                  zoom={16}
                  height="500px"
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section для SEO */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <FAQSection 
              title="Часто задаваемые вопросы о контактах"
              items={[
                {
                  question: "Как связаться с вами в нерабочее время?",
                  answer: "В нерабочее время вы можете оставить заявку на сайте или написать нам в мессенджерах. Мы ответим на следующий рабочий день."
                },
                {
                  question: "Можно ли приехать в офис без предварительной записи?",
                  answer: "Да, наш офис открыт для посетителей с 9:00 до 18:00 без предварительной записи. Но для экономии времени рекомендуем позвонить заранее."
                },
                {
                  question: "Есть ли у вас бесплатная парковка?",
                  answer: "Да, перед нашим офисом есть бесплатная парковка для клиентов. Просто скажите администратору номер вашего автомобиля."
                },
                {
                  question: "Как добраться на общественном транспорте?",
                  answer: "До остановки 'Площадь Свободы' ходят автобусы 2, 5, 10, 15. От остановки до офиса 2 минуты пешком."
                },
                {
                  question: "Работаете ли вы в выходные дни?",
                  answer: "Да, мы работаем 7 дней в неделю с 9:00 до 18:00 без перерыва на обед."
                }
              ]}
            />
          </div>
        </section>

        {/* Отзывы клиентов для SEO */}
        <ReviewsSection 
          title="Отзывы наших клиентов"
          reviews={[
            {
              id: "1",
              author: "Александр Петров",
              rating: 5,
              date: "2024-01-15",
              text: "Отличная работа! Построили дом точно в срок, качество на высоте. Рекомендую всем, кто хочет построить дом своей мечты.",
              verified: true
            },
            {
              id: "2",
              author: "Елена Сидорова",
              rating: 5,
              date: "2024-01-10",
              text: "Профессиональный подход к делу. Все этапы строительства контролировали, результат превзошел ожидания.",
              verified: true
            },
            {
              id: "3",
              author: "Дмитрий Козлов",
              rating: 4,
              date: "2024-01-05",
              text: "Хорошая компания, качественное строительство. Единственное - немного задержали с отделкой, но качество компенсировало.",
              verified: true
            }
          ]}
          averageRating={4.7}
          totalReviews={127}
        />

        {/* Внутренние ссылки для SEO */}

=======
>>>>>>> 39d3f718b0d8f7b0390d11e523d856b03bc5bd8d
      </main>

      <Footer />
    </div>
  );
};

export default Contact;