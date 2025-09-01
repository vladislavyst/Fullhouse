import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Search, 
  TrendingUp, 
  Target, 
  MapPin, 
  BarChart3, 
  Lightbulb,
  Copy,
  Check
} from 'lucide-react';

interface SemanticAnalysis {
  keyword: string;
  searchVolume: 'high' | 'medium' | 'low';
  competition: 'high' | 'medium' | 'low';
  lsiKeywords: string[];
  localVariations: string[];
  longTailVariations: string[];
  recommendations: string[];
}

interface SemanticAnalyzerProps {
  className?: string;
}

const SemanticAnalyzer = ({ className = '' }: SemanticAnalyzerProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [analysis, setAnalysis] = useState<SemanticAnalysis | null>(null);
  const [copiedKeyword, setCopiedKeyword] = useState<string | null>(null);

  // Предустановленные анализы для строительной отрасли
  const predefinedAnalyses: { [key: string]: SemanticAnalysis } = {
    "строительство домов": {
      keyword: "строительство домов",
      searchVolume: "high",
      competition: "high",
      lsiKeywords: [
        "загородное строительство", "индивидуальное жилье", "монолитное строительство",
        "кирпичные дома", "каркасные технологии", "энергоэффективность", "теплоизоляция",
        "инженерные коммуникации", "ландшафтный дизайн", "благоустройство территории"
      ],
      localVariations: [
        "строительство домов Новороссийск", "строительство домов Краснодарский край",
        "строительство домов Анапа", "строительство домов Геленджик",
        "строительство домов Сочи", "строительство домов Краснодар"
      ],
      longTailVariations: [
        "сколько стоит построить дом в Новороссийске",
        "строительство дома под ключ цены 2024",
        "лучшие строительные компании Новороссийска",
        "строительство дома для семьи с детьми",
        "строительство энергоэффективного дома",
        "отзывы о строительстве домов"
      ],
      recommendations: [
        "Используйте локальные ключевые слова с названиями городов",
        "Добавьте LSI-слова о технологиях строительства",
        "Создайте контент по длинным хвостам",
        "Используйте семантические фразы в заголовках H2-H6"
      ]
    },
    "проекты домов": {
      keyword: "проекты домов",
      searchVolume: "medium",
      competition: "medium",
      lsiKeywords: [
        "типовые проекты", "индивидуальное проектирование", "планировка помещений",
        "архитектурные решения", "дизайн фасадов", "внутренняя отделка",
        "материалы строительства", "технологии возведения", "сроки строительства"
      ],
      localVariations: [
        "проекты домов Новороссийск", "проекты домов Краснодарский край",
        "проекты домов Анапа", "проекты домов Геленджик"
      ],
      longTailVariations: [
        "проект дома 150 кв м Новороссийск",
        "готовые проекты коттеджей с гаражом",
        "проекты домов в стиле модерн",
        "планировка дома для большой семьи"
      ],
      recommendations: [
        "Создайте галерею проектов с детальными описаниями",
        "Добавьте калькулятор стоимости для каждого проекта",
        "Используйте микроразметку Schema.org для проектов",
        "Создайте страницы для каждого стиля архитектуры"
      ]
    },
    "дома под ключ": {
      keyword: "дома под ключ",
      searchVolume: "high",
      competition: "high",
      lsiKeywords: [
        "строительство под ключ", "отделочные работы", "инженерные системы",
        "благоустройство", "гарантия качества", "сроки сдачи",
        "материалы отделки", "дизайн интерьера", "мебель под заказ"
      ],
      localVariations: [
        "дома под ключ Новороссийск", "дома под ключ Краснодарский край",
        "дома под ключ Анапа", "дома под ключ Геленджик"
      ],
      longTailVariations: [
        "дом под ключ сколько стоит построить",
        "строительство дома под ключ 2024",
        "дом под ключ с отделкой и мебелью",
        "сроки строительства дома под ключ"
      ],
      recommendations: [
        "Создайте пошаговые инструкции строительства",
        "Добавьте видео-туры по готовым объектам",
        "Используйте отзывы клиентов с микроразметкой",
        "Создайте FAQ по строительству под ключ"
      ]
    }
  };

  const handleSearch = () => {
    const query = searchQuery.toLowerCase().trim();
    const foundAnalysis = predefinedAnalyses[query];
    
    if (foundAnalysis) {
      setAnalysis(foundAnalysis);
    } else {
      // Генерируем анализ на основе запроса
      setAnalysis({
        keyword: query,
        searchVolume: "medium",
        competition: "medium",
        lsiKeywords: generateLSIKeywords(query),
        localVariations: generateLocalVariations(query),
        longTailVariations: generateLongTailVariations(query),
        recommendations: generateRecommendations(query)
      });
    }
  };

  const generateLSIKeywords = (keyword: string): string[] => {
    const lsiMap: { [key: string]: string[] } = {
      "строительство": ["загородное", "индивидуальное", "монолитное", "кирпичное", "каркасное"],
      "дом": ["коттедж", "резиденция", "особняк", "вилла", "таунхаус"],
      "проект": ["типовой", "индивидуальный", "архитектурный", "дизайн", "планировка"],
      "ремонт": ["отделка", "евроремонт", "капитальный", "косметический", "дизайн"]
    };

    for (const [key, words] of Object.entries(lsiMap)) {
      if (keyword.includes(key)) {
        return words.map(word => `${word} ${keyword}`);
      }
    }

    return ["качественное", "профессиональное", "современное", "надежное", "эффективное"];
  };

  const generateLocalVariations = (keyword: string): string[] => {
    const cities = ["Новороссийск", "Краснодарский край", "Анапа", "Геленджик", "Сочи"];
    return cities.map(city => `${keyword} ${city}`);
  };

  const generateLongTailVariations = (keyword: string): string[] => {
    return [
      `сколько стоит ${keyword}`,
      `${keyword} цены 2024`,
      `лучшие компании по ${keyword}`,
      `заказать ${keyword}`,
      `${keyword} отзывы`
    ];
  };

  const generateRecommendations = (keyword: string): string[] => {
    return [
             `Создайте контент по запросу "${keyword}"`,
       `Используйте LSI-слова в заголовках и тексте`,
       `Добавьте локальные ключевые слова`,
       `Создайте страницы для длинных хвостов`
    ];
  };

  const copyKeyword = (keyword: string) => {
    navigator.clipboard.writeText(keyword);
    setCopiedKeyword(keyword);
    setTimeout(() => setCopiedKeyword(null), 2000);
  };

  const getVolumeColor = (volume: string) => {
    switch (volume) {
      case 'high': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCompetitionColor = (competition: string) => {
    switch (competition) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Поиск по ключевым словам */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Анализ семантики и ключевых слов
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <div className="flex-1">
              <Label htmlFor="keyword-search">Введите ключевое слово для анализа</Label>
              <Input
                id="keyword-search"
                placeholder="например: строительство домов, проекты домов, дома под ключ"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <Button onClick={handleSearch} className="mt-6">
              <Search className="w-4 h-4 mr-2" />
              Анализировать
            </Button>
          </div>
          
          <div className="mt-4 text-sm text-muted-foreground">
            Попробуйте: <Button variant="link" className="p-0 h-auto" onClick={() => setSearchQuery("строительство домов")}>строительство домов</Button>, 
            <Button variant="link" className="p-0 h-auto" onClick={() => setSearchQuery("проекты домов")}> проекты домов</Button>, 
            <Button variant="link" className="p-0 h-auto" onClick={() => setSearchQuery("дома под ключ")}> дома под ключ</Button>
          </div>
        </CardContent>
      </Card>

      {/* Результаты анализа */}
      {analysis && (
        <div className="space-y-6">
          {/* Основная информация */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Анализ ключевого слова: {analysis.keyword}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Объем поиска</Label>
                  <Badge className={getVolumeColor(analysis.searchVolume)}>
                    {analysis.searchVolume === 'high' ? 'Высокий' : 
                     analysis.searchVolume === 'medium' ? 'Средний' : 'Низкий'}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <Label>Конкуренция</Label>
                  <Badge className={getCompetitionColor(analysis.competition)}>
                    {analysis.competition === 'high' ? 'Высокая' : 
                     analysis.competition === 'medium' ? 'Средняя' : 'Низкая'}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* LSI-ключевые слова */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                LSI-ключевые слова (семантически связанные)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {analysis.lsiKeywords.map((keyword, index) => (
                  <Badge 
                    key={index} 
                    variant="outline" 
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                    onClick={() => copyKeyword(keyword)}
                  >
                    {keyword}
                    {copiedKeyword === keyword ? (
                      <Check className="w-3 h-3 ml-1" />
                    ) : (
                      <Copy className="w-3 h-3 ml-1" />
                    )}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Локальные вариации */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Локальные ключевые слова
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {analysis.localVariations.map((keyword, index) => (
                  <Badge 
                    key={index} 
                    variant="outline" 
                    className="cursor-pointer hover:bg-accent hover:text-accent-foreground"
                    onClick={() => copyKeyword(keyword)}
                  >
                    {keyword}
                    {copiedKeyword === keyword ? (
                      <Check className="w-3 h-3 ml-1" />
                    ) : (
                      <Copy className="w-3 h-3 ml-1" />
                    )}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Длинные хвосты */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Длинные хвосты (низкочастотные запросы)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {analysis.longTailVariations.map((keyword, index) => (
                  <Badge 
                    key={index} 
                    variant="outline" 
                    className="cursor-pointer hover:bg-green-100 hover:text-green-800"
                    onClick={() => copyKeyword(keyword)}
                  >
                    {keyword}
                    {copiedKeyword === keyword ? (
                      <Check className="w-3 h-3 ml-1" />
                    ) : (
                      <Copy className="w-3 h-3 ml-1" />
                    )}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Рекомендации */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                SEO-рекомендации
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {analysis.recommendations.map((recommendation, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm">{recommendation}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Информация о LSI-словах */}
      <Card>
        <CardHeader>
          <CardTitle>Что такое LSI-слова и зачем они нужны?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">LSI (Latent Semantic Indexing) - скрытое семантическое индексирование</h4>
            <p className="text-sm text-muted-foreground">
              Это слова и фразы, которые семантически связаны с основным ключевым словом. 
              Они помогают поисковым системам лучше понимать контекст и тематику страницы.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Примеры для строительной тематики:</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <strong>Основное слово:</strong> "строительство домов"
                <br />
                <strong>LSI-слова:</strong> загородное, индивидуальное, монолитное, кирпичное
              </div>
              <div>
                <strong>Основное слово:</strong> "проекты домов"
                <br />
                <strong>LSI-слова:</strong> типовые, индивидуальные, планировка, архитектура
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Как использовать LSI-слова:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Включайте их в заголовки H2-H6</li>
              <li>• Используйте в основном тексте естественным образом</li>
              <li>• Добавляйте в alt-атрибуты изображений</li>
              <li>• Включайте в мета-описания</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SemanticAnalyzer;
