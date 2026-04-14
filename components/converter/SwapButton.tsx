import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@/contexts/ThemeContext';

interface SwapButtonProps {
  onPress: () => void;
}

export function SwapButton({ onPress }: SwapButtonProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.wrapper}>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          {
            backgroundColor: colors.primaryContainer,
            shadowColor: colors.primaryContainer,
          },
          pressed && { transform: [{ scale: 0.95 }], backgroundColor: colors.primary },
        ]}
        onPress={onPress}
      >
        <MaterialIcons name="swap-vert" size={28} color={colors.onPrimary} />
      </Pressable>
    </View>
  );
}

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
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 10,
  },
});
