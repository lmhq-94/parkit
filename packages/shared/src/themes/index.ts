import { createTheme, Theme } from '@mui/material/styles';
import { COLORS, DARK_COLORS, LIGHT_COLORS } from '../constants/colors';
import {
  BORDER_RADIUS,
  FONT_FAMILIES,
  FONT_WEIGHTS,
  SHADOWS,
  SPACING,
  ThemeMode,
  TRANSITIONS,
} from '../constants/themes';
import {
  getTypographyStyles,
  TYPOGRAPHY_VARIANTS,
} from '../constants/typography';

// Base theme configuration
const baseTheme = {
  // Typography
  typography: {
    fontFamily: FONT_FAMILIES.PRIMARY,
    // Map typography variants to MUI typography
    h1: getTypographyStyles('h1'),
    h2: getTypographyStyles('h2'),
    h3: getTypographyStyles('h3'),
    h4: getTypographyStyles('h4'),
    h5: getTypographyStyles('h5'),
    h6: getTypographyStyles('h6'),
    body1: getTypographyStyles('body1'),
    body2: getTypographyStyles('body2'),
    button: getTypographyStyles('button'),
    caption: getTypographyStyles('caption'),
    overline: getTypographyStyles('overline'),
  },

  // Shape
  shape: {
    borderRadius: BORDER_RADIUS.MEDIUM,
  },

  // Spacing
  spacing: (factor: number) => SPACING.MD * factor,

  // Shadows - Using default MUI shadows
  shadows: undefined,

  // Transitions
  transitions: {
    create: (props: string | string[], options?: any) => {
      const duration = options?.duration || 250;
      const easing = options?.easing || 'ease-in-out';
      return `${props} ${duration}ms ${easing}`;
    },
    easing: {
      easeInOut: 'ease-in-out',
      easeOut: 'ease-out',
      easeIn: 'ease-in',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
  },

  // Components
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: BORDER_RADIUS.LARGE,
          boxShadow: SHADOWS.SMALL,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: BORDER_RADIUS.MEDIUM,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: BORDER_RADIUS.XLARGE,
        },
      },
    },
  },
};

// Light theme
export const lightTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: 'light',
    primary: {
      main: COLORS.PRIMARY[500],
      light: COLORS.PRIMARY[400],
      dark: COLORS.PRIMARY[600],
      contrastText: COLORS.WHITE,
    },
    secondary: {
      main: COLORS.SECONDARY[500],
      light: COLORS.SECONDARY[400],
      dark: COLORS.SECONDARY[600],
      contrastText: COLORS.WHITE,
    },
    success: {
      main: COLORS.SUCCESS[500],
      light: COLORS.SUCCESS[400],
      dark: COLORS.SUCCESS[600],
    },
    warning: {
      main: COLORS.WARNING[500],
      light: COLORS.WARNING[400],
      dark: COLORS.WARNING[600],
    },
    error: {
      main: COLORS.ERROR[500],
      light: COLORS.ERROR[400],
      dark: COLORS.ERROR[600],
    },
    info: {
      main: COLORS.INFO[500],
      light: COLORS.INFO[400],
      dark: COLORS.INFO[600],
    },
    background: {
      default: LIGHT_COLORS.background.primary,
      paper: LIGHT_COLORS.surface.primary,
    },
    text: {
      primary: LIGHT_COLORS.text.primary,
      secondary: LIGHT_COLORS.text.secondary,
    },
    divider: LIGHT_COLORS.border.primary,
  },
});

// Dark theme
export const darkTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: 'dark',
    primary: {
      main: COLORS.PRIMARY[400],
      light: COLORS.PRIMARY[300],
      dark: COLORS.PRIMARY[500],
      contrastText: COLORS.BLACK,
    },
    secondary: {
      main: COLORS.SECONDARY[400],
      light: COLORS.SECONDARY[300],
      dark: COLORS.SECONDARY[500],
      contrastText: COLORS.BLACK,
    },
    success: {
      main: COLORS.SUCCESS[400],
      light: COLORS.SUCCESS[300],
      dark: COLORS.SUCCESS[500],
    },
    warning: {
      main: COLORS.WARNING[400],
      light: COLORS.WARNING[300],
      dark: COLORS.WARNING[500],
    },
    error: {
      main: COLORS.ERROR[400],
      light: COLORS.ERROR[300],
      dark: COLORS.ERROR[500],
    },
    info: {
      main: COLORS.INFO[400],
      light: COLORS.INFO[300],
      dark: COLORS.INFO[500],
    },
    background: {
      default: DARK_COLORS.background.primary,
      paper: DARK_COLORS.surface.primary,
    },
    text: {
      primary: DARK_COLORS.text.primary,
      secondary: DARK_COLORS.text.secondary,
    },
    divider: DARK_COLORS.border.primary,
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

// React Native theme adapter
export interface ReactNativeTheme {
  colors: {
    primary: string;
    secondary: string;
    background: {
      primary: string;
      secondary: string;
      tertiary: string;
    };
    surface: {
      primary: string;
      secondary: string;
      elevated: string;
    };
    text: {
      primary: string;
      secondary: string;
      tertiary: string;
      disabled: string;
      inverse: string;
    };
    border: {
      primary: string;
      secondary: string;
      focus: string;
    };
    input: {
      background: string;
      border: string;
      placeholder: string;
      focus: string;
    };
    button: {
      primary: {
        background: string;
        text: string;
        border: string;
      };
      secondary: {
        background: string;
        text: string;
        border: string;
      };
      ghost: {
        background: string;
        text: string;
        border: string;
      };
    };
    status: {
      success: string;
      warning: string;
      error: string;
      info: string;
    };
  };
  typography: typeof TYPOGRAPHY_VARIANTS;
  spacing: typeof SPACING;
  borderRadius: typeof BORDER_RADIUS;
  shadows: typeof SHADOWS;
  transitions: typeof TRANSITIONS;
}

// Create React Native theme
export function createReactNativeTheme(
  mode: ThemeMode,
  prefersDark: boolean = false
): ReactNativeTheme {
  const isDark = mode === 'dark' || (mode === 'system' && prefersDark);
  const colors = isDark ? DARK_COLORS : LIGHT_COLORS;

  return {
    colors: {
      primary: COLORS.PRIMARY[500],
      secondary: COLORS.SECONDARY[500],
      background: colors.background,
      surface: colors.surface,
      text: colors.text,
      border: colors.border,
      input: colors.input,
      button: colors.button,
      status: colors.status,
    },
    typography: TYPOGRAPHY_VARIANTS,
    spacing: SPACING,
    borderRadius: BORDER_RADIUS,
    shadows: SHADOWS,
    transitions: TRANSITIONS,
  };
}

// Export theme utilities
export { COLORS, DARK_COLORS, LIGHT_COLORS } from '../constants/colors';
export {
  BORDER_RADIUS,
  FONT_FAMILIES,
  FONT_WEIGHTS,
  SHADOWS,
  SPACING,
  TRANSITIONS,
} from '../constants/themes';
export {
  getTypographyStyles,
  TYPOGRAPHY_VARIANTS,
} from '../constants/typography';
