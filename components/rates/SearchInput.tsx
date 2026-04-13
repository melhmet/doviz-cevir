import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';

interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export function SearchInput({ value, onChangeText, placeholder = 'SEMBOLLERDE ARA...' }: SearchInputProps) {
  return (
    <View style={styles.container}>
      <MaterialIcons name="search" size={22} color={Colors.outline} style={styles.icon} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.outlineVariant}
        selectionColor={Colors.primary}
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
    borderBottomColor: Colors.outline,
    paddingBottom: 12,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontFamily: 'JetBrainsMono',
    fontSize: 13,
    color: Colors.onSurface,
    letterSpacing: 1,
    textTransform: 'uppercase',
    padding: 0,
  },
});
