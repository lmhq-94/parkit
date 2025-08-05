import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
  Box,
  Grid,
} from '@mui/material';
import {
  Add,
  QrCode,
  DirectionsCar,
  Payment,
  Schedule,
} from '@mui/icons-material';

const quickActions = [
  {
    title: 'New Reservation',
    icon: <Add />,
    color: 'primary',
    description: 'Book a parking spot',
  },
  {
    title: 'Scan QR Code',
    icon: <QrCode />,
    color: 'secondary',
    description: 'Scan parking QR code',
  },
  {
    title: 'Add Vehicle',
    icon: <DirectionsCar />,
    color: 'success',
    description: 'Register new vehicle',
  },
  {
    title: 'Make Payment',
    icon: <Payment />,
    color: 'info',
    description: 'Process payment',
  },
  {
    title: 'View Schedule',
    icon: <Schedule />,
    color: 'warning',
    description: 'Check reservations',
  },
];

export function QuickActions() {
  return (
    <Card>
      <CardHeader
        title="Quick Actions"
        titleTypographyProps={{ variant: 'h6' }}
      />
      <CardContent>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 2 }}>
          {quickActions.map((action) => (
            <Button
              key={action.title}
              variant="outlined"
              fullWidth
              startIcon={action.icon}
              sx={{
                height: 80,
                flexDirection: 'column',
                gap: 1,
                color: `${action.color}.main`,
                borderColor: `${action.color}.main`,
                '&:hover': {
                  backgroundColor: `${action.color}.light`,
                  borderColor: `${action.color}.dark`,
                },
              }}
            >
              <Typography variant="body2" fontWeight="bold">
                {action.title}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {action.description}
              </Typography>
            </Button>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
} 