import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, MessageCircle, Mail, Clock, Award } from 'lucide-react';

interface SimpleContactFormProps {
  className?: string;
  title?: string;
  description?: string;
}

const SimpleContactForm: React.FC<SimpleContactFormProps> = ({ 
  className = '',
  title = "Получить консультацию",
  description = "Свяжитесь с нами удобным способом"
}) => {
  const phone1 = "+79180400402";
  const phone2 = "+79883464087";
  const whatsappNumber = "79180400402";
  const email = "info@sk-fullhouse.com";

  const handlePhoneCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent("Здравствуйте! Интересует строительство дома. Можете рассказать подробнее?");
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  const handleEmail = () => {
    const subject = encodeURIComponent("Консультация по строительству дома");
    const body = encodeURIComponent("Здравствуйте!\n\nИнтересует строительство дома.\nПожалуйста, свяжитесь со мной для консультации.\n\nМои контакты:\nИмя: \nТелефон: \nПожелания: ");
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <Card className={`w-full max-w-md mx-auto shadow-lg border-0 ${className}`}>
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-xl font-bold text-gray-900 mb-2">
          {title}
        </CardTitle>
        <p className="text-sm text-gray-600">
          {description}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Телефонные звонки */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-700 flex items-center">
            <Phone className="w-4 h-4 mr-2 text-amber-500" />
            Позвонить прямо сейчас
          </h3>
          
          <Button
            onClick={() => handlePhoneCall(phone1)}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 transition-all duration-300"
          >
            <Phone className="w-4 h-4 mr-2" />
            +7 918 040-04-02
          </Button>
          
          <Button
            onClick={() => handlePhoneCall(phone2)}
            variant="outline"
            className="w-full border-green-600 text-green-600 hover:bg-green-50 font-medium py-3"
          >
            <Phone className="w-4 h-4 mr-2" />
            +7 988 346-40-87
          </Button>
        </div>

        {/* WhatsApp */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-700 flex items-center">
            <MessageCircle className="w-4 h-4 mr-2 text-amber-500" />
            Написать в WhatsApp
          </h3>
          
          <Button
            onClick={handleWhatsApp}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 transition-all duration-300"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Написать в WhatsApp
          </Button>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-700 flex items-center">
            <Mail className="w-4 h-4 mr-2 text-amber-500" />
            Отправить email
          </h3>
          
          <Button
            onClick={handleEmail}
            variant="outline"
            className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-3"
          >
            <Mail className="w-4 h-4 mr-2" />
            info@sk-fullhouse.com
          </Button>
        </div>

        {/* Преимущества */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-3 text-xs text-gray-600">
            <div className="flex items-center space-x-2">
              <Clock className="w-3 h-3 text-amber-500" />
              <span>Ответим в течение часа</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="w-3 h-3 text-amber-500" />
              <span>Бесплатная консультация</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SimpleContactForm;
