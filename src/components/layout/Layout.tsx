
import React, { useEffect } from 'react';
import { useAppStore } from '@/stores/useAppStore';
import { ModernSidebar } from './modernSidebar';
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
      'min-h-screen flex bg-background transition-all duration-300 ease-in-out',
      isRTL ? 'flex-row-reverse' : 'flex-row'
    )}>
      {/* Modern Sidebar */}
      <ModernSidebar />

      {/* Main Content Area */}
      <div className={cn(
        'flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out',
        // Desktop spacing adjustment when sidebar is expanded
        sidebarOpen ? 'lg:ml-64' : 'lg:ml-16',
        isRTL && sidebarOpen && 'lg:ml-0 lg:mr-64',
        isRTL && !sidebarOpen && 'lg:ml-0 lg:mr-16'
      )}>
        {/* Topbar */}
        <Topbar />
        
        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-gradient-to-br from-background to-muted/20">
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
