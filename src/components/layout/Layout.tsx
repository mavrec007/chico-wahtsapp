
import React, { useEffect } from 'react';
import { useAppStore } from '@/stores/useAppStore';
import { ModernSidebar } from './modernSidebar/ModernSidebar';
import Topbar from './Topbar';
import AuthModal from '@/components/auth/AuthModal';
import { cn } from '@/lib/utils';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { language, sidebarOpen, setSidebarOpen } = useAppStore();

  // Set initial sidebar state based on screen width
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) { // lg breakpoint
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    // Set initial state
    handleResize();

    // Listen for resize events
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setSidebarOpen]);

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const isRTL = language === 'ar';

  const getMainPadding = () => {
    if (window.innerWidth >= 1024) { // lg breakpoint
      return sidebarOpen 
        ? isRTL ? 'lg:pr-70' : 'lg:pl-70'
        : isRTL ? 'lg:pr-16' : 'lg:pl-16';
    }
    return '';
  };

  return (
    <div
      className={cn(
        'min-h-screen flex bg-slate-50 dark:bg-gray-900 transition-all duration-200 ease-in-out',
        isRTL ? 'flex-row-reverse' : 'flex-row'
      )}
    >
      {/* Sidebar */}
      <ModernSidebar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 min-h-screen transition-all duration-200 ease-in-out">
        {/* Topbar */}
        <Topbar className={cn('transition-all duration-200', getMainPadding())} />
        
        {/* Page Content */}
        <main className={cn(
          'flex-1 overflow-auto bg-gradient-to-br from-slate-50 to-blue-50/30 dark:from-gray-900 dark:to-blue-950/20',
          'transition-all duration-200',
          getMainPadding()
        )}>
          <div className="container mx-auto p-6 max-w-7xl">
            {children}
          </div>
        </main>
      </div>

      {/* Auth Modal */}
      <AuthModal />
    </div>
  );
};

export default Layout;
