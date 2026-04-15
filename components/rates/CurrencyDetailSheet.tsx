import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@/contexts/ThemeContext';
import { BottomSheet } from '@/components/common/BottomSheet';
import { useSettingsStore } from '@/store/useSettingsStore';
import { useRatesStore } from '@/store/useRatesStore';
import { useCurrencyStore } from '@/store/useCurrencyStore';
import { getCurrency } from '@/utils/currencies';
import { getRate } from '@/utils/convert';
import { formatNumberTR, formatChange } from '@/utils/format';

interface CurrencyDetailSheetProps {
  visible: boolean;
  currencyCode: string | null;
  change?: number | null;
  onClose: () => void;
}

export function CurrencyDetailSheet({
  visible,
  currencyCode,
  change = null,
  onClose,
}: CurrencyDetailSheetProps) {
  const { colors } = useTheme();
  const router = useRouter();
  const { rates } = useRatesStore();
  const decimalPrecision = useSettingsStore((s) => s.decimalPrecision);
  const { toggleFavorite, isFavorite } = useSettingsStore();
  const { setFromCurrency, setToCurrency } = useCurrencyStore();

  if (!currencyCode) return null;

  const currency = getCurrency(currencyCode);
  const rate = getRate(currencyCode, 'TRY', rates);
  const inverseRate = rate > 0 ? 1 / rate : 0;
  const favorite = isFavorite(currencyCode);
  const isPositive = change != null && change > 0;
  const changeColor = change == null || change === 0
    ? colors.onSurfaceVariant
    : isPositive
      ? colors.primary
      : colors.error;

  const handleConvert = () => {
    setFromCurrency(currencyCode);
    setToCurrency('TRY');
    onClose();
    router.push('/(tabs)');
  };

  return (
    <BottomSheet visible={visible} onClose={onClose} title="Kur Detayı">
      <View style={styles.container}>
        {/* Currency Info */}
        <View style={styles.currencyRow}>
          <View style={styles.currencyLeft}>
            <View style={[styles.flagBox, {
              backgroundColor: colors.surfaceContainerLow,
              borderColor: colors.outlineVariant + '33',
            }]}>
              <Text style={styles.flag}>{currency?.flag || '🏳️'}</Text>
            </View>
            <View>
              <Text style={[styles.code, { color: colors.primary }]}>{currencyCode}</Text>
              <Text style={[styles.name, { color: colors.onSurfaceVariant }]}>
                {currency?.nameTR || currencyCode}
              </Text>
            </View>
          </View>
          <Pressable
            onPress={() => toggleFavorite(currencyCode)}
            hitSlop={8}
            style={({ pressed }) => pressed && { opacity: 0.6 }}
          >
            <MaterialIcons
              name={favorite ? 'star' : 'star-outline'}
              size={28}
              color={favorite ? colors.tertiary : colors.onSurfaceVariant}
            />
          </Pressable>
        </View>

        {/* Rate Details */}
        <View style={[styles.detailsCard, { backgroundColor: colors.surfaceContainerLow }]}>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: colors.onSurfaceVariant }]}>
              1 {currencyCode} =
            </Text>
            <Text style={[styles.detailValue, { color: colors.onSurface }]}>
              {rate > 0 ? `${formatNumberTR(rate, decimalPrecision)} TRY` : '—'}
            </Text>
          </View>
          <View style={[styles.detailSep, { backgroundColor: colors.outlineVariant + '1A' }]} />
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: colors.onSurfaceVariant }]}>
              1 TRY =
            </Text>
            <Text style={[styles.detailValue, { color: colors.onSurface }]}>
              {inverseRate > 0 ? `${formatNumberTR(inverseRate, decimalPrecision + 2)} ${currencyCode}` : '—'}
            </Text>
          </View>
          <View style={[styles.detailSep, { backgroundColor: colors.outlineVariant + '1A' }]} />
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: colors.onSurfaceVariant }]}>
              24s Değişim
            </Text>
            <Text style={[styles.detailValue, { color: changeColor }]}>
              {formatChange(change)}
            </Text>
          </View>
        </View>

        {/* Convert Button */}
        <Pressable
          style={({ pressed }) => [
            styles.convertButton,
            { backgroundColor: colors.primaryContainer },
            pressed && { opacity: 0.85 },
          ]}
          onPress={handleConvert}
        >
          <MaterialIcons name="swap-horiz" size={20} color={colors.onPrimary} />
          <Text style={[styles.convertText, { color: colors.onPrimary }]}>
            BU KURU ÇEVİR
          </Text>
        </Pressable>
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  currencyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  currencyLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  flagBox: {
    width: 52,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  flag: {
    fontSize: 28,
  },
  code: {
    fontFamily: 'JetBrainsMono-ExtraBold',
    fontSize: 22,
  },
  name: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 11,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginTop: 2,
  },
  detailsCard: {
    padding: 20,
    marginBottom: 24,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  detailLabel: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 11,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  detailValue: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 15,
  },
  detailSep: {
    height: 1,
  },
  convertButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    gap: 10,
  },
  convertText: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 13,
    letterSpacing: 3,
  },
});
