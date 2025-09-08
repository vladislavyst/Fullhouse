import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useSEO } from '@/hooks/useSEO';
import { Building2, Calendar, CheckCircle, MapPin, Users, Award, HeartHandshake, Leaf, MessageCircle, Phone, Timer } from 'lucide-react';

const About = () => {
  useSEO({
    title: 'О компании Fullhouse | Строим дома с душой',
    description: 'Fullhouse — строительная компания в Новороссийске. 3 года, 50+ объектов, гарантия 3 года, честные сметы и контроль качества.',
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
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-700 mb-3">О компании Fullhouse</h1>
            <p className="text-lg sm:text-xl text-slate-700 max-w-3xl mx-auto">Строим дома с душой уже 3 года</p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <a href="https://wa.me/79883464087" target="_blank" rel="noopener noreferrer">
                <Button className="fh-btn-primary"><MessageCircle className="w-4 h-4 mr-2" /> Задать вопрос</Button>
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
              <p className="text-muted-foreground text-lg">Fullhouse — это молодая и динамично развивающаяся строительная компания, специализирующаяся на строительстве частных домов под ключ в Новороссийске и Краснодарском крае. За время нашей работы мы завоевали доверие клиентов благодаря честному подходу к делу, качественному выполнению работ и индивидуальному подходу к каждому проекту.</p>
            </div>
          </div>
        </section>

        {/* История компании (таймлайн) */}
        <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-6 text-center">История компании</h2>
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
              {[
                { year: '2021 — Основание', text: 'Основание компанией группы строителей, архитекторов и инженеров с идеей строить качественные дома по честным ценам.' },
                { year: '2022 — Развитие', text: 'Рост команды, партнёрства с надежными поставщиками, первые 10 сданных объектов.' },
                { year: '2023 — Признание', text: 'Лицензии и сертификаты качества, 15+ семей получили ключи от своих домов.' },
                { year: '2024 — Лидерство', text: 'Статус ведущей компании региона, 50+ реализованных проектов, расширение спектра услуг.' },
              ].map((i, idx) => (
                <Card key={idx} className="border-0 shadow-xl ring-1 ring-slate-200/60 rounded-2xl">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 text-primary mb-2"><Calendar className="w-5 h-5" /><h3 className="font-semibold">{i.year}</h3></div>
                    <p className="text-sm text-muted-foreground">{i.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Философия */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-6 text-center">Наша философия</h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {[
                { title: 'Честность и прозрачность', text: 'Детальные сметы, регулярная отчетность, никаких необоснованных наценок.' },
                { title: 'Качество превыше всего', text: 'Проверенные материалы и контроль качества на каждом этапе.' },
                { title: 'Индивидуальный подход', text: 'Каждый проект уникален. Воплощаем мечты клиентов в реальность.' },
                { title: 'Соблюдение сроков', text: 'Планируем с запасом и сдаем объекты вовремя.' },
              ].map((i, idx) => (
                <Card key={idx} className="border-0 shadow-xl ring-1 ring-slate-200/60 rounded-2xl">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 text-primary mb-2"><CheckCircle className="w-5 h-5 text-emerald-600" /><h3 className="font-semibold">{i.title}</h3></div>
                    <p className="text-sm text-muted-foreground">{i.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Команда */}
        <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-6 text-center">Команда профессионалов</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { role: 'Руководитель проектов — Владислав', pts: ['8 лет опыта в строительстве','Высшее техническое образование','Курирует проекты от начала до сдачи'] },
                { role: 'Главный архитектор', pts: ['Член Союза архитекторов России','50+ реализованных проектов','Специализация: загородные дома'] },
                { role: 'Инженер‑конструктор', pts: ['Кандидат технических наук','Эксперт по несущим конструкциям','Автор энергоэффективных решений'] },
                { role: 'Прораб', pts: ['15 лет опыта','Контроль качества работ','Координация бригад'] },
              ].map((m, idx) => (
                <Card key={idx} className="border-0 shadow-xl ring-1 ring-slate-200/60 rounded-2xl">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 text-primary mb-2"><Users className="w-5 h-5" /><h3 className="font-semibold">{m.role}</h3></div>
                    <ul className="space-y-1.5 text-sm text-muted-foreground">{m.pts.map((p, i) => (<li key={i}>{p}</li>))}</ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* География */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-6 text-center">География работы</h2>
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-xl ring-1 ring-slate-200/60 rounded-2xl"><CardContent className="p-6"><div className="flex items-center gap-2 text-primary mb-2"><MapPin className="w-5 h-5" /><h3 className="font-semibold">Основной регион</h3></div><p className="text-sm text-muted-foreground">Новороссийск и прилегающие районы</p></CardContent></Card>
              <Card className="border-0 shadow-xl ring-1 ring-slate-200/60 rounded-2xl"><CardContent className="p-6"><div className="flex items-center gap-2 text-primary mb-2"><Building2 className="w-5 h-5" /><h3 className="font-semibold">Также работаем</h3></div><ul className="text-sm text-muted-foreground space-y-1.5"><li>Анапа и Анапский район</li><li>Геленджик</li><li>Крымск</li><li>Абинск</li><li>Северская</li></ul></CardContent></Card>
            </div>
          </div>
        </section>

        {/* Принципы работы */}
        <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-6 text-center">Наши принципы работы</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: 'Договор', text: 'Фиксируем все условия письменно' },
                { title: 'Смета', text: 'Подробная с указанием всех материалов' },
                { title: 'Контроль', text: 'Поэтапная приемка работ' },
                { title: 'Отчетность', text: 'Фото- и видеоотчеты с объекта' },
                { title: 'Гарантия', text: '3 года на все виды работ' },
                { title: 'Поддержка', text: 'Помощь и после сдачи объекта' },
              ].map((i, idx) => (
                <Card key={idx} className="border-0 shadow-xl ring-1 ring-slate-200/60 rounded-2xl"><CardContent className="p-6"><h3 className="font-semibold text-primary mb-2">{i.title}</h3><p className="text-sm text-muted-foreground">{i.text}</p></CardContent></Card>
              ))}
            </div>
          </div>
        </section>

        {/* Достижения и цифры */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-6 text-center">Достижения и цифры</h2>
            <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[{icon:Users, val:'50+', label:'Довольных семей'}, {icon:Timer, val:'100%', label:'Сроки соблюдены'}, {icon:Award, val:'3 года', label:'Гарантия работ'}, {icon:HeartHandshake, val:'95%', label:'Рекомендации клиентов'}].map((m:any, i:number) => (
                <Card key={i} className="border-0 shadow-xl ring-1 ring-slate-200/60 rounded-2xl text-center"><CardContent className="p-6"><div className="mx-auto mb-2 w-10 h-10 rounded-full bg-white ring-1 ring-slate-200 flex items-center justify-center">{m.icon && <m.icon className="w-5 h-5 text-primary" />}</div><div className="text-2xl font-bold text-slate-800">{m.val}</div><div className="text-xs text-muted-foreground mt-1">{m.label}</div></CardContent></Card>
              ))}
            </div>
          </div>
        </section>

        {/* Социальная ответственность */}
        <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-6 text-center">Социальная ответственность</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-0 shadow-xl ring-1 ring-slate-200/60 rounded-2xl"><CardContent className="p-6"><div className="flex items-center gap-2 text-primary mb-2"><Leaf className="w-5 h-5" /><h3 className="font-semibold">Экологичность</h3></div><p className="text-sm text-muted-foreground">Используем экологичные материалы и энергосберегающие технологии.</p></CardContent></Card>
              <Card className="border-0 shadow-xl ring-1 ring-slate-200/60 rounded-2xl"><CardContent className="p-6"><div className="flex items-center gap-2 text-primary mb-2"><Building2 className="w-5 h-5" /><h3 className="font-semibold">Местное сообщество</h3></div><p className="text-sm text-muted-foreground">Поддерживаем местных производителей и создаем рабочие места.</p></CardContent></Card>
              <Card className="border-0 shadow-xl ring-1 ring-slate-200/60 rounded-2xl"><CardContent className="p-6"><div className="flex items-center gap-2 text-primary mb-2"><HeartHandshake className="w-5 h-5" /><h3 className="font-semibold">Благотворительность</h3></div><p className="text-sm text-muted-foreground">Участвуем в социальных проектах и помогаем нуждающимся семьям.</p></CardContent></Card>
            </div>
          </div>
        </section>

        {/* Партнеры */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-6 text-center">Партнёры и поставщики</h2>
            <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {['Материалы: сертифицированные поставщики региона','Банки: 10+ банков‑партнеров','Подрядчики: проверенные бригады','Оборудование: дилеры брендов'].map((t, i) => (
                <Card key={i} className="border-0 shadow-xl ring-1 ring-slate-200/60 rounded-2xl text-center"><CardContent className="p-6"><p className="text-sm text-muted-foreground">{t}</p></CardContent></Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative py-14 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
          <div className="pointer-events-none absolute inset-0" style={{background: 'radial-gradient(ellipse at bottom right, rgba(59,130,246,0.10), transparent 60%)'}} />
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-2xl lg:text-3xl font-bold text-primary mb-3">Хотите стать частью нашей истории?</h3>
            <p className="text-muted-foreground mb-6">Обратитесь к нам, и мы построим дом, в котором будут жить поколения вашей семьи.</p>
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

export default About;


