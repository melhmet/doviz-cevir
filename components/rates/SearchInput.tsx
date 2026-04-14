import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@/contexts/ThemeContext';

interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export function SearchInput({ value, onChangeText, placeholder = 'SEMBOLLERDE ARA...' }: SearchInputProps) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { borderBottomColor: colors.outline }]}>
      <MaterialIcons name="search" size={22} color={colors.outline} style={styles.icon} />
      <TextInput
        style={[styles.input, { color: colors.onSurface }]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.outlineVariant}
        selectionColor={colors.primary}
        autoCapitalize="characters"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingBottom: 12,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontFamily: 'JetBrainsMono',
    fontSize: 13,
    letterSpacing: 1,
    textTransform: 'uppercase',
    padding: 0,
  },
});
