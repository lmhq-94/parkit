import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Avatar,
  Chip,
  Fade,
  Slide,
  Grow,
  Card,
  CardContent,
  Grid,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  LocalParking,
  QrCode,
  Payment,
  Security,
  Star,
  ArrowForward,
  PlayArrow,
  CheckCircle,
  TrendingUp,
  Speed,
  Verified,
  AutoAwesome,
  Rocket,
  Bolt,
  Shield,
  Analytics,
  Smartphone,
  Cloud,
  Diamond,
  WorkspacePremium,
  Psychology,
  PrecisionManufacturing,
  ArrowUpward,
  TrendingDown,
  Visibility,
  Settings,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

interface HeroSectionProps {
  onStartNow: () => void;
  onViewDemo: () => void;
}

// Modern Bento Box Background Component
const BentoBoxBackground: React.FC = () => {
  const theme = useTheme();
  const { i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';

  return (
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
          [isRTL ? 'right' : 'left']: "5%",
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
          [isRTL ? 'left' : 'right']: "10%",
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
          [isRTL ? 'right' : 'left']: "8%",
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
          [isRTL ? 'right' : 'left']: "15%",
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
          [isRTL ? 'left' : 'right']: "8%",
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
          [isRTL ? 'left' : 'right']: "5%",
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
  );
};

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartNow,
  onViewDemo,
}) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [activeMetric, setActiveMetric] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveMetric((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const metrics = [
    { value: "500+", label: t("landing.hero.stats.spaces"), icon: <LocalParking />, trend: "+12%" },
    { value: "24/7", label: t("landing.hero.stats.monitoring"), icon: <Speed />, trend: "+8%" },
    { value: "99.9%", label: t("landing.hero.stats.uptime"), icon: <Verified />, trend: "+5%" },
    { value: "10K+", label: "Users", icon: <Visibility />, trend: "+15%" },
  ];

  const currentMetric = metrics[activeMetric];

  return (
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
      {/* Bento Box Background */}
      <BentoBoxBackground />

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
            <Fade in={isVisible} timeout={800}>
              <Box>
                {/* Premium Badge */}
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

                {/* Main Headline */}
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
                  {t("landing.hero.title")}
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
                    {t("landing.hero.subtitle")}
                  </Box>
                </Typography>

                {/* Description */}
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

                {/* CTA Buttons */}
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={3}
                  sx={{ mb: 8 }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    onClick={onStartNow}
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
                    onClick={onViewDemo}
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
              </Box>
            </Fade>
          </Box>

          {/* Right Content - Bento Box Grid */}
          <Box
            sx={{
              flex: { xs: "1", lg: "0.4" },
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            <Slide direction="up" in={isVisible} timeout={1000}>
              <Box>
                {/* Bento Box Grid */}
                <Grid container spacing={3}>
                  {/* Main Feature Card */}
                  <Grid item xs={12}>
                    <Card
                      sx={{
                        background: `linear-gradient(135deg, ${theme.palette.primary.main}10, ${theme.palette.secondary.main}10)`,
                        border: `1px solid ${theme.palette.divider}`,
                        borderRadius: 4,
                        backdropFilter: "blur(20px)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-5px)",
                          boxShadow: theme.shadows[12],
                        },
                      }}
                    >
                      <CardContent sx={{ p: 4 }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 3 }}>
                          <Avatar
                            sx={{
                              width: 60,
                              height: 60,
                              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                              color: "#ffffff",
                            }}
                          >
                            <LocalParking />
                          </Avatar>
                          <Box>
                            <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>
                              ParkIt Pro
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Smart parking management
                            </Typography>
                          </Box>
                        </Box>
                        <Stack direction="row" spacing={1}>
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} sx={{ fontSize: 18, color: theme.palette.warning.main }} />
                          ))}
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>

                  {/* Metrics Cards */}
                  <Grid item xs={6}>
                    <Card
                      sx={{
                        background: theme.palette.background.paper,
                        border: `1px solid ${theme.palette.divider}`,
                        borderRadius: 3,
                        backdropFilter: "blur(20px)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-3px)",
                          boxShadow: theme.shadows[8],
                        },
                      }}
                    >
                      <CardContent sx={{ p: 3, textAlign: "center" }}>
                        <Avatar
                          sx={{
                            width: 40,
                            height: 40,
                            background: `linear-gradient(135deg, ${theme.palette.success.main} 0%, ${theme.palette.success.dark} 100%)`,
                            color: "#ffffff",
                            mx: "auto",
                            mb: 2,
                          }}
                        >
                          {currentMetric.icon}
                        </Avatar>
                        <Typography variant="h4" sx={{ fontWeight: 900, mb: 1 }}>
                          {currentMetric.value}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          {currentMetric.label}
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0.5 }}>
                          <ArrowUpward sx={{ fontSize: 14, color: theme.palette.success.main }} />
                          <Typography variant="caption" color="success.main" sx={{ fontWeight: 600 }}>
                            {currentMetric.trend}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>

                  {/* Feature Cards */}
                  <Grid item xs={6}>
                    <Card
                      sx={{
                        background: theme.palette.background.paper,
                        border: `1px solid ${theme.palette.divider}`,
                        borderRadius: 3,
                        backdropFilter: "blur(20px)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-3px)",
                          boxShadow: theme.shadows[8],
                        },
                      }}
                    >
                      <CardContent sx={{ p: 3, textAlign: "center" }}>
                        <Avatar
                          sx={{
                            width: 40,
                            height: 40,
                            background: `linear-gradient(135deg, ${theme.palette.info.main} 0%, ${theme.palette.info.dark} 100%)`,
                            color: "#ffffff",
                            mx: "auto",
                            mb: 2,
                          }}
                        >
                          <QrCode />
                        </Avatar>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                          QR Payments
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Instant transactions
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={6}>
                    <Card
                      sx={{
                        background: theme.palette.background.paper,
                        border: `1px solid ${theme.palette.divider}`,
                        borderRadius: 3,
                        backdropFilter: "blur(20px)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-3px)",
                          boxShadow: theme.shadows[8],
                        },
                      }}
                    >
                      <CardContent sx={{ p: 3, textAlign: "center" }}>
                        <Avatar
                          sx={{
                            width: 40,
                            height: 40,
                            background: `linear-gradient(135deg, ${theme.palette.warning.main} 0%, ${theme.palette.warning.dark} 100%)`,
                            color: "#ffffff",
                            mx: "auto",
                            mb: 2,
                          }}
                        >
                          <Security />
                        </Avatar>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                          Secure
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Enterprise-grade
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={6}>
                    <Card
                      sx={{
                        background: theme.palette.background.paper,
                        border: `1px solid ${theme.palette.divider}`,
                        borderRadius: 3,
                        backdropFilter: "blur(20px)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-3px)",
                          boxShadow: theme.shadows[8],
                        },
                      }}
                    >
                      <CardContent sx={{ p: 3, textAlign: "center" }}>
                        <Avatar
                          sx={{
                            width: 40,
                            height: 40,
                            background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.dark} 100%)`,
                            color: "#ffffff",
                            mx: "auto",
                            mb: 2,
                          }}
                        >
                          <Analytics />
                        </Avatar>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                          Analytics
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Real-time insights
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Box>
            </Slide>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}; 