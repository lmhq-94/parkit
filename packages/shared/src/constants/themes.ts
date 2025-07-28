export const THEME_MODES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
} as const;

export type ThemeMode = typeof THEME_MODES[keyof typeof THEME_MODES];

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
