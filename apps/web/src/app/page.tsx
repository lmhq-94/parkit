'use client';

import React, { useState, useEffect } from 'react';
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
  Divider
} from '@mui/material';
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
  Psychology
} from '@mui/icons-material';
import { useAuthStore } from '../store/authStore';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { FloatingSettingsButton } from '../components/FloatingSettingsButton';

export default function HomePage() {
  const { user, isAuthenticated, login } = useAuthStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [scrollY, setScrollY] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Función para scroll suave
  const smoothScrollTo = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
    }
  };

  const handleLogin = () => {
    const mockUser = {
      id: '1',
      email: loginData.email,
      firstName: 'Admin',
      lastName: 'User',
      role: 'admin',
      isVerified: true,
    };
    const mockToken = 'mock-jwt-token';
    login(mockUser, mockToken);
    setLoginOpen(false);
    setLoginData({ email: '', password: '' });
  };

  if (isAuthenticated) {
    return <DashboardLayout><AdminDashboard /></DashboardLayout>;
  }

  return (
    <Box sx={{ overflow: 'hidden' }}>
      {/* Modern Navigation */}
      <AppBar 
        position="fixed" 
        elevation={0}
        sx={{
          background: scrollY > 50 
            ? '#ffffff' 
            : 'transparent',
          borderBottom: scrollY > 50 
            ? '1px solid #f0f0f0' 
            : 'none',
          transition: 'all 0.3s ease'
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ 
            minHeight: { xs: 64, md: 72 },
            px: { xs: 2, md: 0 }
          }}>
            {/* Logo */}
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center',
                mr: 6
              }}>
                <Box sx={{
                  width: 40,
                  height: 40,
                  background: scrollY > 50 ? '#000000' : '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mr: 2
                }}>
                  <LocalParking sx={{ 
                    color: scrollY > 50 ? '#ffffff' : '#000000',
                    fontSize: 24
                  }} />
                </Box>
                <Typography variant="h6" sx={{ 
                  fontWeight: 700, 
                  color: scrollY > 50 ? '#000000' : '#ffffff',
                  fontSize: '1.25rem',
                  letterSpacing: '-0.02em',
                  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif'
                }}>
                  ParkIt
                </Typography>
              </Box>
            </Box>
            
            {/* Desktop Navigation */}
            <Box sx={{ 
              display: { xs: 'none', lg: 'flex' }, 
              alignItems: 'center',
              gap: 0
            }}>
              {[
                { label: 'Soluciones', id: 'soluciones' },
                { label: 'Precios', id: 'precios' },
                { label: 'Contacto', id: 'contacto' }
              ].map((item, index) => (
                <Button 
                  key={index}
                  onClick={() => smoothScrollTo(item.id)}
                  sx={{ 
                    color: scrollY > 50 ? '#000000' : '#ffffff',
                    fontWeight: 500,
                    fontSize: '0.875rem',
                    px: 3,
                    py: 2,
                    textTransform: 'none',
                    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                    '&:hover': { 
                      background: scrollY > 50 
                        ? 'rgba(0, 0, 0, 0.04)' 
                        : 'rgba(255, 255, 255, 0.1)',
                      color: scrollY > 50 ? '#000000' : '#ffffff'
                    },
                    transition: 'all 0.2s ease'
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>



            {/* CTA Button */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', ml: 3 }}>
              <Button 
                variant="contained" 
                onClick={() => setLoginOpen(true)}
                sx={{
                  background: scrollY > 50 ? '#000000' : '#ffffff',
                  color: scrollY > 50 ? '#ffffff' : '#000000',
                  px: 4,
                  py: 1.5,
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  textTransform: 'none',
                  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                  boxShadow: 'none',
                  border: scrollY > 50 ? '1px solid #000000' : '1px solid #ffffff',
                  '&:hover': {
                    background: scrollY > 50 ? '#333333' : '#f5f5f5',
                    color: scrollY > 50 ? '#ffffff' : '#000000',
                    boxShadow: 'none'
                  },
                  transition: 'all 0.2s ease'
                }}
              >
                Acceso Pro
              </Button>
            </Box>

            {/* Mobile Menu Button */}
            <IconButton
              sx={{ 
                color: scrollY > 50 ? '#000000' : '#ffffff',
                display: { md: 'none' },
                p: 1
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
            background: '#ffffff',
            color: '#000000'
          }
        }}
      >
        <Box sx={{ pt: 2 }}>
          <List>
            <ListItem>
              <ListItemButton onClick={() => smoothScrollTo('soluciones')}>
                <ListItemText primary="Soluciones" />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton onClick={() => smoothScrollTo('precios')}>
                <ListItemText primary="Precios" />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton onClick={() => smoothScrollTo('contacto')}>
                <ListItemText primary="Contacto" />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton onClick={() => setLoginOpen(true)}>
                <ListItemIcon><AdminPanelSettings /></ListItemIcon>
                <ListItemText primary="Acceso Pro" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Hero Section */}
      <Box sx={{ 
        position: 'relative',
        minHeight: '100vh',
        background: '#000000',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden'
      }}>
        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ color: 'white' }}>
                <Typography 
                  variant="h1" 
                  sx={{ 
                    fontWeight: 900,
                    fontSize: { xs: '2.5rem', md: '4rem', lg: '5rem' },
                    lineHeight: 1.1,
                    mb: 3,
                    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif'
                  }}
                >
                  El Futuro del
                  <Box component="span" sx={{ 
                    display: 'block',
                    color: '#ffffff'
                  }}>
                    Parking Inteligente
                  </Box>
                </Typography>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    mb: 4, 
                    opacity: 0.8,
                    fontWeight: 400,
                    lineHeight: 1.4,
                    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif'
                  }}
                >
                  Revoluciona tu negocio con tecnología de vanguardia. La plataforma más inteligente del mercado.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Button 
                    variant="contained" 
                    size="large" 
                    onClick={() => setLoginOpen(true)}
                    sx={{ 
                      background: '#ffffff',
                      color: '#000000',
                      px: 4,
                      py: 2,
                      fontWeight: 600,
                      fontSize: '1rem',
                      textTransform: 'none',
                      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                      '&:hover': {
                        background: '#f5f5f5',
                        color: '#000000'
                      },
                      transition: 'all 0.2s ease'
                    }}
                  >
                    Comenzar Ahora
                  </Button>
                  <Button 
                    variant="outlined" 
                    size="large" 
                    onClick={() => smoothScrollTo('soluciones')}
                    sx={{ 
                      color: '#ffffff', 
                      borderColor: '#ffffff',
                      px: 4,
                      py: 2,
                      fontWeight: 600,
                      fontSize: '1rem',
                      textTransform: 'none',
                      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                      '&:hover': {
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderColor: '#ffffff'
                      },
                      transition: 'all 0.2s ease'
                    }}
                  >
                    Ver Demo
                  </Button>
                </Box>
                
                {/* Stats */}
                <Box sx={{ display: 'flex', gap: 4, mt: 6, flexWrap: 'wrap' }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" sx={{ fontWeight: 900, color: '#ffffff' }}>99.9%</Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>Uptime Garantizado</Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" sx={{ fontWeight: 900, color: '#ffffff' }}>500+</Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>Empresas Confían</Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" sx={{ fontWeight: 900, color: '#ffffff' }}>24/7</Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>Soporte Premium</Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ 
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <LocalParking sx={{ 
                  fontSize: 300, 
                  color: 'rgba(255, 255, 255, 0.1)'
                }} />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 12, background: '#ffffff' }} id="soluciones">
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h2" sx={{ 
              fontWeight: 800,
              mb: 3,
              color: '#000000',
              fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif'
            }}>
              Tecnología de Vanguardia
            </Typography>
            <Typography variant="h6" sx={{ 
              color: '#666666', 
              maxWidth: 600, 
              mx: 'auto',
              fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif'
            }}>
              Integramos las últimas tecnologías para crear la experiencia de parking más inteligente del mercado
            </Typography>
          </Box>
          
          <Grid container spacing={4}>
            {[
              {
                icon: <SmartToy sx={{ fontSize: 60 }} />,
                title: "IA Predictiva",
                description: "Algoritmos de machine learning que predicen patrones de ocupación y optimizan la gestión",
                color: "#000000"
              },
              {
                icon: <Cloud sx={{ fontSize: 60 }} />,
                title: "Cloud Nativo",
                description: "Arquitectura cloud-first para máxima escalabilidad y disponibilidad global",
                color: "#000000"
              },
              {
                icon: <Sensors sx={{ fontSize: 60 }} />,
                title: "IoT Avanzado",
                description: "Sensores inteligentes que monitorean en tiempo real cada espacio de parking",
                color: "#000000"
              },
              {
                icon: <Security sx={{ fontSize: 60 }} />,
                title: "Seguridad Blockchain",
                description: "Transacciones seguras con tecnología blockchain y encriptación de nivel militar",
                color: "#000000"
              },
              {
                icon: <Analytics sx={{ fontSize: 60 }} />,
                title: "Analytics Avanzado",
                description: "Análisis predictivo y reportes en tiempo real con dashboards interactivos",
                color: "#000000"
              },
              {
                icon: <QrCode sx={{ fontSize: 60 }} />,
                title: "QR Dinámico",
                description: "Códigos QR que se regeneran automáticamente para máxima seguridad",
                color: "#000000"
              }
            ].map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{ 
                  height: '100%',
                  background: '#ffffff',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  border: '1px solid #f0f0f0',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                  }
                }}>
                  <CardContent sx={{ p: 4, textAlign: 'center' }}>
                    <Box sx={{
                      width: 80,
                      height: 80,
                      background: '#f8f8f8',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 3
                    }}>
                      <Box sx={{ color: feature.color }}>
                        {feature.icon}
                      </Box>
                    </Box>
                    <Typography variant="h5" sx={{ 
                      fontWeight: 700, 
                      mb: 2,
                      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif'
                    }}>
                      {feature.title}
                    </Typography>
                    <Typography color="text.secondary" sx={{ 
                      lineHeight: 1.6,
                      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif'
                    }}>
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box sx={{ 
        py: 12, 
        background: '#f8f8f8'
      }}>
        <Container maxWidth="xl">
          <Grid container spacing={4}>
            <Grid item xs={12} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h2" sx={{ 
                  fontWeight: 900, 
                  mb: 1,
                  color: '#000000',
                  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif'
                }}>99.9%</Typography>
                <Typography variant="h6" sx={{ 
                  opacity: 0.8,
                  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif'
                }}>Uptime Garantizado</Typography>
                <Typography variant="body2" sx={{ 
                  opacity: 0.7, 
                  mt: 1,
                  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif'
                }}>
                  Disponibilidad continua con redundancia global
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h2" sx={{ 
                  fontWeight: 900, 
                  mb: 1,
                  color: '#000000',
                  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif'
                }}>500+</Typography>
                <Typography variant="h6" sx={{ 
                  opacity: 0.8,
                  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif'
                }}>Empresas Confían</Typography>
                <Typography variant="body2" sx={{ 
                  opacity: 0.7, 
                  mt: 1,
                  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif'
                }}>
                  Desde startups hasta Fortune 500
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h2" sx={{ 
                  fontWeight: 900, 
                  mb: 1,
                  color: '#000000',
                  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif'
                }}>24/7</Typography>
                <Typography variant="h6" sx={{ 
                  opacity: 0.8,
                  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif'
                }}>Soporte Premium</Typography>
                <Typography variant="body2" sx={{ 
                  opacity: 0.7, 
                  mt: 1,
                  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif'
                }}>
                  Asistencia técnica disponible siempre
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h2" sx={{ 
                  fontWeight: 900, 
                  mb: 1,
                  color: '#000000',
                  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif'
                }}>50+</Typography>
                <Typography variant="h6" sx={{ 
                  opacity: 0.8,
                  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif'
                }}>Países</Typography>
                <Typography variant="body2" sx={{ 
                  opacity: 0.7, 
                  mt: 1,
                  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif'
                }}>
                  Presencia global con servidores locales
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Pricing Section */}
      <Box sx={{ py: 12, background: '#ffffff' }} id="precios">
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h2" sx={{ 
              fontWeight: 800,
              mb: 3,
              color: '#000000',
              fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif'
            }}>
              Planes y Precios
            </Typography>
            <Typography variant="h6" sx={{ 
              color: '#666666', 
              maxWidth: 600, 
              mx: 'auto',
              fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif'
            }}>
              Elige el plan que mejor se adapte a las necesidades de tu empresa
            </Typography>
          </Box>
          
          <Grid container spacing={4} justifyContent="center">
            {[
              {
                title: "Starter",
                price: "$99",
                period: "/mes",
                description: "Perfecto para pequeñas empresas",
                features: [
                  "Hasta 50 espacios de parking",
                  "Soporte por email",
                  "Reportes básicos",
                  "Integración QR",
                  "App móvil incluida"
                ],
                popular: false
              },
              {
                title: "Professional",
                price: "$299",
                period: "/mes",
                description: "Ideal para empresas medianas",
                features: [
                  "Hasta 200 espacios de parking",
                  "Soporte prioritario 24/7",
                  "Analytics avanzado",
                  "API personalizada",
                  "Integración IoT",
                  "Dashboard personalizado"
                ],
                popular: true
              },
              {
                title: "Enterprise",
                price: "$599",
                period: "/mes",
                description: "Para grandes corporaciones",
                features: [
                  "Espacios ilimitados",
                  "Soporte dedicado",
                  "IA predictiva",
                  "Integración blockchain",
                  "White-label",
                  "Implementación on-premise"
                ],
                popular: false
              }
            ].map((plan, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{ 
                  height: '100%',
                  background: '#ffffff',
                  boxShadow: plan.popular ? '0 8px 32px rgba(0,0,0,0.15)' : '0 2px 8px rgba(0,0,0,0.1)',
                  border: plan.popular ? '2px solid #000000' : '1px solid #f0f0f0',
                  position: 'relative',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 40px rgba(0,0,0,0.2)'
                  }
                }}>
                  {plan.popular && (
                    <Box sx={{
                      position: 'absolute',
                      top: -12,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: '#000000',
                      color: '#ffffff',
                      px: 3,
                      py: 1,
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif'
                    }}>
                      MÁS POPULAR
                    </Box>
                  )}
                  <CardContent sx={{ p: 4, textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ 
                      fontWeight: 700, 
                      mb: 1,
                      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif'
                    }}>
                      {plan.title}
                    </Typography>
                    <Typography variant="h3" sx={{ 
                      fontWeight: 900, 
                      mb: 1,
                      color: '#000000',
                      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif'
                    }}>
                      {plan.price}
                      <Box component="span" sx={{ 
                        fontSize: '1rem',
                        fontWeight: 400,
                        color: '#666666'
                      }}>
                        {plan.period}
                      </Box>
                    </Typography>
                    <Typography variant="body1" sx={{ 
                      mb: 4,
                      color: '#666666',
                      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif'
                    }}>
                      {plan.description}
                    </Typography>
                    <Box sx={{ mb: 4 }}>
                      {plan.features.map((feature, featureIndex) => (
                        <Box key={featureIndex} sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          mb: 2,
                          textAlign: 'left'
                        }}>
                          <CheckCircle sx={{ 
                            color: '#000000', 
                            mr: 2, 
                            fontSize: 20 
                          }} />
                          <Typography variant="body2" sx={{
                            fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif'
                          }}>
                            {feature}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                    <Button 
                      variant="contained" 
                      fullWidth
                      onClick={() => plan.popular ? setLoginOpen(true) : smoothScrollTo('contacto')}
                      sx={{
                        background: plan.popular ? '#000000' : '#ffffff',
                        color: plan.popular ? '#ffffff' : '#000000',
                        border: plan.popular ? 'none' : '2px solid #000000',
                        py: 2,
                        fontWeight: 600,
                        fontSize: '1rem',
                        textTransform: 'none',
                        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                        '&:hover': {
                          background: plan.popular ? '#333333' : '#f5f5f5',
                          color: plan.popular ? '#ffffff' : '#000000'
                        },
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {plan.popular ? 'Comenzar Ahora' : 'Seleccionar Plan'}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Contact Section */}
      <Box sx={{ py: 12, background: '#f8f8f8' }} id="contacto">
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h2" sx={{ 
              fontWeight: 800,
              mb: 3,
              color: '#000000',
              fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif'
            }}>
              Contacto
            </Typography>
            <Typography variant="h6" sx={{ 
              color: '#666666', 
              maxWidth: 600, 
              mx: 'auto',
              fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif'
            }}>
              ¿Tienes preguntas? Nuestro equipo está aquí para ayudarte
            </Typography>
          </Box>
          
          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 4 }}>
                <Typography variant="h4" sx={{ 
                  fontWeight: 700, 
                  mb: 3,
                  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif'
                }}>
                  Información de Contacto
                </Typography>
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Phone sx={{ color: '#000000', mr: 2 }} />
                    <Typography sx={{
                      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif'
                    }}>
                      +1 (555) 123-4567
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Email sx={{ color: '#000000', mr: 2 }} />
                    <Typography sx={{
                      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif'
                    }}>
                      info@parkit.com
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <LocationOn sx={{ color: '#000000', mr: 2 }} />
                    <Typography sx={{
                      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif'
                    }}>
                      San Francisco, CA 94105
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body1" sx={{ 
                  color: '#666666',
                  lineHeight: 1.6,
                  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif'
                }}>
                  Nuestro equipo de expertos está disponible 24/7 para brindarte el mejor soporte técnico y comercial.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ 
                background: '#ffffff',
                border: '1px solid #f0f0f0'
              }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h5" sx={{ 
                    fontWeight: 700, 
                    mb: 3,
                    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif'
                  }}>
                    Envíanos un Mensaje
                  </Typography>
                  <Box sx={{ mb: 3 }}>
                    <TextField
                      fullWidth
                      label="Nombre"
                      sx={{ mb: 2 }}
                    />
                    <TextField
                      fullWidth
                      label="Email"
                      type="email"
                      sx={{ mb: 2 }}
                    />
                    <TextField
                      fullWidth
                      label="Empresa"
                      sx={{ mb: 2 }}
                    />
                    <TextField
                      fullWidth
                      label="Mensaje"
                      multiline
                      rows={4}
                      sx={{ mb: 3 }}
                    />
                    <Button 
                      variant="contained" 
                      fullWidth
                      sx={{
                        background: '#000000',
                        color: '#ffffff',
                        py: 2,
                        fontWeight: 600,
                        fontSize: '1rem',
                        textTransform: 'none',
                        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                        '&:hover': {
                          background: '#333333'
                        },
                        transition: 'all 0.2s ease'
                      }}
                    >
                      Enviar Mensaje
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ py: 12, background: '#000000' }}>
        <Container maxWidth="xl">
          <Box sx={{ 
            textAlign: 'center',
            color: 'white'
          }}>
            <Typography variant="h2" sx={{ 
              fontWeight: 800, 
              mb: 3,
              fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif'
            }}>
              ¿Listo para el Futuro?
            </Typography>
            <Typography variant="h6" sx={{ 
              mb: 4, 
              opacity: 0.8,
              fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif'
            }}>
              Únete a las empresas más innovadoras que ya están transformando su negocio
            </Typography>
            <Button 
              variant="contained" 
              size="large"
              onClick={() => smoothScrollTo('precios')}
              sx={{ 
                background: '#ffffff',
                color: '#000000',
                px: 6,
                py: 2,
                fontWeight: 600,
                fontSize: '1.1rem',
                textTransform: 'none',
                fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                '&:hover': {
                  background: '#f5f5f5',
                  color: '#000000'
                },
                transition: 'all 0.2s ease'
              }}
            >
              Comenzar Gratis
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ 
        background: '#000000', 
        color: 'white', 
        py: 6 
      }}>
        <Container maxWidth="xl">
          <Typography align="center" sx={{ 
            opacity: 0.8,
            fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif'
          }}>
            © 2024 ParkIt. Todos los derechos reservados.
          </Typography>
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
            background: '#ffffff'
          }
        }}
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h5" sx={{ 
              fontWeight: 700,
              fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif'
            }}>Acceso Pro</Typography>
            <IconButton onClick={() => setLoginOpen(false)}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
              sx={{ mb: 3 }}
            />
            <TextField
              fullWidth
              label="Contraseña"
              type="password"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            />
            <Alert severity="info" sx={{ mt: 2 }}>
              Usa cualquier email y contraseña para acceder al demo
            </Alert>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button 
            onClick={() => setLoginOpen(false)}
            sx={{ color: '#666666' }}
          >
            Cancelar
          </Button>
          <Button 
            variant="contained" 
            onClick={handleLogin} 
            startIcon={<Login />}
            sx={{
              background: '#000000',
              color: '#ffffff',
              px: 3,
              fontWeight: 600,
              '&:hover': {
                background: '#333333'
              }
            }}
          >
            Ingresar
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
        <Typography variant="h3" gutterBottom sx={{ 
          fontWeight: 800,
          fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif'
        }}>
          Panel de Administración
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{
          fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif'
        }}>
          Gestiona tu sistema de parking desde aquí
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Card sx={{ 
            background: '#ffffff',
            border: '1px solid #f0f0f0'
          }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <LocalParking sx={{ fontSize: 40, mb: 1, color: '#000000' }} />
              <Typography variant="h4" sx={{ 
                fontWeight: 700,
                fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif'
              }}>47</Typography>
              <Typography sx={{ 
                opacity: 0.8,
                fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif'
              }}>Espacios Disponibles</Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={3}>
          <Card sx={{ 
            background: '#ffffff',
            border: '1px solid #f0f0f0'
          }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <DirectionsCar sx={{ fontSize: 40, mb: 1, color: '#000000' }} />
              <Typography variant="h4" sx={{ 
                fontWeight: 700,
                fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif'
              }}>23</Typography>
              <Typography sx={{ 
                opacity: 0.8,
                fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif'
              }}>Vehiculos Activos</Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={3}>
          <Card sx={{ 
            background: '#ffffff',
            border: '1px solid #f0f0f0'
          }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Payment sx={{ fontSize: 40, mb: 1, color: '#000000' }} />
              <Typography variant="h4" sx={{ 
                fontWeight: 700,
                fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif'
              }}>$2,847</Typography>
              <Typography sx={{ 
                opacity: 0.8,
                fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif'
              }}>Ingresos Hoy</Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={3}>
          <Card sx={{ 
            background: '#ffffff',
            border: '1px solid #f0f0f0'
          }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <QrCode sx={{ fontSize: 40, mb: 1, color: '#000000' }} />
              <Typography variant="h4" sx={{ 
                fontWeight: 700,
                fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif'
              }}>156</Typography>
              <Typography sx={{ 
                opacity: 0.8,
                fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif'
              }}>Escaneos QR</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
