import { Award, Users, TrendingUp, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useState, useEffect, useRef } from 'react';

// Анимированный счетчик
const AnimatedCounter = ({ targetValue, suffix = '', easeType = 'easeOut', isAnimationActive, animationStartTime }) => {
  const [currentValue, setCurrentValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Функции easing
  const easingFunctions = {
    linear: (t) => t,
    easeOut: (t) => 1 - Math.pow(1 - t, 3), // быстро начинает, медленно заканчивает
    easeInOut: (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2, // плавно медленно
    easeIn: (t) => t * t * t // медленно начинает, быстро заканчивает
  };

  useEffect(() => {
    if (!isAnimationActive || hasAnimated) return;

    const totalDuration = 10000; // 10 секунд для всех
    const startTime = animationStartTime;
    const endTime = startTime + totalDuration;

    const updateCounter = () => {
      const now = Date.now();
      
      if (now >= endTime) {
        setCurrentValue(targetValue);
        setHasAnimated(true); // Помечаем что анимация завершена
        return;
      }

      const progress = Math.min((now - startTime) / totalDuration, 1);
      const easingFunction = easingFunctions[easeType] || easingFunctions.easeOut;
      const easeProgress = easingFunction(progress);
      const value = Math.floor(easeProgress * targetValue);
      
      setCurrentValue(value);
      requestAnimationFrame(updateCounter);
    };

    updateCounter();
  }, [isAnimationActive, targetValue, easeType, animationStartTime, hasAnimated]);

  return (
    <span>
      {currentValue}{suffix}
    </span>
  );
};

const Stats = () => {
  const [isAnimationActive, setIsAnimationActive] = useState(false);
  const [animationStartTime, setAnimationStartTime] = useState(0);
  const [hasTriggered, setHasTriggered] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered) {
          setHasTriggered(true); // Помечаем что анимация уже была запущена
          setAnimationStartTime(Date.now());
          setIsAnimationActive(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasTriggered]);

  const stats = [
    {
      icon: Clock,
      targetNumber: 15,
      suffix: '+',
      label: 'лет на рынке',
      description: 'Работаем с 2008 года',
      easeType: 'linear' // равномерно медленно
    },
    {
      icon: TrendingUp,
      targetNumber: 2500,
      suffix: '+',
      label: 'объектов продано',
      description: 'Успешных сделок',
      easeType: 'easeOut' // быстро начинает, медленно заканчивает
    },
    {
      icon: Users,
      targetNumber: 5000,
      suffix: '+',
      label: 'довольных клиентов',
      description: 'Рекомендуют нас друзьям',
      easeType: 'easeOut' // быстро начинает, медленно заканчивает
    },
    {
      icon: Award,
      targetNumber: 98,
      suffix: '%',
      label: 'положительных отзывов',
      description: 'Высокий рейтинг качества',
      easeType: 'easeInOut' // плавно медленно
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 dark:from-gray-900 dark:via-slate-900 dark:to-black">
      <div className="container mx-auto px-4">
        {/* Statistics */}
        <div ref={sectionRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-8 hover:shadow-2xl transition-all duration-300 hover:scale-105 shadow-lg dark:shadow-gray-900/50">
              <CardContent className="p-0">
                <div className="bg-gradient-to-br from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  <AnimatedCounter 
                    targetValue={stat.targetNumber} 
                    suffix={stat.suffix}
                    easeType={stat.easeType}
                    isAnimationActive={isAnimationActive}
                    animationStartTime={animationStartTime}
                  />
                </div>
                <div className="text-lg font-semibold text-slate-800 dark:text-white mb-1">{stat.label}</div>
                <div className="text-sm text-slate-600 dark:text-gray-300">{stat.description}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
