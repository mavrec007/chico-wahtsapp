
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SidebarNavItem } from './SidebarNavItem';
import { SidebarGroup } from './types';

interface SidebarNavGroupProps {
  group: SidebarGroup;
  isCollapsed: boolean;
  currentPath: string;
  isRTL: boolean;
}

export function SidebarNavGroup({ group, isCollapsed, currentPath, isRTL }: SidebarNavGroupProps) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(true);

  // Check if any item in this group is active
  const hasActiveItem = group.items.some(item => currentPath === item.href);

  const toggleGroup = () => {
    if (!isCollapsed) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="mb-6">
      {/* Group Label */}
      {!isCollapsed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={cn(
            'flex items-center justify-between px-3 py-2 mb-2 cursor-pointer',
            'text-xs font-medium uppercase tracking-wide',
            'text-slate-500 dark:text-gray-400 hover:text-slate-700 dark:hover:text-gray-200',
            'transition-colors duration-200'
          )}
          onClick={toggleGroup}
        >
          <span>
            {group.label === 'main' ? t('dashboard') : 
             group.label === 'الإدارة' ? 'الإدارة' : 
             group.label}
          </span>
          {group.items.length > 1 && (
            <ChevronDown 
              className={cn(
                'w-4 h-4 transition-transform duration-200',
                isOpen ? 'rotate-0' : 'rotate-180'
              )} 
            />
          )}
        </motion.div>
      )}

      {/* Group Items */}
      <motion.div
        initial={false}
        animate={{ 
          height: isCollapsed || isOpen ? 'auto' : 0,
          opacity: isCollapsed || isOpen ? 1 : 0.5
        }}
        transition={{ duration: 0.2 }}
        className="overflow-hidden"
      >
        <div className="space-y-1">
          {group.items.map((item) => (
            <SidebarNavItem
              key={item.href}
              item={item}
              isCollapsed={isCollapsed}
              isActive={currentPath === item.href}
              isRTL={isRTL}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
