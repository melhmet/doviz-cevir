import { create } from 'zustand';
import { Config } from '@/constants/config';

interface CurrencyState {
  fromCurrency: string;
  toCurrency: string;
  amount: string;
  setFromCurrency: (code: string) => void;
  setToCurrency: (code: string) => void;
  setAmount: (amount: string) => void;
  swap: () => void;
}

export const useCurrencyStore = create<CurrencyState>((set) => ({
  fromCurrency: Config.DEFAULT_FROM_CURRENCY,
  toCurrency: Config.DEFAULT_TO_CURRENCY,
  amount: Config.DEFAULT_AMOUNT,

  setFromCurrency: (code) =>
    set((state) => ({
      fromCurrency: code,
      // If same as toCurrency, swap them
      toCurrency: code === state.toCurrency ? state.fromCurrency : state.toCurrency,
    })),

  setToCurrency: (code) =>
    set((state) => ({
      toCurrency: code,
      fromCurrency: code === state.fromCurrency ? state.toCurrency : state.fromCurrency,
    })),

  setAmount: (amount) => set({ amount }),

  swap: () =>
    set((state) => ({
      fromCurrency: state.toCurrency,
      toCurrency: state.fromCurrency,
    })),
}));
