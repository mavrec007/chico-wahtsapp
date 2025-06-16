
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

  // Calculate dynamic margin based on sidebar state and direction
  const getHeaderMargin = () => {
    if (isRTL) {
      return state === 'expanded' ? 'mr-0 lg:mr-72' : 'mr-0 lg:mr-16';
    } else {
      return state === 'expanded' ? 'ml-0 lg:ml-72' : 'ml-0 lg:ml-16';
    }
  };

  return (
    <>
      <header className={`
        h-16 border-b glass-effect sticky top-0 z-40 
        transition-all duration-500 ease-in-out transform
        ${getHeaderMargin()}
        backdrop-blur-xl bg-background/80 shadow-lg shadow-primary/5
        animate-slide-in-${isRTL ? 'right' : 'left'}
      `}>
        <div className={`flex items-center justify-between h-full px-4 md:px-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
          {/* Left section with enhanced trigger */}
          <div className={`flex items-center space-x-3 md:space-x-4 ${isRTL ? 'space-x-reverse' : ''}`}>
            <SidebarTrigger className="p-2.5 hover:bg-primary/10 rounded-xl transition-all duration-300 hover-glow hover:scale-105 active:scale-95" />
            
            <div className={`hidden lg:block ${isRTL ? 'text-right' : 'text-left'} animate-fade-in`}>
              <h1 className="text-lg md:text-xl font-bold text-gradient animate-glow">
                {t('dashboard.title', 'لوحة التحكم')}
              </h1>
              <p className="text-xs md:text-sm text-muted-foreground animate-slide-up">
                {t('dashboard.subtitle', 'نظام إدارة شامل')}
              </p>
            </div>
          </div>

          {/* Center section - Enhanced Search */}
          <div className="hidden md:flex items-center max-w-sm lg:max-w-md xl:max-w-lg w-full mx-4 animate-scale-in">
            <div className="relative w-full group">
              <Search className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors duration-300 group-focus-within:text-primary`} />
              <input
                type="text"
                placeholder={t('header.searchPlaceholder', 'البحث...')}
                className={`
                  w-full ${isRTL ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4'} py-3 
                  border-0 bg-muted/40 rounded-xl text-foreground placeholder-muted-foreground 
                  focus:ring-2 focus:ring-primary/50 focus:bg-background/90
                  transition-all duration-500 text-sm hover:bg-muted/60
                  backdrop-blur-sm shadow-inner hover:shadow-lg
                  group-focus-within:scale-105 group-focus-within:shadow-primary/20
                `}
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          </div>

          {/* Right section with enhanced buttons */}
          <div className={`flex items-center space-x-1 md:space-x-2 ${isRTL ? 'space-x-reverse' : ''} animate-slide-in-right`}>
            {/* Style Control Panel */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsStylePanelOpen(true)}
              className="h-10 w-10 hover:bg-primary/10 rounded-xl transition-all duration-300 hover-glow hover:scale-105 active:scale-95"
            >
              <Palette className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors" />
            </Button>

            {/* Language toggle with enhanced animation */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLanguage}
              className="h-10 w-10 hover:bg-primary/10 rounded-xl transition-all duration-300 hover-glow hover:scale-105 active:scale-95 hover:rotate-12"
            >
              <Languages className="h-4 w-4 text-muted-foreground hover:text-primary transition-all duration-300" />
            </Button>

            {/* Notifications with pulse animation */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative h-10 w-10 hover:bg-primary/10 rounded-xl transition-all duration-300 hover-glow hover:scale-105 active:scale-95"
            >
              <Bell className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors" />
              <span className="absolute -top-1 -right-1 h-5 w-5 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center animate-pulse shadow-lg">
                3
              </span>
            </Button>

            {/* Theme toggle with smooth rotation */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="h-10 w-10 hover:bg-primary/10 rounded-xl transition-all duration-300 hover-glow hover:scale-105 active:scale-95 hover:rotate-180"
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4 text-muted-foreground hover:text-primary transition-all duration-300" />
              ) : (
                <Moon className="h-4 w-4 text-muted-foreground hover:text-primary transition-all duration-300" />
              )}
            </Button>

            {/* Enhanced User menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className={`
                  flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''} 
                  hover:bg-primary/10 rounded-xl p-2 transition-all duration-300 hover-glow
                  h-auto min-w-0 hover:scale-105 active:scale-95
                `}>
                  <div className="w-9 h-9 gradient-primary rounded-xl flex items-center justify-center animate-glow shadow-lg">
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
                className="w-56 glass-card border-0 shadow-2xl shadow-primary/10 animate-scale-in"
                sideOffset={5}
              >
                <DropdownMenuItem className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''} p-3 hover:bg-primary/10 transition-all duration-300 rounded-lg`}>
                  <User className="h-4 w-4" />
                  <span>{t('header.profile', 'الملف الشخصي')}</span>
                </DropdownMenuItem>
                <DropdownMenuItem className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''} p-3 hover:bg-primary/10 transition-all duration-300 rounded-lg`}>
                  <Settings className="h-4 w-4" />
                  <span>{t('header.settings', 'الإعدادات')}</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-border/50 my-2" />
                <DropdownMenuItem className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''} p-3 text-destructive hover:bg-destructive/10 transition-all duration-300 rounded-lg`}>
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
