import React, { useState, useContext } from 'react';
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
  Translate,
  KeyboardArrowUp
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../providers';

interface FloatingSettingsButtonProps {
  scrollY: number;
}

export const FloatingSettingsButton: React.FC<FloatingSettingsButtonProps> = ({ scrollY }) => {
  const muiTheme = useMuiTheme();
  const { t, i18n } = useTranslation();
  const { currentTheme, setTheme } = useContext(ThemeContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleThemeChange = (theme: 'default' | 'light' | 'dark') => {
    setTheme(theme);
    handleClose();
  };

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
    localStorage.setItem('language', language);
    handleClose();
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const themes = [
    {
      key: 'default' as const,
      label: t('common.themes.default'),
      icon: <Business sx={{ fontSize: 20 }} />
    },
    {
      key: 'light' as const,
      label: t('common.themes.light'),
      icon: <LightMode sx={{ fontSize: 20 }} />
    },
    {
      key: 'dark' as const,
      label: t('common.themes.dark'),
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
    <Box
      sx={{
        position: 'fixed',
        right: 20,
        bottom: 20,
        zIndex: 1000,
        opacity: scrollY > 100 ? 1 : 0,
        visibility: scrollY > 100 ? 'visible' : 'hidden',
        transition: 'all 0.3s ease',
        transform: scrollY > 100 ? 'translateY(0)' : 'translateY(20px)',
        display: 'flex',
        flexDirection: 'column',
        gap: 0
      }}
    >
      {/* Settings Button */}
      <IconButton
        onClick={handleClick}
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
      >
        <Settings sx={{ fontSize: 24 }} />
      </IconButton>

      {/* Scroll to Top Button */}
      {scrollY > 300 && (
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
      )}
      
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: {
            minWidth: 200,
            borderRadius: 0,
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            mt: 1
          }
        }}
      >
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.secondary' }}>
            {t('common.theme')}
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
            {t('common.language')}
          </Typography>
        </Box>
        
        {languages.map((language) => (
          <MenuItem
            key={language.key}
            onClick={() => handleLanguageChange(language.key)}
            selected={i18n.language === language.key}
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