
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarTrigger,
  useSidebar
} from '@/components/ui/sidebar';
import {
  Bell,
  Search,
  Settings,
  User,
  LogOut,
  Moon,
  Sun,
  Languages,
  Palette
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { useLanguage } from '@/contexts/LanguageContext';
import { StyleControlPanel } from '@/components/panels/StyleControlPanel';

export function AppHeader() {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, isRTL, t } = useLanguage();
  const { state } = useSidebar();
  const [isStylePanelOpen, setIsStylePanelOpen] = useState(false);

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <>
      <header className={`
        h-16 border-b glass-effect sticky top-0 z-40 
        transition-all duration-300 ease-in-out
        ${isRTL 
          ? state === 'expanded' ? 'mr-0 md:mr-72' : 'mr-0 md:mr-16'
          : state === 'expanded' ? 'ml-0 md:ml-72' : 'ml-0 md:ml-16'
        }
      `}>
        <div className={`flex items-center justify-between h-full px-4 md:px-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
          {/* Left section */}
          <div className={`flex items-center space-x-3 md:space-x-4 ${isRTL ? 'space-x-reverse' : ''}`}>
            <SidebarTrigger className="p-2 hover:bg-accent/60 rounded-xl transition-all duration-200 hover-glow" />
            
            <div className={`hidden lg:block ${isRTL ? 'text-right' : 'text-left'}`}>
              <h1 className="text-lg md:text-xl font-bold text-gradient">
                {t('dashboard.title', 'لوحة التحكم')}
              </h1>
              <p className="text-xs md:text-sm text-muted-foreground">
                {t('dashboard.subtitle', 'نظام إدارة شامل')}
              </p>
            </div>
          </div>

          {/* Center section - Search */}
          <div className="hidden md:flex items-center max-w-sm lg:max-w-md xl:max-w-lg w-full mx-4">
            <div className="relative w-full">
              <Search className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground`} />
              <input
                type="text"
                placeholder={t('header.searchPlaceholder', 'البحث...')}
                className={`
                  w-full ${isRTL ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4'} py-2.5 
                  border-0 bg-muted/40 rounded-xl text-foreground placeholder-muted-foreground 
                  focus:ring-2 focus:ring-primary/50 focus:bg-background
                  transition-all duration-300 text-sm
                  backdrop-blur-sm
                `}
              />
            </div>
          </div>

          {/* Right section */}
          <div className={`flex items-center space-x-1 md:space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
            {/* Style Control Panel */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsStylePanelOpen(true)}
              className="h-9 w-9 hover:bg-accent/60 rounded-xl transition-all duration-200 hover-glow"
            >
              <Palette className="h-4 w-4 text-muted-foreground" />
            </Button>

            {/* Language toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLanguage}
              className="h-9 w-9 hover:bg-accent/60 rounded-xl transition-all duration-200 hover-glow"
            >
              <Languages className="h-4 w-4 text-muted-foreground" />
            </Button>

            {/* Notifications */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative h-9 w-9 hover:bg-accent/60 rounded-xl transition-all duration-200 hover-glow"
            >
              <Bell className="h-4 w-4 text-muted-foreground" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center animate-glow">
                3
              </span>
            </Button>

            {/* Theme toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="h-9 w-9 hover:bg-accent/60 rounded-xl transition-all duration-200 hover-glow"
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Moon className="h-4 w-4 text-muted-foreground" />
              )}
            </Button>

            {/* User menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className={`
                  flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''} 
                  hover:bg-accent/60 rounded-xl p-2 transition-all duration-200 hover-glow
                  h-auto min-w-0
                `}>
                  <div className="w-8 h-8 gradient-primary rounded-xl flex items-center justify-center animate-glow">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <div className={`hidden lg:block ${isRTL ? 'text-right' : 'text-left'} min-w-0`}>
                    <p className="text-sm font-medium text-foreground truncate">
                      {t('header.userName', 'أحمد محمد')}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {t('header.userRole', 'مدير النظام')}
                    </p>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="w-56 glass-card border-0 shadow-xl"
                sideOffset={5}
              >
                <DropdownMenuItem className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''} p-3 hover:bg-accent/60 transition-colors`}>
                  <User className="h-4 w-4" />
                  <span>{t('header.profile', 'الملف الشخصي')}</span>
                </DropdownMenuItem>
                <DropdownMenuItem className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''} p-3 hover:bg-accent/60 transition-colors`}>
                  <Settings className="h-4 w-4" />
                  <span>{t('header.settings', 'الإعدادات')}</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-border/50" />
                <DropdownMenuItem className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''} p-3 text-destructive hover:bg-destructive/10 transition-colors`}>
                  <LogOut className="h-4 w-4" />
                  <span>{t('header.logout', 'تسجيل الخروج')}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <StyleControlPanel
        isOpen={isStylePanelOpen}
        onClose={() => setIsStylePanelOpen(false)}
      />
    </>
  );
}
