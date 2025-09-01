# SEO-оптимизация сайта Fullhouse

## Обзор

Этот документ описывает все SEO-улучшения, внедренные на сайте строительной компании Fullhouse.

## Внедренные компоненты

### 1. Глобальный SEO-хук (`useSEO`)
- **Файл**: `src/hooks/useSEO.ts`
- **Функции**:
  - Автоматическое обновление мета-тегов
  - Open Graph и Twitter Cards
  - Структурированные данные JSON-LD
  - Canonical URL

### 2. Хлебные крошки (`Breadcrumbs`)
- **Файл**: `src/components/Breadcrumbs.tsx`
- **SEO-преимущества**:
  - Микроразметка Schema.org BreadcrumbList
  - Улучшенная навигация для пользователей и поисковых систем

### 3. FAQ-секция (`FAQSection`)
- **Файл**: `src/components/FAQSection.tsx`
- **SEO-преимущества**:
  - Микроразметка Schema.org FAQPage
  - Дополнительные ключевые слова
  - Улучшение пользовательского опыта

### 4. Оптимизированные изображения (`OptimizedImage`)
- **Файл**: `src/components/OptimizedImage.tsx`
- **Функции**:
  - Ленивая загрузка (`loading="lazy"`)
  - Обработка ошибок загрузки
  - Поддержка микроразметки



### 5. Оптимизатор производительности (`PerformanceOptimizer`)
- **Файл**: `src/components/PerformanceOptimizer.tsx`
- **Функции**:
  - Предзагрузка критических ресурсов
  - DNS prefetch
  - Мета-теги для производительности

### 6. Микроразметка контактов (`ContactSchema`)
- **Файл**: `src/components/ContactSchema.tsx`
- **Функции**:
  - Структурированные данные для организации
  - Контактная информация для поисковых систем

### 7. Отзывы клиентов (`ReviewsSection`) - НОВЫЙ!
- **Файл**: `src/components/ReviewsSection.tsx`
- **SEO-преимущества**:
  - Микроразметка Schema.org Review и AggregateRating
  - Улучшение доверия пользователей
  - Дополнительные ключевые слова
  - Rich snippets в поисковой выдаче



## Использование

### Базовое использование SEO-хука

```tsx
import { useSEO, seoConfigs } from '@/hooks/useSEO';

const MyPage = () => {
  // Используем предустановленную конфигурацию
  useSEO(seoConfigs.home);
  
  // Или создаем собственную
  useSEO({
    title: "Мой заголовок",
    description: "Мое описание",
    keywords: "ключевые, слова",
    structuredData: { /* JSON-LD данные */ }
  });
  
  return <div>...</div>;
};
```

### Добавление хлебных крошек

```tsx
import Breadcrumbs from '@/components/Breadcrumbs';

const MyPage = () => {
  return (
    <div>
      <Header />
      <Breadcrumbs 
        items={[
          { label: 'Раздел', path: '/section' },
          { label: 'Страница', path: '/section/page', current: true }
        ]} 
      />
      <main>...</main>
    </div>
  );
};
```

### Добавление FAQ-секции

```tsx
import FAQSection from '@/components/FAQSection';

const MyPage = () => {
  const faqItems = [
    {
      question: "Какой вопрос?",
      answer: "Какой ответ."
    }
  ];
  
  return (
    <FAQSection 
      title="Часто задаваемые вопросы"
      items={faqItems}
    />
  );
};
```

### Добавление отзывов клиентов

```tsx
import ReviewsSection from '@/components/ReviewsSection';

const MyPage = () => {
  const reviews = [
    {
      id: "1",
      author: "Иван Иванов",
      rating: 5,
      date: "2024-01-15",
      text: "Отличная работа!",
      verified: true
    }
  ];
  
  return (
    <ReviewsSection 
      title="Отзывы наших клиентов"
      reviews={reviews}
      averageRating={4.8}
      totalReviews={50}
    />
  );
};
```



## SEO-конфигурации по страницам

### Главная страница (`seoConfigs.home`)
- **Title**: "Fullhouse - Строительство домов под ключ в Новороссийске | Строительная компания №1"
- **Description**: Описание компании с эмодзи и ключевыми преимуществами
- **Keywords**: Основные ключевые слова по строительству
- **Structured Data**: WebSite с поисковым действием

### Проекты (`seoConfigs.projects`)
- **Title**: "Проекты домов и коттеджей | Fullhouse Новороссийск"
- **Description**: Описание каталога проектов
- **Keywords**: Ключевые слова по проектам домов
- **Structured Data**: ItemList с проектами

### Услуги (`seoConfigs.services`)
- **Title**: "Строительные услуги | Fullhouse Новороссийск"
- **Description**: Описание спектра услуг
- **Keywords**: Ключевые слова по услугам
- **Structured Data**: Service с провайдером

### Контакты (`seoConfigs.contact`)
- **Title**: "Контакты | Fullhouse Новороссийск"
- **Description**: Описание контактной информации
- **Keywords**: Ключевые слова по контактам
- **Structured Data**: ContactPage

## Файлы для поисковых систем

### 1. `sitemap.xml`
- Автоматически обновляемый sitemap
- Приоритеты для разных страниц
- Частота обновления

### 2. `robots.txt`
- Разрешения для поисковых роботов
- Указание на sitemap
- Запрет на служебные файлы

## Новые SEO-возможности

### 1. Микроразметка отзывов
- **Schema.org Review** для каждого отзыва
- **AggregateRating** для общего рейтинга
- **Rich snippets** в поисковой выдаче
- Улучшение доверия и CTR

### 2. Карта сайта для пользователей
- Удобная навигация по всем разделам
- Внутренние ссылки для SEO
- Улучшение пользовательского опыта
- Снижение bounce rate

### 3. Расширенная микроразметка контактов
- **PostalAddress** для адреса
- **ContactPoint** для телефонов
- **OpeningHoursSpecification** для режима работы
- **Place** для карты

## Рекомендации по дальнейшему развитию

### 1. Аналитика
- Интеграция с Google Analytics 4
- Google Search Console
- Yandex.Metrika

### 2. Производительность
- Сжатие изображений (WebP)
- Минификация CSS/JS
- Кэширование на уровне сервера

### 3. Контент
- Регулярное обновление проектов
- Блог с полезными статьями
- Отзывы клиентов с микроразметкой

### 4. Локальное SEO
- Google My Business
- Yandex.Справочник
- Отзывы на картах

### 5. Дополнительные микроразметки
- **Article** для блога
- **Event** для мероприятий
- **Product** для строительных материалов
- **LocalBusiness** для локального SEO

## Проверка SEO

### Инструменты для проверки
1. **Google PageSpeed Insights** - производительность
2. **Google Rich Results Test** - структурированные данные
3. **Schema.org Validator** - валидация микроразметки
4. **Screaming Frog** - технический аудит
5. **Ahrefs/SEMrush** - анализ ключевых слов

### Ключевые метрики
- Core Web Vitals
- Время загрузки страницы
- Индексация в поисковых системах
- Позиции по ключевым запросам
- Rich snippets в выдаче

## Поддержка

При возникновении вопросов по SEO-оптимизации обращайтесь к команде разработки.

---

*Последнее обновление: Январь 2024*
