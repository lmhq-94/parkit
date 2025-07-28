import {
    getSystemThemePreference,
    ThemeMode
} from '@parkit/shared';
import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';

// Light theme for React Native Paper
export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#1976d2',
    onPrimary: '#ffffff',
    primaryContainer: '#d1e4ff',
    onPrimaryContainer: '#001d36',
    secondary: '#dc004e',
    onSecondary: '#ffffff',
    secondaryContainer: '#ffdad9',
    onSecondaryContainer: '#410002',
    tertiary: '#006c4c',
    onTertiary: '#ffffff',
    tertiaryContainer: '#89f8c7',
    onTertiaryContainer: '#002114',
    error: '#ba1a1a',
    onError: '#ffffff',
    errorContainer: '#ffdad6',
    onErrorContainer: '#410002',
    background: '#fdfcff',
    onBackground: '#1a1c1e',
    surface: '#fdfcff',
    onSurface: '#1a1c1e',
    surfaceVariant: '#dfe2eb',
    onSurfaceVariant: '#43474e',
    outline: '#73777f',
    outlineVariant: '#c3c7cf',
    shadow: '#000000',
    scrim: '#000000',
    inverseSurface: '#2f3033',
    inverseOnSurface: '#f1f0f4',
    inversePrimary: '#9fccff',
    elevation: {
      level0: 'transparent',
      level1: '#fdfcff',
      level2: '#faf8ff',
      level3: '#f6f4ff',
      level4: '#f3f1ff',
      level5: '#f0eeff',
    },
  },
};

// Dark theme for React Native Paper
export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#9fccff',
    onPrimary: '#003258',
    primaryContainer: '#004881',
    onPrimaryContainer: '#d1e4ff',
    secondary: '#ffb3b8',
    onSecondary: '#680003',
    secondaryContainer: '#93000c',
    onSecondaryContainer: '#ffdad9',
    tertiary: '#6cdbac',
    onTertiary: '#003826',
    tertiaryContainer: '#005138',
    onTertiaryContainer: '#89f8c7',
    error: '#ffb4ab',
    onError: '#690005',
    errorContainer: '#93000a',
    onErrorContainer: '#ffdad6',
    background: '#1a1c1e',
    onBackground: '#e2e2e6',
    surface: '#1a1c1e',
    onSurface: '#e2e2e6',
    surfaceVariant: '#43474e',
    onSurfaceVariant: '#c3c7cf',
    outline: '#8d9199',
    outlineVariant: '#43474e',
    shadow: '#000000',
    scrim: '#000000',
    inverseSurface: '#e2e2e6',
    inverseOnSurface: '#1a1c1e',
    inversePrimary: '#0068a1',
    elevation: {
      level0: 'transparent',
      level1: '#1a1c1e',
      level2: '#2f3033',
      level3: '#454749',
      level4: '#5c5e61',
      level5: '#73777f',
    },
  },
};

// Get theme based on mode
export function getMobileTheme(mode: ThemeMode = 'system'): typeof lightTheme {
  const systemPrefersDark = getSystemThemePreference();

  if (mode === 'dark' || (mode === 'system' && systemPrefersDark)) {
    return darkTheme;
  }

  return lightTheme;
}

// Default theme (will be overridden by context)
export const theme = lightTheme;
