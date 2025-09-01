import { useEffect, useRef } from 'react';

interface YandexMapProps {
  center?: [number, number];
  zoom?: number;
  className?: string;
  height?: string;
}

declare global {
  interface Window {
    ymaps: any;
  }
}

const YandexMap = ({ 
  center = [44.68098, 37.79033], // Новороссийск, ул. Хворостьянского, 4
  zoom = 12,
  className = "w-full",
  height = "400px"
}: YandexMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);

  useEffect(() => {
    // Загружаем Яндекс карты
    const loadYandexMaps = () => {
      if (window.ymaps) {
        initMap();
        return;
      }

      const script = document.createElement('script');
      script.src = `https://api-maps.yandex.ru/2.1/?apikey=bedb53fa-f659-43c3-a541-845e8e017a7b&lang=ru_RU`;
      script.async = true;
      script.onload = initMap;
      document.head.appendChild(script);
    };

    const initMap = () => {
      if (!mapRef.current || !window.ymaps) return;

      window.ymaps.ready(() => {
        // Создаем карту
        mapInstance.current = new window.ymaps.Map(mapRef.current, {
          center: center,
          zoom: zoom,
          controls: ['zoomControl', 'fullscreenControl', 'geolocationControl']
        });

        // Добавляем метку офиса
        const officePlacemark = new window.ymaps.Placemark(
          center,
          {
            balloonContent: `
              <div class="p-4">
                <h3 class="font-bold text-lg mb-2">Fullhouse</h3>
                <p class="text-gray-600">Строительная компания</p>
                <p class="text-gray-600 mt-2">г. Новороссийск, ул. Хворостьянского, 4</p>
                <p class="text-gray-600">(бывшая ул. Молодежная, 4)</p>
              </div>
            `,
            hintContent: 'Fullhouse - Строительная компания'
          },
          {
            preset: 'islands#blueStretchyIcon',
            iconColor: '#3B82F6'
          }
        );

        mapInstance.current.geoObjects.add(officePlacemark);

        // Добавляем другие важные точки
        const points = [
          {
            coords: [44.68098, 37.79033],
            title: 'Центральный офис',
            description: 'ул. Хворостьянского, 4 (бывшая ул. Молодежная, 4)'
          },
          {
            coords: [44.685000, 37.795000],
            title: 'Строительная площадка',
            description: 'Активные проекты'
          }
        ];

        points.forEach(point => {
          const placemark = new window.ymaps.Placemark(
            point.coords,
            {
              balloonContent: `
                <div class="p-3">
                  <h4 class="font-semibold text-base mb-1">${point.title}</h4>
                  <p class="text-gray-600 text-sm">${point.description}</p>
                </div>
              `,
              hintContent: point.title
            },
            {
              preset: 'islands#blueDotIcon',
              iconColor: '#10B981'
            }
          );
          mapInstance.current.geoObjects.add(placemark);
        });
      });
    };

    loadYandexMaps();

    // Очистка при размонтировании
    return () => {
      if (mapInstance.current) {
        mapInstance.current.destroy();
      }
    };
  }, [center, zoom]);

  return (
    <div className={`${className} rounded-lg overflow-hidden shadow-lg`}>
      <div 
        ref={mapRef} 
        style={{ height }}
        className="w-full"
      />
    </div>
  );
};

export default YandexMap;
