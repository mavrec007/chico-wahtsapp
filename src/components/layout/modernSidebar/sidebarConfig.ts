
import { 
  LayoutDashboard, 
  Activity, 
  Users, 
  UserCheck, 
  Building2, 
  CreditCard, 
  UserCog, 
  BarChart3, 
  Settings,
  Trophy,
  Calendar
} from 'lucide-react';

export interface SidebarItem {
  id: string;
  label: string;
  labelAr: string;
  icon: any;
  path: string;
  badge?: string;
  children?: SidebarItem[];
}

export interface SidebarGroup {
  id: string;
  label: string;
  labelAr: string;
  items: SidebarItem[];
}

export const sidebarConfig = {
  groups: [
    {
      id: 'main',
      label: 'Main',
      labelAr: 'الرئيسية',
      items: [
        {
          id: 'dashboard',
          label: 'Dashboard',
          labelAr: 'لوحة التحكم',
          icon: LayoutDashboard,
          path: '/dashboard'
        },
        {
          id: 'sports-overview',
          label: 'Sports Overview',
          labelAr: 'نظرة عامة على الرياضات',
          icon: Trophy,
          path: '/sports-overview'
        }
      ]
    },
    {
      id: 'management',
      label: 'Management',
      labelAr: 'الإدارة',
      items: [
        {
          id: 'bookings',
          label: 'Bookings',
          labelAr: 'الحجوزات',
          icon: Calendar,
          path: '/bookings'
        },
        {
          id: 'coaches',
          label: 'Coaches',
          labelAr: 'المدربين',
          icon: UserCheck,
          path: '/coaches'
        },
        {
          id: 'players',
          label: 'Players',
          labelAr: 'اللاعبين',
          icon: Users,
          path: '/players'
        },
        {
          id: 'facilities',
          label: 'Facilities',
          labelAr: 'المرافق',
          icon: Building2,
          path: '/facilities'
        },
        {
          id: 'payments',
          label: 'Payments',
          labelAr: 'المدفوعات',
          icon: CreditCard,
          path: '/payments'
        },
        {
          id: 'coach-assignments',
          label: 'Coach Assignments',
          labelAr: 'تعيين المدربين',
          icon: UserCog,
          path: '/coach-assignments'
        }
      ]
    },
    {
      id: 'analytics',
      label: 'Analytics',
      labelAr: 'التحليلات',
      items: [
        {
          id: 'reports',
          label: 'Reports',
          labelAr: 'التقارير',
          icon: BarChart3,
          path: '/reports'
        }
      ]
    },
    {
      id: 'system',
      label: 'System',
      labelAr: 'النظام',
      items: [
        {
          id: 'settings',
          label: 'Settings',
          labelAr: 'الإعدادات',
          icon: Settings,
          path: '/settings'
        }
      ]
    }
  ]
};
