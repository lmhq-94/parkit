import { ApolloProvider } from '@apollo/client';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';

import { AuthProvider } from './src/contexts/AuthContext';
import { LanguageProvider } from './src/contexts/LanguageContext';
import { ThemeProvider, useTheme } from './src/contexts/ThemeContext';
import { client } from './src/lib/apollo';

// Screens
import DashboardScreen from './src/screens/DashboardScreen';
import LoginScreen from './src/screens/LoginScreen';
import ParkingsScreen from './src/screens/ParkingsScreen';
import QRScannerScreen from './src/screens/QRScannerScreen';
import ReservationsScreen from './src/screens/ReservationsScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import VehiclesScreen from './src/screens/VehiclesScreen';

const Stack = createStackNavigator();

function AppContent() {
  const { theme, isDark } = useTheme();

  return (
    <PaperProvider theme={theme}>
      <AuthProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
              headerStyle: {
                backgroundColor: theme.colors.primary,
              },
              headerTintColor: theme.colors.onPrimary,
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          >
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Dashboard"
              component={DashboardScreen}
              options={{ title: 'Parkit - Dashboard' }}
            />
            <Stack.Screen
              name="Parkings"
              component={ParkingsScreen}
              options={{ title: 'Parqueos' }}
            />
            <Stack.Screen
              name="Reservations"
              component={ReservationsScreen}
              options={{ title: 'Reservas' }}
            />
            <Stack.Screen
              name="Vehicles"
              component={VehiclesScreen}
              options={{ title: 'Vehículos' }}
            />
                        <Stack.Screen
              name="QRScanner"
              component={QRScannerScreen}
              options={{ title: 'Escanear QR' }}
            />
            <Stack.Screen
              name="Settings"
              component={SettingsScreen}
              options={{ title: 'Configuración' }}
            />
          </Stack.Navigator>
          <StatusBar style={isDark ? 'light' : 'dark'} />
        </NavigationContainer>
      </AuthProvider>
    </PaperProvider>
  );
}

export default function App() {
  return (
    <ApolloProvider client={client}>
      <LanguageProvider>
        <ThemeProvider>
          <AppContent />
        </ThemeProvider>
      </LanguageProvider>
    </ApolloProvider>
  );
}
