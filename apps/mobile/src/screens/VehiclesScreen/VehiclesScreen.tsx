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
import { styles } from './VehiclesScreen.styles';

export default function VehiclesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [menuVisible, setMenuVisible] = useState<string | null>(null);
  const permissions = usePermissions();
  const { t } = useLanguage();

  // Mock data - in real app this would come from GraphQL
  const vehicles = [
    {
      id: '1',
      licensePlate: 'ABC-123',
      brand: t('vehicles.brands.toyota'),
      model: t('vehicles.models.corolla'),
      year: 2020,
      color: t('vehicles.colors.white'),
      vin: '1HGBH41JXMN109186',
      isActive: true,
      ownerName: t('vehicles.owners.juanPerez'),
    },
    {
      id: '2',
      licensePlate: 'XYZ-789',
      brand: t('vehicles.brands.honda'),
      model: t('vehicles.models.civic'),
      year: 2019,
      color: t('vehicles.colors.black'),
      vin: '2T1BURHE0JC123456',
      isActive: true,
      ownerName: t('vehicles.owners.mariaGarcia'),
    },
    {
      id: '3',
      licensePlate: 'DEF-456',
      brand: t('vehicles.brands.ford'),
      model: t('vehicles.models.focus'),
      year: 2021,
      color: t('vehicles.colors.blue'),
      vin: '3VWDX7AJ5DM123456',
      isActive: false,
      ownerName: t('vehicles.owners.carlosLopez'),
    },
    {
      id: '4',
      licensePlate: 'GHI-789',
      brand: t('vehicles.brands.nissan'),
      model: t('vehicles.models.sentra'),
      year: 2018,
      color: t('vehicles.colors.gray'),
      vin: '4T1B11HK5KU123456',
      isActive: true,
      ownerName: t('vehicles.owners.anaRodriguez'),
    },
  ];

  const getStatusLabel = (isActive: boolean) => {
    return isActive ? t('common.active') : t('common.inactive');
  };

  const getStatusColor = (isActive: boolean) => {
    return isActive ? 'success' : 'error';
  };

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch =
      vehicle.licensePlate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.ownerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterStatus === 'all' ||
      (filterStatus === 'active' && vehicle.isActive) ||
      (filterStatus === 'inactive' && !vehicle.isActive);
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: vehicles.length,
    active: vehicles.filter(v => v.isActive).length,
    inactive: vehicles.filter(v => !v.isActive).length,
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
              placeholder={t('vehicles.searchPlaceholder')}
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
                selected={filterStatus === 'active'}
                onPress={() => setFilterStatus('active')}
                style={styles.filterChip}
                mode='outlined'
              >
                {t('common.active')} ({stats.active})
              </Chip>
              <Chip
                selected={filterStatus === 'inactive'}
                onPress={() => setFilterStatus('inactive')}
                style={styles.filterChip}
                mode='outlined'
              >
                {t('common.inactive')} ({stats.inactive})
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
                {stats.active}
              </Title>
              <Paragraph>{t('common.active')}</Paragraph>
            </Card.Content>
          </Card>
          <Card style={styles.statCard}>
            <Card.Content>
              <Title style={[styles.statNumber, { color: '#f44336' }]}>
                {stats.inactive}
              </Title>
              <Paragraph>{t('common.inactive')}</Paragraph>
            </Card.Content>
          </Card>
        </View>

        {/* Vehicles List */}
        <Card style={styles.listCard}>
          <Card.Content>
            <Title>{t('navigation.vehicles')}</Title>
            {filteredVehicles.map((vehicle, index) => (
              <React.Fragment key={vehicle.id}>
                <List.Item
                  title={vehicle.licensePlate}
                  description={`${vehicle.brand} ${vehicle.model} (${vehicle.year})`}
                  left={props => <List.Icon {...props} icon='car' />}
                  right={() => (
                    <View style={styles.vehicleRight}>
                      <Chip mode='outlined' compact style={styles.statusChip}>
                        {getStatusLabel(vehicle.isActive)}
                      </Chip>
                      <Menu
                        visible={menuVisible === vehicle.id}
                        onDismiss={handleMenuClose}
                        anchor={
                          <Button
                            icon='dots-vertical'
                            onPress={() => handleMenuOpen(vehicle.id)}
                            mode='text'
                            compact
                          >
                            {''}
                          </Button>
                        }
                      >
                        <Menu.Item
                          onPress={() => {
                            handleMenuClose();
                            /* Navigate to vehicle details */
                          }}
                          title={t('common.viewDetails')}
                          leadingIcon='eye'
                        />
                        {permissions.canManageVehicles && (
                          <>
                            <Menu.Item
                              onPress={() => {
                                handleMenuClose();
                                /* Edit vehicle */
                              }}
                              title={t('common.edit')}
                              leadingIcon='pencil'
                            />
                            <Menu.Item
                              onPress={() => {
                                handleMenuClose();
                                /* Delete vehicle */
                              }}
                              title={t('common.delete')}
                              leadingIcon='delete'
                            />
                          </>
                        )}
                      </Menu>
                    </View>
                  )}
                  onPress={() => {
                    /* Navigate to vehicle details */
                  }}
                />
                <View style={styles.vehicleDetails}>
                  <Text style={styles.detailText}>
                    <Text style={styles.detailLabel}>
                      {t('vehicles.color')}
                    </Text>{' '}
                    {vehicle.color}
                  </Text>
                  <Text style={styles.detailText}>
                    <Text style={styles.detailLabel}>
                      {t('vehicles.owner')}
                    </Text>{' '}
                    {vehicle.ownerName}
                  </Text>
                  <Text style={styles.detailText}>
                    <Text style={styles.detailLabel}>{t('vehicles.vin')}</Text>{' '}
                    {vehicle.vin}
                  </Text>
                </View>
                {index < filteredVehicles.length - 1 && <Divider />}
              </React.Fragment>
            ))}

            {filteredVehicles.length === 0 && (
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>
                  {t('vehicles.noResultsFound')}
                </Text>
              </View>
            )}
          </Card.Content>
        </Card>
      </ScrollView>

      {/* FAB for adding new vehicle (only for users with permissions) */}
      {permissions.canManageVehicles && (
        <FAB
          icon='plus'
          style={styles.fab}
          onPress={() => {
            /* Navigate to add vehicle */
          }}
          label={t('vehicles.addVehicle')}
        />
      )}
    </View>
  );
}
