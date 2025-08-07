import React from 'react';
import { Box, IconButton } from '@mui/material';
import { KeyboardArrowUp } from '@mui/icons-material';

interface ScrollToTopButtonProps {
  scrollY: number;
}

export const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({ scrollY }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        right: 20,
        bottom: 20,
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
          background: '#000000',
          color: '#ffffff',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          '&:hover': {
            background: '#333333',
            transform: 'scale(1.1)',
            boxShadow: '0 6px 25px rgba(0,0,0,0.4)'
          },
          transition: 'all 0.3s ease'
        }}
        aria-label="Volver arriba"
      >
        <KeyboardArrowUp sx={{ fontSize: 24 }} />
      </IconButton>
    </Box>
  );
}; 