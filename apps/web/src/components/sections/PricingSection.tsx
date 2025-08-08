import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Stack,
  Switch,
  FormControlLabel,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Check as CheckIcon,
  Close as CloseIcon,
  Star as StarIcon,
  WorkspacePremium,
  LocalParking,
  QrCode,
  Analytics,
  Security,
  Cloud,
  Support,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

export const PricingSection: React.FC = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: t('pricing.starter.name'),
      description: t('pricing.starter.description'),
      monthlyPrice: 29,
      annualPrice: 290,
      features: [
        t('pricing.starter.features.spaces'),
        t('pricing.starter.features.qr'),
        t('pricing.starter.features.basic'),
        t('pricing.starter.features.support'),
      ],
      excluded: [
        t('pricing.starter.excluded.analytics'),
        t('pricing.starter.excluded.priority'),
      ],
      color: theme.palette.primary.main,
      popular: false,
    },
    {
      name: t('pricing.pro.name'),
      description: t('pricing.pro.description'),
      monthlyPrice: 99,
      annualPrice: 990,
      features: [
        t('pricing.pro.features.spaces'),
        t('pricing.pro.features.qr'),
        t('pricing.pro.features.analytics'),
        t('pricing.pro.features.security'),
        t('pricing.pro.features.priority'),
        t('pricing.pro.features.cloud'),
      ],
      excluded: [],
      color: theme.palette.secondary.main,
      popular: true,
    },
    {
      name: t('pricing.enterprise.name'),
      description: t('pricing.enterprise.description'),
      monthlyPrice: 299,
      annualPrice: 2990,
      features: [
        t('pricing.enterprise.features.unlimited'),
        t('pricing.enterprise.features.advanced'),
        t('pricing.enterprise.features.custom'),
        t('pricing.enterprise.features.dedicated'),
        t('pricing.enterprise.features.sla'),
        t('pricing.enterprise.features.white'),
      ],
      excluded: [],
      color: theme.palette.warning.main,
      popular: false,
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
      id="pricing"
    >
      <Container maxWidth="xl">
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 10 } }}>
          <Chip
            label={t('pricing.badge')}
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
            {t('pricing.title')}
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
              mb: 6,
            }}
          >
            {t('pricing.subtitle')}
          </Typography>

          {/* Billing Toggle */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
            <Typography variant="body1" color="text.secondary">
              {t('pricing.monthly')}
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={isAnnual}
                  onChange={(e) => setIsAnnual(e.target.checked)}
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': {
                      color: theme.palette.primary.main,
                    },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                      backgroundColor: theme.palette.primary.main,
                    },
                  }}
                />
              }
              label=""
            />
            <Typography variant="body1" color="text.secondary">
              {t('pricing.annual')}
            </Typography>
            <Chip
              label={t('pricing.save')}
              size="small"
              sx={{
                background: theme.palette.success.main,
                color: '#ffffff',
                fontWeight: 600,
              }}
            />
          </Box>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          {plans.map((plan, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  background: theme.palette.background.paper,
                  border: plan.popular 
                    ? `2px solid ${plan.color}` 
                    : `1px solid ${theme.palette.divider}`,
                  borderRadius: 4,
                  backdropFilter: 'blur(20px)',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: theme.shadows[12],
                  },
                }}
              >
                {plan.popular && (
                  <Chip
                    icon={<StarIcon />}
                    label={t('pricing.popular')}
                    sx={{
                      position: 'absolute',
                      top: -12,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: `linear-gradient(135deg, ${plan.color} 0%, ${plan.color}80 100%)`,
                      color: '#ffffff',
                      fontWeight: 700,
                      zIndex: 1,
                    }}
                  />
                )}

                <CardContent sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Avatar
                      sx={{
                        width: 60,
                        height: 60,
                        background: `linear-gradient(135deg, ${plan.color} 0%, ${plan.color}80 100%)`,
                        color: '#ffffff',
                        mx: 'auto',
                        mb: 2,
                        fontSize: '1.5rem',
                      }}
                    >
                      {index === 0 && <LocalParking />}
                      {index === 1 && <WorkspacePremium />}
                      {index === 2 && <Cloud />}
                    </Avatar>
                    
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 900,
                        mb: 1,
                        color: theme.palette.text.primary,
                      }}
                    >
                      {plan.name}
                    </Typography>
                    
                    <Typography
                      variant="body1"
                      sx={{
                        color: theme.palette.text.secondary,
                        mb: 3,
                      }}
                    >
                      {plan.description}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 1 }}>
                      <Typography
                        variant="h2"
                        sx={{
                          fontWeight: 900,
                          color: plan.color,
                        }}
                      >
                        ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          color: theme.palette.text.secondary,
                          fontWeight: 400,
                        }}
                      >
                        /{isAnnual ? t('pricing.year') : t('pricing.month')}
                      </Typography>
                    </Box>
                  </Box>

                  <List sx={{ flex: 1, mb: 4 }}>
                    {plan.features.map((feature, featureIndex) => (
                      <ListItem key={featureIndex} sx={{ px: 0, py: 1 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <CheckIcon sx={{ color: theme.palette.success.main }} />
                        </ListItemIcon>
                        <ListItemText
                          primary={feature}
                          sx={{
                            '& .MuiTypography-root': {
                              fontSize: '0.9rem',
                              fontWeight: 500,
                            },
                          }}
                        />
                      </ListItem>
                    ))}
                    {plan.excluded.map((feature, featureIndex) => (
                      <ListItem key={`excluded-${featureIndex}`} sx={{ px: 0, py: 1 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <CloseIcon sx={{ color: theme.palette.text.disabled }} />
                        </ListItemIcon>
                        <ListItemText
                          primary={feature}
                          sx={{
                            '& .MuiTypography-root': {
                              fontSize: '0.9rem',
                              fontWeight: 500,
                              color: theme.palette.text.disabled,
                            },
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>

                  <Button
                    variant={plan.popular ? 'contained' : 'outlined'}
                    fullWidth
                    size="large"
                    sx={{
                      background: plan.popular 
                        ? `linear-gradient(135deg, ${plan.color} 0%, ${plan.color}80 100%)`
                        : 'transparent',
                      borderColor: plan.color,
                      color: plan.popular ? '#ffffff' : plan.color,
                      fontWeight: 700,
                      py: 2,
                      '&:hover': {
                        background: plan.popular 
                          ? `linear-gradient(135deg, ${plan.color}80 0%, ${plan.color} 100%)`
                          : plan.color,
                        color: '#ffffff',
                        transform: 'translateY(-2px)',
                        boxShadow: `0 10px 25px ${plan.color}40`,
                      },
                    }}
                  >
                    {t('pricing.getStarted')}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Enterprise CTA */}
        <Box sx={{ textAlign: 'center', mt: { xs: 8, md: 12 } }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              mb: 3,
              color: theme.palette.text.primary,
            }}
          >
            {t('pricing.enterprise.title')}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: theme.palette.text.secondary,
              mb: 4,
              maxWidth: 600,
              mx: 'auto',
            }}
          >
            {t('pricing.enterprise.description')}
          </Typography>
          <Button
            variant="outlined"
            size="large"
            sx={{
              borderColor: theme.palette.primary.main,
              color: theme.palette.primary.main,
              fontWeight: 700,
              px: 4,
              py: 2,
              '&:hover': {
                background: theme.palette.primary.main,
                color: '#ffffff',
                transform: 'translateY(-2px)',
                boxShadow: `0 10px 25px ${theme.palette.primary.main}40`,
              },
            }}
          >
            {t('pricing.contactSales')}
          </Button>
        </Box>
      </Container>
    </Box>
  );
}; 