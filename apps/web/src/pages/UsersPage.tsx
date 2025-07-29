import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute';
import { useLanguage } from '@/contexts/LanguageContext';
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
import { UserRole } from '@parkit/shared';
import { UsersPageStyles } from '@/styles/UsersPage.styles';

export default function UsersPage() {
  const permissions = usePermissions();
  const { t } = useLanguage();

  // Mock data - in real app this would come from GraphQL
  const users = [
    {
      id: '1',
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@techcorp.com',
      role: UserRole.ADMIN,
      isActive: true,
    },
    {
      id: '2',
      firstName: 'Manager',
      lastName: 'User',
      email: 'manager@techcorp.com',
      role: UserRole.MANAGER,
      isActive: true,
    },
    {
      id: '3',
      firstName: 'Valet',
      lastName: 'User',
      email: 'valet@techcorp.com',
      role: UserRole.VALET,
      isActive: true,
    },
  ];

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

  return (
    <ProtectedRoute requiredPermissions={p => p.canManageUsers}>
      <Box sx={UsersPageStyles.container}>
        <Box sx={UsersPageStyles.header}>
          <Typography variant='h4' sx={UsersPageStyles.title}>
            {t('users.title')}
          </Typography>
          <Button
            variant='contained'
            startIcon={<Add />}
            sx={UsersPageStyles.addButton}
          >
            {t('users.addUser')}
          </Button>
        </Box>

        <Alert severity='info' sx={UsersPageStyles.alert}>
          <Typography variant='h6'>{t('users.userManagement')}</Typography>
          <Typography variant='body2'>
            {t('users.userManagementDescription')}
          </Typography>
        </Alert>

        <Paper sx={UsersPageStyles.paper}>
          <TableContainer>
            <Table sx={UsersPageStyles.table}>
              <TableHead>
                <TableRow>
                  <TableCell>{t('common.name')}</TableCell>
                  <TableCell>{t('common.email')}</TableCell>
                  <TableCell>{t('users.role')}</TableCell>
                  <TableCell>{t('common.status')}</TableCell>
                  <TableCell align='right'>{t('common.actions')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map(user => (
                  <TableRow key={user.id}>
                    <TableCell>
                      {user.firstName} {user.lastName}
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Chip
                        label={getRoleLabel(user.role)}
                        color={getRoleColor(user.role)}
                        size='small'
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={
                          user.isActive
                            ? t('common.active')
                            : t('common.inactive')
                        }
                        color={user.isActive ? 'success' : 'default'}
                        size='small'
                      />
                    </TableCell>
                    <TableCell align='right'>
                      <IconButton
                        size='small'
                        color='primary'
                        sx={UsersPageStyles.actionButton}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        size='small'
                        color='error'
                        sx={UsersPageStyles.actionButton}
                      >
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
