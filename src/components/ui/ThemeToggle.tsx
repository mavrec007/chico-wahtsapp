
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/stores/useAppStore';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  className?: string;
  variant?: 'default' | 'ghost' | 'outline';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  className,
  variant = 'ghost',
  size = 'icon'
}) => {
  const { theme, toggleTheme } = useAppStore();

  return (
    <Button
      variant={variant}
      size={size}
      onClick={toggleTheme}
      className={cn(
        'rounded-lg backdrop-blur-md bg-white/40 dark:bg-gray-800/40 hover:bg-white/60 dark:hover:bg-gray-700/60 transition-colors',
        className
      )}
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      {theme === 'light' ? (
        <Moon className="w-4 h-4 dark:text-fuchsia-400" />
      ) : (
        <Sun className="w-4 h-4 dark:text-fuchsia-400" />
      )}
    </Button>
  );
};

export default ThemeToggle;
