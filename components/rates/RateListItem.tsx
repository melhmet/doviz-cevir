import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Colors } from '@/constants/colors';
import { formatNumberTR, formatChange } from '@/utils/format';
import { getCurrency } from '@/utils/currencies';

interface RateListItemProps {
  code: string;
  price: number;
  change: number;
  index: number;
  onPress?: () => void;
}

export function RateListItem({ code, price, change, index, onPress }: RateListItemProps) {
  const currency = getCurrency(code);
  const isPositive = change > 0;
  const changeColor = change === 0
    ? Colors.onSurfaceVariant
    : isPositive
      ? Colors.primary
      : Colors.error;

  const bgColor = index % 2 === 0 ? Colors.surfaceContainerLow : Colors.surfaceContainer;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        { backgroundColor: bgColor },
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      {/* Flag + Name */}
      <View style={styles.left}>
        <View style={styles.flagBox}>
          <Text style={styles.flag}>{currency?.flag || '🏳️'}</Text>
        </View>
        <View>
          <Text style={styles.code}>{code}</Text>
          <Text style={styles.name}>{currency?.nameTR || code}</Text>
        </View>
      </View>

      {/* Price */}
      <Text style={styles.price}>
        {price > 0 ? formatNumberTR(price, price >= 1000 ? 0 : 4) : '—'}
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
    borderBottomColor: Colors.outlineVariant + '0D', // 5% opacity
  },
  pressed: {
    backgroundColor: Colors.surfaceBright,
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
    backgroundColor: Colors.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.outlineVariant + '33',
  },
  flag: {
    fontSize: 22,
  },
  code: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 15,
    color: Colors.primary,
  },
  name: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 9,
    color: Colors.onSurfaceVariant,
    letterSpacing: 1,
    textTransform: 'uppercase',
    opacity: 0.7,
    marginTop: 2,
  },
  price: {
    flex: 4,
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 16,
    color: Colors.onSurface,
    textAlign: 'right',
  },
  change: {
    flex: 2,
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 13,
    textAlign: 'right',
  },
});
