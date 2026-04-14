import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';

interface LoadingSpinnerProps {
  message?: string;
}

export function LoadingSpinner({ message = 'Yükleniyor...' }: LoadingSpinnerProps) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.surfaceContainerLowest }]}>
      <ActivityIndicator size="large" color={colors.primary} />
      {message && <Text style={[styles.text, { color: colors.onSurfaceVariant }]}>{message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  text: {
    fontFamily: 'SpaceGrotesk',
    fontSize: 12,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
});
