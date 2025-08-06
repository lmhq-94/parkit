'use client';

import React, { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { themes, ThemeType } from '../theme';
import '../i18n'; // Importar configuración de i18n
import i18n from 'i18next';

// QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Context for theme management
interface ThemeContextType {
  currentTheme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

export const ThemeContext = React.createContext<ThemeContextType>({
  currentTheme: 'default',
  setTheme: () => {},
});

// Provider principal
export const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeType>('default');

  useEffect(() => {
    // Detect system theme preference
    const getSystemTheme = (): ThemeType => {
      if (typeof window !== 'undefined') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      return 'default';
    };

    // Detect system language preference
    const getSystemLanguage = (): string => {
      if (typeof window !== 'undefined') {
        const systemLang = navigator.language || navigator.languages?.[0] || 'es';
        return systemLang.startsWith('en') ? 'en' : 'es';
      }
      return 'es';
    };

    // Load theme from localStorage or use system preference
    const savedTheme = localStorage.getItem('theme') as ThemeType;
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme);
    } else {
      const systemTheme = getSystemTheme();
      setCurrentTheme(systemTheme);
      localStorage.setItem('theme', systemTheme);
    }

    // Load language from localStorage or use system preference
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    } else {
      const systemLanguage = getSystemLanguage();
      localStorage.setItem('language', systemLanguage);
      i18n.changeLanguage(systemLanguage);
    }

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleThemeChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        const newTheme = e.matches ? 'dark' : 'light';
        setCurrentTheme(newTheme);
        localStorage.setItem('theme', newTheme);
      }
    };

    mediaQuery.addEventListener('change', handleThemeChange);

    return () => {
      mediaQuery.removeEventListener('change', handleThemeChange);
    };
  }, []);

  const setTheme = (theme: ThemeType) => {
    setCurrentTheme(theme);
    localStorage.setItem('theme', theme);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeContext.Provider value={{ currentTheme, setTheme }}>
        <ThemeProvider theme={themes[currentTheme]}>
          <CssBaseline />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            {children}
          </LocalizationProvider>
        </ThemeProvider>
      </ThemeContext.Provider>
    </QueryClientProvider>
  );
}; 