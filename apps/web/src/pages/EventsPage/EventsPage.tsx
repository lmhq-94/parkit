import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute';
import { usePermissions } from '@/hooks/usePermissions';
import { QrCode } from '@mui/icons-material';
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import { EventType } from '@parkit/shared';

export default function EventsPage() {
  const { t } = useLanguage();
  const permissions = usePermissions();

  // Mock data - in real app this would come from GraphQL
  const events = [
    {
      id: '1',
      type: EventType.ENTRY,
      vehiclePlate: 'ABC-123',
      parkingName: 'Piso 1 - A1',
      timestamp: '2024-01-15T10:30:00Z',
      userName: 'Juan Pérez',
    },
    {
      id: '2',
      type: EventType.EXIT,
      vehiclePlate: 'XYZ-789',
      parkingName: 'Piso 2 - B3',
      timestamp: '2024-01-15T09:15:00Z',
      userName: 'María García',
    },
  ];

  const stats = {
    total: events.length,
    entries: events.filter(e => e.type === EventType.ENTRY).length,
    exits: events.filter(e => e.type === EventType.EXIT).length,
  };

  const getEventTypeLabel = (type: EventType) => {
    switch (type) {
      case EventType.ENTRY:
        return {t('events.entry')};
      case EventType.EXIT:
        return {t('events.exit')};
      default:
        return type;
    }
  };

  const getEventTypeColor = (type: EventType) => {
    switch (type) {
      case EventType.ENTRY:
        return 'success';
      case EventType.EXIT:
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <ProtectedRoute requiredPermissions={(p) => p.canManageEvents}>
      <Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4">Gestión de Eventos</Typography>
          <Button variant="contained" startIcon={<QrCode />}>
            Escanear QR
          </Button>
        </Box>

        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="h6">Panel de Gestión de Eventos</Typography>
          <Typography variant="body2">
            Registra y gestiona entradas y salidas de vehículos.
          </Typography>
        </Alert>

        {/* Statistics Cards */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Total Eventos
                </Typography>
                <Typography variant="h4">{stats.total}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Entradas
                </Typography>
                <Typography variant="h4" color="success.main">{stats.entries}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Salidas
                </Typography>
                <Typography variant="h4" color="error.main">{stats.exits}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Tipo</TableCell>
                  <TableCell>Vehículo</TableCell>
                  <TableCell>Parqueo</TableCell>
                  <TableCell>Usuario</TableCell>
                  <TableCell>Fecha/Hora</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {events.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell>
                      <Chip
                        label={getEventTypeLabel(event.type)}
                        color={getEventTypeColor(event.type) as any}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{event.vehiclePlate}</TableCell>
                    <TableCell>{event.parkingName}</TableCell>
                    <TableCell>{event.userName}</TableCell>
                    <TableCell>
                      {new Date(event.timestamp).toLocaleString()}
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
