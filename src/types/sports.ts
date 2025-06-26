
export interface Sport {
  id: string;
  name: string;
  nameAr: string;
  icon: string;
  color: string;
  facilities: string[];
  playerPositions?: string[];
  coachSpecialties?: string[];
}

export interface SportModule {
  id: string;
  sport: Sport;
  routes: Array<{
    path: string;
    component: React.ComponentType;
    title: string;
    titleAr: string;
  }>;
}

export interface Player {
  id: string;
  name: string;
  sportId: string;
  position?: string;
  team?: string;
  email?: string;
  phone?: string;
  dateOfBirth?: string;
  rating?: number;
  emergencyContact?: ContactInfo;
  createdAt: string;
  updatedAt: string;
}

export interface Coach {
  id: string;
  name: string;
  sportId: string;
  specialty: string;
  experienceYears: number;
  hourlyRate: number;
  email?: string;
  phone?: string;
  certification?: string;
  availability?: any;
  createdAt: string;
  updatedAt: string;
}

export interface Facility {
  id: string;
  name: string;
  nameAr: string;
  sportId: string;
  type: string;
  capacity: number;
  hourlyRate: number;
  amenities: string[];
  availableHours: any;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Booking {
  id: string;
  facilityId: string;
  playerId?: string;
  coachId?: string;
  sportId: string;
  startTime: string;
  endTime: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  totalAmount: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContactInfo {
  name: string;
  phone: string;
  relationship: string;
}
