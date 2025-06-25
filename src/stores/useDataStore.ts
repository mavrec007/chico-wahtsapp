
import { create } from 'zustand';
import { Coach, Player, Facility, Payment, CoachAssignment, PaginationParams } from '@/types';

interface DataState {
  // Loading states
  isLoading: boolean;
  
  // Selected items for bulk operations
  selectedItems: Record<string, string[]>;
  
  // Pagination states
  pagination: Record<string, PaginationParams>;
  
  // Actions
  setLoading: (loading: boolean) => void;
  setSelectedItems: (table: string, ids: string[]) => void;
  toggleSelectedItem: (table: string, id: string) => void;
  clearSelectedItems: (table: string) => void;
  setPagination: (table: string, params: PaginationParams) => void;
  
  // Modal states
  modals: Record<string, { open: boolean; mode: 'create' | 'edit'; data?: any }>;
  openModal: (modalId: string, mode: 'create' | 'edit', data?: any) => void;
  closeModal: (modalId: string) => void;
}

export const useDataStore = create<DataState>((set, get) => ({
  isLoading: false,
  selectedItems: {},
  pagination: {},
  modals: {},

  setLoading: (loading: boolean) => set({ isLoading: loading }),

  setSelectedItems: (table: string, ids: string[]) =>
    set((state) => ({
      selectedItems: { ...state.selectedItems, [table]: ids }
    })),

  toggleSelectedItem: (table: string, id: string) =>
    set((state) => {
      const currentItems = state.selectedItems[table] || [];
      const newItems = currentItems.includes(id)
        ? currentItems.filter((item) => item !== id)
        : [...currentItems, id];
      
      return {
        selectedItems: { ...state.selectedItems, [table]: newItems }
      };
    }),

  clearSelectedItems: (table: string) =>
    set((state) => ({
      selectedItems: { ...state.selectedItems, [table]: [] }
    })),

  setPagination: (table: string, params: PaginationParams) =>
    set((state) => ({
      pagination: { ...state.pagination, [table]: params }
    })),

  openModal: (modalId: string, mode: 'create' | 'edit', data?: any) =>
    set((state) => ({
      modals: { ...state.modals, [modalId]: { open: true, mode, data } }
    })),

  closeModal: (modalId: string) =>
    set((state) => ({
      modals: { ...state.modals, [modalId]: { open: false, mode: 'create', data: undefined } }
    }))
}));
