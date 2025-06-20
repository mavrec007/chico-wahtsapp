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
  Bell,
  Search,
  Settings,
  User,
  LogOut,
  Moon,
  Sun,
  Calendar,
  Users,
  Target,
  Waves,
  Languages,
  Palette,
  Menu
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { useAppStore } from '@/stores/useAppStore';
import { authService } from '@/services/auth';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { AppointmentModal } from '@/components/modals/AppointmentModal';
import { StyleControlPanel } from '@/components/panels/StyleControlPanel';
import { useLoadingStore } from '@/stores/useLoadingStore';

export function AppHeader() {
  const { theme, setTheme } = useTheme();
  const { toggleSidebar } = useAppStore();
  const { language, setLanguage, user, logout } = useAppStore();
  const navigate = useNavigate();
  const { toast } = useToast();
  const showLoading = useLoadingStore((state) => state.showLoading);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [isStylePanelOpen, setIsStylePanelOpen] = useState(false);

  const isRTL = language === 'ar';

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

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleLogout = async () => {
    showLoading();
    authService.logout();
    await logout();
    toast({
      title: "تم تسجيل الخروج",
      description: "تم تسجيل خروجك بنجاح",
    });
    navigate('/landing');
  };

  return (
    <>
      <header className={`h-16 border-b border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md sticky top-0 z-40 ${isRTL ? 'border-l' : 'border-r'}`}>
        <div className={`flex items-center justify-between h-full px-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
          {/* Left section */}
          <div className={`flex items-center space-x-3 ${isRTL ? 'space-x-reverse' : ''}`}>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleSidebar}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            <div className={`hidden md:flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={action.action}
                  className="bg-gradient-to-r from-primary to-accent text-white border-0 hover:from-primary/80 hover:to-accent/80 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <action.icon className={`h-4 w-4 ${isRTL ? 'ml-1' : 'mr-1'}`} />
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
                className={`w-full ${isRTL ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4'} py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300`}
              />
            </div>
          </div>

          {/* Right section */}
          <div className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
            {/* Style Control Panel */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsStylePanelOpen(true)}
              className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
            >
              <Palette className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </Button>

            {/* Language toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLanguage}
              className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
            >
              <Languages className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </Button>

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
              onClick={toggleTheme}
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
                <Button variant="ghost" className="flex items-center space-x-2 space-x-reverse hover:bg-background-desktop rounded-xl p-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <div className="hidden md:block text-right">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{user?.name || 'أحمد محمد'}</p>
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
                <DropdownMenuItem 
                  onClick={handleLogout}
                  className="flex items-center space-x-2 space-x-reverse text-red-600 dark:text-red-400"
                >
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

      <StyleControlPanel
        isOpen={isStylePanelOpen}
        onClose={() => setIsStylePanelOpen(false)}
      />
    </>
  );
}
