
interface BookingData {
  id: string;
  customerPhone: string;
  activityType: 'courts' | 'swimming';
  selectedType: string;
  selectedTime: string;
  selectedDate: string;
  price: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: Date;
}

interface UserSession {
  step: 'welcome' | 'select-activity' | 'select-type' | 'select-time' | 'enter-phone' | 'payment' | 'confirmation';
  activityType?: 'courts' | 'swimming';
  selectedType?: string;
  selectedTime?: string;
  selectedDate?: string;
  phone?: string;
  bookingId?: string;
}

class BookingService {
  private bookings: Map<string, BookingData> = new Map();
  private userSessions: Map<string, UserSession> = new Map();

  // Generate unique booking ID
  private generateBookingId(): string {
    return 'BK' + Date.now() + Math.random().toString(36).substr(2, 5);
  }

  // Get or create user session
  getUserSession(phoneNumber: string): UserSession {
    if (!this.userSessions.has(phoneNumber)) {
      this.userSessions.set(phoneNumber, { step: 'welcome' });
    }
    return this.userSessions.get(phoneNumber)!;
  }

  // Update user session
  updateUserSession(phoneNumber: string, updates: Partial<UserSession>): void {
    const session = this.getUserSession(phoneNumber);
    this.userSessions.set(phoneNumber, { ...session, ...updates });
  }

  // Create new booking
  createBooking(phoneNumber: string, bookingData: Omit<BookingData, 'id' | 'createdAt' | 'status'>): string {
    const bookingId = this.generateBookingId();
    const booking: BookingData = {
      ...bookingData,
      id: bookingId,
      status: 'pending',
      createdAt: new Date()
    };
    
    this.bookings.set(bookingId, booking);
    this.updateUserSession(phoneNumber, { bookingId });
    
    console.log(`📋 New booking created:`, booking);
    return bookingId;
  }

  // Get booking by ID
  getBooking(bookingId: string): BookingData | undefined {
    return this.bookings.get(bookingId);
  }

  // Get all bookings
  getAllBookings(): BookingData[] {
    return Array.from(this.bookings.values());
  }

  // Get bookings by phone
  getBookingsByPhone(phoneNumber: string): BookingData[] {
    return Array.from(this.bookings.values()).filter(
      booking => booking.customerPhone === phoneNumber
    );
  }

  // Confirm booking
  confirmBooking(bookingId: string): boolean {
    const booking = this.bookings.get(bookingId);
    if (booking) {
      booking.status = 'confirmed';
      this.bookings.set(bookingId, booking);
      console.log(`✅ Booking confirmed: ${bookingId}`);
      return true;
    }
    return false;
  }

  // Cancel booking
  cancelBooking(bookingId: string): boolean {
    const booking = this.bookings.get(bookingId);
    if (booking) {
      booking.status = 'cancelled';
      this.bookings.set(bookingId, booking);
      console.log(`❌ Booking cancelled: ${bookingId}`);
      return true;
    }
    return false;
  }

  // Get pending bookings
  getPendingBookings(): BookingData[] {
    return Array.from(this.bookings.values()).filter(
      booking => booking.status === 'pending'
    );
  }

  // Reset user session
  resetUserSession(phoneNumber: string): void {
    this.userSessions.set(phoneNumber, { step: 'welcome' });
  }

  // Get booking stats
  getStats() {
    const allBookings = this.getAllBookings();
    const today = new Date().toDateString();
    
    return {
      total: allBookings.length,
      pending: allBookings.filter(b => b.status === 'pending').length,
      confirmed: allBookings.filter(b => b.status === 'confirmed').length,
      cancelled: allBookings.filter(b => b.status === 'cancelled').length,
      todayBookings: allBookings.filter(b => 
        new Date(b.createdAt).toDateString() === today
      ).length,
      todayRevenue: allBookings.filter(b => 
        b.status === 'confirmed' && new Date(b.createdAt).toDateString() === today
      ).reduce((sum, b) => sum + b.price, 0)
    };
  }
}

export const bookingService = new BookingService();
export type { BookingData, UserSession };
