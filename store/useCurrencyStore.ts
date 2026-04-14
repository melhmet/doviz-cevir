import { create } from 'zustand';
import { Config } from '@/constants/config';
import { useSettingsStore } from '@/store/useSettingsStore';

interface CurrencyState {
  fromCurrency: string;
  toCurrency: string;
  amount: string;
  setFromCurrency: (code: string) => void;
  setToCurrency: (code: string) => void;
  setAmount: (amount: string) => void;
  swap: () => void;
  reset: () => void;
}

export const useCurrencyStore = create<CurrencyState>((set) => ({
  fromCurrency: useSettingsStore.getState().defaultCurrency || Config.DEFAULT_FROM_CURRENCY,
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

  reset: () =>
    set({
      fromCurrency: useSettingsStore.getState().defaultCurrency || Config.DEFAULT_FROM_CURRENCY,
      toCurrency: Config.DEFAULT_TO_CURRENCY,
      amount: Config.DEFAULT_AMOUNT,
    }),
}));

// Sync fromCurrency when defaultCurrency changes in settings
let _prevDefault = useSettingsStore.getState().defaultCurrency;
useSettingsStore.subscribe((state) => {
  const newDefault = state.defaultCurrency;
  if (newDefault && newDefault !== _prevDefault) {
    _prevDefault = newDefault;
    const { fromCurrency, toCurrency } = useCurrencyStore.getState();
    useCurrencyStore.setState({
      fromCurrency: newDefault,
      toCurrency: newDefault === toCurrency ? fromCurrency : toCurrency,
    });
  }
});
