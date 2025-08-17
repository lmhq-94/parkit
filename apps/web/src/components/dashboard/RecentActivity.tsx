import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Box,
  Chip,
  Grid,
} from '@mui/material';
import {
  CalendarIcon,
  VehicleIcon,
  PaymentIcon,
  QrCodeIcon,
  ParkingIcon,
} from '../icons';

const activities = [
  {
    id: 1,
    type: 'reservation',
    title: 'New reservation created',
    description: 'Spot A-12 reserved for 2 hours',
    time: '2 minutes ago',
    icon: <CalendarIcon />,
    color: 'primary',
  },
  {
    id: 2,
    type: 'entry',
    title: 'Vehicle entered',
    description: 'ABC-123 entered parking lot',
    time: '5 minutes ago',
    icon: <VehicleIcon />,
    color: 'success',
  },
  {
    id: 3,
    type: 'payment',
    title: 'Payment received',
    description: '$15.00 paid for reservation #1234',
    time: '10 minutes ago',
    icon: <PaymentIcon />,
    color: 'info',
  },
  {
    id: 4,
    type: 'qr_scan',
    title: 'QR code scanned',
    description: 'QR code scanned at entrance',
    time: '15 minutes ago',
    icon: <QrCodeIcon />,
    color: 'warning',
  },
  {
    id: 5,
    type: 'exit',
    title: 'Vehicle exited',
    description: 'XYZ-789 exited parking lot',
    time: '20 minutes ago',
    icon: <ParkingIcon />,
    color: 'secondary',
  },
];

export function RecentActivity() {
  return (
    <Card>
      <CardHeader
        title="Recent Activity"
        titleTypographyProps={{ variant: 'h6' }}
        action={
          <Chip
            label="View All"
            size="small"
            clickable
            variant="outlined"
          />
        }
      />
      <CardContent>
        <List>
          {activities.map((activity, index) => (
            <React.Fragment key={activity.id}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      bgcolor: `${activity.color}.light`,
                      color: `${activity.color}.main`,
                    }}
                  >
                    {activity.icon}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Typography variant="body1" fontWeight="medium">
                        {activity.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {activity.time}
                      </Typography>
                    </Box>
                  }
                  secondary={
                    <Typography variant="body2" color="text.secondary">
                      {activity.description}
                    </Typography>
                  }
                />
              </ListItem>
              {index < activities.length - 1 && <Box sx={{ borderBottom: 1, borderColor: 'divider' }} />}
            </React.Fragment>
          ))}
        </List>
      </CardContent>
    </Card>
  );
} 