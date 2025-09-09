import { useEffect, useMemo, useState } from 'react';
import { useProjects } from '@/hooks/useProjects';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Ruler, Timer, Maximize, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
// reverting to simple Card layout

type ShowcaseProject = {
  title: string;
  price?: string;
  area?: string;
  size?: string;
  buildTime?: string;
  imageUrl?: string;
  url?: string;
  slug?: string;
};

const ProjectsShowcase = () => {
  const [items, setItems] = useState<ShowcaseProject[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const { data: allProjects, isLoading: queryLoading, isError } = useProjects({ staleTime: 1000 * 60 * 10 });
  const { ref: sectionRef, isVisible } = useScrollAnimation({ 
    threshold: 0.1, 
    delay: 100,
    animation: 'fade-in'
  });

  useEffect(() => {
    setLoading(queryLoading);
    setError(!!isError);
    if (Array.isArray(allProjects)) setItems(allProjects as any);
  }, [allProjects, queryLoading, isError]);

  const realizedSlugs = new Set(['nova','grinvud','riga','orehovaya-roshcha','semigorye','semigorye-2','cemdolina']);
  const topSix = useMemo(() => {
    if (!items) return [];
    const filtered = items.filter(p => !realizedSlugs.has((p.slug || '').toLowerCase()));
    return filtered.slice(0, 6);
  }, [items]);

  const handleViewProject = (slug?: string) => {
    if (slug) {
      window.location.href = `/projects/${slug}`;
    }
  };

  const handleFavorite = (title: string) => {
    console.log(`Проект "${title}" добавлен в избранное`);
  };

  const handleShare = (title: string) => {
    console.log(`Поделиться проектом "${title}"`);
  };

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className={`text-center mb-10 sm:mb-12 transition-all duration-800 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 dark:text-white mb-3 sm:mb-4 px-4">Каталог домов</h2>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
            Шесть актуальных проектов с ключевыми параметрами: стоимость, площадь, размеры и срок строительства.
          </p>
        </div>

        {/* Mobile Carousel */}
        <div className="sm:hidden">
          {!loading && !error && topSix.length > 0 && (
            <Carousel className="w-full" opts={{ loop: true }}>
              <CarouselContent>
                {topSix.map((p, idx) => (
                  <CarouselItem key={`mobile-${p.title}-${idx}`}>
                    <Card className="border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm overflow-hidden shadow-xl">
                      <div className="fh-card__image">
                        {p.imageUrl ? (
                          <img src={p.imageUrl} alt={p.title} className="w-full h-56 object-contain bg-white" loading="lazy" decoding="async" sizes="100vw" />
                        ) : (
                          <div className="w-full h-56 bg-gray-200" />
                        )}
                      </div>
                      <CardContent className="fh-card__body">
                        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">{p.title}</h3>
                        <div className="space-y-2 mt-2 text-sm text-slate-600 dark:text-gray-300">
                          <div className="flex items-center gap-1"><Ruler className="w-4 h-4" />{p.area || '—'}</div>
                          <div className="flex items-center gap-1"><Maximize className="w-4 h-4" />{p.size || '—'}</div>
                          <div className="flex items-center gap-1"><Timer className="w-4 h-4" />{p.buildTime || '—'}</div>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                          <div className="text-blue-600 dark:text-blue-400 font-bold text-lg">{p.price || 'По запросу'}</div>
                          <Button size="sm" variant="default" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg" onClick={() => handleViewProject(p.slug)}>
                            <ExternalLink className="w-4 h-4 mr-1" /> Открыть
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2 !h-10 !w-10 rounded-full bg-white/90 hover:bg-white shadow-lg ring-1 ring-black/5" />
              <CarouselNext className="right-2 !h-10 !w-10 rounded-full bg-white/90 hover:bg-white shadow-lg ring-1 ring-black/5" />
            </Carousel>
          )}
        </div>

        {/* Grid (tablet/desktop) */}
        <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {loading && (
            Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="w-full h-48 bg-gray-200 animate-pulse" />
                <CardContent className="p-4">
                  <div className="h-5 w-2/3 bg-gray-200 animate-pulse rounded mb-2" />
                  <div className="h-3 w-1/2 bg-gray-200 animate-pulse rounded mb-4" />
                  <div className="grid grid-cols-3 gap-3">
                    {Array.from({ length: 3 }).map((__, i) => (
                      <div key={i} className="space-y-1">
                        <div className="h-2 w-10 bg-gray-200 animate-pulse rounded" />
                        <div className="h-3 w-16 bg-gray-200 animate-pulse rounded" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))
          )}

          {!loading && (error || topSix.length === 0) && (
            Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="w-full h-48 bg-gradient-to-br from-gray-200 to-gray-300" />
                <CardContent className="p-4">
                  <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">Данные недоступны</h3>
                  <p className="text-xs text-slate-600 dark:text-gray-300">Загрузите проекты позже или перейдите на источник.</p>
                </CardContent>
              </Card>
            ))
          )}

          {!loading && !error && topSix.map((p, idx) => (
            <Card
              key={idx}
              className="border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
              style={{
                animationDelay: `${idx * 100}ms`,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                opacity: isVisible ? 1 : 0
              }}
            >
              <div className="fh-card__image">
                {p.imageUrl ? (
                  <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" decoding="async" sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw" />
                ) : (
                  <div className="w-full h-full bg-gray-200" />
                )}
              </div>
              <CardContent className="fh-card__body">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{p.title}</h3>
                <div className="space-y-2 mt-2 text-sm text-slate-600 dark:text-gray-300">
                  <div className="flex items-center gap-1"><Ruler className="w-4 h-4" />{p.area || '—'}</div>
                  <div className="flex items-center gap-1"><Maximize className="w-4 h-4" />{p.size || '—'}</div>
                  <div className="flex items-center gap-1"><Timer className="w-4 h-4" />{p.buildTime || '—'}</div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-blue-600 dark:text-blue-400 font-bold text-lg">{p.price || 'По запросу'}</div>
                  <Button size="sm" variant="default" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105" onClick={() => handleViewProject(p.slug)}>
                    <ExternalLink className="w-4 h-4 mr-1" /> Открыть
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Video Section removed per request */}

        {/* CTA */}
        <div className="text-center mt-12">
          <Button asChild variant="default" size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <Link to="/projects">Все проекты</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsShowcase;


