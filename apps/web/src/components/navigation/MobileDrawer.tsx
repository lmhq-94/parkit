import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
  useTheme,
  Divider,
  Avatar,
  Chip,
} from '@mui/material';
import { Logo } from '../Logo';
import {
  CarIcon,
  QrCodeIcon,
  HelpIcon,
  MessageIcon,
  LoginIcon,
  HomeIcon,
  UserIcon,
  SettingsIcon,
  PhoneIcon,
  EmailIcon as MailIcon,
  StarIcon,
  SecurityIcon as ShieldIcon,
  ZapIcon,
} from '../icons';
import { useTranslation } from 'react-i18next';
import { FaLinkedin, FaInstagram, FaFacebook, FaWhatsapp } from 'react-icons/fa';

// Types
interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
  onNavigation: (elementId: string) => void;
  onLogin: () => void;
}

/**
 * MobileDrawer component - Modern, Uber-inspired mobile navigation drawer
 * Features clean design with professional styling and improved UX
 */
export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  open,
  onClose,
  onNavigation,
  onLogin,
}) => {
  const theme = useTheme();
  const { t } = useTranslation();

  const handleNavigation = (elementId: string) => {
    onNavigation(elementId);
    onClose();
  };

  const handleLogin = () => {
    onLogin();
    onClose();
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 360,
          background: theme.palette.background.paper,
          borderLeft: `1px solid ${theme.palette.divider}`,
          borderTopLeftRadius: "16px",
          borderBottomLeftRadius: "16px",
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          boxShadow: theme.palette.mode === "dark" 
            ? "0 12px 40px rgba(0, 0, 0, 0.5)"
            : "0 12px 40px rgba(0, 0, 0, 0.15)",
          overflow: "hidden",
        },
      }}
    >
      {/* Modern Header with Hero Section Background */}
      <Box
        sx={{
          p: 4,
          background: theme.palette.mode === 'dark' 
            ? `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 50%, ${theme.palette.background.default} 100%)`
            : `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[50]} 50%, ${theme.palette.background.paper} 100%)`,
          color: theme.palette.text.primary,
          position: "relative",
          overflow: "hidden",
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
            zIndex: 1,
          }}
        />
        
        {/* Logo and Close */}
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
          <Logo 
            variant="h5"
            fontSize="1.5rem"
            fontWeight={700}
            color={theme.palette.primary.main}
          />
          <Chip
            label="v2.0"
            size="small"
            sx={{
              background: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              fontSize: "0.7rem",
              height: "24px",
            }}
          />
        </Box>

        {/* Welcome Message */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            mb: 1,
            opacity: 0.9,
          }}
        >
          Bienvenido a ParkIt
        </Typography>
        <Typography
          variant="body2"
          sx={{
            opacity: 0.8,
            lineHeight: 1.4,
          }}
        >
          La plataforma más inteligente del mercado
        </Typography>
      </Box>

      {/* Navigation content */}
      <Box sx={{ flex: 1, overflowY: "auto" }}>
        <List sx={{ p: 0 }}>
          {/* Main Navigation Section */}
          <Box sx={{ p: 3, pb: 1 }}>
            <Typography
              variant="overline"
              sx={{
                fontWeight: 600,
                color: theme.palette.text.secondary,
                fontSize: "0.7rem",
                letterSpacing: "0.1em",
                mb: 2,
                display: "block",
              }}
            >
              NAVEGACIÓN
            </Typography>
          </Box>

          {/* Navigation Items */}
          {[
            { icon: <HomeIcon />, text: "Inicio", action: () => handleNavigation('hero'), color: theme.palette.primary.main },
            { icon: <CarIcon />, text: "Soluciones", action: () => handleNavigation('soluciones'), color: "#10b981" },
            { icon: <QrCodeIcon />, text: "Cómo Funciona", action: () => handleNavigation('como-funciona'), color: "#f59e0b" },
            { icon: <HelpIcon />, text: "FAQ", action: () => handleNavigation('faq'), color: "#8b5cf6" },
          ].map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                onClick={item.action}
                sx={{
                  py: 2.5,
                  px: 3,
                  mx: 2,
                  mb: 1,
                  borderRadius: "12px",
                  background: "transparent",
                  border: "none",
                  "&:hover": {
                    background: theme.palette.action.hover,
                    transform: "translateX(4px)",
                  },
                  transition: "all 0.2s ease",
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 44,
                    color: item.color,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{
                    "& .MuiListItemText-primary": {
                      fontWeight: 600,
                      fontSize: "1rem",
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}

          <Divider sx={{ my: 3, mx: 3 }} />



          {/* Features Preview */}
          <Box sx={{ p: 3, pt: 1 }}>
            <Typography
              variant="overline"
              sx={{
                fontWeight: 600,
                color: theme.palette.text.secondary,
                fontSize: "0.7rem",
                letterSpacing: "0.1em",
                mb: 2,
                display: "block",
              }}
            >
              CARACTERÍSTICAS
            </Typography>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              {[
                { icon: <ZapIcon />, label: "Rápido", color: "#f59e0b" },
                { icon: <ShieldIcon />, label: "Seguro", color: "#10b981" },
                { icon: <StarIcon />, label: "Premium", color: "#8b5cf6" },
              ].map((feature, index) => (
                <Chip
                  key={index}
                  icon={feature.icon}
                  label={feature.label}
                  size="small"
                  sx={{
                    background: `${feature.color}15`,
                    color: feature.color,
                    border: `1px solid ${feature.color}30`,
                    fontWeight: 600,
                    fontSize: "0.75rem",
                    height: "28px",
                    "& .MuiChip-icon": {
                      color: feature.color,
                      fontSize: "1rem",
                    },
                  }}
                />
              ))}
            </Box>
          </Box>
        </List>
      </Box>

      {/* Modern CTA section */}
      <Box
        sx={{
          p: 3,
          background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 100%)`,
          borderTop: `1px solid ${theme.palette.divider}`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background Pattern */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            opacity: 0.05,
            background: "radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)",
          }}
        />
        
        <Button
          fullWidth
          variant="contained"
          onClick={handleLogin}
          startIcon={<LoginIcon />}
          sx={{
            py: 2.5,
            px: 3,
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
            color: theme.palette.primary.contrastText,
            fontWeight: 700,
            fontSize: "1rem",
            borderRadius: "16px",
            textTransform: "none",
            boxShadow: `0 8px 25px ${theme.palette.primary.main}40`,
            border: "none",
            "&:hover": {
              background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
              transform: "translateY(-2px)",
              boxShadow: `0 12px 35px ${theme.palette.primary.main}50`,
            },
            transition: "all 0.3s ease",
          }}
        >
          Comenzar Ahora
        </Button>
        
        <Typography
          variant="caption"
          sx={{
            display: "block",
            textAlign: "center",
            mt: 2,
            color: theme.palette.text.secondary,
            fontSize: "0.75rem",
            opacity: 0.7,
          }}
        >
          Únete a miles de usuarios satisfechos
        </Typography>
      </Box>
    </Drawer>
  );
}; 