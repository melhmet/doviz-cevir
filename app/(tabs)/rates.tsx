import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/contexts/ThemeContext';
import { TopAppBar } from '@/components/common/TopAppBar';
import { ProgressLine } from '@/components/common/ProgressLine';
import { TickerTape } from '@/components/common/TickerTape';
import { SearchInput } from '@/components/rates/SearchInput';
import { RateListItem } from '@/components/rates/RateListItem';
import { MarketAnalysis } from '@/components/rates/MarketAnalysis';
import { CurrencyDetailSheet } from '@/components/rates/CurrencyDetailSheet';
import { FavoritesSheet } from '@/components/common/FavoritesSheet';
import { useExchangeRates } from '@/hooks/useExchangeRates';
import { currencies } from '@/utils/currencies';
import { getRate } from '@/utils/convert';

export default function RatesScreen() {
  const [search, setSearch] = useState('');
  const { colors } = useTheme();
  const { rates } = useExchangeRates();

  // Sheet states
  const [detailVisible, setDetailVisible] = useState(false);
  const [detailCode, setDetailCode] = useState<string | null>(null);
  const [favoritesVisible, setFavoritesVisible] = useState(false);

  const filteredCurrencies = useMemo(() => {
    const q = search.toLocaleLowerCase('tr-TR');
    return currencies
      .filter((c) => c.code !== 'TRY')
      .filter(
        (c) =>
          c.code.toLocaleLowerCase('tr-TR').includes(q) ||
          c.nameTR.toLocaleLowerCase('tr-TR').includes(q) ||
          c.nameEN.toLocaleLowerCase('tr-TR').includes(q)
      );
  }, [search]);

  const openDetail = useCallback((code: string) => {
    setDetailCode(code);
    setDetailVisible(true);
  }, []);

  const renderHeader = () => (
    <View>
      <Text style={[styles.pageTitle, { color: colors.onSurface }]}>Piyasa Kurları</Text>
      <View style={styles.searchWrapper}>
        <SearchInput value={search} onChangeText={setSearch} />
      </View>
      {/* Column Headers */}
      <View style={[styles.columnHeaders, { borderBottomColor: colors.outlineVariant + '1A' }]}>
        <Text style={[styles.columnLabel, { flex: 6, color: colors.onSurfaceVariant }]}>Varlık / İsim</Text>
        <Text style={[styles.columnLabel, { flex: 4, textAlign: 'right', color: colors.onSurfaceVariant }]}>Fiyat</Text>
        <Text style={[styles.columnLabel, { flex: 2, textAlign: 'right', color: colors.onSurfaceVariant }]}>Değişim</Text>
      </View>
    </View>
  );

  const renderFooter = () => (
    <View style={styles.footer}>
      <MarketAnalysis />
    </View>
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.surfaceContainerLowest }]} edges={['top']}>
      <ProgressLine />
      <TopAppBar onWalletPress={() => setFavoritesVisible(true)} />
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
            change={null}
            index={index}
            onPress={() => openDetail(item.code)}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />

      <CurrencyDetailSheet
        visible={detailVisible}
        currencyCode={detailCode}
        change={null}
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
  listContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  pageTitle: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 24,
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
  },
  columnLabel: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 10,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  footer: {
    marginTop: 32,
  },
});
