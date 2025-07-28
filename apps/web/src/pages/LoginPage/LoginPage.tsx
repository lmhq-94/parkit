import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { LockOutlined } from '@mui/icons-material';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { loginPageStyles } from './LoginPage.styles';

export default function LoginPage() {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        router.push('/dashboard');
      } else {
        setError(t('auth.invalidCredentials'));
      }
    } catch (err) {
      setError(t('auth.loginError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
      <Box sx={loginPageStyles.container}>
        <Avatar sx={loginPageStyles.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography component='h1' variant='h5'>
          {t('auth.login')} - {t('common.appName')}
        </Typography>
        <Paper
          component='form'
          onSubmit={handleSubmit}
          sx={loginPageStyles.paper}
        >
          {error && (
            <Alert severity='error' sx={loginPageStyles.alert}>
              {error}
            </Alert>
          )}

          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label={t('common.email')}
            name='email'
            autoComplete='email'
            autoFocus
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label={t('auth.password')}
            type='password'
            id='password'
            autoComplete='current-password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={loginPageStyles.submitButton}
            disabled={loading}
          >
            {loading ? t('auth.loggingIn') : t('auth.login')}
          </Button>

          <Box sx={loginPageStyles.credentialsBox}>
            <Typography variant='body2' color='text.secondary' align='center'>
              {t('auth.testCredentials')}
            </Typography>
            <Typography variant='body2' color='text.secondary' align='center'>
              {t('auth.testEmail')} / {t('auth.testPassword')}
            </Typography>
            <Typography variant='body2' color='text.secondary' align='center'>
              client@techcorp.com / user123
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
