import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePermissions } from '@/hooks/usePermissions';
import { UserRole } from '@parkit/shared';
import React from 'react';
import { ScrollView, View } from 'react-native';
import {
  Button,
  Card,
  Chip,
  Divider,
  List,
  Paragraph,
  Title,
} from 'react-native-paper';
import { dashboardStyles } from './DashboardScreen.styles';

export default function DashboardScreen() {
  const { user } = useAuth();
  const permissions = usePermissions();
  const { t } = useLanguage();

  // Mock data - in real app this would come from GraphQL
  const stats = {
    availableParkings: 15,
    activeReservations: 8,
    totalParkings: 25,
    recentEvents: 12,
  };

  const recentReservations = [
    {
      id: '1',
      parkingName: 'Piso 1 - A1',
      startTime: '2024-01-15T10:00:00Z',
      status: 'CONFIRMED',
    },
    {
      id: '2',
      parkingName: 'Piso 2 - B3',
      startTime: '2024-01-15T14:00:00Z',
      status: 'PENDING',
    },
  ];

  const getRoleSpecificContent = () => {
    switch (user?.role) {
      case UserRole.ADMIN:
        return (
          <Card style={dashboardStyles.alertCard}>
            <Card.Content>
              <Title>{t('dashboard.adminPanel')}</Title>
              <Paragraph>{t('dashboard.adminDescription')}</Paragraph>
            </Card.Content>
          </Card>
        );

      case UserRole.MANAGER:
        return (
          <Card style={dashboardStyles.alertCard}>
            <Card.Content>
              <Title>{t('dashboard.managerPanel')}</Title>
              <Paragraph>{t('dashboard.managerDescription')}</Paragraph>
            </Card.Content>
          </Card>
        );

      case UserRole.VALET:
        return (
          <Card style={dashboardStyles.alertCard}>
            <Card.Content>
              <Title>{t('dashboard.valetPanel')}</Title>
              <Paragraph>{t('dashboard.valetDescription')}</Paragraph>
            </Card.Content>
          </Card>
        );

      case UserRole.EMPLOYEE:
        return (
          <Card style={dashboardStyles.alertCard}>
            <Card.Content>
              <Title>{t('dashboard.employeePanel')}</Title>
              <Paragraph>{t('dashboard.employeeDescription')}</Paragraph>
            </Card.Content>
          </Card>
        );

      case UserRole.CLIENT:
        return (
          <Card style={dashboardStyles.alertCard}>
            <Card.Content>
              <Title>{t('dashboard.clientPanel')}</Title>
              <Paragraph>{t('dashboard.clientDescription')}</Paragraph>
            </Card.Content>
          </Card>
        );

      default:
        return null;
    }
  };

  const getRoleSpecificCards = () => {
    const cards = [];

    // Common cards for all roles
    cards.push(
      <Card key='available-parkings' style={dashboardStyles.statCard}>
        <Card.Content>
          <Title style={dashboardStyles.statNumber}>
            {stats.availableParkings}
          </Title>
          <Paragraph>{t('dashboard.availableParkings')}</Paragraph>
        </Card.Content>
      </Card>
    );

    cards.push(
      <Card key='active-reservations' style={dashboardStyles.statCard}>
        <Card.Content>
          <Title style={dashboardStyles.statNumber}>
            {stats.activeReservations}
          </Title>
          <Paragraph>{t('dashboard.activeReservations')}</Paragraph>
        </Card.Content>
      </Card>
    );

    // Role-specific cards
    if (permissions.canManageParkings) {
      cards.push(
        <Card key='total-parkings' style={dashboardStyles.statCard}>
          <Card.Content>
            <Title style={dashboardStyles.statNumber}>
              {stats.totalParkings}
            </Title>
            <Paragraph>{t('dashboard.totalParkings')}</Paragraph>
          </Card.Content>
        </Card>
      );
    }

    if (permissions.canManageUsers) {
      cards.push(
        <Card key='users' style={dashboardStyles.statCard}>
          <Card.Content>
            <Title style={dashboardStyles.statNumber}>25</Title>
            <Paragraph>{t('navigation.users')}</Paragraph>
          </Card.Content>
        </Card>
      );
    }

    if (permissions.canManageCompanies) {
      cards.push(
        <Card key='companies' style={dashboardStyles.statCard}>
          <Card.Content>
            <Title style={dashboardStyles.statNumber}>3</Title>
            <Paragraph>{t('navigation.companies')}</Paragraph>
          </Card.Content>
        </Card>
      );
    }

    if (permissions.canViewReports) {
      cards.push(
        <Card key='reports' style={dashboardStyles.statCard}>
          <Card.Content>
            <Title style={dashboardStyles.statNumber}>12</Title>
            <Paragraph>{t('navigation.reports')}</Paragraph>
          </Card.Content>
        </Card>
      );
    }

    if (permissions.canManagePayments) {
      cards.push(
        <Card key='payments' style={dashboardStyles.statCard}>
          <Card.Content>
            <Title style={dashboardStyles.statNumber}>$1,250</Title>
            <Paragraph>{t('dashboard.todayPayments')}</Paragraph>
          </Card.Content>
        </Card>
      );
    }

    return cards;
  };

  return (
    <ScrollView style={dashboardStyles.container}>
      <View style={dashboardStyles.header}>
        <Title style={dashboardStyles.welcomeTitle}>
          {t('dashboard.welcome')}, {user?.firstName} {user?.lastName}
        </Title>
        <Chip mode='outlined' style={dashboardStyles.roleChip}>
          {user?.role}
        </Chip>
      </View>

      {getRoleSpecificContent()}

      <View style={dashboardStyles.statsGrid}>{getRoleSpecificCards()}</View>

      <Card style={dashboardStyles.sectionCard}>
        <Card.Content>
          <Title>{t('dashboard.recentReservations')}</Title>
          {recentReservations.map((reservation, index) => (
            <React.Fragment key={reservation.id}>
              <List.Item
                title={reservation.parkingName}
                description={new Date(
                  reservation.startTime
                ).toLocaleDateString()}
                right={() => (
                  <Chip
                    mode='outlined'
                    compact
                    style={[
                      dashboardStyles.statusChip,
                      reservation.status === 'CONFIRMED' &&
                        dashboardStyles.confirmedChip,
                    ]}
                  >
                    {reservation.status}
                  </Chip>
                )}
              />
              {index < recentReservations.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </Card.Content>
      </Card>

      <View style={dashboardStyles.actionsContainer}>
        {permissions.canScanQR && (
          <Button
            mode='contained'
            icon='qrcode-scan'
            style={dashboardStyles.actionButton}
            onPress={() => {
              /* Navigate to QR Scanner */
            }}
          >
            {t('navigation.qrScanner')}
          </Button>
        )}

        {permissions.canCreateReservations && (
          <Button
            mode='outlined'
            icon='plus'
            style={dashboardStyles.actionButton}
            onPress={() => {
              /* Navigate to Create Reservation */
            }}
          >
            {t('dashboard.newReservation')}
          </Button>
        )}

        <Button
          mode='outlined'
          icon='cog'
          style={dashboardStyles.actionButton}
          onPress={() => {
            /* Navigate to Settings */
          }}
        >
          {t('navigation.settings')}
        </Button>
      </View>
    </ScrollView>
  );
}
