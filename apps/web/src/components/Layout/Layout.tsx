import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePermissions } from '@/hooks/usePermissions';
import {
  Assessment,
  Business,
  Dashboard,
  DirectionsCar,
  Event,
  LocalParking,
  Logout,
  Menu as MenuIcon,
  Notifications,
  Payment,
  People,
  Person,
  QrCode,
  Settings,
} from '@mui/icons-material';
import {
  AppBar,
  Avatar,
  Box,
  Chip,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { UserRole } from '@parkit/shared';
import { useRouter } from 'next/router';
import React from 'react';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import ThemeSelector from '../ThemeSelector/ThemeSelector';
import { layoutStyles } from './Layout.styles';

interface LayoutProps {
  children: React.ReactNode;
}

const drawerWidth = 240;

export default function Layout({ children }: LayoutProps) {
  const { user, logout, isAuthenticated } = useAuth();
  const permissions = usePermissions();
  const { t } = useLanguage();
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleProfileMenuClose();
    router.push('/login');
  };

  // Role-based menu items
  const getMenuItems = () => {
    const items = [];

    // Dashboard - available for all authenticated users
    if (permissions.canViewDashboard) {
      items.push({
        text: t('navigation.dashboard'),
        icon: <Dashboard />,
        path: '/dashboard',
      });
    }

    // Admin & Manager specific items
    if (permissions.canManageUsers) {
      items.push({
        text: t('navigation.users'),
        icon: <People />,
        path: '/users',
      });
    }

    if (permissions.canManageCompanies) {
      items.push({
        text: t('navigation.companies'),
        icon: <Business />,
        path: '/companies',
      });
    }

    if (permissions.canManageParkings) {
      items.push({
        text: t('navigation.parkings'),
        icon: <LocalParking />,
        path: '/parkings',
      });
    }

    // Reservations - different views based on permissions
    if (
      permissions.canManageReservations ||
      permissions.canViewOwnReservations
    ) {
      items.push({
        text: t('navigation.reservations'),
        icon: <Event />,
        path: '/reservations',
      });
    }

    // Vehicles - available for employees and clients
    if (permissions.canManageVehicles) {
      items.push({
        text: t('navigation.vehicles'),
        icon: <DirectionsCar />,
        path: '/vehicles',
      });
    }

    // Payments - admin and manager only
    if (permissions.canManagePayments) {
      items.push({
        text: t('navigation.payments'),
        icon: <Payment />,
        path: '/payments',
      });
    }

    // Events - valet and admin/manager
    if (permissions.canManageEvents) {
      items.push({
        text: t('navigation.events'),
        icon: <Event />,
        path: '/events',
      });
    }

    // QR Scanner - valet and admin/manager
    if (permissions.canScanQR) {
      items.push({
        text: t('navigation.qrScanner'),
        icon: <QrCode />,
        path: '/qr-scanner',
      });
    }

    // Reports - admin and manager only
    if (permissions.canViewReports) {
      items.push({
        text: t('navigation.reports'),
        icon: <Assessment />,
        path: '/reports',
      });
    }

    // Settings - admin only
    if (user?.role === UserRole.ADMIN) {
      items.push({
        text: t('navigation.settings'),
        icon: <Settings />,
        path: '/settings',
      });
    }

    return items;
  };

  const menuItems = getMenuItems();

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN:
        return 'error';
      case UserRole.MANAGER:
        return 'warning';
      case UserRole.VALET:
        return 'info';
      case UserRole.EMPLOYEE:
        return 'success';
      case UserRole.CLIENT:
        return 'default';
      default:
        return 'default';
    }
  };

  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN:
        return t('users.roles.admin');
      case UserRole.MANAGER:
        return t('users.roles.manager');
      case UserRole.VALET:
        return t('users.roles.valet');
      case UserRole.EMPLOYEE:
        return t('users.roles.employee');
      case UserRole.CLIENT:
        return t('users.roles.client');
      default:
        return t('common.user');
    }
  };

  const drawer = (
    <Box>
      <Toolbar>
        <Typography variant='h6' noWrap component='div'>
          {t('common.appName')}
        </Typography>
      </Toolbar>

      {/* User Info */}
      {user && (
        <Box sx={layoutStyles.userInfoContainer}>
          <Box display='flex' alignItems='center' mb={1}>
            <Avatar sx={layoutStyles.userAvatar}>
              {user.firstName?.charAt(0)}
            </Avatar>
            <Box>
              <Typography variant='subtitle2'>
                {user.firstName} {user.lastName}
              </Typography>
              <Typography variant='caption' color='textSecondary'>
                {user.email}
              </Typography>
            </Box>
          </Box>
          <Chip
            label={getRoleLabel(user.role)}
            color={getRoleColor(user.role)}
            size='small'
            variant='outlined'
          />
        </Box>
      )}

      <List>
        {menuItems.map(item => (
          <ListItem
            button
            key={item.text}
            onClick={() => {
              router.push(item.path);
              if (isMobile) setMobileOpen(false);
            }}
            selected={router.pathname === item.path}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  if (!isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <Box sx={layoutStyles.mainContainer}>
      <AppBar position='fixed' sx={layoutStyles.appBar}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={layoutStyles.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={layoutStyles.title}
          >
            {menuItems.find(item => item.path === router.pathname)?.text ||
              t('common.appName')}
          </Typography>

          <LanguageSelector />
          <ThemeSelector />

          <IconButton color='inherit'>
            <Notifications />
          </IconButton>

          <IconButton onClick={handleProfileMenuOpen} color='inherit'>
            <Avatar sx={layoutStyles.headerAvatar}>
              {user?.firstName?.charAt(0)}
            </Avatar>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box component='nav' sx={layoutStyles.navContainer}>
        <Drawer
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={layoutStyles.mobileDrawer}
        >
          {drawer}
        </Drawer>
        <Drawer variant='permanent' sx={layoutStyles.desktopDrawer} open>
          {drawer}
        </Drawer>
      </Box>

      <Box component='main' sx={layoutStyles.mainContent}>
        <Toolbar />
        <Container maxWidth='lg'>{children}</Container>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleProfileMenuClose}
      >
        <MenuItem
          onClick={() => {
            router.push('/profile');
            handleProfileMenuClose();
          }}
        >
          <ListItemIcon>
            <Person fontSize='small' />
          </ListItemIcon>
          {t('navigation.profile')}
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize='small' />
          </ListItemIcon>
          {t('auth.logout')}
        </MenuItem>
      </Menu>
    </Box>
  );
}
