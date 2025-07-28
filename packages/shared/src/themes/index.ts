import { createTheme, Theme } from '@mui/material/styles';
import { ThemeMode } from '../constants/themes';

// Light theme colors
const lightColors = {
  primary: {
    main: '#1976d2',
    light: '#42a5f5',
    dark: '#1565c0',
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#dc004e',
    light: '#ff5983',
    dark: '#9a0036',
    contrastText: '#ffffff',
  },
  background: {
    default: '#f5f5f5',
    paper: '#ffffff',
  },
  text: {
    primary: '#212121',
    secondary: '#757575',
  },
  divider: '#e0e0e0',
  success: {
    main: '#4caf50',
    light: '#81c784',
    dark: '#388e3c',
  },
  warning: {
    main: '#ff9800',
    light: '#ffb74d',
    dark: '#f57c00',
  },
  error: {
    main: '#f44336',
    light: '#e57373',
    dark: '#d32f2f',
  },
  info: {
    main: '#2196f3',
    light: '#64b5f6',
    dark: '#1976d2',
  },
};

// Dark theme colors
const darkColors = {
  primary: {
    main: '#90caf9',
    light: '#e3f2fd',
    dark: '#42a5f5',
    contrastText: '#000000',
  },
  secondary: {
    main: '#f48fb1',
    light: '#f8bbd9',
    dark: '#ec407a',
    contrastText: '#000000',
  },
  background: {
    default: '#121212',
    paper: '#1e1e1e',
  },
  text: {
    primary: '#ffffff',
    secondary: '#b3b3b3',
  },
  divider: '#424242',
  success: {
    main: '#66bb6a',
    light: '#98ee99',
    dark: '#388e3c',
  },
  warning: {
    main: '#ffa726',
    light: '#ffd54f',
    dark: '#f57c00',
  },
  error: {
    main: '#f44336',
    light: '#e57373',
    dark: '#d32f2f',
  },
  info: {
    main: '#29b6f6',
    light: '#73e8ff',
    dark: '#0288d1',
  },
};

// Common theme configuration
const commonTheme = {
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
  },
};

// Create light theme
export const lightTheme = createTheme({
  ...commonTheme,
  palette: {
    mode: 'light',
    ...lightColors,
  },
});

// Create dark theme
export const darkTheme = createTheme({
  ...commonTheme,
  palette: {
    mode: 'dark',
    ...darkColors,
  },
});

// Theme mapping
export const themes: Record<ThemeMode, Theme> = {
  light: lightTheme,
  dark: darkTheme,
  system: lightTheme, // Will be determined dynamically
};

// Get theme based on mode and system preference
export function getTheme(mode: ThemeMode, prefersDark: boolean = false): Theme {
  if (mode === 'system') {
    return prefersDark ? darkTheme : lightTheme;
  }
  return themes[mode];
}

// Get system preference
export function getSystemThemePreference(): boolean {
  if (typeof globalThis !== 'undefined' && 'window' in globalThis) {
    return (globalThis as any).window.matchMedia('(prefers-color-scheme: dark)')
      .matches;
  }
  return false;
}
