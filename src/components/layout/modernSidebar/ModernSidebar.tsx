
import React from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { useAppStore } from '@/stores/useAppStore';
import { cn } from '@/lib/utils';
import { SidebarHeader } from './SidebarHeader';
import { SidebarNavGroup } from './SidebarNavGroup';
import { sidebarConfig } from './sidebarConfig';

export function ModernSidebar() {
  const { t } = useTranslation();
  const { sidebarOpen, setSidebarOpen, language } = useAppStore();
  const location = useLocation();
  const isRTL = language === 'ar';

  // Animation variants for sidebar
  const sidebarVariants: Variants = {
    open: {
      x: 0,
      width: 280,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.3
      }
    },
    closed: {
      x: isRTL ? 280 : -280,
      width: 280,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.3
      }
    },
    collapsed: {
      x: 0,
      width: 64,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.3
      }
    }
  };

  const overlayVariants: Variants = {
    open: { opacity: 1 },
    closed: { opacity: 0 }
  };

  // Determine sidebar state
  const getSidebarState = () => {
    if (window.innerWidth >= 1024) { // lg breakpoint
      return sidebarOpen ? 'open' : 'collapsed';
    }
    return sidebarOpen ? 'open' : 'closed';
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {sidebarOpen && window.innerWidth < 1024 && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={overlayVariants}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial="closed"
        animate={getSidebarState()}
        variants={sidebarVariants}
        className={cn(
          'fixed top-0 z-50 h-screen lg:static lg:z-auto',
          'bg-white dark:bg-gray-900 border-slate-200 dark:border-gray-700 shadow-xl lg:shadow-lg',
          'flex flex-col transition-all duration-300 ease-out',
          isRTL ? 'right-0 border-l' : 'left-0 border-r'
        )}
        role="navigation"
        aria-label={t('navigation.mainNavigation')}
      >
        {/* Header */}
        <SidebarHeader />

        {/* Navigation Content */}
        <div className="flex-1 overflow-y-auto px-4 py-6 bg-slate-50 dark:bg-gray-850">
          <nav>
            {sidebarConfig.groups.map((group, index) => (
              <SidebarNavGroup
                key={group.label}
                group={group}
                isCollapsed={!sidebarOpen && window.innerWidth >= 1024}
                currentPath={location.pathname}
                isRTL={isRTL}
              />
            ))}
          </nav>
        </div>

        {/* Footer */}
        <div className={cn(
          'p-4 border-t border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-900',
          !sidebarOpen && 'lg:p-2 lg:text-center'
        )}>
          {sidebarOpen ? (
            <div className="text-xs text-slate-500 dark:text-gray-400 text-center">
              <p className="font-medium">Sports Hub</p>
              <p>Version 2.0</p>
            </div>
          ) : (
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-violet-500 rounded-lg mx-auto opacity-60" />
          )}
        </div>
      </motion.aside>
    </>
  );
}
