
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
      title: t('sidebar.dashboard', 'لوحة التحكم'),
      url: '/',
      icon: Home,
    },
    {
      title: t('sidebar.bookings', 'الحجوزات'),
      url: '/bookings',
      icon: Calendar,
    },
    {
      title: t('nav.courts', 'الملاعب'),
      url: '/courts',
      icon: Target,
    },
    {
      title: t('nav.swimming', 'المسابح'),
      url: '/swimming',
      icon: Waves,
    },
    {
      title: t('nav.accounting', 'المحاسبة'),
      url: '/accounting',
      icon: CreditCard,
    },
    {
      title: t('sidebar.clients', 'العملاء'),
      url: '/clients',
      icon: Users,
    },
    {
      title: t('sidebar.reports', 'التقارير'),
      url: '/reports',
      icon: BarChart3,
    }
  ];

  const adminItems = [
    {
      title: t('nav.users', 'المستخدمين'),
      url: '/admin/users',
      icon: Shield,
    },
    {
      title: t('sidebar.settings', 'الإعدادات'),
      url: '/settings',
      icon: Settings,
    }
  ];

  const NavItem = ({ item }: { item: any }) => (
    <SidebarMenuItem>
      <SidebarMenuButton asChild tooltip={isCollapsed ? item.title : undefined}>
        <NavLink
          to={item.url}
          className={({ isActive }) =>
            cn(
              `flex items-center space-x-3 ${isRTL ? 'space-x-reverse' : ''} p-3 rounded-xl transition-all duration-300 group relative overflow-hidden hover-lift`,
              isActive
                ? 'gradient-primary text-white shadow-lg animate-glow'
                : 'hover:bg-accent/60 text-foreground hover:shadow-md'
            )
          }
        >
          {({ isActive }) => (
            <>
              <div className={cn(
                'p-2 rounded-lg transition-all duration-300 flex-shrink-0',
                isActive 
                  ? 'bg-white/20 backdrop-blur-sm shadow-inner' 
                  : 'group-hover:bg-primary/10'
              )}>
                <item.icon className="h-5 w-5" />
              </div>
              {!isCollapsed && (
                <span className="font-medium transition-all duration-300 truncate">
                  {item.title}
                </span>
              )}
              {isActive && !isCollapsed && (
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent animate-float" />
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
        'transition-all duration-300 border-border fixed inset-y-0 z-50',
        'gradient-sidebar backdrop-blur-lg border-r border-border/50',
        isCollapsed ? 'w-16' : 'w-72'
      )}
    >
      <SidebarContent className="p-4">
        {/* Logo Section */}
        <div className="mb-8 animate-slide-up">
          <div className={cn(
            `flex items-center space-x-3 ${isRTL ? 'space-x-reverse' : ''} p-4 rounded-2xl gradient-primary text-white shadow-xl hover-lift animate-glow`,
            isCollapsed && 'justify-center px-2'
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

        {/* Main Navigation */}
        <SidebarGroup className="animate-slide-in-left">
          <SidebarGroupLabel className={cn(
            'text-muted-foreground font-semibold mb-4 px-2 text-xs uppercase tracking-wider',
            isCollapsed ? 'text-center' : (isRTL ? 'text-right' : 'text-left')
          )}>
            {isCollapsed ? '•••' : t('sidebar.mainMenu', 'القائمة الرئيسية')}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {navigationItems.map((item, index) => (
                <div 
                  key={item.url} 
                  className="animate-slide-in-left"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <NavItem item={item} />
                </div>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Admin Section */}
        <SidebarGroup className="mt-8 animate-slide-in-right">
          <SidebarGroupLabel className={cn(
            'text-muted-foreground font-semibold mb-4 px-2 text-xs uppercase tracking-wider',
            isCollapsed ? 'text-center' : (isRTL ? 'text-right' : 'text-left')
          )}>
            {isCollapsed ? '⚙' : t('sidebar.systemAdmin', 'إدارة النظام')}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {adminItems.map((item, index) => (
                <div 
                  key={item.url} 
                  className="animate-slide-in-right"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <NavItem item={item} />
                </div>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Time Widget */}
        {!isCollapsed && (
          <div className="mt-8 p-4 rounded-2xl glass-card hover-glow animate-fade-in">
            <div className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''} mb-2`}>
              <Clock className="h-5 w-5 text-primary animate-float" />
              <span className="font-semibold text-sm">
                {t('sidebar.currentTime', 'الوقت الحالي')}
              </span>
            </div>
            <p className="text-muted-foreground text-sm font-mono">
              {new Date().toLocaleTimeString(isRTL ? 'ar-SA' : 'en-US')}
            </p>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
