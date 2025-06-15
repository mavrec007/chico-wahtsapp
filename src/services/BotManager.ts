
import { whatsAppBot } from './WhatsAppBot';
import { telegramBot } from './TelegramBot';
import { bookingService } from './BookingService';

class BotManager {
  private isInitialized = false;

  async initialize(): Promise<void> {
    if (this.isInitialized) {
      console.log('⚠️  Bot Manager already initialized');
      return;
    }

    console.log('🚀 Initializing Sports Booking Bot System...');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    try {
      // Initialize services
      console.log('📋 Initializing Booking Service...');
      
      // Connect WhatsApp Bot
      console.log('📱 Initializing WhatsApp Bot...');
      await whatsAppBot.connect();
      
      // Connect Telegram Bot
      console.log('📲 Initializing Telegram Bot...');
      await telegramBot.connect();

      this.isInitialized = true;
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('🎉 Sports Booking Bot System initialized successfully!');
      console.log('');
      console.log('📱 WhatsApp Bot: Ready to receive customer messages');
      console.log('📲 Telegram Bot: Ready to manage bookings');
      console.log('📋 Booking Service: Ready to process reservations');
      console.log('');
      console.log('💡 Test the system with demo commands:');
      console.log('   • WhatsApp: botManager.simulateCustomerMessage("+966512345678", "1")');
      console.log('   • Telegram: botManager.simulateAdminCommand("/stats")');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

      // Start demo scenario
      setTimeout(() => {
        this.runDemoScenario();
      }, 3000);

    } catch (error) {
      console.error('❌ Failed to initialize bot system:', error);
      throw error;
    }
  }

  // Get system status
  getSystemStatus() {
    return {
      initialized: this.isInitialized,
      whatsAppConnected: whatsAppBot.getConnectionStatus(),
      telegramConnected: telegramBot.getConnectionStatus(),
      bookingStats: bookingService.getStats()
    };
  }

  // Simulate customer message (for testing)
  simulateCustomerMessage(phoneNumber: string, message: string): void {
    console.log(`\n🧪 DEMO: Simulating customer message...`);
    whatsAppBot.simulateMessage(phoneNumber, message);
  }

  // Simulate admin command (for testing)
  simulateAdminCommand(command: string): void {
    console.log(`\n🧪 DEMO: Simulating admin command...`);
    telegramBot.simulateCommand(command);
  }

  // Run demo scenario
  private async runDemoScenario(): Promise<void> {
    console.log('🧪 Starting demo scenario...\n');

    // Simulate customer interaction
    setTimeout(() => {
      console.log('👤 Demo: Customer starts conversation...');
      this.simulateCustomerMessage('+966512345678', 'مرحبا');
    }, 1000);

    setTimeout(() => {
      console.log('👤 Demo: Customer selects courts...');
      this.simulateCustomerMessage('+966512345678', '1');
    }, 3000);

    setTimeout(() => {
      console.log('👤 Demo: Customer selects football court...');
      this.simulateCustomerMessage('+966512345678', '1');
    }, 5000);

    setTimeout(() => {
      console.log('👤 Demo: Customer selects time...');
      this.simulateCustomerMessage('+966512345678', '10:00');
    }, 7000);

    setTimeout(() => {
      console.log('👤 Demo: Customer provides phone number...');
      this.simulateCustomerMessage('+966512345678', '966512345678');
    }, 9000);

    setTimeout(() => {
      console.log('👤 Demo: Customer sends payment reference...');
      this.simulateCustomerMessage('+966512345678', 'PAY123456789');
    }, 11000);

    // Simulate admin actions
    setTimeout(() => {
      console.log('👨‍💼 Demo: Admin checks stats...');
      this.simulateAdminCommand('/stats');
    }, 13000);

    setTimeout(() => {
      console.log('👨‍💼 Demo: Admin checks pending bookings...');
      this.simulateAdminCommand('/pending');
    }, 15000);

    setTimeout(() => {
      console.log('👨‍💼 Demo: Admin confirms booking...');
      // Get the first pending booking ID
      const pendingBookings = bookingService.getPendingBookings();
      if (pendingBookings.length > 0) {
        this.simulateAdminCommand(`/confirm ${pendingBookings[0].id}`);
      }
    }, 17000);

    setTimeout(() => {
      console.log('\n🎉 Demo scenario completed!');
      console.log('💡 The system is now ready for real use.');
    }, 20000);
  }

  // Shutdown system
  async shutdown(): Promise<void> {
    console.log('⏹️  Shutting down bot system...');
    this.isInitialized = false;
    console.log('✅ Bot system shut down successfully');
  }
}

export const botManager = new BotManager();
