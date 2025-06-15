
// Database model interfaces for the Sports Booking Platform

export interface Client {
  id: number;
  phone_number: string;
  name?: string;
  address?: string;
  national_id?: string;
  is_registered: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface SwimmingActivity {
  id: number;
  activity_type: 'open_session' | 'private_session';
  name: string;
  description?: string;
  price_per_hour: number;
  available_hours: string[]; // Array of time slots like ["10:00", "12:00"]
  duration_minutes: number;
  max_participants?: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface FieldActivity {
  id: number;
  field_type: 'football' | 'basketball' | 'tennis' | 'volleyball';
  name: string;
  description?: string;
  price_per_hour: number;
  available_hours: string[]; // Array of time slots like ["08:00", "10:00"]
  duration_minutes: number;
  max_participants?: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface PendingBooking {
  id: number;
  booking_reference: string;
  client_id: number;
  activity_type: 'field' | 'swimming';
  activity_id: number; // References either field_activities.id or swimming_activities.id
  booking_date: string; // YYYY-MM-DD format
  booking_time: string; // HH:MM format
  duration_minutes: number;
  total_price: number;
  status: 'pending_payment' | 'payment_submitted' | 'expired';
  expires_at?: Date;
  created_at: Date;
  updated_at: Date;
}

export interface ConfirmedBooking {
  id: number;
  booking_reference: string;
  client_id: number;
  activity_type: 'field' | 'swimming';
  activity_id: number; // References either field_activities.id or swimming_activities.id
  booking_date: string; // YYYY-MM-DD format
  booking_time: string; // HH:MM format
  duration_minutes: number;
  total_price: number;
  payment_id?: number;
  confirmed_at: Date;
  created_at: Date;
}

export interface Payment {
  id: number;
  pending_booking_id: number;
  client_id: number;
  transaction_reference: string;
  amount: number;
  payment_method: 'bank_transfer' | 'card' | 'cash' | 'other';
  status: 'submitted' | 'verified' | 'confirmed' | 'rejected';
  bank_name?: string;
  account_number?: string;
  payment_date?: Date;
  verified_by_admin?: number;
  admin_notes?: string;
  created_at: Date;
  updated_at: Date;
}

// Extended interfaces with joined data for easier querying
export interface PendingBookingWithDetails extends PendingBooking {
  client: Client;
  activity: SwimmingActivity | FieldActivity;
}

export interface ConfirmedBookingWithDetails extends ConfirmedBooking {
  client: Client;
  activity: SwimmingActivity | FieldActivity;
  payment?: Payment;
}

export interface PaymentWithDetails extends Payment {
  client: Client;
  pending_booking: PendingBooking;
}

// Input types for creating new records
export interface CreateClientInput {
  phone_number: string;
  name?: string;
  address?: string;
  national_id?: string;
}

export interface CreatePendingBookingInput {
  client_id: number;
  activity_type: 'field' | 'swimming';
  activity_id: number;
  booking_date: string;
  booking_time: string;
  duration_minutes: number;
  total_price: number;
}

export interface CreatePaymentInput {
  pending_booking_id: number;
  client_id: number;
  transaction_reference: string;
  amount: number;
  payment_method?: 'bank_transfer' | 'card' | 'cash' | 'other';
  bank_name?: string;
  account_number?: string;
}

// Update types for partial updates
export interface UpdateClientInput {
  name?: string;
  address?: string;
  national_id?: string;
  is_registered?: boolean;
}

export interface UpdatePaymentStatusInput {
  status: 'verified' | 'confirmed' | 'rejected';
  verified_by_admin?: number;
  admin_notes?: string;
}
