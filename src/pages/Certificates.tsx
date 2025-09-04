import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useSEO } from '@/hooks/useSEO';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Award, BadgeCheck, ClipboardCheck, Layers, Factory, Ruler, Wrench, Users, GraduationCap, BookOpen, ShieldCheck, Leaf, MessageCircle, Phone, Hammer, CheckCircle } from 'lucide-react';

const Certificates = () => {
  useSEO({
    title: 'Сертификаты качества и соответствия | Fullhouse',
    description: 'Подтверждаем высокое качество работ документально: ISO, сертификаты соответствия, квалификация персонала, награды и партнёрские подтверждения.',
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
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-700 mb-3">Сертификаты качества и соответствия</h1>
            <p className="text-lg sm:text-xl text-slate-700 max-w-3xl mx-auto">Подтверждаем высокое качество работ документально</p>
          </div>
        </section>

        {/* Intro */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-muted-foreground text-lg">Компания Fullhouse постоянно совершенствует свою деятельность и подтверждает соответствие высоким стандартам качества. Наши сертификаты — это гарантия того, что ваш дом будет построен по всем правилам и из качественных материалов.</p>
            </div>
          </div>
        </section>

        {/* ISO */}
        <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-6 text-center">Сертификаты системы менеджмента</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-0 shadow-xl ring-1 ring-slate-200/60 rounded-2xl">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-primary mb-2"><BadgeCheck className="w-5 h-5" /><h3 className="font-semibold">ISO 9001:2015 — СМК</h3></div>
                  <ul className="text-sm text-muted-foreground space-y-1.5">
                    <li><span className="text-slate-600">Сертификат №:</span> QMS‑9001‑23‑0742</li>
                    <li><span className="text-slate-600">Выдан:</span> Центром сертификации «Стандарт»</li>
                    <li><span className="text-slate-600">Дата выдачи:</span> 10.05.2023</li>
                    <li><span className="text-slate-600">Срок действия:</span> до 10.05.2026</li>
                    <li><span className="text-slate-600">Область:</span> строительство жилых домов, проектирование</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-xl ring-1 ring-slate-200/60 rounded-2xl">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-primary mb-2"><ShieldCheck className="w-5 h-5" /><h3 className="font-semibold">ISO 14001:2015 — Экология</h3></div>
                  <ul className="text-sm text-muted-foreground space-y-1.5">
                    <li>Подтверждение экологической ответственности</li>
                    <li>Минимизация воздействия на окружающую среду</li>
                    <li>Использование экологичных материалов</li>
                    <li>Правильная утилизация строительных отходов</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-xl ring-1 ring-slate-200/60 rounded-2xl">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-primary mb-2"><ClipboardCheck className="w-5 h-5" /><h3 className="font-semibold">ISO 45001:2018 — Охрана труда</h3></div>
                  <ul className="text-sm text-muted-foreground space-y-1.5">
                    <li>Безопасность работников и снижение рисков</li>
                    <li>Предотвращение несчастных случаев</li>
                    <li>СИЗ и обучение персонала</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Сертификаты соответствия работ */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-6 text-center">Сертификаты соответствия работ</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-0 shadow-xl ring-1 ring-slate-200/60 rounded-2xl"><CardContent className="p-6"><div className="flex items-center gap-2 text-primary mb-2"><Hammer className="w-5 h-5" /><h3 className="font-semibold">Строительные работы</h3></div><ul className="text-sm text-muted-foreground space-y-1.5"><li><span className="text-slate-600">Сертификат №:</span> РОСС RU.СТ.0423</li><li>Возведение несущих конструкций</li><li>Кровельные и фасадные работы</li><li>Внутренняя отделка</li></ul></CardContent></Card>
              <Card className="border-0 shadow-xl ring-1 ring-slate-200/60 rounded-2xl"><CardContent className="p-6"><div className="flex items-center gap-2 text-primary mb-2"><Factory className="w-5 h-5" /><h3 className="font-semibold">Инженерные системы</h3></div><ul className="text-sm text-muted-foreground space-y-1.5"><li>Электромонтажные работы</li><li>Сантехнические работы</li><li>Отопление и вентиляция</li><li>Слаботочные системы</li></ul></CardContent></Card>
              <Card className="border-0 shadow-xl ring-1 ring-slate-200/60 rounded-2xl"><CardContent className="p-6"><div className="flex items-center gap-2 text-primary mb-2"><Layers className="w-5 h-5" /><h3 className="font-semibold">Проектирование</h3></div><ul className="text-sm text-muted-foreground space-y-1.5"><li>Архитектурно‑строительное проектирование</li><li>Конструктивные решения</li><li>Инженерные системы</li><li>Соответствие СНиП и ГОСТ</li></ul></CardContent></Card>
            </div>
          </div>
        </section>

        {/* Сертификаты на материалы */}
        <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-6 text-center">Сертификаты на материалы</h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              <Card className="border-0 shadow-xl ring-1 ring-slate-200/60 rounded-2xl"><CardContent className="p-6"><h3 className="font-semibold text-primary mb-2">Строительные материалы</h3><ul className="text-sm text-muted-foreground space-y-1.5"><li>Газобетон — сертификат соответствия ГОСТ</li><li>Кирпич — паспорт качества завода</li><li>Утеплители — сертификаты пожарной безопасности</li><li>Кровельные материалы — гарантия производителя</li></ul></CardContent></Card>
              <Card className="border-0 shadow-xl ring-1 ring-slate-200/60 rounded-2xl"><CardContent className="p-6"><h3 className="font-semibold text-primary mb-2">Отделочные материалы</h3><ul className="text-sm text-muted-foreground space-y-1.5"><li>Напольные покрытия — эко‑сертификаты</li><li>Краски и лаки — соответствие санитарным нормам</li><li>Сантехника — сертификаты качества</li><li>Электрооборудование — сертификаты безопасности</li></ul></CardContent></Card>
            </div>
          </div>
        </section>

        {/* Профессиональные квалификации */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-6 text-center">Профессиональные квалификации</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-0 shadow-xl ring-1 ring-slate-200/60 rounded-2xl"><CardContent className="p-6"><div className="flex items-center gap-2 text-primary mb-2"><Users className="w-5 h-5" /><h3 className="font-semibold">Главный инженер</h3></div><ul className="text-sm text-muted-foreground space-y-1.5"><li>Удостоверение о повышении квалификации (2024)</li><li>Сертификат «Энергоэффективное строительство»</li><li>Аттестация по промышленной безопасности</li></ul></CardContent></Card>
              <Card className="border-0 shadow-xl ring-1 ring-slate-200/60 rounded-2xl"><CardContent className="p-6"><div className="flex items-center gap-2 text-primary mb-2"><GraduationCap className="w-5 h-5" /><h3 className="font-semibold">Архитектор</h3></div><ul className="text-sm text-muted-foreground space-y-1.5"><li>Квалификационный аттестат архитектора</li><li>Сертификат «Проектирование в BIM»</li><li>Повышение квалификации «Современные материалы»</li></ul></CardContent></Card>
              <Card className="border-0 shadow-xl ring-1 ring-slate-200/60 rounded-2xl"><CardContent className="p-6"><div className="flex items-center gap-2 text-primary mb-2"><BookOpen className="w-5 h-5" /><h3 className="font-semibold">Прораб</h3></div><ul className="text-sm text-muted-foreground space-y-1.5"><li>Удостоверение производителя работ</li><li>Сертификат по охране труда</li><li>Аттестация по строительному контролю</li></ul></CardContent></Card>
              <Card className="border-0 shadow-xl ring-1 ring-slate-200/60 rounded-2xl"><CardContent className="p-6"><div className="flex items-center gap-2 text-primary mb-2"><BadgeCheck className="w-5 h-5" /><h3 className="font-semibold">Мастера участков</h3></div><ul className="text-sm text-muted-foreground space-y-1.5"><li>Свидетельства проф. подготовки</li><li>Удостоверения рабочих специальностей</li><li>Медицинские книжки</li></ul></CardContent></Card>
            </div>
          </div>
        </section>

        {/* Награды и дипломы */}
        <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-6 text-center">Награды и дипломы</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: 'Лучшая строительная компания 2023', text: 'Диплом выставки «Строительство и ЖКХ», номинация «Качество строительства»' },
                { title: 'Надежный партнёр', text: 'Диплом ТПП за добросовестную работу и высокий сервис' },
                { title: 'Экологически чистое строительство', text: 'Награда эко‑фонда за экоматериалы и энергоэффективность' },
              ].map((a, i) => (
                <Card key={i} className="border-0 shadow-xl ring-1 ring-slate-200/60 rounded-2xl"><CardContent className="p-6"><div className="flex items-center gap-2 text-primary mb-2"><Award className="w-5 h-5" /><h3 className="font-semibold">{a.title}</h3></div><p className="text-sm text-muted-foreground">{a.text}</p></CardContent></Card>
              ))}
            </div>
          </div>
        </section>

        {/* Международные стандарты */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-6 text-center">Международные стандарты</h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              <Card className="border-0 shadow-xl ring-1 ring-slate-200/60 rounded-2xl"><CardContent className="p-6"><h3 className="font-semibold text-primary mb-2">Сертификат BREEAM</h3><ul className="text-sm text-muted-foreground space-y-1.5"><li>Международная система экологической сертификации</li><li>Оценка экологической эффективности зданий</li><li>Соответствие европейским стандартам</li></ul></CardContent></Card>
              <Card className="border-0 shadow-xl ring-1 ring-slate-200/60 rounded-2xl"><CardContent className="p-6"><h3 className="font-semibold text-primary mb-2">Энергоэффективность</h3><ul className="text-sm text-muted-foreground space-y-1.5"><li>Сертификат «Пассивный дом», класс А++</li><li>Использование возобновляемых источников энергии</li></ul></CardContent></Card>
            </div>
          </div>
        </section>

        {/* Контроль качества и развитие */}
        <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-6 text-center">Контроль качества и развитие</h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              <Card className="border-0 shadow-xl ring-1 ring-slate-200/60 rounded-2xl"><CardContent className="p-6"><h3 className="font-semibold text-primary mb-2">Внутренний и внешний аудит</h3><ul className="text-sm text-muted-foreground space-y-1.5"><li>Регулярные проверки качества и технологий</li><li>Независимые инспекции сертификационных органов</li><li>Анализ удовлетворенности клиентов</li></ul></CardContent></Card>
              <Card className="border-0 shadow-xl ring-1 ring-slate-200/60 rounded-2xl"><CardContent className="p-6"><h3 className="font-semibold text-primary mb-2">Постоянное развитие</h3><ul className="text-sm text-muted-foreground space-y-1.5"><li>Курсы повышения квалификации и семинары</li><li>Новые материалы и технологии</li><li>Цифровые инструменты и автоматизация проектирования</li></ul></CardContent></Card>
            </div>
          </div>
        </section>

        {/* Гарантии */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-6 text-center">Гарантии качества</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                'Сертифицированные материалы — только проверенные поставщики',
                'Квалифицированный персонал — регулярное обучение',
                'Контроль качества — на каждом этапе работ',
                'Международные стандарты — соответствие мировым требованиям',
                'Документальное подтверждение — все сертификаты в наличии',
              ].map((t, i) => (
                <Card key={i} className="border-0 shadow-xl ring-1 ring-slate-200/60 rounded-2xl"><CardContent className="p-6"><div className="flex items-center gap-2 text-primary mb-2"><CheckCircle className="w-5 h-5 text-emerald-600" /><h3 className="font-semibold">Гарантия</h3></div><p className="text-sm text-muted-foreground">{t}</p></CardContent></Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative py-14 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-2xl lg:text-3xl font-bold text-primary mb-3">Нужны подтверждающие документы?</h3>
            <p className="text-muted-foreground mb-6">Предоставим копии сертификатов по запросу в офисе или в электронном виде.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="https://wa.me/79883464087" target="_blank" rel="noopener noreferrer">
                <Button className="fh-btn-primary"><MessageCircle className="w-4 h-4 mr-2" /> Запросить копии</Button>
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

export default Certificates;


