import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Box,
  Container,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  MenuIcon,
  LanguageIcon,
  MoonIcon,
  SunIcon,
} from '../icons';
import { Logo } from '../Logo';
import { useTranslation } from 'react-i18next';

// Types
interface NavbarProps {
  scrollY: number;
  onLanguageChange: () => void;
  onThemeChange: () => void;
  onMobileMenuOpen: () => void;
  currentLanguage: string;
  currentTheme: string;
}

/**
 * Navbar component - Main navigation bar with responsive design
 * Features transparent background on scroll, theme switching, and mobile menu
 */
export const Navbar: React.FC<NavbarProps> = ({
  scrollY,
  onLanguageChange,
  onThemeChange,
  onMobileMenuOpen,
  currentLanguage,
  currentTheme,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <AppBar
      position="fixed"
      sx={{
        background: scrollY > 50
          ? theme.palette.mode === "dark"
            ? "rgba(0, 0, 0, 0.9)"
            : "rgba(255, 255, 255, 0.9)"
          : "transparent",
        backdropFilter: scrollY > 50 ? "blur(20px)" : "none",
        boxShadow: scrollY > 50
          ? theme.palette.mode === "dark"
            ? "0 8px 32px rgba(0, 0, 0, 0.3)"
            : "0 8px 32px rgba(0, 0, 0, 0.1)"
          : "none",
        borderBottom: scrollY > 50
          ? theme.palette.mode === "dark"
            ? "1px solid rgba(255, 255, 255, 0.1)"
            : "1px solid rgba(0, 0, 0, 0.1)"
          : "none",
        transition: "all 0.3s ease",
        zIndex: 1000,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
          {/* Logo section */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Logo />
          </Box>

          {/* Desktop navigation */}
          {!isMobile && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
              <NavLinks />
              <ActionButtons
                onLanguageChange={onLanguageChange}
                onThemeChange={onThemeChange}
                currentLanguage={currentLanguage}
                currentTheme={currentTheme}
              />
            </Box>
          )}

          {/* Mobile menu button */}
          {isMobile && (
            <IconButton
              onClick={onMobileMenuOpen}
              sx={{
                color: scrollY > 50
                  ? theme.palette.mode === "dark"
                    ? "#ffffff"
                    : "#000000"
                  : theme.palette.mode === "dark"
                    ? "#ffffff"
                    : "#000000",
              }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

/**
 * Navigation links component
 */
const NavLinks: React.FC = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  const handleSmoothScroll = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Box sx={{ display: "flex", gap: 3 }}>
      {[
        { label: t("landing.navigation.solutions"), id: "soluciones" },
        { label: t("landing.howItWorks.title"), id: "como-funciona" },
        { label: t("landing.testimonials.navbar"), id: "testimonios" },
        { label: t("landing.faq.shortTitle"), id: "faq" },
        { label: t("landing.navigation.contact"), id: "footer" },
      ].map((link) => (
        <Button
          key={link.id}
          onClick={() => handleSmoothScroll(link.id)}
          sx={{
            color: theme.palette.mode === "dark" ? "#e2e8f0" : "#374151",
            textTransform: "none",
            fontWeight: 500,
            fontSize: "0.875rem",
            "&:hover": {
              background:
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(0, 0, 0, 0.05)",
            },
          }}
        >
          {link.label}
        </Button>
      ))}
    </Box>
  );
};

/**
 * Action buttons component (language and theme toggles)
 */
const ActionButtons: React.FC<{
  onLanguageChange: () => void;
  onThemeChange: () => void;
  currentLanguage: string;
  currentTheme: string;
}> = ({ onLanguageChange, onThemeChange, currentLanguage, currentTheme }) => {
  const theme = useTheme();

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      {/* Language toggle */}
      <IconButton
        onClick={onLanguageChange}
        sx={{
          color: theme.palette.mode === "dark" ? "#e2e8f0" : "#374151",
          "&:hover": {
            background: theme.palette.mode === "dark"
              ? "rgba(255, 255, 255, 0.1)"
              : "rgba(0, 0, 0, 0.05)",
          },
        }}
      >
        <LanguageIcon />
      </IconButton>

      {/* Theme toggle */}
      <IconButton
        onClick={onThemeChange}
        sx={{
          color: theme.palette.mode === "dark" ? "#e2e8f0" : "#374151",
          "&:hover": {
            background: theme.palette.mode === "dark"
              ? "rgba(255, 255, 255, 0.1)"
              : "rgba(0, 0, 0, 0.05)",
          },
        }}
      >
                        {currentTheme === "dark" ? <SunIcon /> : <MoonIcon />}
      </IconButton>
    </Box>
  );
}; 