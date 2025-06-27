
import { supabase } from '@/integrations/supabase/client';
import { Department, SwimmingDepartment, FootballDepartment, FieldDepartment } from '@/types/departments';

export const departmentsService = {
  async getAllDepartments(): Promise<Department[]> {
    const { data, error } = await supabase
      .from('departments')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async getSwimmingDepartments(): Promise<SwimmingDepartment[]> {
    const { data, error } = await supabase
      .from('departments')
      .select('*')
      .eq('type', 'swimming')
      .eq('is_active', true)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async getFootballDepartments(): Promise<FootballDepartment[]> {
    const { data, error } = await supabase
      .from('departments')
      .select('*')
      .eq('type', 'football')
      .eq('is_active', true)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async getFieldDepartments(): Promise<FieldDepartment[]> {
    const { data, error } = await supabase
      .from('departments')
      .select('*')
      .eq('type', 'field')
      .eq('is_active', true)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async createDepartment(department: Omit<Department, 'id' | 'createdAt' | 'updatedAt'>): Promise<Department> {
    const { data, error } = await supabase
      .from('departments')
      .insert({
        ...department,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateDepartment(id: string, updates: Partial<Department>): Promise<Department> {
    const { data, error } = await supabase
      .from('departments')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async deleteDepartment(id: string): Promise<void> {
    const { error } = await supabase
      .from('departments')
      .update({ is_active: false })
      .eq('id', id);
    
    if (error) throw error;
  }
};
