import { MessageCircle, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const WhatsAppFloat = () => {
  const [showOptions, setShowOptions] = useState(false);
  const phoneNumber = '+79180400402';
  const whatsappUrl = `https://wa.me/79180400402`;
  const callUrl = `tel:${phoneNumber}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-3">
      {/* Options Menu */}
      {showOptions && (
        <div className="flex flex-col space-y-2 animate-in slide-in-from-bottom-2 duration-200">
          <Button
            onClick={() => window.open(whatsappUrl, '_blank')}
            className="bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 p-3"
            size="sm"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            <span className="whitespace-nowrap">Написать в WhatsApp</span>
          </Button>
          <Button
            onClick={() => window.open(callUrl, '_self')}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 p-3"
            size="sm"
          >
            <Phone className="w-5 h-5 mr-2" />
            <span className="whitespace-nowrap">Позвонить</span>
          </Button>
        </div>
      )}
      
      {/* Main WhatsApp Button */}
      <Button
        onClick={() => setShowOptions(!showOptions)}
        className="bg-green-500 hover:bg-green-600 text-white rounded-full w-16 h-16 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 p-0"
        size="lg"
      >
        <MessageCircle className="w-8 h-8" />
      </Button>
    </div>
  );
};

export default WhatsAppFloat;