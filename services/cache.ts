import { createMMKV } from 'react-native-mmkv';
import type { MMKV } from 'react-native-mmkv';
import { Config } from '@/constants/config';

let storage: MMKV | null = null;

function getStorage(): MMKV {
  if (!storage) {
    storage = createMMKV({ id: 'doviz-cevir-cache' });
  }
  return storage;
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
