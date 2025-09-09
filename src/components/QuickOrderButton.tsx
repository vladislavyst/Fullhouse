import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Phone, MessageSquare } from 'lucide-react';
import FrontendOrderForm from './FrontendOrderForm';

interface QuickOrderButtonProps {
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'default' | 'lg';
  text?: string;
  showIcon?: boolean;
}

const QuickOrderButton: React.FC<QuickOrderButtonProps> = ({
  className = '',
  variant = 'default',
  size = 'default',
  text = 'Заказать звонок',
  showIcon = true
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant={variant}
          size={size}
          className={`transition-all duration-300 hover:scale-105 ${className}`}
        >
          {showIcon && <Phone className="w-4 h-4 mr-2" />}
          {text}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden">
        <FrontendOrderForm 
          title="Заказать обратный звонок"
          description="Оставьте свои контакты и мы перезвоним в течение 30 минут"
          className="border-0 shadow-none"
        />
      </DialogContent>
    </Dialog>
  );
};

export default QuickOrderButton;
