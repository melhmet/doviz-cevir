import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@/contexts/ThemeContext';
import { formatNumberTR } from '@/utils/format';

interface RateInfoProps {
  fromCode: string;
  toCode: string;
  rate: number;
}

export function RateInfo({ fromCode, toCode, rate }: RateInfoProps) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, {
      backgroundColor: colors.surfaceContainerLow,
      borderLeftColor: colors.primary + '80',
    }]}>
      <View style={styles.left}>
        <MaterialIcons name="info" size={18} color={colors.primary} />
        <Text style={[styles.label, { color: colors.onSurfaceVariant }]}>
          Market Orta Değer Kuru:{' '}
          <Text style={[styles.rateText, { color: colors.onSurface }]}>
            1 {fromCode} = {formatNumberTR(rate, 5)} {toCode}
          </Text>
        </Text>
      </View>
      <MaterialIcons name="show-chart" size={18} color={colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderLeftWidth: 2,
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
    letterSpacing: 0.5,
  },
  rateText: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 11,
  },
});
