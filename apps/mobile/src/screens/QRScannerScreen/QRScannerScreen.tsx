import { useLanguage } from '@/contexts/LanguageContext';
import { usePermissions } from '@/hooks/usePermissions';
import { EventType } from '@parkit/shared';
import React, { useState } from 'react';
import { View } from 'react-native';
import {
  Button,
  Card,
  Chip,
  Divider,
  List,
  Paragraph,
  Text,
  TextInput,
  Title,
} from 'react-native-paper';
import { styles } from './QRScannerScreen.styles';

export default function QRScannerScreen() {
  const [scannedCode, setScannedCode] = useState('');
  const [eventType, setEventType] = useState<EventType>(EventType.ENTRY);
  const [scanResult, setScanResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [recentEvents, setRecentEvents] = useState([
    {
      id: '1',
      type: EventType.ENTRY,
      vehiclePlate: 'ABC-123',
      parkingName: 'Piso 1 - A1',
      timestamp: '2024-01-15T10:30:00Z',
    },
    {
      id: '2',
      type: EventType.EXIT,
      vehiclePlate: 'XYZ-789',
      parkingName: 'Piso 2 - B3',
      timestamp: '2024-01-15T09:15:00Z',
    },
  ]);

  const permissions = usePermissions();
  const { t } = useLanguage();

  const handleScan = () => {
    // Mock QR scan - in real app this would use camera
    const mockCode = 'PARKIT_QR_001';
    setScannedCode(mockCode);

    // Simulate processing
    setTimeout(() => {
      setScanResult({
        success: true,
        message: t('events.vehicleRegisteredSuccessfully'),
      });

      // Add to recent events
      const newEvent = {
        id: Date.now().toString(),
        type: eventType,
        vehiclePlate: 'ABC-123',
        parkingName: 'Piso 1 - A1',
        timestamp: new Date().toISOString(),
      };
      setRecentEvents([newEvent, ...recentEvents.slice(0, 4)]);
    }, 1000);
  };

  const handleManualEntry = () => {
    if (!scannedCode.trim()) {
      setScanResult({
        success: false,
        message: t('events.invalidCode'),
      });
      return;
    }

    setScanResult({
      success: true,
      message: t('events.manualEventRegistered'),
    });

    // Add to recent events
    const newEvent = {
      id: Date.now().toString(),
      type: eventType,
      vehiclePlate: 'MANUAL-001',
      parkingName: t('qrScanner.manualEntry'),
      timestamp: new Date().toISOString(),
    };
    setRecentEvents([newEvent, ...recentEvents.slice(0, 4)]);
  };

  const resetScan = () => {
    setScannedCode('');
    setScanResult(null);
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

  const getEventTypeLabel = (type: EventType) => {
    switch (type) {
      case EventType.ENTRY:
        return t('events.entry');
      case EventType.EXIT:
        return t('events.exit');
      default:
        return type;
    }
  };

  const getEventTypeIcon = (type: EventType) => {
    switch (type) {
      case EventType.ENTRY:
        return '🚗➡️';
      case EventType.EXIT:
        return '🚗⬅️';
      default:
        return '📋';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* QR Scanner Section */}
        <Card style={styles.scannerCard}>
          <Card.Content style={styles.scannerContent}>
            <Text style={styles.scannerIcon}>📱</Text>
            <Title style={styles.scannerTitle}>{t('qrScanner.title')}</Title>
            <Paragraph style={styles.scannerDescription}>
              {t('qrScanner.description')}
            </Paragraph>

            <Button
              mode='contained'
              icon='qrcode-scan'
              onPress={handleScan}
              style={styles.scanButton}
              contentStyle={styles.scanButtonContent}
            >
              {t('qrScanner.scanQR')}
            </Button>

            <Button
              mode='outlined'
              onPress={resetScan}
              style={styles.clearButton}
            >
              {t('common.clear')}
            </Button>
          </Card.Content>
        </Card>

        {/* Manual Entry Section */}
        <Card style={styles.manualCard}>
          <Card.Content>
            <Title>{t('qrScanner.manualEntry')}</Title>
            <Paragraph style={styles.manualDescription}>
              {t('qrScanner.manualDescription')}
            </Paragraph>

            <TextInput
              label={t('qrScanner.qrCode')}
              value={scannedCode}
              onChangeText={setScannedCode}
              mode='outlined'
              style={styles.codeInput}
              placeholder={t('qrScanner.exampleCode')}
            />

            <View style={styles.eventTypeContainer}>
              <Text style={styles.eventTypeLabel}>{t('events.eventType')}</Text>
              <View style={styles.eventTypeButtons}>
                <Button
                  mode={
                    eventType === EventType.ENTRY ? 'contained' : 'outlined'
                  }
                  onPress={() => setEventType(EventType.ENTRY)}
                  style={styles.eventTypeButton}
                  compact
                >
                  {t('events.entry')}
                </Button>
                <Button
                  mode={eventType === EventType.EXIT ? 'contained' : 'outlined'}
                  onPress={() => setEventType(EventType.EXIT)}
                  style={styles.eventTypeButton}
                  compact
                >
                  {t('events.exit')}
                </Button>
              </View>
            </View>

            <Button
              mode='contained'
              onPress={handleManualEntry}
              style={styles.registerButton}
              disabled={!scannedCode.trim()}
            >
              {t('events.registerEvent')}
            </Button>
          </Card.Content>
        </Card>

        {/* Scan Result */}
        {scanResult && (
          <Card
            style={[
              styles.resultCard,
              scanResult.success ? styles.successCard : styles.errorCard,
            ]}
          >
            <Card.Content style={styles.resultContent}>
              <Text style={styles.resultIcon}>
                {scanResult.success ? '✅' : '❌'}
              </Text>
              <Title style={styles.resultTitle}>
                {scanResult.success ? t('success.success') : t('errors.error')}
              </Title>
              <Paragraph style={styles.resultMessage}>
                {scanResult.message}
              </Paragraph>
            </Card.Content>
          </Card>
        )}

        {/* Recent Events */}
        <Card style={styles.eventsCard}>
          <Card.Content>
            <Title>{t('events.recentEvents')}</Title>
            {recentEvents.length > 0 ? (
              recentEvents.map((event, index) => (
                <React.Fragment key={event.id}>
                  <List.Item
                    title={`${event.vehiclePlate} - ${event.parkingName}`}
                    description={formatDateTime(event.timestamp)}
                    left={props => (
                      <Text style={styles.eventIcon}>
                        {getEventTypeIcon(event.type)}
                      </Text>
                    )}
                    right={() => (
                      <Chip mode='outlined' compact>
                        {getEventTypeLabel(event.type)}
                      </Chip>
                    )}
                  />
                  {index < recentEvents.length - 1 && <Divider />}
                </React.Fragment>
              ))
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>
                  {t('events.noRecentEvents')}
                </Text>
              </View>
            )}
          </Card.Content>
        </Card>
      </View>
    </View>
  );
}
