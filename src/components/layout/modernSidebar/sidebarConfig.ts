
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
      label: 'pages.dashboard',
      items: [
        {
          id: 'main-dashboard',
          label: 'pages.dashboard',
          icon: LayoutDashboard,
          href: '/dashboard',
          badge: null
        }
      ]
    },
    {
      id: 'swimming',
      label: 'pages.swimming',
      items: [
        { 
          id: 'swimming-overview',
          label: 'sidebar.overview', 
          icon: Waves, 
          href: '/swimming',
          badge: null 
        },
        { 
          id: 'swimming-schools',
          label: 'sidebar.schools',
          icon: School, 
          href: '/swimming/schools',
          badge: null 
        },
        { 
          id: 'swimming-private',
          label: 'sidebar.private',
          icon: Users, 
          href: '/swimming/private',
          badge: null 
        },
        { 
          id: 'swimming-free-time',
          label: 'sidebar.free_time',
          icon: Clock, 
          href: '/swimming/free-time',
          badge: null 
        }
      ]
    },
    {
      id: 'football',
      label: 'pages.football',
      items: [
        { 
          id: 'football-overview',
          label: 'sidebar.overview',
          icon: GraduationCap, 
          href: '/football',
          badge: null 
        },
        { 
          id: 'football-academy',
          label: 'sidebar.academy',
          icon: GraduationCap, 
          href: '/football/academy',
          badge: null 
        },
        { 
          id: 'football-schools',
          label: 'sidebar.schools',
          icon: School, 
          href: '/football/schools',
          badge: null 
        },
        { 
          id: 'football-fields',
          label: 'sidebar.manage_fields',
          icon: MapPin, 
          href: '/football/fields',
          badge: null 
        }
      ]
    },
    {
      id: 'fields',
      label: 'pages.fields',
      items: [
        { 
          id: 'fields-overview',
          label: 'sidebar.overview',
          icon: MapPin, 
          href: '/fields',
          badge: null 
        }
      ]
    },
    {
      id: 'people',
      label: 'sidebar.people',
      items: [
        { 
          id: 'clients',
          label: 'pages.clients',
          icon: Users, 
          href: '/clients',
          badge: null 
        },
        { 
          id: 'coaches',
          label: 'pages.coaches',
          icon: UserCheck, 
          href: '/coaches',
          badge: null 
        },
        { 
          id: 'players',
          label: 'pages.players',
          icon: User, 
          href: '/players',
          badge: null 
        }
      ]
    },
    {
      id: 'finance',
      label: 'sidebar.finance',
      items: [
        { 
          id: 'accounting',
          label: 'pages.accounting',
          icon: Calculator, 
          href: '/accounting',
          badge: null 
        },
        { 
          id: 'collections',
          label: 'pages.collections',
          icon: CreditCard, 
          href: '/finance/collections',
          badge: null 
        },
        { 
          id: 'pricing',
          label: 'pages.pricing',
          icon: DollarSign, 
          href: '/finance/pricing',
          badge: null 
        }
      ]
    },
    {
      id: 'system',
      label: 'sidebar.system',
      items: [
        { 
          id: 'settings',
          label: 'pages.settings',
          icon: Settings, 
          href: '/settings',
          badge: null 
        },
        { 
          id: 'roles',
          label: 'pages.roles',
          icon: Shield, 
          href: '/roles',
          badge: null 
        },
        { 
          id: 'users',
          label: 'pages.users',
          icon: User, 
          href: '/users',
          badge: null 
        }
      ]
    }
  ]
};
