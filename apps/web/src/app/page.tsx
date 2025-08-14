"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  useTheme,
  useMediaQuery,
  Link,
  IconButton,
  Chip,
  Stack,
} from "@mui/material";
import { AnimatedSection, StaggeredContainer, ParallaxSection, TypewriterText } from "../components/animations";
import {
  Close,
  Star,
  Phone,
  Email,
  LocationOn,
  WhatsApp,
  LinkedIn,
  Twitter,
  Instagram,
  TrendingUp,
  Speed,
  Analytics,
  Security,
  Support,
  QrCode,
  Smartphone,
  Dashboard,
  Login,
  LocalParking,
  DirectionsCar,
  Payment,
  WorkspacePremium,
  Rocket,
  PlayArrow,
  ArrowUpward,
} from "@mui/icons-material";
import { useAuthStore } from "../store/authStore";
import { DashboardLayout } from "../components/layout/DashboardLayout";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { ThemeContext } from "../providers";

// Import custom components
import { Navbar } from "../components/navigation/Navbar";
import { MobileDrawer } from "../components/navigation/MobileDrawer";
import { ScrollToTopButton } from "../components/ScrollToTopButton";

// Import utilities and constants
import { 
  getInitialTheme, 
  getInitialLanguage, 
  saveThemePreference, 
  saveLanguagePreference,
  smoothScrollTo 
} from "../utils/themeUtils";
import { CONTACT_INFO } from "../constants";

export default function HomePage() {
  const { user, isAuthenticated, login } = useAuthStore();
  const { t, i18n } = useTranslation();
  const { currentTheme, setTheme } = useContext(ThemeContext);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [scrollY, setScrollY] = useState(0);
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Forzar re-renderizado cuando cambie el idioma
  const [, forceUpdate] = useState({});

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Función para cambiar idioma
  const handleLanguageChange = () => {
    const newLanguage = currentLanguage === 'es' ? 'en' : 'es';
    setCurrentLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
    forceUpdate({}); // Forzar re-renderizado
  };

  // Función para cambiar tema
  const handleThemeChange = () => {
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  // Escuchar cambios de idioma
  useEffect(() => {
    const handleLanguageChangeEvent = () => {
      setCurrentLanguage(i18n.language);
      forceUpdate({}); // Forzar re-renderizado
    };

    // Escuchar el evento de cambio de idioma
    i18n.on("languageChanged", handleLanguageChangeEvent);

    // También escuchar cambios en el localStorage
    const handleStorageChange = () => {
      const newLanguage = localStorage.getItem("language");
      if (newLanguage && newLanguage !== currentLanguage) {
        setCurrentLanguage(newLanguage);
        forceUpdate({}); // Forzar re-renderizado
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      i18n.off("languageChanged", handleLanguageChangeEvent);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [i18n, currentLanguage]);

  // Función para scroll suave
  const smoothScrollTo = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  };

  // Función para navegación que cierra el drawer
  const handleNavigation = (elementId: string) => {
    smoothScrollTo(elementId);
    setMobileOpen(false); // Cerrar el drawer
  };

  const handleLogin = () => {
    const mockUser = {
      id: "1",
      email: loginData.email,
      firstName: "Admin",
      lastName: "User",
      role: "admin",
      isVerified: true,
    };
    const mockToken = "mock-jwt-token";
    login(mockUser, mockToken);
    setLoginOpen(false);
    setLoginData({ email: "", password: "" });
  };

  if (isAuthenticated) {
    return (
      <DashboardLayout>
        <AdminDashboard />
      </DashboardLayout>
    );
  }

  // Forzar re-renderizado cuando cambie el idioma
  const key = `page-${currentLanguage}`;

  return (
    <Box key={key} sx={{ overflow: "hidden" }}>
      {/* Navigation */}
      <Navbar
        scrollY={scrollY}
        onLanguageChange={handleLanguageChange}
        onThemeChange={handleThemeChange}
        onMobileMenuOpen={() => setMobileOpen(true)}
        currentLanguage={currentLanguage}
        currentTheme={theme.palette.mode}
      />

      {/* Mobile Drawer */}
      <MobileDrawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        onNavigation={handleNavigation}
        onLogin={handleLogin}
      />

      {/* Scroll to Top Button */}
      <ScrollToTopButton scrollY={scrollY} />

      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          minHeight: "100vh",
          background: theme.palette.mode === 'dark' 
            ? `linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)`
            : `linear-gradient(135deg, #fafafa 0%, #f5f5f5 50%, #fafafa 100%)`,
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Modern Bento Box Background */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            overflow: "hidden",
            zIndex: 1,
          }}
        >
          {/* Modern Gradient Mesh */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `radial-gradient(circle at 20% 20%, ${theme.palette.primary.main}05 0%, transparent 50%),
                           radial-gradient(circle at 80% 80%, ${theme.palette.secondary.main}05 0%, transparent 50%),
                           radial-gradient(circle at 40% 60%, ${theme.palette.success.main}03 0%, transparent 50%)`,
              zIndex: 2,
            }}
          />

          {/* Geometric Pattern */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: 0.03,
              background: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='geometric' width='30' height='30' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 30 0 L 0 0 0 30' fill='none' stroke='%23${theme.palette.mode === 'dark' ? 'ffffff' : '000000'}' stroke-width='0.5'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='60' height='60' fill='url(%23geometric)'/%3E%3C/svg%3E")`,
              zIndex: 1,
            }}
          />

          {/* Floating Bento Elements */}
          <Box
            sx={{
              position: "absolute",
              top: "10%",
              left: "5%",
              width: 120,
              height: 120,
              opacity: 0.06,
              animation: "bento-float 25s ease-in-out infinite",
              zIndex: 1,
              "@keyframes bento-float": {
                "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
                "50%": { transform: "translateY(-25px) rotate(3deg)" },
              },
            }}
          >
            <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="10" width="100" height="100" rx="12" fill={theme.palette.primary.main} opacity="0.1"/>
              <rect x="20" y="20" width="80" height="15" rx="4" fill={theme.palette.secondary.main} opacity="0.15"/>
              <rect x="20" y="45" width="80" height="15" rx="4" fill={theme.palette.success.main} opacity="0.12"/>
              <rect x="20" y="70" width="80" height="15" rx="4" fill={theme.palette.warning.main} opacity="0.1"/>
              <rect x="20" y="95" width="80" height="5" rx="2" fill={theme.palette.info.main} opacity="0.08"/>
            </svg>
          </Box>

          {/* Data Visualization */}
          <Box
            sx={{
              position: "absolute",
              bottom: "20%",
              right: "10%",
              width: 140,
              height: 80,
              opacity: 0.04,
              animation: "data-pulse 20s ease-in-out infinite",
              zIndex: 1,
              "@keyframes data-pulse": {
                "0%, 100%": { transform: "scale(1)" },
                "50%": { transform: "scale(1.03)" },
              },
            }}
          >
            <svg viewBox="0 0 140 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="10" width="120" height="60" rx="8" fill={theme.palette.background.paper} opacity="0.9"/>
              <rect x="25" y="25" width="8" height="35" rx="2" fill={theme.palette.primary.main} opacity="0.4"/>
              <rect x="40" y="30" width="8" height="30" rx="2" fill={theme.palette.secondary.main} opacity="0.4"/>
              <rect x="55" y="20" width="8" height="40" rx="2" fill={theme.palette.success.main} opacity="0.4"/>
              <rect x="70" y="35" width="8" height="25" rx="2" fill={theme.palette.warning.main} opacity="0.4"/>
              <rect x="85" y="40" width="8" height="20" rx="2" fill={theme.palette.info.main} opacity="0.4"/>
              <rect x="100" y="45" width="8" height="15" rx="2" fill={theme.palette.error.main} opacity="0.4"/>
              <line x1="20" y1="70" x2="120" y2="70" stroke={theme.palette.divider} strokeWidth="0.5"/>
            </svg>
          </Box>

          {/* Security Module */}
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "8%",
              width: 100,
              height: 100,
              opacity: 0.03,
              animation: "security-glow 22s ease-in-out infinite",
              zIndex: 1,
              "@keyframes security-glow": {
                "0%, 100%": { filter: "drop-shadow(0 0 8px rgba(0,0,0,0.1))" },
                "50%": { filter: "drop-shadow(0 0 16px rgba(0,0,0,0.15))" },
              },
            }}
          >
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 15L80 30V55C80 75 65 90 50 100C35 90 20 75 20 55V30L50 15Z" 
                    fill={theme.palette.success.main} opacity="0.12"/>
              <path d="M50 25L70 35V55C70 70 60 80 50 85C40 80 30 70 30 55V35L50 25Z" 
                    fill={theme.palette.success.main} opacity="0.15"/>
              <circle cx="50" cy="50" r="10" fill={theme.palette.background.paper} opacity="0.95"/>
              <path d="M47 47L50 50L53 47" stroke={theme.palette.success.main} strokeWidth="1.5" fill="none"/>
            </svg>
          </Box>

          {/* Payment Module */}
          <Box
            sx={{
              position: "absolute",
              bottom: "15%",
              left: "15%",
              width: 80,
              height: 60,
              opacity: 0.04,
              animation: "payment-slide 18s ease-in-out infinite",
              zIndex: 1,
              "@keyframes payment-slide": {
                "0%, 100%": { transform: "translateX(0px)" },
                "50%": { transform: "translateX(12px)" },
              },
            }}
          >
            <svg viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="15" width="60" height="40" rx="8" fill={theme.palette.primary.main} opacity="0.1"/>
              <rect x="20" y="25" width="40" height="6" rx="3" fill={theme.palette.background.paper} opacity="0.9"/>
              <rect x="20" y="35" width="25" height="6" rx="3" fill={theme.palette.background.paper} opacity="0.9"/>
              <circle cx="60" cy="30" r="8" fill={theme.palette.secondary.main} opacity="0.25"/>
            </svg>
          </Box>

          {/* Cloud Module */}
          <Box
            sx={{
              position: "absolute",
              top: "15%",
              right: "8%",
              width: 100,
              height: 60,
              opacity: 0.03,
              animation: "cloud-drift 30s ease-in-out infinite",
              zIndex: 1,
              "@keyframes cloud-drift": {
                "0%, 100%": { transform: "translateX(0px)" },
                "50%": { transform: "translateX(-18px)" },
              },
            }}
          >
            <svg viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="25" cy="35" rx="18" ry="10" fill={theme.palette.info.main} opacity="0.08"/>
              <ellipse cx="50" cy="30" rx="16" ry="8" fill={theme.palette.info.main} opacity="0.1"/>
              <ellipse cx="75" cy="40" rx="14" ry="6" fill={theme.palette.info.main} opacity="0.08"/>
              <circle cx="30" cy="30" r="2.5" fill={theme.palette.background.paper} opacity="0.8"/>
              <circle cx="55" cy="25" r="2.5" fill={theme.palette.background.paper} opacity="0.8"/>
              <circle cx="80" cy="35" r="2.5" fill={theme.palette.background.paper} opacity="0.8"/>
            </svg>
          </Box>

          {/* Mobile Module */}
          <Box
            sx={{
              position: "absolute",
              bottom: "8%",
              right: "5%",
              width: 50,
              height: 80,
              opacity: 0.025,
              animation: "mobile-bounce 24s ease-in-out infinite",
              zIndex: 1,
              "@keyframes mobile-bounce": {
                "0%, 100%": { transform: "translateY(0px)" },
                "50%": { transform: "translateY(-12px)" },
              },
            }}
          >
            <svg viewBox="0 0 50 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="6" y="6" width="38" height="68" rx="8" fill={theme.palette.text.primary} opacity="0.12"/>
              <rect x="10" y="10" width="30" height="50" rx="4" fill={theme.palette.background.paper} opacity="0.95"/>
              <circle cx="25" cy="70" r="3" fill={theme.palette.primary.main} opacity="0.3"/>
              <rect x="15" y="18" width="20" height="4" rx="2" fill={theme.palette.success.main} opacity="0.25"/>
              <rect x="15" y="26" width="20" height="4" rx="2" fill={theme.palette.secondary.main} opacity="0.25"/>
              <rect x="15" y="34" width="20" height="4" rx="2" fill={theme.palette.warning.main} opacity="0.25"/>
              <rect x="15" y="42" width="20" height="4" rx="2" fill={theme.palette.info.main} opacity="0.25"/>
            </svg>
          </Box>
        </Box>

        <Container maxWidth="xl" sx={{ position: "relative", zIndex: 2 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", lg: "row" },
              alignItems: "center",
              gap: { xs: 8, lg: 12 },
              minHeight: "100vh",
              py: 8,
            }}
          >
            {/* Left Content - Bento Box Layout */}
            <Box
              sx={{
                flex: { xs: "1", lg: "0.6" },
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
            >
              <AnimatedSection animationType="slideUp" delay={0.2}>
                <Box>
                  {/* Premium Badge */}
                  <AnimatedSection animationType="scale" delay={0.4}>
                    <Box sx={{ mb: 4 }}>
                      <Chip
                        icon={<WorkspacePremium />}
                        label={t("landing.hero.badge")}
                        sx={{
                          background: `linear-gradient(135deg, ${theme.palette.primary.main}15, ${theme.palette.secondary.main}15)`,
                          border: `1px solid ${theme.palette.primary.main}30`,
                          color: theme.palette.primary.main,
                          fontWeight: 700,
                          fontSize: "0.875rem",
                          backdropFilter: "blur(20px)",
                          "& .MuiChip-icon": {
                            color: theme.palette.warning.main,
                          },
                        }}
                      />
                    </Box>
                  </AnimatedSection>

                  {/* Main Headline */}
                  <AnimatedSection animationType="slideUp" delay={0.6}>
                    <Typography
                      variant="h1"
                      sx={{
                        fontWeight: 900,
                        fontSize: { xs: "3.5rem", sm: "4.5rem", md: "5.5rem", lg: "6.5rem" },
                        lineHeight: 1.05,
                        mb: 3,
                        color: theme.palette.text.primary,
                        letterSpacing: "-0.03em",
                      }}
                    >
                      <TypewriterText 
                        text={t("landing.hero.title")} 
                        speed={60} 
                        delay={0.8}
                      />
                      <Box
                        component="span"
                        sx={{
                          display: "block",
                          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                          backgroundClip: "text",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          fontSize: "0.9em",
                          mt: 1,
                          fontWeight: 800,
                        }}
                      >
                        <TypewriterText 
                          text={t("landing.hero.subtitle")} 
                          speed={70} 
                          delay={1.2}
                        />
                      </Box>
                    </Typography>
                  </AnimatedSection>

                  {/* Description */}
                  <AnimatedSection animationType="slideUp" delay={1.0}>
                    <Typography
                      variant="h2"
                      sx={{
                        fontWeight: 400,
                        fontSize: { xs: "1.25rem", sm: "1.375rem", md: "1.5rem" },
                        mb: 6,
                        color: theme.palette.text.secondary,
                        lineHeight: 1.7,
                        maxWidth: 600,
                      }}
                    >
                      {t("landing.hero.description")}
                    </Typography>
                  </AnimatedSection>

                  {/* CTA Buttons */}
                  <AnimatedSection animationType="slideUp" delay={1.2}>
                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      spacing={3}
                      sx={{ mb: 8 }}
                    >
                      <Button
                        variant="contained"
                        size="large"
                        onClick={() => setLoginOpen(true)}
                        endIcon={<Rocket />}
                        sx={{
                          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                          color: "#ffffff",
                          px: 6,
                          py: 2.5,
                          borderRadius: 3,
                          fontWeight: 800,
                          fontSize: "1.125rem",
                          textTransform: "none",
                          minWidth: 200,
                          position: "relative",
                          overflow: "hidden",
                          transition: "all 0.3s ease",
                          "&::before": {
                            content: '""',
                            position: "absolute",
                            top: 0,
                            left: "-100%",
                            width: "100%",
                            height: "100%",
                            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                            transition: "left 0.6s",
                          },
                          "&:hover": {
                            transform: "translateY(-3px)",
                            boxShadow: `0 25px 50px ${theme.palette.primary.main}40`,
                            "&::before": {
                              left: "100%",
                            },
                          },
                        }}
                      >
                        {t("landing.hero.startNow")}
                      </Button>
                      
                      <Button
                        variant="outlined"
                        size="large"
                        onClick={() => smoothScrollTo("como-funciona")}
                        startIcon={<PlayArrow />}
                        sx={{
                          border: `2px solid ${theme.palette.primary.main}`,
                          color: theme.palette.primary.main,
                          px: 6,
                          py: 2.5,
                          borderRadius: 3,
                          fontWeight: 700,
                          fontSize: "1.125rem",
                          textTransform: "none",
                          minWidth: 200,
                          transition: "all 0.3s ease",
                          "&:hover": {
                            background: theme.palette.primary.main,
                            color: "#ffffff",
                            transform: "translateY(-3px)",
                            boxShadow: `0 25px 50px ${theme.palette.primary.main}40`,
                          },
                        }}
                      >
                        {t("landing.hero.viewDemo")}
                      </Button>
                    </Stack>
                  </AnimatedSection>
                </Box>
              </AnimatedSection>
            </Box>

            {/* Right Content - Hero SVG */}
            <Box
              sx={{
                flex: { xs: "1", lg: "0.4" },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                px: { xs: 2, sm: 4, lg: 0 },
              }}
            >
              <AnimatedSection animationType="scale" delay={0.8}>
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    maxWidth: { xs: 300, sm: 400, lg: 500 },
                    height: "auto",
                    filter: theme.palette.mode === "dark" 
                      ? "drop-shadow(0 0 20px rgba(255,255,255,0.1))" 
                      : "drop-shadow(0 0 20px rgba(0,0,0,0.1))",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      transform: "scale(1.02)",
                      filter: theme.palette.mode === "dark" 
                        ? "drop-shadow(0 0 30px rgba(255,255,255,0.15))" 
                        : "drop-shadow(0 0 30px rgba(0,0,0,0.15))",
                    },
                  }}
                >
                  <img
                    src="/hero.svg"
                    alt="ParkIt Hero Illustration"
                    style={{
                      width: "100%",
                      height: "auto",
                      maxWidth: "100%",
                      objectFit: "contain",
                    }}
                  />
                </Box>
              </AnimatedSection>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Enhanced Technology Section */}
      <Box
        sx={{
          py: 16,
          background:
            theme.palette.mode === "dark"
              ? "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)"
              : "linear-gradient(135deg, #f8f9fa 0%, #ffffff 50%, #f8f9fa 100%)",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              theme.palette.mode === "dark"
                ? `
                radial-gradient(circle at 20% 80%, rgba(255,255,255,0.02) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(255,255,255,0.02) 0%, transparent 50%),
                radial-gradient(circle at 40% 40%, rgba(255,255,255,0.01) 0%, transparent 50%)
              `
                : `
                radial-gradient(circle at 20% 80%, rgba(0,0,0,0.02) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(0,0,0,0.02) 0%, transparent 50%),
                radial-gradient(circle at 40% 40%, rgba(0,0,0,0.01) 0%, transparent 50%)
              `,
            pointerEvents: "none",
          },
        }}
        id="soluciones"
      >
        <Container
          maxWidth="xl"
          sx={{ position: "relative", zIndex: 2, px: { xs: 3, sm: 4, md: 0 } }}
        >
          {/* Section Header */}
          <AnimatedSection animationType="slideUp" delay={0.2}>
            <Box sx={{ textAlign: "center", mb: 12, px: { xs: 2, sm: 0 } }}>
              <AnimatedSection animationType="scale" delay={0.4}>
                <Box
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    mb: 3,
                    p: 2,
                    background:
                      theme.palette.mode === "dark"
                        ? "rgba(255,255,255,0.03)"
                        : "rgba(0,0,0,0.03)",
                    borderRadius: 0,
                  }}
                >
                  <TrendingUp
                    sx={{
                      fontSize: 24,
                      mr: 2,
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                    }}
                  />
                  <Typography
                    variant="overline"
                    sx={{
                      fontWeight: 600,
                      color: theme.palette.mode === "dark" ? "#cccccc" : "#666666",
                      letterSpacing: "0.1em",
                      fontFamily:
                        '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                    }}
                  >
                    {t("landing.features.benefits.title")}
                  </Typography>
                </Box>
              </AnimatedSection>
              <AnimatedSection animationType="slideUp" delay={0.6}>
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 900,
                    mb: 4,
                    color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                    fontSize: { xs: "2.5rem", md: "3.5rem", lg: "4rem" },
                    lineHeight: 1.1,
                    fontFamily:
                      '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                    background:
                      theme.palette.mode === "dark"
                        ? "linear-gradient(135deg, #ffffff 0%, #cccccc 100%)"
                        : "linear-gradient(135deg, #000000 0%, #333333 100%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  <TypewriterText 
                    text={t("landing.features.title")} 
                    speed={80} 
                    delay={0.8}
                  />
                </Typography>
              </AnimatedSection>
              <AnimatedSection animationType="slideUp" delay={0.8}>
                <Typography
                  variant="h5"
                  sx={{
                    color: theme.palette.mode === "dark" ? "#cccccc" : "#333333",
                    maxWidth: 800,
                    mx: "auto",
                    lineHeight: 1.6,
                    fontWeight: 400,
                    fontFamily:
                      '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                  }}
                >
                  {t("landing.features.subtitle")}
                </Typography>
              </AnimatedSection>
            </Box>
          </AnimatedSection>

          {/* Benefits Grid */}
          <StaggeredContainer animationType="slideUp" staggerDelay={0.15}>
            <Grid container spacing={4}>
              {[
                {
                  icon: <TrendingUp sx={{ fontSize: 48 }} />,
                  title: t("landing.features.benefits.revenue.title"),
                  description: t("landing.features.benefits.revenue.description"),
                  longDescription: t(
                    "landing.features.benefits.revenue.longDescription"
                  ),

                  gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  badge: "Gestión",
                },
                {
                  icon: <Speed sx={{ fontSize: 48 }} />,
                  title: t("landing.features.benefits.automation.title"),
                  description: t(
                    "landing.features.benefits.automation.description"
                  ),
                  longDescription: t(
                    "landing.features.benefits.automation.longDescription"
                  ),

                  gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                  badge: "Automatización",
                },
                {
                  icon: <Star sx={{ fontSize: 48 }} />,
                  title: t("landing.features.benefits.experience.title"),
                  description: t(
                    "landing.features.benefits.experience.description"
                  ),
                  longDescription: t(
                    "landing.features.benefits.experience.longDescription"
                  ),

                  gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                  badge: "Experiencia",
                },
                {
                  icon: <Analytics sx={{ fontSize: 48 }} />,
                  title: t("landing.features.benefits.analytics.title"),
                  description: t(
                    "landing.features.benefits.analytics.description"
                  ),
                  longDescription: t(
                    "landing.features.benefits.analytics.longDescription"
                  ),

                  gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
                  badge: "Analytics",
                },
                {
                  icon: <Security sx={{ fontSize: 48 }} />,
                  title: t("landing.features.benefits.security.title"),
                  description: t(
                    "landing.features.benefits.security.description"
                  ),
                  longDescription: t(
                    "landing.features.benefits.security.longDescription"
                  ),

                  gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
                  badge: "Seguridad",
                },
                {
                  icon: <Support sx={{ fontSize: 48 }} />,
                  title: t("landing.features.benefits.support.title"),
                  description: t("landing.features.benefits.support.description"),
                  longDescription: t(
                    "landing.features.benefits.support.longDescription"
                  ),

                  gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
                  badge: "Soporte",
                },
              ].map((benefit, index) => (
                <Grid item xs={12} md={6} lg={4} key={index}>
                  <Card
                    sx={{
                      height: "100%",
                      minHeight: 400,
                      background:
                        theme.palette.mode === "dark"
                          ? "linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%)"
                          : "#ffffff",
                      boxShadow:
                        theme.palette.mode === "dark"
                          ? "0 4px 20px rgba(0,0,0,0.3)"
                          : "0 4px 20px rgba(0,0,0,0.08)",
                      border:
                        theme.palette.mode === "dark"
                          ? "1px solid rgba(255,255,255,0.1)"
                          : "1px solid rgba(0,0,0,0.05)",
                      borderRadius: 0,
                      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      position: "relative",
                      overflow: "hidden",
                      display: "flex",
                      flexDirection: "column",
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "4px",
                        background: benefit.gradient,
                        opacity: 0,
                        transition: "opacity 0.3s ease",
                      },
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow:
                          theme.palette.mode === "dark"
                            ? "0 20px 40px rgba(0,0,0,0.5)"
                            : "0 20px 40px rgba(0,0,0,0.15)",
                        "&::before": {
                          opacity: 1,
                        },
                        "& .feature-icon": {
                          transform: "scale(1.1) rotate(5deg)",
                          background: benefit.gradient,
                        },
                        "& .feature-badge": {
                          transform: "scale(1.1)",
                        },
                      },
                    }}
                  >
                    <CardContent
                      sx={{
                        p: 5,
                        textAlign: "center",
                        position: "relative",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        flex: 1,
                      }}
                    >
                      {/* Benefit Badge */}
                      <Box
                        className="feature-badge"
                        sx={{
                          position: "absolute",
                          top: 16,
                          right: 16,
                          background: benefit.gradient,
                          color: "#ffffff",
                          px: 2,
                          py: 0.5,
                          borderRadius: 0,
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          letterSpacing: "0.05em",
                          transition: "all 0.3s ease",
                          fontFamily:
                            '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                        }}
                      >
                        {benefit.badge}
                      </Box>

                      {/* Icon Container */}
                      <Box
                        className="feature-icon"
                        sx={{
                          width: 100,
                          height: 100,
                          background:
                            theme.palette.mode === "dark"
                              ? "linear-gradient(135deg, #3d3d3d 0%, #2a2a2a 100%)"
                              : "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          mx: "auto",
                          mb: 3,
                          borderRadius: "50%",
                          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                          boxShadow:
                            theme.palette.mode === "dark"
                              ? "0 8px 25px rgba(0,0,0,0.3)"
                              : "0 8px 25px rgba(0,0,0,0.1)",
                          "& svg": {
                            color:
                              theme.palette.mode === "dark"
                                ? "#ffffff"
                                : "#000000",
                            transition: "all 0.3s ease",
                          },
                          "&:hover svg": {
                            color: "#ffffff",
                          },
                        }}
                      >
                        {benefit.icon}
                      </Box>

                      {/* Title */}
                      <Typography
                        variant="h4"
                        sx={{
                          fontWeight: 800,
                          mb: 2,
                          color:
                            theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                          fontFamily:
                            '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                          lineHeight: 1.2,
                        }}
                      >
                        {benefit.title}
                      </Typography>

                      {/* Description */}
                      <Typography
                        variant="body1"
                        sx={{
                          color:
                            theme.palette.mode === "dark" ? "#cccccc" : "#666666",
                          lineHeight: 1.6,
                          mb: 3,
                          fontFamily:
                            '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                          fontWeight: 400,
                        }}
                      >
                        {benefit.longDescription}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </StaggeredContainer>
        </Container>
      </Box>

      {/* How It Works Section */}
      <Box
        sx={{
          py: 16,
          background: theme.palette.mode === "dark" ? "#2d2d2d" : "#ffffff",
          position: "relative",
          overflow: "hidden",
        }}
        id="como-funciona"
      >
        <Container maxWidth="xl" sx={{ px: { xs: 3, sm: 4, md: 0 } }}>
          {/* Section Header */}
          <AnimatedSection animationType="slideUp" delay={0.2}>
            <Box sx={{ textAlign: "center", mb: 12, px: { xs: 2, sm: 0 } }}>
              <AnimatedSection animationType="scale" delay={0.4}>
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 900,
                    mb: 4,
                    color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                    fontSize: { xs: "2.5rem", md: "3.5rem", lg: "4rem" },
                    lineHeight: 1.1,
                    fontFamily:
                      '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                  }}
                >
                  <TypewriterText 
                    text={t("landing.howItWorks.title")} 
                    speed={60} 
                    delay={0.6}
                  />
                </Typography>
              </AnimatedSection>
              <AnimatedSection animationType="slideUp" delay={0.8}>
                <Typography
                  variant="h5"
                  sx={{
                    color: theme.palette.mode === "dark" ? "#cccccc" : "#333333",
                    maxWidth: 800,
                    mx: "auto",
                    lineHeight: 1.6,
                    fontWeight: 400,
                    fontFamily:
                      '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                  }}
                >
                  {t("landing.howItWorks.subtitle")}
                </Typography>
              </AnimatedSection>
            </Box>
          </AnimatedSection>

          {/* Process Steps */}
          <StaggeredContainer animationType="slideUp" staggerDelay={0.2}>
            <Grid container spacing={6}>
              {[
                {
                  step: "01",
                  icon: (
                    <QrCode
                      sx={{
                        fontSize: 48,
                        color:
                          theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      }}
                    />
                  ),
                  title: t("landing.howItWorks.step1.title"),
                  description: t("landing.howItWorks.step1.description"),
                },
                {
                  step: "02",
                  icon: (
                    <Smartphone
                      sx={{
                        fontSize: 48,
                        color:
                          theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      }}
                    />
                  ),
                  title: t("landing.howItWorks.step2.title"),
                  description: t("landing.howItWorks.step2.description"),
                },
                {
                  step: "03",
                  icon: (
                    <Dashboard
                      sx={{
                        fontSize: 48,
                        color:
                          theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      }}
                    />
                  ),
                  title: t("landing.howItWorks.step3.title"),
                  description: t("landing.howItWorks.step3.description"),
                },
              ].map((step, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <AnimatedSection animationType="scale" delay={0.1 * index}>
                    <Box
                      sx={{
                        textAlign: "center",
                        p: 4,
                        position: "relative",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-8px)",
                        },
                      }}
                    >
                      <AnimatedSection animationType="rotate" delay={0.2 + (0.1 * index)}>
                        <Box
                          sx={{
                            width: 80,
                            height: 80,
                            borderRadius: "50%",
                            background:
                              theme.palette.mode === "dark"
                                ? "rgba(255,255,255,0.03)"
                                : "rgba(0,0,0,0.03)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            margin: "0 auto",
                            mb: 3,
                            transition: "all 0.3s ease",
                            "&:hover": {
                              transform: "scale(1.1)",
                              background:
                                theme.palette.mode === "dark"
                                  ? "rgba(255,255,255,0.08)"
                                  : "rgba(0,0,0,0.08)",
                            },
                          }}
                        >
                          {step.icon}
                        </Box>
                      </AnimatedSection>
                      <AnimatedSection animationType="slideUp" delay={0.3 + (0.1 * index)}>
                        <Typography
                          variant="h3"
                          sx={{
                            fontWeight: 900,
                            color:
                              theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                            mb: 2,
                            fontFamily:
                              '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                          }}
                        >
                          {step.step}
                        </Typography>
                      </AnimatedSection>
                      <AnimatedSection animationType="slideUp" delay={0.4 + (0.1 * index)}>
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: 700,
                            color:
                              theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                            mb: 2,
                                                       fontFamily:
                             '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                          }}
                        >
                          {step.title}
                        </Typography>
                      </AnimatedSection>
                      <AnimatedSection animationType="slideUp" delay={0.5 + (0.1 * index)}>
                        <Typography
                          variant="body1"
                          sx={{
                            color:
                              theme.palette.mode === "dark" ? "#cccccc" : "#333333",
                            lineHeight: 1.6,
                            fontFamily:
                              '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                          }}
                        >
                          {step.description}
                        </Typography>
                      </AnimatedSection>
                    </Box>
                  </AnimatedSection>
                </Grid>
              ))}
            </Grid>
          </StaggeredContainer>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box
        sx={{
          py: 16,
          background:
            theme.palette.mode === "dark"
              ? "linear-gradient(135deg, #2d2d2d 0%, #3d3d3d 100%)"
              : "linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)",
          position: "relative",
          overflow: "hidden",
        }}
        id="testimonios"
      >
        <Container maxWidth="xl" sx={{ px: { xs: 3, sm: 4, md: 0 } }}>
          {/* Section Header */}
          <AnimatedSection animationType="slideUp" delay={0.2}>
            <Box sx={{ textAlign: "center", mb: 12, px: { xs: 2, sm: 0 } }}>
              <AnimatedSection animationType="scale" delay={0.4}>
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 900,
                    mb: 4,
                    color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                    fontSize: { xs: "2.5rem", md: "3.5rem", lg: "4rem" },
                    lineHeight: 1.1,
                    fontFamily:
                      '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                  }}
                >
                  <TypewriterText 
                    text={t("landing.testimonials.title")} 
                    speed={70} 
                    delay={0.6}
                  />
                </Typography>
              </AnimatedSection>
              <AnimatedSection animationType="slideUp" delay={0.8}>
                <Typography
                  variant="h5"
                  sx={{
                    color: theme.palette.mode === "dark" ? "#cccccc" : "#333333",
                    maxWidth: 800,
                    mx: "auto",
                    lineHeight: 1.6,
                    fontWeight: 400,
                    fontFamily:
                      '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                  }}
                >
                  {t("landing.testimonials.subtitle")}
                </Typography>
              </AnimatedSection>
            </Box>
          </AnimatedSection>

          {/* Testimonials Grid */}
          <StaggeredContainer animationType="slideUp" staggerDelay={0.15}>
            <Grid container spacing={4}>
              {[
                {
                  name: t("landing.testimonials.testimonial1.name"),
                  role: t("landing.testimonials.testimonial1.role"),
                  company: t("landing.testimonials.testimonial1.company"),
                  content: t("landing.testimonials.testimonial1.content"),
                  rating: 5,
                },
                {
                  name: t("landing.testimonials.testimonial2.name"),
                  role: t("landing.testimonials.testimonial2.role"),
                  company: t("landing.testimonials.testimonial2.company"),
                  content: t("landing.testimonials.testimonial2.content"),
                  rating: 5,
                },
                {
                  name: t("landing.testimonials.testimonial3.name"),
                  role: t("landing.testimonials.testimonial3.role"),
                  company: t("landing.testimonials.testimonial3.company"),
                  content: t("landing.testimonials.testimonial3.content"),
                  rating: 5,
                },
              ].map((testimonial, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <AnimatedSection animationType="scale" delay={0.1 * index}>
                    <Card
                      sx={{
                        height: "100%",
                        background:
                          theme.palette.mode === "dark" ? "#2d2d2d" : "#ffffff",
                        boxShadow:
                          theme.palette.mode === "dark"
                            ? "0 4px 20px rgba(0,0,0,0.3)"
                            : "0 4px 20px rgba(0,0,0,0.08)",
                        border:
                          theme.palette.mode === "dark"
                            ? "1px solid rgba(255,255,255,0.05)"
                            : "1px solid rgba(0,0,0,0.05)",
                        borderRadius: 0,
                        p: 4,
                        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                        position: "relative",
                        overflow: "hidden",
                        "&:hover": {
                          transform: "translateY(-8px) scale(1.02)",
                          boxShadow:
                            theme.palette.mode === "dark"
                              ? "0 20px 40px rgba(0,0,0,0.5)"
                              : "0 20px 40px rgba(0,0,0,0.12)",
                        },
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          height: "3px",
                          background: "linear-gradient(90deg, #667eea, #764ba2, #f093fb)",
                          opacity: 0,
                          transition: "opacity 0.3s ease",
                        },
                        "&:hover::before": {
                          opacity: 1,
                        },
                      }}
                    >
                      <AnimatedSection animationType="slideUp" delay={0.2 + (0.1 * index)}>
                        <Box sx={{ mb: 3 }}>
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star
                              key={i}
                              sx={{ 
                                fontSize: 20, 
                                color: "#FFD700", 
                                mr: 0.5,
                                transition: "all 0.3s ease",
                                "&:hover": {
                                  transform: "scale(1.2) rotate(15deg)",
                                }
                              }}
                            />
                          ))}
                        </Box>
                      </AnimatedSection>
                      <AnimatedSection animationType="slideUp" delay={0.3 + (0.1 * index)}>
                        <Typography
                          variant="body1"
                          sx={{
                            color:
                              theme.palette.mode === "dark" ? "#cccccc" : "#111111",
                            lineHeight: 1.6,
                            mb: 3,
                            fontStyle: "italic",
                            fontFamily:
                              '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                          }}
                        >
                          &quot;{testimonial.content}&quot;
                        </Typography>
                      </AnimatedSection>
                      <AnimatedSection animationType="slideUp" delay={0.4 + (0.1 * index)}>
                        <Box>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 700,
                              color:
                                theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                              mb: 0.5,
                              fontFamily:
                                '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                            }}
                          >
                            {testimonial.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color:
                                theme.palette.mode === "dark" ? "#aaaaaa" : "#333333",
                              fontWeight: 500,
                              fontFamily:
                                '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                            }}
                          >
                            {testimonial.role}, {testimonial.company}
                          </Typography>
                        </Box>
                      </AnimatedSection>
                    </Card>
                  </AnimatedSection>
                </Grid>
              ))}
            </Grid>
          </StaggeredContainer>
        </Container>
      </Box>

      {/* FAQ Section */}
      <Box
        sx={{
          py: 16,
          background: theme.palette.mode === "dark" ? "#2d2d2d" : "#ffffff",
          position: "relative",
          overflow: "hidden",
        }}
        id="faq"
      >
        <Container maxWidth="xl" sx={{ px: { xs: 3, sm: 4, md: 0 } }}>
          {/* Section Header */}
          <AnimatedSection animationType="slideUp" delay={0.2}>
            <Box sx={{ textAlign: "center", mb: 12, px: { xs: 2, sm: 0 } }}>
              <AnimatedSection animationType="scale" delay={0.4}>
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 900,
                    mb: 4,
                    color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                    fontSize: { xs: "2.5rem", md: "3.5rem", lg: "4rem" },
                    lineHeight: 1.1,
                    fontFamily:
                      '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                  }}
                >
                  <TypewriterText 
                    text={t("landing.faq.title")} 
                    speed={65} 
                    delay={0.6}
                  />
                </Typography>
              </AnimatedSection>
              <AnimatedSection animationType="slideUp" delay={0.8}>
                <Typography
                  variant="h5"
                  sx={{
                    color: theme.palette.mode === "dark" ? "#cccccc" : "#333333",
                    maxWidth: 800,
                    mx: "auto",
                    lineHeight: 1.6,
                    fontWeight: 400,
                    fontFamily:
                      '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                  }}
                >
                  {t("landing.faq.subtitle")}
                </Typography>
              </AnimatedSection>
            </Box>
          </AnimatedSection>

          {/* FAQ Grid */}
          <StaggeredContainer animationType="slideUp" staggerDelay={0.12}>
            <Grid container spacing={4}>
              {[
                {
                  question: t("landing.faq.faq1.question"),
                  answer: t("landing.faq.faq1.answer"),
                },
                {
                  question: t("landing.faq.faq2.question"),
                  answer: t("landing.faq.faq2.answer"),
                },
                {
                  question: t("landing.faq.faq3.question"),
                  answer: t("landing.faq.faq3.answer"),
                },
                {
                  question: t("landing.faq.faq4.question"),
                  answer: t("landing.faq.faq4.answer"),
                },
                {
                  question: t("landing.faq.faq5.question"),
                  answer: t("landing.faq.faq5.answer"),
                },
                {
                  question: t("landing.faq.faq6.question"),
                  answer: t("landing.faq.faq6.answer"),
                },
              ].map((faq, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <AnimatedSection animationType="scale" delay={0.1 * index}>
                    <Card
                      sx={{
                        background:
                          theme.palette.mode === "dark" ? "#2d2d2d" : "#ffffff",
                        boxShadow:
                          theme.palette.mode === "dark"
                            ? "0 4px 20px rgba(0,0,0,0.3)"
                            : "0 4px 20px rgba(0,0,0,0.08)",
                        border:
                          theme.palette.mode === "dark"
                            ? "1px solid rgba(255,255,255,0.05)"
                            : "1px solid rgba(0,0,0,0.05)",
                        borderRadius: 0,
                        p: 4,
                        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                        position: "relative",
                        overflow: "hidden",
                        cursor: "pointer",
                        "&:hover": {
                          transform: "translateY(-8px) scale(1.02)",
                          boxShadow:
                            theme.palette.mode === "dark"
                              ? "0 20px 40px rgba(0,0,0,0.5)"
                              : "0 20px 40px rgba(0,0,0,0.12)",
                        },
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          height: "3px",
                          background: "linear-gradient(90deg, #4facfe, #00f2fe, #43e97b)",
                          opacity: 0,
                          transition: "opacity 0.3s ease",
                        },
                        "&:hover::before": {
                          opacity: 1,
                        },
                      }}
                    >
                      <AnimatedSection animationType="slideUp" delay={0.2 + (0.1 * index)}>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 700,
                            color:
                              theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                            mb: 2,
                            fontFamily:
                              '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                            transition: "all 0.3s ease",
                            "&:hover": {
                              color: theme.palette.mode === "dark" ? "#4facfe" : "#0056b3",
                            },
                          }}
                        >
                          {faq.question}
                        </Typography>
                      </AnimatedSection>
                      <AnimatedSection animationType="slideUp" delay={0.3 + (0.1 * index)}>
                        <Typography
                          variant="body1"
                          sx={{
                            color:
                              theme.palette.mode === "dark" ? "#cccccc" : "#333333",
                            lineHeight: 1.6,
                            fontFamily:
                              '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                          }}
                        >
                          {faq.answer}
                        </Typography>
                      </AnimatedSection>
                    </Card>
                  </AnimatedSection>
                </Grid>
              ))}
            </Grid>
          </StaggeredContainer>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          py: 16,
          background:
            theme.palette.mode === "dark"
              ? "linear-gradient(135deg, #2d2d2d 0%, #3d3d3d 100%)"
              : "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
          color: theme.palette.mode === "dark" ? "white" : "black",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              theme.palette.mode === "dark"
                ? `
                radial-gradient(circle at 20% 80%, rgba(255,255,255,0.03) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(255,255,255,0.03) 0%, transparent 50%),
                radial-gradient(circle at 40% 40%, rgba(255,255,255,0.02) 0%, transparent 50%)
              `
                : `
                radial-gradient(circle at 20% 80%, rgba(0,0,0,0.02) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(0,0,0,0.02) 0%, transparent 50%),
                radial-gradient(circle at 40% 40%, rgba(0,0,0,0.01) 0%, transparent 50%)
              `,
            pointerEvents: "none",
          },
        }}
        id="cta"
      >
        <Container maxWidth="xl" sx={{ px: { xs: 3, sm: 4, md: 0 } }}>
          <AnimatedSection animationType="slideUp" delay={0.2}>
            <Box sx={{ textAlign: "center", px: { xs: 2, sm: 0 } }}>
              <AnimatedSection animationType="scale" delay={0.4}>
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 900,
                    mb: 4,
                    color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                    fontSize: { xs: "2rem", md: "2.5rem", lg: "3rem" },
                    lineHeight: 1.1,
                    fontFamily:
                      '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                  }}
                >
                  <TypewriterText 
                    text={t("landing.cta.title")} 
                    speed={75} 
                    delay={0.6}
                  />
                </Typography>
              </AnimatedSection>
              <AnimatedSection animationType="slideUp" delay={0.8}>
                <Typography
                  variant="h5"
                  sx={{
                    color:
                      theme.palette.mode === "dark"
                        ? "rgba(255,255,255,0.8)"
                        : "rgba(0,0,0,0.8)",
                    maxWidth: 800,
                    mx: "auto",
                    lineHeight: 1.6,
                    fontWeight: 400,
                    mb: 6,
                    fontFamily:
                      '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                  }}
                >
                  {t("landing.cta.subtitle")}
                </Typography>
              </AnimatedSection>
            </Box>
          </AnimatedSection>
          
          <AnimatedSection animationType="slideUp" delay={1.0}>
            <Box
              sx={{
                display: "flex",
                gap: 3,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Button
                variant="contained"
                size="large"
                sx={{
                  background:
                    theme.palette.mode === "dark"
                      ? "linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)"
                      : "linear-gradient(135deg, #000000 0%, #333333 100%)",
                  color: theme.palette.mode === "dark" ? "#000000" : "#ffffff",
                  px: 6,
                  py: 2,
                  borderRadius: 0,
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  textTransform: "none",
                  boxShadow:
                    theme.palette.mode === "dark"
                      ? "0 8px 32px rgba(255,255,255,0.3)"
                      : "0 8px 32px rgba(0,0,0,0.3)",
                  "&:hover": {
                    background:
                      theme.palette.mode === "dark"
                        ? "linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%)"
                        : "linear-gradient(135deg, #333333 0%, #000000 100%)",
                    transform: "translateY(-2px)",
                    boxShadow:
                      theme.palette.mode === "dark"
                        ? "0 12px 40px rgba(255,255,255,0.4)"
                        : "0 12px 40px rgba(0,0,0,0.4)",
                  },
                  transition: "all 0.3s ease",
                }}
                onClick={() => smoothScrollTo("contacto")}
              >
                {t("landing.cta.primaryButton")}
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  border:
                    theme.palette.mode === "dark"
                      ? "2px solid rgba(255,255,255,0.3)"
                      : "2px solid rgba(0,0,0,0.3)",
                  color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                  px: 6,
                  py: 2,
                  borderRadius: 0,
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  textTransform: "none",
                  "&:hover": {
                    border:
                      theme.palette.mode === "dark"
                        ? "2px solid rgba(255,255,255,0.5)"
                        : "2px solid rgba(0,0,0,0.5)",
                    background:
                      theme.palette.mode === "dark"
                        ? "rgba(255,255,255,0.1)"
                        : "rgba(0,0,0,0.1)",
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.3s ease",
                }}
                onClick={() => smoothScrollTo("demo")}
              >
                {t("landing.cta.secondaryButton")}
              </Button>
            </Box>
          </AnimatedSection>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          background:
            theme.palette.mode === "dark"
              ? "linear-gradient(135deg, #000000 0%, #1a1a1a 100%)"
              : "linear-gradient(135deg, #e0e0e0 0%, #d0d0d0 100%)",
          color: theme.palette.mode === "dark" ? "white" : "black",
          py: 10,
          position: "relative",
          overflow: "hidden",
        }}
        id="footer"
      >
        {/* Background Pattern */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              theme.palette.mode === "dark"
                ? "radial-gradient(circle at 20% 80%, rgba(255,255,255,0.03) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.03) 0%, transparent 50%)"
                : "radial-gradient(circle at 20% 80%, rgba(0,0,0,0.03) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(0,0,0,0.03) 0%, transparent 50%)",
            pointerEvents: "none",
          }}
        />

        <Container
          maxWidth="xl"
          sx={{ position: "relative", zIndex: 1, px: { xs: 3, sm: 4, md: 0 } }}
        >
          {/* Main Footer Content */}
          <Grid container spacing={6}>
            {/* Company Info */}
            <Grid item xs={12} lg={4}>
              <AnimatedSection animationType="slideUp" delay={0.2}>
                <Box sx={{ mb: 6 }}>
                  <AnimatedSection animationType="scale" delay={0.4}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          background:
                            theme.palette.mode === "dark"
                              ? "linear-gradient(135deg, #ffffff 0%, #f8f8f8 100%)"
                              : "linear-gradient(135deg, #000000 0%, #333333 100%)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          mr: 3,
                          //borderRadius: "12px",
                          boxShadow:
                            theme.palette.mode === "dark"
                              ? "0 4px 20px rgba(255,255,255,0.1)"
                              : "0 4px 20px rgba(0,0,0,0.1)",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            transform: "scale(1.1) rotate(5deg)",
                          },
                        }}
                      >
                        <Typography
                          sx={{
                            color:
                              theme.palette.mode === "dark" ? "#000000" : "#ffffff",
                            fontSize: "2.5rem",
                            fontWeight: 700,
                            fontFamily: "var(--font-league-spartan), sans-serif",
                            letterSpacing: "-0.05em",
                          }}
                        >
                          p.
                        </Typography>
                      </Box>
                      <Box>
                        <AnimatedSection animationType="slideUp" delay={0.6}>
                          <Typography
                            variant="h5"
                            sx={{
                              fontWeight: 700,
                              fontSize: "1.5rem",
                              letterSpacing: "-0.05em",
                              fontFamily: "var(--font-league-spartan), sans-serif",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <Box
                              component="span"
                              sx={{
                                color:
                                  theme.palette.mode === "dark"
                                    ? "#ffffff"
                                    : "#000000",
                                fontWeight: 700,
                              }}
                            >
                              park
                            </Box>
                            <Box
                              component="span"
                              sx={{
                                color:
                                  theme.palette.mode === "dark"
                                    ? "#00d4ff"
                                    : "#0056b3",
                                fontWeight: 700,
                              }}
                            >
                              it.
                            </Box>
                          </Typography>
                        </AnimatedSection>
                        <AnimatedSection animationType="slideUp" delay={0.8}>
                          <Typography
                            variant="body2"
                            sx={{
                              opacity: 0.7,
                              fontWeight: 500,
                              color:
                                theme.palette.mode === "dark" ? "#cccccc" : "#333333",
                              fontFamily:
                                '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                            }}
                          >
                            {t("landing.footer.tagline")}
                          </Typography>
                        </AnimatedSection>
                      </Box>
                    </Box>
                  </AnimatedSection>
                  
                  <AnimatedSection animationType="slideUp" delay={1.0}>
                    <Typography
                  variant="body1"
                  sx={{
                    opacity: 0.8,
                    lineHeight: 1.7,
                    color:
                      theme.palette.mode === "dark" ? "#cccccc" : "#333333",
                    fontFamily:
                      '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                    mb: 4,
                  }}
                >
                  {t("landing.contact.info.description")}
                </Typography>

                {/* Social Media */}
                <Box sx={{ display: "flex", gap: 2 }}>
                  <IconButton
                    sx={{
                      width: 44,
                      height: 44,
                      background:
                        theme.palette.mode === "dark"
                          ? "rgba(255,255,255,0.1)"
                          : "rgba(0,0,0,0.1)",
                      border:
                        theme.palette.mode === "dark"
                          ? "1px solid rgba(255,255,255,0.2)"
                          : "1px solid rgba(0,0,0,0.2)",
                      color: theme.palette.mode === "dark" ? "white" : "black",
                      "&:hover": {
                        background:
                          theme.palette.mode === "dark"
                            ? "rgba(255,255,255,0.2)"
                            : "rgba(0,0,0,0.2)",
                        transform: "translateY(-2px)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    <LinkedIn sx={{ fontSize: 20 }} />
                  </IconButton>
                  <IconButton
                    sx={{
                      width: 44,
                      height: 44,
                      background:
                        theme.palette.mode === "dark"
                          ? "rgba(255,255,255,0.1)"
                          : "rgba(0,0,0,0.1)",
                      border:
                        theme.palette.mode === "dark"
                          ? "1px solid rgba(255,255,255,0.2)"
                          : "1px solid rgba(0,0,0,0.2)",
                      color: theme.palette.mode === "dark" ? "white" : "black",
                      "&:hover": {
                        background:
                          theme.palette.mode === "dark"
                            ? "rgba(255,255,255,0.2)"
                            : "rgba(0,0,0,0.2)",
                        transform: "translateY(-2px)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    <Twitter sx={{ fontSize: 20 }} />
                  </IconButton>
                  <IconButton
                    sx={{
                      width: 44,
                      height: 44,
                      background:
                        theme.palette.mode === "dark"
                          ? "rgba(255,255,255,0.1)"
                          : "rgba(0,0,0,0.1)",
                      border:
                        theme.palette.mode === "dark"
                          ? "1px solid rgba(255,255,255,0.2)"
                          : "1px solid rgba(0,0,0,0.2)",
                      color: theme.palette.mode === "dark" ? "white" : "black",
                      "&:hover": {
                        background:
                          theme.palette.mode === "dark"
                            ? "rgba(255,255,255,0.2)"
                            : "rgba(0,0,0,0.2)",
                        transform: "translateY(-2px)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    <Instagram sx={{ fontSize: 20 }} />
                  </IconButton>
                </Box>
              </AnimatedSection>
            </Box>
          </AnimatedSection>
        </Grid>

            {/* Contact Info */}
            <Grid item xs={12} md={6} lg={4}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  mb: 4,
                  fontFamily:
                    '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                  background:
                    theme.palette.mode === "dark"
                      ? "linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%)"
                      : "linear-gradient(135deg, #000000 0%, #333333 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {t("landing.contact.info.title")}
              </Typography>

              <Box sx={{ mb: 4 }}>
                <Link
                  href="tel:+50662164040"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 3,
                    p: 2,
                    transition: "all 0.3s ease",
                    textDecoration: "none",
                    color: "inherit",
                    "&:hover": {
                      background:
                        theme.palette.mode === "dark"
                          ? "rgba(255,255,255,0.1)"
                          : "rgba(0,0,0,0.05)",
                      transform: "translateX(4px)",
                    },
                  }}
                >
                  <Phone sx={{ fontSize: 20, mr: 3, opacity: 0.9 }} />
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{
                        opacity: 0.7,
                        fontSize: "0.75rem",
                        fontWeight: 500,
                        color:
                          theme.palette.mode === "dark" ? "#cccccc" : "#666666",
                      }}
                    >
                      {t("landing.contact.channels.phone")}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        opacity: 0.9,
                        fontWeight: 600,
                        color:
                          theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      }}
                    >
                      {t("landing.contact.info.phone")}
                    </Typography>
                  </Box>
                </Link>

                <Link
                  href="https://wa.me/50662164040"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 3,
                    p: 2,
                    transition: "all 0.3s ease",
                    textDecoration: "none",
                    color: "inherit",
                    "&:hover": {
                      background:
                        theme.palette.mode === "dark"
                          ? "rgba(255,255,255,0.1)"
                          : "rgba(0,0,0,0.05)",
                      transform: "translateX(4px)",
                    },
                  }}
                >
                  <WhatsApp sx={{ fontSize: 20, mr: 3, color: "#25D366" }} />
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{
                        opacity: 0.7,
                        fontSize: "0.75rem",
                        fontWeight: 500,
                        color:
                          theme.palette.mode === "dark" ? "#cccccc" : "#666666",
                      }}
                    >
                      {t("landing.contact.channels.whatsapp")}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        opacity: 0.9,
                        fontWeight: 600,
                        color:
                          theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      }}
                    >
                      {t("landing.contact.info.whatsapp")}
                    </Typography>
                  </Box>
                </Link>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 3,
                    p: 2,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      background:
                        theme.palette.mode === "dark"
                          ? "rgba(255,255,255,0.1)"
                          : "rgba(0,0,0,0.05)",
                      transform: "translateX(4px)",
                    },
                  }}
                >
                  <Email sx={{ fontSize: 20, mr: 3, opacity: 0.9 }} />
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{
                        opacity: 0.7,
                        fontSize: "0.75rem",
                        fontWeight: 500,
                        color:
                          theme.palette.mode === "dark" ? "#cccccc" : "#666666",
                      }}
                    >
                      {t("landing.contact.channels.email")}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        opacity: 0.9,
                        fontWeight: 600,
                        color:
                          theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      }}
                    >
                      {t("landing.contact.info.email")}
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 3,
                    p: 2,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      background:
                        theme.palette.mode === "dark"
                          ? "rgba(255,255,255,0.1)"
                          : "rgba(0,0,0,0.05)",
                      transform: "translateX(4px)",
                    },
                  }}
                >
                  <LocationOn sx={{ fontSize: 20, mr: 3, opacity: 0.9 }} />
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{
                        opacity: 0.7,
                        fontSize: "0.75rem",
                        fontWeight: 500,
                        color:
                          theme.palette.mode === "dark" ? "#cccccc" : "#666666",
                      }}
                    >
                      {t("landing.footer.address")}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        opacity: 0.9,
                        fontWeight: 600,
                        color:
                          theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      }}
                    >
                      {t("landing.contact.info.address")}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>

            {/* Quick Links */}
            <Grid item xs={12} md={6} lg={4}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  mb: 4,
                  fontFamily:
                    '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                  background:
                    theme.palette.mode === "dark"
                      ? "linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%)"
                      : "linear-gradient(135deg, #000000 0%, #333333 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {t("landing.footer.quickLinks")}
              </Typography>

              <Box sx={{ mb: 4 }}>
                <Button
                  variant="text"
                  sx={{
                    color: theme.palette.mode === "dark" ? "white" : "black",
                    opacity: 0.8,
                    p: 2,
                    mb: 1,
                    minWidth: "auto",
                    justifyContent: "flex-start",
                    textTransform: "none",
                    width: "100%",
                    "&:hover": {
                      opacity: 1,
                      background:
                        theme.palette.mode === "dark"
                          ? "rgba(255,255,255,0.1)"
                          : "rgba(0,0,0,0.1)",
                      transform: "translateX(4px)",
                    },
                    transition: "all 0.3s ease",
                  }}
                  onClick={() => smoothScrollTo("soluciones")}
                >
                  {t("landing.navigation.solutions")}
                </Button>
                <Button
                  variant="text"
                  sx={{
                    color: theme.palette.mode === "dark" ? "white" : "black",
                    opacity: 0.8,
                    p: 2,
                    mb: 1,
                    minWidth: "auto",
                    justifyContent: "flex-start",
                    textTransform: "none",
                    width: "100%",
                    "&:hover": {
                      opacity: 1,
                      background:
                        theme.palette.mode === "dark"
                          ? "rgba(255,255,255,0.1)"
                          : "rgba(0,0,0,0.1)",
                      transform: "translateX(4px)",
                    },
                    transition: "all 0.3s ease",
                  }}
                  onClick={() => smoothScrollTo("como-funciona")}
                >
                  {t("landing.howItWorks.title")}
                </Button>

                <Button
                  variant="text"
                  sx={{
                    color: theme.palette.mode === "dark" ? "white" : "black",
                    opacity: 0.8,
                    p: 2,
                    mb: 1,
                    minWidth: "auto",
                    justifyContent: "flex-start",
                    textTransform: "none",
                    width: "100%",
                    "&:hover": {
                      opacity: 1,
                      background:
                        theme.palette.mode === "dark"
                          ? "rgba(255,255,255,0.1)"
                          : "rgba(0,0,0,0.1)",
                      transform: "translateX(4px)",
                    },
                    transition: "all 0.3s ease",
                  }}
                  onClick={() => smoothScrollTo("faq")}
                >
                  {t("landing.faq.title")}
                </Button>
              </Box>

              {/* Newsletter Signup */}
              <Box
                sx={{
                  p: 3,
                  borderRadius: 0,
                  background:
                    theme.palette.mode === "dark"
                      ? "rgba(255,255,255,0.05)"
                      : "rgba(0,0,0,0.05)",
                  border:
                    theme.palette.mode === "dark"
                      ? "1px solid rgba(255,255,255,0.1)"
                      : "1px solid rgba(0,0,0,0.1)",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    mb: 2,
                    color:
                      theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                    fontFamily:
                      '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                  }}
                >
                  {t("landing.footer.newsletter.title")}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    opacity: 0.7,
                    mb: 3,
                    color:
                      theme.palette.mode === "dark" ? "#cccccc" : "#333333",
                    fontFamily:
                      '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                  }}
                >
                  {t("landing.footer.newsletter.description")}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    flexDirection: { xs: "column", sm: "row" },
                  }}
                >
                  <TextField
                    size="small"
                    placeholder={t("landing.footer.newsletter.placeholder")}
                    variant="outlined"
                    sx={{
                      flex: 1,
                      "& .MuiOutlinedInput-root": {
                        color:
                          theme.palette.mode === "dark" ? "white" : "black",
                        background:
                          theme.palette.mode === "dark"
                            ? "rgba(255,255,255,0.05)"
                            : "rgba(0,0,0,0.05)",
                        borderRadius: 0,
                        border:
                          theme.palette.mode === "dark"
                            ? "1px solid rgba(255,255,255,0.1)"
                            : "1px solid rgba(0,0,0,0.1)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          background:
                            theme.palette.mode === "dark"
                              ? "rgba(255,255,255,0.08)"
                              : "rgba(0,0,0,0.08)",
                          border:
                            theme.palette.mode === "dark"
                              ? "1px solid rgba(255,255,255,0.2)"
                              : "1px solid rgba(0,0,0,0.2)",
                          transform: "translateY(-1px)",
                        },
                        "&.Mui-focused": {
                          background:
                            theme.palette.mode === "dark"
                              ? "rgba(255,255,255,0.1)"
                              : "rgba(0,0,0,0.1)",
                          border:
                            theme.palette.mode === "dark"
                              ? "1px solid rgba(255,255,255,0.3)"
                              : "1px solid rgba(0,0,0,0.3)",
                          boxShadow:
                            theme.palette.mode === "dark"
                              ? "0 0 0 2px rgba(255,255,255,0.1)"
                              : "0 0 0 2px rgba(0,0,0,0.1)",
                        },
                        "& fieldset": {
                          border: "none",
                        },
                      },
                      "& .MuiInputBase-input": {
                        padding: "12px 16px",
                        fontSize: "0.875rem",
                        fontWeight: 500,
                        fontFamily:
                          '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                        "&::placeholder": {
                          color:
                            theme.palette.mode === "dark"
                              ? "rgba(255,255,255,0.6)"
                              : "rgba(0,0,0,0.6)",
                          opacity: 1,
                          fontWeight: 400,
                        },
                      },
                      "& .MuiInputLabel-root": {
                        color:
                          theme.palette.mode === "dark"
                            ? "rgba(255,255,255,0.7)"
                            : "rgba(0,0,0,0.7)",
                        fontWeight: 500,
                      },
                    }}
                  />
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      background:
                        theme.palette.mode === "dark"
                          ? "linear-gradient(135deg, #ffffff 0%, #f8f8f8 100%)"
                          : "linear-gradient(135deg, #000000 0%, #333333 100%)",
                      color:
                        theme.palette.mode === "dark" ? "#000000" : "#ffffff",
                      fontWeight: 700,
                      px: 4,
                      py: 1.5,
                      borderRadius: 0,
                      border:
                        theme.palette.mode === "dark"
                          ? "1px solid rgba(255,255,255,0.2)"
                          : "1px solid rgba(255,255,255,0.2)",
                      boxShadow:
                        theme.palette.mode === "dark"
                          ? "0 4px 20px rgba(255,255,255,0.1)"
                          : "0 4px 20px rgba(0,0,0,0.1)",
                      fontFamily:
                        '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: "0.875rem",
                      textTransform: "none",
                      minWidth: "120px",
                      "&:hover": {
                        background:
                          theme.palette.mode === "dark"
                            ? "linear-gradient(135deg, #f8f8f8 0%, #e8e8e8 100%)"
                            : "linear-gradient(135deg, #333333 0%, #000000 100%)",
                        transform: "translateY(-2px)",
                        boxShadow:
                          theme.palette.mode === "dark"
                            ? "0 6px 25px rgba(255,255,255,0.15)"
                            : "0 6px 25px rgba(0,0,0,0.15)",
                      },
                      "&:active": {
                        transform: "translateY(0px)",
                        boxShadow:
                          theme.palette.mode === "dark"
                            ? "0 2px 10px rgba(255,255,255,0.1)"
                            : "0 2px 10px rgba(0,0,0,0.1)",
                      },
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  >
                    {t("landing.footer.newsletter.subscribe")}
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>

          {/* Footer Bottom */}
          <Box
            sx={{
              borderTop:
                theme.palette.mode === "dark"
                  ? "1px solid rgba(255,255,255,0.1)"
                  : "1px solid rgba(0,0,0,0.1)",
              pt: 4,
              mt: 6,
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "space-between",
              alignItems: "center",
              gap: 2,
              px: { xs: 2, sm: 0 },
            }}
          >
            <Typography
              variant="body2"
              sx={{
                opacity: 0.7,
                fontFamily:
                  '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
              }}
            >
              {t("landing.footer.copyright")}
            </Typography>

            <Box sx={{ display: "flex", gap: 3 }}>
              <Link
                href="/privacy"
                sx={{
                  opacity: 0.7,
                  cursor: "pointer",
                  color: theme.palette.mode === "dark" ? "white" : "black",
                  textDecoration: "none",
                  "&:hover": { opacity: 1 },
                  transition: "opacity 0.3s ease",
                }}
              >
                <Typography variant="body2">
                  {t("landing.footer.legal.privacy")}
                </Typography>
              </Link>
              <Link
                href="/terms"
                sx={{
                  opacity: 0.7,
                  cursor: "pointer",
                  color: theme.palette.mode === "dark" ? "white" : "black",
                  textDecoration: "none",
                  "&:hover": { opacity: 1 },
                  transition: "opacity 0.3s ease",
                }}
              >
                <Typography variant="body2">
                  {t("landing.footer.legal.terms")}
                </Typography>
              </Link>
              <Link
                href="/cookies"
                sx={{
                  opacity: 0.7,
                  cursor: "pointer",
                  color: theme.palette.mode === "dark" ? "white" : "black",
                  textDecoration: "none",
                  "&:hover": { opacity: 1 },
                  transition: "opacity 0.3s ease",
                }}
              >
                <Typography variant="body2">
                  {t("landing.footer.legal.cookies")}
                </Typography>
              </Link>
            </Box>
          </Box>
        </Container>
      </Box>

      

      {/* Login Dialog */}
      <Dialog
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 0,
            background: "#ffffff",
          },
        }}
      >
        <DialogTitle>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                fontFamily:
                  '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
              }}
            >
              {t("landing.navigation.proAccess")}
            </Typography>
            <IconButton onClick={() => setLoginOpen(false)}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label={t("landing.login.email")}
              type="email"
              value={loginData.email}
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
              sx={{ mb: 3 }}
            />
            <TextField
              fullWidth
              label={t("landing.login.password")}
              type="password"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
            />
            <Alert severity="info" sx={{ mt: 2 }}>
              {t("landing.login.demoInfo")}
            </Alert>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setLoginOpen(false)} sx={{ color: "#666666" }}>
            {t("common.cancel")}
          </Button>
          <Button
            variant="contained"
            onClick={handleLogin}
            startIcon={<Login />}
            sx={{
              background: "#000000",
              color: "#ffffff",
              px: 3,
              fontWeight: 600,
              "&:hover": {
                background: "#333333",
              },
            }}
          >
            {t("landing.login.login")}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

// Admin Dashboard Component
function AdminDashboard() {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box mb={4}>
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            fontWeight: 800,
            fontFamily:
              '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
          }}
        >
          Panel de Administración
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            fontFamily:
              '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
          }}
        >
          Gestiona tu sistema de parking desde aquí
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Card
            sx={{
              background: "#ffffff",
              border: "1px solid #f0f0f0",
            }}
          >
            <CardContent sx={{ textAlign: "center" }}>
              <LocalParking sx={{ fontSize: 40, mb: 1, color: "#000000" }} />
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  fontFamily:
                    '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                }}
              >
                47
              </Typography>
              <Typography
                sx={{
                  opacity: 0.8,
                  fontFamily:
                    '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                }}
              >
                Espacios Disponibles
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card
            sx={{
              background: "#ffffff",
              border: "1px solid #f0f0f0",
            }}
          >
            <CardContent sx={{ textAlign: "center" }}>
              <DirectionsCar sx={{ fontSize: 40, mb: 1, color: "#000000" }} />
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  fontFamily:
                    '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                }}
              >
                23
              </Typography>
              <Typography
                sx={{
                  opacity: 0.8,
                  fontFamily:
                    '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                }}
              >
                Vehiculos Activos
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card
            sx={{
              background: "#ffffff",
              border: "1px solid #f0f0f0",
            }}
          >
            <CardContent sx={{ textAlign: "center" }}>
              <Payment sx={{ fontSize: 40, mb: 1, color: "#000000" }} />
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  fontFamily:
                    '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                }}
              >
                $2,847
              </Typography>
              <Typography
                sx={{
                  opacity: 0.8,
                  fontFamily:
                    '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                }}
              >
                Ingresos Hoy
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card
            sx={{
              background: "#ffffff",
              border: "1px solid #f0f0f0",
            }}
          >
            <CardContent sx={{ textAlign: "center" }}>
              <QrCode sx={{ fontSize: 40, mb: 1, color: "#000000" }} />
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  fontFamily:
                    '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                }}
              >
                156
              </Typography>
              <Typography
                sx={{
                  opacity: 0.8,
                  fontFamily:
                    '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                }}
              >
                Escaneos QR
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
