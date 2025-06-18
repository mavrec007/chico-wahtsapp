import React, { useEffect } from 'react';
import { useAppStore } from '@/stores/useAppStore';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import AuthModal from '@/components/auth/AuthModal';
import { cn } from '@/lib/utils';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { language, theme, sidebarOpen } = useAppStore();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    document.documentElement.classList.add('antialiased');
  }, [theme, language]);

  const isRTL = language === 'ar';

  return (
    <div className={cn(
      'min-h-screen flex flex-col lg:flex-row transition-all duration-300 ease-in-out',
      isRTL ? 'flex-row-reverse' : 'flex-row'
    )}>
      {/* Sidebar - ثابت على الشاشات الكبيرة */}
      <Sidebar />

      {/* Main content: topbar + children */}
      <div
        className={cn(
          'flex-1 flex flex-col transition-all duration-300 ease-in-out',
          sidebarOpen ? (isRTL ? 'lg:mr-72 ' : 'lg:ml-72') : ''
        )}
      >
        <Topbar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-white dark:bg-gray-950 transition-all">
          {children}
        </main>
      </div>

      <AuthModal />
    </div>
  );
};

export default Layout;
