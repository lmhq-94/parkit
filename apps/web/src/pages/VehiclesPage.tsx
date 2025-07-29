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
import { VehiclesPageStyles } from '@/styles/VehiclesPage.styles';

export default function VehiclesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const permissions = usePermissions();
  const { t } = useLanguage();

  // Mock data - in real app this would come from GraphQL
  const vehicles = [
    {
      id: '1',
      licensePlate: 'ABC-123',
      brand: t('vehicles.brands.toyota'),
      model: t('vehicles.models.corolla'),
      year: 2020,
      color: t('vehicles.colors.white'),
      vin: '1HGBH41JXMN109186',
      isActive: true,
      ownerName: 'Juan Pérez',
    },
    {
      id: '2',
      licensePlate: 'XYZ-789',
      brand: t('vehicles.brands.honda'),
      model: t('vehicles.models.civic'),
      year: 2019,
      color: t('vehicles.colors.black'),
      vin: '2T1BURHE0JC123456',
      isActive: true,
      ownerName: 'María García',
    },
    {
      id: '3',
      licensePlate: 'DEF-456',
      brand: t('vehicles.brands.ford'),
      model: t('vehicles.models.focus'),
      year: 2021,
      color: t('vehicles.colors.blue'),
      vin: '3VWDX7AJ5DM123456',
      isActive: false,
      ownerName: 'Carlos López',
    },
    {
      id: '4',
      licensePlate: 'GHI-789',
      brand: t('vehicles.brands.nissan'),
      model: t('vehicles.models.sentra'),
      year: 2018,
      color: t('vehicles.colors.gray'),
      vin: '4T1B11HK5KU123456',
      isActive: true,
      ownerName: 'Ana Rodríguez',
    },
  ];

  const getStatusLabel = (isActive: boolean) => {
    return isActive ? t('common.active') : t('common.inactive');
  };

  const getStatusColor = (isActive: boolean) => {
    return isActive ? 'success' : 'error';
  };

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch =
      vehicle.licensePlate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.ownerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterStatus === 'all' ||
      (filterStatus === 'active' && vehicle.isActive) ||
      (filterStatus === 'inactive' && !vehicle.isActive);
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: vehicles.length,
    active: vehicles.filter(v => v.isActive).length,
    inactive: vehicles.filter(v => !v.isActive).length,
  };

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    vehicleId: string
  ) => {
    setMenuAnchor(event.currentTarget);
    setSelectedVehicle(vehicleId);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedVehicle(null);
  };

  return (
    <ProtectedRoute requiredPermissions={p => p.canManageVehicles}>
      <Box sx={VehiclesPageStyles.container}>
        <Box sx={VehiclesPageStyles.header}>
          <Typography variant='h4' sx={VehiclesPageStyles.title}>
            {t('vehicles.title')}
          </Typography>
          <Button
            variant='contained'
            startIcon={<Add />}
            sx={VehiclesPageStyles.addButton}
          >
            {t('vehicles.addVehicle')}
          </Button>
        </Box>

        <Alert severity='info' sx={VehiclesPageStyles.alert}>
          <Typography variant='h6'>{t('vehicles.title')}</Typography>
          <Typography variant='body2'>{t('vehicles.title')}</Typography>
        </Alert>

        {/* Statistics Cards */}
        <Grid container spacing={3} sx={VehiclesPageStyles.statsGrid}>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={VehiclesPageStyles.statCard}>
              <CardContent>
                <Typography color='textSecondary' gutterBottom>
                  {t('common.total')} {t('vehicles.title')}
                </Typography>
                <Typography variant='h4'>{stats.total}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={VehiclesPageStyles.statCard}>
              <CardContent>
                <Typography color='textSecondary' gutterBottom>
                  {t('common.activePlural')}
                </Typography>
                <Typography variant='h4' color='success.main'>
                  {stats.active}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={VehiclesPageStyles.statCard}>
              <CardContent>
                <Typography color='textSecondary' gutterBottom>
                  {t('common.inactivePlural')}
                </Typography>
                <Typography variant='h4' color='error.main'>
                  {stats.inactive}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Search and Filters */}
        <Box sx={VehiclesPageStyles.searchSection}>
          <Grid container spacing={2} alignItems='center'>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder={t('vehicles.title')}
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
              <Box sx={VehiclesPageStyles.filterChips}>
                <Chip
                  label={`${t('common.total')} (${stats.total})`}
                  onClick={() => setFilterStatus('all')}
                  color={filterStatus === 'all' ? 'primary' : 'default'}
                  variant={filterStatus === 'all' ? 'filled' : 'outlined'}
                />
                <Chip
                  label={`${t('common.activePlural')} (${stats.active})`}
                  onClick={() => setFilterStatus('active')}
                  color={filterStatus === 'active' ? 'success' : 'default'}
                  variant={filterStatus === 'active' ? 'filled' : 'outlined'}
                />
                <Chip
                  label={`${t('common.inactivePlural')} (${stats.inactive})`}
                  onClick={() => setFilterStatus('inactive')}
                  color={filterStatus === 'inactive' ? 'error' : 'default'}
                  variant={filterStatus === 'inactive' ? 'filled' : 'outlined'}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Paper sx={VehiclesPageStyles.paper}>
          <TableContainer>
            <Table sx={VehiclesPageStyles.table}>
              <TableHead>
                <TableRow>
                  <TableCell>{t('vehicles.title')}</TableCell>
                  <TableCell>{t('common.owner')}</TableCell>
                  <TableCell>{t('common.details')}</TableCell>
                  <TableCell>{t('common.status')}</TableCell>
                  <TableCell align='right'>{t('common.actions')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredVehicles.map(vehicle => (
                  <TableRow key={vehicle.id}>
                    <TableCell>
                      <Box>
                        <Typography variant='subtitle1' fontWeight='bold'>
                          {vehicle.licensePlate}
                        </Typography>
                        <Typography variant='body2' color='textSecondary'>
                          {vehicle.brand} {vehicle.model} ({vehicle.year})
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body2'>
                        {vehicle.ownerName}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant='body2'>
                          {t('vehicles.color')}: {vehicle.color}
                        </Typography>
                        <Typography variant='body2' color='textSecondary'>
                          {t('vehicles.vin')}: {vehicle.vin}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={getStatusLabel(vehicle.isActive)}
                        color={getStatusColor(vehicle.isActive) as any}
                        size='small'
                      />
                    </TableCell>
                    <TableCell align='right'>
                      <IconButton
                        size='small'
                        onClick={e => handleMenuOpen(e, vehicle.id)}
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
          <MenuItem onClick={handleMenuClose}>
            {t('common.viewDetails')}
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            {t('common.edit')} {t('vehicles.title').toLowerCase()}
          </MenuItem>
          <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
            {t('common.delete')} {t('vehicles.title').toLowerCase()}
          </MenuItem>
        </Menu>
      </Box>
    </ProtectedRoute>
  );
}
