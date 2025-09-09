import { useLocation, Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import SEOHead from "../components/SEOHead";

const NotFound = () => {
  const location = useLocation();
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<Array<{ title: string; slug?: string; imageUrl?: string }>>([]);

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const res = await fetch('/projects.json', { cache: 'no-store' });
        const data = await res.json();
        if (active && Array.isArray(data)) setItems(data);
      } catch {}
    };
    load();
    return () => { active = false; };
  }, []);

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [] as Array<{ title: string; slug?: string; imageUrl?: string }>;
    return items
      .filter(p => (p.title || '').toLowerCase().includes(q))
      .slice(0, 6);
  }, [items, query]);

  return (
    <>
      <SEOHead 
        title="404 - Страница не найдена | Fullhouse"
        description="Запрашиваемая страница не найдена. Воспользуйтесь поиском или вернитесь на главную страницу сайта Fullhouse."
        statusCode={404}
        noindex={true}
      />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
      <div className="w-full max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-extrabold text-slate-800 mb-2">404</h1>
          <p className="text-lg text-slate-600">Страница не найдена. Давайте найдём то, что вы искали.</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-3 mb-8">
          <Link to="/" className="fh-btn-secondary h-11 rounded-lg flex items-center justify-center">На главную</Link>
          <Link to="/projects" className="fh-btn-primary h-11 rounded-lg flex items-center justify-center">Каталог проектов</Link>
          <Link to="/realized" className="fh-btn-secondary h-11 rounded-lg flex items-center justify-center">Реализованные</Link>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <label className="block text-sm text-slate-500 mb-2">Быстрый поиск проекта</label>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Введите название (например, Лион, Пескара)"
            className="w-full h-11 px-4 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
          />

          {suggestions.length > 0 && (
            <div className="mt-4 grid sm:grid-cols-2 gap-3">
              {suggestions.map((p, idx) => (
                <Link key={`${p.slug || p.title}-${idx}`} to={p.slug ? `/projects/${p.slug}` : '/projects'} className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50">
                  {p.imageUrl ? (
                    <img src={p.imageUrl} alt={p.title} className="w-14 h-14 object-cover rounded-md bg-white" loading="lazy" />
                  ) : (
                    <div className="w-14 h-14 rounded-md bg-slate-100" />
                  )}
                  <div className="text-sm font-medium text-slate-800">{p.title}</div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      </div>
    </>
  );
};

export default NotFound;
