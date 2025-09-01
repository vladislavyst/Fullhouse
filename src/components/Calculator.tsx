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

        {/* Calculator Form */}
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-xl bg-white/90 backdrop-blur">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl font-bold text-slate-800 flex items-center justify-center">
                <CalculatorIcon className="w-8 h-8 text-blue-600 mr-3" />
                Калькулятор стоимости
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Left Column - Form */}
                <div className="space-y-6">
                  {/* Project Type */}
                  <div className="space-y-2">
                    <Label htmlFor="project-type" className="text-slate-700 font-semibold">
                      Тип проекта *
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
                    <Label className="text-slate-700 font-semibold">
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
                    <div className="flex justify-between text-sm text-slate-500">
                      <span>50 м²</span>
                      <span>500 м²</span>
                    </div>
                  </div>

                  {/* Floors */}
                  <div className="space-y-2">
                    <Label className="text-slate-700 font-semibold">
                      Количество этажей: {floors[0]}
                    </Label>
                    <Slider
                      value={floors}
                      onValueChange={setFloors}
                      max={3}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-slate-500">
                      <span>1</span>
                      <span>3</span>
                    </div>
                  </div>

                  {/* Material */}
                  <div className="space-y-2">
                    <Label htmlFor="material" className="text-slate-700 font-semibold">
                      Материал стен *
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
                    <Label htmlFor="finishing" className="text-slate-700 font-semibold">
                      Отделка *
                    </Label>
                    <Select value={finishing} onValueChange={setFinishing}>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите тип отделки" />
                      </SelectTrigger>
                      <SelectContent>
                        {finishingOptions.map((fin) => (
                          <SelectItem key={fin.value} value={fin.value}>
                            {fin.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-4">
                    <Button 
                      onClick={handleCalculate}
                      disabled={!projectType || !material || !finishing}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3"
                    >
                      Рассчитать стоимость
                    </Button>
                    <Button 
                      onClick={resetCalculator}
                      variant="outline"
                      className="px-6 py-3"
                    >
                      Сбросить
                    </Button>
                  </div>
                </div>

                {/* Right Column - Results & Info */}
                <div className="space-y-6">
                  {/* Results */}
                  {showResult && (
                    <Card className="border-0 bg-gradient-to-br from-green-50 to-emerald-50 p-6">
                      <div className="text-center">
                        <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-slate-800 mb-2">
                          Расчет готов!
                        </h3>
                        <div className="text-4xl font-bold text-green-600 mb-2">
                          {calculatePrice().toLocaleString('ru-RU')} ₽
                        </div>
                        <p className="text-slate-600">
                          Предварительная стоимость строительства
                        </p>
                      </div>
                    </Card>
                  )}

                  {/* Info Cards */}
                  <div className="space-y-4">
                    <Card className="border-0 bg-blue-50 p-4">
                      <div className="flex items-start space-x-3">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <CalculatorIcon className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-800 mb-1">
                            Точность расчета
                          </h4>
                          <p className="text-sm text-slate-600">
                            Расчет основан на актуальных ценах материалов и работ в регионе
                          </p>
                        </div>
                      </div>
                    </Card>

                    <Card className="border-0 bg-amber-50 p-4">
                      <div className="flex items-start space-x-3">
                        <div className="bg-amber-100 p-2 rounded-lg">
                          <Phone className="w-5 h-5 text-amber-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-800 mb-1">
                            Нужна консультация?
                          </h4>
                          <p className="text-sm text-slate-600">
                            Свяжитесь с нами для детального расчета и консультации
                          </p>
                        </div>
                      </div>
                    </Card>
                  </div>

                  {/* CTA */}
                  <div className="text-center pt-4">
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3">
                      <Phone className="w-4 h-4 mr-2" />
                      Получить детальный расчет
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <p className="text-slate-600 max-w-2xl mx-auto">
            * Расчет является предварительным. Для получения точной стоимости 
            свяжитесь с нашими специалистами для детального анализа проекта.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Calculator;