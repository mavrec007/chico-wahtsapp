
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '@/stores/useAppStore';
import { cn } from '@/lib/utils';
import { X, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function SidebarHeader() {
  const { t } = useTranslation();
  const { sidebarOpen, setSidebarOpen, language } = useAppStore();
  const isRTL = language === 'ar';

  return (
    <div className={cn(
      'flex items-center justify-between p-4 border-b border-slate-200 dark:border-gray-700',
      'bg-white dark:bg-gray-900'
    )}>
      {/* Logo/Brand */}
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: isRTL ? 20 : -20 }}
          className="flex items-center gap-3"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-violet-600 rounded-lg flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-sm">SH</span>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-slate-900 dark:text-gray-100 text-sm">
              Sports Hub
            </span>
            <span className="text-xs text-slate-500 dark:text-gray-400">
              Management System
            </span>
          </div>
        </motion.div>
      )}

      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className={cn(
          'w-8 h-8 text-slate-600 dark:text-gray-400',
          'hover:text-slate-900 dark:hover:text-gray-100',
          'hover:bg-slate-100 dark:hover:bg-gray-800',
          'transition-colors'
        )}
        aria-label={sidebarOpen ? t('navigation.closeSidebar') : t('navigation.openSidebar')}
      >
        {sidebarOpen ? (
          <PanelLeftClose className="h-4 w-4" />
        ) : (
          <PanelLeftOpen className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}
