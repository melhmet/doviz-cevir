import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';

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
  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={onPress}
    >
      <View style={styles.left}>
        <Text style={[styles.label, destructive && styles.labelDestructive]}>{label}</Text>
        {value && <Text style={styles.value}>{value}</Text>}
      </View>
      <MaterialIcons
        name={rightIcon}
        size={20}
        color={destructive ? Colors.error + 'CC' : Colors.onSurfaceVariant}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surfaceContainer,
    paddingHorizontal: 24,
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pressed: {
    backgroundColor: Colors.surfaceBright,
  },
  left: {
    flex: 1,
  },
  label: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 11,
    color: Colors.onSurface,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  labelDestructive: {
    color: Colors.error + 'CC',
  },
  value: {
    fontFamily: 'JetBrainsMono',
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    marginTop: 4,
  },
});
