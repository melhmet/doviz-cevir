import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';

export function TopAppBar() {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <MaterialIcons name="terminal" size={24} color={Colors.primary} />
        <Text style={styles.title}>DÖVİZÇEVİR</Text>
      </View>
      <Pressable
        style={({ pressed }) => [styles.iconButton, pressed && styles.iconButtonPressed]}
      >
        <MaterialIcons
          name="account-balance-wallet"
          size={24}
          color={Colors.onSurfaceVariant}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    backgroundColor: Colors.surfaceContainerLowest,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 18,
    color: Colors.primary,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  iconButton: {
    padding: 8,
  },
  iconButtonPressed: {
    opacity: 0.6,
  },
});
