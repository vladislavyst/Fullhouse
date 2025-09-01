import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface ThemeToggleProps {
  className?: string;
  variant?: 'default' | 'ghost' | 'outline';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const ThemeToggle = ({ 
  className = '', 
  variant = 'ghost', 
  size = 'icon' 
}: ThemeToggleProps) => {
  const { theme, setTheme, isDark } = useTheme();
  const [showOptions, setShowOptions] = useState(false);

  const themes = [
    { value: 'light', label: 'Светлая', icon: Sun },
    { value: 'dark', label: 'Темная', icon: Moon },
    { value: 'system', label: 'Системная', icon: Monitor },
  ] as const;

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
    setShowOptions(false);
  };

  const currentTheme = themes.find(t => t.value === theme);
  const CurrentIcon = currentTheme?.icon || Monitor;

  return (
    <div className="relative">
      <Button
        variant={variant}
        size={size}
        className={`relative ${className}`}
        aria-label="Переключить тему"
        onClick={() => setShowOptions(!showOptions)}
      >
        <CurrentIcon className="w-4 h-4" />
        {size !== 'icon' && (
          <span className="ml-2">{currentTheme?.label}</span>
        )}
        
        {/* Анимированный индикатор */}
        <div className="absolute -top-1 -right-1">
          <div className={`
            w-2 h-2 rounded-full transition-all duration-300
            ${isDark 
              ? 'bg-blue-400 shadow-lg shadow-blue-400/50' 
              : 'bg-amber-400 shadow-lg shadow-amber-400/50'
            }
          `} />
        </div>
      </Button>

      {/* Выпадающее меню */}
      {showOptions && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50">
          {themes.map((themeOption) => {
            const Icon = themeOption.icon;
            const isSelected = theme === themeOption.value;
            
            return (
              <button
                key={themeOption.value}
                onClick={() => handleThemeChange(themeOption.value)}
                className={`
                  w-full flex items-center justify-between px-3 py-2 cursor-pointer
                  hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors
                  ${isSelected ? 'bg-blue-50 dark:bg-blue-900/20' : ''}
                  ${isSelected ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}
                `}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span className={isSelected ? 'font-medium' : ''}>
                    {themeOption.label}
                  </span>
                </div>
                
                {isSelected && (
                  <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Затемнение фона при открытом меню */}
      {showOptions && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowOptions(false)}
        />
      )}
    </div>
  );
};

export default ThemeToggle;
