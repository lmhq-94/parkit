import { useLanguage } from '@/contexts/LanguageContext';
import { Language } from '@mui/icons-material';
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import {
  LANGUAGE_FLAGS,
  LANGUAGE_NAMES,
  SUPPORTED_LANGUAGES,
  SupportedLanguage,
} from '@parkit/shared';
import React from 'react';
import { languageSelectorStyles } from './LanguageSelector.styles';

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (newLanguage: SupportedLanguage) => {
    setLanguage(newLanguage);
    handleClose();
  };

  return (
    <>
      <IconButton
        color='inherit'
        onClick={handleClick}
        sx={languageSelectorStyles.iconButton}
      >
        <Language />
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
        {Object.entries(SUPPORTED_LANGUAGES).map(([key, value]) => (
          <MenuItem
            key={value}
            onClick={() => handleLanguageChange(value as SupportedLanguage)}
            selected={language === value}
          >
            <ListItemIcon>
              <span style={languageSelectorStyles.flagIcon}>
                {LANGUAGE_FLAGS[value as SupportedLanguage]}
              </span>
            </ListItemIcon>
            <ListItemText>
              <Typography variant='body2'>
                {LANGUAGE_NAMES[value as SupportedLanguage]}
              </Typography>
            </ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
