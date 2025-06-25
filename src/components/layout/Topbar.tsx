
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/stores/useAppStore';
import { useAuth } from '@/context/AuthContext';
import { useLoadingStore } from '@/stores/useLoadingStore';
import { cn } from '@/lib/utils';
import { Menu, Globe, User, LogOut, Settings, UserCircle, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useToast } from '@/hooks/use-toast';

interface TopbarProps {
  className?: string;
}

const Topbar: React.FC<TopbarProps> = ({ className }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const {
    toggleSidebar,
    language,
    setLanguage,
    setShowAuthModal,
  } = useAppStore();
  
  const { user, logout, isAuthenticated } = useAuth();
  const showLoading = useLoadingStore((state) => state.showLoading);

  const handleLanguageToggle = () => {
    const newLang = language === 'en' ? 'ar' : 'en';
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
  };

  const handleLogout = async () => {
    showLoading();
    await logout();

    toast({
      title: "تم تسجيل الخروج",
      description: "تم تسجيل خروجك بنجاح",
    });

    navigate('/');
  };

  const handleProfile = () => {
    navigate('/profile');
  };

  const handleSettings = () => {
    navigate('/settings');
  };

  return (
    <motion.header
      className={cn(
        'sticky top-0 z-30 w-full border-b border-slate-200 dark:border-gray-700',
        'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm',
        className
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className={cn(
              language === 'ar' ? 'ml-auto' : 'mr-auto',
              'rounded-lg hover:bg-slate-100 dark:hover:bg-gray-800 transition-colors'
            )}
            aria-label="Toggle sidebar"
          >
            <Menu className="w-5 h-5 text-slate-600 dark:text-gray-400" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          {/* Language Switch */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLanguageToggle}
            className="rounded-lg hover:bg-slate-100 dark:hover:bg-gray-800 transition-colors"
          >
            <Globe className="w-4 h-4 text-slate-600 dark:text-gray-400" />
          </Button>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="rounded-lg hover:bg-slate-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4 text-slate-600 dark:text-gray-400" />
          </Button>

          {/* User Menu */}
          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 rounded-lg px-2 py-1 hover:bg-slate-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div className="hidden sm:block text-right">
                    <p className="text-sm font-medium text-slate-900 dark:text-gray-100">
                      {user.name}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-gray-400">
                      {user.role === 'admin' ? 'مدير النظام' : user.role === 'manager' ? 'مدير المرافق' : 'مستخدم'}
                    </p>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="w-56 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700"
              >
                <DropdownMenuItem 
                  onClick={handleProfile}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <UserCircle className="w-4 h-4" />
                  <span>الملف الشخصي</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={handleSettings}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Settings className="w-4 h-4" />
                  <span>الإعدادات</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={handleLogout}
                  className="flex items-center gap-2 cursor-pointer text-red-600 dark:text-red-400"
                >
                  <LogOut className="w-4 h-4" />
                  <span>تسجيل الخروج</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={() => setShowAuthModal(true)} className="bg-blue-600 hover:bg-blue-700 text-white">
              <span className="hidden sm:inline">تسجيل الدخول</span>
              <span className="inline sm:hidden"><User className="w-4 h-4" /></span>
            </Button>
          )}
        </div>
      </div>
    </motion.header>
  );
};

export default Topbar;
