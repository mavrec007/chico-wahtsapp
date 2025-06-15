
import { config } from '../config/environment';
import { bookingService } from './BookingService';
import { whatsAppBot } from './WhatsAppBot';

class TelegramBot {
  private isConnected = false;
  private token = config.telegram.token;
  private chatId = config.telegram.chatId;

  // Initialize Telegram bot
  async connect(): Promise<void> {
    console.log('🔄 Connecting to Telegram Bot...');
    console.log(`📋 Token: ${this.token.substring(0, 10)}...`);
    console.log(`📋 Chat ID: ${this.chatId}`);
    
    // Simulate connection
    setTimeout(() => {
      this.isConnected = true;
      console.log('✅ Telegram Bot connected successfully!');
      console.log('📱 Ready to manage bookings');
      this.sendWelcomeMessage();
    }, 1500);
  }

  // Send welcome message to admin
  private async sendWelcomeMessage(): Promise<void> {
    const welcomeMessage = `
🤖 *مرحباً بك في بوت إدارة الحجوزات الرياضية*

✅ تم تشغيل النظام بنجاح

📋 *الأوامر المتاحة:*
• /stats - إحصائيات الحجوزات
• /pending - الحجوزات المعلقة
• /confirm [booking_id] - تأكيد حجز
• /cancel [booking_id] - إلغاء حجز
• /help - قائمة المساعدة

💡 سيتم إشعارك تلقائياً بالحجوزات الجديدة
    `;
    
    await this.sendMessage(welcomeMessage);
  }

  // Handle incoming commands
  async handleCommand(command: string): Promise<void> {
    console.log(`📨 Telegram command received: ${command}`);
    
    const [cmd, ...args] = command.trim().split(' ');
    
    switch (cmd.toLowerCase()) {
      case '/start':
      case '/help':
        await this.sendHelpMessage();
        break;
      
      case '/stats':
        await this.sendStats();
        break;
      
      case '/pending':
        await this.sendPendingBookings();
        break;
      
      case '/confirm':
        if (args.length > 0) {
          await this.confirmBooking(args[0]);
        } else {
          await this.sendMessage('❌ يرجى تحديد رقم الحجز\nمثال: /confirm BK123456');
        }
        break;
      
      case '/cancel':
        if (args.length > 0) {
          await this.cancelBooking(args[0]);
        } else {
          await this.sendMessage('❌ يرجى تحديد رقم الحجز\nمثال: /cancel BK123456');
        }
        break;
      
      default:
        await this.sendMessage(`❌ أمر غير معروف: ${cmd}\nاستخدم /help للمساعدة`);
    }
  }

  // Send help message
  private async sendHelpMessage(): Promise<void> {
    const helpMessage = `
🤖 *أوامر بوت إدارة الحجوزات*

📊 */stats* - عرض إحصائيات الحجوزات
⏳ */pending* - عرض الحجوزات المعلقة
✅ */confirm [booking_id]* - تأكيد حجز
❌ */cancel [booking_id]* - إلغاء حجز
❓ */help* - عرض هذه المساعدة

💡 *ملاحظة:* سيتم إشعارك تلقائياً بالحجوزات الجديدة
    `;
    
    await this.sendMessage(helpMessage);
  }

  // Send booking statistics
  private async sendStats(): Promise<void> {
    const stats = bookingService.getStats();
    
    const statsMessage = `
📊 *إحصائيات الحجوزات*

📋 إجمالي الحجوزات: ${stats.total}
⏳ معلقة: ${stats.pending}
✅ مؤكدة: ${stats.confirmed}
❌ ملغية: ${stats.cancelled}

📅 حجوزات اليوم: ${stats.todayBookings}
💰 إيرادات اليوم: ${stats.todayRevenue} ريال
    `;
    
    await this.sendMessage(statsMessage);
  }

  // Send pending bookings
  private async sendPendingBookings(): Promise<void> {
    const pendingBookings = bookingService.getPendingBookings();
    
    if (pendingBookings.length === 0) {
      await this.sendMessage('✅ لا توجد حجوزات معلقة');
      return;
    }

    let message = '⏳ *الحجوزات المعلقة:*\n\n';
    
    pendingBookings.forEach(booking => {
      message += `🆔 *${booking.id}*\n`;
      message += `📱 الهاتف: ${booking.customerPhone}\n`;
      message += `🏟️ النوع: ${booking.selectedType}\n`;
      message += `📅 التاريخ: ${booking.selectedDate}\n`;
      message += `⏰ الوقت: ${booking.selectedTime}\n`;
      message += `💰 السعر: ${booking.price} ريال\n`;
      message += `➖➖➖➖➖➖➖➖\n`;
    });
    
    message += '\n💡 استخدم /confirm [booking_id] لتأكيد الحجز';
    message += '\n💡 استخدم /cancel [booking_id] لإلغاء الحجز';
    
    await this.sendMessage(message);
  }

  // Confirm booking
  private async confirmBooking(bookingId: string): Promise<void> {
    const booking = bookingService.getBooking(bookingId);
    
    if (!booking) {
      await this.sendMessage(`❌ لم يتم العثور على حجز برقم: ${bookingId}`);
      return;
    }

    if (booking.status !== 'pending') {
      await this.sendMessage(`❌ الحجز ${bookingId} ليس معلقاً (الحالة: ${booking.status})`);
      return;
    }

    const success = bookingService.confirmBooking(bookingId);
    
    if (success) {
      await this.sendMessage(`✅ تم تأكيد الحجز ${bookingId} بنجاح`);
      
      // Send confirmation to customer via WhatsApp
      await whatsAppBot.sendBookingConfirmation(booking.customerPhone, bookingId);
      
      // Send detailed confirmation to admin
      const confirmationMessage = `
🎉 *تم تأكيد الحجز بنجاح*

🆔 رقم الحجز: ${booking.id}
📱 هاتف العميل: ${booking.customerPhone}
🏟️ النوع: ${booking.selectedType}
📅 التاريخ: ${booking.selectedDate}
⏰ الوقت: ${booking.selectedTime}
💰 السعر: ${booking.price} ريال

📤 تم إرسال رسالة تأكيد للعميل عبر واتساب
      `;
      
      await this.sendMessage(confirmationMessage);
    } else {
      await this.sendMessage(`❌ فشل في تأكيد الحجز ${bookingId}`);
    }
  }

  // Cancel booking
  private async cancelBooking(bookingId: string): Promise<void> {
    const booking = bookingService.getBooking(bookingId);
    
    if (!booking) {
      await this.sendMessage(`❌ لم يتم العثور على حجز برقم: ${bookingId}`);
      return;
    }

    const success = bookingService.cancelBooking(bookingId);
    
    if (success) {
      await this.sendMessage(`❌ تم إلغاء الحجز ${bookingId}`);
      
      // Send cancellation to customer via WhatsApp
      await whatsAppBot.sendBookingCancellation(booking.customerPhone, bookingId);
      
      const cancellationMessage = `
❌ *تم إلغاء الحجز*

🆔 رقم الحجز: ${booking.id}
📱 هاتف العميل: ${booking.customerPhone}
🏟️ النوع: ${booking.selectedType}

📤 تم إرسال رسالة إلغاء للعميل عبر واتساب
      `;
      
      await this.sendMessage(cancellationMessage);
    } else {
      await this.sendMessage(`❌ فشل في إلغاء الحجز ${bookingId}`);
    }
  }

  // Notify admin of new booking
  async notifyNewBooking(bookingId: string): Promise<void> {
    const booking = bookingService.getBooking(bookingId);
    
    if (!booking) {
      console.log(`❌ Booking not found: ${bookingId}`);
      return;
    }

    const notificationMessage = `
🔔 *حجز جديد!*

🆔 رقم الحجز: ${booking.id}
📱 هاتف العميل: ${booking.customerPhone}
🏟️ النوع: ${booking.selectedType}
📅 التاريخ: ${booking.selectedDate}
⏰ الوقت: ${booking.selectedTime}
💰 السعر: ${booking.price} ريال

⏳ في انتظار تأكيد الدفع

💡 استخدم الأوامر التالية:
• /confirm ${booking.id} - لتأكيد الحجز
• /cancel ${booking.id} - لإلغاء الحجز
    `;

    await this.sendMessage(notificationMessage);
  }

  // Send message to admin
  private async sendMessage(message: string): Promise<void> {
    console.log(`📤 Telegram message to ${this.chatId}:`);
    console.log(message);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    // In real implementation, this would send via Telegram API:
    // await fetch(`https://api.telegram.org/bot${this.token}/sendMessage`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     chat_id: this.chatId,
    //     text: message,
    //     parse_mode: 'Markdown'
    //   })
    // });
  }

  // Simulate receiving a command (for testing)
  simulateCommand(command: string): void {
    this.handleCommand(command);
  }

  getConnectionStatus(): boolean {
    return this.isConnected;
  }
}

export const telegramBot = new TelegramBot();
