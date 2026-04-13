import React from 'react';
import { Tabs } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';

function TabIcon({ name, color, focused }: { name: string; color: string; focused: boolean }) {
  return (
    <View style={[styles.tabItem, focused && styles.tabItemActive]}>
      <MaterialIcons name={name as any} size={24} color={color} />
    </View>
  );
}

function TabLabel({ label, color }: { label: string; color: string }) {
  return <Text style={[styles.tabLabel, { color }]}>{label}</Text>;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.onSurfaceVariant,
        tabBarActiveBackgroundColor: 'transparent',
        tabBarInactiveBackgroundColor: 'transparent',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Convert',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="currency-exchange" color={color} focused={focused} />
          ),
          tabBarLabel: ({ color }) => <TabLabel label="CONVERT" color={color} />,
        }}
      />
      <Tabs.Screen
        name="rates"
        options={{
          title: 'Markets',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="monitoring" color={color} focused={focused} />
          ),
          tabBarLabel: ({ color }) => <TabLabel label="MARKETS" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="settings-input-component" color={color} focused={focused} />
          ),
          tabBarLabel: ({ color }) => <TabLabel label="SETTINGS" color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderTopWidth: 1,
    borderTopColor: Colors.outlineVariant + '33', // 20% opacity
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
    borderTopColor: Colors.primary,
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
