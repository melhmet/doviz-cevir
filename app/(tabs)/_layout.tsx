import React from 'react';
import { Tabs } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@/contexts/ThemeContext';

function TabIcon({ name, color, focused, activeColor }: { name: string; color: string; focused: boolean; activeColor: string }) {
  return (
    <View style={[styles.tabItem, focused && [styles.tabItemActive, { borderTopColor: activeColor }]]}>
      <MaterialIcons name={name as any} size={24} color={color} />
    </View>
  );
}

function TabLabel({ label, color }: { label: string; color: string }) {
  return <Text style={[styles.tabLabel, { color }]}>{label}</Text>;
}

export default function TabLayout() {
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: [styles.tabBar, {
          backgroundColor: colors.surfaceContainerLowest,
          borderTopColor: colors.outlineVariant + '33',
        }],
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.onSurfaceVariant,
        tabBarActiveBackgroundColor: 'transparent',
        tabBarInactiveBackgroundColor: 'transparent',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Convert',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="currency-exchange" color={color} focused={focused} activeColor={colors.primary} />
          ),
          tabBarLabel: ({ color }) => <TabLabel label="CONVERT" color={color} />,
        }}
      />
      <Tabs.Screen
        name="rates"
        options={{
          title: 'Markets',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="show-chart" color={color} focused={focused} activeColor={colors.primary} />
          ),
          tabBarLabel: ({ color }) => <TabLabel label="MARKETS" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="settings-input-component" color={color} focused={focused} activeColor={colors.primary} />
          ),
          tabBarLabel: ({ color }) => <TabLabel label="SETTINGS" color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    borderTopWidth: 1,
    height: 70,
    paddingBottom: 8,
    paddingTop: 8,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabItemActive: {
    borderTopWidth: 2,
    paddingTop: 2,
    marginTop: -10,
  },
  tabLabel: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 9,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
});
