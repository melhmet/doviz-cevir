import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/colors';
import { TopAppBar } from '@/components/common/TopAppBar';
import { ProgressLine } from '@/components/common/ProgressLine';
import { TickerTape } from '@/components/common/TickerTape';
import { SearchInput } from '@/components/rates/SearchInput';
import { RateListItem } from '@/components/rates/RateListItem';
import { MarketAnalysis } from '@/components/rates/MarketAnalysis';
import { useExchangeRates } from '@/hooks/useExchangeRates';
import { currencies } from '@/utils/currencies';
import { getRate } from '@/utils/convert';

// Simulated daily changes (would come from API in production)
const MOCK_CHANGES: Record<string, number> = {
  USD: 0.12, EUR: -0.05, GBP: -0.11, CHF: 0.08, JPY: -0.32,
  SAR: 0.01, AED: 0.03, CAD: -0.15, AUD: 0.22, RUB: -0.45,
  CNY: 0.07, KWD: 0.02, NOK: -0.09, SEK: 0.18, DKK: -0.03,
  BGN: 0.06, GEL: -0.12, QAR: 0.01, KRW: 0.34,
};

export default function RatesScreen() {
  const [search, setSearch] = useState('');
  const { rates } = useExchangeRates();

  const filteredCurrencies = useMemo(() => {
    const q = search.toUpperCase();
    return currencies
      .filter((c) => c.code !== 'TRY')
      .filter(
        (c) =>
          c.code.includes(q) ||
          c.nameTR.toUpperCase().includes(q) ||
          c.nameEN.toUpperCase().includes(q)
      );
  }, [search]);

  const renderHeader = () => (
    <View>
      <Text style={styles.pageTitle}>Piyasa Kurları</Text>
      <View style={styles.searchWrapper}>
        <SearchInput value={search} onChangeText={setSearch} />
      </View>
      {/* Column Headers */}
      <View style={styles.columnHeaders}>
        <Text style={[styles.columnLabel, { flex: 6 }]}>Varlık / İsim</Text>
        <Text style={[styles.columnLabel, { flex: 4, textAlign: 'right' }]}>Fiyat</Text>
        <Text style={[styles.columnLabel, { flex: 2, textAlign: 'right' }]}>Değişim</Text>
      </View>
    </View>
  );

  const renderFooter = () => (
    <View style={styles.footer}>
      <MarketAnalysis />
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ProgressLine />
      <TopAppBar />
      <TickerTape />
      <FlatList
        data={filteredCurrencies}
        keyExtractor={(item) => item.code}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        renderItem={({ item, index }) => (
          <RateListItem
            code={item.code}
            price={getRate(item.code, 'TRY', rates)}
            change={MOCK_CHANGES[item.code] || 0}
            index={index}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.surfaceContainerLowest,
  },
  listContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  pageTitle: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 24,
    color: Colors.onSurface,
    letterSpacing: -0.5,
    textTransform: 'uppercase',
    marginTop: 28,
    marginBottom: 24,
  },
  searchWrapper: {
    marginBottom: 24,
  },
  columnHeaders: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.outlineVariant + '1A',
  },
  columnLabel: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 10,
    color: Colors.onSurfaceVariant,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  footer: {
    marginTop: 32,
  },
});
