import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Maximize, Ruler, Timer } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useSEO, seoConfigs } from '@/hooks/useSEO';
import Breadcrumbs from '@/components/Breadcrumbs';

type ProjectItem = {
  title: string;
  price?: string;
  area?: string;
  size?: string;
  buildTime?: string;
  imageUrl?: string;
  url?: string;
  slug?: string;
  about?: string;
};

const Projects = () => {
  const [items, setItems] = useState<ProjectItem[]>([]);
  const [sortedItems, setSortedItems] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Применяем SEO-оптимизацию для страницы проектов
  useSEO(seoConfigs.projects);

  // Функция для проверки соотношения сторон изображения
  const checkImageAspectRatio = (imageUrl: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const aspectRatio = img.width / img.height;
        resolve(aspectRatio > 1.2); // Считаем широким если соотношение > 1.2
      };
      img.onerror = () => resolve(false);
      img.src = imageUrl;
    });
  };

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch('/projects.json', { cache: 'no-store' });
        const data = await res.json();
        if (active && Array.isArray(data)) {
          setItems(data);
          
          // Сортируем проекты по соотношению сторон изображений
          const itemsWithAspectRatio = await Promise.all(
            data.map(async (item: ProjectItem) => {
              const isWide = item.imageUrl ? await checkImageAspectRatio(item.imageUrl) : false;
              return { ...item, isWide };
            })
          );

          // Сортируем: сначала широкие, потом остальные
          const sorted = itemsWithAspectRatio.sort((a, b) => {
            if (a.isWide && !b.isWide) return -1;
            if (!a.isWide && b.isWide) return 1;
            return 0;
          });

          if (active) setSortedItems(sorted);
        }
      } finally {
        if (active) setLoading(false);
      }
    };
    load();
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Хлебные крошки для SEO */}
      <Breadcrumbs 
        items={[
          { label: 'Проекты', path: '/projects', current: true }
        ]} 
      />
      
      <main className="pt-20">
        {/* Hero */}
        <section className="py-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-slate-800 mb-4">Все проекты</h1>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Полная витрина проектов с ключевыми характеристиками. Данные берутся из projects.json.
            </p>
          </div>
        </section>

        {/* Grid */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Card key={i} className="fh-card">
                    <div className="w-full h-56 bg-gray-200 animate-pulse" />
                    <CardContent className="p-6">
                      <div className="h-6 w-2/3 bg-gray-200 animate-pulse rounded mb-3" />
                      <div className="h-4 w-1/2 bg-gray-200 animate-pulse rounded mb-6" />
                      <div className="grid grid-cols-3 gap-4">
                        {Array.from({ length: 3 }).map((__, j) => (
                          <div key={j} className="space-y-2">
                            <div className="h-3 w-12 bg-gray-200 animate-pulse rounded" />
                            <div className="h-4 w-20 bg-gray-200 animate-pulse rounded" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-12">
                {/* Широкие изображения */}
                {sortedItems.filter((p: any) => p.isWide).length > 0 && (
                  <div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {sortedItems.filter((p: any) => p.isWide).map((p, idx) => (
                        <Card key={`wide-${p.title}-${idx}`} className="fh-card group">
                          <div className="relative overflow-hidden">
                            {p.title.trim().toLowerCase() === 'алстен' ? (
                              <div className="relative group">
                                <Carousel className="w-full" opts={{ loop: true }}>
                                  <CarouselContent>
                                    {Array.from({ length: 8 }).map((_, i) => {
                                      const src = `/projects/alsten/alsten-${String(i + 1).padStart(2, '0')}.jpg`;
                                      return (
                                        <CarouselItem key={src}>
                                          <img src={src} alt={`${p.title} фото ${i + 1}`} className="w-full h-56 object-contain bg-white" />
                                        </CarouselItem>
                                      );
                                    })}
                                  </CarouselContent>
                                  <CarouselPrevious
                                    className="left-2 md:-left-3 !h-10 !w-10 rounded-full bg-white/80 hover:bg-white shadow-lg ring-1 ring-black/5 backdrop-blur transition-all duration-200 hover:scale-105 opacity-90 md:opacity-0 md:group-hover:opacity-100 [&>svg]:h-5 [&>svg]:w-5"
                                  />
                                  <CarouselNext
                                    className="right-2 md:-right-3 !h-10 !w-10 rounded-full bg-white/80 hover:bg-white shadow-lg ring-1 ring-black/5 backdrop-blur transition-all duration-200 hover:scale-105 opacity-90 md:opacity-0 md:group-hover:opacity-100 [&>svg]:h-5 [&>svg]:w-5"
                                  />
                                </Carousel>
                                {p.slug && (
                                  <Link to={`/projects/${p.slug}`} aria-label={`${p.title}`} className="absolute inset-0">
                                    <span className="sr-only">Открыть {p.title}</span>
                                  </Link>
                                )}
                              </div>
                            ) : p.imageUrl ? (
                              <div className="relative">
                                <Link to={p.slug ? `/projects/${p.slug}` : '#'}>
                                  <img src={p.imageUrl} alt={p.title} className="w-full h-56 object-contain bg-white transition-transform duration-300 group-hover:scale-105" />
                                </Link>

                              </div>
                            ) : (
                              <div className="w-full h-56 bg-gradient-to-br from-gray-200 to-gray-300" />
                            )}
                          </div>
                          <CardContent className="p-6">
                            <Link to={p.slug ? `/projects/${p.slug}` : '#'} className="block">
                              <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-blue-700 transition-colors">{p.title}</h3>
                            </Link>
                            {p.price && <div className="text-blue-600 font-semibold mb-4">{p.price}</div>}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                              <div>
                                <div className="flex items-center gap-2 text-slate-600 mb-1"><Maximize className="h-4 w-4" /> Площадь</div>
                                <div className="font-medium text-slate-800">{p.area ?? '—'}</div>
                              </div>
                              <div>
                                <div className="flex items-center gap-2 text-slate-600 mb-1"><Ruler className="h-4 w-4" /> Размер</div>
                                <div className="font-medium text-slate-800">{p.size ?? '—'}</div>
                              </div>
                              <div>
                                <div className="flex items-center gap-2 text-slate-600 mb-1"><Timer className="h-4 w-4" /> Срок</div>
                                <div className="font-medium text-slate-800">{p.buildTime ?? '—'}</div>
                              </div>
                            </div>
                            {p.about && (
                              <div className="mt-4 text-sm text-slate-600">
                                {(p.about || '').slice(0, 220)}{p.about && p.about.length > 220 ? '…' : ''}
                              </div>
                            )}
                            <div className="mt-4 flex gap-2">
                              {p.slug && (
                                <Button asChild size="sm" className="fh-btn-primary">
                                  <Link to={`/projects/${p.slug}`}>Подробнее</Link>
                                </Button>
                              )}
                              {p.url && (
                                <Button asChild variant="outline" size="sm" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                                  <a href={p.url} target="_blank" rel="noopener noreferrer">Источник</a>
                                </Button>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Квадратные/вертикальные изображения */}
                {sortedItems.filter((p: any) => !p.isWide).length > 0 && (
                  <div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {sortedItems.filter((p: any) => !p.isWide).map((p, idx) => (
                  <Card key={`${p.title}-${idx}`} className="fh-card group">
                    <div className="relative overflow-hidden">
                      {p.title.trim().toLowerCase() === 'алстен' ? (
                        <div className="relative group">
                          <Carousel className="w-full" opts={{ loop: true }}>
                            <CarouselContent>
                              {Array.from({ length: 8 }).map((_, i) => {
                                const src = `/projects/alsten/alsten-${String(i + 1).padStart(2, '0')}.jpg`;
                                return (
                                  <CarouselItem key={src}>
                                    <img src={src} alt={`${p.title} фото ${i + 1}`} className="w-full h-56 object-contain bg-white" />
                                  </CarouselItem>
                                );
                              })}
                            </CarouselContent>
                            <CarouselPrevious
                              className="left-2 md:-left-3 !h-10 !w-10 rounded-full bg-white/80 hover:bg-white shadow-lg ring-1 ring-black/5 backdrop-blur transition-all duration-200 hover:scale-105 opacity-90 md:opacity-0 md:group-hover:opacity-100 [&>svg]:h-5 [&>svg]:w-5"
                            />
                            <CarouselNext
                              className="right-2 md:-right-3 !h-10 !w-10 rounded-full bg-white/80 hover:bg-white shadow-lg ring-1 ring-black/5 backdrop-blur transition-all duration-200 hover:scale-105 opacity-90 md:opacity-0 md:group-hover:opacity-100 [&>svg]:h-5 [&>svg]:w-5"
                            />
                          </Carousel>
                          {p.slug && (
                            <Link to={`/projects/${p.slug}`} aria-label={`${p.title}`} className="absolute inset-0">
                              <span className="sr-only">Открыть {p.title}</span>
                            </Link>
                          )}
                        </div>
                      ) : p.imageUrl ? (
                        <div className="relative">
                          <Link to={p.slug ? `/projects/${p.slug}` : '#'}>
                            <img src={p.imageUrl} alt={p.title} className="w-full h-56 object-contain bg-white transition-transform duration-300 group-hover:scale-105" />
                          </Link>
                          {/* Индикатор типа изображения */}
                          {(p as any).isWide && (
                            <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                              Широкое
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="w-full h-56 bg-gradient-to-br from-gray-200 to-gray-300" />
                      )}
                    </div>
                    <CardContent className="p-6">
                      <Link to={p.slug ? `/projects/${p.slug}` : '#'} className="block">
                        <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-blue-700 transition-colors">{p.title}</h3>
                      </Link>
                      {p.price && <div className="text-blue-600 font-semibold mb-4">{p.price}</div>}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="flex items-center gap-2 text-slate-600 mb-1"><Maximize className="h-4 w-4" /> Площадь</div>
                          <div className="font-medium text-slate-800">{p.area ?? '—'}</div>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 text-slate-600 mb-1"><Ruler className="h-4 w-4" /> Размер</div>
                          <div className="font-medium text-slate-800">{p.size ?? '—'}</div>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 text-slate-600 mb-1"><Timer className="h-4 w-4" /> Срок</div>
                          <div className="font-medium text-slate-800">{p.buildTime ?? '—'}</div>
                        </div>
                      </div>
                      {p.about && (
                        <div className="mt-4 text-sm text-slate-600">
                          {(p.about || '').slice(0, 220)}{p.about && p.about.length > 220 ? '…' : ''}
                        </div>
                      )}
                      <div className="mt-4 flex gap-2">
                        {p.slug && (
                          <Button asChild size="sm" className="fh-btn-primary">
                            <Link to={`/projects/${p.slug}`}>Подробнее</Link>
                          </Button>
                        )}
                        {p.url && (
                          <Button asChild variant="outline" size="sm" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                            <a href={p.url} target="_blank" rel="noopener noreferrer">Источник</a>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Projects;


