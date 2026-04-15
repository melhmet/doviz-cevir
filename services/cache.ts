import { Config } from '@/constants/config';

interface StorageLike {
  set(key: string, value: string | number | boolean): void;
  getString(key: string): string | undefined;
  getNumber(key: string): number | undefined;
  remove(key: string): void;
  clearAll(): void;
}

let storage: StorageLike | null = null;

function getStorage(): StorageLike {
  if (!storage) {
    try {
      const { createMMKV } = require('react-native-mmkv');
      storage = createMMKV({ id: 'doviz-cevir-cache' });
    } catch {
      // Expo Go / environment fallback: in-memory storage
      const mem: Record<string, string | number> = {};
      storage = {
        getString: (k: string) => {
          const v = mem[k];
          return typeof v === 'string' ? v : undefined;
        },
        getNumber: (k: string) => {
          const v = mem[k];
          return typeof v === 'number' ? v : undefined;
        },
        set: (k: string, v: string | number | boolean) => {
          mem[k] = typeof v === 'boolean' ? String(v) : v;
        },
        remove: (k: string) => { delete mem[k]; },
        clearAll: () => { Object.keys(mem).forEach((k) => delete mem[k]); },
      };
    }
  }
  return storage!;
}

export const cache = {
  set(key: string, value: unknown): void {
    const s = getStorage();
    s.set(key, JSON.stringify(value));
    s.set(`${key}_ts`, Date.now());
  },

  get<T>(key: string): T | null {
    const raw = getStorage().getString(key);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  },

  getTimestamp(key: string): number {
    return getStorage().getNumber(`${key}_ts`) ?? 0;
  },

  isExpired(key: string, ttl: number = Config.CACHE_TTL_MS): boolean {
    const ts = this.getTimestamp(key);
    if (ts === 0) return true;
    return Date.now() - ts > ttl;
  },

  remove(key: string): void {
    const s = getStorage();
    s.remove(key);
    s.remove(`${key}_ts`);
  },

  clear(): void {
    getStorage().clearAll();
  },
};
