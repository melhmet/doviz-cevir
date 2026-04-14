import { create } from 'zustand';
import { persist, createJSONStorage, type StateStorage } from 'zustand/middleware';

let _storage: any = null;

function getStorage() {
  if (!_storage) {
    try {
      const { createMMKV } = require('react-native-mmkv');
      _storage = createMMKV({ id: 'doviz-cevir-settings' });
    } catch {
      // Expo Go fallback: in-memory storage
      const mem: Record<string, string> = {};
      _storage = {
        getString: (k: string) => mem[k] ?? undefined,
        set: (k: string, v: string | number | boolean) => { mem[k] = String(v); },
        remove: (k: string) => { delete mem[k]; },
        clearAll: () => { Object.keys(mem).forEach((k) => delete mem[k]); },
      };
    }
  }
  return _storage;
}

const zustandStorage: StateStorage = {
  getItem: (name) => {
    try {
      return getStorage().getString(name) ?? null;
    } catch {
      return null;
    }
  },
  setItem: (name, value) => {
    try {
      getStorage().set(name, value);
    } catch {}
  },
  removeItem: (name) => {
    try {
      getStorage().remove(name);
    } catch {}
  },
};

export type ThemeMode = 'dark' | 'light' | 'system';

interface SettingsState {
  themeMode: ThemeMode;
  defaultCurrency: string;
  decimalPrecision: number;
  favorites: string[];
  _hasHydrated: boolean;
  setThemeMode: (mode: ThemeMode) => void;
  setDefaultCurrency: (code: string) => void;
  setDecimalPrecision: (precision: number) => void;
  toggleFavorite: (code: string) => void;
  isFavorite: (code: string) => boolean;
  resetSettings: () => void;
  setHasHydrated: (v: boolean) => void;
}

const defaults = {
  themeMode: 'dark' as ThemeMode,
  defaultCurrency: 'TRY',
  decimalPrecision: 4,
  favorites: [] as string[],
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      ...defaults,
      _hasHydrated: false,
      setThemeMode: (mode) => set({ themeMode: mode }),
      setDefaultCurrency: (code) => set({ defaultCurrency: code }),
      setDecimalPrecision: (precision) => set({ decimalPrecision: precision }),
      toggleFavorite: (code) => {
        const current = get().favorites;
        if (current.includes(code)) {
          set({ favorites: current.filter((c) => c !== code) });
        } else {
          set({ favorites: [...current, code] });
        }
      },
      isFavorite: (code) => get().favorites.includes(code),
      resetSettings: () => set({ ...defaults, favorites: [] }),
      setHasHydrated: (v) => set({ _hasHydrated: v }),
    }),
    {
      name: 'settings-storage',
      storage: createJSONStorage(() => zustandStorage),
      partialize: (state) => ({
        themeMode: state.themeMode,
        defaultCurrency: state.defaultCurrency,
        decimalPrecision: state.decimalPrecision,
        favorites: state.favorites,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
