// src/components/ui/AppLogo.tsx
import React from 'react';
import { useAppStore } from '@/stores/useAppStore';

type Props = {
  location: 'topbar' | 'sidebar';
  className?: string;
};

const AppLogo = ({ location, className = '' }: Props) => {
  const { theme } = useAppStore();

  // Topbar: show logo based on theme
  if (location === 'topbar') {
    const src = theme === 'dark' ? '/logo-dark.png' : '/logo-day.png';
    return <img src={src} alt="App Logo" className={`h-8 w-auto ${className}`} />;
  }

  // Sidebar: use pattern logo
  if (location === 'sidebar') {
    return <img src="/logo-patrens.png" alt="App Pattern Logo" className={`h-10 w-auto ${className}`} />;
  }

  return null;
};

export default AppLogo;
