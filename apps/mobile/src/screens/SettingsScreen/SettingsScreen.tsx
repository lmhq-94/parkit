import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
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
import React from 'react';
import { ScrollView, View } from 'react-native';
import {
  Button,
  Card,
  Divider,
  List,
  Paragraph,
  Switch,
  Text,
  Title,
} from 'react-native-paper';
import { styles } from './SettingsScreen.styles';

export default function SettingsScreen() {
  const { language, setLanguage, t } = useLanguage();
  const { themeMode, setThemeMode, isDark } = useTheme();
  const { user } = useAuth();

  const handleLanguageChange = async (newLanguage: SupportedLanguage) => {
    await setLanguage(newLanguage);
  };

  const handleThemeChange = async (newTheme: ThemeMode) => {
    await setThemeMode(newTheme);
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>{t('settings.title')}</Title>
          <Paragraph>{t('settings.description')}</Paragraph>
        </Card.Content>
      </Card>

      {/* Language Settings */}
      <Card style={styles.card}>
        <Card.Content>
          <Title>{t('settings.language')}</Title>
          <View style={styles.section}>
            {Object.entries(SUPPORTED_LANGUAGES).map(([key, value]) => (
              <List.Item
                key={value}
                title={
                  <View style={styles.languageItem}>
                    <Text style={styles.flag}>
                      {LANGUAGE_FLAGS[value as SupportedLanguage]}
                    </Text>
                    <Text style={styles.languageName}>
                      {LANGUAGE_NAMES[value as SupportedLanguage]}
                    </Text>
                  </View>
                }
                right={() =>
                  language === value ? (
                    <Text style={styles.selected}>✓</Text>
                  ) : null
                }
                onPress={() => handleLanguageChange(value as SupportedLanguage)}
                style={[
                  styles.listItem,
                  language === value && styles.selectedItem,
                ]}
              />
            ))}
          </View>
        </Card.Content>
      </Card>

      {/* Theme Settings */}
      <Card style={styles.card}>
        <Card.Content>
          <Title>{t('settings.theme')}</Title>
          <View style={styles.section}>
            {Object.entries(THEME_MODES).map(([key, value]) => (
              <List.Item
                key={value}
                title={
                  <View style={styles.themeItem}>
                    <Text style={styles.themeIcon}>
                      {THEME_ICONS[value as ThemeMode]}
                    </Text>
                    <Text style={styles.themeName}>
                      {THEME_NAMES[value as ThemeMode]}
                    </Text>
                  </View>
                }
                right={() =>
                  themeMode === value ? (
                    <Text style={styles.selected}>✓</Text>
                  ) : null
                }
                onPress={() => handleThemeChange(value as ThemeMode)}
                style={[
                  styles.listItem,
                  themeMode === value && styles.selectedItem,
                ]}
              />
            ))}
          </View>
          <Paragraph style={styles.themeInfo}>
            {isDark
              ? t('settings.darkModeActive')
              : t('settings.lightModeActive')}
          </Paragraph>
        </Card.Content>
      </Card>

      {/* Notifications Settings */}
      <Card style={styles.card}>
        <Card.Content>
          <Title>{t('settings.notifications')}</Title>
          <List.Item
            title={t('settings.emailNotifications')}
            right={() => <Switch value={true} />}
          />
          <Divider />
          <List.Item
            title={t('settings.pushNotifications')}
            right={() => <Switch value={true} />}
          />
          <Divider />
          <List.Item
            title={t('settings.reservationReminders')}
            right={() => <Switch value={false} />}
          />
        </Card.Content>
      </Card>

      {/* Security Settings */}
      <Card style={styles.card}>
        <Card.Content>
          <Title>{t('settings.security')}</Title>
          <List.Item
            title={t('settings.twoFactorAuth')}
            right={() => <Switch value={true} />}
          />
          <Divider />
          <List.Item
            title={t('settings.activeSessions')}
            right={() => <Switch value={true} />}
          />
          <Divider />
          <List.Item
            title={t('settings.loginNotifications')}
            right={() => <Switch value={false} />}
          />
        </Card.Content>
      </Card>

      {/* Account Information */}
      <Card style={styles.card}>
        <Card.Content>
          <Title>{t('settings.account')}</Title>
          <View style={styles.accountInfo}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>{t('settings.name')}</Text>
              <Text style={styles.infoValue}>
                {user?.firstName} {user?.lastName}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>{t('settings.email')}</Text>
              <Text style={styles.infoValue}>{user?.email}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>{t('settings.role')}</Text>
              <Text style={styles.infoValue}>{user?.role}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>{t('settings.company')}</Text>
              <Text style={styles.infoValue}>
                {user?.companyId || t('common.notAvailable')}
              </Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <Button mode='outlined' style={styles.button}>
              {t('settings.editProfile')}
            </Button>
            <Button mode='outlined' style={styles.button}>
              {t('auth.changePassword')}
            </Button>
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}
