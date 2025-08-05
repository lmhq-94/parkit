import React from 'react';
import { Box, SvgIcon } from '@mui/material';

interface LogoProps {
  size?: number;
  color?: string;
  variant?: 'icon' | 'full';
}

export const Logo: React.FC<LogoProps> = ({ 
  size = 32, 
  color = '#2c3e50',
  variant = 'full' 
}) => {
  const iconSize = size * 0.6;
  
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {/* Custom Logo Icon */}
      <SvgIcon
        sx={{
          width: iconSize,
          height: iconSize,
          mr: variant === 'full' ? 1.5 : 0,
          color: color
        }}
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
        />
        <rect
          x="6"
          y="8"
          width="4"
          height="4"
          fill="currentColor"
          opacity="0.8"
        />
        <rect
          x="14"
          y="8"
          width="4"
          height="4"
          fill="currentColor"
          opacity="0.8"
        />
        <rect
          x="6"
          y="12"
          width="4"
          height="4"
          fill="currentColor"
          opacity="0.8"
        />
        <rect
          x="14"
          y="12"
          width="4"
          height="4"
          fill="currentColor"
          opacity="0.8"
        />
      </SvgIcon>
      
      {variant === 'full' && (
        <Box
          component="span"
          sx={{
            fontSize: size * 0.4,
            fontWeight: 700,
            color: color,
            letterSpacing: '-0.02em',
            fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif'
          }}
        >
          ParkIt
        </Box>
      )}
    </Box>
  );
};

export default Logo; 