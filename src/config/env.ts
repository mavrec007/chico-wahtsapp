
// Environment configuration
export const env = {
  // Telegram configuration
  TELEGRAM_BOT_TOKEN: import.meta.env.VITE_TELEGRAM_BOT_TOKEN || '',
  TELEGRAM_CHAT_ID: import.meta.env.VITE_TELEGRAM_CHAT_ID || '',
  
  // WhatsApp configuration
  WHATSAPP_SESSION_ID: import.meta.env.VITE_WHATSAPP_SESSION_ID || 'sports_hub_session',
  WHATSAPP_WEBHOOK_URL: import.meta.env.VITE_WHATSAPP_WEBHOOK_URL || '',
  
  // Database configuration
  DATABASE_URL: import.meta.env.VITE_DATABASE_URL || '',
  
  // JWT configuration
  JWT_SECRET: import.meta.env.VITE_JWT_SECRET || 'default_secret_key',
  
  // App configuration
  APP_NAME: 'Sports Hub',
  APP_VERSION: '1.0.0',
  
  // API configuration
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
};

// Validation function
export const validateEnv = () => {
  const warnings: string[] = [];
  
  if (!env.TELEGRAM_BOT_TOKEN) {
    warnings.push('TELEGRAM_BOT_TOKEN is not set');
  }
  
  if (!env.TELEGRAM_CHAT_ID) {
    warnings.push('TELEGRAM_CHAT_ID is not set');
  }
  
  if (!env.DATABASE_URL) {
    warnings.push('DATABASE_URL is not set');
  }
  
  if (warnings.length > 0) {
    console.warn('Environment warnings:', warnings);
  }
  
  return warnings.length === 0;
};

// Initialize environment validation
validateEnv();
