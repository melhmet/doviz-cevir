import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';
import { formatNumberTR } from '@/utils/format';

interface RateInfoProps {
  fromCode: string;
  toCode: string;
  rate: number;
}

export function RateInfo({ fromCode, toCode, rate }: RateInfoProps) {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <MaterialIcons name="info" size={18} color={Colors.primary} />
        <Text style={styles.label}>
          Market Orta Değer Kuru:{' '}
          <Text style={styles.rateText}>
            1 {fromCode} = {formatNumberTR(rate, 5)} {toCode}
          </Text>
        </Text>
      </View>
      <MaterialIcons name="show-chart" size={18} color={Colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surfaceContainerLow,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderLeftWidth: 2,
    borderLeftColor: Colors.primary + '80', // 50% opacity
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  label: {
    fontFamily: 'SpaceGrotesk',
    fontSize: 11,
    color: Colors.onSurfaceVariant,
    letterSpacing: 0.5,
  },
  rateText: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 11,
    color: Colors.onSurface,
  },
});
