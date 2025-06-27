
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import enTranslations from '@/translations/en.json';
import arTranslations from '@/translations/ar.json';

const resources = {
  en: {
    translation: enTranslations
  },
  ar: {
    translation: arTranslations
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
    },

    // Add namespace support
    defaultNS: 'translation',
    ns: ['translation'],

    // Debug mode for development
    debug: false,

    // Key separator
    keySeparator: '.',
    
    // Nested separator
    nsSeparator: ':'
  });

export default i18n;
