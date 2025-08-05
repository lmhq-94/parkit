import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  Grid,
  Chip,
  Button,
} from '@mui/material';
import {
  LocalParking,
  DirectionsCar,
  Schedule,
  Block,
} from '@mui/icons-material';

const parkingSpots = [
  { id: 'A1', status: 'available', floor: '1', section: 'A' },
  { id: 'A2', status: 'occupied', floor: '1', section: 'A' },
  { id: 'A3', status: 'reserved', floor: '1', section: 'A' },
  { id: 'A4', status: 'maintenance', floor: '1', section: 'A' },
  { id: 'B1', status: 'available', floor: '1', section: 'B' },
  { id: 'B2', status: 'occupied', floor: '1', section: 'B' },
  { id: 'B3', status: 'available', floor: '1', section: 'B' },
  { id: 'B4', status: 'available', floor: '1', section: 'B' },
  { id: 'C1', status: 'reserved', floor: '2', section: 'C' },
  { id: 'C2', status: 'available', floor: '2', section: 'C' },
  { id: 'C3', status: 'occupied', floor: '2', section: 'C' },
  { id: 'C4', status: 'available', floor: '2', section: 'C' },
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

export function ParkingMap() {
  return (
    <Card>
      <CardHeader
        title="Parking Map"
        titleTypographyProps={{ variant: 'h6' }}
        action={
          <Box display="flex" gap={1}>
            <Chip
              icon={<LocalParking />}
              label="Available"
              color="success"
              size="small"
            />
            <Chip
              icon={<DirectionsCar />}
              label="Occupied"
              color="error"
              size="small"
            />
            <Chip
              icon={<Schedule />}
              label="Reserved"
              color="warning"
              size="small"
            />
            <Chip
              icon={<Block />}
              label="Maintenance"
              color="default"
              size="small"
            />
          </Box>
        }
      />
      <CardContent>
        <Box mb={3}>
          <Typography variant="h6" gutterBottom>
            Floor 1
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(4, 1fr)', sm: 'repeat(6, 1fr)', md: 'repeat(12, 1fr)' }, gap: 1 }}>
            {parkingSpots
              .filter(spot => spot.floor === '1')
              .map((spot) => (
                <Button
                  key={spot.id}
                  variant="outlined"
                  fullWidth
                  sx={{
                    minHeight: 60,
                    flexDirection: 'column',
                    gap: 0.5,
                    color: `${getStatusColor(spot.status)}.main`,
                    borderColor: `${getStatusColor(spot.status)}.main`,
                    '&:hover': {
                      backgroundColor: `${getStatusColor(spot.status)}.light`,
                      borderColor: `${getStatusColor(spot.status)}.dark`,
                    },
                  }}
                >
                  {getStatusIcon(spot.status)}
                  <Typography variant="caption" fontWeight="bold">
                    {spot.id}
                  </Typography>
                </Button>
              ))}
          </Box>
        </Box>

        <Box>
          <Typography variant="h6" gutterBottom>
            Floor 2
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(4, 1fr)', sm: 'repeat(6, 1fr)', md: 'repeat(12, 1fr)' }, gap: 1 }}>
            {parkingSpots
              .filter(spot => spot.floor === '2')
              .map((spot) => (
                <Button
                  key={spot.id}
                  variant="outlined"
                  fullWidth
                  sx={{
                    minHeight: 60,
                    flexDirection: 'column',
                    gap: 0.5,
                    color: `${getStatusColor(spot.status)}.main`,
                    borderColor: `${getStatusColor(spot.status)}.main`,
                    '&:hover': {
                      backgroundColor: `${getStatusColor(spot.status)}.light`,
                      borderColor: `${getStatusColor(spot.status)}.dark`,
                    },
                  }}
                >
                  {getStatusIcon(spot.status)}
                  <Typography variant="caption" fontWeight="bold">
                    {spot.id}
                  </Typography>
                </Button>
              ))}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
} 