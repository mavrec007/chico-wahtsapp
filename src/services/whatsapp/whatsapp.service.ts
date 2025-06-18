import { whatsappClient } from './whatsapp.client';

export class WhatsAppService {
  async sendMessage(to: string, message: string): Promise<boolean> {
    try {
      const chatId = to.includes('@c.us') ? to : `${to}@c.us`;
      await whatsappClient.sendMessage(chatId, message);
      return true;
    } catch (err) {
      console.error('WhatsApp message failed:', err);
      return false;
    }
  }

  async sendBookingConfirmation(booking: any, clientPhone: string): Promise<boolean> {
    const message = `
🏆 *تأكيد حجز - Sports Hub*

مرحباً ${booking.clientName} 👋

تم تأكيد حجزك بنجاح:

🏊‍♂️ *النشاط:* ${this.getActivityName(booking.activityType)}
📅 *التاريخ:* ${booking.date}
⏰ *الوقت:* ${booking.time}
⏱️ *المدة:* ${booking.duration} ساعة
💰 *المبلغ:* ${booking.price} ريال

${booking.location ? `📍 *المكان:* ${booking.location}` : ''}
${booking.notes ? `📝 *ملاحظات:* ${booking.notes}` : ''}

شكراً لاختيارك Sports Hub! 🏆

للاستفسارات: واتساب أو اتصال
    `.trim();

    return this.sendMessage(clientPhone, message);
  }

  async sendPaymentReminder(payment: any, clientPhone: string): Promise<boolean> {
    const message = `
💳 *تذكير دفع - Sports Hub*

مرحباً ${payment.clientName} 👋

تذكير ودي بأن لديك دفعة مستحقة:

💰 *المبلغ:* ${payment.amount} ريال
📅 *تاريخ الاستحقاق:* ${payment.dueDate}
🏊‍♂️ *الحجز:* ${payment.bookingDetails}

يرجى إتمام الدفع في أقرب وقت لتأكيد حجزك.

شكراً لتفهمك 🙏
    `.trim();

    return this.sendMessage(clientPhone, message);
  }

  async sendCancellationNotice(booking: any, clientPhone: string): Promise<boolean> {
    const message = `
❌ *إشعار إلغاء - Sports Hub*

مرحباً ${booking.clientName} 👋

نأسف لإبلاغك بأنه تم إلغاء حجزك:

🏊‍♂️ *النشاط:* ${this.getActivityName(booking.activityType)}
📅 *التاريخ:* ${booking.date}
⏰ *الوقت:* ${booking.time}

💰 *سيتم استرداد المبلغ خلال 3-5 أيام عمل*

نعتذر عن أي إزعاج. يمكنك إعادة الحجز في أي وقت.

فريق Sports Hub 🏆
    `.trim();

    return this.sendMessage(clientPhone, message);
  }

  private getActivityName(type: string): string {
    const activities: Record<string, string> = {
      swimming: 'سباحة',
      football: 'كرة قدم',
      basketball: 'كرة سلة',
      tennis: 'تنس',
      volleyball: 'كرة طائرة'
    };
    return activities[type] || type;
  }
}

export const whatsappService = new WhatsAppService();
