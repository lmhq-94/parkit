import { DEFAULT_THEME, ThemeMode, getTheme } from '@parkit/shared';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useColorScheme } from 'react-native';
import { MD3Theme } from 'react-native-paper';

interface ThemeContextType {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  theme: MD3Theme;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [themeMode, setThemeModeState] = useState<ThemeMode>(DEFAULT_THEME);
  const colorScheme = useColorScheme();

  // Load theme from AsyncStorage on mount
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = (await AsyncStorage.getItem(
          'parkit-theme'
        )) as ThemeMode;
        if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
          setThemeModeState(savedTheme);
        }
      } catch (error) {
        console.warn('Error loading theme:', error);
      }
    };

    loadTheme();
  }, []);

  const setThemeMode = async (mode: ThemeMode) => {
    try {
      setThemeModeState(mode);
      await AsyncStorage.setItem('parkit-theme', mode);
    } catch (error) {
      console.warn('Error saving theme:', error);
    }
  };

  // Get current theme based on mode and system preference
  const systemPrefersDark = colorScheme === 'dark';
  const isDark =
    themeMode === 'dark' || (themeMode === 'system' && systemPrefersDark);

  // Create theme based on current mode
  const theme = getTheme(themeMode, systemPrefersDark);

  const value: ThemeContextType = {
    themeMode,
    setThemeMode,
    theme: theme as unknown as MD3Theme,
    isDark,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
