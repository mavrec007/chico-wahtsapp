import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import sportsAr from '@/translations/sports-ar.json';
import departmentsAr from '@/translations/departments-ar.json';

const resources = {
  en: {
    translation: {
      // Navigation
      navigation: {
        main: 'Main Navigation',
        mainNavigation: 'Main Navigation',
        closeSidebar: 'Close Sidebar'
      },
      
      // App info
      app: {
        name: 'Sports Center',
        version: 'Version'
      },

      // Dashboard
      dashboard: {
        title: 'Dashboard',
        goodMorning: 'Good Morning',
        goodAfternoon: 'Good Afternoon', 
        goodEvening: 'Good Evening',
        analyticsTitle: 'Welcome to Analytics',
        analyticsSubtitle: 'Here is your sports center overview',
        filter: 'Filter',
        exportReport: 'Export Report',
        
        // Stats
        monthlyBookingsTrend: 'Monthly Bookings Trend',
        bookingVolumeDesc: 'Booking volume over the past 6 months',
        revenueVsTarget: 'Revenue vs Target',
        revenuePerformanceDesc: 'Revenue performance against targets',
        activityDistribution: 'Activity Distribution',
        bookingDistributionDesc: 'Distribution of bookings by activity type',
        weeklyUsagePattern: 'Weekly Usage Pattern',
        usagePatternDesc: 'Usage patterns throughout the week'
      },

      // Common terms
      common: {
        save: 'Save',
        cancel: 'Cancel',
        edit: 'Edit',
        delete: 'Delete',
        search: 'Search',
        add: 'Add',
        remove: 'Remove',
        loading: 'Loading...',
        saving: 'Saving...',
        success: 'Success',
        error: 'Error',
        warning: 'Warning',
        info: 'Information',
        confirm: 'Confirm',
        yes: 'Yes',
        no: 'No',
        ok: 'OK',
        back: 'Back',
        next: 'Next',
        previous: 'Previous',
        submit: 'Submit',
        reset: 'Reset',
        clear: 'Clear',
        close: 'Close',
        open: 'Open',
        show: 'Show',
        hide: 'Hide',
        expand: 'Expand',
        collapse: 'Collapse',
        select: 'Select',
        deselect: 'Deselect',
        all: 'All',
        none: 'None',
        other: 'Other',
        unknown: 'Unknown',
        notAvailable: 'Not Available',
        notApplicable: 'Not Applicable',
        todayBookings: 'Today\'s Bookings',
        activeTrainers: 'Active Trainers',
        revenue: 'Revenue',
        viewDetails: 'View Details',
        fromLastMonth: 'from last month',
        comingSoon: 'Coming Soon'
      },

      // Sports
      sports: sportsAr,

      // Departments 
      ...departmentsAr,

      // Forms
      forms: {
        required: 'This field is required',
        invalidEmail: 'Invalid email address',
        invalidPhone: 'Invalid phone number',
        minLength: 'Minimum length is {{min}} characters',
        maxLength: 'Maximum length is {{max}} characters'
      },

      // Activities
      swimming: 'Swimming',
      football: 'Football',
      basketball: 'Basketball',
      tennis: 'Tennis',
      
      // Bookings
      bookings: 'Bookings',
      booking: 'Booking',
      newBooking: 'New Booking',
      editBooking: 'Edit Booking',
      
      // Users and roles
      users: 'Users',
      clients: 'Clients',
      coaches: 'Coaches',
      players: 'Players',
      roles: 'Roles',
      
      // Settings
      settings: 'Settings',
      
      // Other
      activities: 'Activities',
      reports: 'Reports',
      payments: 'Payments',
      fields: 'Fields'
    }
  },
  ar: {
    translation: {
      // Navigation
      navigation: {
        main: 'التنقل الرئيسي',
        mainNavigation: 'التنقل الرئيسي',
        closeSidebar: 'إغلاق الشريط الجانبي'
      },
      
      // App info
      app: {
        name: 'المركز الرياضي',
        version: 'الإصدار'
      },

      // Dashboard
      dashboard: {
        title: 'لوحة التحكم',
        goodMorning: 'صباح الخير',
        goodAfternoon: 'مساء الخير',
        goodEvening: 'مساء الخير',
        analyticsTitle: 'مرحباً بك في التحليلات',
        analyticsSubtitle: 'هنا نظرة عامة على مركزك الرياضي',
        filter: 'تصفية',
        exportReport: 'تصدير التقرير',
        
        // Stats
        monthlyBookingsTrend: 'اتجاه الحجوزات الشهرية',
        bookingVolumeDesc: 'حجم الحجوزات خلال الأشهر الستة الماضية',
        revenueVsTarget: 'الإيرادات مقابل الهدف',
        revenuePerformanceDesc: 'أداء الإيرادات مقابل الأهداف',
        activityDistribution: 'توزيع الأنشطة',
        bookingDistributionDesc: 'توزيع الحجوزات حسب نوع النشاط',
        weeklyUsagePattern: 'نمط الاستخدام الأسبوعي',
        usagePatternDesc: 'أنماط الاستخدام خلال الأسبوع'
      },

      // Common terms
      common: {
        save: 'حفظ',
        cancel: 'إلغاء',
        edit: 'تحرير',
        delete: 'حذف',
        search: 'بحث',
        add: 'إضافة',
        remove: 'إزالة',
        loading: 'جاري التحميل...',
        saving: 'جاري الحفظ...',
        success: 'نجح',
        error: 'خطأ',
        warning: 'تحذير',
        info: 'معلومات',
        confirm: 'تأكيد',
        yes: 'نعم',
        no: 'لا',
        ok: 'موافق',
        back: 'رجوع',
        next: 'التالي',
        previous: 'السابق',
        submit: 'إرسال',
        reset: 'إعادة تعيين',
        clear: 'مسح',
        close: 'إغلاق',
        open: 'فتح',
        show: 'عرض',
        hide: 'إخفاء',
        expand: 'توسيع',
        collapse: 'طي',
        select: 'اختيار',
        deselect: 'إلغاء الاختيار',
        all: 'الكل',
        none: 'لا شيء',
        other: 'أخرى',
        unknown: 'غير معروف',
        notAvailable: 'غير متاح',
        notApplicable: 'غير قابل للتطبيق',
        todayBookings: 'حجوزات اليوم',
        activeTrainers: 'المدربين النشطين',
        revenue: 'الإيرادات',
        viewDetails: 'عرض التفاصيل',
        fromLastMonth: 'من الشهر الماضي',
        comingSoon: 'قريباً'
      },

      // Sports
      sports: sportsAr,

      // Departments
      ...departmentsAr,

      // Forms
      forms: {
        required: 'هذا الحقل مطلوب',
        invalidEmail: 'عنوان بريد إلكتروني غير صحيح',
        invalidPhone: 'رقم هاتف غير صحيح',
        minLength: 'الحد الأدنى للطول هو {{min}} أحرف',
        maxLength: 'الحد الأقصى للطول هو {{max}} أحرف'
      },

      // Activities
      swimming: 'السباحة',
      football: 'كرة القدم',
      basketball: 'كرة السلة',
      tennis: 'التنس',
      
      // Bookings
      bookings: 'الحجوزات',
      booking: 'حجز',
      newBooking: 'حجز جديد',
      editBooking: 'تعديل الحجز',
      
      // Users and roles
      users: 'المستخدمين',
      clients: 'العملاء',
      coaches: 'المدربين',
      players: 'اللاعبين',
      roles: 'الأدوار',
      
      // Settings
      settings: 'الإعدادات',
      
      // Other
      activities: 'الأنشطة',
      reports: 'التقارير',
      payments: 'المدفوعات',
      fields: 'الملاعب'
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ar', // default language
    fallbackLng: 'en',
    
    interpolation: {
      escapeValue: false
    },
    
    react: {
      useSuspense: false
    }
  });

export default i18n;
