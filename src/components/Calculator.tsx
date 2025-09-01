import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Calculator as CalculatorIcon, Phone, CheckCircle } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const Calculator = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.1, delay: 150 });
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
            Получите предварительную стоимость вашего проекта за несколько минут. 
            Укажите основные параметры и получите расчет.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Calculator Form */}
            <Card className="bg-white border border-gray-200 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  <CalculatorIcon className="w-5 h-5" />
                  Параметры проекта
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Project Type */}
                <div className="space-y-2">
                  <Label htmlFor="project-type" className="text-sm font-medium text-slate-700">
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
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-slate-700">
                    Площадь: {area[0]} м²
                  </Label>
                  <Slider
                    value={area}
                    onValueChange={setArea}
                    max={500}
                    min={50}
                    step={10}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>50 м²</span>
                    <span>500 м²</span>
                  </div>
                </div>

                {/* Floors */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-slate-700">
                    Количество этажей: {floors[0]}
                  </Label>
                  <Slider
                    value={floors}
                    onValueChange={setFloors}
                    max={4}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>1 этаж</span>
                    <span>4 этажа</span>
                  </div>
                </div>

                {/* Material */}
                <div className="space-y-2">
                  <Label htmlFor="material" className="text-sm font-medium text-slate-700">
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
                  <Label htmlFor="finishing" className="text-sm font-medium text-slate-700">
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
                  </Button>
                  <Button 
                    onClick={resetCalculator}
                    variant="outline"
                    className="border-gray-300 text-slate-700 hover:bg-gray-50"
                  >
                    Сбросить
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Result & Contact Form */}
            <Card className="bg-white border border-gray-200 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-slate-800">
                  {showResult ? 'Результат расчета' : 'Получить точную смету'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {showResult ? (
                  <div className="space-y-6">
                    {/* Price Result */}
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 text-center border border-blue-200">
                      <div className="flex items-center justify-center space-x-2 mb-4">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                        <span className="text-sm font-medium text-green-600">Предварительная стоимость</span>
                      </div>
                      <div className="text-4xl font-bold text-blue-600 mb-2">
                        {calculatePrice().toLocaleString('ru-RU')} ₽
                      </div>
                      <div className="text-sm text-slate-600">
                        {Math.round(calculatePrice() / area[0]).toLocaleString('ru-RU')} ₽/м²
                      </div>
                    </div>

                    {/* Disclaimer */}
                    <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                      <p className="text-sm text-amber-800">
                        <strong>Внимание:</strong> Это предварительный расчет. 
                        Точная стоимость определяется после детального анализа проекта.
                      </p>
                    </div>

                    {/* Contact Form */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-slate-800">Получить точную смету</h4>
                      <div className="space-y-3">
                        <Input placeholder="Ваше имя" />
                        <Input placeholder="Номер телефона" />
                        <Input placeholder="Email (необязательно)" />
                      </div>
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white" variant="default">
                        <Phone className="w-4 h-4 mr-2" />
                        Получить консультацию
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-200">
                        <CalculatorIcon className="w-10 h-10 text-blue-600" />
                      </div>
                      <h4 className="font-semibold text-slate-800 mb-2">
                        Профессиональная оценка
                      </h4>
                      <p className="text-sm text-slate-600">
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
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white" variant="default">
                        <Phone className="w-4 h-4 mr-2" />
                        Получить смету
                      </Button>
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
                      <p className="text-sm text-blue-800 text-center">
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