import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';

interface OfflineBannerProps {
  message?: string;
}

export function OfflineBanner({ message = 'Eski kur verisi kullanılıyor' }: OfflineBannerProps) {
  return (
    <View style={styles.container}>
      <MaterialIcons name="wifi-off" size={14} color={Colors.onPrimary} />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.error + 'CC',
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
