import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, User, MessageCircle, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface OrderFormProps {
  className?: string;
  title?: string;
  description?: string;
}

const OrderForm: React.FC<OrderFormProps> = ({ 
  className = '',
  title = "Оставить заявку",
  description = "Заполните форму и мы свяжемся с вами в течение 30 минут"
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    comment: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const formatPhoneNumber = (phone: string) => {
    // Убираем все нецифровые символы
    const cleaned = phone.replace(/\D/g, '');
    
    // Форматируем номер
    if (cleaned.length >= 11 && cleaned.startsWith('7')) {
      return `+7 ${cleaned.slice(1, 4)} ${cleaned.slice(4, 7)}-${cleaned.slice(7, 9)}-${cleaned.slice(9, 11)}`;
    } else if (cleaned.length >= 10 && cleaned.startsWith('9')) {
      return `+7 ${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)}-${cleaned.slice(6, 8)}-${cleaned.slice(8, 10)}`;
    }
    return phone;
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, укажите ваше имя",
        variant: "destructive"
      });
      return false;
    }

    if (!formData.phone.trim()) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, укажите номер телефона",
        variant: "destructive"
      });
      return false;
    }

    // Проверяем формат телефона
    const phoneRegex = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
    if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, укажите корректный номер телефона",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      console.log('Sending form data:', {
        name: formData.name,
        phone: formatPhoneNumber(formData.phone),
        comment: formData.comment || 'Без комментариев'
      });

      const response = await fetch('/api/final-telegram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formatPhoneNumber(formData.phone),
          comment: formData.comment || 'Без комментариев'
        }),
      });

      const responseData = await response.json();
      console.log('API response:', responseData);

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: '', phone: '', comment: '' });
        toast({
          title: "Заявка отправлена!",
          description: "Мы свяжемся с вами в ближайшее время",
        });
      } else {
        // Показываем конкретную ошибку от сервера
        const errorMessage = responseData.details || responseData.error || 'Неизвестная ошибка';
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error('Ошибка отправки формы:', error);
      
      let errorDescription = "Попробуйте позже или позвоните нам напрямую";
      
      if (error.message.includes('environment variables')) {
        errorDescription = "Сервис временно недоступен. Позвоните по телефону +7 918 040-04-02";
      } else if (error.message.includes('Failed to send to Telegram')) {
        errorDescription = "Проблема с отправкой сообщения. Позвоните нам напрямую";
      }
      
      toast({
        title: "Ошибка отправки",
        description: errorDescription,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setFormData({ name: '', phone: '', comment: '' });
  };

  if (isSubmitted) {
    return (
      <Card className={`w-full max-w-md mx-auto ${className}`}>
        <CardContent className="pt-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Заявка отправлена!
            </h3>
            <p className="text-gray-600 mb-6">
              Мы получили вашу заявку и свяжемся с вами в течение 30 минут
            </p>
            <Button onClick={resetForm} variant="outline" className="w-full">
              Отправить еще одну заявку
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`w-full max-w-md mx-auto ${className}`}>
      <CardHeader>
        <CardTitle className="text-xl font-bold text-center text-gray-900">
          {title}
        </CardTitle>
        <p className="text-sm text-gray-600 text-center">
          {description}
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Имя */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Ваше имя *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Введите ваше имя"
                className="pl-10"
                required
              />
            </div>
          </div>

          {/* Телефон */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Номер телефона *
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+7 XXX XXX-XX-XX"
                className="pl-10"
                required
              />
            </div>
          </div>

          {/* Комментарии */}
          <div>
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
              Комментарии
            </label>
            <div className="relative">
              <MessageCircle className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Textarea
                id="comment"
                name="comment"
                value={formData.comment}
                onChange={handleInputChange}
                placeholder="Расскажите, что вас интересует..."
                className="pl-10 min-h-[100px] resize-none"
                rows={4}
              />
            </div>
          </div>

          {/* Кнопка отправки */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 transition-all duration-300"
          >
            {isSubmitting ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Отправляем...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Send className="w-4 h-4" />
                <span>Отправить заявку</span>
              </div>
            )}
          </Button>

          {/* Примечание */}
          <p className="text-xs text-gray-500 text-center">
            Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

export default OrderForm;
