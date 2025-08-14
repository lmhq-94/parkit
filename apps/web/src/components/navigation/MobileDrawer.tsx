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
} from '@mui/material';
import {
  CarIcon,
  QrCodeIcon,
  HelpIcon,
  MessageIcon,
  LoginIcon,
} from '../icons';

// Types
interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
  onNavigation: (elementId: string) => void;
  onLogin: () => void;
}

/**
 * MobileDrawer component - Mobile navigation drawer
 * Features modern design with theme integration and smooth navigation
 */
export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  open,
  onClose,
  onNavigation,
  onLogin,
}) => {
  const theme = useTheme();

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
          width: 320,
          background: theme.palette.mode === "dark"
            ? "linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(26,26,46,0.95) 100%)"
            : "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)",
          borderRight: theme.palette.mode === "dark"
            ? "1px solid rgba(255,255,255,0.1)"
            : "1px solid rgba(0,0,0,0.1)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          position: "fixed",
          top: 0,
          right: 0,
          height: "100vh",
          zIndex: 1200,
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: theme.palette.mode === "dark"
              ? "radial-gradient(circle at 20% 80%, rgba(56, 189, 248, 0.1) 0%, transparent 50%)"
              : "radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.05) 0%, transparent 50%)",
            pointerEvents: "none",
          },
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 3,
          borderBottom: theme.palette.mode === "dark"
            ? "1px solid rgba(255,255,255,0.1)"
            : "1px solid rgba(0,0,0,0.1)",
          position: "relative",
          zIndex: 2,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            fontSize: "1.5rem",
            color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
            letterSpacing: "-0.02em",
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
              color: theme.palette.mode === "dark" ? "#3b82f6" : "#3b82f6",
            }}
          >
            it.
          </Box>
        </Typography>
      </Box>

      {/* Navigation content */}
      <Box sx={{ flex: 1, position: "relative", zIndex: 2 }}>
        <List sx={{ p: 2 }}>
          {/* Navigation items */}
                  {[
          { label: "Soluciones", icon: <CarIcon />, id: "soluciones" },
          { label: "Cómo Funciona", icon: <QrCodeIcon />, id: "como-funciona" },
          { label: "FAQ", icon: <HelpIcon />, id: "faq" },
          { label: "Contacto", icon: <MessageIcon />, id: "footer" },
        ].map((item) => (
            <ListItem key={item.id} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                onClick={() => handleNavigation(item.id)}
                sx={{
                  borderRadius: 0,
                  py: 2,
                  px: 3,
                  background: "transparent",
                  "&:hover": {
                    background: theme.palette.mode === "dark"
                      ? "rgba(255,255,255,0.1)"
                      : "rgba(0,0,0,0.05)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 40,
                    color: theme.palette.mode === "dark" ? "#3b82f6" : "#3b82f6",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  sx={{
                    "& .MuiListItemText-primary": {
                      fontWeight: 500,
                      color: theme.palette.mode === "dark" ? "#e2e8f0" : "#374151",
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        {/* CTA section */}
        <Box
          sx={{
            p: 2,
            borderTop: theme.palette.mode === "dark"
              ? "1px solid rgba(255,255,255,0.1)"
              : "1px solid rgba(0,0,0,0.1)",
            position: "relative",
            zIndex: 2,
          }}
        >
          <ListItem disablePadding>
            <ListItemButton
              onClick={handleLogin}
              sx={{
                borderRadius: 0,
                py: 2.5,
                px: 3,
                background: theme.palette.mode === "dark"
                  ? "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)"
                  : "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
                color: "#ffffff",
                boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)",
                "&:hover": {
                  background: theme.palette.mode === "dark"
                    ? "linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)"
                    : "linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 15px 35px rgba(59, 130, 246, 0.4)",
                },
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 40,
                  color: "#ffffff",
                }}
              >
                <LoginIcon />
              </ListItemIcon>
              <ListItemText
                primary="Comenzar Ahora"
                sx={{
                  "& .MuiListItemText-primary": {
                    fontWeight: 600,
                    color: "#ffffff",
                    textAlign: "center",
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        </Box>
      </Box>
    </Drawer>
  );
}; 