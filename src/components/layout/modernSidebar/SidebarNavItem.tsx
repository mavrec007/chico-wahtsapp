
import React from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { SidebarItem } from './types';

interface SidebarNavItemProps {
  item: SidebarItem;
  isCollapsed: boolean;
  isActive: boolean;
  isRTL: boolean;
}

export function SidebarNavItem({ item, isCollapsed, isActive, isRTL }: SidebarNavItemProps) {
  const Icon = item.icon;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15 }}
    >
      <NavLink
        to={item.href}
        className={cn(
          'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200',
          'group relative overflow-hidden',
          {
            // Active styles
            'bg-blue-500 text-white shadow-lg shadow-blue-500/25': isActive,
            'hover:bg-blue-400': isActive,
            
            // Inactive styles
            'text-slate-700 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-gray-800': !isActive,
            'hover:text-slate-900 dark:hover:text-gray-100': !isActive,
            
            // Collapsed styles
            'justify-center px-2': isCollapsed,
            'justify-start': !isCollapsed,
          }
        )}
      >
        {/* Background gradient for active state */}
        {isActive && (
          <motion.div
            layoutId="activeBackground"
            className="absolute inset-0 bg-gradient-to-r from-blue-500 to-violet-500 rounded-xl"
            initial={false}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        )}

        {/* Icon */}
        <div className="relative z-10">
          <Icon 
            className={cn(
              'w-5 h-5 transition-colors duration-200',
              isActive ? 'text-white' : 'text-slate-600 dark:text-gray-400 group-hover:text-slate-900 dark:group-hover:text-gray-100'
            )} 
          />
        </div>

        {/* Label */}
        {!isCollapsed && (
          <motion.span
            initial={{ opacity: 0, x: isRTL ? 10 : -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isRTL ? 10 : -10 }}
            transition={{ duration: 0.2 }}
            className={cn(
              'relative z-10 font-medium text-sm',
              isActive ? 'text-white' : 'group-hover:text-slate-900 dark:group-hover:text-gray-100'
            )}
          >
            {item.label}
          </motion.span>
        )}

        {/* Active indicator */}
        {isActive && (
          <motion.div
            layoutId="activeIndicator"
            className={cn(
              'absolute w-1 h-8 bg-white rounded-full',
              isRTL ? 'left-1' : 'right-1'
            )}
            initial={false}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        )}
      </NavLink>
    </motion.div>
  );
}
