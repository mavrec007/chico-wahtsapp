
import { Payment } from '@/types';
import { BaseService } from './base.service';

class PaymentsService extends BaseService<Payment> {
  constructor() {
    super('payments');
  }

  protected applySearch(query: any, search: string): any {
    return query.or(`reference_number.ilike.%${search}%,payment_method.ilike.%${search}%,status.ilike.%${search}%`);
  }

  async getPaymentsByBooking(bookingId: string): Promise<Payment[]> {
    const { data, error } = await supabase
      .from(this.tableName)
      .select(`
        *,
        booking:bookings(*)
      `)
      .eq('booking_id', bookingId);

    if (error) throw error;
    return data as Payment[];
  }

  async confirmPayment(id: string, confirmedBy: string): Promise<Payment> {
    const { data, error } = await supabase
      .from(this.tableName)
      .update({
        status: 'completed',
        confirmed_by: confirmedBy,
        confirmed_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Payment;
  }
}

export const paymentsService = new PaymentsService();
