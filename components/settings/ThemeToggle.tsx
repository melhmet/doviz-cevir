import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Colors } from '@/constants/colors';

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
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tema Modu</Text>
      <View style={styles.toggleRow}>
        {options.map((opt) => {
          const isActive = value === opt.key;
          return (
            <Pressable
              key={opt.key}
              style={[styles.option, isActive && styles.optionActive]}
              onPress={() => onChange(opt.key)}
            >
              <Text style={[styles.optionText, isActive && styles.optionTextActive]}>
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
    backgroundColor: Colors.surfaceContainer,
    padding: 24,
    gap: 16,
  },
  label: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 11,
    color: Colors.onSurface,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  toggleRow: {
    flexDirection: 'row',
    backgroundColor: Colors.surfaceContainerLowest,
    padding: 3,
  },
  option: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  optionActive: {
    backgroundColor: Colors.primary,
  },
  optionText: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 10,
    color: Colors.onSurfaceVariant,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  optionTextActive: {
    color: Colors.onPrimary,
  },
});
