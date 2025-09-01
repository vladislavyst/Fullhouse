import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Share2, Eye } from 'lucide-react';
import { useHoverAnimation } from '@/hooks/useScrollAnimation';
import OptimizedImage from './OptimizedImage';

interface InteractiveCardProps {
  title: string;
  description?: string;
  image?: string;
  placeholder?: string;
  price?: string;
  area?: string;
  status?: string;
  features?: string[];
  location?: string;
  completion?: string;
  slug?: string;
  onFavorite?: () => void;
  onShare?: () => void;
  onView?: () => void;
  className?: string;
  variant?: 'default' | 'elevated' | 'glass' | 'gradient';
  animation?: 'lift' | 'glow' | 'scale';
}

const InteractiveCard = ({
  title,
  description,
  image,
  placeholder,
  price,
  area,
  status,
  features = [],
  location,
  completion,
  slug,
  onFavorite,
  onShare,
  onView,
  className = '',
  variant = 'default',
  animation = 'lift'
}: InteractiveCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { ref } = useHoverAnimation(animation);

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    onFavorite?.();
  };

  const handleShare = () => {
    onShare?.();
    // Показываем уведомление о копировании ссылки
    if (navigator.share) {
      navigator.share({
        title: title,
        text: description || '',
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'elevated':
        return 'bg-white shadow-lg hover:shadow-2xl border-0';
      case 'glass':
        return 'bg-white/80 backdrop-blur-md border border-white/20 shadow-lg';
      case 'gradient':
        return 'bg-gradient-to-br from-white to-blue-50 border border-blue-200 shadow-lg';
      default:
        return 'bg-white border border-gray-200 shadow-lg';
    }
  };

  const getAnimationClasses = () => {
    switch (animation) {
      case 'lift':
        return 'hover-lift';
      case 'glow':
        return 'hover-glow';
      case 'scale':
        return 'hover:scale-105 transition-transform duration-300';
      default:
        return 'hover-lift';
    }
  };

  return (
    <Card
      className={`group overflow-hidden transition-all duration-500 ease-out ${getVariantClasses()} ${getAnimationClasses()} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Section */}
      <div className="relative overflow-hidden">
        <OptimizedImage
          src={image || ''}
          alt={title}
          placeholder={placeholder}
          aspectRatio="video"
          className="w-full h-48 object-cover"
        />
        
        {/* Status Badge */}
        {status && (
          <div className="absolute top-3 left-3">
            <Badge 
              variant="default"
              className={`text-xs px-2 py-1 transition-all duration-300 ${
                status === 'Завершен' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-amber-500 text-white'
              }`}
            >
              {status}
            </Badge>
          </div>
        )}

        {/* Action Buttons */}
        <div className={`absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
        }`}>
          {onFavorite && (
            <Button
              size="sm"
              variant="secondary"
              className="w-8 h-8 p-0 rounded-full bg-white/90 hover:bg-white shadow-lg"
              onClick={handleFavorite}
            >
              <Heart 
                className={`w-4 h-4 transition-all duration-300 ${
                  isFavorite ? 'text-red-500 fill-current' : 'text-gray-600'
                }`}
              />
            </Button>
          )}
          
          {onShare && (
            <Button
              size="sm"
              variant="secondary"
              className="w-8 h-8 p-0 rounded-full bg-white/90 hover:bg-white shadow-lg"
              onClick={handleShare}
            >
              <Share2 className="w-4 h-4 text-gray-600" />
            </Button>
          )}
        </div>

        {/* Hover Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="absolute bottom-3 left-3 right-3">
            <Button 
              variant="secondary" 
              size="sm" 
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0 text-xs py-1"
              onClick={onView}
            >
              <Eye className="w-3 h-3 mr-1" />
              Подробнее
            </Button>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <CardContent className="p-4">
        {/* Title */}
        <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
          {title}
        </h3>
        
        {/* Price */}
        {price && (
          <div className="text-blue-600 font-semibold text-sm mb-3">{price}</div>
        )}
        
        {/* Description */}
        {description && (
          <p className="text-slate-600 mb-3 text-xs leading-relaxed line-clamp-3">
            {description}
          </p>
        )}

        {/* Project Details */}
        {(location || completion || area) && (
          <div className="grid grid-cols-3 gap-2 mb-3">
            {location && (
              <div className="text-center">
                <div className="text-xs text-slate-500 mb-1">📍</div>
                <div className="text-xs font-medium text-slate-800 truncate">{location}</div>
              </div>
            )}
            {completion && (
              <div className="text-center">
                <div className="text-xs text-slate-500 mb-1">📅</div>
                <div className="text-xs font-medium text-slate-800">{completion}</div>
              </div>
            )}
            {area && (
              <div className="text-center">
                <div className="text-xs text-slate-500 mb-1">🏠</div>
                <div className="text-xs font-medium text-slate-800">{area}</div>
              </div>
            )}
          </div>
        )}

        {/* Features */}
        {features.length > 0 && (
          <div className="grid grid-cols-2 gap-1">
            {features.slice(0, 4).map((feature, index) => (
              <div key={index} className="flex items-center space-x-1 text-xs">
                <div className="w-1 h-1 bg-blue-600 rounded-full flex-shrink-0"></div>
                <span className="text-slate-500 truncate">{feature}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InteractiveCard;
