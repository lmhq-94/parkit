import { useLanguage } from '@/contexts/LanguageContext';
import { usePermissions } from '@/hooks/usePermissions';
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import {
  Card,
  Chip,
  Divider,
  FAB,
  List,
  Paragraph,
  Searchbar,
  Text,
  Title,
} from 'react-native-paper';
import { styles } from './ParkingsScreen.styles';

export default function ParkingsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const permissions = usePermissions();
  const { t } = useLanguage();

  // Mock data - in real app this would come from GraphQL
  const parkings = [
    {
      id: '1',
      name: 'Piso 1 - A1',
      location: 'Piso 1',
      floor: '1',
      section: 'A',
      spotNumber: 'A1',
      hourlyRate: 5.0,
      dailyRate: 50.0,
      status: 'AVAILABLE',
      description: t('parkings.coveredSpaceNearElevator'),
    },
    {
      id: '2',
      name: 'Piso 1 - A2',
      location: 'Piso 1',
      floor: '1',
      section: 'A',
      spotNumber: 'A2',
      hourlyRate: 5.0,
      dailyRate: 50.0,
      status: 'OCCUPIED',
      description: t('parkings.coveredSpaceNearElevator'),
    },
    {
      id: '3',
      name: 'Piso 2 - B1',
      location: 'Piso 2',
      floor: '2',
      section: 'B',
      spotNumber: 'B1',
      hourlyRate: 4.5,
      dailyRate: 45.0,
      status: 'RESERVED',
      description: t('parkings.uncoveredSpacePanoramicView'),
    },
    {
      id: '4',
      name: 'Piso 2 - B2',
      location: 'Piso 2',
      floor: '2',
      section: 'B',
      spotNumber: 'B2',
      hourlyRate: 4.5,
      dailyRate: 45.0,
      status: 'MAINTENANCE',
      description: t('parkings.uncoveredSpaceUnderMaintenance'),
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'AVAILABLE':
        return 'success';
      case 'OCCUPIED':
        return 'error';
      case 'RESERVED':
        return 'warning';
      case 'MAINTENANCE':
        return 'info';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'AVAILABLE':
        return t('common.available');
      case 'OCCUPIED':
        return t('common.occupied');
      case 'RESERVED':
        return t('common.reserved');
      case 'MAINTENANCE':
        return t('common.maintenance');
      default:
        return status;
    }
  };

  const filteredParkings = parkings.filter(parking => {
    const matchesSearch =
      parking.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      parking.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterStatus === 'all' || parking.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: parkings.length,
    available: parkings.filter(p => p.status === 'AVAILABLE').length,
    occupied: parkings.filter(p => p.status === 'OCCUPIED').length,
    reserved: parkings.filter(p => p.status === 'RESERVED').length,
    maintenance: parkings.filter(p => p.status === 'MAINTENANCE').length,
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Search and Filters */}
        <Card style={styles.searchCard}>
          <Card.Content>
            <Searchbar
              placeholder={t('parkings.searchPlaceholder')}
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
                selected={filterStatus === 'AVAILABLE'}
                onPress={() => setFilterStatus('AVAILABLE')}
                style={styles.filterChip}
                mode='outlined'
              >
                {t('common.available')} ({stats.available})
              </Chip>
              <Chip
                selected={filterStatus === 'OCCUPIED'}
                onPress={() => setFilterStatus('OCCUPIED')}
                style={styles.filterChip}
                mode='outlined'
              >
                {t('common.occupied')} ({stats.occupied})
              </Chip>
              <Chip
                selected={filterStatus === 'RESERVED'}
                onPress={() => setFilterStatus('RESERVED')}
                style={styles.filterChip}
                mode='outlined'
              >
                {t('common.reserved')} ({stats.reserved})
              </Chip>
              <Chip
                selected={filterStatus === 'MAINTENANCE'}
                onPress={() => setFilterStatus('MAINTENANCE')}
                style={styles.filterChip}
                mode='outlined'
              >
                {t('common.maintenance')} ({stats.maintenance})
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
                {stats.available}
              </Title>
              <Paragraph>{t('common.available')}</Paragraph>
            </Card.Content>
          </Card>
          <Card style={styles.statCard}>
            <Card.Content>
              <Title style={[styles.statNumber, { color: '#f44336' }]}>
                {stats.occupied}
              </Title>
              <Paragraph>{t('common.occupied')}</Paragraph>
            </Card.Content>
          </Card>
        </View>

        {/* Parkings List */}
        <Card style={styles.listCard}>
          <Card.Content>
            <Title>{t('navigation.parkings')}</Title>
            {filteredParkings.map((parking, index) => (
              <React.Fragment key={parking.id}>
                <List.Item
                  title={parking.name}
                  description={parking.description}
                  left={props => <List.Icon {...props} icon='car' />}
                  right={() => (
                    <View style={styles.parkingRight}>
                      <Chip mode='outlined' compact style={styles.statusChip}>
                        {getStatusLabel(parking.status)}
                      </Chip>
                      <Text style={styles.priceText}>
                        ${parking.hourlyRate}/h
                      </Text>
                    </View>
                  )}
                  onPress={() => {
                    /* Navigate to parking details */
                  }}
                />
                {index < filteredParkings.length - 1 && <Divider />}
              </React.Fragment>
            ))}

            {filteredParkings.length === 0 && (
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>
                  {t('parkings.noResultsFound')}
                </Text>
              </View>
            )}
          </Card.Content>
        </Card>
      </ScrollView>

      {/* FAB for adding new parking (only for users with permissions) */}
      {permissions.canManageParkings && (
        <FAB
          icon='plus'
          style={styles.fab}
          onPress={() => {
            /* Navigate to add parking */
          }}
          label={t('parkings.addParking')}
        />
      )}
    </View>
  );
}
