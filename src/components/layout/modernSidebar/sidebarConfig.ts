
import {
  LayoutDashboard,
  Users,
  Shield,
  Settings,
  MapPin,
  CreditCard,
  User,
  UserCheck,
  School,
  Clock,
  GraduationCap,
  DollarSign,
  Waves,
  Calculator
} from 'lucide-react';

export const sidebarConfig = {
  groups: [
    {
      id: 'dashboard',
      label: 'Dashboard',
      labelAr: 'لوحة التحكم',
      items: [
        {
          id: 'main-dashboard',
          label: 'Dashboard',
          labelAr: 'لوحة التحكم الرئيسية',
          icon: LayoutDashboard,
          href: '/dashboard',
          badge: null
        }
      ]
    },
    {
      id: 'swimming',
      label: 'Swimming',
      labelAr: 'السباحة',
      items: [
        { 
          id: 'swimming-overview',
          label: 'Swimming Overview', 
          labelAr: 'نظرة عامة على السباحة',
          icon: Waves, 
          href: '/swimming',
          badge: null 
        },
        { 
          id: 'swimming-schools',
          label: 'Schools', 
          labelAr: 'المدارس',
          icon: School, 
          href: '/swimming/schools',
          badge: null 
        },
        { 
          id: 'swimming-private',
          label: 'Private', 
          labelAr: 'البرايفيت',
          icon: Users, 
          href: '/swimming/private',
          badge: null 
        },
        { 
          id: 'swimming-free-time',
          label: 'Free Time', 
          labelAr: 'الفترة الحرة',
          icon: Clock, 
          href: '/swimming/free-time',
          badge: null 
        }
      ]
    },
    {
      id: 'football',
      label: 'Football',
      labelAr: 'كرة القدم',
      items: [
        { 
          id: 'football-overview',
          label: 'Football Overview', 
          labelAr: 'نظرة عامة على كرة القدم',
          icon: GraduationCap, 
          href: '/football',
          badge: null 
        },
        { 
          id: 'football-academy',
          label: 'Academy', 
          labelAr: 'الأكاديمية',
          icon: GraduationCap, 
          href: '/football/academy',
          badge: null 
        },
        { 
          id: 'football-schools',
          label: 'Schools', 
          labelAr: 'المدارس',
          icon: School, 
          href: '/football/schools',
          badge: null 
        },
        { 
          id: 'football-fields',
          label: 'Manage Fields', 
          labelAr: 'إدارة الملاعب',
          icon: MapPin, 
          href: '/football/fields',
          badge: null 
        }
      ]
    },
    {
      id: 'fields',
      label: 'Fields Management',
      labelAr: 'إدارة الملاعب',
      items: [
        { 
          id: 'fields-overview',
          label: 'Fields Overview', 
          labelAr: 'نظرة عامة على الملاعب',
          icon: MapPin, 
          href: '/fields',
          badge: null 
        }
      ]
    },
    {
      id: 'people',
      label: 'People',
      labelAr: 'العملاء والأفراد',
      items: [
        { 
          id: 'clients',
          label: 'Clients', 
          labelAr: 'العملاء',
          icon: Users, 
          href: '/clients',
          badge: null 
        },
        { 
          id: 'coaches',
          label: 'Coaches', 
          labelAr: 'المدربين',
          icon: UserCheck, 
          href: '/coaches',
          badge: null 
        },
        { 
          id: 'players',
          label: 'Players', 
          labelAr: 'اللاعبين',
          icon: User, 
          href: '/players',
          badge: null 
        }
      ]
    },
    {
      id: 'finance',
      label: 'Finance',
      labelAr: 'الشؤون المالية',
      items: [
        { 
          id: 'accounting',
          label: 'Accounting', 
          labelAr: 'المحاسبة',
          icon: Calculator, 
          href: '/accounting',
          badge: null 
        },
        { 
          id: 'collections',
          label: 'Collections', 
          labelAr: 'التحصيل',
          icon: CreditCard, 
          href: '/finance/collections',
          badge: null 
        },
        { 
          id: 'pricing',
          label: 'Service Pricing', 
          labelAr: 'تسعير الخدمات',
          icon: DollarSign, 
          href: '/finance/pricing',
          badge: null 
        }
      ]
    },
    {
      id: 'system',
      label: 'System',
      labelAr: 'التطبيق',
      items: [
        { 
          id: 'settings',
          label: 'Settings', 
          labelAr: 'الإعدادات',
          icon: Settings, 
          href: '/settings',
          badge: null 
        },
        { 
          id: 'roles',
          label: 'Roles & Permissions', 
          labelAr: 'الصلاحيات والأدوار',
          icon: Shield, 
          href: '/roles',
          badge: null 
        },
        { 
          id: 'users',
          label: 'Users', 
          labelAr: 'المستخدمين',
          icon: User, 
          href: '/users',
          badge: null 
        }
      ]
    }
  ]
};
