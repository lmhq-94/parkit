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
  Rating,
} from '@mui/material';
import {
  Star as StarIcon,
  Verified as VerifiedIcon,
  FormatQuote as QuoteIcon,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

export const TestimonialsSection: React.FC = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: t('testimonials.sarah.role'),
      company: 'TechCorp',
      avatar: '/avatars/sarah.jpg',
      rating: 5,
      review: t('testimonials.sarah.review'),
      verified: true,
    },
    {
      name: 'Michael Chen',
      role: t('testimonials.michael.role'),
      company: 'ParkSmart',
      avatar: '/avatars/michael.jpg',
      rating: 5,
      review: t('testimonials.michael.review'),
      verified: true,
    },
    {
      name: 'Emily Rodriguez',
      role: t('testimonials.emily.role'),
      company: 'UrbanPark',
      avatar: '/avatars/emily.jpg',
      rating: 5,
      review: t('testimonials.emily.review'),
      verified: true,
    },
    {
      name: 'David Kim',
      role: t('testimonials.david.role'),
      company: 'CityPark',
      avatar: '/avatars/david.jpg',
      rating: 5,
      review: t('testimonials.david.review'),
      verified: true,
    },
    {
      name: 'Lisa Thompson',
      role: t('testimonials.lisa.role'),
      company: 'SmartPark',
      avatar: '/avatars/lisa.jpg',
      rating: 5,
      review: t('testimonials.lisa.review'),
      verified: true,
    },
    {
      name: 'Robert Wilson',
      role: t('testimonials.robert.role'),
      company: 'ParkFlow',
      avatar: '/avatars/robert.jpg',
      rating: 5,
      review: t('testimonials.robert.review'),
      verified: true,
    },
  ];

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        background: `linear-gradient(135deg, ${theme.palette.primary.main}05 0%, ${theme.palette.secondary.main}05 100%)`,
      }}
    >
      <Container maxWidth="xl">
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 10 } }}>
          <Chip
            label={t('testimonials.badge')}
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
            {t('testimonials.title')}
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
            {t('testimonials.subtitle')}
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} sm={6} lg={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  background: theme.palette.background.paper,
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: 4,
                  backdropFilter: 'blur(20px)',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: theme.shadows[12],
                  },
                }}
              >
                <CardContent sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
                  {/* Quote Icon */}
                  <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
                    <QuoteIcon sx={{ color: theme.palette.primary.main, opacity: 0.3 }} />
                  </Box>

                  {/* Rating */}
                  <Box sx={{ mb: 3 }}>
                    <Rating
                      value={testimonial.rating}
                      readOnly
                      sx={{
                        '& .MuiRating-iconFilled': {
                          color: theme.palette.warning.main,
                        },
                      }}
                    />
                  </Box>

                  {/* Review Text */}
                  <Typography
                    variant="body1"
                    sx={{
                      color: theme.palette.text.secondary,
                      lineHeight: 1.6,
                      mb: 4,
                      flex: 1,
                      fontStyle: 'italic',
                    }}
                  >
                    "{testimonial.review}"
                  </Typography>

                  {/* Author Info */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar
                      sx={{
                        width: 50,
                        height: 50,
                        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                        color: '#ffffff',
                        fontWeight: 700,
                        fontSize: '1.2rem',
                      }}
                    >
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 700,
                            color: theme.palette.text.primary,
                          }}
                        >
                          {testimonial.name}
                        </Typography>
                        {testimonial.verified && (
                          <VerifiedIcon sx={{ color: theme.palette.success.main, fontSize: 16 }} />
                        )}
                      </Box>
                      <Typography
                        variant="body2"
                        sx={{
                          color: theme.palette.text.secondary,
                          fontWeight: 500,
                        }}
                      >
                        {testimonial.role}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          color: theme.palette.primary.main,
                          fontWeight: 600,
                        }}
                      >
                        {testimonial.company}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Overall Rating */}
        <Box sx={{ textAlign: 'center', mt: { xs: 8, md: 12 } }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              mb: 2,
              color: theme.palette.text.primary,
            }}
          >
            {t('testimonials.overall.title')}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 3 }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 900,
                color: theme.palette.warning.main,
              }}
            >
              4.9
            </Typography>
            <Box>
              <Rating
                value={4.9}
                readOnly
                size="large"
                sx={{
                  '& .MuiRating-iconFilled': {
                    color: theme.palette.warning.main,
                  },
                }}
              />
              <Typography variant="body2" color="text.secondary">
                {t('testimonials.overall.subtitle')}
              </Typography>
            </Box>
          </Box>
          <Typography
            variant="body1"
            sx={{
              color: theme.palette.text.secondary,
              maxWidth: 600,
              mx: 'auto',
            }}
          >
            {t('testimonials.overall.description')}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}; 