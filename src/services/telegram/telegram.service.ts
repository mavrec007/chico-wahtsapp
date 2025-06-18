
// telegram/telegram.service.ts
export class TelegramService {
  private botToken: string;
  private chatId: string;

  constructor(botToken: string, chatId: string) {
    this.botToken = botToken;
    this.chatId = chatId;
    
    // Send startup notification
    this.sendMessage('🤖 تم تفعيل نظام Sports Hub. مرحباً بك في لوحة الإشعارات.');
  }

  async sendMessage(message: string): Promise<boolean> {
    try {
      const res = await fetch(`https://api.telegram.org/bot${this.botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          chat_id: this.chatId, 
          text: message, 
          parse_mode: 'HTML' 
        })
      });
      return res.ok;
    } catch (err) {
      console.error('Telegram message failed:', err);
      return false;
    }
  }

  async sendBookingNotification(booking: any): Promise<boolean> {
    const message = `
🏆 <b>حجز جديد - Sports Hub</b>

👤 <b>العميل:</b> ${booking.clientName}
🏊‍♂️ <b>النشاط:</b> ${this.getActivityName(booking.activityType)}
📅 <b>التاريخ:</b> ${booking.date}
⏰ <b>الوقت:</b> ${booking.time}
⏱️ <b>المدة:</b> ${booking.duration} ساعة
💰 <b>المبلغ:</b> ${booking.price} ريال
📊 <b>الحالة:</b> ${this.getStatusEmoji(booking.status)} ${this.getStatusName(booking.status)}

${booking.notes ? `📝 <b>ملاحظات:</b> ${booking.notes}` : ''}
    `.trim();

    return this.sendMessage(message);
  }

  async sendPaymentNotification(payment: any): Promise<boolean> {
    const message = `
💳 <b>دفعة جديدة - Sports Hub</b>

👤 <b>العميل:</b> ${payment.clientName}
💰 <b>المبلغ:</b> ${payment.amount} ريال
📊 <b>نوع الدفع:</b> ${payment.type}
✅ <b>الحالة:</b> ${payment.status}
📅 <b>التاريخ:</b> ${payment.date}
    `.trim();

    return this.sendMessage(message);
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

  private getStatusEmoji(status: string): string {
    const emojis: Record<string, string> = {
      pending: '⏳',
      confirmed: '✅',
      cancelled: '❌',
      completed: '🏆'
    };
    return emojis[status] || '📊';
  }

  private getStatusName(status: string): string {
    const statuses: Record<string, string> = {
      pending: 'معلق',
      confirmed: 'مؤكد',
      cancelled: 'ملغي',
      completed: 'مكتمل'
    };
    return statuses[status] || status;
  }
}

// Create service instance with environment variables
const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

export const telegramService = botToken && chatId 
  ? new TelegramService(botToken, chatId)
  : null;
