import axios from 'axios';
import { Config } from '@/constants/config';

export const exchangeRateApi = axios.create({
  baseURL: Config.EXCHANGE_RATE_API_BASE,
  timeout: Config.API_TIMEOUT_MS,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const freeCurrencyApi = axios.create({
  baseURL: Config.FREE_CURRENCY_API_BASE,
  timeout: Config.API_TIMEOUT_MS,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for error logging
exchangeRateApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.warn('[ExchangeRate API Error]', error.message);
    return Promise.reject(error);
  }
);

freeCurrencyApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.warn('[FreeCurrency API Error]', error.message);
    return Promise.reject(error);
  }
);
