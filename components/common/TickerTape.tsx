import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { Colors } from '@/constants/colors';
import { useRatesStore } from '@/store/useRatesStore';
import { formatNumberTR, formatChange } from '@/utils/format';

const SCREEN_WIDTH = Dimensions.get('window').width;

interface TickerItem {
  pair: string;
  value: number;
  change: number;
}

export function TickerTape() {
  const scrollX = useRef(new Animated.Value(0)).current;
  const { rates } = useRatesStore();

  const tickerItems: TickerItem[] = [
    { pair: 'USD/TRY', value: rates['TRY'] || 0, change: 0.12 },
    { pair: 'EUR/TRY', value: (rates['TRY'] || 0) / (rates['EUR'] || 1), change: -0.05 },
    { pair: 'GBP/TRY', value: (rates['TRY'] || 0) / (rates['GBP'] || 1), change: -0.11 },
    { pair: 'CHF/TRY', value: (rates['TRY'] || 0) / (rates['CHF'] || 1), change: 0.08 },
    { pair: 'JPY/TRY', value: (rates['TRY'] || 0) / (rates['JPY'] || 1) * 100, change: -0.32 },
  ];

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(scrollX, {
        toValue: -SCREEN_WIDTH * 1.5,
        duration: 20000,
        useNativeDriver: true,
      })
    );
    animation.start();
    return () => animation.stop();
  }, [scrollX]);

  const renderItem = (item: TickerItem, index: number) => {
    const isPositive = item.change > 0;
    const changeColor = item.change === 0
      ? Colors.onSurfaceVariant
      : isPositive
        ? Colors.primary
        : Colors.error;

    return (
      <View key={index} style={styles.item}>
        <Text style={styles.pair}>{item.pair}</Text>
        <Text style={styles.value}>
          {item.value > 0 ? formatNumberTR(item.value, 2) : '—'}
        </Text>
        <Text style={[styles.change, { color: changeColor }]}>
          {isPositive ? '▲' : item.change < 0 ? '▼' : '—'} {formatChange(item.change)}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.scrollContent,
          { transform: [{ translateX: scrollX }] },
        ]}
      >
        {tickerItems.map(renderItem)}
        {tickerItems.map((item, i) => renderItem(item, i + tickerItems.length))}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 32,
    backgroundColor: Colors.surfaceContainerLowest,
    overflow: 'hidden',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.outlineVariant + '1A', // 10% opacity
  },
  scrollContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 32,
    gap: 6,
  },
  pair: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 10,
    color: Colors.secondary,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  value: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 10,
    color: Colors.onSurface,
  },
  change: {
    fontFamily: 'JetBrainsMono',
    fontSize: 9,
  },
});
