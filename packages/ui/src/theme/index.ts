import { createTheme, Theme } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';

// Definición de paletas de colores
export const colorPalettes = {
  ocean: {
    primary: {
      main: '#0066CC',
      light: '#4D94FF',
      dark: '#004499',
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: '#00BFFF',
      light: '#66D9FF',
      dark: '#0080CC',
      contrastText: '#FFFFFF'
    },
    accent: {
      main: '#00CED1',
      light: '#66E6E8',
      dark: '#00999C'
    }
  },
  sunset: {
    primary: {
      main: '#FF6B35',
      light: '#FF8A5C',
      dark: '#CC4A1A',
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: '#FF8E53',
      light: '#FFB380',
      dark: '#CC6A2A',
      contrastText: '#FFFFFF'
    },
    accent: {
      main: '#FFB347',
      light: '#FFC675',
      dark: '#CC8F2A'
    }
  },
  forest: {
    primary: {
      main: '#2E7D32',
      light: '#4CAF50',
      dark: '#1B5E20',
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: '#66BB6A',
      light: '#81C784',
      dark: '#388E3C',
      contrastText: '#FFFFFF'
    },
    accent: {
      main: '#8BC34A',
      light: '#9CCC65',
      dark: '#689F38'
    }
  },
  royal: {
    primary: {
      main: '#6A1B9A',
      light: '#9C27B0',
      dark: '#4A148C',
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: '#AB47BC',
      light: '#BA68C8',
      dark: '#8E24AA',
      contrastText: '#FFFFFF'
    },
    accent: {
      main: '#E1BEE7',
      light: '#F3E5F5',
      dark: '#C2185B'
    }
  },
  midnight: {
    primary: {
      main: '#1A237E',
      light: '#3F51B5',
      dark: '#0D47A1',
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: '#5C6BC0',
      light: '#7986CB',
      dark: '#3949AB',
      contrastText: '#FFFFFF'
    },
    accent: {
      main: '#9FA8DA',
      light: '#C5CAE9',
      dark: '#5E35B1'
    }
  }
};

// Gradientes dinámicos
export const gradients = {
  ocean: {
    primary: 'linear-gradient(135deg, #0066CC 0%, #00BFFF 100%)',
    secondary: 'linear-gradient(135deg, #4D94FF 0%, #66D9FF 100%)',
    accent: 'linear-gradient(135deg, #00CED1 0%, #66E6E8 100%)'
  },
  sunset: {
    primary: 'linear-gradient(135deg, #FF6B35 0%, #FF8E53 100%)',
    secondary: 'linear-gradient(135deg, #FF8A5C 0%, #FFB380 100%)',
    accent: 'linear-gradient(135deg, #FFB347 0%, #FFC675 100%)'
  },
  forest: {
    primary: 'linear-gradient(135deg, #2E7D32 0%, #66BB6A 100%)',
    secondary: 'linear-gradient(135deg, #4CAF50 0%, #81C784 100%)',
    accent: 'linear-gradient(135deg, #8BC34A 0%, #9CCC65 100%)'
  },
  royal: {
    primary: 'linear-gradient(135deg, #6A1B9A 0%, #AB47BC 100%)',
    secondary: 'linear-gradient(135deg, #9C27B0 0%, #BA68C8 100%)',
    accent: 'linear-gradient(135deg, #E1BEE7 0%, #F3E5F5 100%)'
  },
  midnight: {
    primary: 'linear-gradient(135deg, #1A237E 0%, #5C6BC0 100%)',
    secondary: 'linear-gradient(135deg, #3F51B5 0%, #7986CB 100%)',
    accent: 'linear-gradient(135deg, #9FA8DA 0%, #C5CAE9 100%)'
  }
};

// Tipografía profesional con Inter
export const typography = {
  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
  h1: {
    fontSize: '2.5rem',
    fontWeight: 700,
    lineHeight: 1.2,
    letterSpacing: '-0.02em'
  },
  h2: {
    fontSize: '2rem',
    fontWeight: 600,
    lineHeight: 1.3,
    letterSpacing: '-0.01em'
  },
  h3: {
    fontSize: '1.75rem',
    fontWeight: 600,
    lineHeight: 1.4
  },
  h4: {
    fontSize: '1.5rem',
    fontWeight: 500,
    lineHeight: 1.4
  },
  h5: {
    fontSize: '1.25rem',
    fontWeight: 500,
    lineHeight: 1.5
  },
  h6: {
    fontSize: '1rem',
    fontWeight: 500,
    lineHeight: 1.5
  },
  body1: {
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: 1.6
  },
  body2: {
    fontSize: '0.875rem',
    fontWeight: 400,
    lineHeight: 1.6
  },
  button: {
    fontSize: '0.875rem',
    fontWeight: 500,
    textTransform: 'none',
    letterSpacing: '0.025em'
  },
  caption: {
    fontSize: '0.75rem',
    fontWeight: 400,
    lineHeight: 1.5
  },
  overline: {
    fontSize: '0.75rem',
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: '0.1em'
  }
};

// Sombras personalizadas con sistema de profundidad
export const shadows = {
  light: {
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
  },
  dark: {
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 1px 2px 0 rgba(0, 0, 0, 0.3)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.3)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
  }
};

// Efectos glassmorphism
export const glassmorphism = {
  light: {
    background: 'rgba(255, 255, 255, 0.25)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
  },
  dark: {
    background: 'rgba(0, 0, 0, 0.25)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
  }
};

// Función para crear tema
export const createParkitTheme = (
  paletteName: keyof typeof colorPalettes = 'ocean',
  mode: PaletteMode = 'light'
): Theme => {
  const palette = colorPalettes[paletteName];
  const isDark = mode === 'dark';

  return createTheme({
    palette: {
      mode,
      primary: palette.primary,
      secondary: palette.secondary,
      background: {
        default: isDark ? '#121212' : '#FAFAFA',
        paper: isDark ? '#1E1E1E' : '#FFFFFF'
      },
      text: {
        primary: isDark ? '#FFFFFF' : '#1A1A1A',
        secondary: isDark ? '#B0B0B0' : '#666666'
      },
      divider: isDark ? '#333333' : '#E0E0E0'
    },
    typography,
    shape: {
      borderRadius: 12
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: 'none',
            fontWeight: 500,
            boxShadow: 'none',
            '&:hover': {
              boxShadow: isDark ? shadows.dark.sm : shadows.light.sm
            }
          }
        }
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow: isDark ? shadows.dark.md : shadows.light.md
          }
        }
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 12
          }
        }
      }
    }
  });
};

// Tipos exportados
export type ColorPalette = keyof typeof colorPalettes;
export type GradientType = keyof typeof gradients;
export type ShadowType = keyof typeof shadows.light; 