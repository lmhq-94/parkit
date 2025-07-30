import { useMemo } from 'react';
import { SupportedLanguage } from '../constants/languages';
import {
  getAllTranslations,
  getTranslation,
  getTranslationWithParams,
} from '../translations';

export interface UseTranslationsOptions {
  fallbackLanguage?: SupportedLanguage;
}

export function useTranslations(
  language: SupportedLanguage,
  options: UseTranslationsOptions = {}
) {
  const { fallbackLanguage = 'es' } = options;

  const t = useMemo(() => {
    return (key: string, params?: Record<string, string | number>) => {
      if (params) {
        return getTranslationWithParams(
          language,
          key,
          params,
          fallbackLanguage
        );
      }
      return getTranslation(language, key, fallbackLanguage);
    };
  }, [language, fallbackLanguage]);

  const tAll = useMemo(() => {
    return (key: string) => {
      return getAllTranslations(key);
    };
  }, []);

  return {
    t,
    tAll,
    language,
    fallbackLanguage,
  };
}

// Hook for common translations
export function useCommonTranslations(language: SupportedLanguage) {
  const { t } = useTranslations(language);

  return useMemo(
    () => ({
      // Common actions
      loading: () => t('common.loading'),
      error: () => t('common.error'),
      success: () => t('common.success'),
      warning: () => t('common.warning'),
      info: () => t('common.info'),

      // Common buttons
      confirm: () => t('common.confirm'),
      cancel: () => t('common.cancel'),
      save: () => t('common.save'),
      delete: () => t('common.delete'),
      edit: () => t('common.edit'),
      add: () => t('common.add'),

      // Common actions
      search: () => t('common.search'),
      filter: () => t('common.filter'),
      sort: () => t('common.sort'),
      refresh: () => t('common.refresh'),
      close: () => t('common.close'),
      back: () => t('common.back'),

      // Common responses
      yes: () => t('common.yes'),
      no: () => t('common.no'),
      ok: () => t('common.ok'),

      // Common states
      noData: () => t('common.noData'),
      noResults: () => t('common.noResults'),
      retry: () => t('common.retry'),
      tryAgain: () => t('common.tryAgain'),
    }),
    [t]
  );
}

// Hook for navigation translations
export function useNavigationTranslations(language: SupportedLanguage) {
  const { t } = useTranslations(language);

  return useMemo(
    () => ({
      dashboard: () => t('navigation.dashboard'),
      parkings: () => t('navigation.parkings'),
      reservations: () => t('navigation.reservations'),
      vehicles: () => t('navigation.vehicles'),
      qrScanner: () => t('navigation.qrScanner'),
      settings: () => t('navigation.settings'),
      users: () => t('navigation.users'),
      reports: () => t('navigation.reports'),
      companies: () => t('navigation.companies'),
      events: () => t('navigation.events'),
      payments: () => t('navigation.payments'),
    }),
    [t]
  );
}

// Hook for authentication translations
export function useAuthTranslations(language: SupportedLanguage) {
  const { t } = useTranslations(language);

  return useMemo(
    () => ({
      login: () => t('auth.login'),
      logout: () => t('auth.logout'),
      email: () => t('auth.email'),
      password: () => t('auth.password'),
      phone: () => t('auth.phone'),
      code: () => t('auth.code'),
      sendCode: () => t('auth.sendCode'),
      resendCode: () => t('auth.resendCode'),
      verifyCode: () => t('auth.verifyCode'),
      continueWithPhone: () => t('auth.continueWithPhone'),
      continueWithEmail: () => t('auth.continueWithEmail'),
      back: () => t('auth.back'),
      changeNumber: () => t('auth.changeNumber'),
      invalidCredentials: () => t('auth.invalidCredentials'),
      invalidCode: () => t('auth.invalidCode'),
      codeSent: () => t('auth.codeSent'),
      codeResent: () => t('auth.codeResent'),
      loading: () => t('auth.loading'),
      sending: () => t('auth.sending'),
      verifying: () => t('auth.verifying'),
      loggingIn: () => t('auth.loggingIn'),
    }),
    [t]
  );
}

// Hook for settings translations
export function useSettingsTranslations(language: SupportedLanguage) {
  const { t } = useTranslations(language);

  return useMemo(
    () => ({
      title: () => t('settings.title'),
      language: () => t('settings.language'),
      theme: () => t('settings.theme'),
      notifications: () => t('settings.notifications'),
      privacy: () => t('settings.privacy'),
      about: () => t('settings.about'),
      help: () => t('settings.help'),
      contact: () => t('settings.contact'),
      version: () => t('settings.version'),
      light: () => t('settings.light'),
      dark: () => t('settings.dark'),
      system: () => t('settings.system'),
      enableNotifications: () => t('settings.enableNotifications'),
      pushNotifications: () => t('settings.pushNotifications'),
      emailNotifications: () => t('settings.emailNotifications'),
      smsNotifications: () => t('settings.smsNotifications'),
    }),
    [t]
  );
}
