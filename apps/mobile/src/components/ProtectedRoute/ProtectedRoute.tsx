import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePermissions } from '@/hooks/usePermissions';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import { styles } from './ProtectedRoute.styles';

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
  const { t } = useLanguage();
  const { user, isAuthenticated, loading } = useAuth();
  const permissions = usePermissions();
  const navigation = useNavigation();

  // Show loading while checking authentication
  if (loading) {
    return (
      <View style={styles.container}>
        <Text>{t('common.loading')}</Text>
      </View>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    navigation.navigate('Login' as never);
    return null;
  }

  // Check role requirement
  if (requiredRole && user?.role !== requiredRole) {
    return (
      fallback || (
        <View style={styles.container}>
          <Card style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <Text style={styles.icon}>🚫</Text>
              <Text style={styles.title}>{t('errors.accessDenied')}</Text>
              <Text style={styles.message}>
                {t('errors.noPageAccess')}
                {'\n'}
                {t('errors.currentRole')}{' '}
                <Text style={styles.bold}>{user?.role}</Text>
              </Text>
              <Button
                mode='contained'
                onPress={() => navigation.navigate('Dashboard' as never)}
                style={styles.button}
              >
                {t('navigation.goToDashboard')}
              </Button>
            </Card.Content>
          </Card>
        </View>
      )
    );
  }

  // Check permissions requirement
  if (requiredPermissions && !requiredPermissions(permissions)) {
    return (
      fallback || (
        <View style={styles.container}>
          <Card style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <Text style={styles.icon}>🚫</Text>
              <Text style={styles.title}>
                {t('errors.insufficientPermissions')}
              </Text>
              <Text style={styles.message}>{t('errors.noFeatureAccess')}</Text>
              <Button
                mode='contained'
                onPress={() => navigation.navigate('Dashboard' as never)}
                style={styles.button}
              >
                {t('navigation.goToDashboard')}
              </Button>
            </Card.Content>
          </Card>
        </View>
      )
    );
  }

  return <>{children}</>;
}
