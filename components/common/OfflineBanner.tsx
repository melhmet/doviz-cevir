import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@/contexts/ThemeContext';

interface OfflineBannerProps {
  message?: string;
}

export function OfflineBanner({ message = 'Eski kur verisi kullanılıyor' }: OfflineBannerProps) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.error + 'CC' }]}>
      <MaterialIcons name="wifi-off" size={14} color={colors.onPrimary} />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  text: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 10,
    color: '#ffffff',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});
