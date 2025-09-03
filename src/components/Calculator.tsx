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
  
  const [area, setArea] = useState([100]);
  const [floors, setFloors] = useState([1]);
  const [finishing, setFinishing] = useState('');
  const [showResult, setShowResult] = useState(false);

  const finishingOptions = [
    { value: 'rough', label: 'Черновая', price: 41000 },
    { value: 'pre-finish', label: 'Предчистовая', price: 47000 },
    { value: 'finish', label: 'Чистовая', price: 56000 }
  ];

  const calculatePrice = () => {
    const selectedFinishing = finishingOptions.find(f => f.value === finishing);

    if (!selectedFinishing) return 0;

    const totalPrice = selectedFinishing.price * area[0];

    return Math.round(totalPrice);
  };

  const handleCalculate = () => {
    setShowResult(true);
  };

  const resetCalculator = () => {
    setArea([100]);
    setFloors([1]);
    setFinishing('');
    setShowResult(false);
  };

  return (
    <section ref={sectionRef} id="calculator" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 dark:from-gray-900 dark:via-slate-900 dark:to-black">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className={`text-center mb-12 sm:mb-14 lg:mb-16 transition-all duration-800 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 dark:text-white mb-4 sm:mb-6 px-4">
            Рассчитайте стоимость строительства
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
            Получите предварительную стоимость вашего проекта за несколько минут. 
            Укажите основные параметры и получите расчет.
          </p>
        </div>

        {/* Calculator Form */}
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl font-bold text-slate-800 dark:text-white flex items-center justify-center">
                <CalculatorIcon className="w-8 h-8 text-blue-600 mr-3" />
                Калькулятор стоимости
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                {/* Left Column - Form */}
                <div className="space-y-6">
                  {/* Area */}
                  <div className="space-y-2">
                    <Label className="text-slate-700 dark:text-gray-300 font-semibold">
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
                    <div className="flex justify-between text-sm text-slate-500 dark:text-gray-400">
                      <span>50 м²</span>
                      <span>500 м²</span>
                    </div>
                  </div>

                  {/* Floors */}
                  <div className="space-y-2">
                    <Label className="text-slate-700 dark:text-gray-300 font-semibold">
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
                    <div className="flex justify-between text-sm text-slate-500 dark:text-gray-400">
                      <span>1</span>
                      <span>3</span>
                    </div>
                  </div>

                  {/* Finishing */}
                  <div className="space-y-2">
                    <Label htmlFor="finishing" className="text-slate-700 dark:text-gray-300 font-semibold">
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
                      disabled={!finishing}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
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
                    <Card className="border-0 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 shadow-lg">
                      <div className="text-center">
                        <CheckCircle className="w-16 h-16 text-green-600 dark:text-green-400 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
                          Расчет готов!
                        </h3>
                        <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                          {calculatePrice().toLocaleString('ru-RU')} ₽
                        </div>
                        <p className="text-slate-600 dark:text-gray-300">
                          Предварительная стоимость строительства
                        </p>
                      </div>
                    </Card>
                  )}

                  {/* Info Cards */}
                  <div className="space-y-4">
                    <Card className="border-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 shadow-lg">
                      <div className="flex items-start space-x-3">
                        <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-lg shadow-lg">
                          <CalculatorIcon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-800 dark:text-white mb-1">
                            Точность расчета
                          </h4>
                          <p className="text-sm text-slate-600 dark:text-gray-300">
                            Расчет основан на актуальных ценах материалов и работ в регионе
                          </p>
                        </div>
                      </div>
                    </Card>

                    <Card className="border-0 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-4 shadow-lg">
                      <div className="flex items-start space-x-3">
                        <div className="bg-gradient-to-br from-amber-500 to-orange-500 p-2 rounded-lg shadow-lg">
                          <Phone className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-800 dark:text-white mb-1">
                            Нужна консультация?
                          </h4>
                          <p className="text-sm text-slate-600 dark:text-gray-300">
                            Свяжитесь с нами для детального расчета и консультации
                          </p>
                        </div>
                      </div>
                    </Card>
                  </div>

                  {/* CTA */}
                  <div className="text-center pt-4">
                    <a href="tel:+79180400402">
                      <Button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                        <Phone className="w-4 h-4 mr-2" />
                        Получить детальный расчет
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <p className="text-slate-600 dark:text-gray-300 max-w-2xl mx-auto">
            * Расчет является предварительным. Для получения точной стоимости 
            свяжитесь с нашими специалистами для детального анализа проекта.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Calculator;