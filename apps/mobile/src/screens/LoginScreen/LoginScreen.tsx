import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import {
  Button,
  Card,
  Paragraph,
  Surface,
  Text,
  TextInput,
  Title,
} from 'react-native-paper';
import { styles } from './LoginScreen.styles';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { t } = useLanguage();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert(t('errors.error'), t('validation.completeAllFields'));
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
    } catch (error) {
      Alert.alert(t('auth.loginError'), (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleTestLogin = async () => {
    setEmail('admin@techcorp.com');
    setPassword('admin123');
    setLoading(true);
    try {
      await login('admin@techcorp.com', 'admin123');
    } catch (error) {
      Alert.alert(t('auth.loginError'), (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Surface style={styles.surface}>
        <Card style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <Title style={styles.title}>{t('common.appName')}</Title>
            <Paragraph style={styles.subtitle}>
              {t('common.appDescription')}
            </Paragraph>

            <TextInput
              label={t('common.email')}
              value={email}
              onChangeText={setEmail}
              mode='outlined'
              style={styles.input}
              keyboardType='email-address'
              autoCapitalize='none'
            />

            <TextInput
              label={t('auth.password')}
              value={password}
              onChangeText={setPassword}
              mode='outlined'
              style={styles.input}
              secureTextEntry
            />

            <Button
              mode='contained'
              onPress={handleLogin}
              style={styles.button}
              loading={loading}
              disabled={loading}
            >
              {t('auth.login')}
            </Button>

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>{t('common.or')}</Text>
              <View style={styles.dividerLine} />
            </View>

            <Button
              mode='outlined'
              onPress={handleTestLogin}
              style={styles.testButton}
              disabled={loading}
            >
              {t('auth.useTestCredentials')}
            </Button>

            <View style={styles.credentials}>
              <Text style={styles.credentialsTitle}>
                {t('auth.testCredentials')}
              </Text>
              <Text style={styles.credentialsText}>{t('auth.testEmail')}</Text>
              <Text style={styles.credentialsText}>
                {t('auth.testPassword')}
              </Text>
            </View>
          </Card.Content>
        </Card>
      </Surface>
    </View>
  );
}
