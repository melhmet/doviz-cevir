import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@/contexts/ThemeContext';

interface CurrencyButtonProps {
  code: string;
  onPress: () => void;
}

export function CurrencyButton({ code, onPress }: CurrencyButtonProps) {
  const { colors } = useTheme();

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: colors.surfaceContainerHigh,
          borderLeftColor: colors.primary,
        },
        pressed && { backgroundColor: colors.surfaceBright, transform: [{ scale: 1.02 }] },
      ]}
      onPress={onPress}
    >
      <Text style={[styles.code, { color: colors.onSurface }]}>{code}</Text>
      <MaterialIcons name="expand-more" size={18} color={colors.primary} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderLeftWidth: 4,
  },
  code: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 16,
  },
});
