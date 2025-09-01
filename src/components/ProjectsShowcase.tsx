import { useEffect, useMemo, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
  const { ref: sectionRef, isVisible } = useScrollAnimation({ 
    threshold: 0.1, 
    delay: 100,
    animation: 'fade-in'
  });

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        setLoading(true);
        setError(false);
        const res = await fetch('/projects.json', { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load projects.json');
        const data: ShowcaseProject[] = await res.json();
        if (!Array.isArray(data)) throw new Error('Invalid projects.json format');
        if (active) setItems(data);
      } catch {
        if (active) {
          setError(true);
          setItems([]);
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

  const topSix = useMemo(() => {
    if (!items) return [];
    return items.slice(0, 6);
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
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-800 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-4">Каталог домов</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Шесть актуальных проектов с ключевыми параметрами: стоимость, площадь, размеры и срок строительства.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading && (
            Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="border border-gray-200 bg-white overflow-hidden shadow-lg">
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
              <Card key={index} className="border border-gray-200 bg-white overflow-hidden shadow-lg">
                <div className="w-full h-48 bg-gradient-to-br from-gray-200 to-gray-300" />
                <CardContent className="p-4">
                  <h3 className="text-lg font-bold text-slate-800 mb-2">Данные недоступны</h3>
                  <p className="text-xs text-slate-600">Загрузите проекты позже или перейдите на источник.</p>
                </CardContent>
              </Card>
            ))
          )}

          {!loading && !error && topSix.map((p, idx) => (
            <Card
              key={idx}
              className="fh-card group"
              style={{
                animationDelay: `${idx * 100}ms`,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                opacity: isVisible ? 1 : 0
              }}
            >
              <div className="fh-card__image">
                {p.imageUrl ? (
                  <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                ) : (
                  <div className="w-full h-full bg-gray-200" />
                )}
              </div>
              <CardContent className="fh-card__body">
                <h3 className="fh-card__title group-hover:text-blue-700">{p.title}</h3>
                <div className="fh-card__meta mt-2">
                  <div className="flex items-center gap-1"><Ruler className="w-4 h-4" />{p.area || '—'}</div>
                  <div className="flex items-center gap-1"><Maximize className="w-4 h-4" />{p.size || '—'}</div>
                  <div className="flex items-center gap-1"><Timer className="w-4 h-4" />{p.buildTime || '—'}</div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-blue-600 font-semibold">{p.price || 'По запросу'}</div>
                  <Button size="sm" variant="default" className="fh-btn-primary group-hover:shadow-xl" onClick={() => handleViewProject(p.slug)}>
                    <ExternalLink className="w-4 h-4 mr-1" /> Открыть
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button asChild variant="default" size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg">
            <Link to="/projects">Все проекты</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsShowcase;


