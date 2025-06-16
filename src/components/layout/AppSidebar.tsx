
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
  Target,
  Activity,
  FileText,
  UserCheck,
  Key,
  Database
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
      description: 'النظرة العامة والإحصائيات'
    },
    {
      title: t('sidebar.bookings', 'إدارة الحجوزات'),
      url: '/bookings',
      icon: Calendar,
      description: 'عرض وإدارة جميع الحجوزات'
    },
    {
      title: t('nav.courts', 'الملاعب الرياضية'),
      url: '/courts',
      icon: Target,
      description: 'إدارة الملاعب والمرافق'
    },
    {
      title: t('nav.swimming', 'المسابح'),
      url: '/swimming',
      icon: Waves,
      description: 'إدارة المسابح ومواعيدها'
    },
    {
      title: t('nav.accounting', 'المحاسبة والمالية'),
      url: '/accounting',
      icon: CreditCard,
      description: 'الفواتير والمدفوعات'
    },
    {
      title: t('sidebar.clients', 'إدارة العملاء'),
      url: '/clients',
      icon: Users,
      description: 'بيانات العملاء والعضويات'
    },
    {
      title: t('sidebar.reports', 'التقارير والإحصائيات'),
      url: '/reports',
      icon: BarChart3,
      description: 'تقارير الأداء والتحليلات'
    }
  ];

  const permissionsItems = [
    {
      title: t('nav.users', 'إدارة المستخدمين'),
      url: '/admin/users',
      icon: UserCheck,
      description: 'إضافة وإدارة المستخدمين'
    },
    {
      title: t('nav.roles', 'الأدوار والصلاحيات'),
      url: '/admin/roles',
      icon: Shield,
      description: 'تحديد الأدوار والصلاحيات'
    },
    {
      title: t('nav.permissions', 'إعدادات الأمان'),
      url: '/admin/permissions',
      icon: Key,
      description: 'إدارة صلاحيات النظام'
    }
  ];

  const systemItems = [
    {
      title: t('nav.activities', 'سجل الأنشطة'),
      url: '/admin/activities',
      icon: Activity,
      description: 'متابعة نشاطات النظام'
    },
    {
      title: t('nav.backup', 'النسخ الاحتياطي'),
      url: '/admin/backup',
      icon: Database,
      description: 'إدارة النسخ الاحتياطية'
    },
    {
      title: t('sidebar.settings', 'إعدادات النظام'),
      url: '/settings',
      icon: Settings,
      description: 'إعدادات عامة للنظام'
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
                ? 'gradient-primary text-white shadow-lg'
                : 'hover:bg-primary/10 text-foreground hover:shadow-md'
            )
          }
        >
          {({ isActive }) => (
            <>
              <div className={cn(
                'p-2.5 rounded-lg transition-all duration-300 flex-shrink-0',
                isActive 
                  ? 'bg-white/20 backdrop-blur-sm shadow-inner' 
                  : 'group-hover:bg-primary/15 group-hover:scale-110'
              )}>
                <item.icon className="h-5 w-5" />
              </div>
              {!isCollapsed && (
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="font-medium transition-all duration-300 truncate text-sm">
                    {item.title}
                  </span>
                  {!isActive && (
                    <span className="text-xs text-muted-foreground truncate opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {item.description}
                    </span>
                  )}
                </div>
              )}
              {isActive && !isCollapsed && (
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent animate-float pointer-events-none" />
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
        'transition-all duration-500 border-border fixed inset-y-0 z-50',
        'gradient-sidebar backdrop-blur-lg border-r border-border/50 shadow-xl',
        isCollapsed ? 'w-16' : 'w-72'
      )}
    >
      <SidebarContent className="p-4 space-y-6">
        {/* Logo Section */}
        <div className="animate-slide-up">
          <div className={cn(
            `flex items-center space-x-3 ${isRTL ? 'space-x-reverse' : ''} p-4 rounded-2xl gradient-primary text-white shadow-xl hover-lift`,
            isCollapsed && 'justify-center px-2'
          )}>
            <div className="p-2.5 bg-white/20 rounded-lg backdrop-blur-sm animate-glow">
              <Activity className="h-6 w-6" />
            </div>
            {!isCollapsed && (
              <div className={isRTL ? 'text-right' : 'text-left'}>
                <h1 className="text-lg font-bold">نظام إدارة المرافق</h1>
                <p className="text-white/80 text-xs">الرياضية المتكامل</p>
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
            {isCollapsed ? '📊' : t('sidebar.mainMenu', 'الإدارة الرئيسية')}
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

        {/* Permissions Section */}
        <SidebarGroup className="animate-slide-in-right">
          <SidebarGroupLabel className={cn(
            'text-muted-foreground font-semibold mb-4 px-2 text-xs uppercase tracking-wider',
            isCollapsed ? 'text-center' : (isRTL ? 'text-right' : 'text-left')
          )}>
            {isCollapsed ? '🔐' : t('sidebar.permissions', 'الصلاحيات والأمان')}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {permissionsItems.map((item, index) => (
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

        {/* System Admin Section */}
        <SidebarGroup className="animate-fade-in">
          <SidebarGroupLabel className={cn(
            'text-muted-foreground font-semibold mb-4 px-2 text-xs uppercase tracking-wider',
            isCollapsed ? 'text-center' : (isRTL ? 'text-right' : 'text-left')
          )}>
            {isCollapsed ? '⚙️' : t('sidebar.systemAdmin', 'إدارة النظام')}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {systemItems.map((item, index) => (
                <div 
                  key={item.url} 
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <NavItem item={item} />
                </div>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Status Widget */}
        {!isCollapsed && (
          <div className="p-4 rounded-2xl glass-card hover-glow animate-fade-in">
            <div className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''} mb-3`}>
              <Clock className="h-5 w-5 text-primary animate-float" />
              <span className="font-semibold text-sm">
                {t('sidebar.systemStatus', 'حالة النظام')}
              </span>
            </div>
            <div className="space-y-2">
              <div className={`flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                <span className="text-xs text-muted-foreground">الخوادم</span>
                <span className="text-xs text-green-600 font-medium">متصل</span>
              </div>
              <div className={`flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                <span className="text-xs text-muted-foreground">قاعدة البيانات</span>
                <span className="text-xs text-green-600 font-medium">نشط</span>
              </div>
              <div className="text-xs text-muted-foreground font-mono">
                {new Date().toLocaleTimeString(isRTL ? 'ar-SA' : 'en-US')}
              </div>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
