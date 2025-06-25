
import { supabase } from '@/integrations/supabase/client';
import { BaseEntity, PaginationParams, PaginatedResponse } from '@/types';

export class BaseService<T extends BaseEntity> {
  protected tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  async getAll(params?: PaginationParams): Promise<PaginatedResponse<T>> {
    let query = supabase.from(this.tableName).select('*', { count: 'exact' });

    // Apply search
    if (params?.search) {
      query = this.applySearch(query, params.search);
    }

    // Apply filters
    if (params?.filters) {
      query = this.applyFilters(query, params.filters);
    }

    // Apply sorting
    if (params?.sortBy) {
      query = query.order(params.sortBy, { 
        ascending: params.sortOrder === 'asc' 
      });
    } else {
      query = query.order('created_at', { ascending: false });
    }

    // Apply pagination
    const page = params?.page || 1;
    const pageSize = params?.pageSize || 10;
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    query = query.range(from, to);

    const { data, error, count } = await query;

    if (error) throw error;

    return {
      data: data as T[],
      total: count || 0,
      page,
      pageSize,
      totalPages: Math.ceil((count || 0) / pageSize)
    };
  }

  async getById(id: string): Promise<T | null> {
    const { data, error } = await supabase
      .from(this.tableName)
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as T;
  }

  async create(data: Omit<T, keyof BaseEntity>): Promise<T> {
    const { data: result, error } = await supabase
      .from(this.tableName)
      .insert(data)
      .select()
      .single();

    if (error) throw error;
    return result as T;
  }

  async update(id: string, data: Partial<T>): Promise<T> {
    const { data: result, error } = await supabase
      .from(this.tableName)
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return result as T;
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from(this.tableName)
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  async bulkDelete(ids: string[]): Promise<void> {
    const { error } = await supabase
      .from(this.tableName)
      .delete()
      .in('id', ids);

    if (error) throw error;
  }

  protected applySearch(query: any, search: string): any {
    // Override in subclasses for specific search logic
    return query;
  }

  protected applyFilters(query: any, filters: Record<string, any>): any {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        query = query.eq(key, value);
      }
    });
    return query;
  }
}
