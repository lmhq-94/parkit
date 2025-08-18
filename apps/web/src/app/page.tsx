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
  CloseIcon,
  PremiumIcon as StarIcon,
  PhoneIcon,
  EmailIcon as MailIcon,
  LocationIcon as MapPinIcon,
  ChatIcon as MessageIcon,
  LinkIcon,
  ShareIcon,
  LikeIcon as HeartIcon,
  GrowthIcon as TrendingUpIcon,
  PerformanceIcon as ZapIcon,
  AnalyticsIcon as BarChartIcon,
  SecurityIcon as ShieldIcon,
  HelpIcon,
  QrCodeIcon,
  MobileIcon,
  DashboardIcon,
  LoginIcon,
  VehicleIcon as CarIcon,
  PaymentIcon as CreditCardIcon,
  AwardIcon,
  InnovationIcon as RocketIcon,
  PlayIcon as PlayArrowIcon,
  ArrowUpIcon,
  CrownIcon as WorkspacePremiumIcon,
  ParkingIcon as LocalParkingIcon,
  OfficeIcon as BuildingIcon,
  CalendarIcon,
  HistoryIcon,
  ConnectivityIcon as WifiIcon,
  ManagementIcon,
  AutomationIcon,
  ExperienceIcon,
  AnalyticsIcon,
  SecurityIcon,
  SupportIcon,
  SettingsIcon,
  ThumbsUpIcon,
  PieChartIcon,
  SecurityLockIcon as LockIcon,
  MonitorIcon,
  BusinessIcon,
  GoalIcon,
} from "../components/icons";
import { useAuthStore } from "../store/authStore";
import { DashboardLayout } from "../components/layout/DashboardLayout";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { ThemeContext } from "../providers";
import { FaLinkedin, FaInstagram, FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";

// Import custom components
import { Navbar } from "../components/navigation/Navbar";
import { MobileDrawer } from "../components/navigation/MobileDrawer";
import { ScrollToTopButton } from "../components/ScrollToTopButton";
import { Logo } from "../components/Logo";

// Import utilities and constants
import { 
  getInitialTheme, 
  getInitialLanguage, 
  saveThemePreference, 
  saveLanguagePreference,
  smoothScrollTo 
} from "../utils/themeUtils";
import { CONTACT_INFO } from "../constants";

/**
 * Animation delays for different sections (in seconds)
 * Reduced delays for faster, more responsive animations
 */
const ANIMATION_DELAYS = {
  HERO: 0.1,
  FEATURES: 0.2,
  TESTIMONIALS: 0.3,
  FAQ: 0.4,
  CTA: 0.5,
} as const;

/**
 * Stagger delays for grid animations
 * Reduced delays for faster, more responsive animations
 */
const STAGGER_DELAYS = {
  FEATURES: 0.1,
  TESTIMONIALS: 0.08,
  FAQ: 0.06,
} as const;

/**
 * Main landing page component for ParkIt application
 * Features responsive design, theme switching, internationalization, and smooth animations
 */
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

  // Function to change language
  const handleLanguageChange = () => {
    const newLanguage = currentLanguage === 'es' ? 'en' : 'es';
    setCurrentLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
    forceUpdate({}); 
  };

  // Function to change theme
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

  // Function for smooth scrolling
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

  // Function for navigation that closes the drawer
  const handleNavigation = (elementId: string) => {
    smoothScrollTo(elementId);
    setMobileOpen(false); // Cerrar el drawer
  };

  // Function for login
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

  // Force re-render when language changes
  const key = `page-${currentLanguage}`;

  /**
   * Function to get testimonials subtitle based on current language
   * @returns JSX element with appropriate language text
   */
  const getTestimonialsSubtitle = () => {
    if (currentLanguage === 'en') {
      return (
        <>
          Companies that trust parkit. to manage their parking
        </>
      );
    }
    return (
      <>
        Empresas que confían en parkit. para gestionar su parqueo
      </>
    );
  };

  /**
   * Function to get FAQ subtitle based on current language
   * @returns JSX element with appropriate language text
   */
  const getFaqSubtitle = () => {
    if (currentLanguage === 'en') {
      return (
        <>
          We answer your questions about parkit.
        </>
      );
    }
    return (
      <>
        Resolvemos tus dudas sobre parkit.
      </>
    );
  };

  /**
   * Function to get CTA subtitle based on current language
   * @returns JSX element with appropriate language text
   */
  const getCtaSubtitle = () => {
    if (currentLanguage === 'en') {
      return (
        <>
          Join companies that are already using parkit. to efficiently manage their parking spaces
        </>
      );
    }
    return (
      <>
        Únete a empresas que ya están usando parkit. para gestionar sus espacios de parking de forma eficiente
      </>
    );
  };

  /**
   * Function to get footer copyright based on current language
   * @returns JSX element with appropriate language text
   */
  const getFooterCopyright = () => {
    if (currentLanguage === 'en') {
      return (
        <>
          © {new Date().getFullYear()} parkit. All rights reserved.
        </>
      );
    }
    return (
      <>
        © {new Date().getFullYear()} parkit. Todos los derechos reservados.
      </>
    );
  };

  /**
   * Function to get features section title based on current language
   * @returns JSX element with Logo component and appropriate language text
   */
  const getFeaturesTitle = () => {
    if (currentLanguage === 'en') {
      return (
        <>
          Why Choose{' '}
          <Box component="span" sx={{ display: "inline-flex", alignItems: "center" }}>
            <Logo variant="h2" fontSize="4rem" fontWeight={900} />
          </Box>
          ?
        </>
      );
    }
    return (
      <>
        ¿Por qué elegir{' '}
        <Box component="span" sx={{ display: "inline-flex", alignItems: "center" }}>
          <Logo variant="h2" fontSize="4rem" fontWeight={900} />
        </Box>
        ?
      </>
    );
  };

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
            ? `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 50%, ${theme.palette.background.default} 100%)`
            : `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[50]} 50%, ${theme.palette.background.paper} 100%)`,
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
              <AnimatedSection animationType="slideUp" delay={ANIMATION_DELAYS.HERO}>
                <Box>
                  {/* Premium Badge */}
                  <AnimatedSection animationType="scale" delay={ANIMATION_DELAYS.FEATURES}>
                    <Box sx={{ mb: 4 }}>
                      <Chip
                        icon={<WorkspacePremiumIcon />}
                        label={t("landing.hero.premiumBadge")}
                        sx={{
                          background: `linear-gradient(135deg, ${theme.palette.primary.main}15, ${theme.palette.secondary.main}15)`,
                          border: `1px solid ${theme.palette.primary.main}30`,
                          color: theme.palette.primary.main,
                          fontWeight: 700,
                          fontSize: "0.875rem",
                          backdropFilter: "blur(20px)",
                          borderRadius: 2.5,
                          px: 1,
                          py: 1,
                          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                          "& .MuiChip-icon": {
                            color: theme.palette.warning.main,
                            fontSize: "1.2rem",
                          },
                          "& .MuiChip-label": {
                            px: 1.5,
                            fontSize: "0.875rem",
                            fontWeight: 700,
                          },
                          "&:hover": {
                            transform: "translateY(-2px)",
                            boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
                          },
                        }}
                      />
                    </Box>
                  </AnimatedSection>

                  {/* Main Headline */}
                  <AnimatedSection animationType="slideUp" delay={ANIMATION_DELAYS.HERO + 0.4}>
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
                        delay={0.4}
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
                          delay={0.6}
                        />
                      </Box>
                    </Typography>
                  </AnimatedSection>

                  {/* Description */}
                  <AnimatedSection animationType="slideUp" delay={ANIMATION_DELAYS.HERO + 0.4}>
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
                  <AnimatedSection animationType="slideUp" delay={ANIMATION_DELAYS.HERO + 0.5}>
                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      spacing={3}
                      sx={{ mb: 8 }}
                    >
                      <Button
                        variant="contained"
                        size="large"
                        endIcon={<RocketIcon />}
                        sx={{
                          background: theme.palette.primary.main,
                          color: theme.palette.primary.contrastText,
                          px: 6,
                          py: 2,
                          borderRadius: theme.shape.borderRadius,
                          fontWeight: 700,
                          fontSize: "1.1rem",
                          textTransform: "none",
                          boxShadow: theme.shadows[4],
                          "&:hover": {
                            background: theme.palette.primary.dark,
                            transform: "translateY(-2px)",
                            boxShadow: theme.shadows[8],
                          },
                          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        }}
                        onClick={() => smoothScrollTo("contacto")}
                      >
                        {t("landing.cta.primaryButton")}
                      </Button>
                      <Button
                        variant="outlined"
                        size="large"
                        startIcon={<PlayArrowIcon />}
                        sx={{
                          border: `2px solid ${theme.palette.primary.main}`,
                          color: theme.palette.primary.main,
                          px: 6,
                          py: 2,
                          borderRadius: theme.shape.borderRadius,
                          fontWeight: 700,
                          fontSize: "1.1rem",
                          textTransform: "none",
                          "&:hover": {
                            border: `2px solid ${theme.palette.primary.dark}`,
                            background: theme.palette.primary.main,
                            color: theme.palette.primary.contrastText,
                            transform: "translateY(-2px)",
                            boxShadow: theme.shadows[4],
                          },
                          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        }}
                        onClick={() => smoothScrollTo("demo")}
                      >
                        {t("landing.cta.secondaryButton")}
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
              <AnimatedSection animationType="scale" delay={ANIMATION_DELAYS.HERO + 0.4}>
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
          <AnimatedSection animationType="slideUp" delay={ANIMATION_DELAYS.FEATURES}>
            <Box sx={{ textAlign: "center", mb: 12, px: { xs: 2, sm: 0 } }}>
              <AnimatedSection animationType="scale" delay={ANIMATION_DELAYS.FEATURES}>
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
                    borderRadius: 2,
                  }}
                >
                  <TrendingUpIcon
                    style={{
                      fontSize: 24,
                      marginRight: 16,
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                    }}
                  />
                  <Typography
                    variant="overline"
                    sx={{
                      fontWeight: 600,
                      color: theme.palette.mode === "dark" ? "#cccccc" : "#666666",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {t("landing.features.badges.benefits")}
                  </Typography>
                </Box>
              </AnimatedSection>
              <AnimatedSection animationType="slideUp" delay={ANIMATION_DELAYS.FEATURES + 0.4}>
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 900,
                    mb: 4,
                    color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                    fontSize: { xs: "2.5rem", md: "3.5rem", lg: "4rem" },
                    lineHeight: 1.1,
                  }}
                >
                  {getFeaturesTitle()}
                </Typography>
                {/* Visual Divider */}
                <Box
                  sx={{
                    width: { xs: "60px", md: "80px" },
                    height: "4px",
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    borderRadius: "2px",
                    mx: "auto",
                    mb: 4,
                    boxShadow: "0 2px 8px rgba(102, 126, 234, 0.3)",
                  }}
                />
              </AnimatedSection>
              <AnimatedSection animationType="slideUp" delay={ANIMATION_DELAYS.FEATURES + 0.6}>
                <Typography
                  variant="h5"
                  sx={{
                    color: theme.palette.mode === "dark" ? "#cccccc" : "#333333",
                    maxWidth: 800,
                    mx: "auto",
                    lineHeight: 1.6,
                    fontWeight: 400,
                  }}
                >
                  {t("landing.features.subtitle")}
                </Typography>
              </AnimatedSection>
            </Box>
          </AnimatedSection>

          {/* Benefits Grid */}
          <StaggeredContainer animationType="slideUp" staggerDelay={STAGGER_DELAYS.FEATURES}>
            <Grid container spacing={4}>
              {[
                {
                  icon: <ManagementIcon style={{ fontSize: 64 }} />, // Data management for business
                  title: t("landing.features.benefits.revenue.title"),
                  description: t("landing.features.benefits.revenue.description"),
                  longDescription: t(
                    "landing.features.benefits.revenue.longDescription"
                  ),

                  gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  badge: t("landing.features.cardBadges.management"),
                },
                {
                  icon: <AutomationIcon style={{ fontSize: 64 }} />, // Automation for efficiency
                  title: t("landing.features.benefits.automation.title"),
                  description: t(
                    "landing.features.benefits.automation.description"
                  ),
                  longDescription: t(
                    "landing.features.benefits.automation.longDescription"
                  ),

                  gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                  badge: t("landing.features.cardBadges.automation"),
                },
                {
                  icon: <ExperienceIcon style={{ fontSize: 64 }} />, // User experience focus
                  title: t("landing.features.benefits.experience.title"),
                  description: t(
                    "landing.features.benefits.experience.description"
                  ),
                  longDescription: t(
                    "landing.features.benefits.experience.longDescription"
                  ),

                  gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                  badge: t("landing.features.cardBadges.experience"),
                },
                {
                  icon: <AnalyticsIcon style={{ fontSize: 64 }} />, // Analytics for insights
                  title: t("landing.features.benefits.analytics.title"),
                  description: t(
                    "landing.features.benefits.analytics.description"
                  ),
                  longDescription: t(
                    "landing.features.benefits.analytics.longDescription"
                  ),

                  gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
                  badge: t("landing.features.cardBadges.analytics"),
                },
                {
                  icon: <SecurityIcon style={{ fontSize: 64 }} />, // Security & protection
                  title: t("landing.features.benefits.security.title"),
                  description: t(
                    "landing.features.benefits.security.description"
                  ),
                  longDescription: t(
                    "landing.features.benefits.security.longDescription"
                  ),

                  gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
                  badge: t("landing.features.cardBadges.security"),
                },
                {
                  icon: <SupportIcon style={{ fontSize: 64 }} />, // Customer support
                  title: t("landing.features.benefits.support.title"),
                  description: t("landing.features.benefits.support.description"),
                  longDescription: t(
                    "landing.features.benefits.support.longDescription"
                  ),

                  gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
                  badge: t("landing.features.cardBadges.support"),
                },
              ].map((benefit, index) => (
                <Grid item xs={12} md={6} lg={4} key={index}>
                  <AnimatedSection 
                    animationType="slideUp" 
                    delay={STAGGER_DELAYS.FEATURES * index}
                    threshold={0.15}
                    duration={1}
                  >
                    <Card
                    sx={{
                      height: "100%",
                      minHeight: 500, // Increased from 400 to 500
                      background:
                        theme.palette.mode === "dark"
                          ? "linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%)"
                          : "#ffffff",
                      boxShadow:
                        theme.palette.mode === "dark"
                          ? `0 4px 20px rgba(0,0,0,0.3), 0 0 20px ${benefit.gradient}10`
                          : `0 4px 20px rgba(0,0,0,0.08), 0 0 20px ${benefit.gradient}10`,
                      border:
                        theme.palette.mode === "dark"
                          ? "1px solid rgba(255,255,255,0.1)"
                          : "1px solid rgba(0,0,0,0.05)",
                      borderRadius: theme.shape.borderRadius, // Use theme borderRadius
                      transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                      position: "relative",
                      overflow: "visible",
                      display: "flex",
                      flexDirection: "column",
                      cursor: "pointer",
                      animation: `cardEntrance 0.8s ease-out ${0.1 * index}s both, float 4s ease-in-out infinite 1s`,
                      "@keyframes cardEntrance": {
                        "0%": {
                          opacity: 0,
                          transform: "translateY(40px) scale(0.9)",
                        },
                        "100%": {
                          opacity: 1,
                          transform: "translateY(0px) scale(1)",
                        },
                      },
                      "@keyframes float": {
                        "0%, 100%": {
                          transform: "translateY(0px)",
                        },
                        "50%": {
                          transform: "translateY(-4px)",
                        },
                      },
                      "&:hover": {
                        transform: "translateY(-8px) scale(1.02)",
                        boxShadow:
                          theme.palette.mode === "dark"
                            ? "0 20px 40px rgba(0,0,0,0.5)"
                            : "0 20px 40px rgba(0,0,0,0.15)",
                        "&::before": {
                          opacity: 1,
                        },
                        "& .feature-icon": {
                          transform: "scale(1.1)",
                          background: benefit.gradient,
                          boxShadow: `0 10px 25px ${benefit.gradient}50`,
                        },
                        "& .feature-badge": {
                          transform: "scale(1.1)",
                          boxShadow: `0 6px 15px ${benefit.gradient}70`,
                        },
                        "& .feature-title": {
                          color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                        },
                      },
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "4px",
                        background: benefit.gradient,
                        opacity: 0,
                        transition: "opacity 0.4s ease",
                      },
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        width: "0%",
                        height: "0%",
                        background: `radial-gradient(circle, ${benefit.gradient}15 0%, transparent 70%)`,
                        borderRadius: "50%",
                        transform: "translate(-50%, -50%)",
                        transition: "all 0.4s ease",
                        zIndex: 0,
                        animation: `waveExpand 1s ease-out ${0.1 * index}s both`,
                      },
                      "@keyframes waveExpand": {
                        "0%": {
                          width: "0%",
                          height: "0%",
                          opacity: 0.6,
                        },
                        "100%": {
                          width: "150%",
                          height: "150%",
                          opacity: 0,
                        },
                      },
                      "@keyframes fadeInUp": {
                        "0%": {
                          opacity: 0,
                          transform: "translateY(20px)",
                        },
                        "100%": {
                          opacity: 1,
                          transform: "translateY(0px)",
                        },
                      },

                      "&:active": {
                        transform: "translateY(-8px) scale(1.01)",
                        transition: "all 0.1s ease",
                      },
                    }}
                  >
                    <CardContent
                      sx={{
                        p: 6, // Increased from 5 to 6
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
                          top: 20, // Increased from 16 to 20
                          right: 20, // Increased from 16 to 20
                          background: benefit.gradient,
                          color: "#ffffff",
                          px: 3, // Increased from 2 to 3
                          py: 1, // Increased from 0.5 to 1
                          borderRadius: theme.shape.borderRadius, // Use theme borderRadius
                          fontSize: "0.875rem", // Increased from 0.75rem to 0.875rem
                          fontWeight: 700,
                          letterSpacing: "0.05em",
                          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                          zIndex: 2,
                          boxShadow: "0 4px 12px rgba(0,0,0,0.25)", // Enhanced shadow
                          backdropFilter: "blur(10px)",
                          animation: `fadeInUp 0.6s ease-out ${0.3 + (0.15 * index)}s both`,
                          "&::before": {
                            content: '""',
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: benefit.gradient,
                            borderRadius: theme.shape.borderRadius,
                            opacity: 0.8,
                            zIndex: -1,
                          },
                        }}
                      >
                        {benefit.badge}
                      </Box>

                      {/* Icon Container */}
                      <Box
                        className="feature-icon"
                        sx={{
                          width: 120, // Reduced from 140 to 120 for better proportion
                          height: 120, // Reduced from 140 to 120 for better proportion
                          background:
                            theme.palette.mode === "dark"
                              ? "linear-gradient(135deg, #3d3d3d 0%, #2a2a2a 100%)"
                              : "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          mx: "auto",
                          mb: 4,
                          borderRadius: "50%",
                          transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                          boxShadow:
                            theme.palette.mode === "dark"
                              ? "0 12px 35px rgba(0,0,0,0.4)"
                              : "0 12px 35px rgba(0,0,0,0.15)",
                          position: "relative",
                          zIndex: 1,
                          "& svg": {
                            color:
                              theme.palette.mode === "dark"
                                ? "#ffffff"
                                : "#000000",
                            fontSize: "4rem", // Increased to 4rem (64px) for bigger icon
                            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                            filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.15))",
                          },
                          "&:hover svg": {
                            color: "#ffffff",
                            filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.25))",
                          },
                        }}
                      >
                        {benefit.icon}
                      </Box>

                      {/* Title */}
                      <Typography
                        className="feature-title"
                        variant="h3" // Changed from h4 to h3 for larger size
                        sx={{
                          fontWeight: 800,
                          mb: 3, // Increased from 2 to 3
                          color:
                            theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                          lineHeight: 1.2,
                          fontSize: { xs: "1.5rem", md: "1.75rem", lg: "2rem" }, // Responsive font size
                          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                          position: "relative",
                          zIndex: 1,
                        }}
                      >
                        {benefit.title}
                      </Typography>

                      {/* Description */}
                      <Typography
                        className="feature-description"
                        variant="body1"
                        sx={{
                          color:
                            theme.palette.mode === "dark" ? "#cccccc" : "#666666",
                          lineHeight: 1.7, // Increased from 1.6 to 1.7
                          mb: 4, // Increased from 3 to 4
                          fontWeight: 400,
                          fontSize: "1.1rem", // Increased from default to 1.1rem
                          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                          position: "relative",
                          zIndex: 1,
                        }}
                      >
                        {benefit.longDescription}
                      </Typography>
                    </CardContent>
                                       </Card>
                  </AnimatedSection>
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
            <AnimatedSection animationType="slideUp" delay={ANIMATION_DELAYS.FEATURES}>
              <Box sx={{ textAlign: "center", mb: 12, px: { xs: 2, sm: 0 } }}>
                <AnimatedSection animationType="scale" delay={ANIMATION_DELAYS.FEATURES}>
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
                      borderRadius: 2,
                    }}
                  >
                    <QrCodeIcon
                      style={{
                        fontSize: 24,
                        marginRight: 16,
                        color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      }}
                    />
                    <Typography
                      variant="overline"
                      sx={{
                        fontWeight: 600,
                        color: theme.palette.mode === "dark" ? "#cccccc" : "#666666",
                        letterSpacing: "0.1em",
                      }}
                    >
                      {t("landing.features.badges.process")}
                    </Typography>
                  </Box>
                </AnimatedSection>
                <AnimatedSection animationType="slideUp" delay={ANIMATION_DELAYS.FEATURES + 0.4}>
                  <Typography
                    variant="h2"
                    sx={{
                      fontWeight: 900,
                      mb: 4,
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      fontSize: { xs: "2.5rem", md: "3.5rem", lg: "4rem" },
                      lineHeight: 1.1,
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
                      text={t("landing.howItWorks.title")} 
                      speed={60} 
                      delay={0.6}
                    />
                  </Typography>
                  {/* Visual Divider */}
                  <Box
                    sx={{
                      width: { xs: "60px", md: "80px" },
                      height: "4px",
                      background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                      borderRadius: "2px",
                      mx: "auto",
                      mb: 4,
                      boxShadow: "0 2px 8px rgba(240, 147, 251, 0.3)",
                    }}
                  />
                </AnimatedSection>
                <AnimatedSection animationType="slideUp" delay={ANIMATION_DELAYS.FEATURES + 0.6}>
                  <Typography
                    variant="h5"
                    sx={{
                      color: theme.palette.mode === "dark" ? "#cccccc" : "#333333",
                      maxWidth: 800,
                      mx: "auto",
                      lineHeight: 1.6,
                      fontWeight: 400,
                    }}
                  >
                    {t("landing.howItWorks.subtitle")}
                  </Typography>
                </AnimatedSection>
              </Box>
            </AnimatedSection>

          {/* Process Steps */}
          <StaggeredContainer animationType="slideUp" staggerDelay={STAGGER_DELAYS.FEATURES}>
            <Grid container spacing={6}>
              {[
                {
                  step: "01",
                  icon: (
                    <QrCodeIcon
                      style={{
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
                    <MobileIcon
                      style={{
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
                    <MonitorIcon
                      style={{
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
            <AnimatedSection animationType="slideUp" delay={ANIMATION_DELAYS.TESTIMONIALS}>
              <Box sx={{ textAlign: "center", mb: 12, px: { xs: 2, sm: 0 } }}>
                <AnimatedSection animationType="scale" delay={ANIMATION_DELAYS.TESTIMONIALS}>
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
                      borderRadius: 2,
                    }}
                  >
                    <StarIcon
                      style={{
                        fontSize: 24,
                        marginRight: 16,
                        color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      }}
                    />
                    <Typography
                      variant="overline"
                      sx={{
                        fontWeight: 600,
                        color: theme.palette.mode === "dark" ? "#cccccc" : "#666666",
                        letterSpacing: "0.1em",
                      }}
                    >
                      {t("landing.features.badges.testimonials")}
                    </Typography>
                  </Box>
                </AnimatedSection>
                <AnimatedSection animationType="slideUp" delay={ANIMATION_DELAYS.TESTIMONIALS + 0.4}>
                  <Typography
                    variant="h2"
                    sx={{
                      fontWeight: 900,
                      mb: 4,
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      fontSize: { xs: "2.5rem", md: "3.5rem", lg: "4rem" },
                      lineHeight: 1.1,
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
                      text={t("landing.testimonials.title")} 
                      speed={70} 
                      delay={0.6}
                    />
                  </Typography>
                  {/* Visual Divider */}
                  <Box
                    sx={{
                      width: { xs: "60px", md: "80px" },
                      height: "4px",
                      background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                      borderRadius: "2px",
                      mx: "auto",
                      mb: 4,
                      boxShadow: "0 2px 8px rgba(79, 172, 254, 0.3)",
                    }}
                  />
                </AnimatedSection>
                <AnimatedSection animationType="slideUp" delay={ANIMATION_DELAYS.TESTIMONIALS + 0.6}>
                  <Typography
                    variant="h5"
                    sx={{
                      color: theme.palette.mode === "dark" ? "#cccccc" : "#333333",
                      maxWidth: 800,
                      mx: "auto",
                      lineHeight: 1.6,
                      fontWeight: 400,
                    }}
                  >
                    {getTestimonialsSubtitle()}
                  </Typography>
                </AnimatedSection>
              </Box>
            </AnimatedSection>

          {/* Testimonials Grid */}
          <StaggeredContainer animationType="slideUp" staggerDelay={STAGGER_DELAYS.TESTIMONIALS}>
            <Grid container spacing={4} sx={{ height: "100%" }}>
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
                <Grid item xs={12} md={4} key={index} sx={{ height: "100%" }}>
                  <AnimatedSection animationType="scale" delay={0.1 * index}>
                    <Card
                      sx={{
                        height: "100%",
                        minHeight: "300px", // Increased for better content distribution
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between", // Distribute content evenly
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
                        borderRadius: theme.shape.borderRadius, // Use theme borderRadius
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
                        <Box sx={{ mb: 2, flexShrink: 0 }}>
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <StarIcon
                              key={i}
                              style={{ 
                                fontSize: 20, 
                                color: "#FFD700", 
                                marginRight: 4,
                                transition: "all 0.3s ease",
                              }}
                            />
                          ))}
                        </Box>
                      </AnimatedSection>
                      <AnimatedSection animationType="slideUp" delay={0.3 + (0.1 * index)}>
                        <Box sx={{ flex: 1, display: "flex", alignItems: "flex-start" }}>
                          <Typography
                            variant="body1"
                            sx={{
                              color:
                                theme.palette.mode === "dark" ? "#cccccc" : "#111111",
                              lineHeight: 1.6,
                              fontStyle: "italic",
                              textAlign: "left",
                              width: "100%",
                            }}
                          >
                            &quot;{testimonial.content}&quot;
                          </Typography>
                        </Box>
                      </AnimatedSection>
                      <AnimatedSection animationType="slideUp" delay={0.4 + (0.1 * index)}>
                        <Box sx={{ mt: "auto", flexShrink: 0 }}>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 700,
                              color:
                                theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                              mb: 0.5,
                              textAlign: "left",
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
                              textAlign: "left",
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
            <AnimatedSection animationType="slideUp" delay={ANIMATION_DELAYS.FAQ}>
              <Box sx={{ textAlign: "center", mb: 12, px: { xs: 2, sm: 0 } }}>
                <AnimatedSection animationType="scale" delay={ANIMATION_DELAYS.FAQ}>
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
                      borderRadius: 2,
                    }}
                  >
                    <HelpIcon
                      style={{
                        fontSize: 24,
                        marginRight: 16,
                        color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      }}
                    />
                    <Typography
                      variant="overline"
                      sx={{
                        fontWeight: 600,
                        color: theme.palette.mode === "dark" ? "#cccccc" : "#666666",
                        letterSpacing: "0.1em",
                      }}
                    >
                      {t("landing.features.badges.faq")}
                    </Typography>
                  </Box>
                </AnimatedSection>
                <AnimatedSection animationType="slideUp" delay={ANIMATION_DELAYS.FAQ + 0.4}>
                  <Typography
                    variant="h2"
                    sx={{
                      fontWeight: 900,
                      mb: 4,
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      fontSize: { xs: "2.5rem", md: "3.5rem", lg: "4rem" },
                      lineHeight: 1.1,
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
                      text={t("landing.faq.title")} 
                      speed={65} 
                      delay={0.6}
                    />
                  </Typography>
                  {/* Visual Divider */}
                  <Box
                    sx={{
                      width: { xs: "60px", md: "80px" },
                      height: "4px",
                      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      borderRadius: "2px",
                      mx: "auto",
                      mb: 4,
                      boxShadow: "0 2px 8px rgba(102, 126, 234, 0.3)",
                    }}
                  />
                </AnimatedSection>
                <AnimatedSection animationType="slideUp" delay={ANIMATION_DELAYS.FAQ + 0.6}>
                  <Typography
                    variant="h5"
                    sx={{
                      color: theme.palette.mode === "dark" ? "#cccccc" : "#333333",
                      maxWidth: 800,
                      mx: "auto",
                      lineHeight: 1.6,
                      fontWeight: 400,
                    }}
                  >
                    {getFaqSubtitle()}
                  </Typography>
                </AnimatedSection>
              </Box>
            </AnimatedSection>

          {/* FAQ Grid */}
          <StaggeredContainer animationType="slideUp" staggerDelay={STAGGER_DELAYS.FAQ}>
            <Grid container spacing={4}>
              {[
                {
                  question: t("landing.faq.faq1.question"),
                  answer: t("landing.faq.faq1.answer"),
                  icon: <QrCodeIcon />, // QR System
                },
                {
                  question: t("landing.faq.faq2.question"),
                  answer: t("landing.faq.faq2.answer"),
                  icon: <BuildingIcon />, // Multiple companies
                },
                {
                  question: t("landing.faq.faq3.question"),
                  answer: t("landing.faq.faq3.answer"),
                  icon: <CalendarIcon />, // Reservations
                },
                {
                  question: t("landing.faq.faq4.question"),
                  answer: t("landing.faq.faq4.answer"),
                  icon: <LocalParkingIcon />, // Parking types
                },
                {
                  question: t("landing.faq.faq5.question"),
                  answer: t("landing.faq.faq5.answer"),
                  icon: <HistoryIcon />, // History/Records
                },
                {
                  question: t("landing.faq.faq6.question"),
                  answer: t("landing.faq.faq6.answer"),
                  icon: <WifiIcon />, // Mobile compatibility
                },
              ].map((faq, index) => {
                // Debug: Check if faq5 has content
                if (index === 4) {
                  console.log('FAQ5 Debug:', {
                    question: faq.question,
                    answer: faq.answer,
                    questionLength: faq.question?.length,
                    answerLength: faq.answer?.length,
                    currentLanguage: i18n.language,
                    questionTranslation: t("landing.faq.faq5.question"),
                    answerTranslation: t("landing.faq.faq5.answer")
                  });
                }

                return (
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
                          borderRadius: theme.shape.borderRadius,
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
                          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: 56,
                                height: 56,
                                borderRadius: "50%",
                                background: `linear-gradient(135deg, ${theme.palette.primary.main}15, ${theme.palette.secondary.main}15)`,
                                border: `2px solid ${theme.palette.primary.main}30`,
                                mr: 3,
                                transition: "all 0.3s ease",
                                "&:hover": {
                                  transform: "scale(1.1)",
                                  background: `linear-gradient(135deg, ${theme.palette.primary.main}25, ${theme.palette.secondary.main}25)`,
                                  border: `2px solid ${theme.palette.primary.main}50`,
                                },
                              }}
                            >
                              <Box
                                component="span"
                                sx={{
                                  color: theme.palette.primary.main,
                                  fontSize: "2rem",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                {faq.icon}
                              </Box>
                            </Box>
                            <Typography
                              variant="h6"
                              sx={{
                                fontWeight: 700,
                                color:
                                  theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                                transition: "all 0.3s ease",
                                flex: 1,
                                "&:hover": {
                                  color: theme.palette.mode === "dark" ? "#4facfe" : "#0056b3",
                                },
                              }}
                            >
                              {faq.question}
                            </Typography>
                          </Box>
                        </AnimatedSection>
                        <AnimatedSection animationType="slideUp" delay={0.3 + (0.1 * index)}>
                          <Typography
                            variant="body1"
                            sx={{
                              color:
                                theme.palette.mode === "dark" ? "#cccccc" : "#333333",
                              lineHeight: 1.7,
                              pl: 7, // Align with the question text
                              fontSize: "1rem",
                              fontWeight: 400,
                            }}
                          >
                            {faq.answer}
                          </Typography>
                        </AnimatedSection>
                      </Card>
                    </AnimatedSection>
                  </Grid>
                );
              })}
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
                      <AnimatedSection animationType="slideUp" delay={ANIMATION_DELAYS.CTA}>
              <Box sx={{ textAlign: "center", px: { xs: 2, sm: 0 } }}>
                <AnimatedSection animationType="scale" delay={ANIMATION_DELAYS.CTA}>
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
                      borderRadius: 2,
                    }}
                  >
                    <GoalIcon
                      style={{
                        fontSize: 24,
                        marginRight: 16,
                        color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      }}
                    />
                    <Typography
                      variant="overline"
                      sx={{
                        fontWeight: 600,
                        color: theme.palette.mode === "dark" ? "#cccccc" : "#666666",
                        letterSpacing: "0.1em",
                      }}
                    >
                      {t("landing.features.badges.cta")}
                    </Typography>
                  </Box>
                </AnimatedSection>
                <AnimatedSection animationType="slideUp" delay={ANIMATION_DELAYS.CTA + 0.4}>
                  <Typography
                    variant="h2"
                    sx={{
                      fontWeight: 900,
                      mb: 4,
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      fontSize: { xs: "2rem", md: "2.5rem", lg: "3rem" },
                      lineHeight: 1.1,
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
                      text={t("landing.cta.title")} 
                      speed={75} 
                      delay={0.6}
                    />
                  </Typography>
                  {/* Visual Divider */}
                  <Box
                    sx={{
                      width: { xs: "60px", md: "80px" },
                      height: "4px",
                      background: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
                      borderRadius: "2px",
                      mx: "auto",
                      mb: 4,
                      boxShadow: "0 2px 8px rgba(255, 154, 158, 0.3)",
                    }}
                  />
                </AnimatedSection>
                <AnimatedSection animationType="slideUp" delay={ANIMATION_DELAYS.CTA + 0.6}>
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
                    }}
                  >
                    {getCtaSubtitle()}
                  </Typography>
                </AnimatedSection>
              </Box>
            </AnimatedSection>
          
          <AnimatedSection animationType="slideUp" delay={ANIMATION_DELAYS.CTA + 0.4}>
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
                endIcon={<RocketIcon />}
                sx={{
                  background: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                  px: 6,
                  py: 2,
                  borderRadius: theme.shape.borderRadius,
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  textTransform: "none",
                  boxShadow: theme.shadows[4],
                  "&:hover": {
                    background: theme.palette.primary.dark,
                    transform: "translateY(-2px)",
                    boxShadow: theme.shadows[8],
                  },
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
                onClick={() => smoothScrollTo("contacto")}
              >
                {t("landing.cta.primaryButton")}
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<PlayArrowIcon />}
                sx={{
                  border: `2px solid ${theme.palette.primary.main}`,
                  color: theme.palette.primary.main,
                  px: 6,
                  py: 2,
                  borderRadius: theme.shape.borderRadius,
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  textTransform: "none",
                  "&:hover": {
                    border: `2px solid ${theme.palette.primary.dark}`,
                    background: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    transform: "translateY(-2px)",
                    boxShadow: theme.shadows[4],
                  },
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
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
          background: theme.palette.mode === "dark" 
            ? "#0f0f0f"
            : "#f8f9fa",
          color: theme.palette.mode === "dark" ? "white" : "black",
          borderTop: `1px solid ${theme.palette.mode === "dark" ? "#2a2a2a" : "#e9ecef"}`,
        }}
        id="footer"
      >
        <Container maxWidth="xl" sx={{ py: 6 }}>
          {/* Main Footer Content */}
          <Box sx={{ 
            display: "grid", 
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1.5fr" },
            gap: { xs: 3, md: 4 },
            py: 6
          }}>
            {/* Company Info */}
            <Box sx={{ mb: { xs: 4, md: 0 } }}>
              {/* Logo */}
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Box
                  sx={{
                    width: { xs: 36, md: 40 },
                    height: { xs: 36, md: 40 },
                    background: "#3b82f6",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mr: 2,
                  }}
                >
                  <Typography
                    sx={{
                      color: "#ffffff",
                      fontSize: { xs: "1.2rem", md: "1.5rem" },
                      fontWeight: 800,
                      letterSpacing: "-0.05em",
                    }}
                  >
                    p.
                  </Typography>
                </Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: "1.3rem", md: "1.5rem" },
                    letterSpacing: "-0.065em",
                  }}
                >
                  <Box component="span" sx={{ color: theme.palette.mode === "dark" ? "#ffffff" : "#1e293b" }}>
                    park
                  </Box>
                  <Box component="span" sx={{ color: "#3b82f6" }}>
                    it.
                  </Box>
                </Typography>
              </Box>

              {/* Description */}
              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.mode === "dark" ? "#a0a0a0" : "#6c757d",
                  lineHeight: 1.6,
                  mb: 3,
                  fontSize: { xs: "0.8rem", md: "0.875rem" },
                }}
              >
                {t("landing.contact.info.description")}
              </Typography>

              {/* Social Media */}
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 600,
                  mb: { xs: 2, md: 3 },
                  color: theme.palette.mode === "dark" ? "#ffffff" : "#1e293b",
                  fontSize: { xs: "0.8rem", md: "0.875rem" },
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                {t("landing.footer.sections.socialMedia")}
              </Typography>
              <Box sx={{ display: "flex", gap: 2 }}>
                {[
                  { icon: <FaLinkedin />, color: "#0077b5", label: "LinkedIn", href: "https://linkedin.com/company/parkit" },
                  { icon: <FaInstagram />, color: "#e4405f", label: "Instagram", href: "https://instagram.com/parkit" },
                  { icon: <FaFacebook />, color: "#1877f2", label: "Facebook", href: "https://facebook.com/parkit" }
                ].map((social, index) => (
                  <Link
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ textDecoration: "none" }}
                  >
                    <Box
                      sx={{
                        width: { xs: 24, md: 28 },
                        height: { xs: 24, md: 28 },
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.2s ease",
                        "&:hover": {
                          transform: "translateY(-2px)",
                        },
                      }}
                      title={social.label}
                    >
                      <Box sx={{ 
                        color: social.color, 
                        fontSize: { xs: "18px", md: "20px" },
                        "&:hover": { 
                          color: theme.palette.mode === "dark" ? "#ffffff" : "#000000" 
                        } 
                      }}>
                        {social.icon}
                      </Box>
                    </Box>
                  </Link>
                ))}
              </Box>
            </Box>

            {/* Solutions & Company */}
            <Box sx={{ mb: { xs: 4, md: 0 } }}>
              {/* Company */}
              <Box sx={{ mb: { xs: 3, md: 4 } }}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 600,
                    mb: { xs: 2, md: 3 },
                    color: theme.palette.mode === "dark" ? "#ffffff" : "#1e293b",
                    fontSize: { xs: "0.8rem", md: "0.875rem" },
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {t("landing.footer.sections.company")}
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 1.5, md: 2 } }}>
                  {[
                    { label: t("landing.footer.company.aboutUs"), href: "#about" }
                  ].map((link, index) => (
                    <Link
                      key={index}
                      href={link.href}
                      sx={{
                        color: theme.palette.mode === "dark" ? "#a0a0a0" : "#6c757d",
                        textDecoration: "none",
                        fontSize: { xs: "0.8rem", md: "0.875rem" },
                        fontWeight: 400,
                        transition: "color 0.2s ease",
                        "&:hover": {
                          color: "#3b82f6",
                        },
                      }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </Box>
              </Box>

              {/* Solutions */}
              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 600,
                    mb: { xs: 2, md: 3 },
                    color: theme.palette.mode === "dark" ? "#ffffff" : "#1e293b",
                    fontSize: { xs: "0.8rem", md: "0.875rem" },
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {t("landing.footer.sections.solutions")}
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 1.5, md: 2 } }}>
                  {[
                    { label: t("landing.footer.solutions.smartParking"), href: "#soluciones" },
                    { label: t("landing.footer.solutions.mobileApp"), href: "#app" },
                    { label: t("landing.footer.solutions.analytics"), href: "#dashboard" }
                  ].map((link, index) => (
                    <Link
                      key={index}
                      href={link.href}
                      sx={{
                        color: theme.palette.mode === "dark" ? "#a0a0a0" : "#6c757d",
                        textDecoration: "none",
                        fontSize: { xs: "0.8rem", md: "0.875rem" },
                        fontWeight: 400,
                        transition: "color 0.2s ease",
                        "&:hover": {
                          color: "#3b82f6",
                        },
                      }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </Box>
              </Box>
            </Box>

            {/* Support & Contact */}
            <Box sx={{ 
              display: "flex", 
              flexDirection: { xs: "column", md: "row" },
              gap: { xs: 4, md: 6 }
            }}>
              {/* Support & Contact */}
              <Box sx={{ flex: 1, mb: { xs: 3, md: 0 } }}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 600,
                    mb: { xs: 2, md: 3 },
                    color: theme.palette.mode === "dark" ? "#ffffff" : "#1e293b",
                    fontSize: { xs: "0.8rem", md: "0.875rem" },
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {t("landing.footer.sections.support")}
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 1.5, md: 2 }, mb: { xs: 3, md: 4 } }}>
                  {[
                    { label: t("landing.footer.support.helpCenter"), href: "#faq" }
                  ].map((link, index) => (
                    <Link
                      key={index}
                      href={link.href}
                      sx={{
                        color: theme.palette.mode === "dark" ? "#a0a0a0" : "#6c757d",
                        textDecoration: "none",
                        fontSize: { xs: "0.8rem", md: "0.875rem" },
                        fontWeight: 400,
                        transition: "color 0.2s ease",
                        "&:hover": {
                          color: "#3b82f6",
                        },
                      }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </Box>

                {/* Contact Info */}
                <Box>
                  <Typography
                    variant="body2"
                    sx={{
                      color: theme.palette.mode === "dark" ? "#a0a0a0" : "#6c757d",
                      mb: { xs: 1.5, md: 2 },
                      fontSize: { xs: "0.8rem", md: "0.875rem" },
                      fontWeight: 400,
                    }}
                  >
                    {t("landing.footer.contact.title")}:
                  </Typography>
                  
                  {/* Email */}
                  <Link
                    href="mailto:info@parkit.com"
                    sx={{
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: { xs: 1, md: 1.5 },
                    }}
                  >
                    <Box
                      sx={{
                        width: { xs: 24, md: 28 },
                        height: { xs: 24, md: 28 },
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.2s ease",
                        "&:hover": {
                          transform: "translateY(-2px)",
                        },
                      }}
                    >
                      <MailIcon style={{ fontSize: 16, color: "#3b82f6" }} />
                    </Box>
                    <Typography
                      sx={{
                        color: theme.palette.mode === "dark" ? "#a0a0a0" : "#6c757d",
                        fontSize: { xs: "0.8rem", md: "0.875rem" },
                        fontWeight: 400,
                        transition: "color 0.2s ease",
                        "&:hover": {
                          color: "#3b82f6",
                        },
                      }}
                    >
                      {t("landing.footer.contact.email")}
                    </Typography>
                  </Link>

                  {/* WhatsApp */}
                  <Link
                    href="https://wa.me/50662164040"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Box
                      sx={{
                        width: { xs: 24, md: 28 },
                        height: { xs: 24, md: 28 },
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.2s ease",
                        "&:hover": {
                          transform: "translateY(-2px)",
                        },
                      }}
                    >
                      <MessageIcon style={{ fontSize: 16, color: "#22c55e" }} />
                    </Box>
                    <Typography
                      sx={{
                        color: theme.palette.mode === "dark" ? "#a0a0a0" : "#6c757d",
                        fontSize: { xs: "0.8rem", md: "0.875rem" },
                        fontWeight: 400,
                        transition: "color 0.2s ease",
                        "&:hover": {
                          color: "#22c55e",
                        },
                      }}
                    >
                      {t("landing.footer.contact.whatsapp")}
                    </Typography>
                  </Link>
                </Box>
              </Box>

              {/* Newsletter */}
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 600,
                    mb: { xs: 2, md: 3 },
                    color: theme.palette.mode === "dark" ? "#ffffff" : "#1e293b",
                    fontSize: { xs: "0.8rem", md: "0.875rem" },
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {t("landing.footer.sections.stayUpdated")}
                </Typography>
                
                {/* Newsletter */}
                <Box sx={{ mb: { xs: 3, md: 4 } }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: theme.palette.mode === "dark" ? "#a0a0a0" : "#6c757d",
                      mb: { xs: 1.5, md: 2 },
                      fontSize: { xs: "0.8rem", md: "0.875rem" },
                      fontWeight: 400,
                      lineHeight: 1.5,
                    }}
                  >
                    {t("landing.footer.newsletter.description")}
                  </Typography>
                  
                  <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 1.5, md: 2 } }}>
                    <TextField
                      size="small"
                      placeholder={t("landing.footer.newsletter.placeholder")}
                      variant="outlined"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          color: theme.palette.text.primary,
                          background: theme.palette.background.paper,
                          borderRadius: theme.shape.borderRadius,
                          border: `1px solid ${theme.palette.mode === "dark" ? theme.palette.divider : theme.palette.grey[300]}`,
                          fontSize: { xs: "0.8rem", md: "0.875rem" },
                          "&:hover": {
                            border: `1px solid ${theme.palette.mode === "dark" ? theme.palette.grey[600] : theme.palette.primary.main}`,
                          },
                          "&.Mui-focused": {
                            border: `2px solid ${theme.palette.primary.main}`,
                            boxShadow: `0 0 0 2px ${theme.palette.primary.main}20`,
                          },
                          "& fieldset": { border: "none" },
                        },
                        "& .MuiInputBase-input": {
                          padding: { xs: "6px 10px", md: "8px 12px" },
                          fontSize: { xs: "0.8rem", md: "0.875rem" },
                          fontWeight: 400,
                          "&::placeholder": {
                            color: theme.palette.text.secondary,
                            opacity: 1,
                          },
                        },
                      }}
                    />
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        background: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                        fontWeight: 600,
                        py: { xs: 0.75, md: 1 },
                        px: { xs: 2, md: 3 },
                        borderRadius: theme.shape.borderRadius,
                        border: "none",
                        fontSize: { xs: "0.8rem", md: "0.875rem" },
                        textTransform: "none",
                        "&:hover": {
                          background: theme.palette.primary.dark,
                        },
                        transition: "background 0.2s ease",
                      }}
                    >
                      {t("landing.footer.newsletter.subscribe")}
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Divider */}
          <Box
            sx={{
              height: 1,
              background: theme.palette.mode === "dark" ? "#2a2a2a" : "#e9ecef",
              my: 4,
            }}
          />

          {/* Bottom Section */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "center", md: "flex-start" },
              gap: 3,
            }}
          >
            {/* Copyright */}
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.mode === "dark" ? "#a0a0a0" : "#6c757d",
                fontSize: "0.875rem",
                textAlign: { xs: "center", md: "left" },
              }}
            >
              {getFooterCopyright()}
            </Typography>

            {/* Legal Links */}
            <Box 
              sx={{ 
                display: "flex", 
                gap: 4, 
                flexWrap: "wrap", 
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              {[
                { href: "/privacy", label: t("landing.footer.legal.privacy") },
                { href: "/terms", label: t("landing.footer.legal.terms") },
                { href: "/cookies", label: t("landing.footer.legal.cookies") }
              ].map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  sx={{
                    color: theme.palette.mode === "dark" ? "#a0a0a0" : "#6c757d",
                    textDecoration: "none",
                    fontSize: "0.875rem",
                    transition: "color 0.2s ease",
                    "&:hover": {
                      color: "#3b82f6",
                    },
                  }}
                >
                  {link.label}
                </Link>
              ))}
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
            borderRadius: 2,
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
              }}
            >
              {t("landing.navigation.proAccess")}
            </Typography>
            <IconButton onClick={() => setLoginOpen(false)}>
                                  <CloseIcon />
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
                                    startIcon={<LoginIcon />}
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
          }}
        >
          Panel de Administración
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
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
              <LocalParkingIcon style={{ fontSize: 40, marginBottom: 8, color: "#000000" }} />
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                }}
              >
                47
              </Typography>
              <Typography
                sx={{
                  opacity: 0.8,
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
              <CarIcon style={{ fontSize: 40, marginBottom: 8, color: "#000000" }} />
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                }}
              >
                23
              </Typography>
              <Typography
                sx={{
                  opacity: 0.8,
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
              <CreditCardIcon style={{ fontSize: 40, marginBottom: 8, color: "#000000" }} />
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                }}
              >
                $2,847
              </Typography>
              <Typography
                sx={{
                  opacity: 0.8,
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
              <QrCodeIcon style={{ fontSize: 40, marginBottom: 8, color: "#000000" }} />
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                }}
              >
                156
              </Typography>
              <Typography
                sx={{
                  opacity: 0.8,
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
