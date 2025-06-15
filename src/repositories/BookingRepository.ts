
import { db } from '../database/connection';
import { PendingBooking, ConfirmedBooking, CreatePendingBookingInput, PendingBookingWithDetails, ConfirmedBookingWithDetails } from '../types/database';

export class BookingRepository {
  // Generate unique booking reference
  private generateBookingReference(): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 4);
    return `BK${timestamp}${random}`.toUpperCase();
  }

  // Pending Bookings Methods
  async createPendingBooking(bookingData: CreatePendingBookingInput): Promise<PendingBooking> {
    const bookingReference = this.generateBookingReference();
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes from now

    const query = `
      INSERT INTO pending_bookings 
      (booking_reference, client_id, activity_type, activity_id, booking_date, booking_time, duration_minutes, total_price, expires_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const result = await db.query(query, [
      bookingReference,
      bookingData.client_id,
      bookingData.activity_type,
      bookingData.activity_id,
      bookingData.booking_date,
      bookingData.booking_time,
      bookingData.duration_minutes,
      bookingData.total_price,
      expiresAt
    ]);

    const createdBooking = await this.findPendingBookingById(result.insertId);
    if (!createdBooking) {
      throw new Error('Failed to create pending booking');
    }

    return createdBooking;
  }

  async findPendingBookingById(id: number): Promise<PendingBooking | null> {
    const query = 'SELECT * FROM pending_bookings WHERE id = ?';
    const results = await db.query(query, [id]);
    return Array.isArray(results) && results.length > 0 ? this.mapToPendingBooking(results[0]) : null;
  }

  async findPendingBookingByReference(reference: string): Promise<PendingBooking | null> {
    const query = 'SELECT * FROM pending_bookings WHERE booking_reference = ?';
    const results = await db.query(query, [reference]);
    return Array.isArray(results) && results.length > 0 ? this.mapToPendingBooking(results[0]) : null;
  }

  async getAllPendingBookings(): Promise<PendingBookingWithDetails[]> {
    const query = `
      SELECT 
        pb.*,
        c.phone_number, c.name as client_name, c.address, c.national_id,
        CASE 
          WHEN pb.activity_type = 'swimming' THEN sa.name
          WHEN pb.activity_type = 'field' THEN fa.name
        END as activity_name,
        CASE 
          WHEN pb.activity_type = 'swimming' THEN sa.price_per_hour
          WHEN pb.activity_type = 'field' THEN fa.price_per_hour
        END as activity_price
      FROM pending_bookings pb
      JOIN clients c ON pb.client_id = c.id
      LEFT JOIN swimming_activities sa ON pb.activity_type = 'swimming' AND pb.activity_id = sa.id
      LEFT JOIN field_activities fa ON pb.activity_type = 'field' AND pb.activity_id = fa.id
      WHERE pb.status != 'expired'
      ORDER BY pb.created_at DESC
    `;

    const results = await db.query(query);
    return Array.isArray(results) ? results.map((row: any) => this.mapToPendingBookingWithDetails(row)) : [];
  }

  async updatePendingBookingStatus(id: number, status: 'pending_payment' | 'payment_submitted' | 'expired'): Promise<boolean> {
    const query = 'UPDATE pending_bookings SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?';
    const result = await db.query(query, [status, id]);
    return result.affectedRows > 0;
  }

  async deletePendingBooking(id: number): Promise<boolean> {
    const query = 'DELETE FROM pending_bookings WHERE id = ?';
    const result = await db.query(query, [id]);
    return result.affectedRows > 0;
  }

  // Confirmed Bookings Methods
  async moveToConfirmed(pendingBookingId: number, paymentId?: number): Promise<ConfirmedBooking | null> {
    return await db.transaction(async (connection) => {
      // Get the pending booking
      const [pendingRows] = await connection.execute(
        'SELECT * FROM pending_bookings WHERE id = ?',
        [pendingBookingId]
      );

      if (!Array.isArray(pendingRows) || pendingRows.length === 0) {
        throw new Error('Pending booking not found');
      }

      const pendingBooking = pendingRows[0] as any;

      // Insert into confirmed bookings
      const [insertResult] = await connection.execute(`
        INSERT INTO confirmed_bookings 
        (booking_reference, client_id, activity_type, activity_id, booking_date, booking_time, duration_minutes, total_price, payment_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        pendingBooking.booking_reference,
        pendingBooking.client_id,
        pendingBooking.activity_type,
        pendingBooking.activity_id,
        pendingBooking.booking_date,
        pendingBooking.booking_time,
        pendingBooking.duration_minutes,
        pendingBooking.total_price,
        paymentId || null
      ]);

      // Delete from pending bookings
      await connection.execute('DELETE FROM pending_bookings WHERE id = ?', [pendingBookingId]);

      // Return the confirmed booking
      const confirmedBooking = await this.findConfirmedBookingById((insertResult as any).insertId);
      return confirmedBooking;
    });
  }

  async findConfirmedBookingById(id: number): Promise<ConfirmedBooking | null> {
    const query = 'SELECT * FROM confirmed_bookings WHERE id = ?';
    const results = await db.query(query, [id]);
    return Array.isArray(results) && results.length > 0 ? this.mapToConfirmedBooking(results[0]) : null;
  }

  async getAllConfirmedBookings(): Promise<ConfirmedBookingWithDetails[]> {
    const query = `
      SELECT 
        cb.*,
        c.phone_number, c.name as client_name, c.address, c.national_id,
        CASE 
          WHEN cb.activity_type = 'swimming' THEN sa.name
          WHEN cb.activity_type = 'field' THEN fa.name
        END as activity_name,
        p.transaction_reference, p.amount as payment_amount, p.status as payment_status
      FROM confirmed_bookings cb
      JOIN clients c ON cb.client_id = c.id
      LEFT JOIN swimming_activities sa ON cb.activity_type = 'swimming' AND cb.activity_id = sa.id
      LEFT JOIN field_activities fa ON cb.activity_type = 'field' AND cb.activity_id = fa.id
      LEFT JOIN payments p ON cb.payment_id = p.id
      ORDER BY cb.confirmed_at DESC
    `;

    const results = await db.query(query);
    return Array.isArray(results) ? results.map((row: any) => this.mapToConfirmedBookingWithDetails(row)) : [];
  }

  // Helper methods for mapping database rows to objects
  private mapToPendingBooking(row: any): PendingBooking {
    return {
      id: row.id,
      booking_reference: row.booking_reference,
      client_id: row.client_id,
      activity_type: row.activity_type,
      activity_id: row.activity_id,
      booking_date: row.booking_date,
      booking_time: row.booking_time,
      duration_minutes: row.duration_minutes,
      total_price: parseFloat(row.total_price),
      status: row.status,
      expires_at: row.expires_at ? new Date(row.expires_at) : undefined,
      created_at: new Date(row.created_at),
      updated_at: new Date(row.updated_at)
    };
  }

  private mapToConfirmedBooking(row: any): ConfirmedBooking {
    return {
      id: row.id,
      booking_reference: row.booking_reference,
      client_id: row.client_id,
      activity_type: row.activity_type,
      activity_id: row.activity_id,
      booking_date: row.booking_date,
      booking_time: row.booking_time,
      duration_minutes: row.duration_minutes,
      total_price: parseFloat(row.total_price),
      payment_id: row.payment_id,
      confirmed_at: new Date(row.confirmed_at),
      created_at: new Date(row.created_at)
    };
  }

  private mapToPendingBookingWithDetails(row: any): PendingBookingWithDetails {
    return {
      ...this.mapToPendingBooking(row),
      client: {
        id: row.client_id,
        phone_number: row.phone_number,
        name: row.client_name,
        address: row.address,
        national_id: row.national_id,
        is_registered: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      activity: {
        id: row.activity_id,
        name: row.activity_name,
        price_per_hour: parseFloat(row.activity_price),
        // Add other required fields with defaults
        description: '',
        available_hours: [],
        duration_minutes: 60,
        is_active: true,
        created_at: new Date(),
        updated_at: new Date()
      } as any
    };
  }

  private mapToConfirmedBookingWithDetails(row: any): ConfirmedBookingWithDetails {
    return {
      ...this.mapToConfirmedBooking(row),
      client: {
        id: row.client_id,
        phone_number: row.phone_number,
        name: row.client_name,
        address: row.address,
        national_id: row.national_id,
        is_registered: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      activity: {
        id: row.activity_id,
        name: row.activity_name,
        price_per_hour: parseFloat(row.activity_price || 0),
        description: '',
        available_hours: [],
        duration_minutes: 60,
        is_active: true,
        created_at: new Date(),
        updated_at: new Date()
      } as any,
      payment: row.transaction_reference ? {
        id: row.payment_id,
        transaction_reference: row.transaction_reference,
        amount: parseFloat(row.payment_amount),
        status: row.payment_status,
        // Add other required fields with defaults
        pending_booking_id: 0,
        client_id: row.client_id,
        payment_method: 'bank_transfer' as const,
        created_at: new Date(),
        updated_at: new Date()
      } : undefined
    };
  }
}

export const bookingRepository = new BookingRepository();
