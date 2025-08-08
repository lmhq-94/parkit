import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Typography,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Stack,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

export const Navbar: React.FC = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { label: t('nav.features'), href: '#features' },
    { label: t('nav.pricing'), href: '#pricing' },
    { label: t('nav.about'), href: '#about' },
    { label: t('nav.contact'), href: '#contact' },
  ];

  const Logo = () => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 900,
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-0.02em',
        }}
      >
        Park
        <Box
          component="span"
          sx={{
            color: theme.palette.secondary.main,
            WebkitTextFillColor: theme.palette.secondary.main,
          }}
        >
          It
        </Box>
      </Typography>
    </Box>
  );

  const DesktopNav = () => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      {navItems.map((item) => (
        <Button
          key={item.label}
          href={item.href}
          sx={{
            color: theme.palette.text.primary,
            fontWeight: 500,
            textTransform: 'none',
            fontSize: '1rem',
            '&:hover': {
              background: 'transparent',
              color: theme.palette.primary.main,
            },
          }}
        >
          {item.label}
        </Button>
      ))}
    </Box>
  );

  const MobileNav = () => (
    <Drawer
      variant="temporary"
      anchor="right"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        '& .MuiDrawer-paper': {
          width: 280,
          background: theme.palette.background.paper,
          border: `1px solid ${theme.palette.divider}`,
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Logo />
          <IconButton onClick={handleDrawerToggle}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          {navItems.map((item) => (
            <ListItem key={item.label} sx={{ py: 1 }}>
              <ListItemText
                primary={item.label}
                sx={{
                  '& .MuiTypography-root': {
                    fontWeight: 500,
                    fontSize: '1.1rem',
                  },
                }}
              />
            </ListItem>
          ))}
        </List>
        <Stack spacing={2} sx={{ mt: 3 }}>
          <Button
            variant="outlined"
            fullWidth
            sx={{
              borderColor: theme.palette.primary.main,
              color: theme.palette.primary.main,
              fontWeight: 600,
              py: 1.5,
              '&:hover': {
                background: theme.palette.primary.main,
                color: '#ffffff',
              },
            }}
          >
            {t('nav.login')}
          </Button>
          <Button
            variant="contained"
            fullWidth
            sx={{
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
              fontWeight: 600,
              py: 1.5,
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: `0 10px 25px ${theme.palette.primary.main}40`,
              },
            }}
          >
            {t('nav.signup')}
          </Button>
        </Stack>
      </Box>
    </Drawer>
  );

  return (
    <AppBar
      position="fixed"
      sx={{
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${theme.palette.divider}`,
        boxShadow: 'none',
        zIndex: 1200,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
          <Logo />
          
          {!isMobile && <DesktopNav />}
          
          {!isMobile && (
            <Stack direction="row" spacing={2}>
              <Button
                variant="outlined"
                sx={{
                  borderColor: theme.palette.primary.main,
                  color: theme.palette.primary.main,
                  fontWeight: 600,
                  '&:hover': {
                    background: theme.palette.primary.main,
                    color: '#ffffff',
                  },
                }}
              >
                {t('nav.login')}
              </Button>
              <Button
                variant="contained"
                sx={{
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                  fontWeight: 600,
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: `0 10px 25px ${theme.palette.primary.main}40`,
                  },
                }}
              >
                {t('nav.signup')}
              </Button>
            </Stack>
          )}
          
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </Container>
      <MobileNav />
    </AppBar>
  );
}; 