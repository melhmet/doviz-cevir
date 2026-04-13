import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';
import { formatNumberTR, formatChange } from '@/utils/format';

interface RateCardProps {
  pair: string;
  value: number;
  change: number;
}

export function RateCard({ pair, value, change }: RateCardProps) {
  const isPositive = change > 0;
  const isNeutral = change === 0;
  const changeColor = isNeutral
    ? Colors.onSurfaceVariant
    : isPositive
      ? Colors.primary
      : Colors.error;
  const trendIcon = isNeutral
    ? 'horizontal-rule'
    : isPositive
      ? 'trending-up'
      : 'trending-down';
  const trendColor = isNeutral ? Colors.onSurfaceVariant : isPositive ? Colors.secondary : Colors.error;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.pair}>{pair}</Text>
        <MaterialIcons name={trendIcon as any} size={16} color={trendColor} />
      </View>
      <Text style={styles.value}>
        {value > 0 ? formatNumberTR(value, 4) : '—'}
      </Text>
      <Text style={[styles.change, { color: changeColor }]}>
        {formatChange(change)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surfaceContainerLow,
    padding: 20,
    borderLeftWidth: 1,
    borderLeftColor: Colors.outlineVariant + '4D', // 30% opacity
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
    color: Colors.onSurfaceVariant,
  },
  value: {
    fontFamily: 'JetBrainsMono-ExtraBold',
    fontSize: 22,
    color: Colors.onSurface,
  },
  change: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 11,
    marginTop: 4,
  },
});
