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

const LuckyHouse = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useEffect(() => {
    document.title = "Lucky House - Семейный дом 280 м² в г.Сочи | Строительство под ключ Fullhouse";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Lucky House - готовый семейный дом 280 м² в г.Сочи. Современный дизайн, функциональная планировка, гараж. Фото, видео-тур готового объекта.');
    }
  }, []);
  
  const allImages = [
    { src: "/Lucky House.jpeg", alt: "Главное фото", type: "image" },
    { src: "/Lucky House/Lucky.mp4", alt: "Видео", type: "video" },
    { src: "/Lucky House/[BraveDown.Com] [VK Video] [1756666964] .mp4", alt: "Обзор проекта", type: "video" },
    { src: "/Lucky House/05ae3776-869e-11f0-bea6-00163e00d5dd.jpeg", alt: "Интерьер", type: "image" },
    { src: "/Lucky House/0d7d8c8a-869f-11f0-83b2-00163e00d5dd.jpeg", alt: "Экстерьер", type: "image" },
    { src: "/Lucky House/218ec28e-869f-11f0-89ba-00163e00d5dd.jpeg", alt: "Терраса", type: "image" },
    { src: "/Lucky House/3398e5b8-869f-11f0-ab51-00163e00d5dd.jpeg", alt: "Кухня", type: "image" },
    { src: "/Lucky House/362a6f78-869e-11f0-b6af-00163e00d5dd.jpeg", alt: "Гостиная", type: "image" },
    { src: "/Lucky House/451c842a-869f-11f0-9d28-00163e00d5dd.jpeg", alt: "Спальня", type: "image" },
    { src: "/Lucky House/5147549c-869e-11f0-9e6e-00163e00d5dd.jpeg", alt: "Ванная", type: "image" },
    { src: "/Lucky House/6aedd5d8-869e-11f0-9a40-00163e00d5dd.jpeg", alt: "Детали", type: "image" },
    { src: "/Lucky House/79036ca6-869d-11f0-9c10-00163e00d5dd.jpeg", alt: "Фасад", type: "image" },
    { src: "/Lucky House/7f9885a0-869e-11f0-9df8-00163e00d5dd.jpeg", alt: "Планировка", type: "image" },
    { src: "/Lucky House/90ef3cdc-869d-11f0-8bf1-00163e00d5dd.jpeg", alt: "Дизайн", type: "image" },
    { src: "/Lucky House/92261692-869e-11f0-aa7d-00163e00d5dd.jpeg", alt: "Отделка", type: "image" },
    { src: "/Lucky House/a53b3744-869e-11f0-aeb0-00163e00d5dd.jpeg", alt: "Освещение", type: "image" },
    { src: "/Lucky House/a7acd1f0-869d-11f0-8ea3-00163e00d5dd.jpeg", alt: "Мебель", type: "image" },
    { src: "/Lucky House/c30e1da0-869d-11f0-879e-00163e00d5dd.jpeg", alt: "Комфорт", type: "image" },
    { src: "/Lucky House/dbd8687c-869d-11f0-8549-00163e00d5dd.jpeg", alt: "Уют", type: "image" },
    { src: "/Lucky House/f1bf1d5c-869d-11f0-ad98-00163e00d5dd.jpeg", alt: "Стиль", type: "image" },
    { src: "/Lucky House/f8a4f410-869e-11f0-a302-00163e00d5dd.jpeg", alt: "Завершение", type: "image" }
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
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100">
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
            
            <h1 className="text-4xl lg:text-6xl font-bold text-slate-800 mb-6">
              Lucky House
            </h1>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center space-x-2">
                <Square className="w-5 h-5 text-blue-600" />
                <span className="text-slate-600">280 м²</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                <span className="text-slate-600">Завершен в 2024</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                <span className="text-slate-600">г.Сочи</span>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {/* Hero Image Carousel */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">
                Галерея проекта Lucky House
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
                              poster="/Lucky House.jpeg"
                              muted
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
                        poster="/Lucky House.jpeg"
                      >
                        <source src={allImages[selectedImageIndex].src} type="video/mp4" />
                        Ваш браузер не поддерживает воспроизведение видео.
                      </video>
                    ) : (
                      <img 
                        src={allImages[selectedImageIndex].src} 
                        alt={allImages[selectedImageIndex].alt}
                        className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
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
                      <p className="text-white text-base bg-black/60 px-4 py-2 rounded-full backdrop-blur-sm">
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
                  Пролистайте для просмотра всех материалов проекта: 18 фото + 2 видео
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
                        poster="/Lucky House.jpeg"
                        onPlay={() => setIsVideoPlaying(true)}
                        onPause={() => setIsVideoPlaying(false)}
                        onEnded={() => setIsVideoPlaying(false)}
                      >
                        <source src="/Lucky House/Lucky.mp4" type="video/mp4" />
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
                      {allImages.slice(0, 12).map((item, index) => (
                        <div 
                          key={index}
                          className="relative group cursor-pointer"
                          onClick={() => openModal(index)}
                        >
                          {item.type === "video" ? (
                            <>
                              <video 
                                className="rounded-lg h-24 lg:h-28 w-full object-cover"
                                poster="/Lucky House.jpeg"
                                muted
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
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 rounded-lg flex items-center justify-center">
                                <ZoomIn className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" />
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 text-center">
                      <p className="text-sm text-slate-600">
                        Показано 12 из {allImages.length} материалов. Все доступны в карусели выше.
                      </p>
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
                    <p className="text-slate-600 mb-6 leading-relaxed">
                      Lucky House — это уютный семейный дом, созданный для комфортной жизни. 
                      Современный дизайн сочетается с функциональной планировкой, 
                      обеспечивая максимальное удобство для всей семьи.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-6 mb-6">
                      <div>
                        <h3 className="font-semibold text-slate-800 mb-2">Характеристики</h3>
                        <ul className="space-y-1 text-sm text-slate-600">
                          <li>• Общая площадь: 280 м²</li>
                          <li>• Этажность: 2 этажа</li>
                          <li>• Спальни: 3</li>
                          <li>• Санузлы: 2</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800 mb-2">Особенности</h3>
                        <ul className="space-y-1 text-sm text-slate-600">
                          <li>• Семейный дом</li>
                          <li>• Современный дизайн</li>
                          <li>• Гараж на 2 авто</li>
                          <li>• Ландшафтный дизайн</li>
                        </ul>
                      </div>
                    </div>

                    <Button size="lg" className="w-full fh-btn-primary" asChild>
                      <Link to="/contact">
                        Заказать похожий проект
                      </Link>
                    </Button>
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
                        <strong className="text-slate-800">Фундамент:</strong> Ленточный армированный
                      </div>
                      <div>
                        <strong className="text-slate-800">Стены:</strong> Кирпич + утеплитель
                      </div>
                      <div>
                        <strong className="text-slate-800">Кровля:</strong> Гибкая черепица
                      </div>
                      <div>
                        <strong className="text-slate-800">Отопление:</strong> Автономное газовое
                      </div>
                      <div>
                        <strong className="text-slate-800">Окна:</strong> ПВХ с тройным остеклением
                      </div>
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

export default LuckyHouse;
