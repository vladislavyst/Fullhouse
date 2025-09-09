import { useEffect, useMemo, useState } from 'react';
import { useProjects } from '@/hooks/useProjects';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

type ProjectItem = {
  title: string;
  slug?: string;
  imageUrl?: string;
  gallery?: string[];
  price?: string;
};

const realizedSlugs = new Set([
  'nova',
  'grinvud',
  'riga',
  'orehovaya-roshcha',
  'nikola',
  'klubny',
  'znamensky',
  'krop',
  'yantarny',
  'semigorye',
  'semigorye-2',
  'cemdolina',
]);

const Realized = () => {
  const [items, setItems] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { data: allProjects, isLoading: queryLoading, error } = useProjects({ staleTime: 1000 * 60 * 10 });
  
  console.log('Realized component:', { allProjects, queryLoading, error, items });

  useEffect(() => {
    setLoading(queryLoading);
    if (Array.isArray(allProjects)) {
      setItems(allProjects as any);
    }
  }, [allProjects, queryLoading]);

  const realized = useMemo(() => items.filter(p => realizedSlugs.has((p.slug || '').toLowerCase())), [items]);

  const parseAreaToNumber = (area?: string): number | null => {
    if (!area) return null;
    // Examples: "154 м²", "194,7 м²"
    const normalized = area.replace(/[^0-9,\.]/g, '').replace(',', '.');
    const n = parseFloat(normalized);
    return isNaN(n) ? null : n;
  };

  const formatRub = (value: number): string => {
    return value.toLocaleString('ru-RU') + ' ₽';
  };

  const PRICE_PER_M2 = 41000;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-8">Реализованные проекты</h1>
            {error ? (
              <div className="text-red-600">
                Ошибка загрузки проектов: {error.message}
                <br />
                <Button onClick={() => window.location.reload()} className="mt-4">
                  Перезагрузить страницу
                </Button>
              </div>
            ) : loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Card key={i} className="border-0 bg-white/90 backdrop-blur-sm overflow-hidden shadow-xl">
                    <div className="w-full h-56 bg-muted animate-pulse" />
                    <CardContent className="p-6">
                      <div className="h-6 w-2/3 bg-muted animate-pulse rounded mb-3" />
                      <div className="h-4 w-1/2 bg-muted animate-pulse rounded" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : realized.length === 0 ? (
              <div className="text-muted-foreground">
                Реализованные проекты не найдены. Всего проектов: {items.length}
                <br />
                Ожидаемые slug: {Array.from(realizedSlugs).join(', ')}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {realized.map((p, idx) => {
                  const areaNum = parseAreaToNumber((p as any).area);
                  const computed = areaNum ? areaNum * PRICE_PER_M2 : null;
                  return (
                  <Card key={`${p.slug}-${idx}`} className="border-0 bg-white/90 backdrop-blur-sm overflow-hidden shadow-xl group">
                    <Link to={p.slug ? `/projects/${p.slug}` : '#'} state={{ from: '/realized' }}>
                      {p.imageUrl ? (
                        <img src={p.imageUrl} alt={p.title} className="w-full h-56 object-contain bg-white transition-transform duration-300 group-hover:scale-105" />
                      ) : (
                        <div className="w-full h-56 bg-muted" />
                      )}
                    </Link>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-primary mb-2">{p.title}</h3>
                      <div className="flex items-center justify-between gap-2">
                        <div className="text-blue-600 font-semibold">{computed ? `от ${formatRub(computed)}` : (p.price || 'По запросу')}</div>
                        <div className="flex gap-2">
                          <a href="https://wa.me/79883464087" target="_blank" rel="noopener noreferrer">
                            <Button size="sm" className="fh-btn-primary">Рассчитать смету</Button>
                          </a>
                          <a href="tel:+79180400402">
                            <Button size="sm" className="fh-btn-secondary">Позвонить</Button>
                          </a>
                          {p.slug && (
                            <Button asChild size="sm" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                              <Link to={`/projects/${p.slug}`} state={{ from: '/realized' }}>Открыть</Link>
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Realized;


