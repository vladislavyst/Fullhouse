import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Bed, Square, Heart, Search, Filter } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppFloat from '../components/WhatsAppFloat';

const Catalog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [roomsFilter, setRoomsFilter] = useState('');
  const [districtFilter, setDistrictFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  useEffect(() => {
    document.title = "Каталог домов и коттеджей - Проекты под ключ в Новороссийске | Fullhouse";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Каталог проектов домов и коттеджей под ключ в Новороссийске. Более 15 готовых проектов от 5.8 млн руб. Планы, цены, сроки строительства. Строительная компания Fullhouse.');
    }
  }, []);

  // Extended properties data
  const allProperties = [
    {
      id: 1,
      title: '3-комн. квартира в ЖК "Морской бриз"',
      type: 'apartment',
      district: 'center',
      price: 8500000,
      area: 95,
      rooms: 3,
      floor: '7/12',
      address: 'ул. Набережная, 12',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop',
      features: ['Панорамные окна', 'Вид на море', 'Паркинг включен']
    },
    {
      id: 2,
      title: '2-комн. квартира с ремонтом',
      type: 'apartment',
      district: 'center',
      price: 6200000,
      area: 68,
      rooms: 2,
      floor: '5/9',
      address: 'ул. Советов, 45',
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop',
      features: ['Свежий ремонт', 'Центр города', 'Балкон']
    },
    {
      id: 3,
      title: '1-комн. квартира для инвестиций',
      type: 'apartment',
      district: 'eastern',
      price: 4100000,
      area: 42,
      rooms: 1,
      floor: '3/10',
      address: 'ул. Дзержинского, 88',
      image: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=600&h=400&fit=crop',
      features: ['Высокая доходность', 'Новостройка', 'Готова к сдаче']
    },
    {
      id: 4,
      title: 'Коттедж в элитном поселке',
      type: 'house',
      district: 'western',
      price: 25000000,
      area: 280,
      rooms: 5,
      floor: '2 этажа',
      address: 'пос. Южная Озереевка',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop',
      features: ['Участок 8 соток', 'Охраняемая территория', 'Ландшафт']
    },
    {
      id: 5,
      title: 'Офис в бизнес-центре',
      type: 'commercial',
      district: 'center',
      price: 15000000,
      area: 120,
      rooms: null,
      floor: '8/15',
      address: 'пр. Ленина, 25',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop',
      features: ['Класс А', 'Центр города', 'Паркинг']
    },
    {
      id: 6,
      title: 'Торговое помещение на первой линии',
      type: 'commercial',
      district: 'center',
      price: 18500000,
      area: 85,
      rooms: null,
      floor: '1/5',
      address: 'пр. Ленина, 105',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop',
      features: ['Первая линия', 'Высокая проходимость', 'Витрины']
    },
    {
      id: 7,
      title: '4-комн. квартира премиум-класса',
      type: 'apartment',
      district: 'primorsky',
      price: 12500000,
      area: 135,
      rooms: 4,
      floor: '10/16',
      address: 'ул. Морская, 8',
      image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&h=400&fit=crop',
      features: ['Премиум-класс', 'Панорамный вид', 'Два санузла']
    },
    {
      id: 8,
      title: 'Студия в новостройке',
      type: 'apartment',
      district: 'eastern',
      price: 3200000,
      area: 28,
      rooms: 1,
      floor: '4/12',
      address: 'ул. Видова, 15',
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop',
      features: ['Новостройка', 'Студия', 'От застройщика']
    }
  ];

  // Filter logic
  const filteredProperties = allProperties.filter(property => {
    const matchesSearch = !searchQuery || 
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.address.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPrice = !priceFilter || 
      (priceFilter === '0-5000000' && property.price <= 5000000) ||
      (priceFilter === '5000000-10000000' && property.price > 5000000 && property.price <= 10000000) ||
      (priceFilter === '10000000+' && property.price > 10000000);

    const matchesRooms = !roomsFilter || 
      (roomsFilter === '1' && property.rooms === 1) ||
      (roomsFilter === '2' && property.rooms === 2) ||
      (roomsFilter === '3' && property.rooms === 3) ||
      (roomsFilter === '4+' && property.rooms >= 4);

    const matchesDistrict = !districtFilter || property.district === districtFilter;
    const matchesType = !typeFilter || property.type === typeFilter;

    return matchesSearch && matchesPrice && matchesRooms && matchesDistrict && matchesType;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Header */}
        <section className="py-16 bg-gradient-subtle">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-primary mb-6">
              Каталог домов и коттеджей под ключ в Новороссийске
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Более 15 готовых проектов домов от 5.8 млн руб. 
              Планы, цены, сроки строительства. Найдите дом вашей мечты!
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-6 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Поиск по адресу или названию..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Тип" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Все типы</SelectItem>
                  <SelectItem value="apartment">Квартира</SelectItem>
                  <SelectItem value="house">Дом</SelectItem>
                  <SelectItem value="commercial">Коммерческая</SelectItem>
                </SelectContent>
              </Select>

              <Select value={districtFilter} onValueChange={setDistrictFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Район" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Все районы</SelectItem>
                  <SelectItem value="center">Центр</SelectItem>
                  <SelectItem value="eastern">Восточный</SelectItem>
                  <SelectItem value="western">Западный</SelectItem>
                  <SelectItem value="primorsky">Приморский</SelectItem>
                </SelectContent>
              </Select>

              <Select value={roomsFilter} onValueChange={setRoomsFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Комнаты" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Любое</SelectItem>
                  <SelectItem value="1">1 комната</SelectItem>
                  <SelectItem value="2">2 комнаты</SelectItem>
                  <SelectItem value="3">3 комнаты</SelectItem>
                  <SelectItem value="4+">4+ комнат</SelectItem>
                </SelectContent>
              </Select>

              <Select value={priceFilter} onValueChange={setPriceFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Цена" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Любая</SelectItem>
                  <SelectItem value="0-5000000">До 5 млн ₽</SelectItem>
                  <SelectItem value="5000000-10000000">5-10 млн ₽</SelectItem>
                  <SelectItem value="10000000+">Свыше 10 млн ₽</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-primary">
                Найдено объектов: {filteredProperties.length}
              </h2>
              <Button variant="outline" className="flex items-center space-x-2">
                <Filter className="w-4 h-4" />
                <span>Сортировать</span>
              </Button>
            </div>

            {/* Properties Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map((property) => (
                <Card key={property.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-0 bg-white">
                  {/* Property Image */}
                  <div className="relative overflow-hidden">
                    <img 
                      src={property.image} 
                      alt={`${property.title} - ${property.area} м², ${property.rooms} комн., ${property.address}, цена ${property.price.toLocaleString('ru-RU')} ₽`}
                      className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-success text-success-foreground">
                        Продается
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Button variant="ghost" size="sm" className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 w-10 h-10 p-0">
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <div className="text-white font-bold text-xl bg-black/50 backdrop-blur-sm px-3 py-1 rounded">
                        {property.price.toLocaleString('ru-RU')} ₽
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-primary mb-2 group-hover:text-accent transition-colors line-clamp-2">
                      {property.title}
                    </h3>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span>{property.address}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center space-x-2">
                          <Square className="w-4 h-4" />
                          <span>{property.area} м²</span>
                        </div>
                        {property.rooms && (
                          <div className="flex items-center space-x-2">
                            <Bed className="w-4 h-4" />
                            <span>{property.rooms} комн</span>
                          </div>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Этаж: {property.floor}
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-1 mb-4">
                      {property.features.slice(0, 3).map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2 text-xs">
                          <div className="w-1 h-1 bg-accent rounded-full"></div>
                          <span className="text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Button className="w-full">
                      Подробнее
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredProperties.length === 0 && (
              <div className="text-center py-16">
                <div className="text-gray-400 mb-4">
                  <Search className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  Ничего не найдено
                </h3>
                <p className="text-muted-foreground">
                  Попробуйте изменить параметры поиска
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Catalog;
