
export interface BaseEntity {
  id: string;
  created_at: string;
  updated_at: string;
}

export interface User extends BaseEntity {
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'user';
}

export interface Coach extends BaseEntity {
  user_id?: string;
  specialty: string;
  experience_years?: number;
  hourly_rate?: number;
  email?: string;
  phone?: string;
  certification?: string;
  availability?: any;
}

export interface Player extends BaseEntity {
  user_id?: string;
  position?: string;
  team?: string;
  email?: string;
  phone?: string;
  date_of_birth?: string;
  rating?: number;
  emergency_contact?: any;
}

export interface Facility extends BaseEntity {
  name: string;
  type: string;
  description?: string;
  capacity: number;
  hourly_rate: number;
  available_hours?: any;
  maintenance_schedule?: any;
  amenities?: string[];
  active?: boolean;
}

export interface Payment extends BaseEntity {
  booking_id?: string;
  amount: number;
  payment_method?: string;
  payment_type?: string;
  status?: string;
  reference_number?: string;
  notes?: string;
  confirmed_by?: string;
  confirmed_at?: string;
}

export interface CoachAssignment extends BaseEntity {
  coach_id?: string;
  player_id?: string;
  training_type: string;
  start_date: string;
  end_date?: string;
}

export interface Booking extends BaseEntity {
  user_id?: string;
  facility_id?: string;
  start_time: string;
  end_time: string;
  status?: string;
  total_amount: number;
  notes?: string;
}

// Pagination and API types
export interface PaginationParams {
  page?: number;
  pageSize?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  filters?: Record<string, any>;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Form types
export interface LoginFormData {
  email: string;
  password: string;
}

export interface CoachFormData {
  specialty: string;
  experience_years: number;
  hourly_rate: number;
  email: string;
  phone: string;
  certification: string;
}

export interface PlayerFormData {
  position: string;
  team: string;
  email: string;
  phone: string;
  date_of_birth: string;
  rating: number;
}

export interface FacilityFormData {
  name: string;
  type: string;
  description: string;
  capacity: number;
  hourly_rate: number;
  amenities: string[];
}

export interface PaymentFormData {
  booking_id: string;
  amount: number;
  payment_method: string;
  payment_type: string;
  reference_number: string;
  notes: string;
}

export interface CoachAssignmentFormData {
  coach_id: string;
  player_id: string;
  training_type: string;
  start_date: string;
  end_date: string;
}
