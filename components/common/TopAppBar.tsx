import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@/contexts/ThemeContext';
import { useSettingsStore } from '@/store/useSettingsStore';

interface TopAppBarProps {
  onWalletPress?: () => void;
}

export function TopAppBar({ onWalletPress }: TopAppBarProps) {
  const { colors } = useTheme();
  const favCount = useSettingsStore((s) => s.favorites.length);

  return (
    <View style={[styles.container, { backgroundColor: colors.surfaceContainerLowest }]}>
      <View style={styles.left}>
        <MaterialIcons name="terminal" size={24} color={colors.primary} />
        <Text style={[styles.title, { color: colors.primary }]}>DÖVİZÇEVİR</Text>
      </View>
      <Pressable
        style={({ pressed }) => [styles.iconButton, pressed && styles.iconButtonPressed]}
        onPress={onWalletPress}
      >
        <MaterialIcons
          name="account-balance-wallet"
          size={24}
          color={colors.onSurfaceVariant}
        />
        {favCount > 0 && (
          <View style={[styles.badge, { backgroundColor: colors.primary }]} />
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 18,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  iconButton: {
    padding: 8,
    position: 'relative',
  },
  iconButtonPressed: {
    opacity: 0.6,
  },
  badge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
