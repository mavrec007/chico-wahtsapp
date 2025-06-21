import React, { useEffect } from 'react';
import { useAppStore } from '@/stores/useAppStore';
import SidebarRail from './SidebarRail';
import Topbar from './Topbar';
import AuthModal from '@/components/auth/AuthModal';
import { cn } from '@/lib/utils';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { language, theme, sidebarOpen, setSidebarOpen } = useAppStore();
  const isRTL = language === 'ar';

  // Theme & dir handling
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  }, [theme, isRTL]);

  // Auto-open on Xl screens
  useEffect(() => {
    setSidebarOpen(window.innerWidth >= 1536);
  }, [setSidebarOpen]);

  // On large screens: closed = 4rem rail, open = 18rem rail
  const railWidth = sidebarOpen ? 72 : 16; // in Tailwind units (4 = 1rem)
  const insetClass = isRTL
    ? `lg:pr-${railWidth}`
    : `lg:pl-${railWidth}`;

  return (
    <div
      className={cn(
        'min-h-screen flex bg-background transition-all duration-200 ease-in-out',
        isRTL ? 'flex-row-reverse' : 'flex-row'
      )}
    >
      {/* Rail / mini-sidebar */}
      <SidebarRail />

      {/* Main area */}
      <div className="flex-1 flex flex-col min-h-screen transition-all duration-200 ease-in-out">
        {/* Topbar: sticky, full-width on sm, inset on lg */}
        <Topbar 
          className={cn(
            'sticky top-0 z-30 w-full bg-surface dark:bg-surface-dark transition-all duration-200 ease-in-out',
            insetClass
          )}
        />

        {/* Page content: also inset on lg to align under Topbar */}
        <main
          className={cn(
            'flex-1 overflow-auto bg-background transition-all duration-200 ease-in-out',
            insetClass
          )}
        >
          <div className="container mx-auto p-6 max-w-7xl">
            {children}
          </div>
        </main>
      </div>

      <AuthModal />
    </div>
  );
};

export default Layout;
