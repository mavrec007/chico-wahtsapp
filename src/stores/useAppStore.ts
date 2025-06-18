
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'user';
}

export interface AppState {
  // UI State
  sidebarOpen: boolean;
  theme: 'light' | 'dark';
  language: 'ar' | 'en';
  
  // Modals
  showAuthModal: boolean;
  
  // Actions
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
  setLanguage: (language: 'ar' | 'en') => void;
  
  // Modal Actions
  setShowAuthModal: (show: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial State
      sidebarOpen: true,
      theme: 'light',
      language: 'ar',
      showAuthModal: false,
      
      // UI Actions
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      toggleSidebar: () => set({ sidebarOpen: !get().sidebarOpen }),
      setTheme: (theme) => set({ theme }),
      toggleTheme: () => set({ theme: get().theme === 'light' ? 'dark' : 'light' }),
      setLanguage: (language) => set({ language }),
      
      // Modal Actions
      setShowAuthModal: (show) => set({ showAuthModal: show }),
    }),
    {
      name: 'app-store',
      partialize: (state) => ({
        theme: state.theme,
        language: state.language,
      }),
    }
  )
);