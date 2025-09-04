import { useEffect, useMemo, useState } from 'react';
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
]);

const Realized = () => {
  const [items, setItems] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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
            {loading ? (
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
              <div className="text-muted-foreground">Реализованные проекты не найдены.</div>
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
                      <div className="flex items-center justify-between">
                        <div className="text-blue-600 font-semibold">{computed ? `от ${formatRub(computed)}` : (p.price || 'По запросу')}</div>
                        {p.slug && (
                          <Button asChild size="sm" className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                            <Link to={`/projects/${p.slug}`} state={{ from: '/realized' }}>Открыть</Link>
                          </Button>
                        )}
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


