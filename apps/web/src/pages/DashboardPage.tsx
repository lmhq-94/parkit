import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePermissions } from '@/hooks/usePermissions';
import { gql, useQuery } from '@apollo/client';
import {
  Assessment,
  Business,
  Event,
  LocalParking,
  Payment,
  People,
  TrendingDown,
  TrendingUp,
} from '@mui/icons-material';
import {
  Alert,
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import { UserRole } from '@parkit/shared';
import React from 'react';
import { dashboardPageStyles } from '@/styles/DashboardPage.styles';

const GET_DASHBOARD_DATA = gql`
  query GetDashboardData {
    parkings(filter: { isActive: true }) {
      data {
        id
        name
        status
        hourlyRate
      }
    }
    reservations {
      data {
        id
        startTime
        endTime
        status
        parking {
          name
        }
        vehicle {
          licensePlate
        }
      }
    }
    events {
      data {
        id
        type
        timestamp
        description
      }
    }
  }
`;

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}

function DashboardCard({ title, value, icon, color }: DashboardCardProps) {
  return (
    <Card sx={dashboardPageStyles.card}>
      <CardContent>
        <Box sx={dashboardPageStyles.cardContent}>
          <Box>
            <Typography color='textSecondary' gutterBottom variant='h6'>
              {title}
            </Typography>
            <Typography variant='h4' component='div'>
              {value}
            </Typography>
          </Box>
          <Box
            sx={{
              ...dashboardPageStyles.cardIcon,
              backgroundColor: color,
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const permissions = usePermissions();
  const { data, loading, error } = useQuery(GET_DASHBOARD_DATA);

  if (loading) {
    return (
      <Box sx={dashboardPageStyles.container}>
        <Typography>{t('common.loading')} dashboard...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={dashboardPageStyles.container}>
        <Alert severity='error'>
          {t('errors.dashboardLoadError')}: {error.message}
        </Alert>
      </Box>
    );
  }

  const parkings = data?.parkings?.data || [];
  const reservations = data?.reservations?.data || [];
  const events = data?.events?.data || [];

  const availableParkings = parkings.filter(
    (p: any) => p.status === 'AVAILABLE'
  ).length;
  const activeReservations = reservations.filter(
    (r: any) => r.status === 'CONFIRMED'
  ).length;
  const recentEvents = events.slice(0, 5);

  // Role-specific dashboard content
  const getRoleSpecificCards = () => {
    const cards = [];

    // Common cards for all roles
    cards.push(
      <Grid item xs={12} sm={6} md={3} key='available-parkings'>
        <DashboardCard
          title={t('dashboard.availableParkings')}
          value={availableParkings}
          icon={<LocalParking sx={{ color: 'white' }} />}
          color='#4caf50'
        />
      </Grid>
    );

    cards.push(
      <Grid item xs={12} sm={6} md={3} key='active-reservations'>
        <DashboardCard
          title={t('dashboard.activeReservations')}
          value={activeReservations}
          icon={<Event sx={{ color: 'white' }} />}
          color='#2196f3'
        />
      </Grid>
    );

    // Role-specific cards
    if (permissions.canManageParkings) {
      cards.push(
        <Grid item xs={12} sm={6} md={3} key='total-parkings'>
          <DashboardCard
            title={t('dashboard.totalParkings')}
            value={parkings.length}
            icon={<LocalParking sx={{ color: 'white' }} />}
            color='#ff9800'
          />
        </Grid>
      );
    }

    if (permissions.canManageUsers) {
      cards.push(
        <Grid item xs={12} sm={6} md={3} key='users'>
          <DashboardCard
            title={t('navigation.users')}
            value='25'
            icon={<People sx={{ color: 'white' }} />}
            color='#9c27b0'
          />
        </Grid>
      );
    }

    if (permissions.canManageCompanies) {
      cards.push(
        <Grid item xs={12} sm={6} md={3} key='companies'>
          <DashboardCard
            title={t('navigation.companies')}
            value='3'
            icon={<Business sx={{ color: 'white' }} />}
            color='#607d8b'
          />
        </Grid>
      );
    }

    if (permissions.canViewReports) {
      cards.push(
        <Grid item xs={12} sm={6} md={3} key='reports'>
          <DashboardCard
            title={t('navigation.reports')}
            value='12'
            icon={<Assessment sx={{ color: 'white' }} />}
            color='#795548'
          />
        </Grid>
      );
    }

    if (permissions.canManagePayments) {
      cards.push(
        <Grid item xs={12} sm={6} md={3} key='payments'>
          <DashboardCard
            title={t('dashboard.todayPayments')}
            value='$1,250'
            icon={<Payment sx={{ color: 'white' }} />}
            color='#4caf50'
          />
        </Grid>
      );
    }

    return cards;
  };

  const getRoleSpecificContent = () => {
    switch (user?.role) {
      case UserRole.ADMIN:
        return (
          <Alert severity='info' sx={dashboardPageStyles.alert}>
            <Typography variant='h6'>{t('dashboard.adminPanel')}</Typography>
            <Typography variant='body2'>
              {t('dashboard.adminDescription')}
            </Typography>
          </Alert>
        );

      case UserRole.MANAGER:
        return (
          <Alert severity='info' sx={dashboardPageStyles.alert}>
            <Typography variant='h6'>{t('dashboard.managerPanel')}</Typography>
            <Typography variant='body2'>
              {t('dashboard.managerDescription')}
            </Typography>
          </Alert>
        );

      case UserRole.VALET:
        return (
          <Alert severity='info' sx={dashboardPageStyles.alert}>
            <Typography variant='h6'>{t('dashboard.valetPanel')}</Typography>
            <Typography variant='body2'>
              {t('dashboard.valetDescription')}
            </Typography>
          </Alert>
        );

      case UserRole.EMPLOYEE:
        return (
          <Alert severity='info' sx={dashboardPageStyles.alert}>
            <Typography variant='h6'>{t('dashboard.employeePanel')}</Typography>
            <Typography variant='body2'>
              {t('dashboard.employeeDescription')}
            </Typography>
          </Alert>
        );

      case UserRole.CLIENT:
        return (
          <Alert severity='info' sx={dashboardPageStyles.alert}>
            <Typography variant='h6'>{t('dashboard.clientPanel')}</Typography>
            <Typography variant='body2'>
              {t('dashboard.clientDescription')}
            </Typography>
          </Alert>
        );

      default:
        return null;
    }
  };

  return (
    <Box sx={dashboardPageStyles.container}>
      <Typography variant='h4' gutterBottom sx={dashboardPageStyles.title}>
        {t('navigation.dashboard')}
      </Typography>
      <Typography variant='body1' color='textSecondary' gutterBottom>
        {t('dashboard.welcome')}, {user?.firstName} {user?.lastName}
      </Typography>

      {getRoleSpecificContent()}

      <Grid container spacing={3} sx={dashboardPageStyles.statsGrid}>
        {getRoleSpecificCards()}
      </Grid>

      <Grid container spacing={3} sx={dashboardPageStyles.contentGrid}>
        <Grid item xs={12} md={6}>
          <Paper sx={dashboardPageStyles.paper}>
            <Typography variant='h6' gutterBottom>
              {t('dashboard.recentReservations')}
            </Typography>
            <List>
              {reservations.slice(0, 5).map((reservation: any) => (
                <ListItem
                  key={reservation.id}
                  sx={dashboardPageStyles.listItem}
                >
                  <ListItemIcon>
                    <Event />
                  </ListItemIcon>
                  <ListItemText
                    primary={`${reservation.parking.name} - ${reservation.vehicle.licensePlate}`}
                    secondary={`${new Date(reservation.startTime).toLocaleDateString()} - ${reservation.status}`}
                  />
                  <Chip
                    label={reservation.status}
                    size='small'
                    color={
                      reservation.status === 'CONFIRMED' ? 'success' : 'default'
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={dashboardPageStyles.paper}>
            <Typography variant='h6' gutterBottom>
              {t('dashboard.recentEvents')}
            </Typography>
            <List>
              {recentEvents.map((event: any) => (
                <ListItem key={event.id} sx={dashboardPageStyles.listItem}>
                  <ListItemIcon>
                    {event.type === 'ENTRY' ? (
                      <TrendingUp color='success' />
                    ) : (
                      <TrendingDown color='error' />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={event.description}
                    secondary={new Date(event.timestamp).toLocaleString()}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
