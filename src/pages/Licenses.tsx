import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useSEO } from '@/hooks/useSEO';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, FileCheck, Building2, Hammer, Ruler, Factory, Leaf, ClipboardCheck, MessageCircle, Phone } from 'lucide-react';

const Licenses = () => {
  useSEO({
    title: 'Лицензии и разрешительные документы | Fullhouse',
    description: 'Вся деятельность Fullhouse ведется в соответствии с законодательством РФ: лицензии на строительство и проектирование, СРО, страхование, экологические разрешения.',
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
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-700 mb-3">Лицензии и разрешительные документы</h1>
            <p className="text-lg sm:text-xl text-slate-700 max-w-3xl mx-auto">Вся деятельность компании Fullhouse ведется в строгом соответствии с российским законодательством</p>
          </div>
        </section>

        {/* Intro */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-muted-foreground text-lg">Компания Fullhouse имеет все необходимые лицензии и разрешения для осуществления строительной деятельности на территории Краснодарского края. Наличие официальных документов гарантирует законность наших работ и защищает интересы клиентов.</p>
            </div>
          </div>
        </section>

        {/* Основные лицензии */}
        <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-6 text-center">Основные лицензии</h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              <Card className="border-0 shadow-xl ring-1 ring-slate-200/60 rounded-2xl">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-primary mb-2"><FileCheck className="w-5 h-5" /><h3 className="font-semibold">Лицензия на строительную деятельность</h3></div>
                  <ul className="text-sm text-muted-foreground space-y-1.5">
                    <li><span className="text-slate-600">Номер лицензии:</span> СТР-012-34567</li>
                    <li><span className="text-slate-600">Выдана:</span> Министерством строительства РФ</li>
                    <li><span className="text-slate-600">Дата выдачи:</span> 15.04.2022</li>
                    <li><span className="text-slate-600">Срок действия:</span> бессрочно</li>
                    <li><span className="text-slate-600">Виды работ:</span> строительство зданий и сооружений I–III уровней ответственности</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-xl ring-1 ring-slate-200/60 rounded-2xl">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-primary mb-2"><FileCheck className="w-5 h-5" /><h3 className="font-semibold">Лицензия на проектную деятельность</h3></div>
                  <ul className="text-sm text-muted-foreground space-y-1.5">
                    <li><span className="text-slate-600">Номер лицензии:</span> ПРО-045-67890</li>
                    <li><span className="text-slate-600">Выдана:</span> Министерством строительства РФ</li>
                    <li><span className="text-slate-600">Дата выдачи:</span> 15.04.2022</li>
                    <li><span className="text-slate-600">Срок действия:</span> бессрочно</li>
                    <li><span className="text-slate-600">Виды работ:</span> архитектурно‑строительное проектирование</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Виды работ по лицензии */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-6 text-center">Виды работ по лицензии</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-0 shadow-xl ring-1 ring-slate-200/60 rounded-2xl"><CardContent className="p-6"><div className="flex items-center gap-2 text-primary mb-2"><Building2 className="w-5 h-5" /><h3 className="font-semibold">Строительные работы</h3></div><ul className="text-sm text-muted-foreground space-y-1.5"><li>Возведение жилых зданий до 3 этажей</li><li>Строительство производственных помещений</li><li>Реконструкция и капитальный ремонт</li><li>Благоустройство территорий</li></ul></CardContent></Card>
              <Card className="border-0 shadow-xl ring-1 ring-slate-200/60 rounded-2xl"><CardContent className="p-6"><div className="flex items-center gap-2 text-primary mb-2"><Ruler className="w-5 h-5" /><h3 className="font-semibold">Проектные работы</h3></div><ul className="text-sm text-muted-foreground space-y-1.5"><li>Архитектурные решения (АР)</li><li>Конструктивные решения (КР)</li><li>Инженерные системы (ИОС)</li><li>Проекты организации строительства (ПОС)</li></ul></CardContent></Card>
              <Card className="border-0 shadow-xl ring-1 ring-slate-200/60 rounded-2xl"><CardContent className="p-6"><div className="flex items-center gap-2 text-primary mb-2"><Factory className="w-5 h-5" /><h3 className="font-semibold">Инженерные системы</h3></div><ul className="text-sm text-muted-foreground space-y-1.5"><li>Электроснабжение и электрооборудование</li><li>Водоснабжение и канализация</li><li>Отопление, вентиляция и кондиционирование</li><li>Слаботочные системы</li></ul></CardContent></Card>
            </div>
          </div>
        </section>

        {/* Допуски и разрешения */}
        <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-6 text-center">Допуски и разрешения</h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              <Card className="border-0 shadow-xl ring-1 ring-slate-200/60 rounded-2xl">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-primary mb-2"><Shield className="w-5 h-5" /><h3 className="font-semibold">Допуск СРО</h3></div>
                  <ul className="text-sm text-muted-foreground space-y-1.5">
                    <li><span className="text-slate-600">СРО:</span> «Союз строителей Кубани»</li>
                    <li><span className="text-slate-600">Регистрационный номер:</span> СРО‑ССК‑2045</li>
                    <li><span className="text-slate-600">Дата вступления:</span> 20.06.2022</li>
                    <li><span className="text-slate-600">Компенсационный фонд:</span> 500 000 ₽</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-xl ring-1 ring-slate-200/60 rounded-2xl">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-primary mb-2"><Hammer className="w-5 h-5" /><h3 className="font-semibold">Разрешения на спецработы</h3></div>
                  <ul className="text-sm text-muted-foreground space-y-1.5">
                    <li>Земляные работы</li>
                    <li>Работы с опасными веществами</li>
                    <li>Высотные работы</li>
                    <li>Работы повышенной опасности</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Страхование */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-6 text-center">Страхование ответственности</h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              <Card className="border-0 shadow-xl ring-1 ring-slate-200/60 rounded-2xl"><CardContent className="p-6"><div className="flex items-center gap-2 text-primary mb-2"><ClipboardCheck className="w-5 h-5" /><h3 className="font-semibold">Страхование проф. ответственности</h3></div><ul className="text-sm text-muted-foreground space-y-1.5"><li><span className="text-slate-600">Страховая компания:</span> «РЕСО‑Гарантия»</li><li><span className="text-slate-600">Полис №:</span> PR‑6842‑126731</li><li><span className="text-slate-600">Сумма покрытия:</span> 10 000 000 ₽</li><li><span className="text-slate-600">Срок действия:</span> до 30.06.2025</li></ul></CardContent></Card>
              <Card className="border-0 shadow-xl ring-1 ring-slate-200/60 rounded-2xl"><CardContent className="p-6"><div className="flex items-center gap-2 text-primary mb-2"><ClipboardCheck className="w-5 h-5" /><h3 className="font-semibold">Страхование строительных рисков</h3></div><ul className="text-sm text-muted-foreground space-y-1.5"><li>Покрытие рисков при строительстве</li><li>Страхование строительной техники</li><li>Страхование материалов на объекте</li></ul></CardContent></Card>
            </div>
          </div>
        </section>

        {/* Госрегистрация */}
        <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-6 text-center">Государственная регистрация</h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              <Card className="border-0 shadow-xl ring-1 ring-slate-200/60 rounded-2xl"><CardContent className="p-6"><h3 className="font-semibold text-primary mb-2">Свидетельство о гос. регистрации</h3><ul className="text-sm text-muted-foreground space-y-1.5"><li><span className="text-slate-600">ОГРН:</span> 1222300007345</li><li><span className="text-slate-600">Дата регистрации:</span> 12.11.2021</li><li><span className="text-slate-600">Регистрирующий орган:</span> ИФНС по г. Новороссийску</li></ul></CardContent></Card>
              <Card className="border-0 shadow-xl ring-1 ring-slate-200/60 rounded-2xl"><CardContent className="p-6"><h3 className="font-semibold text-primary mb-2">Постановка на налоговый учет</h3><ul className="text-sm text-muted-foreground space-y-1.5"><li><span className="text-slate-600">ИНН:</span> 2315178940</li><li><span className="text-slate-600">КПП:</span> 231501001</li><li><span className="text-slate-600">Налоговая инспекция:</span> ИФНС №1 по г. Новороссийску</li></ul></CardContent></Card>
            </div>
          </div>
        </section>

        {/* Контроль и надзор */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-6 text-center">Контроль и надзор</h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              <Card className="border-0 shadow-xl ring-1 ring-slate-200/60 rounded-2xl"><CardContent className="p-6"><h3 className="font-semibold text-primary mb-2">Плановые проверки</h3><ul className="text-sm text-muted-foreground space-y-1.5"><li>Госстройнадзор — без нарушений</li><li>Роспотребнадзор — соответствие санитарным нормам</li><li>Пожарный надзор — соблюдение требований</li><li>Трудовая инспекция — соблюдение ТК РФ</li></ul></CardContent></Card>
              <Card className="border-0 shadow-xl ring-1 ring-slate-200/60 rounded-2xl"><CardContent className="p-6"><h3 className="font-semibold text-primary mb-2">Результаты проверок</h3><ul className="text-sm text-muted-foreground space-y-1.5"><li>2022: нарушений не выявлено</li><li>2023: нарушений не выявлено</li><li>2024: нарушений не выявлено</li></ul></CardContent></Card>
            </div>
          </div>
        </section>

        {/* Экологические разрешения */}
        <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-6 text-center">Экологические разрешения</h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              <Card className="border-0 shadow-xl ring-1 ring-slate-200/60 rounded-2xl"><CardContent className="p-6"><div className="flex items-center gap-2 text-primary mb-2"><Leaf className="w-5 h-5" /><h3 className="font-semibold">НВОС</h3></div><ul className="text-sm text-muted-foreground space-y-1.5"><li><span className="text-slate-600">Номер разрешения:</span> ECO‑24‑0721</li><li><span className="text-slate-600">Выдано:</span> Минприроды РФ</li><li><span className="text-slate-600">Виды воздействия:</span> образование строительных отходов</li></ul></CardContent></Card>
              <Card className="border-0 shadow-xl ring-1 ring-slate-200/60 rounded-2xl"><CardContent className="p-6"><div className="flex items-center gap-2 text-primary mb-2"><Leaf className="w-5 h-5" /><h3 className="font-semibold">Обращение с отходами</h3></div><ul className="text-sm text-muted-foreground space-y-1.5"><li>Сбор и транспортирование строительных отходов</li><li>Соблюдение экологических требований</li><li>Утилизация на лицензированных полигонах</li></ul></CardContent></Card>
            </div>
          </div>
        </section>

        {/* Аккредитации */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-6 text-center">Аккредитации и членства</h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              <Card className="border-0 shadow-xl ring-1 ring-slate-200/60 rounded-2xl"><CardContent className="p-6"><h3 className="font-semibold text-primary mb-2">Торгово‑промышленная палата</h3><ul className="text-sm text-muted-foreground space-y-1.5"><li>Член ТПП Краснодарского края</li><li>Участие в выставках и форумах</li><li>Сертификат надежного партнера</li></ul></CardContent></Card>
              <Card className="border-0 shadow-xl ring-1 ring-slate-200/60 rounded-2xl"><CardContent className="p-6"><h3 className="font-semibold text-primary mb-2">Ассоциация строителей</h3><ul className="text-sm text-muted-foreground space-y-1.5"><li>Ассоциация «Строители Кубани»</li><li>Обмен опытом и повышение квалификации</li><li>Участие в разработке отраслевых стандартов</li></ul></CardContent></Card>
            </div>
          </div>
        </section>

        {/* Гарантии */}
        <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-6 text-center">Гарантии для клиентов</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                { title: 'Законность', text: 'Все работы выполняются в рамках действующих лицензий' },
                { title: 'Безопасность', text: 'Соблюдение всех норм и требований' },
                { title: 'Качество', text: 'Работы выполняют сертифицированные специалисты' },
                { title: 'Ответственность', text: 'Страховая защита интересов клиентов' },
                { title: 'Прозрачность', text: 'Все документы открыты для ознакомления' },
              ].map((g, i) => (
                <Card key={i} className="border-0 shadow-xl ring-1 ring-slate-200/60 rounded-2xl"><CardContent className="p-6"><h3 className="font-semibold text-primary mb-2">{g.title}</h3><p className="text-sm text-muted-foreground">{g.text}</p></CardContent></Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative py-14 bg-white overflow-hidden">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-2xl lg:text-3xl font-bold text-primary mb-3">Документы для ознакомления</h3>
            <p className="text-muted-foreground mb-6">Все лицензии и разрешения доступны в офисе компании или по запросу в электронном виде.</p>
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

export default Licenses;


