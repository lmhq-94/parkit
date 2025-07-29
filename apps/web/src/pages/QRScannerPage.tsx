import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute';
import { usePermissions } from '@/hooks/usePermissions';
import { CameraAlt, CheckCircle, Error, QrCode } from '@mui/icons-material';
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import { EventType } from '@parkit/shared';
import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext';

export default function QRScannerPage() {
  const { t } = useLanguage();
  const permissions = usePermissions();
  const [scannedCode, setScannedCode] = useState('');
  const [eventType, setEventType] = useState<EventType>(EventType.ENTRY);
  const [scanResult, setScanResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleScan = () => {
    // Mock QR scan - in real app this would use camera
    const mockCode = 'PARKIT_QR_001';
    setScannedCode(mockCode);

    // Simulate processing
    setTimeout(() => {
      setScanResult({
        success: true,
        message: 'Vehículo registrado exitosamente',
      });
    }, 1000);
  };

  const handleManualEntry = () => {
    if (!scannedCode.trim()) {
      setScanResult({
        success: false,
        message: 'Por favor ingresa un código válido',
      });
      return;
    }

    setScanResult({
      success: true,
      message: t('events.manualEventRegistered'),
    });
  };

  const resetScan = () => {
    setScannedCode('');
    setScanResult(null);
  };

  return (
    <ProtectedRoute requiredPermissions={(p) => p.canScanQR}>
      <Box>
        <Typography variant="h4" gutterBottom>
          Escáner QR
        </Typography>

        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="h6">Registro de Eventos</Typography>
          <Typography variant="body2">
            Escanea códigos QR para registrar entradas y salidas de vehículos.
          </Typography>
        </Alert>

        <Grid container spacing={3}>
          {/* QR Scanner Section */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <QrCode sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Escáner de Código QR
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                Usa la cámara para escanear códigos QR de parqueos o vehículos
              </Typography>

              <Button
                variant="contained"
                size="large"
                startIcon={<CameraAlt />}
                onClick={handleScan}
                sx={{ mb: 2 }}
                fullWidth
              >
                Escanear QR
              </Button>

              <Button
                variant="outlined"
                onClick={resetScan}
                fullWidth
              >
                Limpiar
              </Button>
            </Paper>
          </Grid>

          {/* Manual Entry Section */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Entrada Manual
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                Ingresa el código manualmente si no puedes escanear
              </Typography>

              <TextField
                fullWidth
                label={t('qrScanner.qrCode')}
                value={scannedCode}
                onChange={(e) => setScannedCode(e.target.value)}
                sx={{ mb: 2 }}
                placeholder={t('qrScanner.exampleCode')}
              />

              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Tipo de Evento</InputLabel>
                <Select
                  value={eventType}
                  label={t('events.eventType')}
                  onChange={(e) => setEventType(e.target.value as EventType)}
                >
                  <MenuItem value={EventType.ENTRY}>Entrada</MenuItem>
                  <MenuItem value={EventType.EXIT}>Salida</MenuItem>
                </Select>
              </FormControl>

              <Button
                variant="contained"
                onClick={handleManualEntry}
                fullWidth
                disabled={!scannedCode.trim()}
              >
                Registrar Evento
              </Button>
            </Paper>
          </Grid>

          {/* Scan Result */}
          {scanResult && (
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Box display="flex" alignItems="center" gap={2}>
                    {scanResult.success ? (
                      <CheckCircle color="success" sx={{ fontSize: 32 }} />
                    ) : (
                      <Error color="error" sx={{ fontSize: 32 }} />
                    )}
                    <Box>
                      <Typography variant="h6" color={scanResult.success ? 'success.main' : 'error.main'}>
                        {scanResult.success ? t('success.success') : t('errors.error')}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {scanResult.message}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          )}

          {/* Recent Events */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Eventos Recientes
              </Typography>
              <Typography variant="body2" color="textSecondary">
                No hay eventos recientes para mostrar.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </ProtectedRoute>
  );
}
