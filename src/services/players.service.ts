
import { supabase } from '@/integrations/supabase/client';
import { Player } from '@/types';
import { BaseService } from './base.service';

class PlayersService extends BaseService<Player> {
  constructor() {
    super('players');
  }

  protected applySearch(query: any, search: string): any {
    return query.or(`position.ilike.%${search}%,team.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%`);
  }

  async getPlayersByTeam(team: string): Promise<Player[]> {
    const { data, error } = await supabase
      .from('players')
      .select('*')
      .eq('team', team);

    if (error) throw error;
    return data as Player[];
  }
}

export const playersService = new PlayersService();
