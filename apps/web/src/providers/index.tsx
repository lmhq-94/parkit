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
    // Load theme from localStorage on mount
    const savedTheme = localStorage.getItem('theme') as ThemeType;
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme);
    } else {
      // Set default theme if none saved
      localStorage.setItem('theme', 'default');
    }

    // Load language from localStorage on mount
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    } else {
      // Set default language if none saved
      localStorage.setItem('language', 'es');
      i18n.changeLanguage('es');
    }
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