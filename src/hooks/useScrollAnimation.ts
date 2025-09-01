import { useEffect, useRef, useState } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  delay?: number;
  animation?: 'fade-in' | 'slide-up' | 'slide-left' | 'slide-right' | 'scale-in' | 'float';
  duration?: number;
  easing?: 'ease-out' | 'ease-in' | 'ease-in-out' | 'cubic-bezier';
  stagger?: boolean;
  staggerDelay?: number;
  repeat?: boolean;
  direction?: 'normal' | 'reverse' | 'alternate';
}

export const useScrollAnimation = ({
  threshold = 0.1,
  delay = 0,
  animation = 'fade-in',
  duration = 800,
  easing = 'ease-out',
  stagger = false,
  staggerDelay = 100,
  repeat = false,
  direction = 'normal'
}: UseScrollAnimationOptions = {}) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
          setHasAnimated(true);
          
          // Добавляем CSS классы для анимации
          const animationClass = getAnimationClass(animation);
          element.classList.add(animationClass);
          
          // Если есть задержка, добавляем её
          if (delay > 0) {
            element.style.animationDelay = `${delay}ms`;
          }
          
          // Если анимация не должна повторяться, отключаем observer
          if (!repeat) {
            observer.disconnect();
          }
        } else if (!entry.isIntersecting && repeat) {
          setIsVisible(false);
          setHasAnimated(false);
          const animationClass = getAnimationClass(animation);
          element.classList.remove(animationClass);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, delay, animation, duration, easing, stagger, staggerDelay, repeat, direction, hasAnimated]);

  const getAnimationClass = (anim: string) => {
    switch (anim) {
      case 'fade-in':
        return 'animate-fade-in-up';
      case 'slide-up':
        return 'animate-slide-in-up';
      case 'slide-left':
        return 'animate-slide-in-left';
      case 'slide-right':
        return 'animate-slide-in-right';
      case 'scale-in':
        return 'animate-scale-in';
      case 'float':
        return 'animate-float';
      default:
        return 'animate-fade-in-up';
    }
  };

  const triggerAnimation = () => {
    if (ref.current) {
      setIsVisible(true);
      setHasAnimated(true);
      const animationClass = getAnimationClass(animation);
      ref.current.classList.add(animationClass);
    }
  };

  const resetAnimation = () => {
    if (ref.current) {
      setIsVisible(false);
      setHasAnimated(false);
      const animationClass = getAnimationClass(animation);
      ref.current.classList.remove(animationClass);
    }
  };

  return {
    ref,
    isVisible,
    hasAnimated,
    triggerAnimation,
    resetAnimation
  };
};

// Хук для stagger анимаций (каскадные анимации)
export const useStaggerAnimation = (items: any[], options: UseScrollAnimationOptions = {}) => {
  const refs = useRef<(HTMLElement | null)[]>([]);
  const [visibleItems, setVisibleItems] = useState<boolean[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setVisibleItems(prev => {
              const newState = [...prev];
              newState[index] = true;
              return newState;
            });
          }
        });
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    refs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [items, options.threshold]);

  const setRef = (index: number) => (el: HTMLElement | null) => {
    refs.current[index] = el;
  };

  return {
    refs,
    visibleItems,
    setRef
  };
};

// Хук для параллакс эффекта
export const useParallax = (speed: number = 0.5) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * speed;
      element.style.transform = `translateY(${rate}px)`;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return { ref };
};

// Хук для hover анимаций
export const useHoverAnimation = (animationType: 'lift' | 'glow' | 'scale' = 'lift') => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseEnter = () => {
      element.classList.add(`hover-${animationType}`);
    };

    const handleMouseLeave = () => {
      element.classList.remove(`hover-${animationType}`);
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [animationType]);

  return { ref };
};
