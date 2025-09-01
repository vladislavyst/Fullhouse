import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Calculator as CalculatorIcon, Phone, CheckCircle } from 'lucide-react';
<<<<<<< HEAD
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const Calculator = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.1, delay: 150 });
=======

const Calculator = () => {
>>>>>>> 39d3f718b0d8f7b0390d11e523d856b03bc5bd8d
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
<<<<<<< HEAD
    <section ref={sectionRef} id="calculator" className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-800 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
            Рассчитайте стоимость строительства
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
=======
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
>>>>>>> 39d3f718b0d8f7b0390d11e523d856b03bc5bd8d
            Получите предварительную стоимость вашего проекта за несколько минут. 
            Укажите основные параметры и получите расчет.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Calculator Form */}
<<<<<<< HEAD
            <Card className="bg-white border border-gray-200 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  <CalculatorIcon className="w-5 h-5" />
=======
            <Card className="bg-white border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-primary">
>>>>>>> 39d3f718b0d8f7b0390d11e523d856b03bc5bd8d
                  Параметры проекта
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Project Type */}
                <div className="space-y-2">
<<<<<<< HEAD
                  <Label htmlFor="project-type" className="text-sm font-medium text-slate-700">
=======
                  <Label htmlFor="project-type" className="text-sm font-medium text-primary">
>>>>>>> 39d3f718b0d8f7b0390d11e523d856b03bc5bd8d
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
<<<<<<< HEAD
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-slate-700">
=======
                <div className="space-y-4">
                  <Label className="text-sm font-medium text-primary">
>>>>>>> 39d3f718b0d8f7b0390d11e523d856b03bc5bd8d
                    Площадь: {area[0]} м²
                  </Label>
                  <Slider
                    value={area}
                    onValueChange={setArea}
<<<<<<< HEAD
                    max={500}
                    min={50}
                    step={10}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-slate-500">
=======
                    min={50}
                    max={500}
                    step={10}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
>>>>>>> 39d3f718b0d8f7b0390d11e523d856b03bc5bd8d
                    <span>50 м²</span>
                    <span>500 м²</span>
                  </div>
                </div>

                {/* Floors */}
<<<<<<< HEAD
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-slate-700">
=======
                <div className="space-y-4">
                  <Label className="text-sm font-medium text-primary">
>>>>>>> 39d3f718b0d8f7b0390d11e523d856b03bc5bd8d
                    Количество этажей: {floors[0]}
                  </Label>
                  <Slider
                    value={floors}
                    onValueChange={setFloors}
<<<<<<< HEAD
                    max={4}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-slate-500">
=======
                    min={1}
                    max={4}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
>>>>>>> 39d3f718b0d8f7b0390d11e523d856b03bc5bd8d
                    <span>1 этаж</span>
                    <span>4 этажа</span>
                  </div>
                </div>

                {/* Material */}
                <div className="space-y-2">
<<<<<<< HEAD
                  <Label htmlFor="material" className="text-sm font-medium text-slate-700">
=======
                  <Label className="text-sm font-medium text-primary">
>>>>>>> 39d3f718b0d8f7b0390d11e523d856b03bc5bd8d
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
<<<<<<< HEAD
                  <Label htmlFor="finishing" className="text-sm font-medium text-slate-700">
=======
                  <Label className="text-sm font-medium text-primary">
>>>>>>> 39d3f718b0d8f7b0390d11e523d856b03bc5bd8d
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

<<<<<<< HEAD
                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button 
                    onClick={handleCalculate}
                    disabled={!projectType || !material || !finishing}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                    variant="default"
                  >
                    <CalculatorIcon className="w-4 h-4 mr-2" />
                    Рассчитать стоимость
=======
                <div className="flex space-x-4 pt-4">
                  <Button 
                    onClick={handleCalculate}
                    disabled={!projectType || !material || !finishing}
                    className="flex-1"
                    variant="accent"
                  >
                    Рассчитать
>>>>>>> 39d3f718b0d8f7b0390d11e523d856b03bc5bd8d
                  </Button>
                  <Button 
                    onClick={resetCalculator}
                    variant="outline"
<<<<<<< HEAD
                    className="border-gray-300 text-slate-700 hover:bg-gray-50"
=======
>>>>>>> 39d3f718b0d8f7b0390d11e523d856b03bc5bd8d
                  >
                    Сбросить
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Result & Contact Form */}
<<<<<<< HEAD
            <Card className="bg-white border border-gray-200 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-slate-800">
=======
            <Card className="bg-white border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-primary">
>>>>>>> 39d3f718b0d8f7b0390d11e523d856b03bc5bd8d
                  {showResult ? 'Результат расчета' : 'Получить точную смету'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {showResult ? (
                  <div className="space-y-6">
                    {/* Price Result */}
<<<<<<< HEAD
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 text-center border border-blue-200">
                      <div className="flex items-center justify-center space-x-2 mb-4">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                        <span className="text-sm font-medium text-green-600">Предварительная стоимость</span>
                      </div>
                      <div className="text-4xl font-bold text-blue-600 mb-2">
                        {calculatePrice().toLocaleString('ru-RU')} ₽
                      </div>
                      <div className="text-sm text-slate-600">
=======
                    <div className="bg-accent/5 rounded-xl p-6 text-center">
                      <div className="flex items-center justify-center space-x-2 mb-4">
                        <CheckCircle className="w-6 h-6 text-success" />
                        <span className="text-sm font-medium text-success">Предварительная стоимость</span>
                      </div>
                      <div className="text-4xl font-bold text-primary mb-2">
                        {calculatePrice().toLocaleString('ru-RU')} ₽
                      </div>
                      <div className="text-sm text-muted-foreground">
>>>>>>> 39d3f718b0d8f7b0390d11e523d856b03bc5bd8d
                        {Math.round(calculatePrice() / area[0]).toLocaleString('ru-RU')} ₽/м²
                      </div>
                    </div>

                    {/* Disclaimer */}
<<<<<<< HEAD
                    <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                      <p className="text-sm text-amber-800">
=======
                    <div className="bg-warning/10 rounded-lg p-4">
                      <p className="text-sm text-warning-foreground">
>>>>>>> 39d3f718b0d8f7b0390d11e523d856b03bc5bd8d
                        <strong>Внимание:</strong> Это предварительный расчет. 
                        Точная стоимость определяется после детального анализа проекта.
                      </p>
                    </div>

                    {/* Contact Form */}
                    <div className="space-y-4">
<<<<<<< HEAD
                      <h4 className="font-semibold text-slate-800">Получить точную смету</h4>
=======
                      <h4 className="font-semibold text-primary">Получить точную смету</h4>
>>>>>>> 39d3f718b0d8f7b0390d11e523d856b03bc5bd8d
                      <div className="space-y-3">
                        <Input placeholder="Ваше имя" />
                        <Input placeholder="Номер телефона" />
                        <Input placeholder="Email (необязательно)" />
                      </div>
<<<<<<< HEAD
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white" variant="default">
=======
                      <Button className="w-full" variant="accent">
>>>>>>> 39d3f718b0d8f7b0390d11e523d856b03bc5bd8d
                        <Phone className="w-4 h-4 mr-2" />
                        Получить консультацию
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="text-center">
<<<<<<< HEAD
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-200">
                        <CalculatorIcon className="w-10 h-10 text-blue-600" />
                      </div>
                      <h4 className="font-semibold text-slate-800 mb-2">
                        Профессиональная оценка
                      </h4>
                      <p className="text-sm text-slate-600">
=======
                      <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CalculatorIcon className="w-10 h-10 text-accent" />
                      </div>
                      <h4 className="font-semibold text-primary mb-2">
                        Профессиональная оценка
                      </h4>
                      <p className="text-sm text-muted-foreground">
>>>>>>> 39d3f718b0d8f7b0390d11e523d856b03bc5bd8d
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
<<<<<<< HEAD
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white" variant="default">
=======
                      <Button className="w-full" variant="accent">
>>>>>>> 39d3f718b0d8f7b0390d11e523d856b03bc5bd8d
                        <Phone className="w-4 h-4 mr-2" />
                        Получить смету
                      </Button>
                    </div>

<<<<<<< HEAD
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
                      <p className="text-sm text-blue-800 text-center">
=======
                    <div className="bg-primary/5 rounded-lg p-4">
                      <p className="text-sm text-primary text-center">
>>>>>>> 39d3f718b0d8f7b0390d11e523d856b03bc5bd8d
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