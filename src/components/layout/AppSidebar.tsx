
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Calendar, 
  Users, 
  Settings, 
  BarChart3, 
  CreditCard, 
  Shield, 
  Home,
  Plus,
  Clock,
  Waves,
  Target
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';

export function AppSidebar() {
  const { state } = useSidebar();
  const { isRTL, t } = useLanguage();
  const isCollapsed = state === 'collapsed';

  const navigationItems = [
    {
      title: t('nav.home'),
      url: '/',
      icon: Home,
      gradient: 'from-blue-500 to-purple-600'
    },
    {
      title: t('nav.bookings'),
      url: '/bookings',
      icon: Calendar,
      gradient: 'from-emerald-500 to-teal-600'
    },
    {
      title: t('nav.courts'),
      url: '/courts',
      icon: Target,
      gradient: 'from-orange-500 to-red-600'
    },
    {
      title: t('nav.swimming'),
      url: '/swimming',
      icon: Waves,
      gradient: 'from-cyan-500 to-blue-600'
    },
    {
      title: t('nav.accounting'),
      url: '/accounting',
      icon: CreditCard,
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      title: t('nav.clients'),
      url: '/clients',
      icon: Users,
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      title: t('nav.reports'),
      url: '/reports',
      icon: BarChart3,
      gradient: 'from-indigo-500 to-purple-600'
    }
  ];

  const adminItems = [
    {
      title: t('nav.users'),
      url: '/admin/users',
      icon: Shield,
      gradient: 'from-red-500 to-pink-600'
    },
    {
      title: t('nav.settings'),
      url: '/settings',
      icon: Settings,
      gradient: 'from-gray-500 to-slate-600'
    }
  ];

  const NavItem = ({ item, isActive }: { item: any; isActive: boolean }) => (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <NavLink
          to={item.url}
          className={({ isActive }) =>
            cn(
              `flex items-center space-x-3 ${isRTL ? 'space-x-reverse' : ''} p-3 rounded-xl transition-all duration-300 group relative overflow-hidden`,
              isActive
                ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg transform scale-105`
                : 'hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-50 dark:hover:from-gray-800 dark:hover:to-gray-700 text-gray-700 dark:text-gray-300'
            )
          }
        >
          {({ isActive }) => (
            <>
              <div className={cn(
                'p-2 rounded-lg transition-all duration-300',
                isActive 
                  ? 'bg-white/20 backdrop-blur-sm' 
                  : 'group-hover:bg-white/10'
              )}>
                <item.icon className={cn(
                  'h-5 w-5 transition-all duration-300',
                  isActive ? 'text-white' : 'text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200'
                )} />
              </div>
              {!isCollapsed && (
                <span className={cn(
                  'font-medium transition-all duration-300',
                  isActive ? 'text-white' : 'group-hover:text-gray-800 dark:group-hover:text-gray-200'
                )}>
                  {item.title}
                </span>
              )}
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-pulse" />
              )}
            </>
          )}
        </NavLink>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );

  return (
    <Sidebar className={cn(
      'transition-all duration-300 border-r border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md',
      isCollapsed ? 'w-16' : 'w-72'
    )}>
      <SidebarContent className="p-4">
        <div className="mb-8">
          <div className={cn(
            `flex items-center space-x-3 ${isRTL ? 'space-x-reverse' : ''} p-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-700 text-white shadow-xl`,
            isCollapsed && 'justify-center'
          )}>
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <Calendar className="h-6 w-6" />
            </div>
            {!isCollapsed && (
              <div className={isRTL ? 'text-right' : 'text-left'}>
                <h1 className="text-xl font-bold">{t('sidebar.appTitle')}</h1>
                <p className="text-blue-100 text-sm">{t('sidebar.appSubtitle')}</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className={cn(
            'text-gray-500 dark:text-gray-400 font-semibold mb-4 px-2',
            isCollapsed ? 'text-center' : (isRTL ? 'text-right' : 'text-left')
          )}>
            {isCollapsed ? '•' : t('sidebar.mainMenu')}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {navigationItems.map((item) => (
                <NavItem key={item.url} item={item} isActive={false} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-8">
          <SidebarGroupLabel className={cn(
            'text-gray-500 dark:text-gray-400 font-semibold mb-4 px-2',
            isCollapsed ? 'text-center' : (isRTL ? 'text-right' : 'text-left')
          )}>
            {isCollapsed ? '⚙' : t('sidebar.systemAdmin')}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {adminItems.map((item) => (
                <NavItem key={item.url} item={item} isActive={false} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {!isCollapsed && (
          <div className="mt-8 p-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
            <div className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''} mb-2`}>
              <Clock className="h-5 w-5" />
              <span className="font-semibold">{t('sidebar.currentTime')}</span>
            </div>
            <p className="text-emerald-100 text-sm">
              {new Date().toLocaleTimeString(isRTL ? 'ar-SA' : 'en-US')}
            </p>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
