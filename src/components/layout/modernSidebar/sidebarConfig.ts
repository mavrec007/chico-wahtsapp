
import { 
  LayoutDashboard, 
  Users, 
  Building, 
  CreditCard, 
  FileText,
  UserCheck,
  User
} from 'lucide-react';
import { SidebarGroup } from './types';

export const sidebarConfig = {
  groups: [
    {
      label: 'navigation.main',
      items: [
        {
          label: 'navigation.dashboard',
          href: '/dashboard',
          icon: LayoutDashboard,
        },
      ],
    },
    {
      label: 'navigation.management',
      items: [
        {
          label: 'navigation.coaches',
          href: '/coaches',
          icon: UserCheck,
        },
        {
          label: 'navigation.players',
          href: '/players',
          icon: User,
        },
        {
          label: 'navigation.facilities',
          href: '/facilities',
          icon: Building,
        },
        {
          label: 'navigation.payments',
          href: '/payments',
          icon: CreditCard,
        },
        {
          label: 'navigation.coach-assignments',
          href: '/coach-assignments',
          icon: FileText,
        },
        {
          label: 'navigation.clients',
          href: '/clients',
          icon: Users,
        },
      ],
    },
  ] as SidebarGroup[],
};
