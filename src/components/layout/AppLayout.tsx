
import React from 'react';
import { SidebarProvider } from './SidebarProvider';
import { AppSidebar } from './AppSidebar';
import { AppHeader } from './AppHeader';
import { ThemeProvider } from 'next-themes';
import { useLanguage } from '@/context/LanguageContext';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const { isRTL } = useLanguage();

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <SidebarProvider defaultOpen={true}>
        <div className={`min-h-screen flex w-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <AppSidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <AppHeader />
            <main className="flex-1 overflow-y-auto">
              <div className="container mx-auto p-6">
                {children}
              </div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
}
