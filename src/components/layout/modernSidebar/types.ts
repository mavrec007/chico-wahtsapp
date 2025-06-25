
import { LucideIcon } from 'lucide-react';

export interface SidebarItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string | number;
}

export interface SidebarGroup {
  label: string;
  items: SidebarItem[];
}

export interface SidebarConfig {
  groups: SidebarGroup[];
}
