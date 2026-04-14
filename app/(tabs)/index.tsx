import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/contexts/ThemeContext';
import { TopAppBar } from '@/components/common/TopAppBar';
import { ProgressLine } from '@/components/common/ProgressLine';
import { TickerTape } from '@/components/common/TickerTape';
import { AmountInput } from '@/components/converter/AmountInput';
import { CurrencyButton } from '@/components/converter/CurrencyButton';
import { SwapButton } from '@/components/converter/SwapButton';
import { RateInfo } from '@/components/converter/RateInfo';
import { QuickRates } from '@/components/rates/QuickRates';
import { CurrencyDetailSheet } from '@/components/rates/CurrencyDetailSheet';
import { FavoritesSheet } from '@/components/common/FavoritesSheet';
import { useCurrencyStore } from '@/store/useCurrencyStore';
import { useSettingsStore } from '@/store/useSettingsStore';
import { useExchangeRates } from '@/hooks/useExchangeRates';
import { convertCurrency, getRate } from '@/utils/convert';
import { formatNumberTR, parseTRNumber } from '@/utils/format';

export default function ConverterScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const { fromCurrency, toCurrency, amount, setAmount, swap } = useCurrencyStore();
  const { rates, isLoading } = useExchangeRates();
  const decimalPrecision = useSettingsStore((s) => s.decimalPrecision);

  // Sheet states
  const [detailVisible, setDetailVisible] = useState(false);
  const [detailCode, setDetailCode] = useState<string | null>(null);
  const [favoritesVisible, setFavoritesVisible] = useState(false);

  const numericAmount = useMemo(() => parseTRNumber(amount), [amount]);

  const convertedAmount = useMemo(
    () => convertCurrency(numericAmount, fromCurrency, toCurrency, rates),
    [numericAmount, fromCurrency, toCurrency, rates]
  );

  const rate = useMemo(
    () => getRate(fromCurrency, toCurrency, rates),
    [fromCurrency, toCurrency, rates]
  );

  const openFromSelector = () => {
    router.push({ pathname: '/currency-select', params: { target: 'from' } });
  };

  const openToSelector = () => {
    router.push({ pathname: '/currency-select', params: { target: 'to' } });
  };

  const openDetail = useCallback((code: string) => {
    setDetailCode(code);
    setDetailVisible(true);
  }, []);

  const displayPrecision = convertedAmount >= 1 ? Math.min(decimalPrecision, 2) : decimalPrecision + 1;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.surfaceContainerLowest }]} edges={['top']}>
      <ProgressLine />
      <TopAppBar onWalletPress={() => setFavoritesVisible(true)} />
      <TickerTape />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Converter Card */}
        <View style={[styles.converterOuter, {
          backgroundColor: colors.surfaceContainer,
          borderColor: colors.outlineVariant + '33',
          shadowColor: colors.primary,
        }]}>
          <View style={[styles.converterInner, { backgroundColor: colors.surface }]}>
            {/* From Section */}
            <View style={[styles.section, { borderBottomColor: colors.outlineVariant + '1A' }]}>
              <Text style={[styles.sectionLabel, { color: colors.onSurfaceVariant }]}>Gönderilen</Text>
              <View style={styles.row}>
                <CurrencyButton code={fromCurrency} onPress={openFromSelector} />
                <AmountInput value={amount} onChangeText={setAmount} />
              </View>
            </View>

            {/* Swap Button */}
            <SwapButton onPress={swap} />

            {/* To Section */}
            <View style={[styles.section, styles.sectionTo]}>
              <Text style={[styles.sectionLabel, { color: colors.onSurfaceVariant }]}>Alınan</Text>
              <View style={styles.row}>
                <CurrencyButton code={toCurrency} onPress={openToSelector} />
                <View style={styles.resultContainer}>
                  <Text style={[styles.resultText, { color: colors.onSurface }]}>
                    {convertedAmount > 0
                      ? formatNumberTR(convertedAmount, displayPrecision)
                      : '—'}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Rate Info */}
        <View style={styles.rateInfoWrapper}>
          <RateInfo fromCode={fromCurrency} toCode={toCurrency} rate={rate} />
        </View>

        {/* Popular Rates Grid */}
        <QuickRates onCardPress={openDetail} />

        {/* Detail Analysis Button */}
        <Pressable
          style={({ pressed }) => [
            styles.analysisButton,
            { backgroundColor: colors.primaryContainer },
            pressed && styles.analysisButtonPressed,
          ]}
          onPress={() => router.push('/rates')}
        >
          <Text style={[styles.analysisButtonText, { color: colors.onPrimary }]}>DETAYLI ANALİZ</Text>
          <MaterialIcons name="analytics" size={20} color={colors.onPrimary} />
        </Pressable>
      </ScrollView>

      <CurrencyDetailSheet
        visible={detailVisible}
        currencyCode={detailCode}
        onClose={() => setDetailVisible(false)}
      />

      <FavoritesSheet
        visible={favoritesVisible}
        onClose={() => setFavoritesVisible(false)}
        onCurrencyPress={(code) => {
          setFavoritesVisible(false);
          setTimeout(() => openDetail(code), 350);
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 40,
  },
  converterOuter: {
    borderWidth: 1,
    padding: 2,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 5,
  },
  converterInner: {
    padding: 24,
  },
  section: {
    paddingBottom: 24,
    borderBottomWidth: 1,
  },
  sectionTo: {
    paddingTop: 32,
    paddingBottom: 16,
    borderBottomWidth: 0,
  },
  sectionLabel: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 11,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 16,
  },
  resultContainer: {
    flex: 1,
  },
  resultText: {
    fontFamily: 'JetBrainsMono-ExtraBold',
    fontSize: 42,
    textAlign: 'right',
    letterSpacing: -1,
  },
  rateInfoWrapper: {
    marginTop: 24,
  },
  analysisButton: {
    marginTop: 40,
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  analysisButtonPressed: {
    transform: [{ scale: 0.98 }],
  },
  analysisButtonText: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 13,
    letterSpacing: 3,
  },
});
