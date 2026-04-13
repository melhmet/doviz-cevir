import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/colors';
import { Config } from '@/constants/config';
import { TopAppBar } from '@/components/common/TopAppBar';
import { ProgressLine } from '@/components/common/ProgressLine';
import { TickerTape } from '@/components/common/TickerTape';
import { SectionHeader } from '@/components/settings/SectionHeader';
import { ThemeToggle } from '@/components/settings/ThemeToggle';
import { SettingsRow } from '@/components/settings/SettingsRow';
import { ToggleSwitch } from '@/components/settings/ToggleSwitch';
import { cache } from '@/services/cache';

export default function SettingsScreen() {
  const [themeMode, setThemeMode] = useState<'dark' | 'light' | 'system'>('dark');
  const [priceAlerts, setPriceAlerts] = useState(true);
  const [dailySummary, setDailySummary] = useState(false);

  const handleResetData = () => {
    Alert.alert(
      'Verileri Sıfırla',
      'Tüm önbellek ve ayar verileri silinecek. Devam etmek istiyor musunuz?',
      [
        { text: 'İptal', style: 'cancel' },
        {
          text: 'Sıfırla',
          style: 'destructive',
          onPress: () => cache.clear(),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ProgressLine />
      <TopAppBar />
      <TickerTape />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Page Title */}
        <View style={styles.titleBlock}>
          <Text style={styles.pageTitle}>Ayarlar</Text>
          <View style={styles.titleUnderline} />
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
              value="TRY - Türk Lirası"
            />
            <View style={styles.rowSeparator} />
            <SettingsRow
              label="Ondalık Hassasiyeti"
              value="4 Basamak"
            />
          </View>
        </View>

        {/* Bildirimler */}
        <View style={styles.section}>
          <SectionHeader title="Bildirimler" />
          <View style={styles.notificationGroup}>
            <View style={styles.notificationRow}>
              <View style={styles.notificationText}>
                <Text style={styles.notificationLabel}>Fiyat Alarmları</Text>
                <Text style={styles.notificationDesc}>Hedef kura ulaşıldığında uyar</Text>
              </View>
              <ToggleSwitch value={priceAlerts} onToggle={() => setPriceAlerts(!priceAlerts)} />
            </View>
            <View style={styles.notificationRow}>
              <View style={styles.notificationText}>
                <Text style={styles.notificationLabel}>Günlük Özet</Text>
                <Text style={styles.notificationDesc}>Piyasa açılış raporu</Text>
              </View>
              <ToggleSwitch value={dailySummary} onToggle={() => setDailySummary(!dailySummary)} />
            </View>
          </View>
        </View>

        {/* Hakkında */}
        <View style={styles.section}>
          <SectionHeader title="Hakkında" />
          <View style={styles.rowGroup}>
            <View style={styles.versionRow}>
              <Text style={styles.versionLabel}>Sürüm</Text>
              <Text style={styles.versionValue}>V {Config.APP_VERSION}-STABLE</Text>
            </View>
            <View style={styles.rowSeparator} />
            <SettingsRow
              label="Kullanım Koşulları"
              rightIcon="open-in-new"
            />
            <View style={styles.rowSeparator} />
            <SettingsRow
              label="Verileri Sıfırla"
              rightIcon="delete-forever"
              destructive
              onPress={handleResetData}
            />
          </View>
        </View>
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
    color: Colors.primary,
    letterSpacing: -0.5,
    textTransform: 'uppercase',
  },
  titleUnderline: {
    height: 4,
    width: 48,
    backgroundColor: Colors.primary,
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
    backgroundColor: Colors.outlineVariant + '33',
  },
  notificationGroup: {
    backgroundColor: Colors.surfaceContainer,
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
    color: Colors.onSurface,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  notificationDesc: {
    fontFamily: 'SpaceGrotesk',
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    marginTop: 4,
  },
  versionRow: {
    backgroundColor: Colors.surfaceContainer,
    paddingHorizontal: 24,
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  versionLabel: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 11,
    color: Colors.onSurface,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  versionValue: {
    fontFamily: 'JetBrainsMono',
    fontSize: 12,
    color: Colors.secondary,
  },
});
