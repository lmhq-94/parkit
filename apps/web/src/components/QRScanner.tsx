'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  Paper,
  IconButton,
  CircularProgress,
  Alert,
  Stack,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  CloseIcon,
  CameraIcon,
} from './icons';

interface QRScannerProps {
  open: boolean;
  onClose: () => void;
  onScan: (data: string) => void;
  mode: 'entry' | 'exit' | 'reservation';
}

export function QRScanner({ open, onClose, onScan, mode }: QRScannerProps) {
  const [scanning, setScanning] = useState(false);
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startScanning = async () => {
    try {
      setError(null);
      setScanning(true);
      
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }
    } catch (err) {
      setError('Unable to access camera. Please check permissions.');
      setScanning(false);
    }
  };

  const stopScanning = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setScanning(false);
    setScannedData(null);
  };

  const handleScan = (data: string) => {
    setScannedData(data);
    stopScanning();
    onScan(data);
  };

  const handleClose = () => {
    stopScanning();
    onClose();
  };

  const simulateScan = () => {
    const mockData = mode === 'entry' 
      ? 'PARKING_ENTRY_A1_ABC123'
      : mode === 'exit'
      ? 'PARKING_EXIT_A1_ABC123'
      : 'RESERVATION_QR_B2_XYZ789';
    
    handleScan(mockData);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">
            {mode === 'entry' ? 'Vehicle Entry' : mode === 'exit' ? 'Vehicle Exit' : 'Reservation QR'}
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ textAlign: 'center', py: 2 }}>
          {!scanning && !scannedData && (
            <Box>
              {/* QrCode icon removed as per new_code */}
              <Typography variant="h6" gutterBottom>
                Scan QR Code
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                {mode === 'entry' 
                  ? 'Scan the QR code at the parking entrance to register vehicle entry'
                  : mode === 'exit'
                  ? 'Scan the QR code at the parking exit to register vehicle exit'
                  : 'Scan the reservation QR code to verify booking'
                }
              </Typography>
              <Button
                variant="contained"
                startIcon={<CameraIcon />}
                onClick={startScanning}
                sx={{ mr: 2 }}
              >
                Start Camera
              </Button>
              <Button
                variant="outlined"
                onClick={simulateScan}
              >
                Simulate Scan
              </Button>
            </Box>
          )}

          {scanning && (
            <Box>
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: 400,
                  mx: 'auto',
                  mb: 2,
                }}
              >
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  style={{
                    width: '100%',
                    height: 300,
                    objectFit: 'cover',
                    borderRadius: 8,
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 200,
                    height: 200,
                    border: '2px solid #fff',
                    borderRadius: 2,
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: -2,
                      left: -2,
                      right: -2,
                      bottom: -2,
                      border: '2px solid #1976d2',
                      borderRadius: 2,
                      animation: 'pulse 2s infinite',
                    },
                  }}
                />
              </Box>
              <Typography variant="body2" color="text.secondary">
                Point camera at QR code
              </Typography>
            </Box>
          )}

          {scannedData && (
            <Box>
              {/* CheckCircle icon removed as per new_code */}
              <Typography variant="h6" gutterBottom>
                QR Code Scanned Successfully!
              </Typography>
              {/* Chip component removed as per new_code */}
              <Typography variant="body2" color="text.secondary">
                {mode === 'entry' 
                  ? 'Vehicle entry registered'
                  : mode === 'exit'
                  ? 'Vehicle exit registered'
                  : 'Reservation verified'
                }
              </Typography>
            </Box>
          )}

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        {scanning && (
          <Button onClick={stopScanning} color="secondary">
            Stop Scanning
          </Button>
        )}
        <Button onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
} 