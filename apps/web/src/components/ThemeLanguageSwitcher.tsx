import React from 'react';
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  useTheme as useMuiTheme
} from '@mui/material';
import {
  Settings,
  LightMode,
  DarkMode,
  Business,
  Palette,
  Language,
  Translate
} from '@mui/icons-material';

export const ThemeLanguageSwitcher: React.FC = () => {
  const muiTheme = useMuiTheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [currentTheme, setCurrentTheme] = React.useState('corporate');
  const [currentLanguage, setCurrentLanguage] = React.useState('es');

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleThemeChange = (theme: 'corporate' | 'classic' | 'dark') => {
    setCurrentTheme(theme);
    localStorage.setItem('theme', theme);
    handleClose();
    // Recargar la página para aplicar el tema
    window.location.reload();
  };

  const handleLanguageChange = (language: string) => {
    setCurrentLanguage(language);
    localStorage.setItem('language', language);
    handleClose();
    // Recargar la página para aplicar el idioma
    window.location.reload();
  };

  React.useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'corporate';
    const savedLanguage = localStorage.getItem('language') || 'es';
    setCurrentTheme(savedTheme);
    setCurrentLanguage(savedLanguage);
  }, []);

  const themes = [
    {
      key: 'corporate' as const,
      label: 'Corporativo',
      icon: <Business sx={{ fontSize: 20 }} />
    },
    {
      key: 'classic' as const,
      label: 'Clásico',
      icon: <Palette sx={{ fontSize: 20 }} />
    },
    {
      key: 'dark' as const,
      label: 'Oscuro',
      icon: <DarkMode sx={{ fontSize: 20 }} />
    }
  ];

  const languages = [
    {
      key: 'es',
      label: 'Español',
      icon: <Translate sx={{ fontSize: 20 }} />
    },
    {
      key: 'en',
      label: 'English',
      icon: <Language sx={{ fontSize: 20 }} />
    }
  ];

  return (
    <Box>
      <IconButton
        onClick={handleClick}
        sx={{
          color: muiTheme.palette.text.primary,
          '&:hover': {
            backgroundColor: muiTheme.palette.action.hover
          }
        }}
      >
        <Settings />
      </IconButton>
      
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: {
            minWidth: 200,
            borderRadius: 0,
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
          }
        }}
      >
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.secondary' }}>
            Tema
          </Typography>
        </Box>
        
        {themes.map((theme) => (
          <MenuItem
            key={theme.key}
            onClick={() => handleThemeChange(theme.key)}
            selected={currentTheme === theme.key}
            sx={{
              '&.Mui-selected': {
                backgroundColor: muiTheme.palette.primary.main,
                color: muiTheme.palette.primary.contrastText,
                '&:hover': {
                  backgroundColor: muiTheme.palette.primary.dark
                }
              }
            }}
          >
            <ListItemIcon sx={{ color: 'inherit' }}>
              {theme.icon}
            </ListItemIcon>
            <ListItemText primary={theme.label} />
          </MenuItem>
        ))}
        
        <Divider />
        
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.secondary' }}>
            Idioma
          </Typography>
        </Box>
        
        {languages.map((language) => (
          <MenuItem
            key={language.key}
            onClick={() => handleLanguageChange(language.key)}
            selected={currentLanguage === language.key}
            sx={{
              '&.Mui-selected': {
                backgroundColor: muiTheme.palette.primary.main,
                color: muiTheme.palette.primary.contrastText,
                '&:hover': {
                  backgroundColor: muiTheme.palette.primary.dark
                }
              }
            }}
          >
            <ListItemIcon sx={{ color: 'inherit' }}>
              {language.icon}
            </ListItemIcon>
            <ListItemText primary={language.label} />
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}; 