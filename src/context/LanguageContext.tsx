
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  isRTL: boolean;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Simple translation object
const translations: Record<string, Record<string, string>> = {
  en: {
    // Style Panel
    'stylePanel.title': 'Style Panel',
    'stylePanel.description': 'Customize the appearance of your application',
    'stylePanel.theme': 'Theme',
    'stylePanel.colors': 'Colors',
    'stylePanel.sidebar': 'Sidebar',
    'stylePanel.layout': 'Layout',
    'stylePanel.themeMode': 'Theme Mode',
    'stylePanel.themeModeDesc': 'Select your preferred theme mode',
    'stylePanel.light': 'Light',
    'stylePanel.dark': 'Dark',
    'stylePanel.system': 'System',
    'stylePanel.colorScheme': 'Color Scheme',
    'stylePanel.colorSchemeDesc': 'Choose your primary color scheme',
    'stylePanel.sidebarStyle': 'Sidebar Style',
    'stylePanel.sidebarStyleDesc': 'Choose your sidebar appearance',
    'stylePanel.headerStyle': 'Header Style',
    'stylePanel.headerStyleDesc': 'Choose your header appearance',
    'stylePanel.layoutOptions': 'Layout Options',
    'stylePanel.compactMode': 'Compact Mode',
    'stylePanel.compactModeDesc': 'Reduce spacing for more content',
    'stylePanel.animations': 'Animations',
    'stylePanel.animationsDesc': 'Enable smooth transitions',
    'stylePanel.blurEffects': 'Blur Effects',
    'stylePanel.blurEffectsDesc': 'Enable background blur effects',
    'stylePanel.resetToDefault': 'Reset to Default',
  },
  ar: {
    // Style Panel
    'stylePanel.title': 'لوحة التحكم بالشكل',
    'stylePanel.description': 'تخصيص مظهر التطبيق الخاص بك',
    'stylePanel.theme': 'السمة',
    'stylePanel.colors': 'الألوان',
    'stylePanel.sidebar': 'الشريط الجانبي',
    'stylePanel.layout': 'التخطيط',
    'stylePanel.themeMode': 'نمط السمة',
    'stylePanel.themeModeDesc': 'اختر نمط السمة المفضل لديك',
    'stylePanel.light': 'فاتح',
    'stylePanel.dark': 'داكن',
    'stylePanel.system': 'النظام',
    'stylePanel.colorScheme': 'نظام الألوان',
    'stylePanel.colorSchemeDesc': 'اختر نظام الألوان الأساسي',
    'stylePanel.sidebarStyle': 'نمط الشريط الجانبي',
    'stylePanel.sidebarStyleDesc': 'اختر مظهر الشريط الجانبي',
    'stylePanel.headerStyle': 'نمط الرأس',
    'stylePanel.headerStyleDesc': 'اختر مظهر الرأس',
    'stylePanel.layoutOptions': 'خيارات التخطيط',
    'stylePanel.compactMode': 'النمط المضغوط',
    'stylePanel.compactModeDesc': 'تقليل المسافات لمحتوى أكثر',
    'stylePanel.animations': 'الرسوم المتحركة',
    'stylePanel.animationsDesc': 'تفعيل الانتقالات السلسة',
    'stylePanel.blurEffects': 'تأثيرات الضبابية',
    'stylePanel.blurEffectsDesc': 'تفعيل تأثيرات ضبابية الخلفية',
    'stylePanel.resetToDefault': 'إعادة تعيين للافتراضي',
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState('ar');
  const isRTL = language === 'ar';

  const t = (key: string): string => {
    return translations[language]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isRTL, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
