import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';

/**
 * Logo component that displays "parkit." with consistent branding
 * "park" adapts to theme colors, "it." remains consistently blue
 */
interface LogoProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  fontSize?: string | number;
  fontWeight?: number;
  color?: string;
  letterSpacing?: string;
}

export const Logo: React.FC<LogoProps> = ({ 
  variant = 'h6', 
  fontSize = '2.5rem',
  fontWeight = 900,
  color,
  letterSpacing = '-0.065em'
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