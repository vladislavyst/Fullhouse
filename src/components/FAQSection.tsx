import { ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title: string;
  items: FAQItem[];
  className?: string;
}

const FAQSection = ({ title, items, className = '' }: FAQSectionProps) => {
  return (
    <Card className={className}>
      <CardContent className="p-8">
        <h3 className="text-xl font-semibold text-primary mb-6">
          {title}
        </h3>
        
        <div 
          className="space-y-6"
          itemScope 
          itemType="https://schema.org/FAQPage"
        >
          {items.map((item, index) => (
            <details 
              key={index} 
              className="group"
              itemScope 
              itemType="https://schema.org/Question"
            >
              <summary className="flex justify-between items-center cursor-pointer list-none text-primary font-medium hover:text-accent transition-colors">
                <span itemProp="name">{item.question}</span>
                <ChevronRight className="w-5 h-5 transform group-open:rotate-90 transition-transform" />
              </summary>
              
              <div 
                className="mt-3 text-muted-foreground text-sm leading-relaxed"
                itemScope 
                itemType="https://schema.org/Answer"
              >
                <div itemProp="text">
                  {item.answer}
                </div>
              </div>
            </details>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FAQSection;
