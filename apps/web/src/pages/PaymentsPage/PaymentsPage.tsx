import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute';
import { usePermissions } from '@/hooks/usePermissions';
import { Add } from '@mui/icons-material';
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
import { useState } from 'react';

export default function PaymentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const permissions = usePermissions();

  // Mock data - in real app this would come from GraphQL
  const payments = [
    {
      id: '1',
      reservationId: 'RES-001',
      amount: 40.00,
      method: 'CREDIT_CARD',
      status: 'COMPLETED',
      date: '2024-01-15T10:30:00Z',
      userName: 'Juan Pérez',
    },
    {
      id: '2',
      reservationId: 'RES-002',
      amount: 25.00,
      method: 'CASH',
      status: 'PENDING',
      date: '2024-01-15T14:20:00Z',
      userName: 'María García',
    },
  ];

  const stats = {
    total: payments.length,
    completed: payments.filter(p => p.status === 'COMPLETED').length,
    pending: payments.filter(p => p.status === 'PENDING').length,
    totalAmount: payments.reduce((sum, p) => sum + p.amount, 0),
  };

  return (
    <ProtectedRoute requiredPermissions={(p) => p.canManagePayments}>
      <Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4">Gestión de Pagos</Typography>
          <Button variant="contained" startIcon={<Add />}>
            Nuevo Pago
          </Button>
        </Box>

        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="h6">Panel de Gestión de Pagos</Typography>
          <Typography variant="body2">
            Gestiona todos los pagos y transacciones del sistema.
          </Typography>
        </Alert>

        {/* Statistics Cards */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Total Pagos
                </Typography>
                <Typography variant="h4">{stats.total}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Completados
                </Typography>
                <Typography variant="h4" color="success.main">{stats.completed}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Pendientes
                </Typography>
                <Typography variant="h4" color="warning.main">{stats.pending}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Total Recaudado
                </Typography>
                <Typography variant="h4" color="primary.main">
                  ${stats.totalAmount.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Reserva</TableCell>
                  <TableCell>Usuario</TableCell>
                  <TableCell>Monto</TableCell>
                  <TableCell>Método</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell>Fecha</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {payments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>{payment.reservationId}</TableCell>
                    <TableCell>{payment.userName}</TableCell>
                    <TableCell>${payment.amount}</TableCell>
                    <TableCell>{payment.method}</TableCell>
                    <TableCell>
                      <Chip
                        label={payment.status}
                        color={payment.status === 'COMPLETED' ? 'success' : 'warning'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {new Date(payment.date).toLocaleDateString()}
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
