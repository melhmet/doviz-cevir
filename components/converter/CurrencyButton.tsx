import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';

interface CurrencyButtonProps {
  code: string;
  onPress: () => void;
}

export function CurrencyButton({ code, onPress }: CurrencyButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Text style={styles.code}>{code}</Text>
      <MaterialIcons name="expand-more" size={18} color={Colors.primary} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.surfaceContainerHigh,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  pressed: {
    backgroundColor: Colors.surfaceBright,
    transform: [{ scale: 1.02 }],
  },
  code: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 16,
    color: Colors.onSurface,
  },
});
