
export interface BaseEntity {
  id: string;
  created_at: string;
  updated_at: string;
}

export interface Coach extends BaseEntity {
  user_id?: string;
  specialty: string;
  certification?: string;
  experience_years?: number;
  email?: string;
  phone?: string;
  hourly_rate?: number;
  availability?: Record<string, any>;
}

export interface Player extends BaseEntity {
  user_id?: string;
  position?: string;
  team?: string;
  rating?: number;
  email?: string;
  phone?: string;
  date_of_birth?: string;
  emergency_contact?: Record<string, any>;
}

export interface Facility extends BaseEntity {
  name: string;
  type: string;
  capacity: number;
  hourly_rate: number;
  description?: string;
  amenities?: string[];
  available_hours?: Record<string, any>;
  maintenance_schedule?: Record<string, any>;
  active: boolean;
}

export interface Booking extends BaseEntity {
  facility_id?: string;
  user_id?: string;
  start_time: string;
  end_time: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  total_amount: number;
  notes?: string;
  facility?: Facility;
}

export interface Payment extends BaseEntity {
  booking_id?: string;
  amount: number;
  payment_type: 'deposit' | 'final' | 'full' | 'refund';
  payment_method: 'cash' | 'card' | 'bank_transfer' | 'online';
  reference_number?: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  confirmed_by?: string;
  confirmed_at?: string;
  notes?: string;
  booking?: Booking;
}

export interface CoachAssignment extends BaseEntity {
  coach_id?: string;
  player_id?: string;
  training_type: string;
  start_date: string;
  end_date?: string;
  coach?: Coach;
  player?: Player;
}

export interface PaginationParams {
  page: number;
  pageSize: number;
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

export interface TableColumn<T> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  render?: (value: any, record: T) => React.ReactNode;
}

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'number' | 'select' | 'textarea' | 'date' | 'time' | 'datetime' | 'checkbox' | 'multiselect';
  required?: boolean;
  options?: Array<{ value: string; label: string }>;
  placeholder?: string;
  validation?: any;
}
