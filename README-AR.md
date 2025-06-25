
# 🏆 سبورتس هَب - نظام إدارة المرافق الرياضية المتقدم

[![React](https://img.shields.io/badge/React-18.0+-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-Latest-646CFF.svg)](https://vitejs.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-Ready-green.svg)](https://supabase.io/)

> **منصة ثورية لإدارة المرافق الرياضية** – حيث تلتقي التكنولوجيا بالتفوّق الرياضي

---

## 🌟 نظرة عامة على النظام

**سبورتس هَب** هو نظام إدارة شامل للمرافق الرياضية يوفر حلولاً متكاملة لإدارة الحجوزات، العملاء، المدفوعات، والمرافق. النظام مصمم خصيصاً للبيئة العربية مع دعم كامل للغة العربية واتجاه النص من اليمين لليسار (RTL).

### 🎯 **الهدف الأساسي**
تمكين أصحاب المرافق الرياضية من إدارة عملياتهم بكفاءة عالية وتوفير تجربة استثنائية للعملاء من خلال:
- أتمتة عمليات الحجز والدفع
- إدارة ذكية للمرافق والأنشطة
- نظام تقارير وتحليلات شامل
- واجهة سهلة الاستخدام ومتجاوبة

---

## 🏗️ **هيكلية النظام التقنية**

### **التقنيات الأساسية**
```
📱 الواجهة الأمامية:    React 18 + TypeScript
⚡ نظام البناء:        Vite (منفذ 8080)
🎨 التصميم:            Tailwind CSS + Shadcn/UI
🎬 الحركات:            Framer Motion
🗄️ إدارة الحالة:       Zustand
🔗 الخدمات الخلفية:    Supabase
💾 قاعدة البيانات:      PostgreSQL
🔐 المصادقة:           JWT + Row Level Security
🌐 الترجمة:            React-i18next
```

### **بنية المجلدات**
```
src/
├── components/          # مكونات واجهة المستخدم
│   ├── auth/           # مكونات المصادقة
│   ├── bookings/       # مكونات إدارة الحجوزات
│   ├── facilities/     # مكونات إدارة المرافق
│   ├── forms/          # نماذج الإدخال
│   ├── layout/         # مكونات التخطيط
│   └── ui/             # مكونات أساسية (Shadcn/UI)
├── pages/              # صفحات التطبيق
│   ├── admin/          # صفحات الإدارة
│   ├── bookings/       # صفحات الحجوزات
│   ├── clients/        # صفحات العملاء
│   └── swimming/       # صفحات أنشطة السباحة
├── services/           # خدمات API
│   ├── auth.ts         # خدمات المصادقة
│   ├── bookings.ts     # خدمات الحجوزات
│   ├── clients.ts      # خدمات العملاء
│   ├── facilities.ts   # خدمات المرافق
│   └── payments.ts     # خدمات المدفوعات
├── stores/             # إدارة الحالة العامة
├── translations/       # ملفات الترجمة
└── database/           # إعدادات قاعدة البيانات
```

---

## 🚀 **الميزات الأساسية**

### 1. 🏊‍♂️ **إدارة مرافق السباحة**
- **الحجوزات الخاصة**: جلسات تدريب فردية مع مدربين
- **الأوقات الحرة**: سباحة مفتوحة للجمهور
- **البرامج المدرسية**: شراكات مع المؤسسات التعليمية
- **إدارة السعة**: متابعة التوفر في الزمن الحقيقي

**المكونات الرئيسية:**
```typescript
// مكونات السباحة
src/pages/swimming/
├── PrivateBookings.tsx     # الحجوزات الخاصة
├── FreeTimeBookings.tsx    # الأوقات الحرة
├── SchoolsBookings.tsx     # برامج المدارس
└── SwimmingTabs.tsx        # واجهة التبويبات

// خدمات السباحة
src/services/facilities.ts
├── getSwimmingActivities() # جلب الأنشطة
├── createSwimmingActivity() # إنشاء نشاط جديد
├── updateSwimmingActivity() # تحديث النشاط
└── deleteSwimmingActivity() # حذف النشاط
```

### 2. ⚽ **إدارة الملاعب الرياضية**
- **ملاعب كرة القدم**: ملاعب كاملة ومناطق تدريب
- **ملاعب كرة السلة**: داخلية وخارجية
- **ملاعب التنس**: احترافية وترفيهية
- **ملاعب متعددة الرياضات**: مرونة في الاستخدام

**خدمات الملاعب:**
```typescript
// في src/services/facilities.ts
export const facilitiesService = {
  // إدارة أنشطة الملاعب
  getFieldActivities(): Promise<FieldActivity[]>
  createFieldActivity(activity): Promise<FieldActivity>
  updateFieldActivity(id, updates): Promise<FieldActivity>
  deleteFieldActivity(id): Promise<void>
}
```

### 3. 📅 **نظام الحجوزات المتقدم**
- **دورة حياة كاملة للحجز**: من الطلب إلى الإنجاز
- **حالات متعددة**: في الانتظار، مؤكد، مكتمل، ملغي
- **إدارة المدفوعات**: عربون ودفع نهائي
- **تقويم تفاعلي**: عرض بصري للحجوزات

**واجهة خدمة الحجوزات:**
```typescript
// في src/services/bookings.ts
export interface Booking {
  id: string;
  client_id: string;
  activity_id: number;
  activity_type: 'swimming' | 'field';
  start_time: string;
  end_time: string;
  duration: number;
  total_price: number;
  deposit_amount: number;
  remaining_amount: number;
  status: 'pending' | 'deposit_paid' | 'confirmed' | 'completed' | 'cancelled';
}

export const bookingsService = {
  getBookings(): Promise<Booking[]>
  createBooking(booking): Promise<Booking>
  updateBookingStatus(id, status): Promise<Booking>
  getBookingsByDateRange(start, end): Promise<Booking[]>
}
```

### 4. 👥 **إدارة العملاء**
- **ملفات شخصية شاملة**: بيانات كاملة ومنظمة
- **سجل الحجوزات**: تتبع تاريخ العميل
- **معلومات الطوارئ**: جهات اتصال للحالات الطارئة
- **بحث متقدم**: فلترة وبحث سريع

**نموذج بيانات العميل:**
```typescript
// في src/services/clients.ts
export interface Client {
  id: string;
  full_name: string;
  phone_number: string | null;
  national_id: string | null;
  email: string | null;
  created_at: string;
  updated_at: string;
}

export const clientsService = {
  getClients(): Promise<Client[]>
  createClient(client): Promise<Client>
  updateClient(id, updates): Promise<Client>
  searchClients(query): Promise<Client[]>
}
```

### 5. 💳 **إدارة المدفوعات**
- **أنواع الدفع المتعددة**: نقد، تحويل بنكي، بطاقة، أخرى
- **نظام العربون**: دفعة أولى وباقي المبلغ
- **تتبع التأكيدات**: من قام بالتأكيد ومتى
- **المراجع والملاحظات**: تفاصيل إضافية للمدفوعات

**نظام المدفوعات:**
```typescript
// في src/services/payments.ts
export interface Payment {
  id: string;
  booking_id: string;
  amount: number;
  payment_type: 'deposit' | 'final' | 'full';
  method: 'cash' | 'bank_transfer' | 'card' | 'other';
  confirmed: boolean;
  confirmed_by: string | null;
  confirmed_at: string | null;
}

export const paymentsService = {
  getPayments(): Promise<Payment[]>
  createPayment(payment): Promise<Payment>
  confirmPayment(id, confirmedBy): Promise<Payment>
  getPaymentsByBooking(bookingId): Promise<Payment[]>
}
```

---

## 🎨 **واجهة المستخدم والتجربة**

### **التصميم المتجاوب**
- **Mobile First**: مصمم أولاً للأجهزة المحمولة
- **Desktop Enhanced**: محسن للشاشات الكبيرة
- **Tablet Optimized**: تجربة مثالية للتابلت

### **الدعم متعدد اللغات**
```typescript
// في src/lib/i18n.ts
const resources = {
  ar: {
    translation: {
      dashboard: "لوحة التحكم",
      bookings: "الحجوزات",
      clients: "العملاء",
      swimming: "السباحة",
      // ... المزيد من الترجمات
    }
  },
  en: {
    translation: {
      dashboard: "Dashboard",
      bookings: "Bookings",
      clients: "Clients",
      swimming: "Swimming",
      // ... more translations
    }
  }
};
```

### **الشريط الجانبي الذكي**
```typescript
// في src/components/layout/modernSidebar/sidebarConfig.ts
export const sidebarConfig = {
  groups: [
    {
      label: 'navigation.main',
      items: [
        { href: '/dashboard', label: 'لوحة التحكم', icon: LayoutDashboard },
        { href: '/admin/dashboard', label: 'لوحة التحكم الرئيسية', icon: LayoutDashboard }
      ]
    },
    {
      label: 'إدارة المرافق',
      items: [
        { href: '/admin/facilities', label: 'إدارة المرافق', icon: Building },
        { href: '/activities/swimming', label: 'أنشطة السباحة', icon: Waves },
        { href: '/activities/fields', label: 'أنشطة الملاعب', icon: MapPin }
      ]
    }
    // ... المزيد من المجموعات
  ]
};
```

---

## 🔐 **الأمان وإدارة الصلاحيات**

### **Row Level Security (RLS)**
- **حماية على مستوى الصف**: كل مستخدم يرى بياناته فقط
- **صلاحيات مخصصة**: تحكم دقيق في الوصول
- **مصادقة JWT**: رموز آمنة ومشفرة

### **إدارة أدوار المستخدمين**
```typescript
// في قاعدة البيانات
export type UserRole = 'admin' | 'manager' | 'staff' | 'user';

// في src/stores/useAppStore.ts
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'user';
}
```

---

## 📊 **لوحة التحكم والتحليلات**

### **مؤشرات الأداء الرئيسية**
- **إجمالي الحجوزات**: عدد الحجوزات الكلي
- **الأعضاء النشطون**: المستخدمين الفعالين
- **الإيرادات الشهرية**: الأرباح والمبيعات
- **معدل الإشغال**: كفاءة استخدام المرافق

### **التقارير المرئية**
```typescript
// مكونات التحليلات في لوحة التحكم
├── اتجاه الحجوزات الشهري
├── الإيرادات مقابل الهدف  
├── توزيع الأنشطة
└── نمط الاستخدام الأسبوعي
```

---

## 🛠️ **التطوير والنشر**

### **متطلبات النظام**
```bash
# المتطلبات الأساسية
Node.js >= 18.0.0
npm >= 8.0.0
متصفح حديث (Chrome, Firefox, Safari, Edge)
```

### **التثبيت والإعداد**
```bash
# 1. استنساخ المستودع
git clone <repository-url>
cd sports-hub

# 2. تثبيت التبعيات
npm install

# 3. إعداد متغيرات البيئة
cp .env.example .env
# عدّل ملف .env بإعداداتك

# 4. تشغيل النظام
npm run dev
# سيعمل على المنفذ 8080
```

### **إعداد قاعدة البيانات**
```sql
-- الجداول الأساسية
├── clients              # جدول العملاء
├── swimming_activities  # أنشطة السباحة
├── field_activities     # أنشطة الملاعب
├── bookings            # جدول الحجوزات
├── payments            # جدول المدفوعات
└── profiles            # ملفات المستخدمين
```

### **النشر للإنتاج**
```bash
# بناء للإنتاج
npm run build

# معاينة البناء
npm run preview

# النشر (يعتمد على مقدم الخدمة)
# Vercel, Netlify, أو خادم مخصص
```

---

## 🔄 **التكامل مع الخدمات الخارجية**

### **Supabase Backend**
```typescript
// في src/integrations/supabase/client.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
```

### **إدارة الحالة العامة**
```typescript
// في src/stores/useAppStore.ts
export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      sidebarOpen: true,
      theme: 'light',
      language: 'ar',
      user: null,
      isAuthenticated: false,
      // ... المزيد من الحالات والأعمال
    }),
    {
      name: 'app-store',
      partialize: (state) => ({
        theme: state.theme,
        language: state.language,
      }),
    }
  )
);
```

---

## 📱 **استخدام النظام**

### **للمديرين**
1. **تسجيل الدخول** → الوصول إلى لوحة التحكم الرئيسية
2. **إدارة المرافق** → إضافة وتعديل الأنشطة والأسعار
3. **مراقبة الحجوزات** → متابعة ومراجعة الطلبات
4. **إدارة العملاء** → إضافة عملاء جدد وتحديث البيانات
5. **تتبع المدفوعات** → تأكيد الدفعات ومتابعة الأرصدة

### **للموظفين**
1. **استقبال العملاء** → تسجيل عملاء جدد
2. **إنشاء الحجوزات** → حجز الأنشطة للعملاء
3. **معالجة المدفوعات** → استلام وتأكيد الدفعات
4. **تحديث الحالات** → تغيير حالة الحجوزات

### **للعملاء** (مستقبلاً)
- واجهة عميل لعرض الحجوزات
- تطبيق موبايل للحجز المباشر
- إشعارات واتساب وتيليجرام

---

## 🔧 **الصيانة والدعم**

### **حل المشاكل الشائعة**
```typescript
// مشكلة: أخطاء TypeScript في خدمات Supabase
// الحل: استخدام type assertion مؤقتاً
const { data, error } = await (supabase as any)
  .from('table_name')
  .select('*');
```

### **تحديث الترجمات**
```json
// في src/translations/ar.json
{
  "newFeature": "ميزة جديدة",
  "description": "وصف الميزة"
}

// في src/translations/en.json  
{
  "newFeature": "New Feature",
  "description": "Feature description"
}
```

### **إضافة مكونات جديدة**
```bash
# إنشاء مكون جديد
npx shadcn-ui@latest add [component-name]

# أو إنشاء مكون مخصص
mkdir src/components/new-feature
touch src/components/new-feature/NewComponent.tsx
```

---

## 🚀 **خارطة الطريق المستقبلية**

### **المرحلة القادمة (Q1 2024)**
- [ ] تطبيق الموبايل (React Native)
- [ ] إشعارات الواتساب التلقائية
- [ ] تقارير متقدمة وإحصائيات
- [ ] نظام الولاء والنقاط

### **المرحلة المتوسطة (Q2 2024)**
- [ ] تكامل أجهزة الدفع الإلكتروني
- [ ] جولات افتراضية للمرافق
- [ ] نظام إدارة المخزون
- [ ] تحليلات متقدمة بالذكاء الاصطناعي

### **المرحلة المتقدمة (Q3-Q4 2024)**
- [ ] منصة التجارة الإلكترونية
- [ ] تكامل أجهزة إنترنت الأشياء
- [ ] واقع معزز لتجربة المرافق
- [ ] توسع دولي ودعم عملات متعددة

---

## 🤝 **المساهمة والدعم**

### **للمطورين**
```bash
# Fork المشروع
git fork <repository-url>

# إنشاء فرع جديد
git checkout -b feature/new-feature

# Commit التغييرات
git commit -m "feat: add new feature"

# إرسال Pull Request
```

### **للمؤسسات**
- **الدعم الفني**: 24/7 عبر البريد الإلكتروني والهاتف
- **التدريب**: جلسات تدريبية للفرق
- **التخصيص**: تطوير ميزات حسب الطلب
- **التكامل**: ربط مع الأنظمة الموجودة

---

## 📞 **معلومات التواصل**

### **الدعم التقني**
- 📧 **البريد الإلكتروني**: support@sportshub.com
- 💬 **الدردشة المباشرة**: متوفرة في النظام
- 📱 **واتساب**: +966-XXX-XXXX
- 🌐 **الموقع**: www.sportshub.com

### **المبيعات والشراكات**
- 📧 **البريد الإلكتروني**: sales@sportshub.com
- 📞 **الهاتف**: +966-XXX-XXXX
- 📍 **العنوان**: الرياض، المملكة العربية السعودية

---

## 📄 **الترخيص والحقوق**

هذا المشروع مرخص بموجب رخصة MIT - انظر ملف [LICENSE](LICENSE) للتفاصيل.

**© 2024 سبورتس هَب. جميع الحقوق محفوظة.**

---

## 🏆 **شهادات العملاء**

> *"سبورتس هَب غيّر طريقة إدارتنا للنادي. الآن نستطيع التحكم في كل شيء من مكان واحد."*  
> **أحمد المطيري** - مدير نادي الرياض الرياضي

> *"النظام سهل الاستخدام ودعم العربية ممتاز. العملاء سعداء جداً بسرعة الحجز."*  
> **فاطمة العتيبي** - مديرة مجمع الورود الرياضي

---

**مستقبل إدارة الرياضة هنا. انضم إلى الثورة.**

**سبورتس هَب. حيث يُصنع الأبطال.**
