import { useTheme } from '@/contexts/ThemeContext';
import { Palette } from '@mui/icons-material';
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import {
  THEME_ICONS,
  THEME_MODES,
  THEME_NAMES,
  ThemeMode,
} from '@parkit/shared';
import React from 'react';
import { themeSelectorStyles } from './ThemeSelector.styles';

export default function ThemeSelector() {
  const { themeMode, setThemeMode, isDark } = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleThemeChange = (newTheme: ThemeMode) => {
    setThemeMode(newTheme);
    handleClose();
  };

  return (
    <>
      <IconButton
        color='inherit'
        onClick={handleClick}
        sx={themeSelectorStyles.iconButton}
      >
        <Palette />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {Object.entries(THEME_MODES).map(([key, value]) => (
          <MenuItem
            key={value}
            onClick={() => handleThemeChange(value as ThemeMode)}
            selected={themeMode === value}
          >
            <ListItemIcon>
              <span style={themeSelectorStyles.themeIcon}>
                {THEME_ICONS[value as ThemeMode]}
              </span>
            </ListItemIcon>
            <ListItemText>
              <Typography variant='body2'>
                {THEME_NAMES[value as ThemeMode]}
              </Typography>
            </ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
