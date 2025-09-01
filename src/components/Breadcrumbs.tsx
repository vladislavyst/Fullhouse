import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path: string;
  current?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumbs = ({ items, className = '' }: BreadcrumbsProps) => {
  return (
    <nav 
      className={`bg-muted/30 py-3 border-b ${className}`} 
      aria-label="Хлебные крошки"
      itemScope 
      itemType="https://schema.org/BreadcrumbList"
    >
      <div className="container mx-auto px-4">
        <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
          {/* Главная страница */}
          <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            <Link 
              to="/" 
              className="hover:text-primary transition-colors flex items-center gap-1" 
              itemProp="item"
            >
              <Home className="w-4 h-4" />
              <span itemProp="name">Главная</span>
            </Link>
            <meta itemProp="position" content="1" />
          </li>
          
          {/* Остальные элементы */}
          {items.map((item, index) => (
            <li 
              key={item.path} 
              className="flex items-center" 
              itemProp="itemListElement" 
              itemScope 
              itemType="https://schema.org/ListItem"
            >
              <ChevronRight className="w-4 h-4 mx-1 text-muted-foreground" />
              
              {item.current ? (
                <span 
                  className="text-primary font-medium" 
                  aria-current="page" 
                  itemProp="item"
                >
                  <span itemProp="name">{item.label}</span>
                </span>
              ) : (
                <Link 
                  to={item.path} 
                  className="hover:text-primary transition-colors" 
                  itemProp="item"
                >
                  <span itemProp="name">{item.label}</span>
                </Link>
              )}
              
              <meta itemProp="position" content={String(index + 2)} />
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumbs;
