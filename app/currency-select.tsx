import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';
import { SearchInput } from '@/components/rates/SearchInput';
import { CurrencyListItem } from '@/components/currency/CurrencyListItem';
import { currencies } from '@/utils/currencies';
import { useCurrencyStore } from '@/store/useCurrencyStore';

export default function CurrencySelectScreen() {
  const router = useRouter();
  const { target } = useLocalSearchParams<{ target: 'from' | 'to' }>();
  const { fromCurrency, toCurrency, setFromCurrency, setToCurrency } = useCurrencyStore();
  const [search, setSearch] = useState('');

  const selectedCode = target === 'from' ? fromCurrency : toCurrency;

  const filtered = useMemo(() => {
    const q = search.toUpperCase();
    return currencies.filter(
      (c) =>
        c.code.includes(q) ||
        c.nameTR.toUpperCase().includes(q) ||
        c.nameEN.toUpperCase().includes(q)
    );
  }, [search]);

  const handleSelect = (code: string) => {
    if (target === 'from') {
      setFromCurrency(code);
    } else {
      setToCurrency(code);
    }
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <MaterialIcons name="close" size={24} color={Colors.onSurface} />
        </Pressable>
        <Text style={styles.title}>
          {target === 'from' ? 'Gönderilen Birim' : 'Alınan Birim'}
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
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.surfaceContainerLowest,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.outlineVariant + '1A',
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
    color: Colors.onSurface,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  searchWrapper: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.outlineVariant + '0D',
    marginHorizontal: 24,
  },
});
