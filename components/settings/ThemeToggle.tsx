import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';

type ThemeMode = 'dark' | 'light' | 'system';

interface ThemeToggleProps {
  value: ThemeMode;
  onChange: (mode: ThemeMode) => void;
}

const options: { key: ThemeMode; label: string }[] = [
  { key: 'dark', label: 'Karanlık' },
  { key: 'light', label: 'Aydınlık' },
  { key: 'system', label: 'Sistem' },
];

export function ThemeToggle({ value, onChange }: ThemeToggleProps) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.surfaceContainer }]}>
      <Text style={[styles.label, { color: colors.onSurface }]}>Tema Modu</Text>
      <View style={[styles.toggleRow, { backgroundColor: colors.surfaceContainerLowest }]}>
        {options.map((opt) => {
          const isActive = value === opt.key;
          return (
            <Pressable
              key={opt.key}
              style={[styles.option, isActive && [styles.optionActive, { backgroundColor: colors.primary }]]}
              onPress={() => onChange(opt.key)}
            >
              <Text style={[
                styles.optionText,
                { color: colors.onSurfaceVariant },
                isActive && { color: colors.onPrimary },
              ]}>
                {opt.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 16,
  },
  label: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 11,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  toggleRow: {
    flexDirection: 'row',
    padding: 3,
  },
  option: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  optionActive: {},
  optionText: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 10,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
});
