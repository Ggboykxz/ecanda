import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../src/constants/theme';

export default function DeliveryLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray500,
        tabBarStyle: {
          backgroundColor: COLORS.white,
          borderTopWidth: 0,
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.1,
          shadowRadius: 12,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '500' },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="map"
        options={{ title: 'Carte', tabBarIcon: ({ color, size }) => <Ionicons name="map" size={size} color={color} /> }}
      />
      <Tabs.Screen
        name="deliveries"
        options={{ title: 'Livraisons', tabBarIcon: ({ color, size }) => <Ionicons name="bicycle" size={size} color={color} /> }}
      />
      <Tabs.Screen
        name="earnings"
        options={{ title: 'Gains', tabBarIcon: ({ color, size }) => <Ionicons name="wallet" size={size} color={color} /> }}
      />
    </Tabs>
  );
}