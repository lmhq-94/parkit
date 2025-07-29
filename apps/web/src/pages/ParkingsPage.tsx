import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute';
import { usePermissions } from '@/hooks/usePermissions';
import { Add, Delete, Edit, Search } from '@mui/icons-material';
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
import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext';;

export default function ParkingsPage() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const permissions = usePermissions();

  // Mock data - in real app this would come from GraphQL
  const parkings = [
    {
      id: '1',
      name: 'Piso 1 - A1',
      location: 'Piso 1',
      floor: '1',
      section: 'A',
      spotNumber: 'A1',
      hourlyRate: 5.00,
      dailyRate: 50.00,
      status: 'AVAILABLE',
      description: 'Espacio cubierto, cerca del ascensor',
    },
    {
      id: '2',
      name: 'Piso 1 - A2',
      location: 'Piso 1',
      floor: '1',
      section: 'A',
      spotNumber: 'A2',
      hourlyRate: 5.00,
      dailyRate: 50.00,
      status: 'OCCUPIED',
      description: 'Espacio cubierto, cerca del ascensor',
    },
    {
      id: '3',
      name: 'Piso 2 - B1',
      location: 'Piso 2',
      floor: '2',
      section: 'B',
      spotNumber: 'B1',
      hourlyRate: 4.50,
      dailyRate: 45.00,
      status: 'RESERVED',
      description: 'Espacio descubierto, vista panorámica',
    },
    {
      id: '4',
      name: 'Piso 2 - B2',
      location: 'Piso 2',
      floor: '2',
      section: 'B',
      spotNumber: 'B2',
      hourlyRate: 4.50,
      dailyRate: 45.00,
      status: 'MAINTENANCE',
      description: 'Espacio descubierto, en mantenimiento',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'AVAILABLE':
        return 'success';
      case 'OCCUPIED':
        return 'error';
      case 'RESERVED':
        return 'warning';
      case 'MAINTENANCE':
        return 'info';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'AVAILABLE':
        return t('common.available');
      case 'OCCUPIED':
        return t('common.occupied');
      case 'RESERVED':
        return t('common.reserved');
      case 'MAINTENANCE':
        return t('common.maintenance');
      default:
        return status;
    }
  };

  const filteredParkings = parkings.filter(parking => {
    const matchesSearch = parking.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         parking.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || parking.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: parkings.length,
    available: parkings.filter(p => p.status === 'AVAILABLE').length,
    occupied: parkings.filter(p => p.status === 'OCCUPIED').length,
    reserved: parkings.filter(p => p.status === 'RESERVED').length,
    maintenance: parkings.filter(p => p.status === 'MAINTENANCE').length,
  };

  return (
    <ProtectedRoute requiredPermissions={(p) => p.canManageParkings}>
      <Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4">Gestión de Parqueos</Typography>
          <Button variant="contained" startIcon={<Add />}>
            Agregar Parqueo
          </Button>
        </Box>

        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="h6">Panel de Gestión de Parqueos</Typography>
          <Typography variant="body2">
            Gestiona todos los espacios de parqueo disponibles en el sistema.
          </Typography>
        </Alert>

        {/* Statistics Cards */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Total Parqueos
                </Typography>
                <Typography variant="h4">{stats.total}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Disponibles
                </Typography>
                <Typography variant="h4" color="success.main">{stats.available}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Ocupados
                </Typography>
                <Typography variant="h4" color="error.main">{stats.occupied}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Reservados
                </Typography>
                <Typography variant="h4" color="warning.main">{stats.reserved}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Search and Filters */}
        <Box sx={{ mb: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder={t('parkings.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box display="flex" gap={1} flexWrap="wrap">
                <Chip
                  label={`Todos (${stats.total})`}
                  onClick={() => setFilterStatus('all')}
                  color={filterStatus === 'all' ? 'primary' : 'default'}
                  variant={filterStatus === 'all' ? 'filled' : 'outlined'}
                />
                <Chip
                  label={`Disponibles (${stats.available})`}
                  onClick={() => setFilterStatus('AVAILABLE')}
                  color={filterStatus === 'AVAILABLE' ? 'success' : 'default'}
                  variant={filterStatus === 'AVAILABLE' ? 'filled' : 'outlined'}
                />
                <Chip
                  label={`Ocupados (${stats.occupied})`}
                  onClick={() => setFilterStatus('OCCUPIED')}
                  color={filterStatus === 'OCCUPIED' ? 'error' : 'default'}
                  variant={filterStatus === 'OCCUPIED' ? 'filled' : 'outlined'}
                />
                <Chip
                  label={`Reservados (${stats.reserved})`}
                  onClick={() => setFilterStatus('RESERVED')}
                  color={filterStatus === 'RESERVED' ? 'warning' : 'default'}
                  variant={filterStatus === 'RESERVED' ? 'filled' : 'outlined'}
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
                  <TableCell>Parqueo</TableCell>
                  <TableCell>Ubicación</TableCell>
                  <TableCell>Tarifas</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell align="right">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredParkings.map((parking) => (
                  <TableRow key={parking.id}>
                    <TableCell>
                      <Box>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {parking.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {parking.description}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body2">
                          Piso {parking.floor} - Sección {parking.section}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Espacio {parking.spotNumber}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body2">
                          ${parking.hourlyRate}/hora
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          ${parking.dailyRate}/día
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={getStatusLabel(parking.status)}
                        color={getStatusColor(parking.status) as any}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton size="small" color="primary">
                        <Edit />
                      </IconButton>
                      <IconButton size="small" color="error">
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </ProtectedRoute>
  );
}
