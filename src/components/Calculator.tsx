import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Calculator as CalculatorIcon, Phone, CheckCircle } from 'lucide-react';

const Calculator = () => {
  const [projectType, setProjectType] = useState('');
  const [area, setArea] = useState([100]);
  const [floors, setFloors] = useState([1]);
  const [material, setMaterial] = useState('');
  const [finishing, setFinishing] = useState('');
  const [showResult, setShowResult] = useState(false);

  const projectTypes = [
    { value: 'house', label: 'Частный дом', basePrice: 35000 },
    { value: 'cottage', label: 'Коттедж', basePrice: 45000 },
    { value: 'commercial', label: 'Коммерческое здание', basePrice: 40000 },
    { value: 'renovation', label: 'Реконструкция', basePrice: 25000 }
  ];

  const materials = [
    { value: 'brick', label: 'Кирпич', multiplier: 1.2 },
    { value: 'block', label: 'Газобетон', multiplier: 1.0 },
    { value: 'frame', label: 'Каркасное строительство', multiplier: 0.8 },
    { value: 'monolith', label: 'Монолит', multiplier: 1.3 }
  ];

  const finishingOptions = [
    { value: 'economy', label: 'Эконом', multiplier: 1.0 },
    { value: 'comfort', label: 'Комфорт', multiplier: 1.3 },
    { value: 'premium', label: 'Премиум', multiplier: 1.6 }
  ];

  const calculatePrice = () => {
    const selectedProject = projectTypes.find(p => p.value === projectType);
    const selectedMaterial = materials.find(m => m.value === material);
    const selectedFinishing = finishingOptions.find(f => f.value === finishing);

    if (!selectedProject || !selectedMaterial || !selectedFinishing) return 0;

    const basePrice = selectedProject.basePrice * area[0] * floors[0];
    const materialAdjustment = basePrice * selectedMaterial.multiplier;
    const finishingAdjustment = materialAdjustment * selectedFinishing.multiplier;

    return Math.round(finishingAdjustment);
  };

  const handleCalculate = () => {
    setShowResult(true);
  };

  const resetCalculator = () => {
    setProjectType('');
    setArea([100]);
    setFloors([1]);
    setMaterial('');
    setFinishing('');
    setShowResult(false);
  };

  return (
    <section id="calculator" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-accent/10 rounded-full px-4 py-2 text-sm font-medium text-accent mb-4">
            <CalculatorIcon className="w-4 h-4" />
            <span>Калькулятор стоимости</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-6">
            Рассчитайте стоимость строительства
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Получите предварительную стоимость вашего проекта за несколько минут. 
            Укажите основные параметры и получите расчет.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Calculator Form */}
            <Card className="bg-white border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-primary">
                  Параметры проекта
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Project Type */}
                <div className="space-y-2">
                  <Label htmlFor="project-type" className="text-sm font-medium text-primary">
                    Тип проекта
                  </Label>
                  <Select value={projectType} onValueChange={setProjectType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите тип проекта" />
                    </SelectTrigger>
                    <SelectContent>
                      {projectTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Area */}
                <div className="space-y-4">
                  <Label className="text-sm font-medium text-primary">
                    Площадь: {area[0]} м²
                  </Label>
                  <Slider
                    value={area}
                    onValueChange={setArea}
                    min={50}
                    max={500}
                    step={10}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>50 м²</span>
                    <span>500 м²</span>
                  </div>
                </div>

                {/* Floors */}
                <div className="space-y-4">
                  <Label className="text-sm font-medium text-primary">
                    Количество этажей: {floors[0]}
                  </Label>
                  <Slider
                    value={floors}
                    onValueChange={setFloors}
                    min={1}
                    max={4}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>1 этаж</span>
                    <span>4 этажа</span>
                  </div>
                </div>

                {/* Material */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-primary">
                    Материал строительства
                  </Label>
                  <Select value={material} onValueChange={setMaterial}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите материал" />
                    </SelectTrigger>
                    <SelectContent>
                      {materials.map((mat) => (
                        <SelectItem key={mat.value} value={mat.value}>
                          {mat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Finishing */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-primary">
                    Уровень отделки
                  </Label>
                  <Select value={finishing} onValueChange={setFinishing}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите уровень отделки" />
                    </SelectTrigger>
                    <SelectContent>
                      {finishingOptions.map((finish) => (
                        <SelectItem key={finish.value} value={finish.value}>
                          {finish.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex space-x-4 pt-4">
                  <Button 
                    onClick={handleCalculate}
                    disabled={!projectType || !material || !finishing}
                    className="flex-1"
                    variant="accent"
                  >
                    Рассчитать
                  </Button>
                  <Button 
                    onClick={resetCalculator}
                    variant="outline"
                  >
                    Сбросить
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Result & Contact Form */}
            <Card className="bg-white border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-primary">
                  {showResult ? 'Результат расчета' : 'Получить точную смету'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {showResult ? (
                  <div className="space-y-6">
                    {/* Price Result */}
                    <div className="bg-accent/5 rounded-xl p-6 text-center">
                      <div className="flex items-center justify-center space-x-2 mb-4">
                        <CheckCircle className="w-6 h-6 text-success" />
                        <span className="text-sm font-medium text-success">Предварительная стоимость</span>
                      </div>
                      <div className="text-4xl font-bold text-primary mb-2">
                        {calculatePrice().toLocaleString('ru-RU')} ₽
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {Math.round(calculatePrice() / area[0]).toLocaleString('ru-RU')} ₽/м²
                      </div>
                    </div>

                    {/* Disclaimer */}
                    <div className="bg-warning/10 rounded-lg p-4">
                      <p className="text-sm text-warning-foreground">
                        <strong>Внимание:</strong> Это предварительный расчет. 
                        Точная стоимость определяется после детального анализа проекта.
                      </p>
                    </div>

                    {/* Contact Form */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-primary">Получить точную смету</h4>
                      <div className="space-y-3">
                        <Input placeholder="Ваше имя" />
                        <Input placeholder="Номер телефона" />
                        <Input placeholder="Email (необязательно)" />
                      </div>
                      <Button className="w-full" variant="accent">
                        <Phone className="w-4 h-4 mr-2" />
                        Получить консультацию
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CalculatorIcon className="w-10 h-10 text-accent" />
                      </div>
                      <h4 className="font-semibold text-primary mb-2">
                        Профессиональная оценка
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Заполните форму и получите детальную смету с учетом всех особенностей вашего проекта
                      </p>
                    </div>

                    <div className="space-y-4">
                      <Input placeholder="Ваше имя" />
                      <Input placeholder="Номер телефона" />
                      <Input placeholder="Email" />
                      <textarea 
                        className="w-full p-3 border border-input rounded-md resize-none text-sm"
                        rows={3}
                        placeholder="Опишите ваш проект..."
                      />
                      <Button className="w-full" variant="accent">
                        <Phone className="w-4 h-4 mr-2" />
                        Получить смету
                      </Button>
                    </div>

                    <div className="bg-primary/5 rounded-lg p-4">
                      <p className="text-sm text-primary text-center">
                        Смета бесплатно • Консультация в течение 30 минут
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Calculator;