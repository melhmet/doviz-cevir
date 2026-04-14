import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@/contexts/ThemeContext';

interface SettingsRowProps {
  label: string;
  value?: string;
  onPress?: () => void;
  rightIcon?: 'chevron-right' | 'open-in-new' | 'delete-forever';
  destructive?: boolean;
}

export function SettingsRow({
  label,
  value,
  onPress,
  rightIcon = 'chevron-right',
  destructive = false,
}: SettingsRowProps) {
  const { colors } = useTheme();

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        { backgroundColor: colors.surfaceContainer },
        pressed && { backgroundColor: colors.surfaceBright },
      ]}
      onPress={onPress}
    >
      <View style={styles.left}>
        <Text style={[styles.label, { color: destructive ? colors.error + 'CC' : colors.onSurface }]}>{label}</Text>
        {value && <Text style={[styles.value, { color: colors.onSurfaceVariant }]}>{value}</Text>}
      </View>
      <MaterialIcons
        name={rightIcon}
        size={20}
        color={destructive ? colors.error + 'CC' : colors.onSurfaceVariant}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: {
    flex: 1,
  },
  label: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 11,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  value: {
    fontFamily: 'JetBrainsMono',
    fontSize: 12,
    marginTop: 4,
  },
});
