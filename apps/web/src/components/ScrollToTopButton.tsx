import React, { useContext } from 'react';
import { Box, IconButton, useTheme } from '@mui/material';
import { KeyboardArrowUpIcon } from './icons';
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
        bottom: '16px',
        right: '16px',
        zIndex: 1000,
        opacity: scrollY > 300 ? 0.7 : 0,
        visibility: scrollY > 300 ? 'visible' : 'hidden',
        transition: 'all 0.3s ease',
        transform: scrollY > 300 ? 'translateY(0)' : 'translateY(20px)',
      }}
    >
      <IconButton
        onClick={scrollToTop}
        sx={{
          width: 40,
          height: 40,
          background: buttonStyles.background,
          color: buttonStyles.color,
          border: buttonStyles.border,
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
          '&:hover': {
            background: buttonStyles.hoverBackground,
            color: buttonStyles.hoverColor,
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)',
            opacity: 1,
          },
          transition: 'all 0.2s ease',
        }}
        aria-label="Volver arriba"
      >
        <KeyboardArrowUpIcon style={{ fontSize: 18 }} />
      </IconButton>
    </Box>
  );
}; 