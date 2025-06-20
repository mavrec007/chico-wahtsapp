
import {
  LayoutDashboard,
  Calendar,
  Users,
  Waves,
  Target,
  CreditCard,
  BarChart3,
  Settings,
  Shield,
  UserCheck
} from 'lucide-react';
import { SidebarConfig } from './types';

export const sidebarConfig: SidebarConfig = {
  groups: [
    {
      label: 'navigation.main',
      items: [
        {
          href: '/',
          label: 'navigation.dashboard',
          icon: LayoutDashboard
        },
        {
          href: '/bookings',
          label: 'navigation.bookings',
          icon: Calendar,
          badge: '12'
        }
      ]
    },
    {
      label: 'navigation.activities',
      items: [
        {
          href: '/activities/swimming',
          label: 'navigation.swimming',
          icon: Waves
        },
        {
          href: '/activities/fields',
          label: 'navigation.fields',
          icon: Target
        }
      ]
    },
    {
      label: 'navigation.management',
      items: [
        {
          href: '/clients',
          label: 'navigation.clients',
          icon: Users
        },
        {
          href: '/payments',
          label: 'navigation.payments',
          icon: CreditCard
        },
        {
          href: '/reports',
          label: 'navigation.reports',
          icon: BarChart3
        }
      ]
    },
    {
      label: 'navigation.system',
      items: [
        {
          href: '/users',
          label: 'navigation.users',
          icon: UserCheck
        },
        {
          href: '/roles',
          label: 'navigation.roles',
          icon: Shield
        },
        {
          href: '/settings',
          label: 'navigation.settings',
          icon: Settings
        }
      ]
    }
  ]
};
