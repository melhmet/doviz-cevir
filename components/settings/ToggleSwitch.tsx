import React from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';

interface ToggleSwitchProps {
  value: boolean;
  onToggle: () => void;
}

export function ToggleSwitch({ value, onToggle }: ToggleSwitchProps) {
  return (
    <Pressable style={[styles.track, value && styles.trackActive]} onPress={onToggle}>
      <View style={[styles.thumb, value && styles.thumbActive]} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  track: {
    width: 48,
    height: 24,
    backgroundColor: Colors.surfaceContainerHighest,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  trackActive: {
    backgroundColor: Colors.primary,
  },
  thumb: {
    width: 16,
    height: 16,
    backgroundColor: Colors.outlineVariant,
  },
  thumbActive: {
    backgroundColor: Colors.onPrimary,
    marginLeft: 'auto',
  },
});
