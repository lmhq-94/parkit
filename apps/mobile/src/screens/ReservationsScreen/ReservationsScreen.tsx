import { useLanguage } from '@/contexts/LanguageContext';
import { usePermissions } from '@/hooks/usePermissions';
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import {
  Button,
  Card,
  Chip,
  Divider,
  FAB,
  List,
  Menu,
  Paragraph,
  Searchbar,
  Text,
  Title,
} from 'react-native-paper';
import { styles } from './ReservationsScreen.styles';

export default function ReservationsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [menuVisible, setMenuVisible] = useState<string | null>(null);
  const permissions = usePermissions();
  const { t } = useLanguage();

  // Mock data - in real app this would come from GraphQL
  const reservations = [
    {
      id: '1',
      parkingName: 'Piso 1 - A1',
      vehiclePlate: 'ABC-123',
      startTime: '2024-01-15T10:00:00Z',
      endTime: '2024-01-15T18:00:00Z',
      status: 'CONFIRMED',
      amount: 40.0,
      userName: 'Juan Pérez',
    },
    {
      id: '2',
      parkingName: 'Piso 2 - B3',
      vehiclePlate: 'XYZ-789',
      startTime: '2024-01-15T14:00:00Z',
      endTime: '2024-01-15T16:00:00Z',
      status: 'PENDING',
      amount: 10.0,
      userName: 'María García',
    },
    {
      id: '3',
      parkingName: 'Piso 1 - A2',
      vehiclePlate: 'DEF-456',
      startTime: '2024-01-16T09:00:00Z',
      endTime: '2024-01-16T17:00:00Z',
      status: 'CANCELLED',
      amount: 40.0,
      userName: 'Carlos López',
    },
    {
      id: '4',
      parkingName: 'Piso 2 - B1',
      vehiclePlate: 'GHI-789',
      startTime: '2024-01-15T08:00:00Z',
      endTime: '2024-01-15T12:00:00Z',
      status: 'COMPLETED',
      amount: 20.0,
      userName: 'Ana Rodríguez',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return 'success';
      case 'PENDING':
        return 'warning';
      case 'CANCELLED':
        return 'error';
      case 'COMPLETED':
        return 'info';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return t('common.confirmed');
      case 'PENDING':
        return t('common.pending');
      case 'CANCELLED':
        return t('common.cancelled');
      case 'COMPLETED':
        return t('common.completed');
      default:
        return status;
    }
  };

  const filteredReservations = reservations.filter(reservation => {
    const matchesSearch =
      reservation.parkingName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      reservation.vehiclePlate
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      reservation.userName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterStatus === 'all' || reservation.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: reservations.length,
    confirmed: reservations.filter(r => r.status === 'CONFIRMED').length,
    pending: reservations.filter(r => r.status === 'PENDING').length,
    cancelled: reservations.filter(r => r.status === 'CANCELLED').length,
    completed: reservations.filter(r => r.status === 'COMPLETED').length,
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleMenuOpen = (id: string) => setMenuVisible(id);
  const handleMenuClose = () => setMenuVisible(null);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Search and Filters */}
        <Card style={styles.searchCard}>
          <Card.Content>
            <Searchbar
              placeholder={t('reservations.searchPlaceholder')}
              onChangeText={setSearchQuery}
              value={searchQuery}
              style={styles.searchbar}
            />

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.filtersContainer}
            >
              <Chip
                selected={filterStatus === 'all'}
                onPress={() => setFilterStatus('all')}
                style={styles.filterChip}
              >
                {t('common.all')} ({stats.total})
              </Chip>
              <Chip
                selected={filterStatus === 'CONFIRMED'}
                onPress={() => setFilterStatus('CONFIRMED')}
                style={styles.filterChip}
                mode='outlined'
              >
                {t('common.confirmed')} ({stats.confirmed})
              </Chip>
              <Chip
                selected={filterStatus === 'PENDING'}
                onPress={() => setFilterStatus('PENDING')}
                style={styles.filterChip}
                mode='outlined'
              >
                {t('common.pending')} ({stats.pending})
              </Chip>
              <Chip
                selected={filterStatus === 'CANCELLED'}
                onPress={() => setFilterStatus('CANCELLED')}
                style={styles.filterChip}
                mode='outlined'
              >
                {t('common.cancelled')} ({stats.cancelled})
              </Chip>
              <Chip
                selected={filterStatus === 'COMPLETED'}
                onPress={() => setFilterStatus('COMPLETED')}
                style={styles.filterChip}
                mode='outlined'
              >
                {t('common.completed')} ({stats.completed})
              </Chip>
            </ScrollView>
          </Card.Content>
        </Card>

        {/* Statistics */}
        <View style={styles.statsContainer}>
          <Card style={styles.statCard}>
            <Card.Content>
              <Title style={styles.statNumber}>{stats.total}</Title>
              <Paragraph>{t('common.total')}</Paragraph>
            </Card.Content>
          </Card>
          <Card style={styles.statCard}>
            <Card.Content>
              <Title style={[styles.statNumber, { color: '#4caf50' }]}>
                {stats.confirmed}
              </Title>
              <Paragraph>{t('common.confirmed')}</Paragraph>
            </Card.Content>
          </Card>
          <Card style={styles.statCard}>
            <Card.Content>
              <Title style={[styles.statNumber, { color: '#ff9800' }]}>
                {stats.pending}
              </Title>
              <Paragraph>{t('common.pending')}</Paragraph>
            </Card.Content>
          </Card>
        </View>

        {/* Reservations List */}
        <Card style={styles.listCard}>
          <Card.Content>
            <Title>{t('navigation.reservations')}</Title>
            {filteredReservations.map((reservation, index) => (
              <React.Fragment key={reservation.id}>
                <List.Item
                  title={reservation.parkingName}
                  description={`${reservation.vehiclePlate} • ${reservation.userName}`}
                  left={props => <List.Icon {...props} icon='calendar-clock' />}
                  right={() => (
                    <View style={styles.reservationRight}>
                      <Chip mode='outlined' compact style={styles.statusChip}>
                        {getStatusLabel(reservation.status)}
                      </Chip>
                      <Text style={styles.amountText}>
                        ${reservation.amount}
                      </Text>
                      <Menu
                        visible={menuVisible === reservation.id}
                        onDismiss={handleMenuClose}
                        anchor={
                          <Button
                            icon='dots-vertical'
                            onPress={() => handleMenuOpen(reservation.id)}
                            mode='text'
                            compact
                          >
                            {' '}
                          </Button>
                        }
                      >
                        <Menu.Item
                          onPress={() => {
                            handleMenuClose();
                            /* Navigate to reservation details */
                          }}
                          title={t('common.viewDetails')}
                          leadingIcon='eye'
                        />
                        {permissions.canCancelReservations &&
                          reservation.status === 'CONFIRMED' && (
                            <Menu.Item
                              onPress={() => {
                                handleMenuClose();
                                /* Cancel reservation */
                              }}
                              title={t('common.cancel')}
                              leadingIcon='close'
                            />
                          )}
                        {permissions.canManageReservations && (
                          <Menu.Item
                            onPress={() => {
                              handleMenuClose();
                              /* Edit reservation */
                            }}
                            title={t('common.edit')}
                            leadingIcon='pencil'
                          />
                        )}
                      </Menu>
                    </View>
                  )}
                  onPress={() => {
                    /* Navigate to reservation details */
                  }}
                />
                <View style={styles.reservationDetails}>
                  <Text style={styles.detailText}>
                    <Text style={styles.detailLabel}>
                      {t('reservations.startTime')}
                    </Text>{' '}
                    {formatDateTime(reservation.startTime)}
                  </Text>
                  <Text style={styles.detailText}>
                    <Text style={styles.detailLabel}>
                      {t('reservations.endTime')}
                    </Text>{' '}
                    {formatDateTime(reservation.endTime)}
                  </Text>
                </View>
                {index < filteredReservations.length - 1 && <Divider />}
              </React.Fragment>
            ))}

            {filteredReservations.length === 0 && (
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>
                  {t('reservations.noResultsFound')}
                </Text>
              </View>
            )}
          </Card.Content>
        </Card>
      </ScrollView>

      {/* FAB for adding new reservation (only for users with permissions) */}
      {permissions.canCreateReservations && (
        <FAB
          icon='plus'
          style={styles.fab}
          onPress={() => {
            /* Navigate to create reservation */
          }}
          label={t('reservations.newReservation')}
        />
      )}
    </View>
  );
}
