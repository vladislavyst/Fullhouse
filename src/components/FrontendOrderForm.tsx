import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, User, MessageCircle, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FrontendOrderFormProps {
  className?: string;
  title?: string;
  description?: string;
}

const FrontendOrderForm: React.FC<FrontendOrderFormProps> = ({ 
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
    const cleaned = phone.replace(/\D/g, '');
    
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
        title: "Ошибка валидации",
        description: "Пожалуйста, введите ваше имя",
        variant: "destructive"
      });
      return false;
    }

    if (!formData.phone.trim()) {
      toast({
        title: "Ошибка валидации", 
        description: "Пожалуйста, введите номер телефона",
        variant: "destructive"
      });
      return false;
    }

    const phoneRegex = /^[\+]?[7-8]?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
    if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      toast({
        title: "Ошибка валидации",
        description: "Пожалуйста, введите корректный номер телефона",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const sendToTelegram = async (name: string, phone: string, comment: string) => {
    // ПРЯМАЯ ОТПРАВКА В TELEGRAM БЕЗ БЭКЕНДА
    const BOT_TOKEN = '8430823667:AAEhuKe7X8vgs3SsB44dmtYjqjz7rlWMyoE';
    
    // СПИСОК CHAT ID - добавьте сюда ID всех пользователей
    const CHAT_IDS = [
      '546005770', // Ваш основной Chat ID
      '7731686826', // Второй пользователь
      '6962024711', // Третий пользователь
    ];
    
    const API_URL = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

    const message = `🏠 <b>ЗАЯВКА С САЙТА FULLHOUSE</b>

👤 <b>Имя:</b> ${name}
📞 <b>Телефон:</b> ${phone}
💬 <b>Комментарий:</b> ${comment}

📅 <b>Дата:</b> ${new Date().toLocaleString('ru-RU', {
      timeZone: 'Europe/Moscow'
    })}
🌐 <b>Источник:</b> sk-fullhouse.com`;

    // Отправляем сообщение всем пользователям
    const promises = CHAT_IDS.map(chatId => 
      fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'HTML'
        })
      })
    );

    // Ждем отправки всех сообщений
    const responses = await Promise.all(promises);
    
    // Возвращаем первый успешный ответ
    return responses.find(response => response.ok) || responses[0];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const formattedPhone = formatPhoneNumber(formData.phone);
      const comment = formData.comment || 'Без комментариев';

      console.log('Отправляем заявку в Telegram:', {
        name: formData.name,
        phone: formattedPhone,
        comment
      });

      const response = await sendToTelegram(formData.name, formattedPhone, comment);
      const result = await response.json();

      console.log('Ответ Telegram:', result);

      if (response.ok && result.ok) {
        setIsSubmitted(true);
        setFormData({ name: '', phone: '', comment: '' });
        toast({
          title: "✅ Заявка отправлена!",
          description: "Мы свяжемся с вами в ближайшее время"
        });
      } else {
        throw new Error('Ошибка Telegram API: ' + JSON.stringify(result));
      }

    } catch (error: any) {
      console.error('Ошибка отправки формы:', error);
      
      toast({
        title: "❌ Ошибка отправки",
        description: "Попробуйте позже или позвоните нам по телефону +7 918 040-04-02",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Card className={`w-full max-w-md mx-auto ${className}`}>
        <CardContent className="p-8 text-center">
          <div className="mb-4">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Заявка отправлена!
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Спасибо за обращение! Мы свяжемся с вами в ближайшее время.
          </p>
          <Button 
            onClick={() => setIsSubmitted(false)}
            variant="outline"
            className="w-full"
          >
            Отправить еще одну заявку
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`w-full max-w-md mx-auto ${className}`}>
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
          {title}
        </CardTitle>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {description}
        </p>
      </CardHeader>
      <CardContent className="px-6 pb-6">
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
                placeholder="+7 (___) ___-__-__"
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

export default FrontendOrderForm;
