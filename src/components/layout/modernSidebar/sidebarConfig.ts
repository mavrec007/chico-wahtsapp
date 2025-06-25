
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
      label: 'main',
      items: [
        {
          label: 'Dashboard',
          href: '/dashboard',
          icon: LayoutDashboard,
        },
      ],
    },
    {
      label: 'الإدارة',
      items: [
        {
          label: 'Coaches',
          href: '/coaches',
          icon: UserCheck,
        },
        {
          label: 'Players',
          href: '/players',
          icon: User,
        },
        {
          label: 'Facilities',
          href: '/facilities',
          icon: Building,
        },
        {
          label: 'Payments',
          href: '/payments',
          icon: CreditCard,
        },
        {
          label: 'Coach Assignments',
          href: '/coach-assignments',
          icon: FileText,
        },
        {
          label: 'Clients',
          href: '/clients',
          icon: Users,
        },
      ],
    },
  ] as SidebarGroup[],
};
