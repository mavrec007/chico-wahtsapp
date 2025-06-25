
import { supabase } from '@/integrations/supabase/client';
import { Coach } from '@/types';
import { BaseService } from './base.service';

class CoachesService extends BaseService<Coach> {
  constructor() {
    super('coaches');
  }

  protected applySearch(query: any, search: string): any {
    return query.or(`specialty.ilike.%${search}%,certification.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%`);
  }

  async getAvailableCoaches(date: string): Promise<Coach[]> {
    // Implement logic to check coach availability
    const { data, error } = await supabase
      .from('coaches')
      .select('*');

    if (error) throw error;
    return data as Coach[];
  }
}

export const coachesService = new CoachesService();
