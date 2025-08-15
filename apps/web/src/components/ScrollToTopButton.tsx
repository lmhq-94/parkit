import React, { useContext } from 'react';
import { Box, IconButton, useTheme } from '@mui/material';
import { KeyboardArrowUp } from '@mui/icons-material';
import { ThemeContext } from '../providers';

interface ScrollToTopButtonProps {
  scrollY: number;
}

export const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({ scrollY }) => {
  const theme = useTheme();
  const { currentTheme } = useContext(ThemeContext);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Determinar colores y estilos basados en el tema actual
  const getButtonStyles = () => {
    switch (currentTheme) {
      case 'dark':
        return {
          background: 'transparent',
          color: theme.palette.primary.main,
          border: `2px solid ${theme.palette.primary.main}`,
          hoverBackground: theme.palette.primary.main,
          hoverColor: theme.palette.background.paper,
          boxShadow: '0 4px 20px rgba(144, 202, 249, 0.3)',
          hoverBoxShadow: '0 6px 25px rgba(144, 202, 249, 0.5)',
        };
      case 'light':
        return {
          background: 'transparent',
          color: theme.palette.primary.main,
          border: `2px solid ${theme.palette.primary.main}`,
          hoverBackground: theme.palette.primary.main,
          hoverColor: theme.palette.primary.contrastText,
          boxShadow: '0 4px 20px rgba(25, 118, 210, 0.3)',
          hoverBoxShadow: '0 6px 25px rgba(25, 118, 210, 0.5)',
        };
      default:
        return {
          background: 'transparent',
          color: theme.palette.primary.main,
          border: `2px solid ${theme.palette.primary.main}`,
          hoverBackground: theme.palette.primary.main,
          hoverColor: theme.palette.primary.contrastText,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
          hoverBoxShadow: '0 6px 25px rgba(0, 0, 0, 0.5)',
        };
    }
  };

  const buttonStyles = getButtonStyles();

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 1000,
        opacity: scrollY > 300 ? 1 : 0,
        visibility: scrollY > 300 ? 'visible' : 'hidden',
        transition: 'all 0.3s ease',
        transform: scrollY > 300 ? 'translateY(0)' : 'translateY(20px)',
      }}
    >
      <IconButton
        onClick={scrollToTop}
        sx={{
          width: 56,
          height: 56,
          background: buttonStyles.background,
          color: buttonStyles.color,
          border: buttonStyles.border,
          borderRadius: '12px',
          boxShadow: buttonStyles.boxShadow,
          '&:hover': {
            background: buttonStyles.hoverBackground,
            color: buttonStyles.hoverColor,
            transform: 'translateY(-2px)',
            boxShadow: buttonStyles.hoverBoxShadow,
          },
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
        aria-label="Volver arriba"
      >
        <KeyboardArrowUp sx={{ fontSize: 24 }} />
      </IconButton>
    </Box>
  );
}; 