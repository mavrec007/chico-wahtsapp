
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
          className={`min-h-screen flex w-full bg-gradient-to-br from-background via-background to-muted/20 transition-all duration-500 ease-in-out ${
            isRTL ? 'flex-row-reverse' : ''
          }`}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <AppSidebar />
          <div className="flex-1 flex flex-col min-w-0 relative">
            <AppHeader />
            <main className="flex-1 overflow-y-auto relative bg-gradient-to-br from-background to-muted/10">
              <div className="min-h-full">
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
