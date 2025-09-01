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

const Parkfield = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    document.title = "Паркфилд - Элитный коттедж 420 м² в г. Краснодар | Строительство Fullhouse";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Паркфилд - элитный коттедж 420 м² в г. Краснодар с видом на парк. Просторные комнаты, изысканная отделка, большой двор. Фото готового проекта.');
    }
  }, []);
  
  const allImages = [
    { src: "/Паркфилд.jpeg", alt: "Главное фото", type: "image" },
    { src: "/Паркфилд/0627e370-86a1-11f0-9279-00163e00d5dd.jpeg", alt: "Интерьер", type: "image" },
    { src: "/Паркфилд/1df814de-86a1-11f0-a5dd-00163e00d5dd.jpeg", alt: "Экстерьер", type: "image" },
    { src: "/Паркфилд/33879fb8-86a1-11f0-8ac0-00163e00d5dd.jpeg", alt: "Терраса", type: "image" },
    { src: "/Паркфилд/5ec54248-86a1-11f0-9ff9-00163e00d5dd.jpeg", alt: "Кухня", type: "image" },
    { src: "/Паркфилд/7792f89c-86a1-11f0-9cdb-00163e00d5dd.jpeg", alt: "Гостиная", type: "image" },
    { src: "/Паркфилд/8ded46b0-86a1-11f0-91b9-00163e00d5dd.jpeg", alt: "Спальня", type: "image" },
    { src: "/Паркфилд/a78f6f30-86a1-11f0-b5a4-00163e00d5dd.jpeg", alt: "Ванная", type: "image" },
    { src: "/Паркфилд/aa88aa9a-86a0-11f0-92eb-00163e00d5dd.jpeg", alt: "Детали", type: "image" },
    { src: "/Паркфилд/bd8369d6-86a1-11f0-b4e4-00163e00d5dd.jpeg", alt: "Фасад", type: "image" },
    { src: "/Паркфилд/c05b3b62-86a0-11f0-a5b2-00163e00d5dd.jpeg", alt: "Планировка", type: "image" },
    { src: "/Паркфилд/d75c2a56-86a0-11f0-bc61-00163e00d5dd.jpeg", alt: "Дизайн", type: "image" },
    { src: "/Паркфилд/eb823c3c-86a0-11f0-bbb6-00163e00d5dd.jpeg", alt: "Отделка", type: "image" }
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
              Паркфилд
            </h1>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center space-x-2">
                <Square className="w-5 h-5 text-blue-600" />
                <span className="text-slate-600">420 м²</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                <span className="text-slate-600">Завершен в 2023</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                <span className="text-slate-600">г. Краснодар</span>
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
                Галерея проекта Паркфилд
              </h2>
              
              <Carousel className="w-full max-w-6xl mx-auto">
                <CarouselContent>
                  {allImages.map((item, index) => (
                    <CarouselItem key={index}>
                      <Card 
                        className="overflow-hidden border-0 shadow-2xl cursor-pointer group relative"
                        onClick={() => openModal(index)}
                      >
                        <img 
                          src={item.src} 
                          alt={item.alt}
                          className="w-full h-[600px] lg:h-[700px] object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                          <ZoomIn className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" />
                        </div>
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
                    {/* Main Image */}
                    <img 
                      src={allImages[selectedImageIndex].src} 
                      alt={allImages[selectedImageIndex].alt}
                      className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                    />
                    
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
              
              {/* Photo Counter and Instructions */}
              <div className="text-center mt-6 space-y-2">
                <p className="text-slate-600">
                  Пролистайте для просмотра всех 13 фотографий проекта
                </p>
                <p className="text-sm text-blue-600 font-medium flex items-center justify-center gap-2">
                  <ZoomIn className="w-4 h-4" />
                  Нажмите для просмотра в полном разрешении
                </p>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Interactive Thumbnail Gallery */}
              <div className="space-y-8">
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
                          <img 
                            src={item.src} 
                            alt={item.alt}
                            className="rounded-lg h-24 lg:h-28 w-full object-cover hover:scale-110 transition-transform border-2 border-transparent hover:border-accent shadow-md hover:shadow-xl"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 rounded-lg flex items-center justify-center">
                            <ZoomIn className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 text-center">
                      <p className="text-sm text-slate-600">
                        Показано 12 из {allImages.length} фотографий. Все доступны в карусели выше.
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
                      Паркфилд — это элитный коттедж с потрясающим видом на парк. 
                      Просторные комнаты, изысканная отделка и продуманная планировка 
                      создают атмосферу роскоши и комфорта.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-6 mb-6">
                      <div>
                        <h3 className="font-semibold text-slate-800 mb-2">Характеристики</h3>
                        <ul className="space-y-1 text-sm text-slate-600">
                          <li>• Общая площадь: 420 м²</li>
                          <li>• Этажность: 2 этажа</li>
                          <li>• Спальни: 5</li>
                          <li>• Санузлы: 4</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800 mb-2">Особенности</h3>
                        <ul className="space-y-1 text-sm text-slate-600">
                          <li>• Вид на парк</li>
                          <li>• Элитная отделка</li>
                          <li>• Большие комнаты</li>
                          <li>• Благоустроенный двор</li>
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
                        <strong className="text-slate-800">Фундамент:</strong> Монолитная плита
                      </div>
                      <div>
                        <strong className="text-slate-800">Стены:</strong> Кирпич + декоративная штукатурка
                      </div>
                      <div>
                        <strong className="text-slate-800">Кровля:</strong> Натуральная черепица
                      </div>
                      <div>
                        <strong className="text-slate-800">Отопление:</strong> Комбинированная система
                      </div>
                      <div>
                        <strong className="text-slate-800">Окна:</strong> Деревянные евроокна
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

export default Parkfield;
