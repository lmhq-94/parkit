'use client';

import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  QrCode,
  Schedule,
  CheckCircle,
  Cancel,
  Pending,
} from '@mui/icons-material';
import { DashboardLayout } from '../../components/layout/DashboardLayout';

interface Reservation {
  id: string;
  parkingSpot: string;
  vehicle: string;
  startTime: string;
  endTime: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  totalPrice: number;
  user: string;
  createdAt: string;
}

const mockReservations: Reservation[] = [
  {
    id: 'RES001',
    parkingSpot: 'A1',
    vehicle: 'ABC-123',
    startTime: '2024-01-15 14:00',
    endTime: '2024-01-15 16:00',
    status: 'confirmed',
    totalPrice: 10,
    user: 'John Doe',
    createdAt: '2024-01-15 10:30',
  },
  {
    id: 'RES002',
    parkingSpot: 'B2',
    vehicle: 'XYZ-789',
    startTime: '2024-01-15 09:00',
    endTime: '2024-01-15 11:00',
    status: 'pending',
    totalPrice: 12,
    user: 'Jane Smith',
    createdAt: '2024-01-15 08:15',
  },
  {
    id: 'RES003',
    parkingSpot: 'C1',
    vehicle: 'DEF-456',
    startTime: '2024-01-14 18:00',
    endTime: '2024-01-14 20:00',
    status: 'completed',
    totalPrice: 14,
    user: 'Mike Johnson',
    createdAt: '2024-01-14 16:45',
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'confirmed':
      return 'success';
    case 'pending':
      return 'warning';
    case 'cancelled':
      return 'error';
    case 'completed':
      return 'info';
    default:
      return 'default';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'confirmed':
      return <CheckCircle />;
    case 'pending':
      return <Pending />;
    case 'cancelled':
      return <Cancel />;
    case 'completed':
      return <Schedule />;
    default:
      return <Pending />;
  }
};

export default function ReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>(mockReservations);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [formData, setFormData] = useState({
    parkingSpot: '',
    vehicle: '',
    startTime: '',
    endTime: '',
    status: 'pending',
  });

  const handleOpenDialog = (reservation?: Reservation) => {
    if (reservation) {
      setSelectedReservation(reservation);
      setFormData({
        parkingSpot: reservation.parkingSpot,
        vehicle: reservation.vehicle,
        startTime: reservation.startTime,
        endTime: reservation.endTime,
        status: reservation.status,
      });
    } else {
      setSelectedReservation(null);
      setFormData({
        parkingSpot: '',
        vehicle: '',
        startTime: '',
        endTime: '',
        status: 'pending',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedReservation(null);
  };

  const handleSave = () => {
    if (selectedReservation) {
      // Update existing reservation
      setReservations(reservations.map(res => 
        res.id === selectedReservation.id 
          ? { ...res, ...formData, status: formData.status as 'pending' | 'confirmed' | 'cancelled' | 'completed' }
          : res
      ));
    } else {
      // Add new reservation
      const newReservation: Reservation = {
        id: `RES${String(reservations.length + 1).padStart(3, '0')}`,
        parkingSpot: formData.parkingSpot,
        vehicle: formData.vehicle,
        startTime: formData.startTime,
        endTime: formData.endTime,
        status: formData.status as 'pending' | 'confirmed' | 'cancelled' | 'completed',
        totalPrice: 10, // Calculate based on time
        user: 'Current User',
        createdAt: new Date().toISOString(),
      };
      setReservations([...reservations, newReservation]);
    }
    handleCloseDialog();
  };

  const handleDelete = (id: string) => {
    setReservations(reservations.filter(res => res.id !== id));
  };

  const handleStatusChange = (id: string, newStatus: string) => {
    setReservations(reservations.map(res => 
      res.id === id ? { ...res, status: newStatus as any } : res
    ));
  };

  return (
    <DashboardLayout>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Typography variant="h3">
            Reservations
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => handleOpenDialog()}
          >
            New Reservation
          </Button>
        </Box>

        <Card>
          <CardHeader title="All Reservations" />
          <CardContent>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Parking Spot</TableCell>
                    <TableCell>Vehicle</TableCell>
                    <TableCell>Start Time</TableCell>
                    <TableCell>End Time</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Total Price</TableCell>
                    <TableCell>User</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {reservations.map((reservation) => (
                    <TableRow key={reservation.id}>
                      <TableCell>{reservation.id}</TableCell>
                      <TableCell>{reservation.parkingSpot}</TableCell>
                      <TableCell>{reservation.vehicle}</TableCell>
                      <TableCell>{reservation.startTime}</TableCell>
                      <TableCell>{reservation.endTime}</TableCell>
                      <TableCell>
                        <Chip
                          icon={getStatusIcon(reservation.status)}
                          label={reservation.status}
                          color={getStatusColor(reservation.status)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>${reservation.totalPrice}</TableCell>
                      <TableCell>{reservation.user}</TableCell>
                      <TableCell>
                        <Box display="flex" gap={1}>
                          <Tooltip title="Generate QR Code">
                            <IconButton size="small">
                              <QrCode />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit">
                            <IconButton size="small" onClick={() => handleOpenDialog(reservation)}>
                              <Edit />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton size="small" onClick={() => handleDelete(reservation.id)}>
                              <Delete />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>

        {/* Add/Edit Dialog */}
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogTitle>
            {selectedReservation ? 'Edit Reservation' : 'New Reservation'}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'grid', gap: 2, pt: 1 }}>
              <TextField
                label="Parking Spot"
                value={formData.parkingSpot}
                onChange={(e) => setFormData({ ...formData, parkingSpot: e.target.value })}
                fullWidth
              />
              <TextField
                label="Vehicle"
                value={formData.vehicle}
                onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
                fullWidth
              />
              <TextField
                label="Start Time"
                type="datetime-local"
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="End Time"
                type="datetime-local"
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={formData.status}
                  label="Status"
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="confirmed">Confirmed</MenuItem>
                  <MenuItem value="cancelled">Cancelled</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleSave} variant="contained">
              {selectedReservation ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </DashboardLayout>
  );
} 