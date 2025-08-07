import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
} from '@mui/material';
import {
  LocalParking,
  QrCode,
  Payment,
  Security,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

// Types for hero stats
interface HeroStat {
  value: string;
  label: string;
  icon: string;
}

// Hero stats data
const heroStats: HeroStat[] = [
  { value: "500+", label: "Espacios Activos", icon: "🚗" },
  { value: "24/7", label: "Monitoreo", icon: "⏰" },
  { value: "99.9%", label: "Uptime", icon: "⚡" },
];

// Props interface
interface HeroSectionProps {
  onStartNow: () => void;
  onViewDemo: () => void;
}

/**
 * HeroSection component - Main landing page hero section
 * Features modern design with gradient backgrounds, 3D card stack, and responsive layout
 */
export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartNow,
  onViewDemo,
}) => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        background: theme.palette.mode === "dark"
          ? "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 25%, #16213e 50%, #1a1a2e 75%, #0f0f23 100%)"
          : "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 25%, #cbd5e1 50%, #e2e8f0 75%, #f8fafc 100%)",
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
          background: theme.palette.mode === "dark"
            ? "radial-gradient(ellipse at 20% 20%, rgba(56, 189, 248, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)"
            : "radial-gradient(ellipse at 20% 20%, rgba(59, 130, 246, 0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(147, 51, 234, 0.08) 0%, transparent 50%)",
          zIndex: 1,
        },
      }}
    >
      {/* Geometric background elements for visual depth */}
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          right: "15%",
          width: 300,
          height: 300,
          background: theme.palette.mode === "dark"
            ? "linear-gradient(45deg, rgba(56, 189, 248, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)"
            : "linear-gradient(45deg, rgba(59, 130, 246, 0.05) 0%, rgba(147, 51, 234, 0.05) 100%)",
          borderRadius: "50%",
          filter: "blur(60px)",
          zIndex: 1,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "20%",
          left: "10%",
          width: 200,
          height: 200,
          background: theme.palette.mode === "dark"
            ? "linear-gradient(45deg, rgba(168, 85, 247, 0.1) 0%, rgba(56, 189, 248, 0.1) 100%)"
            : "linear-gradient(45deg, rgba(147, 51, 234, 0.05) 0%, rgba(59, 130, 246, 0.05) 100%)",
          borderRadius: "50%",
          filter: "blur(40px)",
          zIndex: 1,
        }}
      />

      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 3 }}>
        <Grid container spacing={8} alignItems="center">
          {/* Left content section */}
          <Grid item xs={12} lg={7}>
            <Box sx={{ textAlign: { xs: "center", lg: "left" } }}>
              <PremiumBadge />
              <MainHeadline />
              <Subtitle />
              <CTASection onStartNow={onStartNow} onViewDemo={onViewDemo} />
              <StatsGrid stats={heroStats} />
            </Box>
          </Grid>

          {/* Right visual section */}
          <Grid item xs={12} lg={5}>
            <VisualSection />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

/**
 * Premium badge component with technology indicator
 */
const PremiumBadge: React.FC = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 1.5,
        px: 3,
        py: 1.5,
        mb: 4,
        background: theme.palette.mode === "dark"
          ? "rgba(255, 255, 255, 0.08)"
          : "rgba(0, 0, 0, 0.04)",
        borderRadius: "100px",
        border: theme.palette.mode === "dark"
          ? "1px solid rgba(255, 255, 255, 0.12)"
          : "1px solid rgba(0, 0, 0, 0.08)",
        backdropFilter: "blur(20px)",
        boxShadow: theme.palette.mode === "dark"
          ? "0 8px 32px rgba(0, 0, 0, 0.3)"
          : "0 8px 32px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Box
        sx={{
          width: 10,
          height: 10,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
          boxShadow: "0 0 20px rgba(16, 185, 129, 0.5)",
        }}
      />
      <Typography
        variant="body2"
        sx={{
          fontWeight: 600,
          color: theme.palette.mode === "dark" ? "#e2e8f0" : "#374151",
          fontSize: "0.875rem",
          letterSpacing: "0.025em",
        }}
      >
        {t("landing.hero.badge")}
      </Typography>
    </Box>
  );
};

/**
 * Main headline with gradient text effects
 */
const MainHeadline: React.FC = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Typography
      variant="h1"
      sx={{
        fontWeight: 900,
        fontSize: {
          xs: "2.5rem",
          sm: "3.5rem",
          md: "4rem",
          lg: "4.5rem",
          xl: "5.5rem",
        },
        lineHeight: 1.05,
        mb: 4,
        background: theme.palette.mode === "dark"
          ? "linear-gradient(135deg, #ffffff 0%, #e2e8f0 50%, #cbd5e1 100%)"
          : "linear-gradient(135deg, #111827 0%, #374151 50%, #6b7280 100%)",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        textAlign: { xs: "center", lg: "left" },
        letterSpacing: "-0.02em",
      }}
    >
      {t("landing.hero.title")}
      <Box
        component="span"
        sx={{
          display: "block",
          background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 50%, #1e40af 100%)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontSize: "0.9em",
          mt: 1,
        }}
      >
        {t("landing.hero.subtitle")}
      </Box>
    </Typography>
  );
};

/**
 * Subtitle with descriptive text
 */
const Subtitle: React.FC = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Typography
      variant="h2"
      sx={{
        fontWeight: 500,
        fontSize: {
          xs: "1.125rem",
          sm: "1.25rem",
          md: "1.375rem",
          lg: "1.5rem",
        },
        mb: 5,
        color: theme.palette.mode === "dark" ? "#94a3b8" : "#6b7280",
        lineHeight: 1.5,
        textAlign: { xs: "center", lg: "left" },
        maxWidth: 600,
      }}
    >
      {t("landing.hero.description")}
    </Typography>
  );
};

/**
 * Call-to-action buttons section
 */
const CTASection: React.FC<HeroSectionProps> = ({ onStartNow, onViewDemo }) => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        gap: 3,
        justifyContent: { xs: "center", lg: "flex-start" },
        mb: 8,
      }}
    >
      <Button
        variant="contained"
        size="large"
        onClick={onStartNow}
        sx={{
          background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
          color: "#ffffff",
          px: 5,
          py: 2.5,
          borderRadius: "16px",
          fontWeight: 700,
          fontSize: "1.125rem",
          textTransform: "none",
          boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)",
          border: "none",
          position: "relative",
          overflow: "hidden",
          minWidth: 200,
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
            background: "linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)",
            transform: "translateY(-3px)",
            boxShadow: "0 25px 50px rgba(59, 130, 246, 0.5)",
            "&::before": {
              left: "100%",
            },
          },
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {t("landing.hero.startNow")}
      </Button>
      <Button
        variant="outlined"
        size="large"
        onClick={onViewDemo}
        sx={{
          color: theme.palette.mode === "dark" ? "#e2e8f0" : "#374151",
          borderColor: theme.palette.mode === "dark" ? "rgba(226, 232, 240, 0.3)" : "rgba(55, 65, 81, 0.3)",
          px: 5,
          py: 2.5,
          borderRadius: "16px",
          fontWeight: 600,
          fontSize: "1.125rem",
          textTransform: "none",
          background: theme.palette.mode === "dark" ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
          backdropFilter: "blur(20px)",
          borderWidth: "2px",
          minWidth: 200,
          "&:hover": {
            background: theme.palette.mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.04)",
            borderColor: theme.palette.mode === "dark" ? "rgba(226, 232, 240, 0.6)" : "rgba(55, 65, 81, 0.6)",
            transform: "translateY(-3px)",
            boxShadow: "0 15px 35px rgba(0,0,0,0.15)",
          },
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {t("landing.hero.viewDemo")}
      </Button>
    </Box>
  );
};

/**
 * Stats grid component with hover effects
 */
const StatsGrid: React.FC<{ stats: HeroStat[] }> = ({ stats }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "repeat(3, 1fr)", sm: "repeat(3, 1fr)" },
        gap: 4,
        maxWidth: 600,
        mx: { xs: "auto", lg: 0 },
      }}
    >
      {stats.map((stat, index) => (
        <Box
          key={index}
          sx={{
            textAlign: "center",
            p: 3,
            background: theme.palette.mode === "dark" ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
            borderRadius: "20px",
            border: theme.palette.mode === "dark" ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.06)",
            backdropFilter: "blur(20px)",
            transition: "all 0.4s ease",
            "&:hover": {
              background: theme.palette.mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.04)",
              transform: "translateY(-6px)",
              boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
            },
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 900,
              fontSize: { xs: "1.75rem", sm: "2rem", md: "2.25rem" },
              color: theme.palette.mode === "dark" ? "#ffffff" : "#111827",
              mb: 1,
              background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {stat.value}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 500,
              fontSize: "0.875rem",
              color: theme.palette.mode === "dark" ? "#94a3b8" : "#6b7280",
              letterSpacing: "0.025em",
            }}
          >
            {stat.label}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

/**
 * Visual section with 3D card stack and floating icons
 */
const VisualSection: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        minHeight: { xs: "500px", lg: "700px" },
      }}
    >
      {/* Modern 3D card stack */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          maxWidth: 600,
          height: 500,
        }}
      >
        {/* Background layer */}
        <Box
          sx={{
            position: "absolute",
            top: 40,
            left: 40,
            right: 40,
            bottom: 40,
            background: theme.palette.mode === "dark" ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
            borderRadius: "32px",
            border: theme.palette.mode === "dark" ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.08)",
            backdropFilter: "blur(30px)",
            transform: "rotate(-8deg)",
            boxShadow: "0 25px 50px rgba(0,0,0,0.1)",
          }}
        />
        
        {/* Middle layer */}
        <Box
          sx={{
            position: "absolute",
            top: 20,
            left: 20,
            right: 20,
            bottom: 20,
            background: theme.palette.mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
            borderRadius: "28px",
            border: theme.palette.mode === "dark" ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.1)",
            backdropFilter: "blur(25px)",
            transform: "rotate(-4deg)",
            boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
          }}
        />
        
        {/* Main card */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: theme.palette.mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.95)",
            borderRadius: "24px",
            border: theme.palette.mode === "dark" ? "1px solid rgba(255,255,255,0.15)" : "1px solid rgba(0,0,0,0.1)",
            backdropFilter: "blur(20px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            p: 5,
            boxShadow: "0 30px 60px rgba(0,0,0,0.12)",
          }}
        >
          {/* Main icon */}
          <Box
            sx={{
              width: 100,
              height: 100,
              background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
              borderRadius: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 4,
              boxShadow: "0 25px 50px rgba(59, 130, 246, 0.4)",
            }}
          >
            <LocalParking sx={{ fontSize: 48, color: "#ffffff" }} />
          </Box>
          
          {/* App name */}
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              color: theme.palette.mode === "dark" ? "#ffffff" : "#111827",
              mb: 3,
              textAlign: "center",
              letterSpacing: "-0.02em",
            }}
          >
            ParkIt Pro
          </Typography>
          
          {/* Description */}
          <Typography
            variant="body1"
            sx={{
              color: theme.palette.mode === "dark" ? "#cbd5e1" : "#6b7280",
              textAlign: "center",
              maxWidth: 350,
              lineHeight: 1.6,
              fontSize: "1.125rem",
            }}
          >
            La solución definitiva para gestión inteligente de parqueos con tecnología de punta
          </Typography>
        </Box>

        {/* Floating feature icons */}
        <Box
          sx={{
            position: "absolute",
            top: "8%",
            right: "8%",
            width: 70,
            height: 70,
            background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
            borderRadius: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 15px 35px rgba(16, 185, 129, 0.4)",
          }}
        >
          <QrCode sx={{ fontSize: 28, color: "#ffffff" }} />
        </Box>
        
        <Box
          sx={{
            position: "absolute",
            bottom: "12%",
            left: "8%",
            width: 60,
            height: 60,
            background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
            borderRadius: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 15px 35px rgba(139, 92, 246, 0.4)",
          }}
        >
          <Payment sx={{ fontSize: 24, color: "#ffffff" }} />
        </Box>
        
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            right: "-10%",
            width: 50,
            height: 50,
            background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 15px 35px rgba(245, 158, 11, 0.4)",
          }}
        >
          <Security sx={{ fontSize: 20, color: "#ffffff" }} />
        </Box>
      </Box>
    </Box>
  );
}; 