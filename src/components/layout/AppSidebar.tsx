
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
import { useAppStore } from '@/stores/useAppStore';

const navigationItems = [
  {
    title: 'الرئيسية',
    url: '/',
    icon: Home,
    gradient: 'from-blue-500 to-purple-600'
  },
  {
    title: 'إدارة الحجوزات',
    url: '/bookings',
    icon: Calendar,
    gradient: 'from-emerald-500 to-teal-600'
  },
  {
    title: 'الملاعب الرياضية',
    url: '/courts',
    icon: Target,
    gradient: 'from-orange-500 to-red-600'
  },
  {
    title: 'حمام السباحة',
    url: '/swimming',
    icon: Waves,
    gradient: 'from-cyan-500 to-blue-600'
  },
  {
    title: 'الحسابات والمدفوعات',
    url: '/accounting',
    icon: CreditCard,
    gradient: 'from-green-500 to-emerald-600'
  },
  {
    title: 'إدارة العملاء',
    url: '/clients',
    icon: Users,
    gradient: 'from-purple-500 to-pink-600'
  },
  {
    title: 'التقارير والإحصائيات',
    url: '/reports',
    icon: BarChart3,
    gradient: 'from-indigo-500 to-purple-600'
  }
];

const adminItems = [
  {
    title: 'إدارة المستخدمين',
    url: '/admin/users',
    icon: Shield,
    gradient: 'from-red-500 to-pink-600'
  },
  {
    title: 'الإعدادات العامة',
    url: '/settings',
    icon: Settings,
    gradient: 'from-gray-500 to-slate-600'
  }
];

export function AppSidebar() {
  const { language, sidebarOpen } = useAppStore();
  const isCollapsed = !sidebarOpen;
  const isRTL = language === 'ar';

  const NavItem = ({ item }: { item: any }) => (
    <div className="mb-2">
      <NavLink
        to={item.url}
        className={({ isActive }) =>
          cn(
            'flex items-center space-x-3 space-x-reverse p-3 rounded-xl transition-all duration-300 group relative overflow-hidden',
            isActive
              ? `bg-gradient-to-${isRTL ? 'l' : 'r'} ${item.gradient} text-white shadow-lg transform scale-105`
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
              <div className={`absolute inset-0 bg-gradient-to-${isRTL ? 'l' : 'r'} from-white/20 to-transparent animate-pulse`} />
            )}
          </>
        )}
      </NavLink>
    </div>
  );

  return (
    <aside 
      className={cn(
        'transition-all duration-300 border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md h-screen sticky top-0',
        isRTL ? 'border-l' : 'border-r',
        isCollapsed ? 'w-16' : 'w-72'
      )}
    >
      <div className="p-4 h-full flex flex-col">
        <div className="mb-8">
          <div className={cn(
            `flex items-center space-x-3 ${isRTL ? 'space-x-reverse' : ''} p-4 rounded-2xl bg-gradient-to-${isRTL ? 'l' : 'r'} from-blue-600 to-purple-700 text-white shadow-xl`,
            isCollapsed && 'justify-center'
          )}>
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <Calendar className="h-6 w-6" />
            </div>
            {!isCollapsed && (
              <div>
                <h1 className="text-xl font-bold">نظام الحجوزات</h1>
                <p className="text-blue-100 text-sm">إدارة متقدمة للمرافق الرياضية</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="mb-6">
            <h3 className={cn(
              'text-gray-500 dark:text-gray-400 font-semibold mb-4 px-2',
              isCollapsed && 'text-center text-xs'
            )}>
              {isCollapsed ? '•' : 'القائمة الرئيسية'}
            </h3>
            <div className="space-y-2">
              {navigationItems.map((item) => (
                <NavItem key={item.url} item={item} />
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className={cn(
              'text-gray-500 dark:text-gray-400 font-semibold mb-4 px-2',
              isCollapsed && 'text-center text-xs'
            )}>
              {isCollapsed ? '⚙' : 'إدارة النظام'}
            </h3>
            <div className="space-y-2">
              {adminItems.map((item) => (
                <NavItem key={item.url} item={item} />
              ))}
            </div>
          </div>
        </div>

        {!isCollapsed && (
          <div className={`mt-auto p-4 rounded-2xl bg-gradient-to-${isRTL ? 'l' : 'r'} from-emerald-500 to-teal-600 text-white`}>
            <div className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''} mb-2`}>
              <Clock className="h-5 w-5" />
              <span className="font-semibold">الوقت الحالي</span>
            </div>
            <p className="text-emerald-100 text-sm">
              {new Date().toLocaleTimeString('ar-SA')}
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}
