
import { db } from '../database/connection';
import { Payment, CreatePaymentInput, UpdatePaymentStatusInput, PaymentWithDetails } from '../types/database';

export class PaymentRepository {
  async create(paymentData: CreatePaymentInput): Promise<Payment> {
    const query = `
      INSERT INTO payments 
      (pending_booking_id, client_id, transaction_reference, amount, payment_method, bank_name, account_number, payment_date)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const result = await db.query(query, [
      paymentData.pending_booking_id,
      paymentData.client_id,
      paymentData.transaction_reference,
      paymentData.amount,
      paymentData.payment_method || 'bank_transfer',
      paymentData.bank_name || null,
      paymentData.account_number || null,
      new Date()
    ]);

    const createdPayment = await this.findById(result.insertId);
    if (!createdPayment) {
      throw new Error('Failed to create payment');
    }

    return createdPayment;
  }

  async findById(id: number): Promise<Payment | null> {
    const query = 'SELECT * FROM payments WHERE id = ?';
    const results = await db.query(query, [id]);
    return results.length > 0 ? this.mapToPayment(results[0]) : null;
  }

  async findByTransactionReference(transactionRef: string): Promise<Payment | null> {
    const query = 'SELECT * FROM payments WHERE transaction_reference = ?';
    const results = await db.query(query, [transactionRef]);
    return results.length > 0 ? this.mapToPayment(results[0]) : null;
  }

  async findByPendingBookingId(pendingBookingId: number): Promise<Payment[]> {
    const query = 'SELECT * FROM payments WHERE pending_booking_id = ? ORDER BY created_at DESC';
    const results = await db.query(query, [pendingBookingId]);
    return results.map((row: any) => this.mapToPayment(row));
  }

  async getAllPayments(): Promise<PaymentWithDetails[]> {
    const query = `
      SELECT 
        p.*,
        c.phone_number, c.name as client_name,
        pb.booking_reference, pb.booking_date, pb.booking_time, pb.total_price as booking_total
      FROM payments p
      JOIN clients c ON p.client_id = c.id
      JOIN pending_bookings pb ON p.pending_booking_id = pb.id
      ORDER BY p.created_at DESC
    `;

    const results = await db.query(query);
    return results.map((row: any) => this.mapToPaymentWithDetails(row));
  }

  async getPaymentsByStatus(status: 'submitted' | 'verified' | 'confirmed' | 'rejected'): Promise<PaymentWithDetails[]> {
    const query = `
      SELECT 
        p.*,
        c.phone_number, c.name as client_name,
        pb.booking_reference, pb.booking_date, pb.booking_time, pb.total_price as booking_total
      FROM payments p
      JOIN clients c ON p.client_id = c.id
      JOIN pending_bookings pb ON p.pending_booking_id = pb.id
      WHERE p.status = ?
      ORDER BY p.created_at DESC
    `;

    const results = await db.query(query, [status]);
    return results.map((row: any) => this.mapToPaymentWithDetails(row));
  }

  async updateStatus(id: number, statusUpdate: UpdatePaymentStatusInput): Promise<Payment | null> {
    const query = `
      UPDATE payments 
      SET status = ?, verified_by_admin = ?, admin_notes = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;

    await db.query(query, [
      statusUpdate.status,
      statusUpdate.verified_by_admin || null,
      statusUpdate.admin_notes || null,
      id
    ]);

    return this.findById(id);
  }

  async getPaymentStats() {
    const queries = {
      total: 'SELECT COUNT(*) as count FROM payments',
      totalAmount: 'SELECT SUM(amount) as total FROM payments WHERE status = "confirmed"',
      byStatus: 'SELECT status, COUNT(*) as count FROM payments GROUP BY status',
      todayPayments: 'SELECT COUNT(*) as count FROM payments WHERE DATE(created_at) = CURDATE()',
      todayAmount: 'SELECT SUM(amount) as total FROM payments WHERE DATE(created_at) = CURDATE() AND status = "confirmed"'
    };

    const [total, totalAmount, byStatus, todayPayments, todayAmount] = await Promise.all([
      db.query(queries.total),
      db.query(queries.totalAmount),
      db.query(queries.byStatus),
      db.query(queries.todayPayments),
      db.query(queries.todayAmount)
    ]);

    return {
      totalPayments: total[0].count,
      totalAmount: parseFloat(totalAmount[0].total || 0),
      byStatus: byStatus.reduce((acc: any, row: any) => {
        acc[row.status] = row.count;
        return acc;
      }, {}),
      todayPayments: todayPayments[0].count,
      todayAmount: parseFloat(todayAmount[0].total || 0)
    };
  }

  private mapToPayment(row: any): Payment {
    return {
      id: row.id,
      pending_booking_id: row.pending_booking_id,
      client_id: row.client_id,
      transaction_reference: row.transaction_reference,
      amount: parseFloat(row.amount),
      payment_method: row.payment_method,
      status: row.status,
      bank_name: row.bank_name,
      account_number: row.account_number,
      payment_date: row.payment_date ? new Date(row.payment_date) : undefined,
      verified_by_admin: row.verified_by_admin,
      admin_notes: row.admin_notes,
      created_at: new Date(row.created_at),
      updated_at: new Date(row.updated_at)
    };
  }

  private mapToPaymentWithDetails(row: any): PaymentWithDetails {
    return {
      ...this.mapToPayment(row),
      client: {
        id: row.client_id,
        phone_number: row.phone_number,
        name: row.client_name,
        address: '',
        national_id: '',
        is_registered: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      pending_booking: {
        id: row.pending_booking_id,
        booking_reference: row.booking_reference,
        client_id: row.client_id,
        activity_type: 'field',
        activity_id: 1,
        booking_date: row.booking_date,
        booking_time: row.booking_time,
        duration_minutes: 60,
        total_price: parseFloat(row.booking_total),
        status: 'payment_submitted',
        created_at: new Date(),
        updated_at: new Date()
      }
    };
  }
}

export const paymentRepository = new PaymentRepository();
