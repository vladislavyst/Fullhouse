import { useEffect } from 'react';

interface SEOConfig {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  structuredData?: object;
  // Новые поля для расширенной SEO
  lsiKeywords?: string[];
  semanticPhrases?: string[];
  localKeywords?: string[];
  longTailKeywords?: string[];
  // Дополнительно
  hreflangs?: { hrefLang: string; href: string }[];
}

export const useSEO = (config: SEOConfig) => {
  useEffect(() => {
    // Обновляем title
    document.title = config.title;
    
    // Обновляем meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', config.description);
    
    // Обновляем keywords с расширенной семантикой
    if (config.keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      
      // Формируем расширенные ключевые слова
      let extendedKeywords = config.keywords;
      
      // Добавляем LSI-слова
      if (config.lsiKeywords) {
        extendedKeywords += ', ' + config.lsiKeywords.join(', ');
      }
      
      // Добавляем локальные ключевые слова
      if (config.localKeywords) {
        extendedKeywords += ', ' + config.localKeywords.join(', ');
      }
      
      // Добавляем длинные хвосты
      if (config.longTailKeywords) {
        extendedKeywords += ', ' + config.longTailKeywords.join(', ');
      }
      
      metaKeywords.setAttribute('content', extendedKeywords);
    }
    
    // Обновляем Open Graph теги
    const ogTags = [
      { property: 'og:title', content: config.title },
      { property: 'og:description', content: config.description },
      { property: 'og:type', content: config.type || 'website' },
      { property: 'og:url', content: config.url || window.location.href },
      { property: 'og:image', content: config.image || '/Forest Residence.jpeg' }
    ];
    
    ogTags.forEach(tag => {
      let metaTag = document.querySelector(`meta[property="${tag.property}"]`);
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('property', tag.property);
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute('content', tag.content);
    });
    
    // Обновляем Twitter Card теги
    const twitterTags = [
      { name: 'twitter:title', content: config.title },
      { name: 'twitter:description', content: config.description },
      { name: 'twitter:image', content: config.image || '/Forest Residence.jpeg' }
    ];
    
    twitterTags.forEach(tag => {
      let metaTag = document.querySelector(`meta[name="${tag.name}"]`);
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('name', tag.name);
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute('content', tag.content);
    });
    
    // Обновляем canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', config.url || window.location.href);
    
    // Обновляем hreflang ссылки, если переданы
    const existingHrefLangs = Array.from(document.querySelectorAll('link[rel="alternate"][hreflang]'));
    existingHrefLangs.forEach((ln) => ln.parentNode?.removeChild(ln));
    if (config.hreflangs && config.hreflangs.length > 0) {
      config.hreflangs.forEach(({ hrefLang, href }) => {
        const link = document.createElement('link');
        link.setAttribute('rel', 'alternate');
        link.setAttribute('hreflang', hrefLang);
        link.setAttribute('href', href);
        document.head.appendChild(link);
      });
    }
    
    // Добавляем структурированные данные если есть
    if (config.structuredData) {
      // Удаляем существующий JSON-LD если есть
      const existingScript = document.querySelector('script[type="application/ld+json"]');
      if (existingScript) {
        existingScript.remove();
      }
      
      // Добавляем новый JSON-LD
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(config.structuredData);
      document.head.appendChild(script);
      
      // Очистка при размонтировании
      return () => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      };
    }
  }, [config]);
};

// Расширенные SEO-конфигурации с LSI-словами и семантикой
export const seoConfigs = {
  home: {
    title: "Fullhouse - Строительство домов под ключ в Новороссийске | Строительная компания №1",
    description: "🏠 Строительство частных домов и коттеджей под ключ в Новороссийске. ⭐ 3 года опыта, 50+ проектов, 95% довольных клиентов. Полный цикл от проекта до ключей. Гарантия качества!",
    keywords: "строительство домов Новороссийск, дома под ключ, строительная компания, коттеджи, частные дома, проекты домов, строительство Краснодарский край, недвижимость Новороссийск",
    type: "website" as const,
    // LSI-слова для главной страницы
    lsiKeywords: [
      "загородное строительство", "индивидуальное жилье", "монолитное строительство", 
      "кирпичные дома", "каркасные технологии", "энергоэффективность", "теплоизоляция",
      "инженерные коммуникации", "ландшафтный дизайн", "благоустройство территории"
    ],
    // Локальные ключевые слова
    localKeywords: [
      "Новороссийск строительство", "Краснодарский край дома", "Анапа коттеджи",
      "Геленджик недвижимость", "Сочи строительство", "Краснодар дома под ключ"
    ],
    // Длинные хвосты
    longTailKeywords: [
      "сколько стоит построить дом в Новороссийске", "строительство дома под ключ цены 2024",
      "лучшие строительные компании Новороссийска", "проекты домов для семьи с детьми",
      "строительство энергоэффективного дома", "отзывы о строительстве домов"
    ],
    structuredData: [
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Fullhouse - Строительная компания",
        "url": "https://sk-fullhouse.com",
        "description": "Строительство домов под ключ в Новороссийске",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://sk-fullhouse.com/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Fullhouse",
        "url": "https://sk-fullhouse.com",
        "logo": "https://sk-fullhouse.com/Logonew.png",
        "contactPoint": [{
          "@type": "ContactPoint",
          "telephone": "+7-918-040-04-02",
          "contactType": "customer service",
          "areaServed": "RU",
          "availableLanguage": ["ru"]
        }],
        "sameAs": []
      }
    ]
  },
  
  projects: {
    title: "Проекты домов и коттеджей | Fullhouse Новороссийск",
    description: "Каталог готовых проектов домов и коттеджей от строительной компании Fullhouse. Фото, планировки, цены. Выберите свой идеальный дом!",
    keywords: "проекты домов, готовые проекты, коттеджи, планировки домов, строительство домов Новороссийск",
    type: "website" as const,
    lsiKeywords: [
      "типовые проекты", "индивидуальное проектирование", "планировка помещений",
      "архитектурные решения", "дизайн фасадов", "внутренняя отделка",
      "материалы строительства", "технологии возведения", "сроки строительства"
    ],
    localKeywords: [
      "проекты домов Новороссийск", "коттеджи Краснодарский край", "планировки домов Анапа"
    ],
    longTailKeywords: [
      "проект дома 150 кв м Новороссийск", "готовые проекты коттеджей с гаражом",
      "проекты домов в стиле модерн", "планировка дома для большой семьи"
    ],
    structuredData: [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {"@type": "ListItem", "position": 1, "name": "Главная", "item": "https://sk-fullhouse.com/"},
          {"@type": "ListItem", "position": 2, "name": "Проекты", "item": "https://sk-fullhouse.com/projects"}
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Проекты домов и коттеджей",
        "description": "Каталог готовых проектов от Fullhouse"
      }
    ]
  },
  
  services: {
    title: "Строительные услуги | Fullhouse Новороссийск",
    description: "Полный спектр строительных услуг: проектирование, строительство домов под ключ, отделочные работы, ремонт. Гарантия качества!",
    keywords: "строительные услуги, проектирование, отделочные работы, ремонт, строительство под ключ",
    type: "website" as const,
    lsiKeywords: [
      "нулевой цикл", "фундаментные работы", "стеновые конструкции", "кровельные работы",
      "сантехнические работы", "электромонтаж", "вентиляция и кондиционирование",
      "теплые полы", "системы безопасности", "автоматизация дома"
    ],
    localKeywords: [
      "строительные услуги Новороссийск", "ремонт квартир Краснодарский край",
      "отделочные работы Анапа", "проектирование домов Геленджик"
    ],
    longTailKeywords: [
      "строительство дома под ключ стоимость", "ремонт квартиры под ключ цены",
      "отделочные работы в новостройке", "проектирование частного дома"
    ],
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Строительные услуги",
      "provider": {
        "@type": "Organization",
        "name": "Fullhouse"
      },
      "serviceType": "Строительство домов под ключ"
    }
  },
  
  contact: {
    title: "Контакты | Fullhouse Новороссийск",
    description: "Свяжитесь с нами для заказа строительства дома. Адрес, телефон, email. Бесплатная консультация и расчет стоимости!",
    keywords: "контакты Fullhouse, строительная компания Новороссийск, заказать строительство дома",
    type: "website" as const,
    lsiKeywords: [
      "бесплатная консультация", "выезд специалиста", "замеры и расчеты",
      "техническое задание", "смета строительства", "договор подряда",
      "гарантийное обслуживание", "послепродажная поддержка"
    ],
    localKeywords: [
      "строительная компания Новороссийск контакты", "заказать дом Краснодарский край",
      "консультация по строительству Анапа", "расчет стоимости дома Геленджик"
    ],
    longTailKeywords: [
      "бесплатная консультация по строительству дома", "выезд специалиста на участок",
      "расчет стоимости строительства онлайн", "заказать звонок строительной компании"
    ],
    structuredData: [
      {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "Контакты Fullhouse",
        "description": "Свяжитесь с нами для заказа строительства"
      },
      {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Fullhouse",
        "image": "https://sk-fullhouse.com/Logonew.png",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "ул. Хворостьянского, 4",
          "addressLocality": "Новороссийск",
          "postalCode": "353900",
          "addressCountry": "RU"
        },
        "telephone": "+7-918-040-04-02",
        "openingHours": [
          "Mo-Fr 09:00-18:00",
          "Sa 10:00-16:00",
          "Su 10:00-14:00"
        ],
        "url": "https://sk-fullhouse.com/contact"
      }
    ]
  }
};

// Специальные конфигурации для проектов
export const projectSeoConfigs = {
  forestResidence: {
    title: "Forest Residence - Премиальная резиденция 350 м² в Адрау-Дюрсо | Fullhouse",
    description: "Готовый дом 350 м² с панорамными окнами и премиум отделкой. Фото, видео, планировки. Строительная компания Fullhouse.",
    keywords: "Forest Residence, готовый дом, Адрау-Дюрсо, премиум недвижимость, 350 кв м",
    lsiKeywords: [
      "премиум отделка", "панорамные окна", "терраса", "камин", "винный погреб",
      "домашний кинотеатр", "спортзал", "бассейн", "сауна", "гараж на 2 машины"
    ],
    localKeywords: [
      "готовый дом Адрау-Дюрсо", "недвижимость Краснодарский край", "премиум дома Новороссийск"
    ],
    longTailKeywords: [
      "купить готовый дом 350 кв м Адрау-Дюрсо", "премиум резиденция с панорамными окнами",
      "готовый дом с террасой и камином", "недвижимость премиум класса Краснодарский край"
    ]
  },
  
  luckyHouse: {
    title: "Lucky House - Готовый дом в центре Новороссийска | Fullhouse",
    description: "Современный готовый дом в центре Новороссийска. Качественная отделка, удобная планировка. Фото, цены, описание.",
    keywords: "Lucky House, готовый дом, центр Новороссийска, современная отделка",
    lsiKeywords: [
      "современная отделка", "открытая планировка", "евроремонт", "встроенная мебель",
      "умный дом", "система безопасности", "парковка", "детская площадка"
    ],
    localKeywords: [
      "готовый дом центр Новороссийска", "недвижимость центр города", "современные дома Краснодарский край"
    ],
    longTailKeywords: [
      "купить готовый дом в центре Новороссийска", "современный дом с евроремонтом",
      "готовый дом с открытой планировкой", "недвижимость центр города Новороссийск"
    ]
  }
};

// Утилиты для работы с ключевыми словами
export const seoUtils = {
  // Генерация LSI-слов на основе основного ключа
  generateLSIKeywords: (mainKeyword: string): string[] => {
    const lsiMap: { [key: string]: string[] } = {
      "строительство домов": [
        "загородное строительство", "индивидуальное жилье", "монолитное строительство",
        "кирпичные дома", "каркасные технологии", "энергоэффективность", "теплоизоляция"
      ],
      "проекты домов": [
        "типовые проекты", "индивидуальное проектирование", "планировка помещений",
        "архитектурные решения", "дизайн фасадов", "внутренняя отделка"
      ],
      "строительные услуги": [
        "нулевой цикл", "фундаментные работы", "стеновые конструкции", "кровельные работы",
        "сантехнические работы", "электромонтаж", "вентиляция и кондиционирование"
      ]
    };
    
    return lsiMap[mainKeyword] || [];
  },
  
  // Генерация локальных ключевых слов
  generateLocalKeywords: (city: string, region: string): string[] => {
    return [
      `${city} строительство`, `${region} дома`, `${city} недвижимость`,
      `${city} коттеджи`, `${city} строительная компания`, `${city} дома под ключ`
    ];
  },
  
  // Генерация длинных хвостов
  generateLongTailKeywords: (mainKeyword: string, city: string): string[] => {
    return [
      `сколько стоит ${mainKeyword} в ${city}`,
      `${mainKeyword} цены 2024 ${city}`,
      `лучшие компании по ${mainKeyword} ${city}`,
      `заказать ${mainKeyword} ${city}`,
      `${mainKeyword} отзывы ${city}`
    ];
  }
};
