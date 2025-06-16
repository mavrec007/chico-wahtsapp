
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
      title: t('sidebar.dashboard'),
      url: '/',
      icon: Home,
    },
    {
      title: t('sidebar.bookings'),
      url: '/bookings',
      icon: Calendar,
    },
    {
      title: t('nav.courts'),
      url: '/courts',
      icon: Target,
    },
    {
      title: t('nav.swimming'),
      url: '/swimming',
      icon: Waves,
    },
    {
      title: t('nav.accounting'),
      url: '/accounting',
      icon: CreditCard,
    },
    {
      title: t('sidebar.clients'),
      url: '/clients',
      icon: Users,
    },
    {
      title: t('sidebar.reports'),
      url: '/reports',
      icon: BarChart3,
    }
  ];

  const adminItems = [
    {
      title: t('nav.users'),
      url: '/admin/users',
      icon: Shield,
    },
    {
      title: t('sidebar.settings'),
      url: '/settings',
      icon: Settings,
    }
  ];

  const NavItem = ({ item }: { item: any }) => (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <NavLink
          to={item.url}
          className={({ isActive }) =>
            cn(
              `flex items-center space-x-3 ${isRTL ? 'space-x-reverse' : ''} p-3 rounded-xl transition-all duration-300 group relative overflow-hidden`,
              isActive
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'hover:bg-accent text-foreground'
            )
          }
        >
          {({ isActive }) => (
            <>
              <div className={cn(
                'p-2 rounded-lg transition-all duration-300',
                isActive 
                  ? 'bg-white/20 backdrop-blur-sm' 
                  : 'group-hover:bg-background/50'
              )}>
                <item.icon className="h-5 w-5" />
              </div>
              {!isCollapsed && (
                <span className="font-medium transition-all duration-300">
                  {item.title}
                </span>
              )}
              {isActive && !isCollapsed && (
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent animate-pulse" />
              )}
            </>
          )}
        </NavLink>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );

  return (
    <Sidebar 
      side={isRTL ? "right" : "left"}
      className={cn(
        'transition-all duration-300 border-border bg-sidebar/95 backdrop-blur-md fixed inset-y-0 z-50',
        isCollapsed ? 'w-16' : 'w-72'
      )}
    >
      <SidebarContent className="p-4">
        <div className="mb-8">
          <div className={cn(
            `flex items-center space-x-3 ${isRTL ? 'space-x-reverse' : ''} p-4 rounded-2xl gradient-primary text-white shadow-xl`,
            isCollapsed && 'justify-center'
          )}>
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <Calendar className="h-6 w-6" />
            </div>
            {!isCollapsed && (
              <div className={isRTL ? 'text-right' : 'text-left'}>
                <h1 className="text-xl font-bold">نظام الحجوزات</h1>
                <p className="text-white/80 text-sm">إدارة متكاملة</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className={cn(
            'text-muted-foreground font-semibold mb-4 px-2',
            isCollapsed ? 'text-center' : (isRTL ? 'text-right' : 'text-left')
          )}>
            {isCollapsed ? '•' : t('sidebar.mainMenu')}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {navigationItems.map((item) => (
                <NavItem key={item.url} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-8">
          <SidebarGroupLabel className={cn(
            'text-muted-foreground font-semibold mb-4 px-2',
            isCollapsed ? 'text-center' : (isRTL ? 'text-right' : 'text-left')
          )}>
            {isCollapsed ? '⚙' : t('sidebar.systemAdmin')}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {adminItems.map((item) => (
                <NavItem key={item.url} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {!isCollapsed && (
          <div className="mt-8 p-4 rounded-2xl bg-accent text-accent-foreground animate-fade-in">
            <div className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''} mb-2`}>
              <Clock className="h-5 w-5" />
              <span className="font-semibold">{t('sidebar.currentTime')}</span>
            </div>
            <p className="text-muted-foreground text-sm">
              {new Date().toLocaleTimeString(isRTL ? 'ar-SA' : 'en-US')}
            </p>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
