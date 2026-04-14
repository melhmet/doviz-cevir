import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Linking, Modal, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { Config } from '@/constants/config';
import { TopAppBar } from '@/components/common/TopAppBar';
import { ProgressLine } from '@/components/common/ProgressLine';
import { TickerTape } from '@/components/common/TickerTape';
import { SectionHeader } from '@/components/settings/SectionHeader';
import { ThemeToggle } from '@/components/settings/ThemeToggle';
import { SettingsRow } from '@/components/settings/SettingsRow';
import { ToggleSwitch } from '@/components/settings/ToggleSwitch';
import { FavoritesSheet } from '@/components/common/FavoritesSheet';
import { useSettingsStore } from '@/store/useSettingsStore';
import { useCurrencyStore } from '@/store/useCurrencyStore';
import { cache } from '@/services/cache';
import { getCurrency } from '@/utils/currencies';

const PRECISION_OPTIONS = [2, 3, 4, 5, 6];

export default function SettingsScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const [showPrecisionPicker, setShowPrecisionPicker] = useState(false);
  const [favoritesVisible, setFavoritesVisible] = useState(false);
  const {
    themeMode, setThemeMode,
    defaultCurrency,
    decimalPrecision, setDecimalPrecision,
    resetSettings,
  } = useSettingsStore();

  const currency = getCurrency(defaultCurrency);
  const currencyLabel = currency
    ? `${currency.code} - ${currency.nameTR}`
    : defaultCurrency;

  const handleDefaultCurrency = () => {
    router.push({ pathname: '/currency-select', params: { target: 'settings-default' } });
  };

  const handleTerms = () => {
    Linking.openURL('https://www.exchangerate-api.com/terms').catch(() => {
      Alert.alert('Hata', 'Bağlantı açılamadı.');
    });
  };

  const handleResetData = () => {
    Alert.alert(
      'Verileri Sıfırla',
      'Tüm önbellek ve ayar verileri silinecek. Devam etmek istiyor musunuz?',
      [
        { text: 'İptal', style: 'cancel' },
        {
          text: 'Sıfırla',
          style: 'destructive',
          onPress: () => {
            cache.clear();
            resetSettings();
            useCurrencyStore.getState().reset();
            Alert.alert('Tamamlandı', 'Tüm veriler sıfırlandı.');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.surfaceContainerLowest }]} edges={['top']}>
      <ProgressLine />
      <TopAppBar onWalletPress={() => setFavoritesVisible(true)} />
      <TickerTape />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Page Title */}
        <View style={styles.titleBlock}>
          <Text style={[styles.pageTitle, { color: colors.primary }]}>Ayarlar</Text>
          <View style={[styles.titleUnderline, { backgroundColor: colors.primary }]} />
        </View>

        {/* Görünüm */}
        <View style={styles.section}>
          <SectionHeader title="Görünüm" />
          <ThemeToggle value={themeMode} onChange={setThemeMode} />
        </View>

        {/* Varsayılan */}
        <View style={styles.section}>
          <SectionHeader title="Varsayılan" />
          <View style={styles.rowGroup}>
            <SettingsRow
              label="Ana Para Birimi"
              value={currencyLabel}
              onPress={handleDefaultCurrency}
            />
            <View style={[styles.rowSeparator, { backgroundColor: colors.outlineVariant + '33' }]} />
            <SettingsRow
              label="Ondalık Hassasiyeti"
              value={`${decimalPrecision} Basamak`}
              onPress={() => setShowPrecisionPicker(true)}
            />
          </View>
        </View>

        {/* Bildirimler */}
        <View style={styles.section}>
          <SectionHeader title="Bildirimler" />
          <View style={[styles.notificationGroup, { backgroundColor: colors.surfaceContainer }]}>
            <View style={styles.notificationRow}>
              <View style={styles.notificationText}>
                <Text style={[styles.notificationLabel, { color: colors.onSurface }]}>Fiyat Alarmları</Text>
                <Text style={[styles.notificationDesc, { color: colors.onSurfaceVariant }]}>Yakında</Text>
              </View>
              <ToggleSwitch value={false} onToggle={() => {}} disabled />
            </View>
            <View style={styles.notificationRow}>
              <View style={styles.notificationText}>
                <Text style={[styles.notificationLabel, { color: colors.onSurface }]}>Günlük Özet</Text>
                <Text style={[styles.notificationDesc, { color: colors.onSurfaceVariant }]}>Yakında</Text>
              </View>
              <ToggleSwitch value={false} onToggle={() => {}} disabled />
            </View>
          </View>
        </View>

        {/* Hakkında */}
        <View style={styles.section}>
          <SectionHeader title="Hakkında" />
          <View style={styles.rowGroup}>
            <View style={[styles.versionRow, { backgroundColor: colors.surfaceContainer }]}>
              <Text style={[styles.versionLabel, { color: colors.onSurface }]}>Sürüm</Text>
              <Text style={[styles.versionValue, { color: colors.secondary }]}>V {Config.APP_VERSION}-STABLE</Text>
            </View>
            <View style={[styles.rowSeparator, { backgroundColor: colors.outlineVariant + '33' }]} />
            <SettingsRow
              label="Kullanım Koşulları"
              rightIcon="open-in-new"
              onPress={handleTerms}
            />
            <View style={[styles.rowSeparator, { backgroundColor: colors.outlineVariant + '33' }]} />
            <SettingsRow
              label="Verileri Sıfırla"
              rightIcon="delete-forever"
              destructive
              onPress={handleResetData}
            />
          </View>
        </View>
      </ScrollView>

      {/* Precision Picker Modal */}
      <Modal
        visible={showPrecisionPicker}
        transparent
        animationType="fade"
        onRequestClose={() => setShowPrecisionPicker(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setShowPrecisionPicker(false)}
        >
          <View style={[styles.modalContent, { backgroundColor: colors.surfaceContainer }]}>
            <Text style={[styles.modalTitle, { color: colors.onSurface }]}>
              Ondalık Hassasiyeti
            </Text>
            {PRECISION_OPTIONS.map((p) => {
              const isSelected = p === decimalPrecision;
              return (
                <Pressable
                  key={p}
                  style={[
                    styles.modalOption,
                    { borderBottomColor: colors.outlineVariant + '1A' },
                    isSelected && { backgroundColor: colors.primary + '1A' },
                  ]}
                  onPress={() => {
                    setDecimalPrecision(p);
                    setShowPrecisionPicker(false);
                  }}
                >
                  <Text style={[
                    styles.modalOptionText,
                    { color: isSelected ? colors.primary : colors.onSurface },
                  ]}>
                    {p} Basamak
                  </Text>
                  {isSelected && (
                    <View style={[styles.modalCheck, { backgroundColor: colors.primary }]} />
                  )}
                </Pressable>
              );
            })}
            <Pressable
              style={[styles.modalCancel, { borderTopColor: colors.outlineVariant + '33' }]}
              onPress={() => setShowPrecisionPicker(false)}
            >
              <Text style={[styles.modalCancelText, { color: colors.onSurfaceVariant }]}>
                İptal
              </Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>

      <FavoritesSheet
        visible={favoritesVisible}
        onClose={() => setFavoritesVisible(false)}
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
  content: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  titleBlock: {
    marginTop: 28,
    marginBottom: 32,
  },
  pageTitle: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 28,
    letterSpacing: -0.5,
    textTransform: 'uppercase',
  },
  titleUnderline: {
    height: 4,
    width: 48,
    marginTop: 8,
  },
  section: {
    marginBottom: 32,
  },
  rowGroup: {
    overflow: 'hidden',
  },
  rowSeparator: {
    height: 1,
  },
  notificationGroup: {
    padding: 24,
    gap: 28,
  },
  notificationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  notificationText: {
    flex: 1,
  },
  notificationLabel: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 11,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  notificationDesc: {
    fontFamily: 'SpaceGrotesk',
    fontSize: 12,
    marginTop: 4,
  },
  versionRow: {
    paddingHorizontal: 24,
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  versionLabel: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 11,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  versionValue: {
    fontFamily: 'JetBrainsMono',
    fontSize: 12,
  },
  // Precision picker modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  modalContent: {
    width: '100%',
    maxWidth: 320,
  },
  modalTitle: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 13,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    padding: 20,
    paddingBottom: 12,
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  modalOptionText: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 14,
    letterSpacing: 1,
  },
  modalCheck: {
    width: 8,
    height: 8,
  },
  modalCancel: {
    paddingVertical: 16,
    alignItems: 'center',
    borderTopWidth: 1,
  },
  modalCancelText: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 11,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
});
