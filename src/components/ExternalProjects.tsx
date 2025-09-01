import { useEffect, useMemo, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, ImageIcon } from 'lucide-react';

type ExternalProject = {
  title: string;
  url: string;
  imageUrl?: string;
};

/**
 * Fetches projects HTML via Vite proxy and extracts first three projects.
 * Falls back gracefully if the remote site blocks requests or markup changes.
 */
const ExternalProjects = () => {
  const [projects, setProjects] = useState<ExternalProject[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        setHasError(false);
        const response = await fetch('/api/kapitaldom/proyekty/', {
          method: 'GET',
          headers: {
            Accept: 'text/html,application/xhtml+xml,application/xml',
          },
          cache: 'no-store',
        });
        if (!response.ok) throw new Error(`Bad status ${response.status}`);
        const htmlText = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlText, 'text/html');

        // Try multiple selectors to be resilient to markup differences
        const candidateLists: Element[][] = [];
        const selectors = [
          'main article',
          '.projects .project',
          '.project-list .project-item',
          '.entry-content article',
          'article a[href]',
        ];
        for (const selector of selectors) {
          const nodes = Array.from(doc.querySelectorAll(selector));
          if (nodes.length >= 1) candidateLists.push(nodes);
        }

        const pickFrom: Element[] = candidateLists[0] ?? [];
        const extracted: ExternalProject[] = [];

        for (const node of pickFrom) {
          if (extracted.length >= 3) break;
          // Find clickable element
          const anchor = (node.matches('a') ? (node as HTMLAnchorElement) : (node.querySelector('a') as HTMLAnchorElement | null));
          if (!anchor || !anchor.href) continue;
          // Find title
          const titleNode = node.querySelector('h2, h3, .title, .entry-title') ?? anchor;
          const title = (titleNode?.textContent ?? '').trim();
          if (!title) continue;
          // Find image
          const img = (node.querySelector('img') as HTMLImageElement | null) ?? (anchor.querySelector?.('img') as HTMLImageElement | null);
          const imageUrl = img?.getAttribute('data-src') || img?.getAttribute('src') || undefined;
          extracted.push({ title, url: anchor.href, imageUrl });
        }

        if (isMounted) {
          if (extracted.length === 0) {
            setHasError(true);
            setProjects([]);
          } else {
            setProjects(extracted.slice(0, 3));
          }
        }
      } catch {
        if (isMounted) {
          setHasError(true);
          setProjects([]);
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchProjects();
    return () => {
      isMounted = false;
    };
  }, []);

  const content = useMemo(() => {
    if (isLoading) {
      return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 3 }).map((_, index) => (
            <Card key={index} className="border-0 bg-white overflow-hidden">
              <div className="w-full h-56 bg-muted animate-pulse" />
              <CardContent className="p-6">
                <div className="h-6 w-2/3 bg-muted animate-pulse rounded mb-3" />
                <div className="h-4 w-full bg-muted animate-pulse rounded mb-2" />
                <div className="h-4 w-5/6 bg-muted animate-pulse rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
      );
    }

    if (hasError || !projects || projects.length === 0) {
      return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 3 }).map((_, index) => (
            <Card key={index} className="border-0 bg-white overflow-hidden">
              <div className="w-full h-56 bg-gradient-to-br from-muted to-muted/60 flex items-center justify-center">
                <ImageIcon className="h-10 w-10 text-muted-foreground" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-primary mb-2">Проект недоступен</h3>
                <p className="text-sm text-muted-foreground">Не удалось загрузить данные. Перейдите на сайт, чтобы посмотреть проекты.</p>
              </CardContent>
            </Card>
          ))}
        </div>
      );
    }

    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <Card key={index} className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-0 bg-white">
            <a href={project.url} target="_blank" rel="noopener noreferrer" className="block">
              <div className="relative overflow-hidden">
                {project.imageUrl ? (
                  <img src={project.imageUrl} alt={project.title} className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105" />
                ) : (
                  <div className="w-full h-56 bg-gradient-to-br from-muted to-muted/60 flex items-center justify-center">
                    <ImageIcon className="h-10 w-10 text-muted-foreground" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </a>
            <CardContent className="p-6">
              <a href={project.url} target="_blank" rel="noopener noreferrer" className="block">
                <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
              </a>
              <div className="flex justify-between items-center">
                <a href={project.url} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="gap-2">
                    Открыть <ExternalLink className="h-4 w-4" />
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }, [hasError, isLoading, projects]);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-4 py-2 text-sm font-medium text-primary mb-4">
            <span>Подборка</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-4">Проекты</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Три актуальные карточки проектов с сайта kapitaldom.com. Полный список по кнопке ниже.
          </p>
        </div>

        {content}

        {/* CTA */}
        <div className="text-center mt-12">
          <a href="https://kapitaldom.com/proyekty/" target="_blank" rel="noopener noreferrer">
            <Button variant="accent" size="lg" className="gap-2">
              Смотреть все проекты <ExternalLink className="h-4 w-4" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ExternalProjects;


