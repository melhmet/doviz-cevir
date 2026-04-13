import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/colors';
import { TopAppBar } from '@/components/common/TopAppBar';
import { ProgressLine } from '@/components/common/ProgressLine';
import { TickerTape } from '@/components/common/TickerTape';
import { AmountInput } from '@/components/converter/AmountInput';
import { CurrencyButton } from '@/components/converter/CurrencyButton';
import { SwapButton } from '@/components/converter/SwapButton';
import { RateInfo } from '@/components/converter/RateInfo';
import { QuickRates } from '@/components/rates/QuickRates';
import { useCurrencyStore } from '@/store/useCurrencyStore';
import { useExchangeRates } from '@/hooks/useExchangeRates';
import { convertCurrency, getRate } from '@/utils/convert';
import { formatNumberTR, parseTRNumber } from '@/utils/format';

export default function ConverterScreen() {
  const router = useRouter();
  const { fromCurrency, toCurrency, amount, setAmount, swap } = useCurrencyStore();
  const { rates, isLoading } = useExchangeRates();

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

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ProgressLine />
      <TopAppBar />
      <TickerTape />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Converter Card */}
        <View style={styles.converterOuter}>
          <View style={styles.converterInner}>
            {/* From Section */}
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>Gönderilen</Text>
              <View style={styles.row}>
                <CurrencyButton code={fromCurrency} onPress={openFromSelector} />
                <AmountInput value={amount} onChangeText={setAmount} />
              </View>
            </View>

            {/* Swap Button */}
            <SwapButton onPress={swap} />

            {/* To Section */}
            <View style={[styles.section, styles.sectionTo]}>
              <Text style={styles.sectionLabel}>Alınan</Text>
              <View style={styles.row}>
                <CurrencyButton code={toCurrency} onPress={openToSelector} />
                <View style={styles.resultContainer}>
                  <Text style={styles.resultText}>
                    {convertedAmount > 0
                      ? formatNumberTR(convertedAmount, convertedAmount >= 1 ? 2 : 5)
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
        <QuickRates />

        {/* Detail Analysis Button */}
        <Pressable
          style={({ pressed }) => [styles.analysisButton, pressed && styles.analysisButtonPressed]}
          onPress={() => router.push('/rates')}
        >
          <Text style={styles.analysisButtonText}>DETAYLI ANALİZ</Text>
          <MaterialIcons name="analytics" size={20} color={Colors.onPrimary} />
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.surfaceContainerLowest,
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
    backgroundColor: Colors.surfaceContainer,
    borderWidth: 1,
    borderColor: Colors.outlineVariant + '33', // 20%
    padding: 2,
    // Digital glow
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 5,
  },
  converterInner: {
    backgroundColor: Colors.surface,
    padding: 24,
  },
  section: {
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: Colors.outlineVariant + '1A', // 10%
  },
  sectionTo: {
    paddingTop: 32,
    paddingBottom: 16,
    borderBottomWidth: 0,
  },
  sectionLabel: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 11,
    color: Colors.onSurfaceVariant,
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
    color: Colors.onSurface,
    textAlign: 'right',
    letterSpacing: -1,
  },
  rateInfoWrapper: {
    marginTop: 24,
  },
  analysisButton: {
    marginTop: 40,
    paddingVertical: 18,
    backgroundColor: Colors.primaryContainer,
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
    color: Colors.onPrimary,
    letterSpacing: 3,
  },
});
