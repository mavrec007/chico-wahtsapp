
import React from 'react';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/stores/useAppStore';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

interface LanguageToggleProps {
  className?: string;
  variant?: 'default' | 'ghost' | 'outline';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  showText?: boolean;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({ 
  className,
  variant = 'ghost',
  size = 'icon',
  showText = false
}) => {
  const { language, setLanguage } = useAppStore();
  const { i18n } = useTranslation();

  const handleLanguageToggle = () => {
    const newLang = language === 'en' ? 'ar' : 'en';
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
  };

  return (
    <Button
      variant={variant}
      size={showText ? 'default' : size}
      onClick={handleLanguageToggle}
      className={cn(
        'rounded-lg backdrop-blur-md bg-white/40 dark:bg-gray-800/40 hover:bg-white/60 dark:hover:bg-gray-700/60 transition-colors',
        showText && 'gap-2',
        className
      )}
      aria-label={`Switch to ${language === 'en' ? 'Arabic' : 'English'}`}
    >
      <Globe className="w-4 h-4 dark:text-fuchsia-400" />
      {showText && (
        <span className="text-sm font-medium">
          {language === 'en' ? 'عربي' : 'English'}
        </span>
      )}
    </Button>
  );
};

export default LanguageToggle;
