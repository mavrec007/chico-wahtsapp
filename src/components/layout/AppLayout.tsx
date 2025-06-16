
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';
import { AppHeader } from './AppHeader';
import { ThemeProvider } from 'next-themes';
import { useLanguage } from '@/contexts/LanguageContext';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const { isRTL } = useLanguage();

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <SidebarProvider defaultOpen={true}>
        <div 
          className={`min-h-screen flex w-full bg-gradient-to-br from-background via-background to-accent/5 transition-all duration-500 ease-in-out ${
            isRTL ? 'flex-row-reverse' : ''
          }`}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <AppSidebar />
          <div className="flex-1 flex flex-col min-w-0 relative">
            <AppHeader />
            <main className="flex-1 overflow-y-auto relative">
              <div className="container mx-auto p-4 md:p-6 lg:p-8 max-w-7xl">
                <div className="animate-fade-in">
                  {children}
                </div>
              </div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
}
