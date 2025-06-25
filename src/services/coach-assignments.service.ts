
import { supabase } from '@/integrations/supabase/client';
import { CoachAssignment } from '@/types';
import { BaseService } from './base.service';

class CoachAssignmentsService extends BaseService<CoachAssignment> {
  constructor() {
    super('coach_assignments');
  }

  protected applySearch(query: any, search: string): any {
    return query.or(`training_type.ilike.%${search}%`);
  }

  async getAssignmentsByCoach(coachId: string): Promise<CoachAssignment[]> {
    const { data, error } = await supabase
      .from('coach_assignments')
      .select(`
        *,
        coach:coaches(*),
        player:players(*)
      `)
      .eq('coach_id', coachId);

    if (error) throw error;
    return data as CoachAssignment[];
  }

  async getAssignmentsByPlayer(playerId: string): Promise<CoachAssignment[]> {
    const { data, error } = await supabase
      .from('coach_assignments')
      .select(`
        *,
        coach:coaches(*),
        player:players(*)
      `)
      .eq('player_id', playerId);

    if (error) throw error;
    return data as CoachAssignment[];
  }
}

export const coachAssignmentsService = new CoachAssignmentsService();
