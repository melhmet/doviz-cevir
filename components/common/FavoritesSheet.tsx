import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@/contexts/ThemeContext';
import { BottomSheet } from '@/components/common/BottomSheet';
import { useSettingsStore } from '@/store/useSettingsStore';
import { useRatesStore } from '@/store/useRatesStore';
import { getCurrency } from '@/utils/currencies';
import { getRate } from '@/utils/convert';
import { formatNumberTR } from '@/utils/format';

interface FavoritesSheetProps {
  visible: boolean;
  onClose: () => void;
  onCurrencyPress?: (code: string) => void;
}

export function FavoritesSheet({ visible, onClose, onCurrencyPress }: FavoritesSheetProps) {
  const { colors } = useTheme();
  const favorites = useSettingsStore((s) => s.favorites);
  const toggleFavorite = useSettingsStore((s) => s.toggleFavorite);
  const decimalPrecision = useSettingsStore((s) => s.decimalPrecision);
  const { rates } = useRatesStore();

  return (
    <BottomSheet visible={visible} onClose={onClose} title="Favori Kurlar">
      <ScrollView style={styles.scrollView}>
        {favorites.length === 0 ? (
          <View style={styles.emptyContainer}>
            <MaterialIcons name="star-outline" size={48} color={colors.outlineVariant} />
            <Text style={[styles.emptyTitle, { color: colors.onSurfaceVariant }]}>
              Henüz favori yok
            </Text>
            <Text style={[styles.emptyDesc, { color: colors.outlineVariant }]}>
              Kur detayında yıldız simgesine tıklayarak favori ekleyebilirsiniz
            </Text>
          </View>
        ) : (
          favorites.map((code, index) => {
            const currency = getCurrency(code);
            const rate = getRate(code, 'TRY', rates);
            return (
              <Pressable
                key={code}
                style={({ pressed }) => [
                  styles.row,
                  {
                    backgroundColor: index % 2 === 0
                      ? colors.surfaceContainerLow
                      : colors.surfaceContainer,
                    borderBottomColor: colors.outlineVariant + '0D',
                  },
                  pressed && { backgroundColor: colors.surfaceBright },
                ]}
                onPress={() => onCurrencyPress?.(code)}
              >
                <View style={styles.rowLeft}>
                  <View style={[styles.flagBox, {
                    backgroundColor: colors.surfaceContainer,
                    borderColor: colors.outlineVariant + '33',
                  }]}>
                    <Text style={styles.flag}>{currency?.flag || '🏳️'}</Text>
                  </View>
                  <View>
                    <Text style={[styles.code, { color: colors.primary }]}>{code}</Text>
                    <Text style={[styles.name, { color: colors.onSurfaceVariant }]}>
                      {currency?.nameTR || code}
                    </Text>
                  </View>
                </View>
                <Text style={[styles.rate, { color: colors.onSurface }]}>
                  {rate > 0 ? formatNumberTR(rate, decimalPrecision) : '—'}
                </Text>
                <Pressable
                  onPress={() => toggleFavorite(code)}
                  hitSlop={8}
                  style={({ pressed }) => [styles.deleteBtn, pressed && { opacity: 0.6 }]}
                >
                  <MaterialIcons name="close" size={18} color={colors.error} />
                </Pressable>
              </Pressable>
            );
          })
        )}
      </ScrollView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    maxHeight: 400,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 48,
    paddingHorizontal: 40,
    gap: 12,
  },
  emptyTitle: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 14,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  emptyDesc: {
    fontFamily: 'SpaceGrotesk',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  rowLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  flagBox: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  flag: {
    fontSize: 20,
  },
  code: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 14,
  },
  name: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 9,
    letterSpacing: 1,
    textTransform: 'uppercase',
    opacity: 0.7,
    marginTop: 1,
  },
  rate: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 14,
    marginRight: 16,
  },
  deleteBtn: {
    padding: 4,
  },
});
