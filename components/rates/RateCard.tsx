import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@/contexts/ThemeContext';
import { useSettingsStore } from '@/store/useSettingsStore';
import { formatNumberTR, formatChange } from '@/utils/format';

interface RateCardProps {
  pair: string;
  value: number;
  change: number;
  onPress?: () => void;
}

export function RateCard({ pair, value, change, onPress }: RateCardProps) {
  const { colors } = useTheme();
  const decimalPrecision = useSettingsStore((s) => s.decimalPrecision);

  const isPositive = change > 0;
  const isNeutral = change === 0;
  const changeColor = isNeutral
    ? colors.onSurfaceVariant
    : isPositive
      ? colors.primary
      : colors.error;
  const trendIcon = isNeutral
    ? 'horizontal-rule'
    : isPositive
      ? 'trending-up'
      : 'trending-down';
  const trendColor = isNeutral ? colors.onSurfaceVariant : isPositive ? colors.secondary : colors.error;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: colors.surfaceContainerLow,
          borderLeftColor: colors.outlineVariant + '4D',
        },
        pressed && { opacity: 0.85, backgroundColor: colors.surfaceContainerHigh },
      ]}
      onPress={onPress}
    >
      <View style={styles.header}>
        <Text style={[styles.pair, { color: colors.onSurfaceVariant }]}>{pair}</Text>
        <MaterialIcons name={trendIcon as any} size={16} color={trendColor} />
      </View>
      <Text style={[styles.value, { color: colors.onSurface }]}>
        {value > 0 ? formatNumberTR(value, decimalPrecision) : '—'}
      </Text>
      <Text style={[styles.change, { color: changeColor }]}>
        {formatChange(change)}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderLeftWidth: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  pair: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 11,
  },
  value: {
    fontFamily: 'JetBrainsMono-ExtraBold',
    fontSize: 22,
  },
  change: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 11,
    marginTop: 4,
  },
});
