import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useSEO } from '@/hooks/useSEO';
import { Wrench, Building2, Home, Landmark, Layers, Ruler, Hammer, CheckCircle, MessageCircle, Phone } from 'lucide-react';

const Reconstruction = () => {
  useSEO({
    title: 'Реконструкция и капитальный ремонт домов | Fullhouse',
    description: 'Дарим вторую жизнь вашему дому: частичная и капитальная реконструкция, реставрация исторических зданий, обновление инженерии.',
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
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-700 mb-4">Реконструкция и капитальный ремонт домов</h1>
            <p className="text-lg sm:text-xl text-slate-700 max-w-3xl mx-auto">Дарим вторую жизнь вашему дому с сохранением его истории</p>
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
                Реконструкция дома — это комплексный процесс обновления и модернизации существующего здания с улучшением его функциональных и эстетических характеристик. Компания Fullhouse выполняет все виды реконструкции: от частичного обновления до полной перестройки.
              </p>
            </div>
          </div>
        </section>

        {/* Виды реконструкции */}
        <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-6 text-center">Виды реконструкции</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-0 shadow-xl ring-1 ring-slate-200/60 rounded-2xl hover:shadow-2xl transition-all">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-primary mb-3"><Wrench className="w-5 h-5" /><h3 className="font-semibold">Частичная реконструкция</h3></div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>Замена кровли и фасада</li>
                    <li>Перепланировка внутренних помещений</li>
                    <li>Модернизация инженерных систем</li>
                    <li>Утепление и энергосбережение</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-xl ring-1 ring-slate-200/60 rounded-2xl hover:shadow-2xl transition-all">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-primary mb-3"><Building2 className="w-5 h-5" /><h3 className="font-semibold">Капитальная реконструкция</h3></div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>Усиление фундамента и несущих конструкций</li>
                    <li>Надстройка дополнительных этажей</li>
                    <li>Пристройка новых помещений</li>
                    <li>Полная замена коммуникаций</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-xl ring-1 ring-slate-200/60 rounded-2xl hover:shadow-2xl transition-all">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-primary mb-3"><Landmark className="w-5 h-5" /><h3 className="font-semibold">Реставрация исторических зданий</h3></div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>Сохранение архитектурного стиля</li>
                    <li>Использование традиционных материалов</li>
                    <li>Восстановление декоративных элементов</li>
                    <li>Соблюдение требований культурного наследия</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Популярные решения */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-6 text-center">Популярные решения для реконструкции</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-xl ring-1 ring-slate-200/60 rounded-2xl">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-primary mb-3"><Layers className="w-5 h-5" /><h3 className="font-semibold">Увеличение жилой площади</h3></div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>Мансардные этажи и чердачные помещения</li>
                    <li>Пристройки и веранды</li>
                    <li>Подвальные и цокольные этажи</li>
                    <li>Объединение смежных помещений</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-xl ring-1 ring-slate-200/60 rounded-2xl">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-primary mb-3"><Home className="w-5 h-5" /><h3 className="font-semibold">Повышение комфорта</h3></div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>Современная планировка</li>
                    <li>Панорамные окна</li>
                    <li>Системы "умный дом"</li>
                    <li>Энергоэффективные решения</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-xl ring-1 ring-slate-200/60 rounded-2xl md:col-span-2">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-primary mb-3"><Wrench className="w-5 h-5" /><h3 className="font-semibold">Обновление коммуникаций</h3></div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>Электроснабжение по современным стандартам</li>
                    <li>Водоснабжение и канализация</li>
                    <li>Отопление и кондиционирование</li>
                    <li>Интернет и ТВ-кабели</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Процесс реконструкции */}
        <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-6 text-center">Процесс реконструкции</h2>
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
              {[
                'Обследование: конструкций, фундамента, инженерных систем, дефектная ведомость',
                'Проектирование: архитектура, конструктив, инженерия, разрешения',
                'Демонтаж: снос устаревших конструкций и коммуникаций, подготовка площадки',
                'Строительно-монтажные работы: усиление, возведение, инженерия, отделка',
              ].map((t, i) => (
                <div key={i} className="flex gap-2 text-sm text-muted-foreground"><CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5" /> {t}</div>
              ))}
            </div>
          </div>
        </section>

        {/* Особенности работы */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-6 text-center">Особенности работы с реконструкцией</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-0 shadow-xl ring-1 ring-slate-200/60 rounded-2xl">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-primary mb-3"><Ruler className="w-5 h-5" /><h3 className="font-semibold">Диагностика и планирование</h3></div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>Детальное обследование состояния дома</li>
                    <li>3D-моделирование будущего результата</li>
                    <li>Поэтапное планирование работ</li>
                    <li>Минимизация неожиданных расходов</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-xl ring-1 ring-slate-200/60 rounded-2xl">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-primary mb-3"><Landmark className="w-5 h-5" /><h3 className="font-semibold">Сохранение ценного</h3></div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>Реставрация исторических элементов</li>
                    <li>Сохранение архитектурного стиля</li>
                    <li>Восстановление антикварных деталей</li>
                    <li>Интеграция старого и нового</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-xl ring-1 ring-slate-200/60 rounded-2xl">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-primary mb-3"><Hammer className="w-5 h-5" /><h3 className="font-semibold">Стоимость работ</h3></div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>Частичная реконструкция: от 15 000 руб/м²</li>
                    <li>Капитальная реконструкция: от 25 000 руб/м²</li>
                    <li>Реставрация: от 35 000 руб/м²</li>
                    <li>Точная стоимость — после обследования объекта</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-2xl lg:text-3xl font-bold text-primary mb-3">Нужна оценка вашего дома?</h3>
            <p className="text-muted-foreground mb-6">Наш специалист бесплатно приедет на объект и составит подробный план реконструкции.</p>
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

export default Reconstruction;


