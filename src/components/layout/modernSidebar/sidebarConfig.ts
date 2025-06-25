
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
  DollarSign
} from 'lucide-react';

export const sidebarConfig = {
  groups: [
    {
      label: 'لوحة التحكم',
      items: [
        {
          href: '/dashboard',
          label: 'لوحة التحكم',
          icon: LayoutDashboard,
          badge: null
        }
      ]
    },
    {
      label: 'السباحة',
      items: [
        { href: '/swimming/schools', label: 'المدارس', icon: School, badge: null },
        { href: '/swimming/private', label: 'البرايفيت', icon: Users, badge: null },
        { href: '/swimming/free-time', label: 'الفترة الحرة', icon: Clock, badge: null }
      ]
    },
    {
      label: 'كرة القدم',
      items: [
        { href: '/football/academy', label: 'الأكاديمية', icon: GraduationCap, badge: null },
        { href: '/football/schools', label: 'المدارس', icon: School, badge: null },
        { href: '/football/fields', label: 'إدارة الملاعب', icon: MapPin, badge: null }
      ]
    },
    {
      label: 'العملاء والأفراد',
      items: [
        { href: '/clients', label: 'العملاء', icon: Users, badge: null },
        { href: '/coaches', label: 'المدربين', icon: UserCheck, badge: null },
        { href: '/players', label: 'اللاعبين', icon: User, badge: null }
      ]
    },
    {
      label: 'التطبيق',
      items: [
        { href: '/settings', label: 'الإعدادات', icon: Settings, badge: null },
        { href: '/roles', label: 'الصلاحيات والأدوار', icon: Shield, badge: null },
        { href: '/users', label: 'المستخدمين', icon: User, badge: null }
      ]
    },
    {
      label: 'الشؤون المالية',
      items: [
        { href: '/finance/collections', label: 'التحصيل', icon: CreditCard, badge: null },
        { href: '/finance/pricing', label: 'تسعير الخدمات', icon: DollarSign, badge: null }
      ]
    }
  ]
};
