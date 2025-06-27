
export interface Department {
  id: string;
  name: string;
  nameAr: string;
  type: 'swimming' | 'football' | 'field';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SwimmingDepartment extends Department {
  type: 'swimming';
  category: 'private' | 'school' | 'free-period';
}

export interface FootballDepartment extends Department {
  type: 'football';
  academyId?: string;
}

export interface FieldDepartment extends Department {
  type: 'field';
  fieldType: 'football' | 'basketball' | 'tennis' | 'multi-purpose';
  capacity: number;
}

export interface Academy {
  id: string;
  name: string;
  nameAr: string;
  description?: string;
  descriptionAr?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Trainer {
  id: string;
  name: string;
  nameAr: string;
  phone: string;
  email?: string;
  specialty: string;
  specialtyAr: string;
  departmentIds: string[];
  hourlyRate: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Client {
  id: string;
  name: string;
  nameAr?: string;
  phone: string;
  email?: string;
  nationalId?: string;
  dateOfBirth?: string;
  emergencyContact?: {
    name: string;
    phone: string;
    relation: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Player extends Client {
  position?: string;
  positionAr?: string;
  team?: string;
  teamAr?: string;
  academyId?: string;
  rating?: number;
  parentContact?: {
    name: string;
    phone: string;
  };
}

export interface Field {
  id: string;
  name: string;
  nameAr: string;
  type: 'football' | 'basketball' | 'tennis' | 'swimming-pool' | 'multi-purpose';
  capacity: number;
  hourlyRate: number;
  amenities: string[];
  amenitiesAr: string[];
  isActive: boolean;
  maintenanceSchedule?: {
    dayOfWeek: number;
    startTime: string;
    endTime: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface Booking {
  id: string;
  departmentId: string;
  clientId?: string;
  trainerId?: string;
  playerId?: string;
  fieldId: string;
  startTime: string;
  endTime: string;
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  totalAmount: number;
  paidAmount: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  paymentType: 'deposit' | 'full' | 'remaining';
  paymentMethod: 'cash' | 'card' | 'transfer' | 'online';
  status: 'pending' | 'paid' | 'refunded';
  referenceNumber?: string;
  paidAt?: string;
  createdAt: string;
  updatedAt: string;
}
