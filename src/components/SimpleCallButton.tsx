import React from 'react';
import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';

interface SimpleCallButtonProps {
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'default' | 'lg';
  text?: string;
  showIcon?: boolean;
  phone?: string;
}

const SimpleCallButton: React.FC<SimpleCallButtonProps> = ({
  className = '',
  variant = 'default',
  size = 'default',
  text = 'Позвонить',
  showIcon = true,
  phone = '+79180400402'
}) => {
  const handleCall = () => {
    window.location.href = `tel:${phone}`;
  };

  return (
    <Button
      onClick={handleCall}
      variant={variant}
      size={size}
      className={`transition-all duration-300 hover:scale-105 ${className}`}
    >
      {showIcon && <Phone className="w-4 h-4 mr-2" />}
      {text}
    </Button>
  );
};

export default SimpleCallButton;
