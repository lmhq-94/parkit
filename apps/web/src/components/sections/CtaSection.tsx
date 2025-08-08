import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Chip,
  Avatar,
  Grid,
} from '@mui/material';
import {
  Rocket,
  PlayArrow,
  ArrowForward,
  LocalParking,
  QrCode,
  Security,
  Speed,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

interface CtaSectionProps {
  onStartNow: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onStartNow }) => {
  const theme = useTheme();
  const { t } = useTranslation();

  const features = [
    {
      icon: <LocalParking />,
      title: t('cta.features.spaces.title'),
      description: t('cta.features.spaces.description'),
      color: theme.palette.primary.main,
    },
    {
      icon: <QrCode />,
      title: t('cta.features.qr.title'),
      description: t('cta.features.qr.description'),
      color: theme.palette.success.main,
    },
    {
      icon: <Security />,
      title: t('cta.features.security.title'),
      description: t('cta.features.security.description'),
      color: theme.palette.warning.main,
    },
  ];

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: 300,
          height: 300,
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%',
          animation: 'float 8s ease-in-out infinite',
          '@keyframes float': {
            '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
            '50%': { transform: 'translateY(-30px) rotate(180deg)' },
          },
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '10%',
          right: '10%',
          width: 200,
          height: 200,
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%',
          animation: 'float 6s ease-in-out infinite reverse',
          '@keyframes float': {
            '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
            '50%': { transform: 'translateY(-30px) rotate(180deg)' },
          },
        }}
      />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2 }}>
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 10 } }}>
          <Chip
            label={t('cta.badge')}
            sx={{
              background: 'rgba(255, 255, 255, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              color: '#ffffff',
              fontWeight: 600,
              mb: 3,
              backdropFilter: 'blur(10px)',
            }}
          />
          <Typography
            variant="h2"
            sx={{
              fontWeight: 900,
              fontSize: { xs: '2.5rem', md: '4rem' },
              mb: 3,
              color: '#ffffff',
              lineHeight: 1.1,
            }}
          >
            {t('cta.title')}
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 400,
              fontSize: { xs: '1.125rem', md: '1.375rem' },
              color: 'rgba(255, 255, 255, 0.9)',
              maxWidth: 700,
              mx: 'auto',
              lineHeight: 1.6,
              mb: 6,
            }}
          >
            {t('cta.subtitle')}
          </Typography>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={3}
            sx={{ justifyContent: 'center', mb: 8 }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={onStartNow}
              endIcon={<Rocket />}
              sx={{
                background: '#ffffff',
                color: theme.palette.primary.main,
                px: 6,
                py: 2.5,
                borderRadius: 3,
                fontWeight: 800,
                fontSize: '1.125rem',
                textTransform: 'none',
                minWidth: 200,
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.1), transparent)',
                  transition: 'left 0.6s',
                },
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
                  '&::before': {
                    left: '100%',
                  },
                },
              }}
            >
              {t('cta.startNow')}
            </Button>
            
            <Button
              variant="outlined"
              size="large"
              startIcon={<PlayArrow />}
              sx={{
                border: '2px solid rgba(255, 255, 255, 0.8)',
                color: '#ffffff',
                px: 6,
                py: 2.5,
                borderRadius: 3,
                fontWeight: 700,
                fontSize: '1.125rem',
                textTransform: 'none',
                minWidth: 200,
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderColor: '#ffffff',
                  transform: 'translateY(-3px)',
                  boxShadow: '0 25px 50px rgba(0,0,0,0.2)',
                },
              }}
            >
              {t('cta.watchDemo')}
            </Button>
          </Stack>
        </Box>

        {/* Features Grid */}
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Box
                sx={{
                  textAlign: 'center',
                  p: 4,
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: 4,
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    background: 'rgba(255, 255, 255, 0.15)',
                  },
                }}
              >
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    background: `linear-gradient(135deg, ${feature.color} 0%, ${feature.color}80 100%)`,
                    color: '#ffffff',
                    mx: 'auto',
                    mb: 3,
                    fontSize: '2rem',
                  }}
                >
                  {feature.icon}
                </Avatar>
                
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 800,
                    mb: 2,
                    color: '#ffffff',
                  }}
                >
                  {feature.title}
                </Typography>
                
                <Typography
                  variant="body1"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    lineHeight: 1.6,
                  }}
                >
                  {feature.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Bottom CTA */}
        <Box sx={{ textAlign: 'center', mt: { xs: 8, md: 12 } }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              mb: 3,
              color: '#ffffff',
            }}
          >
            {t('cta.bottom.title')}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255, 255, 255, 0.8)',
              mb: 4,
              maxWidth: 600,
              mx: 'auto',
            }}
          >
            {t('cta.bottom.description')}
          </Typography>
          <Button
            variant="outlined"
            size="large"
            endIcon={<ArrowForward />}
            sx={{
              border: '2px solid rgba(255, 255, 255, 0.8)',
              color: '#ffffff',
              px: 6,
              py: 2.5,
              borderRadius: 3,
              fontWeight: 700,
              fontSize: '1.125rem',
              textTransform: 'none',
              transition: 'all 0.3s ease',
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.1)',
                borderColor: '#ffffff',
                transform: 'translateY(-3px)',
                boxShadow: '0 25px 50px rgba(0,0,0,0.2)',
              },
            }}
          >
            {t('cta.bottom.button')}
          </Button>
        </Box>
      </Container>
    </Box>
  );
}; 