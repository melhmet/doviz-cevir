import { exchangeRateApi, freeCurrencyApi } from './api';
import { Config } from '@/constants/config';

export interface RatesResponse {
  base: string;
  rates: Record<string, number>;
  timestamp: number;
}

/**
 * Fetch latest exchange rates from primary API (ExchangeRate-API)
 */
export async function fetchLatestRates(base: string = 'USD'): Promise<RatesResponse> {
  try {
    const response = await exchangeRateApi.get(
      `/${Config.EXCHANGE_RATE_API_KEY}/latest/${base}`
    );

    if (response.data.result === 'success') {
      return {
        base: response.data.base_code,
        rates: response.data.conversion_rates,
        timestamp: Date.now(),
      };
    }

    throw new Error(response.data['error-type'] || 'API error');
  } catch (primaryError) {
    console.warn('[Primary API failed, trying fallback]', primaryError);
    return fetchFallbackRates(base);
  }
}

/**
 * Fallback: FreecurrencyAPI
 */
async function fetchFallbackRates(base: string): Promise<RatesResponse> {
  const response = await freeCurrencyApi.get('/latest', {
    params: {
      apikey: Config.FREE_CURRENCY_API_KEY,
      base_currency: base,
    },
  });

  return {
    base,
    rates: response.data.data,
    timestamp: Date.now(),
  };
}
