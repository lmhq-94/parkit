import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Link,
  Stack,
  IconButton,
  Divider,
  useTheme,
} from '@mui/material';
import {
  Twitter,
  LinkedIn,
  GitHub,
  Facebook,
  Instagram,
  YouTube,
  LocalParking,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

export const Footer: React.FC = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  const Logo = () => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 900,
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-0.02em',
        }}
      >
        Park
        <Box
          component="span"
          sx={{
            color: theme.palette.secondary.main,
            WebkitTextFillColor: theme.palette.secondary.main,
          }}
        >
          It
        </Box>
      </Typography>
    </Box>
  );

  const footerSections = [
    {
      title: t('footer.product.title'),
      links: [
        { label: t('footer.product.features'), href: '#features' },
        { label: t('footer.product.pricing'), href: '#pricing' },
        { label: t('footer.product.demo'), href: '#demo' },
        { label: t('footer.product.api'), href: '#api' },
      ],
    },
    {
      title: t('footer.company.title'),
      links: [
        { label: t('footer.company.about'), href: '#about' },
        { label: t('footer.company.careers'), href: '#careers' },
        { label: t('footer.company.contact'), href: '#contact' },
        { label: t('footer.company.press'), href: '#press' },
      ],
    },
    {
      title: t('footer.resources.title'),
      links: [
        { label: t('footer.resources.docs'), href: '#docs' },
        { label: t('footer.resources.blog'), href: '#blog' },
        { label: t('footer.resources.support'), href: '#support' },
        { label: t('footer.resources.community'), href: '#community' },
      ],
    },
    {
      title: t('footer.legal.title'),
      links: [
        { label: t('footer.legal.privacy'), href: '/privacy' },
        { label: t('footer.legal.terms'), href: '/terms' },
        { label: t('footer.legal.cookies'), href: '/cookies' },
        { label: t('footer.legal.security'), href: '#security' },
      ],
    },
  ];

  const socialLinks = [
    { icon: <Twitter />, href: '#', label: 'Twitter' },
    { icon: <LinkedIn />, href: '#', label: 'LinkedIn' },
    { icon: <GitHub />, href: '#', label: 'GitHub' },
    { icon: <Facebook />, href: '#', label: 'Facebook' },
    { icon: <Instagram />, href: '#', label: 'Instagram' },
    { icon: <YouTube />, href: '#', label: 'YouTube' },
  ];

  return (
    <Box
      sx={{
        background: theme.palette.mode === 'dark' 
          ? `linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)`
          : `linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%)`,
        borderTop: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Container maxWidth="xl">
        <Box sx={{ py: { xs: 6, md: 8 } }}>
          <Grid container spacing={6}>
            {/* Logo and Description */}
            <Grid item xs={12} md={4}>
              <Logo />
              <Typography
                variant="body1"
                sx={{
                  color: theme.palette.text.secondary,
                  mt: 3,
                  mb: 4,
                  lineHeight: 1.6,
                }}
              >
                {t('footer.description')}
              </Typography>
              
              {/* Social Links */}
              <Stack direction="row" spacing={2}>
                {socialLinks.map((social, index) => (
                  <IconButton
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    sx={{
                      color: theme.palette.text.secondary,
                      '&:hover': {
                        color: theme.palette.primary.main,
                        transform: 'translateY(-2px)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {social.icon}
                  </IconButton>
                ))}
              </Stack>
            </Grid>

            {/* Footer Links */}
            {footerSections.map((section, index) => (
              <Grid item xs={12} sm={6} md={2} key={index}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    mb: 3,
                    color: theme.palette.text.primary,
                  }}
                >
                  {section.title}
                </Typography>
                <Stack spacing={2}>
                  {section.links.map((link, linkIndex) => (
                    <Link
                      key={linkIndex}
                      href={link.href}
                      sx={{
                        color: theme.palette.text.secondary,
                        textDecoration: 'none',
                        fontWeight: 500,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          color: theme.palette.primary.main,
                          transform: 'translateX(5px)',
                        },
                      }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Divider sx={{ borderColor: theme.palette.divider }} />

        {/* Bottom Section */}
        <Box sx={{ py: 4 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.text.secondary,
                  textAlign: { xs: 'center', md: 'left' },
                }}
              >
                © 2025 ParkIt. {t('footer.rights')}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack
                direction="row"
                spacing={4}
                justifyContent={{ xs: 'center', md: 'flex-end' }}
                sx={{ flexWrap: 'wrap', gap: 2 }}
              >
                <Link
                  href="#"
                  sx={{
                    color: theme.palette.text.secondary,
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    '&:hover': {
                      color: theme.palette.primary.main,
                    },
                  }}
                >
                  {t('footer.status')}
                </Link>
                <Link
                  href="#"
                  sx={{
                    color: theme.palette.text.secondary,
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    '&:hover': {
                      color: theme.palette.primary.main,
                    },
                  }}
                >
                  {t('footer.sitemap')}
                </Link>
                <Link
                  href="#"
                  sx={{
                    color: theme.palette.text.secondary,
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    '&:hover': {
                      color: theme.palette.primary.main,
                    },
                  }}
                >
                  {t('footer.accessibility')}
                </Link>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}; 