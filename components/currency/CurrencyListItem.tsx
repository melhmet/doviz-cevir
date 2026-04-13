import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Colors } from '@/constants/colors';
import { Currency } from '@/utils/currencies';

interface CurrencyListItemProps {
  currency: Currency;
  isSelected: boolean;
  onPress: () => void;
}

export function CurrencyListItem({ currency, isSelected, onPress }: CurrencyListItemProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        isSelected && styles.selected,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      <View style={styles.flagBox}>
        <Text style={styles.flag}>{currency.flag}</Text>
      </View>
      <View style={styles.info}>
        <Text style={[styles.code, isSelected && styles.codeSelected]}>{currency.code}</Text>
        <Text style={styles.name}>{currency.nameTR}</Text>
      </View>
      <Text style={styles.symbol}>{currency.symbol}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    gap: 14,
  },
  selected: {
    backgroundColor: Colors.surfaceBright,
  },
  pressed: {
    backgroundColor: Colors.surfaceContainerHigh,
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
  info: {
    flex: 1,
  },
  code: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 16,
    color: Colors.onSurface,
  },
  codeSelected: {
    color: Colors.primary,
  },
  name: {
    fontFamily: 'SpaceGrotesk',
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    marginTop: 2,
  },
  symbol: {
    fontFamily: 'JetBrainsMono',
    fontSize: 16,
    color: Colors.onSurfaceVariant,
  },
});
