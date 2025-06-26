
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import all translation files
import enTranslations from '@/translations/en.json';
import arTranslations from '@/translations/ar.json';
import sportsAr from '@/translations/sports-ar.json';

const resources = {
  en: {
    translation: {
      ...enTranslations,
      // App info
      'app.name': 'Sports Hub',
      'app.tagline': 'Sports Management System',
      'app.version': 'Version',
      
      // Navigation groups
      'navigation.main': 'Main',
      'navigation.activities': 'Activities',
      'navigation.management': 'Management', 
      'navigation.system': 'System',
      'navigation.mainNavigation': 'Main Navigation',
      'navigation.closeSidebar': 'Close Sidebar',
      'navigation.openSidebar': 'Open Sidebar',
      
      // Navigation items
      dashboard: "Dashboard",
      bookings: "Bookings",
      activities: "Activities",
      users: "Users",
      roles: "Roles",
      reports: "Reports",
      settings: "Settings",
      clients: "Clients",
      coaches: "Coaches",
      players: "Players",
      facilities: "Facilities",
      payments: "Payments",
      'coach-assignments': "Coach Assignments",
      'sports-overview': "Sports Overview",
      
      // Actions
      login: "Login",
      register: "Register",
      logout: "Logout",
      save: "Save",
      saving: "Saving...",
      cancel: "Cancel",
      edit: "Edit",
      delete: "Delete",
      search: "Search",
      filter: "Filter",
      add: "Add",
      create: "Create",
      update: "Update",
      confirm: "Confirm",
      actions: "Actions",
      selected: "Selected",
      
      // Common
      welcome: "Welcome",
      loading: "Loading...",
      error: "Error occurred",
      success: "Success",
      name: "Name",
      email: "Email",
      phone: "Phone",
      address: "Address",
      notes: "Notes",
      status: "Status",
      created_at: "Created At",
      updated_at: "Updated At",
      
      // Theme
      lightMode: "Light Mode",
      darkMode: "Dark Mode",
      language: "Language",

      // Sports specific
      'sport_performance': 'Sport Performance',
      'revenue_analysis': 'Revenue Analysis',
      'booking_trends': 'Booking Trends',
      'facility_utilization': 'Facility Utilization',
      'financial_summary': 'Financial Summary',
      'monthly_report': 'Monthly Report',
      'export_data': 'Export Data',
      'facilities': 'facilities'
    }
  },
  ar: {
    translation: {
      ...arTranslations,
      ...sportsAr,
      // App info
      'app.name': 'سبورتس هَب',
      'app.tagline': 'نظام إدارة المرافق الرياضية',
      'app.version': 'الإصدار',
      
      // Navigation groups
      'navigation.main': 'الرئيسية',
      'navigation.activities': 'الأنشطة',
      'navigation.management': 'الإدارة',
      'navigation.system': 'النظام',
      'navigation.mainNavigation': 'التنقل الرئيسي',
      'navigation.closeSidebar': 'إغلاق الشريط الجانبي',
      'navigation.openSidebar': 'فتح الشريط الجانبي',
      
      // Navigation items
      dashboard: "لوحة التحكم",
      bookings: "الحجوزات",
      activities: "الأنشطة",
      users: "المستخدمين",
      roles: "الأدوار",
      reports: "التقارير",
      settings: "الإعدادات",
      clients: "العملاء",
      coaches: "المدربين",
      players: "اللاعبين",
      facilities: "المرافق",
      payments: "المدفوعات",
      'coach-assignments': "تعيين المدربين",
      'sports-overview': "نظرة عامة على الرياضات",
      
      // Actions
      login: "تسجيل الدخول",
      register: "إنشاء حساب",
      logout: "تسجيل الخروج",
      save: "حفظ",
      saving: "جاري الحفظ...",
      cancel: "إلغاء",
      edit: "تعديل",
      delete: "حذف",
      search: "بحث",
      filter: "تصفية",
      add: "إضافة",
      create: "إنشاء",
      update: "تحديث",
      confirm: "تأكيد",
      actions: "الإجراءات",
      selected: "محدد",
      
      // Common
      welcome: "مرحباً",
      loading: "جاري التحميل...",
      error: "حدث خطأ",
      success: "نجح",
      name: "الاسم",
      email: "البريد الإلكتروني",
      phone: "الهاتف",
      address: "العنوان",
      notes: "ملاحظات",
      status: "الحالة",
      created_at: "تاريخ الإنشاء",
      updated_at: "تاريخ التحديث",
      
      // Theme
      lightMode: "الوضع الفاتح",
      darkMode: "الوضع المظلم",
      language: "اللغة",

      // Sports specific
      'sport_performance': 'أداء الرياضة',
      'revenue_analysis': 'تحليل الإيرادات',
      'booking_trends': 'اتجاهات الحجز',
      'facility_utilization': 'استخدام المرافق',
      'financial_summary': 'الملخص المالي',
      'monthly_report': 'التقرير الشهري',
      'export_data': 'تصدير البيانات',
      'facilities': 'مرافق'
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'ar',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
