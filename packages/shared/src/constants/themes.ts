export const THEME_MODES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
} as const;

export type ThemeMode = (typeof THEME_MODES)[keyof typeof THEME_MODES];

export const THEME_NAMES = {
  [THEME_MODES.LIGHT]: 'Claro',
  [THEME_MODES.DARK]: 'Oscuro',
  [THEME_MODES.SYSTEM]: 'Sistema',
} as const;

export const THEME_ICONS = {
  [THEME_MODES.LIGHT]: '☀️',
  [THEME_MODES.DARK]: '🌙',
  [THEME_MODES.SYSTEM]: '🖥️',
} as const;

export const DEFAULT_THEME: ThemeMode = THEME_MODES.SYSTEM;

// Font families
export const FONT_FAMILIES = {
  PRIMARY:
    'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  SECONDARY:
    'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  MONOSPACE: 'SF Mono, Monaco, Inconsolata, "Roboto Mono", monospace',
} as const;

// Font weights
export const FONT_WEIGHTS = {
  THIN: 100,
  EXTRA_LIGHT: 200,
  LIGHT: 300,
  REGULAR: 400,
  MEDIUM: 500,
  SEMI_BOLD: 600,
  BOLD: 700,
  EXTRA_BOLD: 800,
  BLACK: 900,
} as const;

// Border radius
export const BORDER_RADIUS = {
  NONE: 0,
  SMALL: 4,
  MEDIUM: 8,
  LARGE: 12,
  XLARGE: 16,
  ROUND: 50,
} as const;

// Spacing
export const SPACING = {
  XS: 4,
  SM: 8,
  MD: 16,
  LG: 24,
  XL: 32,
  XXL: 48,
  XXXL: 64,
} as const;

// Shadows
export const SHADOWS = {
  NONE: 'none',
  SMALL: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
  MEDIUM: '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
  LARGE: '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)',
  XLARGE: '0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)',
} as const;

// Transitions
export const TRANSITIONS = {
  FAST: '150ms ease-in-out',
  NORMAL: '250ms ease-in-out',
  SLOW: '350ms ease-in-out',
} as const;
