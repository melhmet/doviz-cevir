import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useSettingsStore } from '@/store/useSettingsStore';
import { formatNumberTR, formatChange } from '@/utils/format';
import { getCurrency } from '@/utils/currencies';

interface RateListItemProps {
  code: string;
  price: number;
  change: number | null;
  index: number;
  onPress?: () => void;
}

export function RateListItem({ code, price, change, index, onPress }: RateListItemProps) {
  const { colors } = useTheme();
  const decimalPrecision = useSettingsStore((s) => s.decimalPrecision);
  const currency = getCurrency(code);
  const isPositive = change != null && change > 0;
  const changeColor = change == null || change === 0
    ? colors.onSurfaceVariant
    : isPositive
      ? colors.primary
      : colors.error;

  const bgColor = index % 2 === 0 ? colors.surfaceContainerLow : colors.surfaceContainer;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        { backgroundColor: bgColor, borderBottomColor: colors.outlineVariant + '0D' },
        pressed && { backgroundColor: colors.surfaceBright },
      ]}
      onPress={onPress}
    >
      {/* Flag + Name */}
      <View style={styles.left}>
        <View style={[styles.flagBox, {
          backgroundColor: colors.surfaceContainer,
          borderColor: colors.outlineVariant + '33',
        }]}>
          <Text style={styles.flag}>{currency?.flag || '🏳️'}</Text>
        </View>
        <View>
          <Text style={[styles.code, { color: colors.primary }]}>{code}</Text>
          <Text style={[styles.name, { color: colors.onSurfaceVariant }]}>{currency?.nameTR || code}</Text>
        </View>
      </View>

      {/* Price */}
      <Text style={[styles.price, { color: colors.onSurface }]}>
        {price > 0 ? formatNumberTR(price, price >= 1000 ? 0 : decimalPrecision) : '—'}
      </Text>

      {/* Change */}
      <Text style={[styles.change, { color: changeColor }]}>
        {formatChange(change)}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 18,
    borderBottomWidth: 1,
  },
  left: {
    flex: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  flagBox: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  flag: {
    fontSize: 22,
  },
  code: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 15,
  },
  name: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 9,
    letterSpacing: 1,
    textTransform: 'uppercase',
    opacity: 0.7,
    marginTop: 2,
  },
  price: {
    flex: 4,
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 16,
    textAlign: 'right',
  },
  change: {
    flex: 2,
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 13,
    textAlign: 'right',
  },
});
