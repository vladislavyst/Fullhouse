import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useSEO } from '@/hooks/useSEO';
import { PenTool, Ruler, Boxes, Layers, Home, Landmark, MessageCircle, Phone, CheckCircle } from 'lucide-react';

const Design = () => {
  useSEO({
    title: 'Архитектурное проектирование домов | Fullhouse',
    description: 'Создаем уникальные проекты с учетом ваших пожеланий и норм строительства: ЭП, АР, КР, инженерные разделы и 3D.',
    url: typeof window !== 'undefined' ? window.location.href : undefined,
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24">
        {/* Hero */}
        <section className="relative py-14 sm:py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 overflow-hidden">
          <div className="pointer-events-none absolute inset-0" style={{background: 'radial-gradient(ellipse at top left, rgba(59,130,246,0.12), transparent 60%)'}} />
          <div className="container mx-auto px-4 text-center relative">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-700 mb-4">Архитектурное проектирование домов</h1>
            <p className="text-lg sm:text-xl text-slate-700 max-w-3xl mx-auto">Создаем уникальные проекты, воплощающие ваши мечты в реальность</p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
              {['ЭП', 'АР', 'КР', 'Инженерные разделы', '3D‑визуализация'].map((t, i) => (
                <span key={i} className="px-3 py-1 rounded-full text-xs sm:text-sm bg-white/80 ring-1 ring-slate-200 text-slate-700">{t}</span>
              ))}
            </div>
            <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
              <a href="https://wa.me/79883464087" target="_blank" rel="noopener noreferrer">
                <Button className="fh-btn-primary"><MessageCircle className="w-4 h-4 mr-2" /> Заказать консультацию</Button>
              </a>
              <a href="tel:+79180400402">
                <Button className="fh-btn-secondary"><Phone className="w-4 h-4 mr-2" /> Позвонить</Button>
              </a>
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-muted-foreground text-lg">Проектирование — это основа любого успешного строительства. В Fullhouse мы разрабатываем индивидуальные архитектурные проекты, которые учитывают ваши пожелания, особенности участка и требования строительных норм.</p>
            </div>
          </div>
        </section>

        <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

        {/* Виды проектирования */}
        <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-6 text-center">Виды проектирования</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-0 shadow-xl ring-1 ring-slate-200/60 rounded-2xl hover:shadow-2xl transition-all animate-fade-in-up">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 text-primary mb-3">
                    <div className="w-10 h-10 rounded-full bg-white ring-1 ring-slate-200 flex items-center justify-center"><PenTool className="w-5 h-5" /></div>
                    <h3 className="font-semibold">Индивидуальное проектирование</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>Уникальный дизайн под ваши потребности</li>
                    <li>Полный цикл от эскиза до рабочих чертежей</li>
                    <li>Учет всех пожеланий заказчика</li>
                    <li>Адаптация под конкретный участок</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-xl ring-1 ring-slate-200/60 rounded-2xl hover:shadow-2xl transition-all animate-fade-in-up">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 text-primary mb-3">
                    <div className="w-10 h-10 rounded-full bg-white ring-1 ring-slate-200 flex items-center justify-center"><Layers className="w-5 h-5" /></div>
                    <h3 className="font-semibold">Типовые проекты с адаптацией</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>Готовые архитектурные решения</li>
                    <li>Возможность внесения изменений</li>
                    <li>Быстрые сроки подготовки</li>
                    <li>Оптимальное соотношение цена/качество</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-xl ring-1 ring-slate-200/60 rounded-2xl hover:shadow-2xl transition-all animate-fade-in-up">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 text-primary mb-3">
                    <div className="w-10 h-10 rounded-full bg-white ring-1 ring-slate-200 flex items-center justify-center"><Boxes className="w-5 h-5" /></div>
                    <h3 className="font-semibold">3D‑визуализация</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>Реалистичные 3D‑модели</li>
                    <li>Виртуальные прогулки по дому</li>
                    <li>Подбор материалов и цветов</li>
                    <li>Презентация проекта</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Стадии проектирования */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-6 text-center">Стадии проектирования</h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              <Card className="border-0 shadow-xl ring-1 ring-slate-200/60 rounded-2xl hover:shadow-2xl transition-all">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-primary mb-3"><Ruler className="w-5 h-5" /><h3 className="font-semibold">Эскизный проект (ЭП)</h3></div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>Концепция и общий вид здания</li>
                    <li>Планировочные решения</li>
                    <li>Фасады и разрезы</li>
                    <li>Генеральный план участка</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-xl ring-1 ring-slate-200/60 rounded-2xl hover:shadow-2xl transition-all">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-primary mb-3"><Home className="w-5 h-5" /><h3 className="font-semibold">Архитектурный проект (АР)</h3></div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>Детальные планы всех этажей</li>
                    <li>Фасады с указанием материалов</li>
                    <li>Разрезы и узлы</li>
                    <li>Спецификации и ведомости</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-xl ring-1 ring-slate-200/60 rounded-2xl hover:shadow-2xl transition-all">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-primary mb-3"><Landmark className="w-5 h-5" /><h3 className="font-semibold">Конструктивный проект (КР)</h3></div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>Расчеты несущих конструкций</li>
                    <li>Схемы армирования</li>
                    <li>Узлы соединений</li>
                    <li>Технические решения</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-xl ring-1 ring-slate-200/60 rounded-2xl hover:shadow-2xl transition-all">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-primary mb-3"><Layers className="w-5 h-5" /><h3 className="font-semibold">Инженерные разделы</h3></div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>Электроснабжение (ЭОМ)</li>
                    <li>Водоснабжение и канализация (ВК)</li>
                    <li>Отопление и вентиляция (ОВ)</li>
                    <li>Слаботочные системы</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Архитектурные стили */}
        <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-6 text-center">Архитектурные стили</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[{title:'Современный стиль', points:['Минималистичные формы','Большие окна и открытые пространства','Современные материалы','Энергоэффективность']},
                {title:'Классический стиль', points:['Симметричные фасады','Традиционные пропорции','Декоративные элементы','Натуральные материалы']},
                {title:'Скандинавский стиль', points:['Простота и функциональность','Светлые тона и натуральные материалы','Большие окна','Экологичность']},
                {title:'Хай‑тек', points:['Металл и стекло','Четкие геометрические формы','Современные технологии','Необычные решения']}
              ].map((s, i) => (
                <Card key={i} className="border-0 shadow-xl ring-1 ring-slate-200/60 rounded-2xl hover:shadow-2xl transition-all">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-primary mb-2">{s.title}</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {s.points.map((p, j) => (<li key={j}>{p}</li>))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Что входит в проект */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-6 text-center">Что входит в проект</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-0 shadow-xl ring-1 ring-slate-200/60 rounded-2xl hover:shadow-2xl transition-all">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-primary mb-2">Архитектурная часть</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>Поэтажные планы с размерами</li>
                    <li>Фасады в цвете</li>
                    <li>Разрезы здания</li>
                    <li>План кровли</li>
                    <li>Спецификации материалов</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-xl ring-1 ring-slate-200/60 rounded-2xl hover:shadow-2xl transition-all">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-primary mb-2">Конструктивная часть</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>Схема фундамента</li>
                    <li>Планы перекрытий</li>
                    <li>Схема стропильной системы</li>
                    <li>Узлы и детали</li>
                    <li>Расчеты нагрузок</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-xl ring-1 ring-slate-200/60 rounded-2xl hover:shadow-2xl transition-all">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-primary mb-2">Инженерные системы</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>Схемы разводки коммуникаций</li>
                    <li>Расчет мощностей</li>
                    <li>Спецификации оборудования</li>
                    <li>Принципиальные схемы</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Дополнительные услуги */}
        <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-6 text-center">Дополнительные услуги</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-xl ring-1 ring-slate-200/60 rounded-2xl hover:shadow-2xl transition-all">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-primary mb-2">Ландшафтное проектирование</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>Благоустройство территории</li>
                    <li>Размещение малых форм</li>
                    <li>Планировка сада и огорода</li>
                    <li>Системы полива и освещения</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-xl ring-1 ring-slate-200/60 rounded-2xl hover:shadow-2xl transition-all">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-primary mb-2">Дизайн интерьера</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>Планировка помещений</li>
                    <li>Подбор материалов и мебели</li>
                    <li>3D‑визуализация интерьеров</li>
                    <li>Авторский надзор</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-xl ring-1 ring-slate-200/60 rounded-2xl hover:shadow-2xl transition-all md:col-span-2">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-primary mb-2">Получение разрешений</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>Подготовка документов для согласования</li>
                    <li>Взаимодействие с контролирующими органами</li>
                    <li>Внесение изменений в проект</li>
                    <li>Сопровождение до получения разрешения</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Стоимость */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-6 text-center">Стоимость проектирования</h2>
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-xl ring-1 ring-slate-200/60 rounded-2xl"><CardContent className="p-6"><h3 className="font-semibold text-primary mb-2">Эскизный проект</h3><p className="text-muted-foreground">от 300 руб/м²</p></CardContent></Card>
              <Card className="border-0 shadow-xl ring-1 ring-slate-200/60 rounded-2xl"><CardContent className="p-6"><h3 className="font-semibold text-primary mb-2">Архитектурный проект</h3><p className="text-muted-foreground">от 500 руб/м²</p></CardContent></Card>
              <Card className="border-0 shadow-xl ring-1 ring-slate-200/60 rounded-2xl"><CardContent className="p-6"><h3 className="font-semibold text-primary mb-2">Полный проект с инженерией</h3><p className="text-muted-foreground">от 800 руб/м²</p></CardContent></Card>
              <Card className="border-0 shadow-xl ring-1 ring-slate-200/60 rounded-2xl"><CardContent className="p-6"><h3 className="font-semibold text-primary mb-2">3D‑визуализация</h3><p className="text-muted-foreground">от 15 000 руб за ракурс</p></CardContent></Card>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative py-14 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
          <div className="pointer-events-none absolute inset-0" style={{background: 'radial-gradient(ellipse at bottom right, rgba(59,130,246,0.10), transparent 60%)'}} />
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-2xl lg:text-3xl font-bold text-primary mb-3">Готовы создать проект вашего дома?</h3>
            <p className="text-muted-foreground mb-6">Закажите консультацию архитектора, и мы обсудим все детали вашего будущего дома.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="https://wa.me/79883464087" target="_blank" rel="noopener noreferrer">
                <Button className="fh-btn-primary"><MessageCircle className="w-4 h-4 mr-2" /> Написать в WhatsApp</Button>
              </a>
              <a href="tel:+79180400402">
                <Button variant="outline" className="fh-btn-secondary"><Phone className="w-4 h-4 mr-2" /> Позвонить</Button>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Design;


