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
  Link,
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
  Login,
  Close,
  Star,
  Phone,
  Smartphone,
  Email,
  LocationOn,
  TrendingUp,
  Dashboard,
  WhatsApp,
  LinkedIn,
  Twitter,
  Instagram,
  Help,
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
      {/* Modern Navigation */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background:
            scrollY > 50
              ? theme.palette.mode === "dark"
                ? "linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%)"
                : "linear-gradient(135deg, #ffffff 0%, #f8f8f8 100%)"
              : "transparent",
          backdropFilter: scrollY > 50 ? "blur(10px)" : "none",
          WebkitBackdropFilter: scrollY > 50 ? "blur(10px)" : "none",
          borderBottom:
            scrollY > 50
              ? theme.palette.mode === "dark"
                ? "1px solid rgba(255,255,255,0.1)"
                : "1px solid rgba(0,0,0,0.05)"
              : "none",
          boxShadow:
            scrollY > 50
              ? theme.palette.mode === "dark"
                ? "0 4px 20px rgba(0,0,0,0.3)"
                : "0 4px 20px rgba(0,0,0,0.08)"
              : "none",
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
                      color:
                        scrollY > 50
                          ? theme.palette.mode === "dark"
                            ? "#ffffff"
                            : "#000000"
                          : "#ffffff",
                      fontWeight: 700,
                    }}
                  >
                    park
                  </Box>
                  <Box
                    component="span"
                    sx={{
                      color:
                        scrollY > 50
                          ? theme.palette.mode === "dark"
                            ? "#00d4ff"
                            : "#0056b3"
                          : "#00d4ff",
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
                { label: t("landing.howItWorks.title"), id: "como-funciona" },
                { label: t("landing.faq.title"), id: "faq" },
                { label: t("landing.navigation.contact"), id: "footer" },
              ].map((item, index) => (
                <Button
                  key={index}
                  onClick={() => smoothScrollTo(item.id)}
                  sx={{
                    color:
                      scrollY > 50
                        ? theme.palette.mode === "dark"
                          ? "#cccccc"
                          : "#000000"
                        : "rgba(255,255,255,0.9)",
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
                          ? theme.palette.mode === "dark"
                            ? "rgba(255,255,255,0.1)"
                            : "rgba(0, 0, 0, 0.08)"
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
                      ? theme.palette.mode === "dark"
                        ? "linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)"
                        : "linear-gradient(135deg, #000000 0%, #333333 100%)"
                      : "rgba(255,255,255,0.1)",
                  color:
                    scrollY > 50
                      ? theme.palette.mode === "dark"
                        ? "#000000"
                        : "#ffffff"
                      : "rgba(255,255,255,0.9)",
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
                        ? theme.palette.mode === "dark"
                          ? "linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%)"
                          : "linear-gradient(135deg, #333333 0%, #000000 100%)"
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
                color:
                  scrollY > 50
                    ? theme.palette.mode === "dark"
                      ? "#cccccc"
                      : "#000000"
                    : "rgba(255,255,255,0.9)",
                display: { md: "none" },
                p: 2,
                background: "transparent",
                border: "none",
                borderRadius: 0,
                "&:hover": {
                  background:
                    scrollY > 50
                      ? theme.palette.mode === "dark"
                        ? "rgba(255,255,255,0.1)"
                        : "rgba(0, 0, 0, 0.08)"
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
            width: { xs: "80vw", sm: 300 },
            background:
              theme.palette.mode === "dark"
                ? "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)"
                : "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
            color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
            borderRight:
              theme.palette.mode === "dark"
                ? "1px solid rgba(255,255,255,0.15)"
                : "1px solid rgba(0,0,0,0.1)",
            boxShadow:
              theme.palette.mode === "dark"
                ? "0 8px 32px rgba(0,0,0,0.5)"
                : "0 8px 32px rgba(0,0,0,0.15)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            position: "fixed",
            top: 0,
            right: 0,
            height: "100vh",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                theme.palette.mode === "dark"
                  ? "radial-gradient(circle at 20% 80%, rgba(255,255,255,0.03) 0%, transparent 50%)"
                  : "radial-gradient(circle at 20% 80%, rgba(0,0,0,0.02) 0%, transparent 50%)",
              pointerEvents: "none",
            },
          },
        }}
      >
        <Box
          sx={{
            pt: 4,
            pb: 3,
            px: 3,
            position: "relative",
            zIndex: 2,
          }}
        >
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 4,
              pb: 3,
              borderBottom:
                theme.palette.mode === "dark"
                  ? "1px solid rgba(255,255,255,0.15)"
                  : "1px solid rgba(0,0,0,0.1)",
              position: "relative",
              zIndex: 2,
            }}
          >
            <Box
              sx={{
                width: 36,
                height: 36,
                background:
                  theme.palette.mode === "dark"
                    ? "linear-gradient(135deg, #ffffff 0%, #f8f8f8 100%)"
                    : "linear-gradient(135deg, #000000 0%, #333333 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mr: 2,
                borderRadius: "4px",
                boxShadow:
                  theme.palette.mode === "dark"
                    ? "0 4px 20px rgba(255,255,255,0.1)"
                    : "0 4px 20px rgba(0,0,0,0.1)",
              }}
            >
              <Typography
                sx={{
                  color: theme.palette.mode === "dark" ? "#000000" : "#ffffff",
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  fontFamily: "var(--font-league-spartan), sans-serif",
                }}
              >
                p.
              </Typography>
            </Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                fontSize: "1.5rem",
                fontFamily: "var(--font-league-spartan), sans-serif",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box
                component="span"
                sx={{
                  color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                }}
              >
                park
              </Box>
              <Box
                component="span"
                sx={{
                  color: theme.palette.mode === "dark" ? "#00d4ff" : "#0056b3",
                }}
              >
                it.
              </Box>
            </Typography>
          </Box>

          <List sx={{ pt: 0 }}>
            <ListItem sx={{ mb: 2, px: 0 }}>
              <ListItemButton
                onClick={() => handleNavigation("soluciones")}
                sx={{
                  borderRadius: 0,
                  py: 2,
                  px: 3,
                  background: "transparent",
                  "&:hover": {
                    background:
                      theme.palette.mode === "dark"
                        ? "rgba(255,255,255,0.1)"
                        : "rgba(0,0,0,0.05)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                <ListItemIcon
                  sx={{
                    color:
                      theme.palette.mode === "dark" ? "#00d4ff" : "#0056b3",
                    minWidth: 36,
                  }}
                >
                  <DirectionsCar sx={{ fontSize: 20 }} />
                </ListItemIcon>
                <ListItemText
                  primary={t("landing.navigation.solutions")}
                  sx={{
                    "& .MuiListItemText-primary": {
                      fontWeight: 500,
                      fontSize: "0.9rem",
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>

            <ListItem sx={{ mb: 2, px: 0 }}>
              <ListItemButton
                onClick={() => handleNavigation("como-funciona")}
                sx={{
                  borderRadius: 0,
                  py: 2,
                  px: 3,
                  background: "transparent",
                  "&:hover": {
                    background:
                      theme.palette.mode === "dark"
                        ? "rgba(255,255,255,0.1)"
                        : "rgba(0,0,0,0.05)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                <ListItemIcon
                  sx={{
                    color:
                      theme.palette.mode === "dark" ? "#00d4ff" : "#0056b3",
                    minWidth: 36,
                  }}
                >
                  <QrCode sx={{ fontSize: 20 }} />
                </ListItemIcon>
                <ListItemText
                  primary={t("landing.howItWorks.title")}
                  sx={{
                    "& .MuiListItemText-primary": {
                      fontWeight: 500,
                      fontSize: "0.9rem",
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>

            <ListItem sx={{ mb: 2, px: 0 }}>
              <ListItemButton
                onClick={() => handleNavigation("faq")}
                sx={{
                  borderRadius: 0,
                  py: 2,
                  px: 3,
                  background: "transparent",
                  "&:hover": {
                    background:
                      theme.palette.mode === "dark"
                        ? "rgba(255,255,255,0.1)"
                        : "rgba(0,0,0,0.05)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                <ListItemIcon
                  sx={{
                    color:
                      theme.palette.mode === "dark" ? "#00d4ff" : "#0056b3",
                    minWidth: 36,
                  }}
                >
                  <Help sx={{ fontSize: 20 }} />
                </ListItemIcon>
                <ListItemText
                  primary={t("landing.faq.title")}
                  sx={{
                    "& .MuiListItemText-primary": {
                      fontWeight: 500,
                      fontSize: "0.9rem",
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>

            <ListItem sx={{ mb: 2, px: 0 }}>
              <ListItemButton
                onClick={() => handleNavigation("footer")}
                sx={{
                  borderRadius: 0,
                  py: 2,
                  px: 3,
                  background: "transparent",
                  "&:hover": {
                    background:
                      theme.palette.mode === "dark"
                        ? "rgba(255,255,255,0.1)"
                        : "rgba(0,0,0,0.05)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                <ListItemIcon
                  sx={{
                    color:
                      theme.palette.mode === "dark" ? "#00d4ff" : "#0056b3",
                    minWidth: 36,
                  }}
                >
                  <Phone sx={{ fontSize: 20 }} />
                </ListItemIcon>
                <ListItemText
                  primary={t("landing.navigation.contact")}
                  sx={{
                    "& .MuiListItemText-primary": {
                      fontWeight: 500,
                      fontSize: "0.9rem",
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>

            <Box
              sx={{
                mt: 4,
                pt: 3,
                borderTop:
                  theme.palette.mode === "dark"
                    ? "1px solid rgba(255,255,255,0.15)"
                    : "1px solid rgba(0,0,0,0.1)",
                position: "relative",
                zIndex: 2,
              }}
            >
              <ListItem sx={{ px: 0 }}>
                <ListItemButton
                  onClick={() => {
                    setLoginOpen(true);
                    setMobileOpen(false); // Cerrar el drawer
                  }}
                  sx={{
                    borderRadius: 0,
                    py: 2.5,
                    px: 3,
                    background:
                      theme.palette.mode === "dark"
                        ? "linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)"
                        : "linear-gradient(135deg, #000000 0%, #333333 100%)",
                    color:
                      theme.palette.mode === "dark" ? "#000000" : "#ffffff",
                    boxShadow:
                      theme.palette.mode === "dark"
                        ? "0 4px 20px rgba(255,255,255,0.2)"
                        : "0 4px 20px rgba(0,0,0,0.2)",
                    border:
                      theme.palette.mode === "dark"
                        ? "1px solid rgba(255,255,255,0.2)"
                        : "1px solid rgba(255,255,255,0.2)",
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
                        theme.palette.mode === "dark"
                          ? "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)"
                          : "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                      transition: "left 0.5s",
                    },
                    "&:hover": {
                      background:
                        theme.palette.mode === "dark"
                          ? "linear-gradient(135deg, #f8f8f8 0%, #e8e8e8 100%)"
                          : "linear-gradient(135deg, #333333 0%, #000000 100%)",
                      transform: "translateY(-3px)",
                      boxShadow:
                        theme.palette.mode === "dark"
                          ? "0 12px 40px rgba(255,255,255,0.4)"
                          : "0 12px 40px rgba(0,0,0,0.4)",
                      "&::before": {
                        left: "100%",
                      },
                    },
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  <ListItemText
                    primary={t("landing.hero.startNow")}
                    sx={{
                      "& .MuiListItemText-primary": {
                        fontWeight: 700,
                        fontSize: "0.9rem",
                        textAlign: "center",
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </Box>
          </List>
        </Box>
      </Drawer>

      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          minHeight: "100vh",
          background:
            theme.palette.mode === "dark"
              ? "linear-gradient(135deg, #000000 0%, #0a0a0a 100%)"
              : "linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%)",
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
            background:
              theme.palette.mode === "dark"
                ? "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 20%, #2d2d2d 40%, #1a1a1a 60%, #0f0f0f 80%, #000000 100%)"
                : "linear-gradient(135deg, #1e3c72 0%, #2a5298 25%, #3a5fba 50%, #2a5298 75%, #1e3c72 100%)",
            opacity: theme.palette.mode === "dark" ? 0.9 : 0.8,
            zIndex: 1,
          },
        }}
      >
        <Container
          maxWidth="xl"
          sx={{ position: "relative", zIndex: 3, py: { xs: 4, sm: 6, md: 8 } }}
        >
          <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} alignItems="center">
            <Grid item xs={12} md={8} lg={6}>
              <Box
                sx={{
                  color: theme.palette.mode === "dark" ? "white" : "black",
                  position: "relative",
                  zIndex: 3,
                  textAlign: { xs: "center", md: "left" },
                  px: { xs: 3, sm: 4, md: 0 },
                  mx: { xs: 2, sm: 3, md: 0 },
                }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    fontWeight: 900,
                    fontSize: {
                      xs: "2rem",
                      sm: "2.5rem",
                      md: "3.5rem",
                      lg: "4.5rem",
                      xl: "5rem",
                    },
                    lineHeight: { xs: 1.2, sm: 1.1 },
                    mb: { xs: 2, sm: 3 },
                    fontFamily:
                      '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                    background:
                      "linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    textShadow: "0 4px 20px rgba(255,255,255,0.1)",
                    textAlign: { xs: "center", md: "left" },
                    px: { xs: 2, sm: 0 },
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
                      fontSize: {
                        xs: "1.5rem",
                        sm: "1.8rem",
                        md: "2.2rem",
                        lg: "2.5rem",
                        xl: "2.8rem",
                      },
                      mt: { xs: 1, sm: 2 },
                    }}
                  >
                    {t("landing.hero.subtitle")}
                  </Box>
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    mb: { xs: 3, sm: 4 },
                    opacity: 0.9,
                    fontWeight: 400,
                    lineHeight: { xs: 1.5, sm: 1.6 },
                    fontSize: {
                      xs: "1rem",
                      sm: "1.1rem",
                      md: "1.25rem",
                      lg: "1.5rem",
                    },
                    fontFamily:
                      '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                    color: "rgba(255,255,255,0.9)",
                    textShadow: "0 2px 10px rgba(0,0,0,0.3)",
                    textAlign: { xs: "center", md: "left" },
                    px: { xs: 2, sm: 0 },
                    maxWidth: { xs: "100%", md: "90%" },
                  }}
                >
                  {t("landing.hero.description")}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    gap: { xs: 2, sm: 3 },
                    flexWrap: "wrap",
                    position: "relative",
                    zIndex: 3,
                    justifyContent: { xs: "center", md: "flex-start" },
                    px: { xs: 2, sm: 0 },
                  }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => setLoginOpen(true)}
                    sx={{
                      background:
                        theme.palette.mode === "dark"
                          ? "linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)"
                          : "linear-gradient(135deg, #000000 0%, #333333 100%)",
                      color:
                        theme.palette.mode === "dark" ? "#000000" : "#ffffff",
                      px: { xs: 4, sm: 5, md: 6 },
                      py: { xs: 2, sm: 2.5 },
                      fontWeight: 700,
                      fontSize: { xs: "0.875rem", sm: "0.9rem", md: "1rem" },
                      textTransform: "none",
                      borderRadius: 0,
                      fontFamily:
                        '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                      boxShadow:
                        theme.palette.mode === "dark"
                          ? "0 8px 32px rgba(255,255,255,0.3)"
                          : "0 8px 32px rgba(0,0,0,0.3)",
                      border:
                        theme.palette.mode === "dark"
                          ? "1px solid rgba(255,255,255,0.2)"
                          : "1px solid rgba(255,255,255,0.2)",
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
                          theme.palette.mode === "dark"
                            ? "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)"
                            : "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                        transition: "left 0.5s",
                      },
                      "&:hover": {
                        background:
                          theme.palette.mode === "dark"
                            ? "linear-gradient(135deg, #f8f8f8 0%, #e8e8e8 100%)"
                            : "linear-gradient(135deg, #333333 0%, #000000 100%)",
                        transform: "translateY(-3px)",
                        boxShadow:
                          theme.palette.mode === "dark"
                            ? "0 12px 40px rgba(255,255,255,0.4)"
                            : "0 12px 40px rgba(0,0,0,0.4)",
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
                    onClick={() => smoothScrollTo("como-funciona")}
                    sx={{
                      color:
                        theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      borderColor:
                        theme.palette.mode === "dark"
                          ? "rgba(255,255,255,0.4)"
                          : "rgba(0,0,0,0.4)",
                      px: { xs: 4, sm: 5, md: 6 },
                      py: { xs: 2, sm: 2.5 },
                      fontWeight: 600,
                      fontSize: { xs: "0.875rem", sm: "0.9rem", md: "1rem" },
                      textTransform: "none",
                      borderRadius: 0,
                      fontFamily:
                        '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                      background:
                        theme.palette.mode === "dark"
                          ? "rgba(255,255,255,0.08)"
                          : "rgba(0,0,0,0.08)",
                      backdropFilter: "blur(15px)",
                      borderWidth: "2px",
                      "&:hover": {
                        background:
                          theme.palette.mode === "dark"
                            ? "rgba(255, 255, 255, 0.15)"
                            : "rgba(0, 0, 0, 0.15)",
                        borderColor:
                          theme.palette.mode === "dark"
                            ? "rgba(255,255,255,0.8)"
                            : "rgba(0,0,0,0.8)",
                        transform: "translateY(-3px)",
                        boxShadow:
                          theme.palette.mode === "dark"
                            ? "0 8px 32px rgba(255,255,255,0.3)"
                            : "0 8px 32px rgba(0,0,0,0.3)",
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
                    gap: { xs: 2, sm: 3, md: 4 },
                    mt: { xs: 6, sm: 7, md: 8 },
                    flexWrap: "wrap",
                    position: "relative",
                    zIndex: 3,
                    justifyContent: { xs: "center", md: "flex-start" },
                    px: { xs: 2, sm: 0 },
                  }}
                >
                  <Box
                    sx={{
                      textAlign: "center",
                      p: { xs: 1.5, sm: 2 },
                      borderRadius: 0,
                      background:
                        theme.palette.mode === "dark"
                          ? "rgba(255,255,255,0.05)"
                          : "rgba(0,0,0,0.05)",
                      backdropFilter: "blur(10px)",
                      border:
                        theme.palette.mode === "dark"
                          ? "1px solid rgba(255,255,255,0.1)"
                          : "1px solid rgba(0,0,0,0.1)",
                      transition: "all 0.3s ease",
                      minWidth: { xs: "120px", sm: "140px", md: "160px" },
                      "&:hover": {
                        background:
                          theme.palette.mode === "dark"
                            ? "rgba(255,255,255,0.1)"
                            : "rgba(0,0,0,0.1)",
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 900,
                        fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
                        color:
                          theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                        textShadow:
                          theme.palette.mode === "dark"
                            ? "0 2px 10px rgba(255,255,255,0.3)"
                            : "0 2px 10px rgba(0,0,0,0.3)",
                        mb: 1,
                      }}
                    >
                      99.9%
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        opacity: 0.9,
                        fontWeight: 500,
                        fontSize: { xs: "0.75rem", sm: "0.875rem" },
                        color:
                          theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      }}
                    >
                      {t("landing.hero.uptime")}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      textAlign: "center",
                      p: 2,
                      borderRadius: 0,
                      background:
                        theme.palette.mode === "dark"
                          ? "rgba(255,255,255,0.05)"
                          : "rgba(0,0,0,0.05)",
                      backdropFilter: "blur(10px)",
                      border:
                        theme.palette.mode === "dark"
                          ? "1px solid rgba(255,255,255,0.1)"
                          : "1px solid rgba(0,0,0,0.1)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        background:
                          theme.palette.mode === "dark"
                            ? "rgba(255,255,255,0.1)"
                            : "rgba(0,0,0,0.1)",
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 900,
                        color:
                          theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                        textShadow:
                          theme.palette.mode === "dark"
                            ? "0 2px 10px rgba(255,255,255,0.3)"
                            : "0 2px 10px rgba(0,0,0,0.3)",
                        mb: 1,
                      }}
                    >
                      500+
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        opacity: 0.9,
                        fontWeight: 500,
                        color:
                          theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      }}
                    >
                      {t("landing.hero.companies")}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      textAlign: "center",
                      p: 2,
                      borderRadius: 0,
                      background:
                        theme.palette.mode === "dark"
                          ? "rgba(255,255,255,0.05)"
                          : "rgba(0,0,0,0.05)",
                      backdropFilter: "blur(10px)",
                      border:
                        theme.palette.mode === "dark"
                          ? "1px solid rgba(255,255,255,0.1)"
                          : "1px solid rgba(0,0,0,0.1)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        background:
                          theme.palette.mode === "dark"
                            ? "rgba(255,255,255,0.1)"
                            : "rgba(0,0,0,0.1)",
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 900,
                        color:
                          theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                        textShadow:
                          theme.palette.mode === "dark"
                            ? "0 2px 10px rgba(255,255,255,0.3)"
                            : "0 2px 10px rgba(0,0,0,0.3)",
                        mb: 1,
                      }}
                    >
                      24/7
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        opacity: 0.9,
                        fontWeight: 500,
                        color:
                          theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      }}
                    >
                      {t("landing.hero.support")}
                    </Typography>
                  </Box>
                </Box>
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
          <Box sx={{ textAlign: "center", mb: 12, px: { xs: 2, sm: 0 } }}>
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
              {t("landing.features.title")}
            </Typography>
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
          <Box sx={{ textAlign: "center", mb: 12, px: { xs: 2, sm: 0 } }}>
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
              {t("landing.howItWorks.title")}
            </Typography>
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
          </Box>

          {/* Process Steps */}
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
                <Box
                  sx={{
                    textAlign: "center",
                    p: 4,
                    position: "relative",
                  }}
                >
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
                    }}
                  >
                    {step.icon}
                  </Box>
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
                </Box>
              </Grid>
            ))}
          </Grid>
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
          <Box sx={{ textAlign: "center", mb: 12, px: { xs: 2, sm: 0 } }}>
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
              {t("landing.testimonials.title")}
            </Typography>
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
          </Box>

          {/* Testimonials Grid */}
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
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow:
                        theme.palette.mode === "dark"
                          ? "0 20px 40px rgba(0,0,0,0.5)"
                          : "0 20px 40px rgba(0,0,0,0.12)",
                    },
                  }}
                >
                  <Box sx={{ mb: 3 }}>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        sx={{ fontSize: 20, color: "#FFD700", mr: 0.5 }}
                      />
                    ))}
                  </Box>
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
                    "{testimonial.content}"
                  </Typography>
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
                </Card>
              </Grid>
            ))}
          </Grid>
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
          <Box sx={{ textAlign: "center", mb: 12, px: { xs: 2, sm: 0 } }}>
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
              {t("landing.faq.title")}
            </Typography>
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
          </Box>

          {/* FAQ Grid */}
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
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow:
                        theme.palette.mode === "dark"
                          ? "0 20px 40px rgba(0,0,0,0.5)"
                          : "0 20px 40px rgba(0,0,0,0.12)",
                    },
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color:
                        theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      mb: 2,
                      fontFamily:
                        '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                    }}
                  >
                    {faq.question}
                  </Typography>
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
                </Card>
              </Grid>
            ))}
          </Grid>
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
          <Box sx={{ textAlign: "center", px: { xs: 2, sm: 0 } }}>
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
              {t("landing.cta.title")}
            </Typography>
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
          </Box>
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
              <Box sx={{ mb: 6 }}>
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
                  </Box>
                </Box>
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
