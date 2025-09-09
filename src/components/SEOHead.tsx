import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonical?: string;
  noindex?: boolean;
  statusCode?: number;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'Fullhouse - Строительство домов под ключ в Новороссийске',
  description = 'Строительная компания Fullhouse. Строим дома под ключ в Новороссийске. ✓ Проекты ✓ Материалы ✓ Гарантия 3 года. Звоните: +7 918 040-04-02',
  canonical,
  noindex = false,
  statusCode
}) => {
  // Устанавливаем правильный статус код для 404 страниц
  useEffect(() => {
    if (statusCode === 404) {
      // Для SPA приложений мы можем только логировать 404
      // Фактический HTTP статус код устанавливается на сервере
      console.warn('404: Page not found');
      
      // Добавляем мета-тег для поисковых систем
      const metaStatus = document.createElement('meta');
      metaStatus.name = 'robots';
      metaStatus.content = 'noindex, nofollow';
      document.head.appendChild(metaStatus);
      
      return () => {
        document.head.removeChild(metaStatus);
      };
    }
  }, [statusCode]);

  // Обновляем заголовок страницы
  useEffect(() => {
    document.title = title;
    
    // Обновляем мета-описание
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }
    
    // Обновляем canonical URL если указан
    if (canonical) {
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', canonical);
    }
  }, [title, description, canonical]);

  return null;
};

export default SEOHead;
