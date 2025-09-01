import { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Maximize, Ruler, Timer, ArrowLeft, Bath, BedDouble, Sofa, Shirt } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

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
  const [items, setItems] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch('/projects.json', { cache: 'no-store' });
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

  const [activePlanIdx, setActivePlanIdx] = useState(0);
  useEffect(() => {
    setActivePlanIdx(0);
  }, [project?.slug]);

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
            <Link to="/projects" className="inline-flex items-center gap-2"><ArrowLeft className="h-4 w-4" /> Назад</Link>
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
                          <img src={src} alt={`${project.title} фото ${i + 1}`} className="w-full h-[420px] object-contain bg-white" />
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

        {/* Summary + toolbar like on source */}
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

          {/* Icons row with tooltips */}
          <div className="grid grid-cols-4 gap-6 text-sm mb-4">
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
                        className="max-w-full max-h-[620px] object-contain"
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
                      <img key={`${src}-${i}`} src={src} alt={`Планировка ${i + 1}`} className="w-full h-64 object-contain bg-white rounded-lg" />
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
                <Button className="w-full">Получить консультацию</Button>
              </CardContent>
            </Card>
            {/* Specs block akin to source layout */}
            <Card className="border-0 bg-white">
              <CardContent className="p-6 space-y-3">
                <h2 className="text-lg font-semibold text-primary">Характеристики</h2>
                <div className="text-sm text-muted-foreground">Материал, этажность, терраса и другие параметры при необходимости можно дополнить.</div>
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


