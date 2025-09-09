import { useEffect, useMemo, useState } from 'react';
import { useProjects } from '@/hooks/useProjects';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Maximize, Ruler, Timer } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useSEO, seoConfigs } from '@/hooks/useSEO';
import Breadcrumbs from '@/components/Breadcrumbs';
import WhatsAppFloat from '@/components/WhatsAppFloat';

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
  floors?: number;
  isWide?: boolean;
};

const Projects = () => {
  const [items, setItems] = useState<ProjectItem[]>([]);
  const [itemsWithAspect, setItemsWithAspect] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { data: allProjects, isLoading: queryLoading } = useProjects({ staleTime: 1000 * 60 * 10 });

  // Фильтры
  const [priceMin, setPriceMin] = useState<string>('');
  const [priceMax, setPriceMax] = useState<string>('');
  const [areaMin, setAreaMin] = useState<string>('');
  const [areaMax, setAreaMax] = useState<string>('');
  const [floorsFilter, setFloorsFilter] = useState<string>('all'); // 'all' | '1' | '2'

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
    const prepare = async () => {
      try {
        setLoading(true);
        const data = Array.isArray(allProjects) ? allProjects : [];
        const realizedSlugs = new Set([
          'nova','grinvud','riga','orehovaya-roshcha','yantarny','krop','znamensky','klubny','nikola','semigorye','semigorye-2','cemdolina',
        ]);
        const filtered = data.filter((item: any) => !realizedSlugs.has((item.slug || '').toLowerCase()));
        if (!active) return;
        setItems(filtered);
        const itemsWithAspectRatio = await Promise.all(
          filtered.map(async (item: ProjectItem) => {
            const isWide = item.imageUrl ? await checkImageAspectRatio(item.imageUrl) : false;
            return { ...item, isWide };
          })
        );
        if (active) setItemsWithAspect(itemsWithAspectRatio);
      } finally {
        if (active) setLoading(queryLoading);
      }
    };
    prepare();
    return () => { active = false; };
  }, [allProjects, queryLoading]);

  // Prefetch detail page chunk on hover
  const prefetchDetail = () => {
    import('@/pages/ProjectDetail');
  };

  // Утилиты парсинга
  const parsePrice = (price?: string): number | null => {
    if (!price) return null;
    const digits = price.replace(/[^0-9]/g, '');
    if (!digits) return null;
    try { return parseInt(digits, 10); } catch { return null; }
  };

  const parseArea = (area?: string): number | null => {
    if (!area) return null;
    const cleaned = area.replace(/[^0-9,\.]/g, '').replace(',', '.');
    const num = parseFloat(cleaned);
    return isNaN(num) ? null : num;
  };

  // Применяем фильтры и затем группируем по ширине
  const displayedItems = useMemo(() => {
    const minPrice = priceMin ? parseInt(priceMin, 10) : null;
    const maxPrice = priceMax ? parseInt(priceMax, 10) : null;
    const minArea = areaMin ? parseFloat(areaMin.replace(',', '.')) : null;
    const maxArea = areaMax ? parseFloat(areaMax.replace(',', '.')) : null;
    const floors = floorsFilter === 'all' ? null : parseInt(floorsFilter, 10);

    const filtered = itemsWithAspect.filter((p) => {
      const pPrice = parsePrice(p.price);
      const pArea = parseArea(p.area);
      const pFloors = typeof p.floors === 'number' ? p.floors : null;

      if (minPrice !== null && (pPrice === null || pPrice < minPrice)) return false;
      if (maxPrice !== null && (pPrice === null || pPrice > maxPrice)) return false;

      if (minArea !== null && (pArea === null || pArea < minArea)) return false;
      if (maxArea !== null && (pArea === null || pArea > maxArea)) return false;

      if (floors !== null && pFloors !== null && pFloors !== floors) return false;
      if (floors !== null && pFloors === null) return false; // если фильтр по этажности выбран, требуем значение

      return true;
    });

    // Сортируем: сначала широкие, потом остальные
    return filtered.sort((a, b) => {
      const aW = !!a.isWide; const bW = !!b.isWide;
      if (aW && !bW) return -1;
      if (!aW && bW) return 1;
      return 0;
    });
  }, [itemsWithAspect, priceMin, priceMax, areaMin, areaMax, floorsFilter]);

  const resetFilters = () => {
    setPriceMin('');
    setPriceMax('');
    setAreaMin('');
    setAreaMax('');
    setFloorsFilter('all');
  };

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
              Полная витрина проектов с ключевыми характеристиками.
            </p>
          </div>
        </section>

        {/* Панель фильтров */}
        <section className="-mt-8 pb-4">
          <div className="container mx-auto px-4">
            <div className="bg-white/90 backdrop-blur rounded-2xl shadow-lg ring-1 ring-slate-200/60 px-4 sm:px-6 py-5">
              <div className="grid md:grid-cols-5 gap-4">
                <div>
                  <label className="block text-xs text-slate-500 mb-1">Цена от (руб.)</label>
                  <input
                    type="number"
                    inputMode="numeric"
                    value={priceMin}
                    onChange={(e) => setPriceMin(e.target.value)}
                    className="w-full h-10 rounded-md border border-slate-200 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="5 000 000"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1">Цена до (руб.)</label>
                  <input
                    type="number"
                    inputMode="numeric"
                    value={priceMax}
                    onChange={(e) => setPriceMax(e.target.value)}
                    className="w-full h-10 rounded-md border border-slate-200 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="15 000 000"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1">Площадь от (м²)</label>
                  <input
                    type="number"
                    step="0.01"
                    inputMode="decimal"
                    value={areaMin}
                    onChange={(e) => setAreaMin(e.target.value)}
                    className="w-full h-10 rounded-md border border-slate-200 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="120"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1">Площадь до (м²)</label>
                  <input
                    type="number"
                    step="0.01"
                    inputMode="decimal"
                    value={areaMax}
                    onChange={(e) => setAreaMax(e.target.value)}
                    className="w-full h-10 rounded-md border border-slate-200 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="300"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1">Этажность</label>
                  <select
                    value={floorsFilter}
                    onChange={(e) => setFloorsFilter(e.target.value)}
                    className="w-full h-10 rounded-md border border-slate-200 px-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
                  >
                    <option value="all">Все</option>
                    <option value="1">1 этаж</option>
                    <option value="2">2 этажа</option>
                  </select>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-sm">
                <div className="text-slate-500">Найдено: <span className="font-medium text-slate-700">{displayedItems.length}</span></div>
                <button onClick={resetFilters} className="text-blue-700 hover:text-blue-800">Сбросить фильтры</button>
              </div>
            </div>
          </div>
        </section>

        {/* Grid */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Card key={i} className="fh-card rounded-2xl shadow-lg ring-1 ring-slate-200/60">
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
                {displayedItems.filter((p: any) => p.isWide).length > 0 && (
                  <div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {displayedItems.filter((p: any) => p.isWide).map((p, idx) => (
                        <Card key={`wide-${p.title}-${idx}`} className="fh-card group rounded-2xl shadow-lg hover:shadow-2xl transition-shadow ring-1 ring-slate-200/60">
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
                                <Link to={p.slug ? `/projects/${p.slug}` : '#'} state={{ from: '/projects' }}>
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
                            <div className="mt-4 space-y-2">
                              <div className="grid grid-cols-2 gap-2">
                                <a href="https://wa.me/79883464087" target="_blank" rel="noopener noreferrer">
                                  <Button size="sm" className="fh-btn-primary w-full text-xs">Смета</Button>
                                </a>
                                <a href="tel:+79180400402">
                                  <Button size="sm" className="fh-btn-secondary w-full text-xs">Консультация</Button>
                                </a>
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                {p.slug && (
                                  <Button asChild size="sm" className="border-blue-200 text-blue-600 hover:bg-blue-50 w-full text-xs">
                                    <Link to={`/projects/${p.slug}`}>Подробнее</Link>
                                  </Button>
                                )}
                                {p.url && (
                                  <Button asChild variant="outline" size="sm" className="border-blue-200 text-blue-600 hover:bg-blue-50 w-full text-xs">
                                    <a href={p.url} target="_blank" rel="noopener noreferrer">Источник</a>
                                  </Button>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Квадратные/вертикальные изображения */}
                {displayedItems.filter((p: any) => !p.isWide).length > 0 && (
                  <div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {displayedItems.filter((p: any) => !p.isWide).map((p, idx) => (
                  <Card key={`${p.title}-${idx}`} className="fh-card group rounded-2xl shadow-lg hover:shadow-2xl transition-shadow ring-1 ring-slate-200/60">
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
                          <Link to={p.slug ? `/projects/${p.slug}` : '#'} state={{ from: '/projects' }}>
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
                      <Link to={p.slug ? `/projects/${p.slug}` : '#'} className="block" state={{ from: '/projects' }}>
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
                      <div className="mt-4 space-y-2">
                        <div className="grid grid-cols-2 gap-2">
                          <a href="https://wa.me/79883464087" target="_blank" rel="noopener noreferrer">
                            <Button size="sm" className="fh-btn-primary w-full text-xs">Смета</Button>
                          </a>
                          <a href="tel:+79180400402">
                            <Button size="sm" className="fh-btn-secondary w-full text-xs">Консультация</Button>
                          </a>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {p.slug && (
                            <Button asChild size="sm" className="border-blue-200 text-blue-600 hover:bg-blue-50 w-full text-xs">
                              <Link to={`/projects/${p.slug}`} state={{ from: '/projects' }}>Подробнее</Link>
                            </Button>
                          )}
                          {p.url && (
                            <Button asChild variant="outline" size="sm" className="border-blue-200 text-blue-600 hover:bg-blue-50 w-full text-xs">
                              <a href={p.url} target="_blank" rel="noopener noreferrer">Источник</a>
                            </Button>
                          )}
                        </div>
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


