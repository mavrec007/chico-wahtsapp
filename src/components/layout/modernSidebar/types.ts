
import { LucideIcon } from 'lucide-react';

export interface SidebarItem {
  id: string;
  label: string;
  labelAr: string;
  icon: LucideIcon;
  href: string;
  badge?: string | number;
  children?: SidebarItem[];
}

export interface SidebarGroup {
  id: string;
  label: string;
  labelAr: string;
  items: SidebarItem[];
}

export interface SidebarConfig {
  groups: SidebarGroup[];
}
