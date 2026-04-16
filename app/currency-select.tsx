import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@/contexts/ThemeContext';
import { SearchInput } from '@/components/rates/SearchInput';
import { CurrencyListItem } from '@/components/currency/CurrencyListItem';
import { currencies } from '@/utils/currencies';
import { useCurrencyStore } from '@/store/useCurrencyStore';
import { useSettingsStore } from '@/store/useSettingsStore';

type Target = 'from' | 'to' | 'settings-default';

const TITLES: Record<Target, string> = {
  from: 'Gönderilen Birim',
  to: 'Alınan Birim',
  'settings-default': 'Varsayılan Para Birimi',
};

const VALID_TARGETS: Target[] = ['from', 'to', 'settings-default'];

export default function CurrencySelectScreen() {
  const router = useRouter();
  const { target } = useLocalSearchParams<{ target: Target }>();
  const { fromCurrency, toCurrency, setFromCurrency, setToCurrency } = useCurrencyStore();
  const { defaultCurrency, setDefaultCurrency } = useSettingsStore();
  const { colors } = useTheme();
  const [search, setSearch] = useState('');

  React.useEffect(() => {
    if (!target || !VALID_TARGETS.includes(target as Target)) {
      router.back();
    }
  }, [target]);

  const selectedCode =
    target === 'settings-default'
      ? defaultCurrency
      : target === 'from'
        ? fromCurrency
        : toCurrency;

  const filtered = useMemo(() => {
    const q = search.toLocaleLowerCase('tr-TR');
    return currencies.filter(
      (c) =>
        c.code.toLocaleLowerCase('tr-TR').includes(q) ||
        c.nameTR.toLocaleLowerCase('tr-TR').includes(q) ||
        c.nameEN.toLocaleLowerCase('tr-TR').includes(q)
    );
  }, [search]);

  const handleSelect = (code: string) => {
    if (target === 'settings-default') {
      setDefaultCurrency(code);
    } else if (target === 'from') {
      setFromCurrency(code);
    } else {
      setToCurrency(code);
    }
    router.back();
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.surfaceContainerLowest }]} edges={['top']}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.outlineVariant + '1A' }]}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <MaterialIcons name="close" size={24} color={colors.onSurface} />
        </Pressable>
        <Text style={[styles.title, { color: colors.onSurface }]}>
          {TITLES[target as Target] || 'Para Birimi Seç'}
        </Text>
        <View style={styles.backButton} />
      </View>

      {/* Search */}
      <View style={styles.searchWrapper}>
        <SearchInput value={search} onChangeText={setSearch} placeholder="PARA BİRİMİ ARA..." />
      </View>

      {/* Currency List */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.code}
        renderItem={({ item }) => (
          <CurrencyListItem
            currency={item}
            isSelected={item.code === selectedCode}
            onPress={() => handleSelect(item.code)}
          />
        )}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => (
          <View style={[styles.separator, { backgroundColor: colors.outlineVariant + '0D' }]} />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 14,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  searchWrapper: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  separator: {
    height: 1,
    marginHorizontal: 24,
  },
});
