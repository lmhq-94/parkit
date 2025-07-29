import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePermissions } from '@/hooks/usePermissions';
import { Add, MoreVert, Search } from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';

export default function ReservationsPage() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedReservation, setSelectedReservation] = useState<string | null>(
    null
  );
  const permissions = usePermissions();

  // Mock data - in real app this would come from GraphQL
  const reservations = [
    {
      id: '1',
      parkingName: 'Piso 1 - A1',
      vehiclePlate: 'ABC-123',
      startTime: '2024-01-15T10:00:00Z',
      endTime: '2024-01-15T18:00:00Z',
      status: 'CONFIRMED',
      amount: 40.0,
      userName: 'Juan Pérez',
    },
    {
      id: '2',
      parkingName: 'Piso 2 - B3',
      vehiclePlate: 'XYZ-789',
      startTime: '2024-01-15T14:00:00Z',
      endTime: '2024-01-15T16:00:00Z',
      status: 'PENDING',
      amount: 10.0,
      userName: 'María García',
    },
    {
      id: '3',
      parkingName: 'Piso 1 - A2',
      vehiclePlate: 'DEF-456',
      startTime: '2024-01-16T09:00:00Z',
      endTime: '2024-01-16T17:00:00Z',
      status: 'CANCELLED',
      amount: 40.0,
      userName: 'Carlos López',
    },
    {
      id: '4',
      parkingName: 'Piso 2 - B1',
      vehiclePlate: 'GHI-789',
      startTime: '2024-01-15T08:00:00Z',
      endTime: '2024-01-15T12:00:00Z',
      status: 'COMPLETED',
      amount: 20.0,
      userName: 'Ana Rodríguez',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return 'success';
      case 'PENDING':
        return 'warning';
      case 'CANCELLED':
        return 'error';
      case 'COMPLETED':
        return 'info';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return t('common.confirmed');
      case 'PENDING':
        return t('common.pending');
      case 'CANCELLED':
        return t('common.cancelled');
      case 'COMPLETED':
        return t('common.completed');
      default:
        return status;
    }
  };

  const filteredReservations = reservations.filter(reservation => {
    const matchesSearch =
      reservation.parkingName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      reservation.vehiclePlate
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      reservation.userName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterStatus === 'all' || reservation.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: reservations.length,
    confirmed: reservations.filter(r => r.status === 'CONFIRMED').length,
    pending: reservations.filter(r => r.status === 'PENDING').length,
    cancelled: reservations.filter(r => r.status === 'CANCELLED').length,
    completed: reservations.filter(r => r.status === 'COMPLETED').length,
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    reservationId: string
  ) => {
    setMenuAnchor(event.currentTarget);
    setSelectedReservation(reservationId);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedReservation(null);
  };

  return (
    <ProtectedRoute
      requiredPermissions={p =>
        p.canManageReservations || p.canViewOwnReservations
      }
    >
      <Box>
        <Box
          display='flex'
          justifyContent='space-between'
          alignItems='center'
          mb={3}
        >
          <Typography variant='h4'>Gestión de Reservas</Typography>
          {permissions.canCreateReservations && (
            <Button variant='contained' startIcon={<Add />}>
              Nueva Reserva
            </Button>
          )}
        </Box>

        <Alert severity='info' sx={{ mb: 3 }}>
          <Typography variant='h6'>Panel de Gestión de Reservas</Typography>
          <Typography variant='body2'>
            Gestiona todas las reservas de parqueo en el sistema.
          </Typography>
        </Alert>

        {/* Statistics Cards */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color='textSecondary' gutterBottom>
                  Total Reservas
                </Typography>
                <Typography variant='h4'>{stats.total}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color='textSecondary' gutterBottom>
                  Confirmadas
                </Typography>
                <Typography variant='h4' color='success.main'>
                  {stats.confirmed}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color='textSecondary' gutterBottom>
                  Pendientes
                </Typography>
                <Typography variant='h4' color='warning.main'>
                  {stats.pending}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color='textSecondary' gutterBottom>
                  Canceladas
                </Typography>
                <Typography variant='h4' color='error.main'>
                  {stats.cancelled}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Search and Filters */}
        <Box sx={{ mb: 3 }}>
          <Grid container spacing={2} alignItems='center'>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder={t('reservations.searchPlaceholder')}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box display='flex' gap={1} flexWrap='wrap'>
                <Chip
                  label={`Todas (${stats.total})`}
                  onClick={() => setFilterStatus('all')}
                  color={filterStatus === 'all' ? 'primary' : 'default'}
                  variant={filterStatus === 'all' ? 'filled' : 'outlined'}
                />
                <Chip
                  label={`Confirmadas (${stats.confirmed})`}
                  onClick={() => setFilterStatus('CONFIRMED')}
                  color={filterStatus === 'CONFIRMED' ? 'success' : 'default'}
                  variant={filterStatus === 'CONFIRMED' ? 'filled' : 'outlined'}
                />
                <Chip
                  label={`Pendientes (${stats.pending})`}
                  onClick={() => setFilterStatus('PENDING')}
                  color={filterStatus === 'PENDING' ? 'warning' : 'default'}
                  variant={filterStatus === 'PENDING' ? 'filled' : 'outlined'}
                />
                <Chip
                  label={`Canceladas (${stats.cancelled})`}
                  onClick={() => setFilterStatus('CANCELLED')}
                  color={filterStatus === 'CANCELLED' ? 'error' : 'default'}
                  variant={filterStatus === 'CANCELLED' ? 'filled' : 'outlined'}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Reserva</TableCell>
                  <TableCell>Vehículo</TableCell>
                  <TableCell>Horario</TableCell>
                  <TableCell>Monto</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell align='right'>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredReservations.map(reservation => (
                  <TableRow key={reservation.id}>
                    <TableCell>
                      <Box>
                        <Typography variant='subtitle1' fontWeight='bold'>
                          {reservation.parkingName}
                        </Typography>
                        <Typography variant='body2' color='textSecondary'>
                          {reservation.userName}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body2'>
                        {reservation.vehiclePlate}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant='body2'>
                          Inicio: {formatDateTime(reservation.startTime)}
                        </Typography>
                        <Typography variant='body2' color='textSecondary'>
                          Fin: {formatDateTime(reservation.endTime)}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body2' fontWeight='bold'>
                        ${reservation.amount}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={getStatusLabel(reservation.status)}
                        color={getStatusColor(reservation.status) as any}
                        size='small'
                      />
                    </TableCell>
                    <TableCell align='right'>
                      <IconButton
                        size='small'
                        onClick={e => handleMenuOpen(e, reservation.id)}
                      >
                        <MoreVert />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Context Menu */}
        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>Ver detalles</MenuItem>
          {permissions.canCancelReservations && (
            <MenuItem onClick={handleMenuClose}>Cancelar reserva</MenuItem>
          )}
          {permissions.canManageReservations && (
            <MenuItem onClick={handleMenuClose}>Editar reserva</MenuItem>
          )}
        </Menu>
      </Box>
    </ProtectedRoute>
  );
}
