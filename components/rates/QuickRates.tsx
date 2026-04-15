import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { RateCard } from './RateCard';
import { useRatesStore } from '@/store/useRatesStore';
import { getRate } from '@/utils/convert';
import { formatTime } from '@/utils/format';

const POPULAR_PAIRS = [
  { from: 'EUR', to: 'TRY' },
  { from: 'GBP', to: 'TRY' },
  { from: 'CHF', to: 'TRY' },
  { from: 'JPY', to: 'TRY' },
];

interface QuickRatesProps {
  onCardPress?: (currencyCode: string) => void;
}

export function QuickRates({ onCardPress }: QuickRatesProps) {
  const { colors } = useTheme();
  const { rates, lastUpdated } = useRatesStore();
  const updateTime = lastUpdated ? formatTime(new Date(lastUpdated)) : '—';

  return (
    <View style={styles.container}>
      <View style={[styles.header, { borderBottomColor: colors.outlineVariant + '33' }]}>
        <View style={styles.headerLeft}>
          <Text style={[styles.headerTitle, { color: colors.onSurface }]}>Popüler Kurlar</Text>
          <View style={[styles.headerUnderline, { backgroundColor: colors.primary }]} />
        </View>
        <Text style={[styles.headerTime, { color: colors.onSurfaceVariant }]}>
          Son Güncelleme: <Text style={styles.headerTimeValue}>{updateTime}</Text>
        </Text>
      </View>
      <View style={styles.grid}>
        {POPULAR_PAIRS.map((pair) => (
          <View key={`${pair.from}/${pair.to}`} style={styles.gridItem}>
            <RateCard
              pair={`${pair.from}/${pair.to}`}
              value={getRate(pair.from, pair.to, rates)}
              change={null}
              onPress={() => onCardPress?.(pair.from)}
            />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderBottomWidth: 1,
    paddingBottom: 8,
    marginBottom: 16,
  },
  headerLeft: {
    position: 'relative',
  },
  headerTitle: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 11,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    paddingBottom: 8,
  },
  headerUnderline: {
    position: 'absolute',
    bottom: -1,
    left: 0,
    right: 0,
    height: 2,
  },
  headerTime: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 9,
    letterSpacing: 0.5,
    textTransform: 'lowercase',
  },
  headerTimeValue: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 9,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  gridItem: {
    width: '48%',
    flexGrow: 1,
  },
});
