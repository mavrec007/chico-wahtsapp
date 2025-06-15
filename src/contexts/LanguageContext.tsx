
import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isRTL: boolean;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Header
    'header.quickBookCourt': 'Book Court',
    'header.quickBookSwimming': 'Book Swimming',
    'header.newClient': 'New Client',
    'header.searchPlaceholder': 'Search bookings or clients...',
    'header.notifications': 'Notifications',
    'header.profile': 'Profile',
    'header.settings': 'Settings',
    'header.logout': 'Logout',
    'header.userName': 'Ahmed Mohammed',
    'header.userRole': 'System Admin',

    // Sidebar
    'sidebar.appTitle': 'Booking System',
    'sidebar.appSubtitle': 'Advanced Sports Facility Management',
    'sidebar.mainMenu': 'Main Menu',
    'sidebar.systemAdmin': 'System Administration',
    'sidebar.currentTime': 'Current Time',

    // Navigation
    'nav.home': 'Home',
    'nav.bookings': 'Booking Management',
    'nav.courts': 'Sports Courts',
    'nav.swimming': 'Swimming Pool',
    'nav.accounting': 'Accounts & Payments',
    'nav.clients': 'Client Management',
    'nav.reports': 'Reports & Statistics',
    'nav.users': 'User Management',
    'nav.settings': 'General Settings',

    // Dashboard
    'dashboard.title': 'Sports Booking Dashboard',
    'dashboard.subtitle': 'Manage court and swimming pool bookings with ease',
    'dashboard.totalBookings': 'Total Bookings',
    'dashboard.pendingBookings': 'Pending Bookings',
    'dashboard.confirmedBookings': 'Confirmed Bookings',
    'dashboard.todayRevenue': 'Today\'s Revenue',
    'dashboard.allBookingsDesc': 'All bookings',
    'dashboard.needsApproval': 'Needs approval',
    'dashboard.confirmed': 'Confirmed',
    'dashboard.saudiRiyal': 'Saudi Riyal',
    'dashboard.sportsCourtBookings': 'Sports Court Bookings',
    'dashboard.swimmingPoolBookings': 'Swimming Pool Bookings',

    // Booking Management
    'bookings.allBookings': 'All Bookings',
    'bookings.courts': 'Courts',
    'bookings.swimming': 'Swimming Pool',
    'bookings.pending': 'Pending',
    'bookings.comprehensive': 'Comprehensive view of all court and swimming pool bookings',
    'bookings.sportsCourtManagement': 'Sports Court Booking Management',
    'bookings.courtsDesc': 'Manage football, basketball and tennis court bookings',
    'bookings.swimmingManagement': 'Swimming Pool Booking Management',
    'bookings.swimmingDesc': 'Manage free time and private session bookings',
    'bookings.pendingManagement': 'Pending Bookings',
    'bookings.pendingDesc': 'Bookings that need review and confirmation',

    // Table Headers
    'table.client': 'Client',
    'table.type': 'Type',
    'table.dateTime': 'Date & Time',
    'table.duration': 'Duration',
    'table.price': 'Price',
    'table.status': 'Status',
    'table.actions': 'Actions',
    'table.hours': 'hours',
    'table.riyal': 'Riyal',

    // Status
    'status.pending': 'Pending',
    'status.confirmed': 'Confirmed',
    'status.cancelled': 'Cancelled',

    // Court Types
    'court.football': 'Football Court',
    'court.basketball': 'Basketball Court',
    'court.tennis': 'Tennis Court',

    // Swimming Types
    'swimming.private': 'Private',
    'swimming.freeTime': 'Free Time',

    // Bot Status
    'bot.title': 'Bot Status',
    'bot.subtitle': 'WhatsApp and Telegram bot connection information',
    'bot.whatsapp': 'WhatsApp Bot',
    'bot.whatsappDesc': 'For customer interaction',
    'bot.telegram': 'Telegram Bot',
    'bot.telegramDesc': 'For booking management',
    'bot.connected': 'Connected',

    // Appointment Modal
    'appointment.title': 'New Appointment',
    'appointment.bookingDetails': 'Booking Details',
    'appointment.management': 'Management',
    'appointment.selectActivity': 'Select Activity',
    'appointment.activityType': 'Activity Type',
    'appointment.selectType': 'Select activity type',
    'appointment.courts': 'Sports Courts',
    'appointment.swimming': 'Swimming Pool',
    'appointment.selectSubType': 'Select Court/Pool Type',
    'appointment.subType': 'Type',
    'appointment.selectSpecific': 'Select specific type',
    'appointment.selectDate': 'Select Date',
    'appointment.date': 'Date',
    'appointment.selectTime': 'Select Time',
    'appointment.time': 'Time',
    'appointment.duration': 'Duration (Hours)',
    'appointment.customerInfo': 'Customer Information',
    'appointment.phone': 'Phone Number',
    'appointment.phonePlaceholder': 'Enter phone number',
    'appointment.name': 'Customer Name',
    'appointment.namePlaceholder': 'Enter customer name',
    'appointment.notes': 'Notes',
    'appointment.notesPlaceholder': 'Additional notes...',
    'appointment.priceCalculation': 'Price Calculation',
    'appointment.pricePerHour': 'Price per hour',
    'appointment.totalHours': 'Total hours',
    'appointment.totalAmount': 'Total amount',
    'appointment.cancel': 'Cancel',
    'appointment.createBooking': 'Create Booking',
    'appointment.bookingSuccess': 'Booking created successfully!',
    'appointment.bookingError': 'Error creating booking',
  },
  ar: {
    // Header
    'header.quickBookCourt': 'حجز ملعب',
    'header.quickBookSwimming': 'حجز سباحة',
    'header.newClient': 'عميل جديد',
    'header.searchPlaceholder': 'البحث عن الحجوزات أو العملاء...',
    'header.notifications': 'الإشعارات',
    'header.profile': 'الملف الشخصي',
    'header.settings': 'الإعدادات',
    'header.logout': 'تسجيل الخروج',
    'header.userName': 'أحمد محمد',
    'header.userRole': 'مدير النظام',

    // Sidebar
    'sidebar.appTitle': 'نظام الحجوزات',
    'sidebar.appSubtitle': 'إدارة متقدمة للمرافق الرياضية',
    'sidebar.mainMenu': 'القائمة الرئيسية',
    'sidebar.systemAdmin': 'إدارة النظام',
    'sidebar.currentTime': 'الوقت الحالي',

    // Navigation
    'nav.home': 'الرئيسية',
    'nav.bookings': 'إدارة الحجوزات',
    'nav.courts': 'الملاعب الرياضية',
    'nav.swimming': 'حمام السباحة',
    'nav.accounting': 'الحسابات والمدفوعات',
    'nav.clients': 'إدارة العملاء',
    'nav.reports': 'التقارير والإحصائيات',
    'nav.users': 'إدارة المستخدمين',
    'nav.settings': 'الإعدادات العامة',

    // Dashboard
    'dashboard.title': 'لوحة تحكم الحجوزات الرياضية',
    'dashboard.subtitle': 'إدارة حجوزات الملاعب وحمامات السباحة بكل سهولة',
    'dashboard.totalBookings': 'إجمالي الحجوزات',
    'dashboard.pendingBookings': 'حجوزات معلقة',
    'dashboard.confirmedBookings': 'حجوزات مؤكدة',
    'dashboard.todayRevenue': 'إيرادات اليوم',
    'dashboard.allBookingsDesc': 'جميع الحجوزات',
    'dashboard.needsApproval': 'تحتاج موافقة',
    'dashboard.confirmed': 'تم التأكيد',
    'dashboard.saudiRiyal': 'ريال سعودي',
    'dashboard.sportsCourtBookings': 'حجوزات الملاعب الرياضية',
    'dashboard.swimmingPoolBookings': 'حجوزات حمام السباحة',

    // Booking Management
    'bookings.allBookings': 'جميع الحجوزات',
    'bookings.courts': 'الملاعب',
    'bookings.swimming': 'حمام السباحة',
    'bookings.pending': 'معلقة',
    'bookings.comprehensive': 'عرض شامل لجميع حجوزات الملاعب وحمام السباحة',
    'bookings.sportsCourtManagement': 'إدارة حجوزات الملاعب الرياضية',
    'bookings.courtsDesc': 'إدارة حجوزات ملاعب كرة القدم وكرة السلة والتنس',
    'bookings.swimmingManagement': 'إدارة حجوزات حمام السباحة',
    'bookings.swimmingDesc': 'إدارة حجوزات الفترات الحرة والجلسات الخاصة',
    'bookings.pendingManagement': 'الحجوزات المعلقة',
    'bookings.pendingDesc': 'الحجوزات التي تحتاج لمراجعة وتأكيد',

    // Table Headers
    'table.client': 'العميل',
    'table.type': 'النوع',
    'table.dateTime': 'التاريخ والوقت',
    'table.duration': 'المدة',
    'table.price': 'السعر',
    'table.status': 'الحالة',
    'table.actions': 'الإجراءات',
    'table.hours': 'ساعة',
    'table.riyal': 'ريال',

    // Status
    'status.pending': 'معلق',
    'status.confirmed': 'مؤكد',
    'status.cancelled': 'ملغي',

    // Court Types
    'court.football': 'ملعب كرة قدم',
    'court.basketball': 'ملعب كرة سلة',
    'court.tennis': 'ملعب تنس',

    // Swimming Types
    'swimming.private': 'برايفت',
    'swimming.freeTime': 'فترة حرة',

    // Bot Status
    'bot.title': 'حالة البوتات',
    'bot.subtitle': 'معلومات الاتصال مع بوتات واتساب وتليجرام',
    'bot.whatsapp': 'بوت واتساب',
    'bot.whatsappDesc': 'للتفاعل مع العملاء',
    'bot.telegram': 'بوت تليجرام',
    'bot.telegramDesc': 'لإدارة الحجوزات',
    'bot.connected': 'متصل',

    // Appointment Modal
    'appointment.title': 'حجز جديد',
    'appointment.bookingDetails': 'تفاصيل الحجز',
    'appointment.management': 'الإدارة',
    'appointment.selectActivity': 'اختر النشاط',
    'appointment.activityType': 'نوع النشاط',
    'appointment.selectType': 'اختر نوع النشاط',
    'appointment.courts': 'الملاعب الرياضية',
    'appointment.swimming': 'حمام السباحة',
    'appointment.selectSubType': 'اختر نوع الملعب/المسبح',
    'appointment.subType': 'النوع',
    'appointment.selectSpecific': 'اختر النوع المحدد',
    'appointment.selectDate': 'اختر التاريخ',
    'appointment.date': 'التاريخ',
    'appointment.selectTime': 'اختر الوقت',
    'appointment.time': 'الوقت',
    'appointment.duration': 'المدة (ساعات)',
    'appointment.customerInfo': 'معلومات العميل',
    'appointment.phone': 'رقم الهاتف',
    'appointment.phonePlaceholder': 'أدخل رقم الهاتف',
    'appointment.name': 'اسم العميل',
    'appointment.namePlaceholder': 'أدخل اسم العميل',
    'appointment.notes': 'ملاحظات',
    'appointment.notesPlaceholder': 'ملاحظات إضافية...',
    'appointment.priceCalculation': 'حساب السعر',
    'appointment.pricePerHour': 'السعر في الساعة',
    'appointment.totalHours': 'إجمالي الساعات',
    'appointment.totalAmount': 'المبلغ الإجمالي',
    'appointment.cancel': 'إلغاء',
    'appointment.createBooking': 'إنشاء حجز',
    'appointment.bookingSuccess': 'تم إنشاء الحجز بنجاح!',
    'appointment.bookingError': 'خطأ في إنشاء الحجز',
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('ar');
  const isRTL = language === 'ar';

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language, isRTL]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isRTL, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
