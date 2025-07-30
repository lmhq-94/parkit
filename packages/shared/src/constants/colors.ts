// Color palette for Parkit application
export const COLORS = {
  // Primary brand colors
  PRIMARY: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6', // Main primary
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },

  // Secondary brand colors
  SECONDARY: {
    50: '#fdf4ff',
    100: '#fae8ff',
    200: '#f5d0fe',
    300: '#f0abfc',
    400: '#e879f9',
    500: '#d946ef', // Main secondary
    600: '#c026d3',
    700: '#a21caf',
    800: '#86198f',
    900: '#701a75',
  },

  // Success colors
  SUCCESS: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e', // Main success
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },

  // Warning colors
  WARNING: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b', // Main warning
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },

  // Error colors
  ERROR: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444', // Main error
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },

  // Info colors
  INFO: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6', // Main info
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },

  // Neutral colors
  NEUTRAL: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },

  // Gray colors
  GRAY: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },

  // Special colors
  TRANSPARENT: 'transparent',
  WHITE: '#ffffff',
  BLACK: '#000000',
} as const;

// Light theme color mapping
export const LIGHT_COLORS = {
  // Background colors
  background: {
    primary: COLORS.WHITE,
    secondary: COLORS.GRAY[50],
    tertiary: COLORS.GRAY[100],
    overlay: 'rgba(0, 0, 0, 0.5)',
    modal: COLORS.WHITE,
  },

  // Surface colors
  surface: {
    primary: COLORS.WHITE,
    secondary: COLORS.GRAY[50],
    tertiary: COLORS.GRAY[100],
    elevated: COLORS.WHITE,
    card: COLORS.WHITE,
  },

  // Text colors
  text: {
    primary: COLORS.GRAY[900],
    secondary: COLORS.GRAY[600],
    tertiary: COLORS.GRAY[500],
    disabled: COLORS.GRAY[400],
    inverse: COLORS.WHITE,
    link: COLORS.PRIMARY[600],
  },

  // Border colors
  border: {
    primary: COLORS.GRAY[200],
    secondary: COLORS.GRAY[300],
    focus: COLORS.PRIMARY[500],
    error: COLORS.ERROR[500],
    success: COLORS.SUCCESS[500],
  },

  // Input colors
  input: {
    background: COLORS.WHITE,
    border: COLORS.GRAY[300],
    placeholder: COLORS.GRAY[400],
    focus: COLORS.PRIMARY[500],
    error: COLORS.ERROR[500],
    success: COLORS.SUCCESS[500],
  },

  // Button colors
  button: {
    primary: {
      background: COLORS.PRIMARY[500],
      text: COLORS.WHITE,
      border: COLORS.PRIMARY[500],
      hover: COLORS.PRIMARY[600],
      active: COLORS.PRIMARY[700],
      disabled: COLORS.GRAY[300],
    },
    secondary: {
      background: COLORS.WHITE,
      text: COLORS.GRAY[700],
      border: COLORS.GRAY[300],
      hover: COLORS.GRAY[50],
      active: COLORS.GRAY[100],
      disabled: COLORS.GRAY[200],
    },
    ghost: {
      background: COLORS.TRANSPARENT,
      text: COLORS.PRIMARY[600],
      border: COLORS.TRANSPARENT,
      hover: COLORS.PRIMARY[50],
      active: COLORS.PRIMARY[100],
      disabled: COLORS.GRAY[300],
    },
  },

  // Status colors
  status: {
    success: COLORS.SUCCESS[500],
    warning: COLORS.WARNING[500],
    error: COLORS.ERROR[500],
    info: COLORS.INFO[500],
  },

  // Shadow colors
  shadow: {
    light: 'rgba(0, 0, 0, 0.05)',
    medium: 'rgba(0, 0, 0, 0.1)',
    heavy: 'rgba(0, 0, 0, 0.2)',
  },
} as const;

// Dark theme color mapping
export const DARK_COLORS = {
  // Background colors
  background: {
    primary: COLORS.GRAY[900],
    secondary: COLORS.GRAY[800],
    tertiary: COLORS.GRAY[700],
    overlay: 'rgba(0, 0, 0, 0.7)',
    modal: COLORS.GRAY[800],
  },

  // Surface colors
  surface: {
    primary: COLORS.GRAY[800],
    secondary: COLORS.GRAY[700],
    tertiary: COLORS.GRAY[600],
    elevated: COLORS.GRAY[700],
    card: COLORS.GRAY[800],
  },

  // Text colors
  text: {
    primary: COLORS.GRAY[100],
    secondary: COLORS.GRAY[300],
    tertiary: COLORS.GRAY[400],
    disabled: COLORS.GRAY[500],
    inverse: COLORS.GRAY[900],
    link: COLORS.PRIMARY[400],
  },

  // Border colors
  border: {
    primary: COLORS.GRAY[700],
    secondary: COLORS.GRAY[600],
    focus: COLORS.PRIMARY[400],
    error: COLORS.ERROR[400],
    success: COLORS.SUCCESS[400],
  },

  // Input colors
  input: {
    background: COLORS.GRAY[800],
    border: COLORS.GRAY[600],
    placeholder: COLORS.GRAY[500],
    focus: COLORS.PRIMARY[400],
    error: COLORS.ERROR[400],
    success: COLORS.SUCCESS[400],
  },

  // Button colors
  button: {
    primary: {
      background: COLORS.PRIMARY[500],
      text: COLORS.WHITE,
      border: COLORS.PRIMARY[500],
      hover: COLORS.PRIMARY[600],
      active: COLORS.PRIMARY[700],
      disabled: COLORS.GRAY[600],
    },
    secondary: {
      background: COLORS.GRAY[700],
      text: COLORS.GRAY[100],
      border: COLORS.GRAY[600],
      hover: COLORS.GRAY[600],
      active: COLORS.GRAY[500],
      disabled: COLORS.GRAY[700],
    },
    ghost: {
      background: COLORS.TRANSPARENT,
      text: COLORS.PRIMARY[400],
      border: COLORS.TRANSPARENT,
      hover: COLORS.GRAY[700],
      active: COLORS.GRAY[600],
      disabled: COLORS.GRAY[600],
    },
  },

  // Status colors
  status: {
    success: COLORS.SUCCESS[400],
    warning: COLORS.WARNING[400],
    error: COLORS.ERROR[400],
    info: COLORS.INFO[400],
  },

  // Shadow colors
  shadow: {
    light: 'rgba(0, 0, 0, 0.3)',
    medium: 'rgba(0, 0, 0, 0.5)',
    heavy: 'rgba(0, 0, 0, 0.7)',
  },
} as const;
