
import React from 'react';
import { Sun, Moon, Monitor, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { useTheme } from '@/hooks/useTheme';
import { useAppStore } from '@/stores/useAppStore';
import { useTranslation } from 'react-i18next';

export function UnifiedToggle() {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage } = useAppStore();
  const { i18n } = useTranslation();

  const handleLanguageChange = (newLang: 'en' | 'ar') => {
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
  };

  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="h-4 w-4" />;
      case 'dark':
        return <Moon className="h-4 w-4" />;
      default:
        return <Monitor className="h-4 w-4" />;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="w-9 h-9 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <div className="flex items-center gap-1">
            {getThemeIcon()}
            <Globe className="h-3 w-3 opacity-70" />
          </div>
          <span className="sr-only">Toggle theme and language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel className="text-xs font-medium text-muted-foreground">
          Theme
        </DropdownMenuLabel>
        <DropdownMenuItem onClick={() => setTheme('light')}>
          <Sun className="mr-2 h-4 w-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          <Moon className="mr-2 h-4 w-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          <Monitor className="mr-2 h-4 w-4" />
          <span>System</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuLabel className="text-xs font-medium text-muted-foreground">
          Language
        </DropdownMenuLabel>
        <DropdownMenuItem 
          onClick={() => handleLanguageChange('en')}
          className={language === 'en' ? 'bg-accent' : ''}
        >
          <span className="mr-2">🇺🇸</span>
          <span>English</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleLanguageChange('ar')}
          className={language === 'ar' ? 'bg-accent' : ''}
        >
          <span className="mr-2">🇸🇦</span>
          <span>العربية</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
