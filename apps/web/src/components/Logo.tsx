import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';

/**
 * Logo component that displays "parkit." with consistent branding
 * "park" adapts to theme colors, "it." remains consistently blue
 * Fully responsive with mobile-first design
 */
interface LogoProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  fontSize?: string | number | { xs: string | number; sm: string | number; md: string | number; lg: string | number };
  fontWeight?: number | { xs: number; sm: number; md: number; lg: number };
  color?: string;
  letterSpacing?: string | { xs: string; sm: string; md: string; lg: string };
}

export const Logo: React.FC<LogoProps> = ({ 
  variant = 'h6', 
  fontSize = { xs: '1.5rem', sm: '2rem', md: '2.5rem', lg: '3rem' },
  fontWeight = { xs: 700, sm: 800, md: 900, lg: 900 },
  color,
  letterSpacing = { xs: '-0.02em', sm: '-0.03em', md: '-0.05em', lg: '-0.065em' }
}) => {
  const theme = useTheme();
  
  // Dynamic color for "park" based on theme mode
  const defaultColor = color || (theme.palette.mode === 'dark' ? '#ffffff' : '#000000');
  // Consistent blue color for "it." branding
  const blueColor = '#3b82f6';

  return (
    <Typography
      variant={variant}
      sx={{
        fontWeight,
        fontSize,
        color: defaultColor,
        letterSpacing,
        display: 'flex',
        alignItems: 'center',
        lineHeight: 1.1,
      }}
    >
      <Box
        component="span"
        sx={{
          color: defaultColor,
        }}
      >
        park
      </Box>
      <Box
        component="span"
        sx={{
          color: blueColor,
        }}
      >
        it.
      </Box>
    </Typography>
  );
}; 