import { useEffect } from 'react';
import { useRatesStore } from '@/store/useRatesStore';

/**
 * Hook that fetches exchange rates on mount and provides store values.
 * Uses cache-first strategy: MMKV cache → API → stale cache fallback.
 */
export function useExchangeRates(base: string = 'USD') {
  const { rates, lastUpdated, isLoading, error, isFromCache, fetchRates } = useRatesStore();

  useEffect(() => {
    fetchRates(base);
  }, [base, fetchRates]);

  return {
    rates,
    lastUpdated,
    isLoading,
    error,
    isFromCache,
    refetch: () => fetchRates(base),
  };
}
