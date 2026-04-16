import { create } from 'zustand';
import { fetchLatestRates, RatesResponse } from '@/services/exchangeRate';
import { cache } from '@/services/cache';
import { Config } from '@/constants/config';

const MIN_FETCH_INTERVAL_MS = 5000;

interface RatesState {
  rates: Record<string, number>;
  base: string;
  lastUpdated: number | null;
  isLoading: boolean;
  error: string | null;
  isFromCache: boolean;
  lastFetchTime: number;
  fetchRates: (base?: string) => Promise<void>;
}

export const useRatesStore = create<RatesState>((set, get) => ({
  rates: {},
  base: 'USD',
  lastUpdated: null,
  isLoading: false,
  error: null,
  isFromCache: false,
  lastFetchTime: 0,

  fetchRates: async (base = 'USD') => {
    const now = Date.now();
    if (now - get().lastFetchTime < MIN_FETCH_INTERVAL_MS) return;
    set({ isLoading: true, error: null, lastFetchTime: now });

    // Check cache first
    if (!cache.isExpired(Config.CACHE_KEY_RATES)) {
      const cached = cache.get<RatesResponse>(Config.CACHE_KEY_RATES);
      if (cached && cached.base === base) {
        set({
          rates: cached.rates,
          base: cached.base,
          lastUpdated: cached.timestamp,
          isLoading: false,
          isFromCache: true,
        });
        return;
      }
    }

    try {
      const data = await fetchLatestRates(base);
      cache.set(Config.CACHE_KEY_RATES, data);

      set({
        rates: data.rates,
        base: data.base,
        lastUpdated: data.timestamp,
        isLoading: false,
        isFromCache: false,
        error: null,
      });
    } catch (err) {
      // Try to use stale cache
      const staleCache = cache.get<RatesResponse>(Config.CACHE_KEY_RATES);
      if (staleCache) {
        set({
          rates: staleCache.rates,
          base: staleCache.base,
          lastUpdated: staleCache.timestamp,
          isLoading: false,
          isFromCache: true,
          error: 'Bağlantı hatası. Eski kur verisi kullanılıyor.',
        });
      } else {
        set({
          isLoading: false,
          error: 'Kur verisi alınamadı. İnternet bağlantınızı kontrol edin.',
        });
      }
    }
  },
}));
