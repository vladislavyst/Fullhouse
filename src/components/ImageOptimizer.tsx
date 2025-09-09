import React, { useState, useCallback } from 'react';

interface ImageOptimizerProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  sizes?: string;
}

const ImageOptimizer: React.FC<ImageOptimizerProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  loading = 'lazy',
  priority = false,
  sizes
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  // Создаем srcSet для разных размеров экрана
  const generateSrcSet = useCallback((originalSrc: string) => {
    if (!width || !height) return undefined;
    
    const baseSrc = originalSrc.replace(/\.(jpg|jpeg|png)$/i, '');
    const ext = originalSrc.match(/\.(jpg|jpeg|png)$/i)?.[0] || '.jpg';
    
    // Для больших изображений создаем разные размеры
    if (width > 800) {
      return [
        `${baseSrc}-400w${ext} 400w`,
        `${baseSrc}-800w${ext} 800w`,
        `${baseSrc}-1200w${ext} 1200w`,
        `${originalSrc} ${width}w`
      ].join(', ');
    }
    
    return undefined;
  }, [width, height]);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const handleError = useCallback(() => {
    // Если изображение не загрузилось, попробуем fallback
    if (!hasError) {
      setHasError(true);
      // Можно добавить fallback изображение
      setCurrentSrc('/placeholder.svg');
    }
  }, [hasError]);

  const srcSet = generateSrcSet(src);

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ width, height }}>
      {/* Placeholder для предотвращения CLS */}
      {!isLoaded && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center"
          style={{ width, height }}
        >
          <div className="text-gray-400 text-xs">Загрузка...</div>
        </div>
      )}
      
      <img
        src={currentSrc}
        srcSet={srcSet}
        sizes={sizes || (width ? `${width}px` : '100vw')}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : loading}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        className={`transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={handleLoad}
        onError={handleError}
        style={{
          objectFit: 'cover',
          width: '100%',
          height: '100%'
        }}
      />
    </div>
  );
};

export default ImageOptimizer;
