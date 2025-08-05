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
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  LocalParking,
  DirectionsCar,
  Schedule,
  Block,
  Visibility,
} from '@mui/icons-material';
import { DashboardLayout } from '../../components/layout/DashboardLayout';

interface ParkingSpot {
  id: string;
  name: string;
  floor: string;
  section: string;
  status: 'available' | 'occupied' | 'reserved' | 'maintenance';
  price: number;
  currentVehicle?: string;
  reservationTime?: string;
}

const mockParkingSpots: ParkingSpot[] = [
  { id: 'A1', name: 'A1', floor: '1', section: 'A', status: 'available', price: 5 },
  { id: 'A2', name: 'A2', floor: '1', section: 'A', status: 'occupied', price: 5, currentVehicle: 'ABC-123' },
  { id: 'A3', name: 'A3', floor: '1', section: 'A', status: 'reserved', price: 5, reservationTime: '14:00-16:00' },
  { id: 'A4', name: 'A4', floor: '1', section: 'A', status: 'maintenance', price: 5 },
  { id: 'B1', name: 'B1', floor: '1', section: 'B', status: 'available', price: 6 },
  { id: 'B2', name: 'B2', floor: '1', section: 'B', status: 'occupied', price: 6, currentVehicle: 'XYZ-789' },
  { id: 'C1', name: 'C1', floor: '2', section: 'C', status: 'available', price: 7 },
  { id: 'C2', name: 'C2', floor: '2', section: 'C', status: 'reserved', price: 7, reservationTime: '09:00-11:00' },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'available':
      return 'success';
    case 'occupied':
      return 'error';
    case 'reserved':
      return 'warning';
    case 'maintenance':
      return 'default';
    default:
      return 'default';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'available':
      return <LocalParking />;
    case 'occupied':
      return <DirectionsCar />;
    case 'reserved':
      return <Schedule />;
    case 'maintenance':
      return <Block />;
    default:
      return <LocalParking />;
  }
};

export default function ParkingPage() {
  const [spots, setSpots] = useState<ParkingSpot[]>(mockParkingSpots);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedSpot, setSelectedSpot] = useState<ParkingSpot | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    floor: '',
    section: '',
    price: '',
    status: 'available',
  });

  const handleOpenDialog = (spot?: ParkingSpot) => {
    if (spot) {
      setSelectedSpot(spot);
      setFormData({
        name: spot.name,
        floor: spot.floor,
        section: spot.section,
        price: spot.price.toString(),
        status: spot.status,
      });
    } else {
      setSelectedSpot(null);
      setFormData({
        name: '',
        floor: '',
        section: '',
        price: '',
        status: 'available',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedSpot(null);
  };

  const handleSave = () => {
    if (selectedSpot) {
      // Update existing spot
      setSpots(spots.map(spot => 
        spot.id === selectedSpot.id 
          ? { ...spot, ...formData, price: parseFloat(formData.price), status: formData.status as 'available' | 'occupied' | 'reserved' | 'maintenance' }
          : spot
      ));
    } else {
      // Add new spot
      const newSpot: ParkingSpot = {
        id: `${formData.section}${spots.length + 1}`,
        name: formData.name,
        floor: formData.floor,
        section: formData.section,
        status: formData.status as 'available' | 'occupied' | 'reserved' | 'maintenance',
        price: parseFloat(formData.price),
      };
      setSpots([...spots, newSpot]);
    }
    handleCloseDialog();
  };

  const handleDelete = (id: string) => {
    setSpots(spots.filter(spot => spot.id !== id));
  };

  return (
    <DashboardLayout>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Typography variant="h3">
            Parking Management
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => handleOpenDialog()}
          >
            Add Parking Spot
          </Button>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }, gap: 3 }}>
          {spots.map((spot) => (
            <Card key={spot.id}>
              <CardHeader
                action={
                  <Box>
                    <Tooltip title="View Details">
                      <IconButton size="small">
                        <Visibility />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                      <IconButton size="small" onClick={() => handleOpenDialog(spot)}>
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton size="small" onClick={() => handleDelete(spot.id)}>
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </Box>
                }
                title={
                  <Box display="flex" alignItems="center" gap={1}>
                    {getStatusIcon(spot.status)}
                    <Typography variant="h6">
                      {spot.name}
                    </Typography>
                  </Box>
                }
                subheader={`Floor ${spot.floor}, Section ${spot.section}`}
              />
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Chip
                    label={spot.status}
                    color={getStatusColor(spot.status)}
                    size="small"
                  />
                  <Typography variant="h6" color="primary">
                    ${spot.price}/hour
                  </Typography>
                </Box>
                
                {spot.currentVehicle && (
                  <Typography variant="body2" color="text.secondary">
                    Vehicle: {spot.currentVehicle}
                  </Typography>
                )}
                
                {spot.reservationTime && (
                  <Typography variant="body2" color="text.secondary">
                    Reserved: {spot.reservationTime}
                  </Typography>
                )}
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Add/Edit Dialog */}
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogTitle>
            {selectedSpot ? 'Edit Parking Spot' : 'Add Parking Spot'}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'grid', gap: 2, pt: 1 }}>
              <TextField
                label="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                fullWidth
              />
              <TextField
                label="Floor"
                value={formData.floor}
                onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
                fullWidth
              />
              <TextField
                label="Section"
                value={formData.section}
                onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                fullWidth
              />
              <TextField
                label="Price per Hour"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                fullWidth
              />
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={formData.status}
                  label="Status"
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <MenuItem value="available">Available</MenuItem>
                  <MenuItem value="occupied">Occupied</MenuItem>
                  <MenuItem value="reserved">Reserved</MenuItem>
                  <MenuItem value="maintenance">Maintenance</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleSave} variant="contained">
              {selectedSpot ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </DashboardLayout>
  );
} 