import { useEffect, useMemo, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Maximize, Ruler, Timer, ArrowLeft, Bath, BedDouble, Sofa, Shirt } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import { useSEO } from '@/hooks/useSEO';

type Project = {
  title: string;
  slug?: string;
  price?: string;
  area?: string;
  buildingArea?: string;
  terracesArea?: string;
  size?: string;
  buildTime?: string;
  imageUrl?: string;
  gallery?: string[];
  plans?: string[];
  planVariants?: string[];
  about?: string;
  floors?: number;
  width?: string;
  length?: string;
  stats?: { bathrooms?: number; garage?: number; bedrooms?: number; wardrobes?: number; livingRooms?: number };
};

const ProjectDetail = () => {
  const { slug } = useParams();
  const location = useLocation();
  const backTo = (location.state as any)?.from || '/projects';
  const [items, setItems] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/projects.json?t=${Date.now()}`, { cache: 'no-store' });
        const data = await res.json();
        if (active && Array.isArray(data)) setItems(data);
      } finally {
        if (active) setLoading(false);
      }
    };
    load();
    return () => { active = false; };
  }, []);

  const project = useMemo(() => {
    if (!slug) return undefined;
    return items.find(p => (p.slug || p.title?.toLowerCase()) === slug);
  }, [items, slug]);

  const handleDownloadCatalog = () => {
    const link = document.createElement('a');
    link.href = '/fullhouse-catalog.pdf';
    link.download = 'Фулхаус каталог оригинал.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const [activePlanIdx, setActivePlanIdx] = useState(0);
  useEffect(() => {
    setActivePlanIdx(0);
  }, [project?.slug]);

  // SEO
  useSEO({
    title: project ? `${project.title} | Проекты домов Fullhouse` : 'Проект | Fullhouse',
    description: project?.about || 'Детальная страница проекта дома с фото и планировками от Fullhouse.',
    image: project?.gallery && project.gallery.length > 0 ? project.gallery[0] : project?.imageUrl,
    url: typeof window !== 'undefined' ? window.location.href : undefined,
    type: 'product',
    structuredData: project ? [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {"@type": "ListItem", "position": 1, "name": "Главная", "item": "https://sk-fullhouse.com/"},
          {"@type": "ListItem", "position": 2, "name": "Проекты", "item": "https://sk-fullhouse.com/projects"},
          {"@type": "ListItem", "position": 3, "name": project.title, "item": typeof window !== 'undefined' ? window.location.href : ''}
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": project.title,
        "image": project.gallery && project.gallery.length > 0 ? project.gallery : (project.imageUrl ? [project.imageUrl] : []),
        "description": project.about || '',
        "brand": { "@type": "Organization", "name": "Fullhouse" },
        "offers": {
          "@type": "Offer",
          "priceCurrency": "RUB",
          "price": (project.price || '').replace(/[^0-9]/g, '') || undefined,
          "url": typeof window !== 'undefined' ? window.location.href : undefined,
          "availability": "https://schema.org/InStock"
        },
        "additionalProperty": [
          {"@type": "PropertyValue", "name": "Площадь", "value": project.area || ''},
          {"@type": "PropertyValue", "name": "Размер", "value": project.size || ''},
          {"@type": "PropertyValue", "name": "Этажей", "value": typeof project.floors === 'number' ? String(project.floors) : ''}
        ]
      }
    ] : undefined,
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20">
          <section className="container mx-auto px-4 py-16">
            <div className="h-8 w-48 bg-muted animate-pulse rounded mb-6" />
            <div className="h-56 w-full bg-muted animate-pulse rounded" />
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20">
          <section className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-2xl font-bold mb-4">Проект не найден</h1>
            <Button asChild>
              <Link to="/projects">Вернуться к проектам</Link>
            </Button>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <section className="container mx-auto px-4 py-6">
          <Button asChild variant="ghost" className="mb-4">
            <Link to={backTo} className="inline-flex items-center gap-2"><ArrowLeft className="h-4 w-4" /> Назад</Link>
          </Button>
          <h1 className="text-3xl lg:text-5xl font-bold text-primary mb-6">{project.title}</h1>
        </section>

        {/* Gallery */}
        <section className="container mx-auto px-4">
          <Card className="border-0 bg-white overflow-hidden">
            <CardContent className="p-0">
              {project.gallery && project.gallery.length > 0 ? (
                <div className="relative group">
                  <Carousel className="w-full" opts={{ loop: true }}>
                    <CarouselContent>
                      {project.gallery.map((src, i) => (
                        <CarouselItem key={`${src}-${i}`}>
                          <img src={src} alt={`${project.title} фото ${i + 1}`} className="w-full h-[420px] object-contain bg-white" loading="lazy" decoding="async" sizes="(min-width:1024px) 66vw, 100vw" />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-4 !h-10 !w-10 rounded-full bg-white/80 hover:bg-white shadow-lg ring-1 ring-black/5 backdrop-blur transition-all duration-200 hover:scale-105 opacity-90 md:opacity-0 md:group-hover:opacity-100 [&>svg]:h-5 [&>svg]:w-5" />
                    <CarouselNext className="right-4 !h-10 !w-10 rounded-full bg-white/80 hover:bg-white shadow-lg ring-1 ring-black/5 backdrop-blur transition-all duration-200 hover:scale-105 opacity-90 md:opacity-0 md:group-hover:opacity-100 [&>svg]:h-5 [&>svg]:w-5" />
                  </Carousel>
                </div>
              ) : (
                <div className="w-full h-[420px] bg-gradient-to-br from-muted to-muted/60" />
              )}
            </CardContent>
          </Card>
        </section>

        {/* Summary + CTA */}
        <section className="container mx-auto px-4 pt-6">
          {/* Summary grid */}
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4 mb-4">
            <Card className="border-0 bg-white"><CardContent className="p-4"><div className="text-xs text-muted-foreground mb-1">Общая пл.</div><div className="text-lg font-semibold">{project.area ?? '—'}</div></CardContent></Card>
            <Card className="border-0 bg-white"><CardContent className="p-4"><div className="text-xs text-muted-foreground mb-1">Строительная пл.</div><div className="text-lg font-semibold">{project.buildingArea ?? '—'}</div></CardContent></Card>
            <Card className="border-0 bg-white"><CardContent className="p-4"><div className="text-xs text-muted-foreground mb-1">Пл. террас и балконов</div><div className="text-lg font-semibold">{project.terracesArea ?? '—'}</div></CardContent></Card>
            <Card className="border-0 bg-white"><CardContent className="p-4"><div className="text-xs text-muted-foreground mb-1">Этажей</div><div className="text-lg font-semibold">{project.floors ?? '—'}</div></CardContent></Card>
            <Card className="border-0 bg-white"><CardContent className="p-4"><div className="text-xs text-muted-foreground mb-1">Ширина дома</div><div className="text-lg font-semibold">{project.width ?? '—'}</div></CardContent></Card>
            <Card className="border-0 bg-white"><CardContent className="p-4"><div className="text-xs text-muted-foreground mb-1">Длина дома</div><div className="text-lg font-semibold">{project.length ?? '—'}</div></CardContent></Card>
          </div>

          {/* CTA */}
          <div className="flex flex-wrap gap-2">
            <a href="https://wa.me/79883464087" target="_blank" rel="noopener noreferrer">
              <Button className="fh-btn-primary">Рассчитать смету</Button>
            </a>
            <a href="tel:+79180400402">
              <Button className="fh-btn-secondary">Получить консультацию</Button>
            </a>
            <Button variant="outline" className="fh-btn-secondary" onClick={handleDownloadCatalog}>Скачать PDF</Button>
          </div>

          {/* Icons row with tooltips */}
          <div className="grid grid-cols-4 gap-6 text-sm mb-4 mt-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-2 cursor-default"><Bath className="h-5 w-5 text-muted-foreground" />{project.stats?.bathrooms ?? 0}</div>
              </TooltipTrigger>
              <TooltipContent>Ванна</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-2 cursor-default"><Sofa className="h-5 w-5 text-muted-foreground" />{(project.stats as any)?.livingRooms ?? 0}</div>
              </TooltipTrigger>
              <TooltipContent>Гостиная</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-2 cursor-default"><BedDouble className="h-5 w-5 text-muted-foreground" />{project.stats?.bedrooms ?? 0}</div>
              </TooltipTrigger>
              <TooltipContent>Спальня</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-2 cursor-default"><Shirt className="h-5 w-5 text-muted-foreground" />{project.stats?.wardrobes ?? 0}</div>
              </TooltipTrigger>
              <TooltipContent>Гардероб</TooltipContent>
            </Tooltip>
          </div>
          <div className="h-px bg-border" />
        </section>

        {/* Details */}
        <section className="container mx-auto px-4 py-12 grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <Card className="border-0 bg-white">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-primary mb-4">О проекте</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {project.about || 'Описание проекта будет добавлено позже.'}
                </p>
              </CardContent>
            </Card>

            {/* Plans */}
            <Card className="border-0 bg-white">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-primary mb-4">Планировки</h2>
                {Array.isArray(project.planVariants) && project.planVariants.length > 0 ? (
                  <div className="space-y-4">
                    <div className="w-full h-[640px] bg-white border rounded-lg flex items-center justify-center">
                      <img
                        src={project.planVariants[activePlanIdx]}
                        alt={`Планировка вариант ${activePlanIdx + 1}`}
                        className="max-w-full max-h-[620px] object-contain" loading="lazy" decoding="async"
                      />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.planVariants.map((_, i) => (
                        <button
                          key={`plan-variant-${i}`}
                          type="button"
                          onClick={() => setActivePlanIdx(i)}
                          className={`px-3 py-1.5 text-sm rounded-md border transition-colors ${
                            i === activePlanIdx ? 'bg-primary text-primary-foreground border-primary' : 'bg-white text-primary border-border hover:bg-muted'
                          }`}
                        >
                          Вариант {i + 1}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : project.plans && project.plans.length > 0 ? (
                  <div className="grid sm:grid-cols-2 gap-4">
                    {project.plans.map((src, i) => (
                      <img key={`${src}-${i}`} src={src} alt={`Планировка ${i + 1}`} className="w-full h-64 object-contain bg-white rounded-lg" loading="lazy" decoding="async" />
                    ))}
                  </div>
                ) : (
                  <div className="text-muted-foreground">Планировки будут добавлены позже.</div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Side panel */}
          <div className="space-y-6">
            <Card className="border-0 bg-white">
              <CardContent className="p-6 space-y-4">
                {project.price && <div className="text-2xl font-bold text-accent">{project.price}</div>}
                <div className="grid grid-cols-1 gap-4 text-sm">
                  <div>
                    <div className="flex items-center gap-2 text-muted-foreground mb-1"><Maximize className="h-4 w-4" /> Площадь</div>
                    <div className="font-medium">{project.area ?? '—'}</div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-muted-foreground mb-1"><Ruler className="h-4 w-4" /> Размер</div>
                    <div className="font-medium">{project.size ?? '—'}</div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-muted-foreground mb-1"><Timer className="h-4 w-4" /> Срок</div>
                    <div className="font-medium">{project.buildTime ?? '—'}</div>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <a href="https://wa.me/79883464087" target="_blank" rel="noopener noreferrer" className="w-full">
                    <Button className="w-full fh-btn-primary">Рассчитать смету</Button>
                  </a>
                  <a href="tel:+79180400402" className="w-full">
                    <Button className="w-full fh-btn-secondary">Получить консультацию</Button>
                  </a>
                  <Button variant="outline" className="w-full fh-btn-secondary" onClick={handleDownloadCatalog}>Скачать PDF</Button>
                </div>
              </CardContent>
            </Card>
            {/* Specs block: normalized table */}
            <Card className="border-0 bg-white">
              <CardContent className="p-6 space-y-3">
                <h2 className="text-lg font-semibold text-primary mb-3">Характеристики</h2>
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center justify-between"><span className="text-muted-foreground">Общая площадь</span><span className="font-medium">{project.area || '—'}</span></div>
                  <div className="flex items-center justify-between"><span className="text-muted-foreground">Строительная площадь</span><span className="font-medium">{project.buildingArea || '—'}</span></div>
                  <div className="flex items-center justify-between"><span className="text-muted-foreground">Террасы/балконы</span><span className="font-medium">{project.terracesArea || '—'}</span></div>
                  <div className="flex items-center justify-between"><span className="text-muted-foreground">Этажей</span><span className="font-medium">{project.floors ?? '—'}</span></div>
                  <div className="flex items-center justify-between"><span className="text-muted-foreground">Размеры</span><span className="font-medium">{project.size || `${project.width || '—'} × ${project.length || '—'}`}</span></div>
                  <div className="flex items-center justify-between"><span className="text-muted-foreground">Срок строительства</span><span className="font-medium">{project.buildTime || '—'}</span></div>
                  <div className="flex items-center justify-between"><span className="text-muted-foreground">Спальни</span><span className="font-medium">{project.stats?.bedrooms ?? '—'}</span></div>
                  <div className="flex items-center justify-between"><span className="text-muted-foreground">Санузлы</span><span className="font-medium">{project.stats?.bathrooms ?? '—'}</span></div>
                  <div className="flex items-center justify-between"><span className="text-muted-foreground">Гардеробные</span><span className="font-medium">{project.stats?.wardrobes ?? '—'}</span></div>
                  <div className="flex items-center justify-between"><span className="text-muted-foreground">Гостиные</span><span className="font-medium">{(project.stats as any)?.livingRooms ?? '—'}</span></div>
                  <div className="flex items-center justify-between"><span className="text-muted-foreground">Гараж</span><span className="font-medium">{project.stats?.garage ?? '—'}</span></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectDetail;


