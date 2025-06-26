
import { Sport } from '@/types/sports';
import { Waves, Target, Users, Trophy } from 'lucide-react';

export const SPORTS_CONFIG: Sport[] = [
  {
    id: 'swimming',
    name: 'Swimming',
    nameAr: 'السباحة',
    icon: 'Waves',
    color: 'blue',
    facilities: ['pool', 'lane'],
    coachSpecialties: ['freestyle', 'backstroke', 'breaststroke', 'butterfly', 'diving']
  },
  {
    id: 'football',
    name: 'Football',
    nameAr: 'كرة القدم',
    icon: 'Target',
    color: 'green',
    facilities: ['field', 'pitch'],
    playerPositions: ['goalkeeper', 'defender', 'midfielder', 'forward'],
    coachSpecialties: ['tactics', 'fitness', 'goalkeeping', 'youth_development']
  },
  {
    id: 'basketball',
    name: 'Basketball',
    nameAr: 'كرة السلة',
    icon: 'Users',
    color: 'orange',
    facilities: ['court', 'indoor_court'],
    playerPositions: ['point_guard', 'shooting_guard', 'small_forward', 'power_forward', 'center'],
    coachSpecialties: ['offense', 'defense', 'conditioning', 'youth_coaching']
  },
  {
    id: 'tennis',
    name: 'Tennis',
    nameAr: 'التنس',
    icon: 'Trophy',
    color: 'yellow',
    facilities: ['court', 'clay_court', 'grass_court'],
    coachSpecialties: ['technique', 'strategy', 'fitness', 'mental_coaching']
  }
];

export const getSportById = (id: string): Sport | undefined => {
  return SPORTS_CONFIG.find(sport => sport.id === id);
};

export const getSportColor = (sportId: string): string => {
  const sport = getSportById(sportId);
  return sport?.color || 'gray';
};
