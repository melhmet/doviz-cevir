import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';

export function MarketAnalysis() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.textBlock}>
          <Text style={styles.title}>Piyasa Analizi</Text>
          <Text style={styles.body}>
            Merkez Bankası verilerine göre bugün piyasalarda volatilitenin düşük seyretmesi bekleniyor.{' '}
            <Text style={styles.highlight}>USD/TRY</Text> paritesi teknik direnç seviyesi olan{' '}
            <Text style={styles.mono}>32.60</Text> bölgesini test edebilir.
          </Text>
        </View>
        <View style={styles.iconBox}>
          <MaterialIcons name="query-stats" size={32} color={Colors.primary} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: Colors.primary + '1A', // 10%
    backgroundColor: Colors.surfaceContainerLowest,
    padding: 24,
  },
  content: {
    flexDirection: 'row',
    gap: 20,
  },
  textBlock: {
    flex: 1,
  },
  title: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 11,
    color: Colors.primary,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  body: {
    fontFamily: 'SpaceGrotesk',
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    lineHeight: 20,
  },
  highlight: {
    fontFamily: 'JetBrainsMono-Bold',
    color: Colors.primary,
  },
  mono: {
    fontFamily: 'JetBrainsMono',
  },
  iconBox: {
    width: 64,
    height: 64,
    borderWidth: 1,
    borderColor: Colors.primary + '33',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
