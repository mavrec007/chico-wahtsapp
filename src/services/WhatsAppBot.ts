
import { activities, messages } from '../config/environment';
import { bookingService } from './BookingService';
import { telegramBot } from './TelegramBot';

class WhatsAppBot {
  private isConnected = false;

  // Simulate WhatsApp connection
  async connect(): Promise<void> {
    console.log('🔄 Connecting to WhatsApp...');
    
    // Simulate connection process
    setTimeout(() => {
      this.isConnected = true;
      console.log('✅ WhatsApp Bot connected successfully!');
      console.log('📱 Ready to receive messages from customers');
    }, 2000);
  }

  // Handle incoming messages
  async handleMessage(phoneNumber: string, message: string): Promise<void> {
    if (!this.isConnected) {
      console.log('❌ WhatsApp bot not connected');
      return;
    }

    console.log(`📨 Received message from ${phoneNumber}: ${message}`);
    
    const session = bookingService.getUserSession(phoneNumber);
    const response = await this.processMessage(phoneNumber, message, session);
    
    if (response) {
      await this.sendMessage(phoneNumber, response);
    }
  }

  // Process message based on current session step
  private async processMessage(phoneNumber: string, message: string, session: any): Promise<string> {
    const trimmedMessage = message.trim();

    switch (session.step) {
      case 'welcome':
        return this.handleWelcomeStep(phoneNumber, trimmedMessage);
      
      case 'select-activity':
        return this.handleActivitySelection(phoneNumber, trimmedMessage);
      
      case 'select-type':
        return this.handleTypeSelection(phoneNumber, trimmedMessage);
      
      case 'select-time':
        return this.handleTimeSelection(phoneNumber, trimmedMessage);
      
      case 'enter-phone':
        return this.handlePhoneEntry(phoneNumber, trimmedMessage);
      
      case 'payment':
        return this.handlePaymentConfirmation(phoneNumber, trimmedMessage);
      
      default:
        return messages.welcome;
    }
  }

  private handleWelcomeStep(phoneNumber: string, message: string): string {
    bookingService.updateUserSession(phoneNumber, { step: 'select-activity' });
    return messages.welcome;
  }

  private handleActivitySelection(phoneNumber: string, message: string): string {
    if (message === '1') {
      bookingService.updateUserSession(phoneNumber, { 
        step: 'select-type', 
        activityType: 'courts' 
      });
      return messages.courtsMenu;
    } else if (message === '2') {
      bookingService.updateUserSession(phoneNumber, { 
        step: 'select-type', 
        activityType: 'swimming' 
      });
      return messages.swimmingMenu;
    } else {
      return messages.invalidOption + "\n\n" + messages.welcome;
    }
  }

  private handleTypeSelection(phoneNumber: string, message: string): string {
    const session = bookingService.getUserSession(phoneNumber);
    const activityType = session.activityType;
    
    if (!activityType) {
      return messages.error;
    }

    const types = activities[activityType].types;
    const selectedIndex = parseInt(message) - 1;
    
    if (selectedIndex >= 0 && selectedIndex < types.length) {
      const selectedType = types[selectedIndex];
      bookingService.updateUserSession(phoneNumber, { 
        step: 'select-time',
        selectedType: selectedType.id 
      });
      
      const availableHours = selectedType.availableHours.join('\n');
      return `تم اختيار: ${selectedType.name}\nالسعر: ${selectedType.pricePerHour} ريال/ساعة\n\nالأوقات المتاحة:\n${availableHours}\n\nيرجى كتابة الوقت المطلوب (مثال: 10:00)`;
    } else {
      return messages.invalidOption;
    }
  }

  private handleTimeSelection(phoneNumber: string, message: string): string {
    const session = bookingService.getUserSession(phoneNumber);
    const activityType = session.activityType;
    const selectedTypeId = session.selectedType;
    
    if (!activityType || !selectedTypeId) {
      return messages.error;
    }

    const selectedType = activities[activityType].types.find(t => t.id === selectedTypeId);
    if (!selectedType) {
      return messages.error;
    }

    if (selectedType.availableHours.includes(message)) {
      bookingService.updateUserSession(phoneNumber, { 
        step: 'enter-phone',
        selectedTime: message,
        selectedDate: new Date().toISOString().split('T')[0] // Today's date
      });
      return messages.requestPhone;
    } else {
      return `وقت غير متاح. يرجى اختيار من الأوقات المتاحة:\n${selectedType.availableHours.join('\n')}`;
    }
  }

  private handlePhoneEntry(phoneNumber: string, message: string): string {
    const session = bookingService.getUserSession(phoneNumber);
    
    // Validate phone number (basic validation)
    if (!/^\+?[0-9]{10,15}$/.test(message.replace(/\s/g, ''))) {
      return "رقم هاتف غير صحيح. يرجى إدخال رقم صحيح:\nمثال: 966512345678";
    }

    // Create booking
    const activityType = session.activityType!;
    const selectedTypeId = session.selectedType!;
    const selectedType = activities[activityType].types.find(t => t.id === selectedTypeId)!;
    
    const bookingId = bookingService.createBooking(phoneNumber, {
      customerPhone: message,
      activityType,
      selectedType: selectedType.name,
      selectedTime: session.selectedTime!,
      selectedDate: session.selectedDate!,
      price: selectedType.pricePerHour
    });

    bookingService.updateUserSession(phoneNumber, { 
      step: 'payment',
      phone: message,
      bookingId
    });

    // Notify admin via Telegram
    telegramBot.notifyNewBooking(bookingId);

    return messages.paymentInstructions;
  }

  private handlePaymentConfirmation(phoneNumber: string, message: string): string {
    const session = bookingService.getUserSession(phoneNumber);
    
    if (session.bookingId) {
      // Update booking with payment reference
      console.log(`💳 Payment reference received: ${message} for booking ${session.bookingId}`);
      
      bookingService.updateUserSession(phoneNumber, { step: 'confirmation' });
      return messages.confirmationPending;
    }
    
    return messages.error;
  }

  // Send message to customer
  async sendMessage(phoneNumber: string, message: string): Promise<void> {
    console.log(`📤 Sending to ${phoneNumber}: ${message}`);
    // In real implementation, this would send via WhatsApp API
  }

  // Send booking confirmation
  async sendBookingConfirmation(phoneNumber: string, bookingId: string): Promise<void> {
    const booking = bookingService.getBooking(bookingId);
    if (booking) {
      const confirmationMessage = messages.bookingConfirmed
        .replace('{date}', booking.selectedDate)
        .replace('{time}', booking.selectedTime)
        .replace('{type}', booking.selectedType)
        .replace('{price}', booking.price.toString());
      
      await this.sendMessage(phoneNumber, confirmationMessage);
      bookingService.resetUserSession(phoneNumber);
    }
  }

  // Send booking cancellation
  async sendBookingCancellation(phoneNumber: string, bookingId: string): Promise<void> {
    await this.sendMessage(phoneNumber, messages.bookingCancelled);
    bookingService.resetUserSession(phoneNumber);
  }

  // Simulate receiving a message (for testing)
  simulateMessage(phoneNumber: string, message: string): void {
    this.handleMessage(phoneNumber, message);
  }

  getConnectionStatus(): boolean {
    return this.isConnected;
  }
}

export const whatsAppBot = new WhatsAppBot();
