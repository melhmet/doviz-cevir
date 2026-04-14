import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';

interface AmountInputProps {
  value: string;
  onChangeText: (text: string) => void;
  editable?: boolean;
}

export function AmountInput({ value, onChangeText, editable = true }: AmountInputProps) {
  const { colors } = useTheme();

  const handleChange = (text: string) => {
    // Allow only numbers, dots, and commas
    const cleaned = text.replace(/[^0-9.,]/g, '');
    onChangeText(cleaned);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          { color: colors.primary },
          !editable && { color: colors.onSurface },
        ]}
        value={value}
        onChangeText={handleChange}
        keyboardType="decimal-pad"
        editable={editable}
        selectionColor={colors.primary}
        placeholderTextColor={colors.outlineVariant}
        placeholder="0"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    fontFamily: 'JetBrainsMono-ExtraBold',
    fontSize: 42,
    textAlign: 'right',
    padding: 0,
    letterSpacing: -1,
  },
});
