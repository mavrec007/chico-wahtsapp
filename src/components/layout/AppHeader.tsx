
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
      <header className={`h-16 border-b bg-card/95 backdrop-blur-md sticky top-0 z-40 transition-all duration-300 ${
        isRTL 
          ? state === 'expanded' ? 'mr-72' : 'mr-16'
          : state === 'expanded' ? 'ml-72' : 'ml-16'
      }`}>
        <div className={`flex items-center justify-between h-full px-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
          {/* Left section */}
          <div className={`flex items-center space-x-4 ${isRTL ? 'space-x-reverse' : ''}`}>
            <SidebarTrigger className="p-2 hover:bg-accent rounded-lg transition-all duration-200" />
            
            <div className={`hidden lg:block ${isRTL ? 'text-right' : 'text-left'}`}>
              <h1 className="text-lg font-semibold text-foreground">
                {t('dashboard.title')}
              </h1>
              <p className="text-sm text-muted-foreground">
                {t('dashboard.subtitle')}
              </p>
            </div>
          </div>

          {/* Center section - Search */}
          <div className="hidden lg:flex items-center max-w-md w-full">
            <div className="relative w-full">
              <Search className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground`} />
              <input
                type="text"
                placeholder={t('header.searchPlaceholder')}
                className={`w-full ${isRTL ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4'} py-2 border bg-background rounded-xl text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-300`}
              />
            </div>
          </div>

          {/* Right section */}
          <div className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
            {/* Style Control Panel */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsStylePanelOpen(true)}
              className="hover:bg-accent rounded-full transition-all duration-200"
            >
              <Palette className="h-5 w-5 text-muted-foreground" />
            </Button>

            {/* Language toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLanguage}
              className="hover:bg-accent rounded-full transition-all duration-200"
            >
              <Languages className="h-5 w-5 text-muted-foreground" />
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative hover:bg-accent rounded-full transition-all duration-200">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </Button>

            {/* Theme toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="hover:bg-accent rounded-full transition-all duration-200"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5 text-muted-foreground" />
              ) : (
                <Moon className="h-5 w-5 text-muted-foreground" />
              )}
            </Button>

            {/* User menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''} hover:bg-accent rounded-xl p-2 transition-all duration-200`}>
                  <div className="w-8 h-8 gradient-primary rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <div className={`hidden md:block ${isRTL ? 'text-right' : 'text-left'}`}>
                    <p className="text-sm font-medium text-foreground">{t('header.userName')}</p>
                    <p className="text-xs text-muted-foreground">{t('header.userRole')}</p>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
                  <User className="h-4 w-4" />
                  <span>{t('header.profile')}</span>
                </DropdownMenuItem>
                <DropdownMenuItem className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
                  <Settings className="h-4 w-4" />
                  <span>{t('header.settings')}</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''} text-destructive`}>
                  <LogOut className="h-4 w-4" />
                  <span>{t('header.logout')}</span>
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
