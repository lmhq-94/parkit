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
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  useTheme,
  useMediaQuery,
  Divider,
} from "@mui/material";
import {
  Menu as MenuIcon,
  LocalParking,
  DirectionsCar,
  Payment,
  QrCode,
  Security,
  Speed,
  Support,
  Analytics,
  AdminPanelSettings,
  Login,
  Close,
  CheckCircle,
  Star,
  Phone,
  Email,
  LocationOn,
  ArrowForward,
  PlayArrow,
  TrendingUp,
  Shield,
  SmartToy,
  Cloud,
  Wifi,
  Sensors,
  Dashboard,
  Notifications,
  Settings,
  Person,
  Business,
  Engineering,
  Psychology,
  WhatsApp,
  LinkedIn,
  Twitter,
  Instagram,
  Facebook,
  Chat,
  Schedule,
} from "@mui/icons-material";
import { useAuthStore } from "../store/authStore";
import { DashboardLayout } from "../components/layout/DashboardLayout";
import { FloatingSettingsButton } from "../components/FloatingSettingsButton";
import { useTranslation } from "react-i18next";

export default function HomePage() {
  const { user, isAuthenticated, login } = useAuthStore();
  const { t, i18n } = useTranslation();
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

  // Escuchar cambios de idioma
  useEffect(() => {
    const handleLanguageChange = () => {
      setCurrentLanguage(i18n.language);
      forceUpdate({}); // Forzar re-renderizado
    };

    // Escuchar el evento de cambio de idioma
    i18n.on("languageChanged", handleLanguageChange);

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
      i18n.off("languageChanged", handleLanguageChange);
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
      {/* Modern Navigation */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background:
            scrollY > 50
              ? "linear-gradient(135deg, #ffffff 0%, #f8f8f8 100%)"
              : "transparent",
          backdropFilter: scrollY > 50 ? "blur(10px)" : "none",
          WebkitBackdropFilter: scrollY > 50 ? "blur(10px)" : "none",
          borderBottom: scrollY > 50 ? "1px solid rgba(0,0,0,0.05)" : "none",
          boxShadow: scrollY > 50 ? "0 4px 20px rgba(0,0,0,0.08)" : "none",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <Container maxWidth="xl" sx={{ borderRadius: 0 }}>
          <Toolbar
            disableGutters
            sx={{
              minHeight: { xs: 64, md: 72 },
              px: { xs: 2, md: 0 },
              borderRadius: 0,
            }}
          >
            {/* Logo */}
            <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mr: 6,
                }}
              >
                {/* <Box
                  sx={{
                    width: 48,
                    height: 48,
                    background:
                      scrollY > 50
                        ? "linear-gradient(135deg, #000000 0%, #333333 100%)"
                        : "rgba(255,255,255,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mr: 3,
                    borderRadius: 0,
                    boxShadow:
                      scrollY > 50 ? "0 4px 20px rgba(0,0,0,0.2)" : "none",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  <Typography
                    sx={{
                      color: scrollY > 50 ? "#ffffff" : "#000000",
                      fontSize: 28,
                      fontWeight: 700,
                      fontFamily: "var(--font-league-spartan), sans-serif",
                      letterSpacing: "-0.05em",
                    }}
                  >
                    p
                  </Typography>
                </Box> */}
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    fontSize: "2.5rem",
                    letterSpacing: "-0.05em",
                    fontFamily: "var(--font-league-spartan), sans-serif",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      color: scrollY > 50 ? "#000000" : "#ffffff",
                      fontWeight: 700,
                    }}
                  >
                    park
                  </Box>
                  <Box
                    component="span"
                    sx={{
                      color: scrollY > 50 ? "#666666" : "#cccccc",
                      fontWeight: 700,
                    }}
                  >
                    it.
                  </Box>
                </Typography>
              </Box>
            </Box>

            {/* Desktop Navigation */}
            <Box
              sx={{
                display: { xs: "none", lg: "flex" },
                alignItems: "center",
                gap: 0,
              }}
            >
              {[
                { label: t("landing.navigation.solutions"), id: "soluciones" },
                { label: t("landing.navigation.contact"), id: "footer" },
              ].map((item, index) => (
                <Button
                  key={index}
                  onClick={() => smoothScrollTo(item.id)}
                  sx={{
                    color: scrollY > 50 ? "#000000" : "rgba(255,255,255,0.9)",
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    px: 4,
                    py: 2,
                    textTransform: "none",
                    borderRadius: 0,
                    fontFamily:
                      '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                    background: "transparent",
                    border: "none",
                    "&:hover": {
                      background:
                        scrollY > 50
                          ? "rgba(0, 0, 0, 0.08)"
                          : "rgba(255, 255, 255, 0.1)",
                      transform: "translateY(-1px)",
                    },
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>

            {/* CTA Button */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                ml: 3,
              }}
            >
              <Button
                variant="contained"
                onClick={() => setLoginOpen(true)}
                sx={{
                  background:
                    scrollY > 50
                      ? "linear-gradient(135deg, #000000 0%, #333333 100%)"
                      : "rgba(255,255,255,0.1)",
                  color: scrollY > 50 ? "#ffffff" : "rgba(255,255,255,0.9)",
                  px: 4,
                  py: 1.5,
                  fontWeight: 700,
                  fontSize: "0.875rem",
                  textTransform: "none",
                  borderRadius: 0,
                  fontFamily:
                    '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                  boxShadow:
                    scrollY > 50 ? "0 4px 20px rgba(0,0,0,0.2)" : "none",
                  border: "1px solid rgba(255,255,255,0.2)",
                  "&:hover": {
                    background:
                      scrollY > 50
                        ? "linear-gradient(135deg, #333333 0%, #000000 100%)"
                        : "rgba(255,255,255,0.2)",
                    transform: "translateY(-2px)",
                    boxShadow:
                      scrollY > 50
                        ? "0 6px 25px rgba(0,0,0,0.3)"
                        : "0 4px 20px rgba(255,255,255,0.2)",
                  },
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                {t("landing.navigation.proAccess")}
              </Button>
            </Box>

            {/* Mobile Menu Button */}
            <IconButton
              sx={{
                color: scrollY > 50 ? "#000000" : "rgba(255,255,255,0.9)",
                display: { md: "none" },
                p: 2,
                background: "transparent",
                border: "none",
                borderRadius: 0,
                "&:hover": {
                  background:
                    scrollY > 50
                      ? "rgba(0, 0, 0, 0.08)"
                      : "rgba(255, 255, 255, 0.1)",
                  transform: "translateY(-1px)",
                },
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
              onClick={() => setMobileOpen(true)}
            >
              <MenuIcon sx={{ fontSize: 24 }} />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{
          sx: {
            width: 280,
            background: "linear-gradient(135deg, #ffffff 0%, #f8f8f8 100%)",
            color: "#000000",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            borderLeft: "1px solid rgba(0,0,0,0.05)",
            borderRadius: 0,
          },
        }}
      >
        <Box sx={{ pt: 2 }}>
          <List>
            <ListItem>
              <ListItemButton onClick={() => smoothScrollTo("soluciones")}>
                <ListItemText primary={t("landing.navigation.solutions")} />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton onClick={() => smoothScrollTo("footer")}>
                <ListItemText primary={t("landing.navigation.contact")} />
              </ListItemButton>
            </ListItem>

            <ListItem>
              <ListItemButton onClick={() => setLoginOpen(true)}>
                <ListItemIcon>
                  <AdminPanelSettings />
                </ListItemIcon>
                <ListItemText primary={t("landing.navigation.proAccess")} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          minHeight: "100vh",
          background: "linear-gradient(135deg, #000000 0%, #1a1a1a 100%)",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
              linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 100%),
              url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><defs><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1"/></pattern></defs><rect width="100%" height="100%" fill="url(%23grid)"/></svg>')
            `,
            backgroundSize: "cover, 40px 40px",
            backgroundPosition: "center, center",
            opacity: 0.8,
          },
        }}
      >
        {/* Animated Background Elements */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
              radial-gradient(circle at 20% 80%, rgba(255,255,255,0.05) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(255,255,255,0.05) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(255,255,255,0.03) 0%, transparent 50%)
            `,
            pointerEvents: "none",
            animation: "pulse 4s ease-in-out infinite",
            "@keyframes pulse": {
              "0%, 100%": { opacity: 0.5 },
              "50%": { opacity: 1 },
            },
          }}
        />
        <Container maxWidth="xl" sx={{ position: "relative", zIndex: 2 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ color: "white", position: "relative", zIndex: 3 }}>
                <Typography
                  variant="h1"
                  sx={{
                    fontWeight: 900,
                    fontSize: { xs: "2.5rem", md: "4rem", lg: "5rem" },
                    lineHeight: 1.1,
                    mb: 3,
                    fontFamily:
                      '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                    background:
                      "linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    textShadow: "0 4px 20px rgba(255,255,255,0.1)",
                  }}
                >
                  {t("landing.hero.title")}
                  <Box
                    component="span"
                    sx={{
                      display: "block",
                      background:
                        "linear-gradient(135deg, #ffffff 0%, #cccccc 100%)",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {t("landing.hero.subtitle")}
                  </Box>
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    mb: 4,
                    opacity: 0.9,
                    fontWeight: 400,
                    lineHeight: 1.6,
                    fontFamily:
                      '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                    color: "rgba(255,255,255,0.9)",
                    textShadow: "0 2px 10px rgba(0,0,0,0.3)",
                  }}
                >
                  {t("landing.hero.description")}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    gap: 3,
                    flexWrap: "wrap",
                    position: "relative",
                    zIndex: 3,
                  }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => setLoginOpen(true)}
                    sx={{
                      background:
                        "linear-gradient(135deg, #ffffff 0%, #f8f8f8 100%)",
                      color: "#000000",
                      px: 6,
                      py: 2.5,
                      fontWeight: 700,
                      fontSize: "1rem",
                      textTransform: "none",
                      borderRadius: 0,
                      fontFamily:
                        '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                      boxShadow: "0 8px 32px rgba(255,255,255,0.3)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      position: "relative",
                      overflow: "hidden",
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: "-100%",
                        width: "100%",
                        height: "100%",
                        background:
                          "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                        transition: "left 0.5s",
                      },
                      "&:hover": {
                        background:
                          "linear-gradient(135deg, #f8f8f8 0%, #e8e8e8 100%)",
                        transform: "translateY(-3px)",
                        boxShadow: "0 12px 40px rgba(255,255,255,0.4)",
                        "&::before": {
                          left: "100%",
                        },
                      },
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  >
                    {t("landing.hero.startNow")}
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => smoothScrollTo("soluciones")}
                    sx={{
                      color: "#ffffff",
                      borderColor: "rgba(255,255,255,0.4)",
                      px: 6,
                      py: 2.5,
                      fontWeight: 600,
                      fontSize: "1rem",
                      textTransform: "none",
                      borderRadius: 0,
                      fontFamily:
                        '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                      background: "rgba(255,255,255,0.08)",
                      backdropFilter: "blur(15px)",
                      borderWidth: "2px",
                      "&:hover": {
                        background: "rgba(255, 255, 255, 0.15)",
                        borderColor: "rgba(255,255,255,0.8)",
                        transform: "translateY(-3px)",
                        boxShadow: "0 8px 32px rgba(255,255,255,0.3)",
                      },
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  >
                    {t("landing.hero.viewDemo")}
                  </Button>
                </Box>

                {/* Stats */}
                <Box
                  sx={{
                    display: "flex",
                    gap: 4,
                    mt: 8,
                    flexWrap: "wrap",
                    position: "relative",
                    zIndex: 3,
                  }}
                >
                  <Box
                    sx={{
                      textAlign: "center",
                      p: 2,
                      borderRadius: 0,
                      background: "rgba(255,255,255,0.05)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        background: "rgba(255,255,255,0.1)",
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 900,
                        color: "#ffffff",
                        textShadow: "0 2px 10px rgba(255,255,255,0.3)",
                        mb: 1,
                      }}
                    >
                      99.9%
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ opacity: 0.9, fontWeight: 500 }}
                    >
                      {t("landing.hero.uptime")}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      textAlign: "center",
                      p: 2,
                      borderRadius: 0,
                      background: "rgba(255,255,255,0.05)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        background: "rgba(255,255,255,0.1)",
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 900,
                        color: "#ffffff",
                        textShadow: "0 2px 10px rgba(255,255,255,0.3)",
                        mb: 1,
                      }}
                    >
                      500+
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ opacity: 0.9, fontWeight: 500 }}
                    >
                      {t("landing.hero.companies")}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      textAlign: "center",
                      p: 2,
                      borderRadius: 0,
                      background: "rgba(255,255,255,0.05)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        background: "rgba(255,255,255,0.1)",
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 900,
                        color: "#ffffff",
                        textShadow: "0 2px 10px rgba(255,255,255,0.3)",
                        mb: 1,
                      }}
                    >
                      24/7
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ opacity: 0.9, fontWeight: 500 }}
                    >
                      {t("landing.hero.support")}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: "relative",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 3,
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: 400,
                    height: 400,
                    borderRadius: "50%",
                    background:
                      "radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, transparent 100%)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    animation: "float 6s ease-in-out infinite",
                    "@keyframes float": {
                      "0%, 100%": { transform: "translateY(0px)" },
                      "50%": { transform: "translateY(-20px)" },
                    },
                  }}
                >
                  <LocalParking
                    sx={{
                      fontSize: 200,
                      color: "rgba(255, 255, 255, 0.8)",
                      filter: "drop-shadow(0 4px 20px rgba(255,255,255,0.3))",
                    }}
                  />
                </Box>
                {/* Floating Elements */}
                <Box
                  sx={{
                    position: "absolute",
                    top: "20%",
                    right: "10%",
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.1)",
                    backdropFilter: "blur(5px)",
                    animation: "float 4s ease-in-out infinite",
                    animationDelay: "1s",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    bottom: "30%",
                    left: "5%",
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.08)",
                    backdropFilter: "blur(5px)",
                    animation: "float 5s ease-in-out infinite",
                    animationDelay: "2s",
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Enhanced Technology Section */}
      <Box
        sx={{
          py: 16,
          background:
            "linear-gradient(135deg, #f8f9fa 0%, #ffffff 50%, #f8f9fa 100%)",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
              radial-gradient(circle at 20% 80%, rgba(0,0,0,0.02) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(0,0,0,0.02) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(0,0,0,0.01) 0%, transparent 50%)
            `,
            pointerEvents: "none",
          },
        }}
        id="soluciones"
      >
        <Container maxWidth="xl" sx={{ position: "relative", zIndex: 2 }}>
          {/* Section Header */}
          <Box sx={{ textAlign: "center", mb: 12 }}>
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                mb: 3,
                p: 2,
                background: "rgba(0,0,0,0.03)",
                borderRadius: 0,
              }}
            >
              <TrendingUp sx={{ fontSize: 24, mr: 2, color: "#000000" }} />
              <Typography
                variant="overline"
                sx={{
                  fontWeight: 600,
                  color: "#666666",
                  letterSpacing: "0.1em",
                  fontFamily:
                    '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                }}
              >
                {t("landing.features.benefits.title")}
              </Typography>
            </Box>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 900,
                mb: 4,
                color: "#000000",
                fontSize: { xs: "2.5rem", md: "3.5rem", lg: "4rem" },
                lineHeight: 1.1,
                fontFamily:
                  '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                background: "linear-gradient(135deg, #000000 0%, #333333 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {t("landing.features.title")}
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: "#666666",
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
          </Box>

          {/* Benefits Grid */}
          <Grid container spacing={4}>
            {[
              {
                icon: <TrendingUp sx={{ fontSize: 48 }} />,
                title: t("landing.features.benefits.revenue.title"),
                description: t("landing.features.benefits.revenue.description"),
                longDescription: t(
                  "landing.features.benefits.revenue.longDescription"
                ),
                benefits: t("landing.features.benefits.revenue.benefits", {
                  returnObjects: true,
                }) as string[],
                gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                badge: "Ingresos",
                metric: t("landing.features.benefits.revenue.metric"),
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
                benefits: t("landing.features.benefits.automation.benefits", {
                  returnObjects: true,
                }) as string[],
                gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                badge: "Automatización",
                metric: t("landing.features.benefits.automation.metric"),
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
                benefits: t("landing.features.benefits.experience.benefits", {
                  returnObjects: true,
                }) as string[],
                gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                badge: "Experiencia",
                metric: t("landing.features.benefits.experience.metric"),
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
                benefits: t("landing.features.benefits.analytics.benefits", {
                  returnObjects: true,
                }) as string[],
                gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
                badge: "Analytics",
                metric: t("landing.features.benefits.analytics.metric"),
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
                benefits: t("landing.features.benefits.security.benefits", {
                  returnObjects: true,
                }) as string[],
                gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
                badge: "Seguridad",
                metric: t("landing.features.benefits.security.metric"),
              },
              {
                icon: <Support sx={{ fontSize: 48 }} />,
                title: t("landing.features.benefits.support.title"),
                description: t("landing.features.benefits.support.description"),
                longDescription: t(
                  "landing.features.benefits.support.longDescription"
                ),
                benefits: t("landing.features.benefits.support.benefits", {
                  returnObjects: true,
                }) as string[],
                gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
                badge: "Soporte",
                metric: t("landing.features.benefits.support.metric"),
              },
            ].map((benefit, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    minHeight: 500,
                    background: "#ffffff",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                    border: "1px solid rgba(0,0,0,0.05)",
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
                      boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
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
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
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
                          "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mx: "auto",
                        mb: 3,
                        borderRadius: "50%",
                        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                        boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                        "& svg": {
                          color: "#000000",
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
                        color: "#000000",
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
                        color: "#666666",
                        lineHeight: 1.6,
                        mb: 3,
                        fontFamily:
                          '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                        fontWeight: 400,
                        flex: 1,
                      }}
                    >
                      {benefit.longDescription}
                    </Typography>

                    {/* Key Benefits */}
                    <Box sx={{ mb: 3 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#999999",
                          mb: 2,
                          fontWeight: 600,
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                          fontSize: "0.75rem",
                          fontFamily:
                            '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                        }}
                      >
                        {t("landing.features.benefits.keyBenefits")}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 1,
                          justifyContent: "center",
                        }}
                      >
                        {benefit.benefits.map(
                          (benefitItem: string, benefitIndex: number) => (
                            <Box
                              key={benefitIndex}
                              sx={{
                                background: "rgba(0,0,0,0.05)",
                                px: 2,
                                py: 1,
                                borderRadius: 0,
                                fontSize: "0.75rem",
                                fontWeight: 600,
                                color: "#666666",
                                fontFamily:
                                  '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                              }}
                            >
                              {benefitItem}
                            </Box>
                          )
                        )}
                      </Box>
                    </Box>

                    {/* Impact Metric */}
                    <Box
                      sx={{
                        background:
                          "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
                        p: 2,
                        borderRadius: 0,
                        border: "1px solid rgba(0,0,0,0.05)",
                        mt: "auto",
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 700,
                          color: "#000000",
                          fontFamily:
                            '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                        }}
                      >
                        {benefit.metric}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #000000 0%, #1a1a1a 100%)",
          color: "white",
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
              "radial-gradient(circle at 20% 80%, rgba(255,255,255,0.03) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.03) 0%, transparent 50%)",
            pointerEvents: "none",
          }}
        />

        <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
          {/* Main Footer Content */}
          <Grid container spacing={6}>
            {/* Company Info */}
            <Grid item xs={12} lg={4}>
              <Box sx={{ mb: 6 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      background:
                        "linear-gradient(135deg, #ffffff 0%, #f8f8f8 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mr: 3,
                      //borderRadius: "12px",
                      boxShadow: "0 4px 20px rgba(255,255,255,0.1)",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#000000",
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
                          color: "#ffffff",
                          fontWeight: 700,
                        }}
                      >
                        park
                      </Box>
                      <Box
                        component="span"
                        sx={{
                          color: "#cccccc",
                          fontWeight: 700,
                        }}
                      >
                        it.
                      </Box>
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        opacity: 0.7,
                        fontWeight: 500,
                        fontFamily:
                          '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                      }}
                    >
                      {t("landing.footer.tagline")}
                    </Typography>
                  </Box>
                </Box>
                <Typography
                  variant="body1"
                  sx={{
                    opacity: 0.8,
                    lineHeight: 1.7,
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
                      background: "rgba(255,255,255,0.1)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      color: "white",
                      "&:hover": {
                        background: "rgba(255,255,255,0.2)",
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
                      background: "rgba(255,255,255,0.1)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      color: "white",
                      "&:hover": {
                        background: "rgba(255,255,255,0.2)",
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
                      background: "rgba(255,255,255,0.1)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      color: "white",
                      "&:hover": {
                        background: "rgba(255,255,255,0.2)",
                        transform: "translateY(-2px)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    <Instagram sx={{ fontSize: 20 }} />
                  </IconButton>
                </Box>
              </Box>
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
                    "linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {t("landing.contact.info.title")}
              </Typography>

              <Box sx={{ mb: 4 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 3,
                    p: 2,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      background: "rgba(255,255,255,0.1)",
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
                      }}
                    >
                      {t("landing.contact.channels.phone")}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ opacity: 0.9, fontWeight: 600 }}
                    >
                      {t("landing.contact.info.phone")}
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
                      background: "rgba(255,255,255,0.1)",
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
                      }}
                    >
                      {t("landing.contact.channels.whatsapp")}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ opacity: 0.9, fontWeight: 600 }}
                    >
                      {t("landing.contact.info.whatsapp")}
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
                      background: "rgba(255,255,255,0.1)",
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
                      }}
                    >
                      {t("landing.contact.channels.email")}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ opacity: 0.9, fontWeight: 600 }}
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
                      background: "rgba(255,255,255,0.1)",
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
                      }}
                    >
                      {t("landing.footer.address")}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ opacity: 0.9, fontWeight: 600 }}
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
                    "linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%)",
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
                    color: "white",
                    opacity: 0.8,
                    p: 2,
                    mb: 1,
                    minWidth: "auto",
                    justifyContent: "flex-start",
                    textTransform: "none",
                    width: "100%",
                    "&:hover": {
                      opacity: 1,
                      background: "rgba(255,255,255,0.1)",
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
                    color: "white",
                    opacity: 0.8,
                    p: 2,
                    mb: 1,
                    minWidth: "auto",
                    justifyContent: "flex-start",
                    textTransform: "none",
                    width: "100%",
                    "&:hover": {
                      opacity: 1,
                      background: "rgba(255,255,255,0.1)",
                      transform: "translateX(4px)",
                    },
                    transition: "all 0.3s ease",
                  }}
                  onClick={() => smoothScrollTo("precios")}
                >
                  {t("landing.navigation.pricing")}
                </Button>
              </Box>

              {/* Newsletter Signup */}
              <Box
                sx={{
                  p: 3,
                  borderRadius: 0,
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    mb: 2,
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
                        color: "white",
                        background: "rgba(255,255,255,0.05)",
                        borderRadius: 0,
                        border: "1px solid rgba(255,255,255,0.1)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          background: "rgba(255,255,255,0.08)",
                          border: "1px solid rgba(255,255,255,0.2)",
                          transform: "translateY(-1px)",
                        },
                        "&.Mui-focused": {
                          background: "rgba(255,255,255,0.1)",
                          border: "1px solid rgba(255,255,255,0.3)",
                          boxShadow: "0 0 0 2px rgba(255,255,255,0.1)",
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
                          color: "rgba(255,255,255,0.6)",
                          opacity: 1,
                          fontWeight: 400,
                        },
                      },
                      "& .MuiInputLabel-root": {
                        color: "rgba(255,255,255,0.7)",
                        fontWeight: 500,
                      },
                    }}
                  />
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      background:
                        "linear-gradient(135deg, #ffffff 0%, #f8f8f8 100%)",
                      color: "#000000",
                      fontWeight: 700,
                      px: 4,
                      py: 1.5,
                      borderRadius: 0,
                      border: "1px solid rgba(255,255,255,0.2)",
                      boxShadow: "0 4px 20px rgba(255,255,255,0.1)",
                      fontFamily:
                        '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: "0.875rem",
                      textTransform: "none",
                      minWidth: "120px",
                      "&:hover": {
                        background:
                          "linear-gradient(135deg, #f8f8f8 0%, #e8e8e8 100%)",
                        transform: "translateY(-2px)",
                        boxShadow: "0 6px 25px rgba(255,255,255,0.15)",
                      },
                      "&:active": {
                        transform: "translateY(0px)",
                        boxShadow: "0 2px 10px rgba(255,255,255,0.1)",
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
              borderTop: "1px solid rgba(255,255,255,0.1)",
              pt: 4,
              mt: 6,
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "space-between",
              alignItems: "center",
              gap: 2,
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
              <Typography
                variant="body2"
                sx={{
                  opacity: 0.7,
                  cursor: "pointer",
                  "&:hover": { opacity: 1 },
                  transition: "opacity 0.3s ease",
                }}
              >
                {t("landing.footer.legal.privacy")}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  opacity: 0.7,
                  cursor: "pointer",
                  "&:hover": { opacity: 1 },
                  transition: "opacity 0.3s ease",
                }}
              >
                {t("landing.footer.legal.terms")}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  opacity: 0.7,
                  cursor: "pointer",
                  "&:hover": { opacity: 1 },
                  transition: "opacity 0.3s ease",
                }}
              >
                {t("landing.footer.legal.cookies")}
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Floating Settings Button */}
      <FloatingSettingsButton scrollY={scrollY} />

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
