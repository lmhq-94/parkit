import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePermissions } from '@/hooks/usePermissions';
import { Block, Home } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import { protectedRouteStyles } from './ProtectedRoute.styles';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermissions?: (permissions: any) => boolean;
  requiredRole?: string;
  fallback?: React.ReactNode;
}

export default function ProtectedRoute({
  children,
  requiredPermissions,
  requiredRole,
  fallback,
}: ProtectedRouteProps) {
  const { user, isAuthenticated, loading } = useAuth();
  const permissions = usePermissions();
  const { t } = useLanguage();
  const router = useRouter();

  // Show loading while checking authentication
  if (loading) {
    return (
      <Box sx={protectedRouteStyles.loadingContainer}>
        <Typography>{t('common.loading')}</Typography>
      </Box>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    router.push('/login');
    return null;
  }

  // Check role requirement
  if (requiredRole && user?.role !== requiredRole) {
    return (
      fallback || (
        <Box sx={protectedRouteStyles.errorContainer}>
          <Block sx={protectedRouteStyles.errorIcon} />
          <Typography variant='h5' gutterBottom>
            {t('errors.accessDenied')}
          </Typography>
          <Typography
            variant='body1'
            color='textSecondary'
            align='center'
            sx={protectedRouteStyles.errorMessage}
          >
            {t('errors.noPageAccess')}
            <br />
            {t('errors.currentRole')} <strong>{user?.role}</strong>
          </Typography>
          <Button
            variant='contained'
            startIcon={<Home />}
            onClick={() => router.push('/dashboard')}
          >
            {t('navigation.goToDashboard')}
          </Button>
        </Box>
      )
    );
  }

  // Check permissions requirement
  if (requiredPermissions && !requiredPermissions(permissions)) {
    return (
      fallback || (
        <Box sx={protectedRouteStyles.errorContainer}>
          <Block sx={protectedRouteStyles.errorIcon} />
          <Typography variant='h5' gutterBottom>
            {t('errors.insufficientPermissions')}
          </Typography>
          <Typography
            variant='body1'
            color='textSecondary'
            align='center'
            sx={protectedRouteStyles.errorMessage}
          >
            {t('errors.noFeatureAccess')}
          </Typography>
          <Button
            variant='contained'
            startIcon={<Home />}
            onClick={() => router.push('/dashboard')}
          >
            {t('navigation.goToDashboard')}
          </Button>
        </Box>
      )
    );
  }

  return <>{children}</>;
}
