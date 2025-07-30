import { ApolloProvider } from '@apollo/client';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

import { NAVIGATION_TEXTS } from './src/constants/texts';
import { AuthProvider } from './src/contexts/AuthContext';
import { LanguageProvider } from './src/contexts/LanguageContext';
import { ThemeProvider, useTheme } from './src/contexts/ThemeContext';
import { useFonts } from './src/hooks/useFonts';
import { client } from './src/lib/apollo';
import { typography } from './src/theme/fonts';

// Screens
import DashboardScreen from './src/screens/DashboardScreen/DashboardScreen';
import LoginScreen from './src/screens/LoginScreen/LoginScreen';
import ParkingsScreen from './src/screens/ParkingsScreen/ParkingsScreen';
import QRScannerScreen from './src/screens/QRScannerScreen/QRScannerScreen';
import ReservationsScreen from './src/screens/ReservationsScreen/ReservationsScreen';
import SettingsScreen from './src/screens/SettingsScreen/SettingsScreen';
import SplashScreen from './src/screens/SplashScreen/SplashScreen';
import VehiclesScreen from './src/screens/VehiclesScreen/VehiclesScreen';

const Stack = createStackNavigator();

function AppContent() {
  const { theme, isDark } = useTheme();
  const { fontsLoaded, fontError } = useFonts();

  // Show loading screen while fonts are loading
  if (!fontsLoaded) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f8fafc',
        }}
      >
        <Text style={[typography.h2, { color: '#1a1a1a' }]}>
          Cargando Parkit...
        </Text>
      </View>
    );
  }

  // Show error screen if fonts failed to load
  if (fontError) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f8fafc',
        }}
      >
        <Text style={[typography.h2, { color: '#e74c3c' }]}>
          Error al cargar la aplicación
        </Text>
        <Text style={[typography.body1, { color: '#666666', marginTop: 8 }]}>
          Por favor, reinicia la aplicación
        </Text>
      </View>
    );
  }

  return (
    <PaperProvider theme={theme}>
      <AuthProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName='Splash'
            screenOptions={{
              headerStyle: {
                backgroundColor: theme.colors.primary,
              },
              headerTintColor: theme.colors.onPrimary,
              headerTitleStyle: {
                ...typography.h6,
                color: theme.colors.onPrimary,
              },
            }}
          >
            <Stack.Screen
              name='Splash'
              component={SplashScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='Login'
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='Dashboard'
              component={DashboardScreen}
              options={{ title: NAVIGATION_TEXTS.DASHBOARD_TITLE }}
            />
            <Stack.Screen
              name='Parkings'
              component={ParkingsScreen}
              options={{ title: NAVIGATION_TEXTS.PARKINGS_TITLE }}
            />
            <Stack.Screen
              name='Reservations'
              component={ReservationsScreen}
              options={{ title: NAVIGATION_TEXTS.RESERVATIONS_TITLE }}
            />
            <Stack.Screen
              name='Vehicles'
              component={VehiclesScreen}
              options={{ title: NAVIGATION_TEXTS.VEHICLES_TITLE }}
            />
            <Stack.Screen
              name='QRScanner'
              component={QRScannerScreen}
              options={{ title: NAVIGATION_TEXTS.QR_SCANNER_TITLE }}
            />
            <Stack.Screen
              name='Settings'
              component={SettingsScreen}
              options={{ title: NAVIGATION_TEXTS.SETTINGS_TITLE }}
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

// Register the component for Expo
import { registerRootComponent } from 'expo';
registerRootComponent(App);
