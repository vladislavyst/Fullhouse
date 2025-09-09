import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Hammer, Ruler, Building2, Wrench, PaintBucket, Phone, MessageCircle } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';

const Construction = () => {
  useSEO({
    title: 'Строительство домов под ключ в Новороссийске | Fullhouse',
    description: 'Построим дом вашей мечты с гарантией 3 года. Подготовка участка, фундамент, стены, инженерия и отделка — под ключ.',
    url: typeof window !== 'undefined' ? window.location.href : undefined,
    type: 'website',
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24">
        {/* Hero */}
        <section className="relative py-14 sm:py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 overflow-hidden">
          <div className="pointer-events-none absolute inset-0" style={{background: 'radial-gradient(ellipse at top left, rgba(59,130,246,0.12), transparent 60%)'}} />
          <div className="container mx-auto px-4 text-center relative">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-700 mb-4">Строительство домов под ключ в Новороссийске</h1>
            <p className="text-lg sm:text-xl text-slate-700 max-w-3xl mx-auto">Построим дом вашей мечты с гарантией качества на 3 года</p>
            <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
              <a href="https://wa.me/79883464087" target="_blank" rel="noopener noreferrer">
                <Button className="fh-btn-primary"><MessageCircle className="w-4 h-4 mr-2" /> Рассчитать смету</Button>
              </a>
              <a href="tel:+79180400402">
                <Button className="fh-btn-secondary"><Phone className="w-4 h-4 mr-2" /> Получить консультацию</Button>
              </a>
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-muted-foreground text-lg">
                Компания Fullhouse специализируется на строительстве частных домов под ключ в Новороссийске и прилегающих районах. За 3 года работы мы помогли более 50 семьям обрести собственное жилье, сочетая современные технологии с проверенными материалами.
              </p>
            </div>
          </div>
        </section>

        {/* Что включает строительство под ключ */}
        <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-6 text-center">Что включает строительство под ключ</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-0 shadow-xl ring-1 ring-slate-200/60 rounded-2xl hover:shadow-2xl transition-all">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-primary mb-3"><Ruler className="w-5 h-5" /><h3 className="font-semibold">Подготовительные работы</h3></div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5" /> Геодезическая разметка участка</li>
                    <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5" /> Подготовка территории к строительству</li>
                    <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5" /> Подключение временных коммуникаций</li>
                    <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5" /> Организация строительной площадки</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-xl ring-1 ring-slate-200/60 rounded-2xl hover:shadow-2xl transition-all">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-primary mb-3"><Building2 className="w-5 h-5" /><h3 className="font-semibold">Фундаментные работы</h3></div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5" /> Земляные работы и планировка</li>
                    <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5" /> Устройство фундамента (ленточный, плитный, свайный)</li>
                    <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5" /> Гидроизоляция и утепление</li>
                    <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5" /> Обратная засыпка</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-xl ring-1 ring-slate-200/60 rounded-2xl hover:shadow-2xl transition-all">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-primary mb-3"><Hammer className="w-5 h-5" /><h3 className="font-semibold">Стены и перекрытия</h3></div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5" /> Кладка стен из выбранного материала</li>
                    <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5" /> Устройство межэтажных перекрытий</li>
                    <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5" /> Монтаж стропильной системы</li>
                    <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5" /> Кровельные работы</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-xl ring-1 ring-slate-200/60 rounded-2xl hover:shadow-2xl transition-all">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-primary mb-3"><Wrench className="w-5 h-5" /><h3 className="font-semibold">Инженерные системы</h3></div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5" /> Электромонтажные работы</li>
                    <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5" /> Сантехнические работы</li>
                    <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5" /> Отопление и вентиляция</li>
                    <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5" /> Подключение к внешним коммуникациям</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Отделочные работы */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-xl ring-1 ring-slate-200/60 rounded-2xl">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-primary mb-3"><PaintBucket className="w-5 h-5" /><h3 className="font-semibold">Отделочные работы</h3></div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5" /> Внутренняя отделка помещений</li>
                    <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5" /> Наружная отделка фасада</li>
                    <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5" /> Установка окон и дверей</li>
                    <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5" /> Напольные покрытия</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-xl ring-1 ring-slate-200/60 rounded-2xl">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-primary mb-3"><CheckCircle className="w-5 h-5" /><h3 className="font-semibold">Гарантии и преимущества</h3></div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5" /> 3 года гарантии на все виды работ</li>
                    <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5" /> Фиксированная стоимость в договоре</li>
                    <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5" /> Соблюдение сроков строительства</li>
                    <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5" /> Качественные материалы от проверенных поставщиков</li>
                    <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5" /> Прозрачная отчетность на каждом этапе</li>
                    <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5" /> Помощь в оформлении документов</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Материалы */}
        <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-6 text-center">Материалы для строительства</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-0 shadow-xl ring-1 ring-slate-200/60 rounded-2xl">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-primary mb-2">Керамзитобетонный блок</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>Срок строительства: 3–5 месяцев</li>
                    <li>Энергоэффективность: высокая</li>
                    <li>Стоимость: от 35 000 руб/м²</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-xl ring-1 ring-slate-200/60 rounded-2xl">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-primary mb-2">Дома из газобетона</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>Срок строительства: 3–6 месяцев</li>
                    <li>Теплоизоляция: отличная</li>
                    <li>Стоимость: от 35 000 руб/м²</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-xl ring-1 ring-slate-200/60 rounded-2xl">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-primary mb-2">Кирпичные дома</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>Срок строительства: 4–8 месяцев</li>
                    <li>Долговечность: 100+ лет</li>
                    <li>Стоимость: от 42 000 руб/м²</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Этапы работы */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-6 text-center">Этапы работы</h2>
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
              {[
                'Консультация и выезд на участок (бесплатно)',
                'Разработка проекта и сметы (7–14 дней)',
                'Заключение договора и получение разрешений',
                'Начало строительных работ',
                'Поэтапная сдача объекта',
                'Финальная приемка и передача ключей',
              ].map((t, i) => (
                <div key={i} className="flex gap-2 text-sm text-muted-foreground"><CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5" /> {t}</div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-2xl lg:text-3xl font-bold text-primary mb-3">Готовы построить ваш дом?</h3>
            <p className="text-muted-foreground mb-6">Оставьте заявку на бесплатную консультацию и выезд специалиста на участок.</p>
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

export default Construction;


