import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import {
  Language,
  Notifications,
  Palette,
  Person,
  Security,
} from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  Typography,
} from '@mui/material';
import {
  LANGUAGE_FLAGS,
  LANGUAGE_NAMES,
  SUPPORTED_LANGUAGES,
  SupportedLanguage,
  THEME_ICONS,
  THEME_MODES,
  THEME_NAMES,
  ThemeMode,
} from '@parkit/shared';
import { SettingsPageStyles } from './SettingsPage.styles';

export default function SettingsPage() {
  const { language, setLanguage, t } = useLanguage();
  const { themeMode, setThemeMode, isDark } = useTheme();
  const { user } = useAuth();

  const handleLanguageChange = (event: any) => {
    setLanguage(event.target.value as SupportedLanguage);
  };

  const handleThemeChange = (event: any) => {
    setThemeMode(event.target.value as ThemeMode);
  };

  return (
    <Box sx={SettingsPageStyles.container}>
      <Typography variant='h4' sx={SettingsPageStyles.title}>
        {t('settings.title')}
      </Typography>

      <Alert severity='info' sx={SettingsPageStyles.alert}>
        <Typography variant='h6'>{t('settings.title')}</Typography>
        <Typography variant='body2'>{t('settings.general')}</Typography>
      </Alert>

      <Grid container spacing={3}>
        {/* Language Settings */}
        <Grid item xs={12} md={6}>
          <Card sx={SettingsPageStyles.card}>
            <CardContent sx={SettingsPageStyles.cardContent}>
              <Box sx={SettingsPageStyles.iconContainer}>
                <Language sx={SettingsPageStyles.icon} />
                <Typography variant='h6'>{t('settings.language')}</Typography>
              </Box>

              <FormControl sx={SettingsPageStyles.formControl}>
                <InputLabel>{t('settings.language')}</InputLabel>
                <Select
                  value={language}
                  label={t('settings.language')}
                  onChange={handleLanguageChange}
                >
                  {Object.entries(SUPPORTED_LANGUAGES).map(([key, value]) => (
                    <MenuItem key={value} value={value}>
                      <Box display='flex' alignItems='center'>
                        <span style={{ marginRight: 8 }}>
                          {LANGUAGE_FLAGS[value as SupportedLanguage]}
                        </span>
                        {LANGUAGE_NAMES[value as SupportedLanguage]}
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </CardContent>
          </Card>
        </Grid>

        {/* Theme Settings */}
        <Grid item xs={12} md={6}>
          <Card sx={SettingsPageStyles.card}>
            <CardContent sx={SettingsPageStyles.cardContent}>
              <Box sx={SettingsPageStyles.iconContainer}>
                <Palette sx={SettingsPageStyles.icon} />
                <Typography variant='h6'>{t('settings.theme')}</Typography>
              </Box>

              <FormControl sx={SettingsPageStyles.formControl}>
                <InputLabel>{t('settings.theme')}</InputLabel>
                <Select
                  value={themeMode}
                  label={t('settings.theme')}
                  onChange={handleThemeChange}
                >
                  {Object.entries(THEME_MODES).map(([key, value]) => (
                    <MenuItem key={value} value={value}>
                      <Box display='flex' alignItems='center'>
                        <span style={{ marginRight: 8 }}>
                          {THEME_ICONS[value as ThemeMode]}
                        </span>
                        {THEME_NAMES[value as ThemeMode]}
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Typography variant='body2' sx={SettingsPageStyles.themeInfo}>
                {isDark ? '🌙 Modo oscuro activo' : '☀️ Modo claro activo'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Notifications Settings */}
        <Grid item xs={12} md={6}>
          <Card sx={SettingsPageStyles.card}>
            <CardContent sx={SettingsPageStyles.cardContent}>
              <Box sx={SettingsPageStyles.iconContainer}>
                <Notifications sx={SettingsPageStyles.icon} />
                <Typography variant='h6'>
                  {t('settings.notifications')}
                </Typography>
              </Box>

              <FormControlLabel
                control={<Switch defaultChecked />}
                label={t('settings.notifications')}
              />
              <br />
              <FormControlLabel
                control={<Switch defaultChecked />}
                label={t('settings.notifications')}
              />
              <br />
              <FormControlLabel
                control={<Switch />}
                label={t('settings.notifications')}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Security Settings */}
        <Grid item xs={12} md={6}>
          <Card sx={SettingsPageStyles.card}>
            <CardContent sx={SettingsPageStyles.cardContent}>
              <Box sx={SettingsPageStyles.iconContainer}>
                <Security sx={SettingsPageStyles.icon} />
                <Typography variant='h6'>{t('settings.security')}</Typography>
              </Box>

              <FormControlLabel
                control={<Switch defaultChecked />}
                label={t('settings.security')}
              />
              <br />
              <FormControlLabel
                control={<Switch defaultChecked />}
                label={t('settings.security')}
              />
              <br />
              <FormControlLabel
                control={<Switch />}
                label={t('settings.security')}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Account Information */}
        <Grid item xs={12}>
          <Card sx={SettingsPageStyles.card}>
            <CardContent sx={SettingsPageStyles.cardContent}>
              <Box sx={SettingsPageStyles.iconContainer}>
                <Person sx={SettingsPageStyles.icon} />
                <Typography variant='h6'>{t('settings.account')}</Typography>
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant='body2' sx={SettingsPageStyles.label}>
                    {t('common.name')}
                  </Typography>
                  <Typography variant='body1' sx={SettingsPageStyles.value}>
                    {user?.firstName} {user?.lastName}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant='body2' sx={SettingsPageStyles.label}>
                    {t('common.email')}
                  </Typography>
                  <Typography variant='body1' sx={SettingsPageStyles.value}>
                    {user?.email}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant='body2' sx={SettingsPageStyles.label}>
                    {t('users.role')}
                  </Typography>
                  <Typography variant='body1' sx={SettingsPageStyles.value}>
                    {user?.role}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant='body2' sx={SettingsPageStyles.label}>
                    {t('common.company')}
                  </Typography>
                  <Typography variant='body1' sx={SettingsPageStyles.value}>
                    {user?.companyId || 'N/A'}
                  </Typography>
                </Grid>
              </Grid>

              <Box sx={SettingsPageStyles.buttonContainer}>
                <Button
                  variant='outlined'
                  color='primary'
                  sx={SettingsPageStyles.button}
                >
                  {t('common.edit')} {t('settings.profile')}
                </Button>
                <Button variant='outlined' color='secondary'>
                  {t('auth.changePassword')}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
