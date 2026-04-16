import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/contexts/ThemeContext';
import { TopAppBar } from '@/components/common/TopAppBar';
import { ProgressLine } from '@/components/common/ProgressLine';
import { TickerTape } from '@/components/common/TickerTape';
import { MarketAnalysis } from '@/components/rates/MarketAnalysis';

export default function NewsScreen() {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.surfaceContainerLowest }]} edges={['top']}>
      <ProgressLine />
      <TopAppBar />
      <TickerTape />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <MarketAnalysis />
      </ScrollView>
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
});
