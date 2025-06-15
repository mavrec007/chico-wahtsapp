
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarTrigger,
  useSidebar
} from '@/components/ui/sidebar';
import {
  Bell,
  Plus,
  Search,
  Settings,
  User,
  LogOut,
  Moon,
  Sun,
  Calendar,
  Users,
  Target,
  Waves
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { AppointmentModal } from '@/components/modals/AppointmentModal';

export function AppHeader() {
  const { theme, setTheme } = useTheme();
  const { toggleSidebar } = useSidebar();
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);

  const quickActions = [
    {
      title: 'حجز ملعب',
      icon: Target,
      action: () => setIsAppointmentModalOpen(true),
      type: 'court'
    },
    {
      title: 'حجز سباحة',
      icon: Waves,
      action: () => setIsAppointmentModalOpen(true),
      type: 'swimming'
    },
    {
      title: 'عميل جديد',
      icon: Users,
      action: () => console.log('Add client')
    }
  ];

  return (
    <>
      <header className="h-16 border-b border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center justify-between h-full px-6">
          {/* Left section */}
          <div className="flex items-center space-x-4 space-x-reverse">
            <SidebarTrigger className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors" />
            
            <div className="hidden md:flex items-center space-x-3 space-x-reverse">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={action.action}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <action.icon className="h-4 w-4 mr-2" />
                  {action.title}
                </Button>
              ))}
            </div>
          </div>

          {/* Center section - Search */}
          <div className="hidden lg:flex items-center max-w-md w-full">
            <div className="relative w-full">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="البحث عن الحجوزات أو العملاء..."
                className="w-full pr-10 pl-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-3 space-x-reverse">
            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
              <Bell className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs">
                3
              </Badge>
            </Button>

            {/* Theme toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              )}
            </Button>

            {/* User menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2 space-x-reverse hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl p-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <div className="hidden md:block text-right">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">أحمد محمد</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">مدير النظام</p>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <DropdownMenuItem className="flex items-center space-x-2 space-x-reverse">
                  <User className="h-4 w-4" />
                  <span>الملف الشخصي</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center space-x-2 space-x-reverse">
                  <Settings className="h-4 w-4" />
                  <span>الإعدادات</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center space-x-2 space-x-reverse text-red-600 dark:text-red-400">
                  <LogOut className="h-4 w-4" />
                  <span>تسجيل الخروج</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <AppointmentModal
        isOpen={isAppointmentModalOpen}
        onClose={() => setIsAppointmentModalOpen(false)}
      />
    </>
  );
}
