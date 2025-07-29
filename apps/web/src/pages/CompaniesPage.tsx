import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute';
import { usePermissions } from '@/hooks/usePermissions';
import { Add, Delete, Edit } from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  Chip,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

export default function CompaniesPage() {
  const permissions = usePermissions();

  // Mock data - in real app this would come from GraphQL
  const companies = [
    {
      id: '1',
      name: 'TechCorp Solutions',
      address: 'Calle Principal 123, Ciudad',
      phone: '+1 234 567 8900',
      email: 'contact@techcorp.com',
      isActive: true,
      userCount: 15,
      parkingCount: 25,
    },
    {
      id: '2',
      name: 'Innovate Labs',
      address: 'Avenida Central 456, Ciudad',
      phone: '+1 234 567 8901',
      email: 'info@innovatelabs.com',
      isActive: true,
      userCount: 8,
      parkingCount: 12,
    },
    {
      id: '3',
      name: 'Startup Ventures',
      address: 'Plaza Mayor 789, Ciudad',
      phone: '+1 234 567 8902',
      email: 'hello@startupventures.com',
      isActive: false,
      userCount: 3,
      parkingCount: 5,
    },
  ];

  return (
    <ProtectedRoute requiredPermissions={p => p.canManageCompanies}>
      <Box>
        <Box
          display='flex'
          justifyContent='space-between'
          alignItems='center'
          mb={3}
        >
          <Typography variant='h4'>Gestión de Empresas</Typography>
          <Button variant='contained' startIcon={<Add />}>
            Agregar Empresa
          </Button>
        </Box>

        <Alert severity='info' sx={{ mb: 3 }}>
          <Typography variant='h6'>
            Panel de Administración de Empresas
          </Typography>
          <Typography variant='body2'>
            Gestiona todas las empresas registradas en el sistema y sus
            configuraciones.
          </Typography>
        </Alert>

        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Contacto</TableCell>
                  <TableCell>Usuarios</TableCell>
                  <TableCell>Parqueos</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell align='right'>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {companies.map(company => (
                  <TableRow key={company.id}>
                    <TableCell>
                      <Box>
                        <Typography variant='subtitle1' fontWeight='bold'>
                          {company.name}
                        </Typography>
                        <Typography variant='body2' color='textSecondary'>
                          {company.address}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant='body2'>{company.phone}</Typography>
                        <Typography variant='body2' color='textSecondary'>
                          {company.email}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip label={company.userCount} size='small' />
                    </TableCell>
                    <TableCell>
                      <Chip label={company.parkingCount} size='small' />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={company.isActive ? 'Activa' : 'Inactiva'}
                        color={company.isActive ? 'success' : 'default'}
                        size='small'
                      />
                    </TableCell>
                    <TableCell align='right'>
                      <IconButton size='small' color='primary'>
                        <Edit />
                      </IconButton>
                      <IconButton size='small' color='error'>
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
