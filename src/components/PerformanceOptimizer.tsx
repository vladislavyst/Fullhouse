import { useEffect } from 'react';

interface PerformanceOptimizerProps {
  preloadImages?: string[];
  preloadVideos?: string[];
}

const PerformanceOptimizer = ({ preloadImages = [], preloadVideos = [] }: PerformanceOptimizerProps) => {
  useEffect(() => {
    // Предзагрузка критически важных изображений
    preloadImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });

    // Предзагрузка видео
    preloadVideos.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'video';
      link.href = src;
      document.head.appendChild(link);
    });

    // Добавляем мета-теги для производительности
    const performanceMetaTags = [
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=5.0' },
      { name: 'theme-color', content: '#3B82F6' },
      { name: 'msapplication-TileColor', content: '#3B82F6' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
      { name: 'apple-mobile-web-app-title', content: 'Fullhouse' },
      { name: 'mobile-web-app-capable', content: 'yes' }
    ];

    performanceMetaTags.forEach(tag => {
      let metaTag = document.querySelector(`meta[name="${tag.name}"]`);
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('name', tag.name);
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute('content', tag.content);
    });

    // Добавляем DNS prefetch для внешних ресурсов
    const dnsPrefetch = [
      '//fonts.googleapis.com',
      '//fonts.gstatic.com',
      '//www.google-analytics.com'
    ];

    dnsPrefetch.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = domain;
      document.head.appendChild(link);
    });

    // Очистка при размонтировании
    return () => {
      // Удаляем добавленные теги
      document.querySelectorAll('link[rel="preload"]').forEach(link => {
        if (link.parentNode) {
          link.parentNode.removeChild(link);
        }
      });
      
      document.querySelectorAll('link[rel="dns-prefetch"]').forEach(link => {
        if (link.parentNode) {
          link.parentNode.removeChild(link);
        }
      });
    };
  }, [preloadImages, preloadVideos]);

  return null; // Компонент не рендерит ничего
};

export default PerformanceOptimizer;
