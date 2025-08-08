import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Avatar,
  Stack,
  useTheme,
} from '@mui/material';
import {
  LocalParking,
  Speed,
  Verified,
  TrendingUp,
  Group,
  Public,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

export const StatsSection: React.FC = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [counters, setCounters] = useState({
    spaces: 0,
    users: 0,
    uptime: 0,
    countries: 0,
  });

  const stats = [
    {
      icon: <LocalParking />,
      value: 500,
      suffix: '+',
      label: t('stats.spaces'),
      color: theme.palette.primary.main,
    },
    {
      icon: <Group />,
      value: 10000,
      suffix: '+',
      label: t('stats.users'),
      color: theme.palette.secondary.main,
    },
    {
      icon: <Verified />,
      value: 99.9,
      suffix: '%',
      label: t('stats.uptime'),
      color: theme.palette.success.main,
    },
    {
      icon: <Public />,
      value: 25,
      suffix: '+',
      label: t('stats.countries'),
      color: theme.palette.warning.main,
    },
  ];

  useEffect(() => {
    const animateCounters = () => {
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;

      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;

        setCounters({
          spaces: Math.floor(500 * progress),
          users: Math.floor(10000 * progress),
          uptime: Math.floor(99.9 * progress),
          countries: Math.floor(25 * progress),
        });

        if (currentStep >= steps) {
          clearInterval(interval);
          setCounters({
            spaces: 500,
            users: 10000,
            uptime: 99.9,
            countries: 25,
          });
        }
      }, stepDuration);

      return () => clearInterval(interval);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounters();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    const statsSection = document.getElementById('stats-section');
    if (statsSection) {
      observer.observe(statsSection);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <Box
      id="stats-section"
      sx={{
        py: { xs: 8, md: 12 },
        background: `linear-gradient(135deg, ${theme.palette.primary.main}05 0%, ${theme.palette.secondary.main}05 100%)`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: 200,
          height: 200,
          background: `radial-gradient(circle, ${theme.palette.primary.main}10 0%, transparent 70%)`,
          borderRadius: '50%',
          animation: 'float 6s ease-in-out infinite',
          '@keyframes float': {
            '0%, 100%': { transform: 'translateY(0px)' },
            '50%': { transform: 'translateY(-20px)' },
          },
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '10%',
          right: '5%',
          width: 150,
          height: 150,
          background: `radial-gradient(circle, ${theme.palette.secondary.main}10 0%, transparent 70%)`,
          borderRadius: '50%',
          animation: 'float 8s ease-in-out infinite reverse',
          '@keyframes float': {
            '0%, 100%': { transform: 'translateY(0px)' },
            '50%': { transform: 'translateY(-20px)' },
          },
        }}
      />

      <Container maxWidth="xl">
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 10 } }}>
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
            {t('stats.title')}
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
            {t('stats.subtitle')}
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} lg={3} key={index}>
              <Box
                sx={{
                  textAlign: 'center',
                  p: 4,
                  background: theme.palette.background.paper,
                  borderRadius: 4,
                  border: `1px solid ${theme.palette.divider}`,
                  backdropFilter: 'blur(20px)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: theme.shadows[8],
                    borderColor: stat.color,
                  },
                }}
              >
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    background: `linear-gradient(135deg, ${stat.color} 0%, ${stat.color}80 100%)`,
                    color: '#ffffff',
                    mx: 'auto',
                    mb: 3,
                    fontSize: '2rem',
                  }}
                >
                  {stat.icon}
                </Avatar>
                
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 900,
                    fontSize: { xs: '2.5rem', md: '3rem' },
                    mb: 1,
                    color: stat.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 0.5,
                  }}
                >
                  {index === 0 && counters.spaces}
                  {index === 1 && counters.users}
                  {index === 2 && counters.uptime}
                  {index === 3 && counters.countries}
                  <Box component="span" sx={{ fontSize: '0.6em' }}>
                    {stat.suffix}
                  </Box>
                </Typography>
                
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: theme.palette.text.secondary,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  {stat.label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Additional Stats Row */}
        <Box sx={{ mt: { xs: 8, md: 12 } }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 4 }}>
                <Avatar
                  sx={{
                    width: 60,
                    height: 60,
                    background: `linear-gradient(135deg, ${theme.palette.success.main} 0%, ${theme.palette.success.dark} 100%)`,
                    color: '#ffffff',
                  }}
                >
                  <Speed />
                </Avatar>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 900, mb: 1, color: theme.palette.success.main }}>
                    24/7
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                    {t('stats.monitoring.title')}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t('stats.monitoring.description')}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 4 }}>
                <Avatar
                  sx={{
                    width: 60,
                    height: 60,
                    background: `linear-gradient(135deg, ${theme.palette.info.main} 0%, ${theme.palette.info.dark} 100%)`,
                    color: '#ffffff',
                  }}
                >
                  <TrendingUp />
                </Avatar>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 900, mb: 1, color: theme.palette.info.main }}>
                    98%
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                    {t('stats.satisfaction.title')}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t('stats.satisfaction.description')}
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