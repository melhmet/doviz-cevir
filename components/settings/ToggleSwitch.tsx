import React from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';

interface ToggleSwitchProps {
  value: boolean;
  onToggle: () => void;
  disabled?: boolean;
}

export function ToggleSwitch({ value, onToggle, disabled = false }: ToggleSwitchProps) {
  const { colors } = useTheme();

  return (
    <Pressable
      style={[
        styles.track,
        { backgroundColor: value ? colors.primary : colors.surfaceContainerHighest },
        disabled && { opacity: 0.4 },
      ]}
      onPress={disabled ? undefined : onToggle}
    >
      <View style={[
        styles.thumb,
        { backgroundColor: value ? colors.onPrimary : colors.outlineVariant },
        value && styles.thumbActive,
      ]} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  track: {
    width: 48,
    height: 24,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  thumb: {
    width: 16,
    height: 16,
  },
  thumbActive: {
    marginLeft: 'auto',
  },
});
