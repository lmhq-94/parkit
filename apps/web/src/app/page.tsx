'use client';

import React, { useState } from 'react';
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
  Chip,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert
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
  LocationOn
} from '@mui/icons-material';
import { useAuthStore } from '../store/authStore';
import { DashboardLayout } from '../components/layout/DashboardLayout';

export default function HomePage() {
  const { user, isAuthenticated, login } = useAuthStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });

  const handleLogin = () => {
    // Simulate login with mock user data
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
    <Box>
      {/* Navigation */}
      <AppBar position="fixed" color="default" elevation={1}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
              <LocalParking sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                ParkIt
              </Typography>
            </Box>
            
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
              <Button color="inherit">Servicios</Button>
              <Button color="inherit">Precios</Button>
              <Button color="inherit">Contacto</Button>
              <Button 
                variant="contained" 
                startIcon={<AdminPanelSettings />}
                onClick={() => setLoginOpen(true)}
              >
                Administrar
              </Button>
            </Box>

            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={() => setMobileOpen(true)}
              sx={{ display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      >
        <Box sx={{ width: 250, pt: 2 }}>
          <List>
            <ListItem>
              <ListItemButton>
                <ListItemText primary="Servicios" />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton>
                <ListItemText primary="Precios" />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton>
                <ListItemText primary="Contacto" />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton onClick={() => setLoginOpen(true)}>
                <ListItemIcon><AdminPanelSettings /></ListItemIcon>
                <ListItemText primary="Administrar" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Hero Section */}
      <Box sx={{ pt: 10, pb: 8, bgcolor: 'primary.main', color: 'white' }}>
        <Container maxWidth="xl">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                Parking Inteligente
              </Typography>
              <Typography variant="h5" sx={{ mb: 3, opacity: 0.9 }}>
                La solución más avanzada para gestionar tu estacionamiento
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button 
                  variant="contained" 
                  size="large" 
                  sx={{ bgcolor: 'white', color: 'primary.main' }}
                  onClick={() => setLoginOpen(true)}
                >
                  Administrar Ahora
                </Button>
                <Button variant="outlined" size="large" sx={{ color: 'white', borderColor: 'white' }}>
                  Ver Demo
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: 'center' }}>
                <LocalParking sx={{ fontSize: 200, opacity: 0.3 }} />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Services Section */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="xl">
          <Typography variant="h3" align="center" gutterBottom sx={{ mb: 6 }}>
            Nuestros Servicios
          </Typography>
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%', textAlign: 'center' }}>
                <CardContent sx={{ p: 4 }}>
                  <LocalParking sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h5" gutterBottom>
                    Gestión de Espacios
                  </Typography>
                  <Typography color="text.secondary">
                    Administra eficientemente todos los espacios de parking con monitoreo en tiempo real
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%', textAlign: 'center' }}>
                <CardContent sx={{ p: 4 }}>
                  <QrCode sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h5" gutterBottom>
                    Acceso QR
                  </Typography>
                  <Typography color="text.secondary">
                    Sistema de entrada y salida mediante códigos QR para mayor seguridad
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%', textAlign: 'center' }}>
                <CardContent sx={{ p: 4 }}>
                  <Payment sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h5" gutterBottom>
                    Pagos Automáticos
                  </Typography>
                  <Typography color="text.secondary">
                    Procesamiento automático de pagos con múltiples métodos de pago
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%', textAlign: 'center' }}>
                <CardContent sx={{ p: 4 }}>
                  <Analytics sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h5" gutterBottom>
                    Reportes Avanzados
                  </Typography>
                  <Typography color="text.secondary">
                    Análisis detallado de ocupación, ingresos y tendencias del negocio
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%', textAlign: 'center' }}>
                <CardContent sx={{ p: 4 }}>
                  <Security sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h5" gutterBottom>
                    Seguridad Total
                  </Typography>
                  <Typography color="text.secondary">
                    Monitoreo 24/7 con cámaras y sistema de alertas integrado
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%', textAlign: 'center' }}>
                <CardContent sx={{ p: 4 }}>
                  <Support sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h5" gutterBottom>
                    Soporte 24/7
                  </Typography>
                  <Typography color="text.secondary">
                    Asistencia técnica disponible las 24 horas del día
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 8, bgcolor: 'grey.50' }}>
        <Container maxWidth="xl">
          <Typography variant="h3" align="center" gutterBottom sx={{ mb: 6 }}>
            ¿Por qué elegir ParkIt?
          </Typography>
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
                <CheckCircle sx={{ color: 'success.main', mr: 2, mt: 0.5 }} />
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Fácil de Usar
                  </Typography>
                  <Typography color="text.secondary">
                    Interfaz intuitiva que permite gestionar tu parking sin complicaciones
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
                <Speed sx={{ color: 'success.main', mr: 2, mt: 0.5 }} />
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Tiempo Real
                  </Typography>
                  <Typography color="text.secondary">
                    Monitoreo en tiempo real de ocupación y estado de espacios
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <Star sx={{ color: 'success.main', mr: 2, mt: 0.5 }} />
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Tecnología Avanzada
                  </Typography>
                  <Typography color="text.secondary">
                    Utilizamos las últimas tecnologías para garantizar el mejor servicio
                  </Typography>
                </Box>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box sx={{ bgcolor: 'white', p: 4, borderRadius: 2, boxShadow: 2 }}>
                <Typography variant="h5" gutterBottom>
                  Estadísticas Impresionantes
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                  <Box>
                    <Typography variant="h4" color="primary.main">99.9%</Typography>
                    <Typography variant="body2" color="text.secondary">Uptime</Typography>
                  </Box>
                  <Box>
                    <Typography variant="h4" color="primary.main">500+</Typography>
                    <Typography variant="body2" color="text.secondary">Clientes</Typography>
                  </Box>
                  <Box>
                    <Typography variant="h4" color="primary.main">24/7</Typography>
                    <Typography variant="body2" color="text.secondary">Soporte</Typography>
                  </Box>
                </Box>
                <Button variant="contained" fullWidth onClick={() => setLoginOpen(true)}>
                  Comenzar Ahora
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Contact Section */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="xl">
          <Typography variant="h3" align="center" gutterBottom sx={{ mb: 6 }}>
            Contáctanos
          </Typography>
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Phone sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Teléfono
                </Typography>
                <Typography color="text.secondary">
                  +1 (555) 123-4567
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Email sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Email
                </Typography>
                <Typography color="text.secondary">
                  info@parkit.com
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <LocationOn sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Dirección
                </Typography>
                <Typography color="text.secondary">
                  Calle Principal 123, Ciudad
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: 'grey.900', color: 'white', py: 4 }}>
        <Container maxWidth="xl">
          <Typography align="center">
            © 2024 ParkIt. Todos los derechos reservados.
          </Typography>
        </Container>
      </Box>

      {/* Login Dialog */}
      <Dialog open={loginOpen} onClose={() => setLoginOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Acceso Administrativo</Typography>
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
        <DialogActions>
          <Button onClick={() => setLoginOpen(false)}>Cancelar</Button>
          <Button variant="contained" onClick={handleLogin} startIcon={<Login />}>
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
        <Typography variant="h3" gutterBottom>
          Panel de Administración
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Gestiona tu sistema de parking desde aquí
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <LocalParking sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
              <Typography variant="h4">47</Typography>
              <Typography color="text.secondary">Espacios Disponibles</Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <DirectionsCar sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
              <Typography variant="h4">23</Typography>
              <Typography color="text.secondary">Vehiculos Activos</Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Payment sx={{ fontSize: 40, color: 'info.main', mb: 1 }} />
              <Typography variant="h4">$2,847</Typography>
              <Typography color="text.secondary">Ingresos Hoy</Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <QrCode sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
              <Typography variant="h4">156</Typography>
              <Typography color="text.secondary">Escaneos QR</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
