
import { Facility } from '@/types';
import { BaseService } from './base.service';

class FacilitiesService extends BaseService<Facility> {
  constructor() {
    super('facilities');
  }

  protected applySearch(query: any, search: string): any {
    return query.or(`name.ilike.%${search}%,type.ilike.%${search}%,description.ilike.%${search}%`);
  }

  async getAvailableFacilities(startTime: string, endTime: string): Promise<Facility[]> {
    // Get facilities that don't have conflicting bookings
    const { data, error } = await supabase
      .from(this.tableName)
      .select(`
        *,
        bookings!inner(id, start_time, end_time, status)
      `)
      .eq('active', true)
      .or(`bookings.start_time.gte.${endTime},bookings.end_time.lte.${startTime}`)
      .neq('bookings.status', 'cancelled');

    if (error) throw error;
    return data as Facility[];
  }
}

export const facilitiesService = new FacilitiesService();
