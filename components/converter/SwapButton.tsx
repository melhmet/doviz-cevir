import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';

interface SwapButtonProps {
  onPress: () => void;
}

export function SwapButton({ onPress }: SwapButtonProps) {
  return (
    <View style={styles.wrapper}>
      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
        onPress={onPress}
      >
        <MaterialIcons name="swap-vert" size={28} color={Colors.onPrimary} />
      </Pressable>
    </View>
  );
}

import { View } from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  button: {
    width: 56,
    height: 56,
    backgroundColor: '#00e6bf',
    alignItems: 'center',
    justifyContent: 'center',
    // Glow effect
    shadowColor: Colors.primaryContainer,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 10,
  },
  pressed: {
    transform: [{ scale: 0.95 }],
    backgroundColor: '#1affd5',
  },
});
