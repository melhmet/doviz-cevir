export const Config = {
  // API
  EXCHANGE_RATE_API_BASE: 'https://v6.exchangerate-api.com/v6',
  EXCHANGE_RATE_API_KEY: 'YOUR_API_KEY', // Replace with actual key or use proxy
  FREE_CURRENCY_API_BASE: 'https://api.freecurrencyapi.com/v1',
  FREE_CURRENCY_API_KEY: 'YOUR_API_KEY',

  // Cache
  CACHE_TTL_MS: 5 * 60 * 1000, // 5 minutes
  CACHE_KEY_RATES: 'exchange_rates',
  CACHE_KEY_TIMESTAMP: 'exchange_rates_timestamp',

  // App
  APP_NAME: 'DÖVİZÇEVİR',
  APP_VERSION: '1.0.0',
  DEFAULT_FROM_CURRENCY: 'TRY',
  DEFAULT_TO_CURRENCY: 'USD',
  DEFAULT_AMOUNT: '1000',
  DECIMAL_PRECISION: 4,

  // API Timeout
  API_TIMEOUT_MS: 10000,
} as const;
