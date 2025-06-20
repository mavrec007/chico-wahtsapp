
import React from 'react';
import { useAppStore } from '@/stores/useAppStore';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import AppLogo from '@/components/ui/AppLogo';

export function SidebarHeader() {
  const { sidebarOpen, language } = useAppStore();
  const { t } = useTranslation();
  const isRTL = language === 'ar';

  return (
    <div className={cn(
      'flex items-center gap-3 p-4 border-b border-sidebar-border bg-gradient-primary',
      !sidebarOpen && 'lg:p-2 lg:justify-center'
    )}>
      <div className="flex-shrink-0">
        <AppLogo 
          location="sidebar" 
          className={cn(
            'transition-all duration-300',
            sidebarOpen ? 'w-10 h-10' : 'w-8 h-8'
          )}
        />
      </div>
      
      {sidebarOpen && (
        <div className={cn('min-w-0', isRTL ? 'text-right' : 'text-left')}>
          <h1 className="text-white font-bold text-lg leading-tight truncate">
            {t('app.name')}
          </h1>
          <p className="text-white/80 text-xs truncate">
            {t('app.tagline')}
          </p>
        </div>
      )}
    </div>
  );
}
