import React, { createContext, useContext, useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { DarkColors, LightColors, type AppColors } from '@/constants/colors';
import { useSettingsStore } from '@/store/useSettingsStore';

interface ThemeContextValue {
  colors: AppColors;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextValue>({
  colors: DarkColors,
  isDark: true,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const themeMode = useSettingsStore((s) => s.themeMode);
  const hasHydrated = useSettingsStore((s) => s._hasHydrated);
  const systemScheme = useColorScheme();

  const value = useMemo<ThemeContextValue>(() => {
    // Before hydration, always return dark to prevent flash
    if (!hasHydrated) {
      return { colors: DarkColors, isDark: true };
    }

    let isDark: boolean;
    if (themeMode === 'system') {
      isDark = systemScheme !== 'light';
    } else {
      isDark = themeMode === 'dark';
    }
    return {
      colors: isDark ? DarkColors : LightColors,
      isDark,
    };
  }, [themeMode, systemScheme, hasHydrated]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext);
}
