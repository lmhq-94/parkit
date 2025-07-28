import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute';
import { usePermissions } from '@/hooks/usePermissions';
import { Assessment, Download, TrendingDown, TrendingUp } from '@mui/icons-material';
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Grid,
    Paper,
    Typography,
} from '@mui/material';

export default function ReportsPage() {
  const permissions = usePermissions();

  const reports = [
    {
      id: '1',
      name: 'Reporte de Ocupación',
      description: 'Estadísticas de ocupación de parqueos por día/semana/mes',
      icon: <TrendingUp />,
      type: 'occupation',
    },
    {
      id: '2',
      name: 'Reporte de Ingresos',
      description: 'Análisis de ingresos y pagos procesados',
      icon: <TrendingDown />,
      type: 'revenue',
    },
    {
      id: '3',
      name: 'Reporte de Usuarios',
      description: 'Estadísticas de usuarios activos y nuevos registros',
      icon: <Assessment />,
      type: 'users',
    },
    {
      id: '4',
      name: 'Reporte de Eventos',
      description: 'Registro de entradas y salidas de vehículos',
      icon: <Assessment />,
      type: 'events',
    },
  ];

  return (
    <ProtectedRoute requiredPermissions={(p) => p.canViewReports}>
      <Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4">Reportes y Análisis</Typography>
          <Button variant="contained" startIcon={<Download />}>
            Exportar Todos
          </Button>
        </Box>

        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="h6">Panel de Reportes</Typography>
          <Typography variant="body2">
            Genera y visualiza reportes detallados del sistema de parqueos.
          </Typography>
        </Alert>

        <Grid container spacing={3}>
          {reports.map((report) => (
            <Grid item xs={12} sm={6} md={4} key={report.id}>
              <Card>
                <CardContent>
                  <Box display="flex" alignItems="center" mb={2}>
                    {report.icon}
                    <Typography variant="h6" ml={1}>
                      {report.name}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="textSecondary" mb={2}>
                    {report.description}
                  </Typography>
                  <Button
                    variant="outlined"
                    startIcon={<Download />}
                    fullWidth
                  >
                    Generar Reporte
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Paper sx={{ mt: 3, p: 3 }}>
          <Typography variant="h6" mb={2}>
            Reportes Rápidos
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Button variant="outlined" fullWidth>
                Hoy
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button variant="outlined" fullWidth>
                Esta Semana
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button variant="outlined" fullWidth>
                Este Mes
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button variant="outlined" fullWidth>
                Personalizado
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </ProtectedRoute>
  );
}
