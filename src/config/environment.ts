
export const config = {
  telegram: {
    token: "7505840691:AAEnFtALF8qkZg06b19oC1kMzar-JeZ5Igo",
    chatId: "7353387739",
  },
  database: {
    connection: "mysql",
    host: "127.0.0.1",
    port: 3306,
    database: "appointment_bot",
    username: "askar",
    password: "Askar1984",
  },
  whatsapp: {
    sessionPath: "./whatsapp-session",
  },
  bot: {
    name: "Sports Booking Bot",
    version: "1.0.0",
  }
};

export const activities = {
  courts: {
    name: "ملاعب",
    types: [
      {
        id: "football",
        name: "ملعب كرة قدم",
        pricePerHour: 200,
        availableHours: ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00"]
      },
      {
        id: "basketball",
        name: "ملعب كرة سلة",
        pricePerHour: 150,
        availableHours: ["09:00", "11:00", "13:00", "15:00", "17:00", "19:00"]
      },
      {
        id: "tennis",
        name: "ملعب تنس",
        pricePerHour: 100,
        availableHours: ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00"]
      }
    ]
  },
  swimming: {
    name: "حمام سباحة",
    types: [
      {
        id: "free-time",
        name: "فترة حرة",
        pricePerHour: 50,
        availableHours: ["10:00", "12:00", "14:00", "16:00", "18:00"]
      },
      {
        id: "private",
        name: "برايفت",
        pricePerHour: 150,
        availableHours: ["09:00", "11:00", "13:00", "15:00", "17:00", "19:00", "21:00"]
      }
    ]
  }
};

export const messages = {
  welcome: "مرحباً بك في نظام حجز الأنشطة الرياضية! 🏃‍♂️\n\nأي قطاع تريد الحجز فيه؟\n\n1️⃣ ملاعب 🏟️\n2️⃣ حمام سباحة 🏊‍♂️\n\nيرجى الرد برقم الخيار المطلوب",
  courtsMenu: "اختر نوع الملعب المطلوب:\n\n1️⃣ ملعب كرة قدم - 200 ريال/ساعة ⚽\n2️⃣ ملعب كرة سلة - 150 ريال/ساعة 🏀\n3️⃣ ملعب تنس - 100 ريال/ساعة 🎾\n\nيرجى الرد برقم الخيار المطلوب",
  swimmingMenu: "اختر نوع السباحة:\n\n1️⃣ فترة حرة - 50 ريال/ساعة 🏊‍♀️\n2️⃣ برايفت - 150 ريال/ساعة 🏊‍♂️\n\nيرجى الرد برقم الخيار المطلوب",
  requestPhone: "يرجى إدخال رقم هاتفك لتأكيد الحجز:\n\nمثال: 966512345678",
  paymentInstructions: "تم تسجيل حجزك بنجاح! 🎉\n\nيرجى تحويل المبلغ المطلوب وإرسال رقم العملية:\n\nرقم الحساب: 1234567890\nاسم البنك: البنك الأهلي\n\nسيتم تأكيد حجزك خلال دقائق",
  confirmationPending: "تم استلام طلب الحجز وجاري المراجعة... ⏳\n\nسنرسل لك رسالة تأكيد قريباً",
  bookingConfirmed: "تم تأكيد حجزك بنجاح! ✅\n\nتفاصيل الحجز:\n📅 التاريخ: {date}\n⏰ الوقت: {time}\n🏟️ النوع: {type}\n💰 المبلغ: {price} ريال\n\nشكراً لاختيارك خدماتنا",
  bookingCancelled: "نأسف، تم إلغاء حجزك ❌\n\nيرجى المحاولة مرة أخرى أو التواصل مع الدعم",
  invalidOption: "خيار غير صحيح. يرجى اختيار رقم صحيح من القائمة",
  error: "حدث خطأ. يرجى المحاولة مرة أخرى أو التواصل مع الدعم"
};
