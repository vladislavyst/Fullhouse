import { ArrowLeft, Play, Image as ImageIcon, Square, Calendar, MapPin, ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useState, useEffect } from 'react';

const ForestResidence = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useEffect(() => {
    // Основные SEO мета-теги
    document.title = "Forest Residence - Премиальная резиденция 350 м² в Адрау-Дюрсо | Fullhouse";
    
    // Обновляем meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Forest Residence - готовый дом 350 м² в Адрау-Дюрсо. Премиальная резиденция с панорамными окнами, террасой и премиум отделкой. Фото, видео-тур, планировка. Строительная компания Fullhouse.');

    // Добавляем Open Graph мета-теги
    const ogTags = [
      { property: 'og:title', content: 'Forest Residence - Премиальная резиденция 350 м² в Адрау-Дюрсо' },
      { property: 'og:description', content: 'Готовый дом 350 м² с панорамными окнами, террасой и премиум отделкой в лесной зоне Адрау-Дюрсо' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: window.location.href },
      { property: 'og:image', content: '/Forest Residence.jpeg' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:site_name', content: 'Fullhouse - Строительная компания' },
      { property: 'og:locale', content: 'ru_RU' }
    ];

    // Добавляем Twitter Card мета-теги
    const twitterTags = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Forest Residence - Премиальная резиденция 350 м²' },
      { name: 'twitter:description', content: 'Готовый дом с панорамными окнами и премиум отделкой в Адрау-Дюрсо' },
      { name: 'twitter:image', content: '/Forest Residence.jpeg' }
    ];

    // Добавляем дополнительные SEO мета-теги
    const additionalTags = [
      { name: 'keywords', content: 'Forest Residence, готовый дом, резиденция, Адрау-Дюрсо, 350 м², панорамные окна, премиум отделка, строительная компания, Fullhouse' },
      { name: 'author', content: 'Fullhouse' },
      { name: 'robots', content: 'index, follow' },
      { name: 'canonical', content: window.location.href }
    ];

    // Функция для добавления мета-тегов
    const addMetaTags = (tags: Array<{ property?: string, name?: string, content: string }>) => {
      tags.forEach(tag => {
        const selector = tag.property ? `meta[property="${tag.property}"]` : `meta[name="${tag.name}"]`;
        let metaTag = document.querySelector(selector);
        
        if (!metaTag) {
          metaTag = document.createElement('meta');
          if (tag.property) {
            metaTag.setAttribute('property', tag.property);
          } else if (tag.name) {
            metaTag.setAttribute('name', tag.name);
          }
          document.head.appendChild(metaTag);
        }
        metaTag.setAttribute('content', tag.content);
      });
    };

    addMetaTags([...ogTags, ...twitterTags, ...additionalTags]);

    // Добавляем структурированные данные JSON-LD
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "House",
      "name": "Forest Residence",
      "description": "Премиальная резиденция 350 м² в Адрау-Дюрсо с панорамными окнами и премиум отделкой",
      "image": [
        "/Forest Residence.jpeg",
        "/Forest/forest 2.jpeg",
        "/Forest/forest 3.jpeg"
      ],
      "floorSize": "350",
      "numberOfRooms": "8",
      "numberOfBedrooms": "4",
      "numberOfBathrooms": "3",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Адрау-Дюрсо",
        "addressRegion": "Краснодарский край",
        "addressCountry": "RU"
      },
      "offers": {
        "@type": "Offer",
        "availability": "https://schema.org/InStock",
        "category": "Готовый дом"
      },
      "provider": {
        "@type": "Organization",
        "name": "Fullhouse",
        "url": "https://fullhouse-neo.ru"
      }
    };

    // Удаляем существующий JSON-LD если есть
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Добавляем новый JSON-LD
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    // Очистка при размонтировании
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);
  
  const allImages = [
    { src: "/Forest Residence.jpeg", alt: "Forest Residence - премиальная резиденция 350 м² в Адрау-Дюрсо, главный фасад", type: "image" },
    { src: "/Forest/Forest VID.mp4", alt: "Forest Residence - видео-обзор готового дома с панорамными окнами", type: "video" },
    { src: "/Forest/forest 2.jpeg", alt: "Forest Residence - современный интерьер с премиум отделкой", type: "image" },
    { src: "/Forest/forest 3.jpeg", alt: "Forest Residence - экстерьер дома в лесной зоне", type: "image" },
    { src: "/Forest/forest 4.jpeg", alt: "Forest Residence - открытая терраса для отдыха", type: "image" },
    { src: "/Forest/forest 5.jpeg", alt: "Forest Residence - современная кухня с качественной отделкой", type: "image" },
    { src: "/Forest/forest 6.jpeg", alt: "Forest Residence - просторная гостиная с панорамными окнами", type: "image" },
    { src: "/Forest/forest 7.jpeg", alt: "Forest Residence - уютная спальня с видом на лес", type: "image" },
    { src: "/Forest/forest 8.jpeg", alt: "Forest Residence - ванная комната с премиум сантехникой", type: "image" },
    { src: "/Forest/DeWatermark.ai_1756664614661.jpeg", alt: "Forest Residence - архитектурные детали и отделка", type: "image" },
    { src: "/Forest/wmremove-transformed.jpeg", alt: "Forest Residence - фасад дома с современным дизайном", type: "image" },
    { src: "/Forest/wmremove-transformed (1).jpeg", alt: "Forest Residence - общий вид резиденции в природном окружении", type: "image" }
  ];

  const openModal = (index: number) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isModalOpen) return;
      
      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          prevImage();
          break;
        case 'ArrowRight':
          event.preventDefault();
          nextImage();
          break;
        case 'Escape':
          event.preventDefault();
          setIsModalOpen(false);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  return (
    <div className="min-h-screen bg-background" itemScope itemType="https://schema.org/Organization">
      <Header />
      
      {/* Breadcrumbs для SEO */}
      <nav className="bg-blue-50/50 py-3 border-b border-blue-100" aria-label="Хлебные крошки">
        <div className="container mx-auto px-4">
          <ol className="flex items-center space-x-2 text-sm text-slate-600" itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link to="/" className="hover:text-blue-600 transition-colors" itemProp="item">
                <span itemProp="name">Главная</span>
              </Link>
              <meta itemProp="position" content="1" />
            </li>
            <li className="flex items-center" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <ChevronRight className="w-4 h-4 mx-1 text-blue-400" />
              <Link to="/projects" className="hover:text-blue-600 transition-colors" itemProp="item">
                <span itemProp="name">Проекты</span>
              </Link>
              <meta itemProp="position" content="2" />
            </li>
            <li className="flex items-center" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <ChevronRight className="w-4 h-4 mx-1 text-blue-400" />
              <span className="text-blue-600 font-medium" aria-current="page" itemProp="item">
                <span itemProp="name">Forest Residence</span>
              </span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </div>
      </nav>
      
      {/* SEO: Информация об организации */}
      <div itemProp="name" className="hidden">Fullhouse - Строительная компания</div>
      <div itemProp="url" className="hidden">https://fullhouse-neo.ru</div>
      <div itemProp="description" className="hidden">Строительная компания Fullhouse специализируется на строительстве премиальных домов и резиденций в Краснодарском крае</div>
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100" itemScope itemType="https://schema.org/House">
          <div className="container mx-auto px-4">
            <div className="flex items-center space-x-4 mb-6">
              <Button variant="outline" size="sm" className="border-blue-200 text-blue-600 hover:bg-blue-50" asChild>
                <Link to="/projects">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Назад к проектам
                </Link>
              </Button>
              <Badge className="bg-blue-600 text-white border-0">Завершен</Badge>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-slate-800 mb-6" itemProp="name">
              Forest Residence
            </h1>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center space-x-2">
                <Square className="w-5 h-5 text-blue-600" />
                <span className="text-slate-600" itemProp="floorSize">350 м²</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                <span className="text-slate-600">Завершен в 2024</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                <span className="text-slate-600" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                  <span itemProp="addressLocality">Адрау-Дюрсо</span>
                </span>
              </div>
            </div>
            
            {/* SEO: Предложение для поисковых систем */}
            <div itemProp="offers" itemScope itemType="https://schema.org/Offer" className="hidden">
              <meta itemProp="availability" content="https://schema.org/InStock" />
              <meta itemProp="category" content="Готовый дом" />
              <meta itemProp="priceCurrency" content="RUB" />
              <span itemProp="description">Премиальная резиденция Forest Residence готова к показу</span>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {/* Hero Image Carousel */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">
                Галерея проекта Forest Residence
              </h2>
              
              <Carousel className="w-full max-w-6xl mx-auto">
                <CarouselContent>
                  {allImages.map((item, index) => (
                    <CarouselItem key={index}>
                      <Card 
                        className="overflow-hidden border-0 shadow-2xl cursor-pointer group relative"
                        onClick={() => openModal(index)}
                      >
                        {item.type === "video" ? (
                          <>
                            <video 
                              className="w-full h-[600px] lg:h-[700px] object-cover"
                              poster="/Forest Residence.jpeg"
                              muted
                              itemProp="video"
                            >
                              <source src={item.src} type="video/mp4" />
                            </video>
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                              <Play className="w-16 h-16 text-white opacity-80 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" />
                            </div>
                            <div className="absolute bottom-4 left-4">
                              <Badge className="bg-black/70 text-white border-0">
                                <Play className="w-3 h-3 mr-1" />
                                Видео
                              </Badge>
                            </div>
                          </>
                        ) : (
                          <>
                            <img 
                              src={item.src} 
                              alt={item.alt}
                              className="w-full h-[600px] lg:h-[700px] object-cover group-hover:scale-105 transition-transform duration-500"
                              itemProp="image"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                              <ZoomIn className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" />
                            </div>
                          </>
                        )}
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-4 bg-white/80 hover:bg-white border-0 shadow-lg" />
                <CarouselNext className="right-4 bg-white/80 hover:bg-white border-0 shadow-lg" />
              </Carousel>

              {/* Full Screen Image Modal */}
              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="max-w-[98vw] max-h-[98vh] p-0 border-0 bg-black/95">
                  <div className="relative w-full h-full flex items-center justify-center">
                    {/* Main Media */}
                    {allImages[selectedImageIndex].type === "video" ? (
                      <video 
                        controls 
                        autoPlay
                        className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                        poster="/Forest Residence.jpeg"
                        itemProp="video"
                      >
                        <source src={allImages[selectedImageIndex].src} type="video/mp4" />
                        Ваш браузер не поддерживает воспроизведение видео.
                      </video>
                    ) : (
                      <img 
                        src={allImages[selectedImageIndex].src} 
                        alt={allImages[selectedImageIndex].alt}
                        className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                        itemProp="image"
                      />
                    )}
                    
                    {/* Navigation Buttons */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 h-12 w-12 bg-black/30"
                      onClick={prevImage}
                    >
                      <ChevronLeft className="h-8 w-8" />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 h-12 w-12 bg-black/30"
                      onClick={nextImage}
                    >
                      <ChevronRight className="h-8 w-8" />
                    </Button>
                    
                    {/* Close Button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-4 right-4 text-white hover:bg-white/20 h-10 w-10 bg-black/30"
                      onClick={() => setIsModalOpen(false)}
                    >
                      <X className="h-6 w-6" />
                    </Button>
                    
                    {/* Image Counter */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge variant="secondary" className="bg-black/50 text-white border-white/20 text-base px-3 py-1">
                        {selectedImageIndex + 1} / {allImages.length}
                      </Badge>
                    </div>
                    
                    {/* Image Description */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                      <p className="text-white text-base bg-black/60 px-4 py-2 rounded-full backdrop-blur-sm" itemProp="description">
                        {allImages[selectedImageIndex].alt}
                      </p>
                    </div>
                    
                    {/* Keyboard Navigation Hint */}
                    <div className="absolute bottom-4 right-4">
                      <p className="text-white/70 text-xs bg-black/40 px-2 py-1 rounded">
                        ← → для навигации
                      </p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              
              {/* Media Counter and Instructions */}
              <div className="text-center mt-6 space-y-2">
                <p className="text-slate-600">
                  Пролистайте для просмотра всех материалов проекта: 11 фото + видео-тур
                </p>
                <p className="text-sm text-blue-600 font-medium flex items-center justify-center gap-2">
                  <ZoomIn className="w-4 h-4" />
                  Нажмите для просмотра в полном разрешении
                </p>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Video Section */}
              <div className="space-y-8">
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative">
                      <video 
                        controls 
                        className="w-full h-80 lg:h-96 object-cover rounded-lg"
                        poster="/Forest Residence.jpeg"
                        onPlay={() => setIsVideoPlaying(true)}
                        onPause={() => setIsVideoPlaying(false)}
                        onEnded={() => setIsVideoPlaying(false)}
                        itemProp="video"
                      >
                        <source src="/Forest/Forest VID.mp4" type="video/mp4" />
                        Ваш браузер не поддерживает воспроизведение видео.
                      </video>
                      {!isVideoPlaying && (
                        <div className="absolute bottom-4 left-4">
                          <Badge className="bg-black/70 text-white border-0">
                            <Play className="w-3 h-3 mr-1" />
                            Видео
                          </Badge>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Interactive Thumbnail Gallery */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                      <ImageIcon className="w-5 h-5 mr-2 text-blue-600" />
                      Быстрый просмотр
                    </h3>
                    <div className="grid grid-cols-3 lg:grid-cols-4 gap-3">
                      {allImages.map((item, index) => (
                        <div 
                          key={index}
                          className="relative group cursor-pointer"
                          onClick={() => openModal(index)}
                        >
                          {item.type === "video" ? (
                            <>
                              <video 
                                className="rounded-lg h-24 lg:h-28 w-full object-cover"
                                poster="/Forest Residence.jpeg"
                                muted
                                itemProp="video"
                              >
                                <source src={item.src} type="video/mp4" />
                              </video>
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 rounded-lg flex items-center justify-center">
                                <Play className="w-6 h-6 text-white opacity-80 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" />
                              </div>
                              <div className="absolute bottom-1 left-1">
                                <Badge className="bg-black/70 text-white border-0 text-xs">
                                  Видео
                                </Badge>
                              </div>
                            </>
                          ) : (
                            <>
                              <img 
                                src={item.src} 
                                alt={item.alt}
                                className="rounded-lg h-24 lg:h-28 w-full object-cover hover:scale-110 transition-transform border-2 border-transparent hover:border-accent shadow-md hover:shadow-xl"
                                itemProp="image"
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 rounded-lg flex items-center justify-center">
                                <ZoomIn className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" />
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Project Details */}
              <div className="space-y-8">
                <Card>
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold text-slate-800 mb-6">
                      О проекте
                    </h2>
                    <p className="text-slate-600 mb-6 leading-relaxed" itemProp="description">
                      Премиальная резиденция Forest Residence — это воплощение современной архитектуры 
                      в гармонии с природой. Расположенная в живописной лесной зоне 
                      <span itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                        <span itemProp="addressLocality">Адрау-Дюрсо</span>, 
                        <span itemProp="addressRegion">Краснодарский край</span>
                      </span>, резиденция 
                      предлагает уединение и комфорт высочайшего уровня.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-6 mb-6">
                      <div>
                        <h3 className="font-semibold text-slate-800 mb-2">Характеристики</h3>
                        <ul className="space-y-1 text-sm text-slate-600">
                          <li itemProp="numberOfRooms">• Общая площадь: 350 м²</li>
                          <li>• Этажность: 2 этажа</li>
                          <li itemProp="numberOfBedrooms">• Спальни: 4</li>
                          <li itemProp="numberOfBathrooms">• Санузлы: 3</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800 mb-2">Особенности</h3>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>• Панорамные окна</li>
                          <li>• Лесная зона</li>
                          <li>• Терраса 50 м²</li>
                          <li>• Премиум отделка</li>
                        </ul>
                      </div>
                    </div>

                    <Button size="lg" className="w-full fh-btn-primary" asChild>
                      <Link to="/contact" itemProp="url">
                        Заказать похожий проект
                      </Link>
                    </Button>
                    
                    {/* SEO: Контактная информация */}
                    <div itemProp="contactPoint" itemScope itemType="https://schema.org/ContactPoint" className="hidden">
                      <meta itemProp="contactType" content="customer service" />
                      <meta itemProp="availableLanguage" content="Russian" />
                      <span itemProp="description">Свяжитесь с нами для заказа похожего проекта</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Technical Details */}
                <Card>
                  <CardContent className="p-8">
                    <h3 className="text-xl font-semibold text-slate-800 mb-4">
                      Технические решения
                    </h3>
                    <div className="space-y-4 text-sm text-slate-600">
                      <div>
                        <strong className="text-slate-800">Фундамент:</strong> Монолитная плита
                      </div>
                      <div>
                        <strong className="text-slate-800">Стены:</strong> Газобетон + облицовочный кирпич
                      </div>
                      <div>
                        <strong className="text-slate-800">Кровля:</strong> Металлочерепица
                      </div>
                      <div>
                        <strong className="text-slate-800">Отопление:</strong> Газовый котел + теплый пол
                      </div>
                      <div>
                        <strong className="text-slate-800">Окна:</strong> Энергосберегающие стеклопакеты
                      </div>
                      <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                        <strong className="text-slate-800">Адрес:</strong> 
                        <span itemProp="addressLocality">Адрау-Дюрсо</span>, 
                        <span itemProp="addressRegion">Краснодарский край</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* FAQ Section для SEO */}
                <Card>
                  <CardContent className="p-8">
                    <h3 className="text-xl font-semibold text-slate-800 mb-6">
                      Часто задаваемые вопросы
                    </h3>
                    <div className="space-y-6">
                      <details className="group">
                        <summary className="flex justify-between items-center cursor-pointer list-none text-slate-800 font-medium hover:text-blue-600 transition-colors">
                          <span>Где находится проект Forest Residence?</span>
                          <ChevronRight className="w-5 h-5 transform group-open:rotate-90 transition-transform text-blue-600" />
                        </summary>
                        <p className="mt-3 text-slate-600 text-sm leading-relaxed">
                          Проект Forest Residence расположен в живописной лесной зоне 
                          <span itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                            <span itemProp="addressLocality">Адрау-Дюрсо</span>, 
                            <span itemProp="addressRegion">Краснодарский край</span>
                          </span>. 
                          Уникальное местоположение обеспечивает уединение и близость к природе.
                        </p>
                      </details>
                      
                      <details className="group">
                        <summary className="flex justify-between items-center cursor-pointer list-none text-slate-800 font-medium hover:text-blue-600 transition-colors">
                          <span>Какая площадь у резиденции?</span>
                          <ChevronRight className="w-5 h-5 transform group-open:rotate-90 transition-transform text-blue-600" />
                        </summary>
                        <p className="mt-3 text-slate-600 text-sm leading-relaxed">
                          Общая площадь Forest Residence составляет <span itemProp="floorSize">350 м²</span>. 
                          Дом имеет 2 этажа, <span itemProp="numberOfBedrooms">4 спальни</span>, 
                          <span itemProp="numberOfBathrooms">3 санузла</span> 
                          и просторную террасу площадью 50 м².
                        </p>
                      </details>
                      
                      <details className="group">
                        <summary className="flex justify-between items-center cursor-pointer list-none text-slate-800 font-medium hover:text-blue-600 transition-colors">
                          <span>Какие особенности отделки?</span>
                          <ChevronRight className="w-5 h-5 transform group-open:rotate-90 transition-transform text-blue-600" />
                        </summary>
                        <p className="mt-3 text-slate-600 text-sm leading-relaxed">
                          Резиденция выполнена с премиум отделкой: панорамные окна, качественные материалы, 
                          современная сантехника и продуманная планировка для максимального комфорта. 
                          <span itemProp="description">Это воплощение современной архитектуры в гармонии с природой.</span>
                        </p>
                      </details>
                      
                      <details className="group">
                        <summary className="flex justify-between items-center cursor-pointer list-none text-slate-800 font-medium hover:text-blue-600 transition-colors">
                          <span>Можно ли заказать похожий проект?</span>
                          <ChevronRight className="w-5 h-5 transform group-open:rotate-90 transition-transform text-blue-600" />
                        </summary>
                        <p className="mt-3 text-slate-600 text-sm leading-relaxed">
                          Да, <span itemProp="provider" itemScope itemType="https://schema.org/Organization">
                            <span itemProp="name">строительная компания Fullhouse</span>
                          </span> готова реализовать похожий проект под ваши требования. 
                          Свяжитесь с нами для обсуждения деталей и получения коммерческого предложения.
                        </p>
                      </details>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ForestResidence;
