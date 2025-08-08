import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Stack,
  Chip,
} from '@mui/material';
import {
  QrCode,
  Security,
  Speed,
  Analytics,
  Payment,
  Smartphone,
  Cloud,
  Verified,
  LocalParking,
  TrendingUp,
  Shield,
  Bolt,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

export const FeaturesSection: React.FC = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  const features = [
    {
      icon: <QrCode />,
      title: t('features.qr.title'),
      description: t('features.qr.description'),
      color: theme.palette.success.main,
      badge: 'Popular',
    },
    {
      icon: <Security />,
      title: t('features.security.title'),
      description: t('features.security.description'),
      color: theme.palette.warning.main,
      badge: 'Secure',
    },
    {
      icon: <Speed />,
      title: t('features.speed.title'),
      description: t('features.speed.description'),
      color: theme.palette.info.main,
      badge: 'Fast',
    },
    {
      icon: <Analytics />,
      title: t('features.analytics.title'),
      description: t('features.analytics.description'),
      color: theme.palette.secondary.main,
      badge: 'Insights',
    },
    {
      icon: <Payment />,
      title: t('features.payment.title'),
      description: t('features.payment.description'),
      color: theme.palette.primary.main,
      badge: 'Payment',
    },
    {
      icon: <Smartphone />,
      title: t('features.mobile.title'),
      description: t('features.mobile.description'),
      color: theme.palette.error.main,
      badge: 'Mobile',
    },
  ];

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        background: theme.palette.mode === 'dark' 
          ? `linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)`
          : `linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%)`,
      }}
      id="features"
    >
      <Container maxWidth="xl">
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 10 } }}>
          <Chip
            label={t('features.badge')}
            sx={{
              background: `linear-gradient(135deg, ${theme.palette.primary.main}15, ${theme.palette.secondary.main}15)`,
              border: `1px solid ${theme.palette.primary.main}30`,
              color: theme.palette.primary.main,
              fontWeight: 600,
              mb: 3,
            }}
          />
          <Typography
            variant="h2"
            sx={{
              fontWeight: 900,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              mb: 3,
              background: `linear-gradient(135deg, ${theme.palette.text.primary} 0%, ${theme.palette.primary.main} 100%)`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {t('features.title')}
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 400,
              fontSize: { xs: '1.125rem', md: '1.25rem' },
              color: theme.palette.text.secondary,
              maxWidth: 600,
              mx: 'auto',
              lineHeight: 1.6,
            }}
          >
            {t('features.subtitle')}
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} lg={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  background: theme.palette.background.paper,
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: 4,
                  backdropFilter: 'blur(20px)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: theme.shadows[12],
                    borderColor: feature.color,
                  },
                }}
              >
                <CardContent sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                    <Avatar
                      sx={{
                        width: 60,
                        height: 60,
                        background: `linear-gradient(135deg, ${feature.color} 0%, ${feature.color}80 100%)`,
                        color: '#ffffff',
                        fontSize: '1.5rem',
                      }}
                    >
                      {feature.icon}
                    </Avatar>
                    <Chip
                      label={feature.badge}
                      size="small"
                      sx={{
                        background: `${feature.color}15`,
                        color: feature.color,
                        fontWeight: 600,
                        fontSize: '0.75rem',
                      }}
                    />
                  </Box>
                  
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 800,
                      mb: 2,
                      color: theme.palette.text.primary,
                    }}
                  >
                    {feature.title}
                  </Typography>
                  
                  <Typography
                    variant="body1"
                    sx={{
                      color: theme.palette.text.secondary,
                      lineHeight: 1.6,
                      flex: 1,
                    }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Additional Features Grid */}
        <Box sx={{ mt: { xs: 8, md: 12 } }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 900,
              fontSize: { xs: '2rem', md: '2.5rem' },
              mb: 6,
              textAlign: 'center',
              color: theme.palette.text.primary,
            }}
          >
            {t('features.advanced.title')}
          </Typography>
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 4 }}>
                <Avatar
                  sx={{
                    width: 50,
                    height: 50,
                    background: `linear-gradient(135deg, ${theme.palette.success.main} 0%, ${theme.palette.success.dark} 100%)`,
                    color: '#ffffff',
                  }}
                >
                  <Cloud />
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                    {t('features.advanced.cloud.title')}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t('features.advanced.cloud.description')}
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 4 }}>
                <Avatar
                  sx={{
                    width: 50,
                    height: 50,
                    background: `linear-gradient(135deg, ${theme.palette.warning.main} 0%, ${theme.palette.warning.dark} 100%)`,
                    color: '#ffffff',
                  }}
                >
                  <Verified />
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                    {t('features.advanced.verified.title')}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t('features.advanced.verified.description')}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 4 }}>
                <Avatar
                  sx={{
                    width: 50,
                    height: 50,
                    background: `linear-gradient(135deg, ${theme.palette.info.main} 0%, ${theme.palette.info.dark} 100%)`,
                    color: '#ffffff',
                  }}
                >
                  <TrendingUp />
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                    {t('features.advanced.trending.title')}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t('features.advanced.trending.description')}
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 4 }}>
                <Avatar
                  sx={{
                    width: 50,
                    height: 50,
                    background: `linear-gradient(135deg, ${theme.palette.error.main} 0%, ${theme.palette.error.dark} 100%)`,
                    color: '#ffffff',
                  }}
                >
                  <Bolt />
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                    {t('features.advanced.bolt.title')}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t('features.advanced.bolt.description')}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}; 