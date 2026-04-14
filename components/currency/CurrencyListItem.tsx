import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Currency } from '@/utils/currencies';

interface CurrencyListItemProps {
  currency: Currency;
  isSelected: boolean;
  onPress: () => void;
}

export function CurrencyListItem({ currency, isSelected, onPress }: CurrencyListItemProps) {
  const { colors } = useTheme();

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        isSelected && { backgroundColor: colors.surfaceBright },
        pressed && { backgroundColor: colors.surfaceContainerHigh },
      ]}
      onPress={onPress}
    >
      <View style={[styles.flagBox, {
        backgroundColor: colors.surfaceContainer,
        borderColor: colors.outlineVariant + '33',
      }]}>
        <Text style={styles.flag}>{currency.flag}</Text>
      </View>
      <View style={styles.info}>
        <Text style={[styles.code, { color: isSelected ? colors.primary : colors.onSurface }]}>{currency.code}</Text>
        <Text style={[styles.name, { color: colors.onSurfaceVariant }]}>{currency.nameTR}</Text>
      </View>
      <Text style={[styles.symbol, { color: colors.onSurfaceVariant }]}>{currency.symbol}</Text>
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
  info: {
    flex: 1,
  },
  code: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 16,
  },
  name: {
    fontFamily: 'SpaceGrotesk',
    fontSize: 12,
    marginTop: 2,
  },
  symbol: {
    fontFamily: 'JetBrainsMono',
    fontSize: 16,
  },
});
