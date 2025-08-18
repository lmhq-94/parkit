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
} from '../icons';
import { useTranslation } from 'react-i18next';
import { FaLinkedin, FaInstagram, FaFacebook } from 'react-icons/fa';

// Types
interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
  onNavigation: (elementId: string) => void;
  onLogin: () => void;
}

/**
 * MobileDrawer component - Professional mobile navigation drawer
 * Features clean design with essential navigation items and modern icons
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
          width: 320,
          background: theme.palette.background.paper,
          borderLeft: `1px solid ${theme.palette.divider}`,
          boxShadow: theme.palette.mode === "dark" 
            ? "0 8px 32px rgba(0, 0, 0, 0.4)"
            : "0 8px 32px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 3,
          borderBottom: `1px solid ${theme.palette.divider}`,
          background: theme.palette.background.default,
        }}
      >
        <Logo 
          variant="h6"
          fontSize={{ xs: '1.4rem', sm: '1.5rem', md: '1.6rem', lg: '1.6rem' }}
          fontWeight={{ xs: 700, sm: 700, md: 700, lg: 700 }}
        />
      </Box>

      {/* Navigation content */}
      <Box sx={{ flex: 1, overflowY: "auto" }}>
        <List sx={{ p: 0 }}>
          {/* Main Navigation */}
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => handleNavigation('hero')}
              sx={{
                py: 2.5,
                px: 3,
                borderBottom: `1px solid ${theme.palette.divider}`,
                "&:hover": {
                  background: theme.palette.action.hover,
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 40,
                  color: theme.palette.primary.main,
                }}
              >
                <HomeIcon />
              </ListItemIcon>
              <ListItemText
                primary="Inicio"
                sx={{
                  "& .MuiListItemText-primary": {
                    fontWeight: 500,
                    fontSize: "1rem",
                  },
                }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              onClick={() => handleNavigation('soluciones')}
              sx={{
                py: 2.5,
                px: 3,
                borderBottom: `1px solid ${theme.palette.divider}`,
                "&:hover": {
                  background: theme.palette.action.hover,
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 40,
                  color: theme.palette.primary.main,
                }}
              >
                <CarIcon />
              </ListItemIcon>
              <ListItemText
                primary="Soluciones"
                sx={{
                  "& .MuiListItemText-primary": {
                    fontWeight: 500,
                    fontSize: "1rem",
                  },
                }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              onClick={() => handleNavigation('como-funciona')}
              sx={{
                py: 2.5,
                px: 3,
                borderBottom: `1px solid ${theme.palette.divider}`,
                "&:hover": {
                  background: theme.palette.action.hover,
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 40,
                  color: theme.palette.primary.main,
                }}
              >
                <QrCodeIcon />
              </ListItemIcon>
              <ListItemText
                primary="Cómo Funciona"
                sx={{
                  "& .MuiListItemText-primary": {
                    fontWeight: 500,
                    fontSize: "1rem",
                  },
                }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              onClick={() => handleNavigation('faq')}
              sx={{
                py: 2.5,
                px: 3,
                borderBottom: `1px solid ${theme.palette.divider}`,
                "&:hover": {
                  background: theme.palette.action.hover,
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 40,
                  color: theme.palette.primary.main,
                }}
              >
                <HelpIcon />
              </ListItemIcon>
              <ListItemText
                primary="Preguntas Frecuentes"
                sx={{
                  "& .MuiListItemText-primary": {
                    fontWeight: 500,
                    fontSize: "1rem",
                  },
                }}
              />
            </ListItemButton>
          </ListItem>

          <Divider sx={{ my: 2 }} />

          {/* Quick Actions */}
          <ListItem disablePadding>
            <ListItemButton
              component="a"
              href="https://wa.me/50662164040"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                py: 2.5,
                px: 3,
                borderBottom: `1px solid ${theme.palette.divider}`,
                "&:hover": {
                  background: theme.palette.action.hover,
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 40,
                  color: "#25D366",
                }}
              >
                <PhoneIcon />
              </ListItemIcon>
              <ListItemText
                primary="Contactar por WhatsApp"
                secondary="+506 6216 4040"
                sx={{
                  "& .MuiListItemText-primary": {
                    fontWeight: 500,
                    fontSize: "1rem",
                  },
                  "& .MuiListItemText-secondary": {
                    fontSize: "0.875rem",
                    color: theme.palette.text.secondary,
                  },
                }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              component="a"
              href="mailto:info@parkit.com"
              sx={{
                py: 2.5,
                px: 3,
                borderBottom: `1px solid ${theme.palette.divider}`,
                "&:hover": {
                  background: theme.palette.action.hover,
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 40,
                  color: theme.palette.primary.main,
                }}
              >
                <MailIcon />
              </ListItemIcon>
              <ListItemText
                primary="Enviar Email"
                secondary="info@parkit.com"
                sx={{
                  "& .MuiListItemText-primary": {
                    fontWeight: 500,
                    fontSize: "1rem",
                  },
                  "& .MuiListItemText-secondary": {
                    fontSize: "0.875rem",
                    color: theme.palette.text.secondary,
                  },
                }}
              />
            </ListItemButton>
          </ListItem>

          <Divider sx={{ my: 2 }} />

          {/* Social Media */}
          <Box sx={{ p: 3, textAlign: "center" }}>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 600,
                mb: 2,
                color: theme.palette.text.secondary,
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Síguenos
            </Typography>
            <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
              {[
                { icon: <FaLinkedin />, color: "#0077b5", label: "LinkedIn", href: "https://linkedin.com/company/parkit" },
                { icon: <FaInstagram />, color: "#e4405f", label: "Instagram", href: "https://instagram.com/parkit" },
                { icon: <FaFacebook />, color: "#1877f2", label: "Facebook", href: "https://facebook.com/parkit" }
              ].map((social, index) => (
                <Box
                  key={index}
                  component="a"
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    width: 44,
                    height: 44,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "12px",
                    background: theme.palette.background.default,
                    border: `1px solid ${theme.palette.divider}`,
                    color: social.color,
                    textDecoration: "none",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      background: theme.palette.action.hover,
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    },
                  }}
                  title={social.label}
                >
                  {social.icon}
                </Box>
              ))}
            </Box>
          </Box>
        </List>
      </Box>

      {/* CTA section */}
      <Box
        sx={{
          p: 3,
          borderTop: `1px solid ${theme.palette.divider}`,
          background: theme.palette.background.default,
        }}
      >
        <Button
          fullWidth
          variant="contained"
          onClick={handleLogin}
          sx={{
            py: 2,
            px: 3,
            background: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            fontWeight: 600,
            fontSize: "1rem",
            borderRadius: "12px",
            textTransform: "none",
            boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
            "&:hover": {
              background: theme.palette.primary.dark,
              transform: "translateY(-1px)",
              boxShadow: "0 6px 20px rgba(59, 130, 246, 0.4)",
            },
            transition: "all 0.2s ease",
          }}
        >
          Comenzar Ahora
        </Button>
      </Box>
    </Drawer>
  );
}; 