import { createTheme, Theme } from '@mui/material/styles';

// Custom theme interface extending MUI Theme
export interface CustomTheme extends Theme {
  // Add custom theme properties here if needed
}

// Color palette constants
const colors = {
  primary: {
    main: '#3b82f6',
    light: '#60a5fa',
    dark: '#1d4ed8',
  },
  secondary: {
    main: '#8b5cf6',
    light: '#a78bfa',
    dark: '#7c3aed',
  },
  success: {
    main: '#10b981',
    light: '#34d399',
    dark: '#059669',
  },
  warning: {
    main: '#f59e0b',
    light: '#fbbf24',
    dark: '#d97706',
  },
  error: {
    main: '#ef4444',
    light: '#f87171',
    dark: '#dc2626',
  },
};

// Typography configuration
const typography = {
  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  h1: {
    fontWeight: 900,
    letterSpacing: '-0.02em',
  },
  h2: {
    fontWeight: 700,
    letterSpacing: '-0.01em',
  },
  h3: {
    fontWeight: 700,
    letterSpacing: '-0.01em',
  },
  h4: {
    fontWeight: 600,
  },
  h5: {
    fontWeight: 500,
  },
  h6: {
    fontWeight: 600,
  },
  body1: {
    lineHeight: 1.6,
  },
  body2: {
    lineHeight: 1.5,
  },
  button: {
    textTransform: 'none' as const,
    fontWeight: 600,
  },
};

// Component style overrides
const components = {
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: '12px',
        padding: '12px 24px',
        fontSize: '1rem',
        fontWeight: 600,
        textTransform: 'none' as const,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: '16px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease',
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        borderRadius: '12px',
      },
    },
  },
};

// Light theme configuration
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: colors.primary,
    secondary: colors.secondary,
    success: colors.success,
    warning: colors.warning,
    error: colors.error,
    background: {
      default: '#ffffff',
      paper: '#f8fafc',
    },
    text: {
      primary: '#111827',
      secondary: '#6b7280',
    },
  },
  typography,
  components,
  shape: {
    borderRadius: 12,
  },
});

// Dark theme configuration
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: colors.primary,
    secondary: colors.secondary,
    success: colors.success,
    warning: colors.warning,
    error: colors.error,
    background: {
      default: '#0f0f23',
      paper: '#1a1a2e',
    },
    text: {
      primary: '#ffffff',
      secondary: '#94a3b8',
    },
  },
  typography,
  components,
  shape: {
    borderRadius: 12,
  },
});

// Utility functions for theme management
export const getTheme = (mode: 'light' | 'dark') => {
  return mode === 'dark' ? darkTheme : lightTheme;
};

// Common gradient styles
export const gradients = {
  primary: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
  secondary: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
  success: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
  warning: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
  error: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
};

// Common animation keyframes
export const keyframes = {
  float: {
    '0%, 100%': { transform: 'translateY(0px)' },
    '50%': { transform: 'translateY(-20px)' },
  },
  pulse: {
    '0%, 100%': { opacity: 1 },
    '50%': { opacity: 0.5 },
  },
  shimmer: {
    '0%': { transform: 'translateX(-100%)' },
    '100%': { transform: 'translateX(100%)' },
  },
}; 